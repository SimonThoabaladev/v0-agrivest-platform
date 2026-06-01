import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserSubscription } from '@/app/actions/user'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SubscriptionPlans } from '@/components/subscription-plans'
import { CurrentSubscription } from '@/components/current-subscription'
import { Crown } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SubscriptionPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const subscription = await getUserSubscription()
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="w-12 h-12 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Subscription Plans</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock premium features and get the most out of AgriVest with our subscription plans.
              Access exclusive content, priority support, and advanced tools.
            </p>
          </div>
          
          {subscription ? (
            <CurrentSubscription subscription={subscription} />
          ) : (
            <SubscriptionPlans />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
