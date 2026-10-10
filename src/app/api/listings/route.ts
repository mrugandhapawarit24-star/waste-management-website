import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createListingSchema = z.object({
  type: z.string().min(1),
  weight: z.number().positive(),
  unit: z.string().min(1),
  price: z.number().nonnegative(),
  location: z.string().min(1),
  address: z.string().min(1),
  contactNumber: z.string().length(10),
  description: z.string().min(1),
  sellerEmail: z.string().email(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerEmail = searchParams.get('sellerEmail') ?? undefined
    const status = (searchParams.get('status') ?? undefined) as
      | 'ACTIVE'
      | 'SOLD'
      | 'PENDING'
      | undefined

    let sellerId: string | undefined
    if (sellerEmail) {
      const seller = await prisma.user.findUnique({ where: { email: sellerEmail } })
      if (!seller || seller.role !== 'SELLER') {
        return NextResponse.json({ listings: [] })
      }
      sellerId = seller.id
    }

    const listings = await prisma.wasteListing.findMany({
      where: {
        sellerId,
        status: status ?? undefined,
      },
      include: {
        seller: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            company: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ listings })
  } catch (error) {
    console.error('[LISTINGS_GET]', error)
    return NextResponse.json({ message: 'Failed to fetch listings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = createListingSchema.safeParse(body)

    if (!input.success) {
      return NextResponse.json(
        { message: 'Invalid listing data', issues: input.error.flatten() },
        { status: 400 }
      )
    }

    const { sellerEmail, ...data } = input.data

    const seller = await prisma.user.findUnique({ where: { email: sellerEmail } })

    if (!seller || seller.role !== 'SELLER') {
      return NextResponse.json({ message: 'Seller account not found' }, { status: 404 })
    }

    const listing = await prisma.wasteListing.create({
      data: {
        ...data,
        sellerId: seller.id,
      },
    })

    return NextResponse.json({ message: 'Listing created', listing }, { status: 201 })
  } catch (error) {
    console.error('[LISTINGS_POST]', error)
    return NextResponse.json({ message: 'Failed to create listing' }, { status: 500 })
  }
}
