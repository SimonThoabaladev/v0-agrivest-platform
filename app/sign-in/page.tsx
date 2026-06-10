import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'

export const dynamic = 'force-dynamic'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const { redirect: redirectTo } = await searchParams
  if (session?.user) redirect(redirectTo || '/')

  return <AuthForm mode="sign-in" redirectTo={redirectTo} />
}
