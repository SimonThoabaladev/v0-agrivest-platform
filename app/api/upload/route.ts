import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

// Admin email that can upload
const ADMIN_EMAILS = ['simonthoabala208@gmail.com']

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth.api.getSession({ headers: await headers() })
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in to upload' }, { status: 401 })
    }

    // Check admin role OR admin email
    const userRole = (session.user as any).role
    const userEmail = session.user.email
    const isAdmin = userRole === 'admin' || ADMIN_EMAILS.includes(userEmail || '')
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images allowed.' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB allowed.' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    const blob = await put(filename, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Upload failed' 
    }, { status: 500 })
  }
}
