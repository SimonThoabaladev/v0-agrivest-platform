import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Ensures the current request is authenticated.
 * If there is no active session, redirects to the sign-in page,
 * preserving the originally requested path so the user can be
 * returned there after a successful sign-in.
 */
export async function requireAuth(callbackPath?: string) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    const target = callbackPath
      ? `/sign-in?redirect=${encodeURIComponent(callbackPath)}`
      : '/sign-in'
    redirect(target)
  }

  return session
}
