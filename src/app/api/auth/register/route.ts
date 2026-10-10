import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const registerSchema = z.object({
  role: z.enum(['SELLER', 'BUYER']),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().length(10),
  company: z.string().optional(),
  businessType: z.string().optional(),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = registerSchema.safeParse(body)

    if (!input.success) {
      return NextResponse.json(
        { message: 'Invalid registration data', issues: input.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, role, ...rest } = input.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...rest,
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    })

    return NextResponse.json({ message: 'Registration successful', user }, { status: 201 })
  } catch (error) {
    console.error('[REGISTER_POST]', error)
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 })
  }
}
