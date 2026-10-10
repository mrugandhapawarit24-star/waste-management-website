import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['SELLER', 'BUYER']),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = loginSchema.safeParse(body)

    if (!input.success) {
      return NextResponse.json(
        { message: 'Invalid login data', issues: input.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, role } = input.data

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || user.role !== role) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error('[LOGIN_POST]', error)
    return NextResponse.json({ message: 'Login failed' }, { status: 500 })
  }
}
