import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST() {
  try {
    // Create admin user using Better Auth's sign up
    const result = await auth.api.signUpEmail({
      body: {
        email: 'simonthoabala208@gmail.com',
        password: 'Thoabala@208',
        name: 'Simon Thoabala',
      },
    })

    if (result) {
      return NextResponse.json({ success: true, message: 'Admin user created successfully' })
    }

    return NextResponse.json({ success: false, message: 'Failed to create admin user' }, { status: 400 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    // User might already exist
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
      return NextResponse.json({ success: true, message: 'Admin user already exists' })
    }
    console.error('Error creating admin user:', error)
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
