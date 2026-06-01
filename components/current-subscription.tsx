'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cancelSubscription } from '@/app/actions/user'
import { Crown, Calendar, Loader2 } from 'lucide-react'

type Subscription = {
  id: number
  plan: string
  status: string
  startDate: Date
  endDate: Date | null
}

export function CurrentSubscription({ subscription }: { subscription: Subscription }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      return
    }
    
    setLoading(true)
    try {
      await cancelSubscription()
      router.refresh()
    } catch (error) {
      alert('Failed to cancel subscription')
    } finally {
      setLoading(false)
    }
  }

  const planNames: Record<string, string> = {
    basic: 'Basic',
    professional: 'Professional',
    enterprise: 'Enterprise',
  }

  return (
    <Card className="max-w-md mx-auto border-border border-2 border-primary">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Crown className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-foreground">Active Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold text-primary">
            {planNames[subscription.plan] || subscription.plan}
          </span>
          <span className="text-muted-foreground ml-2">Plan</span>
        </div>
        
        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Start Date
            </span>
            <span className="text-foreground font-medium">
              {new Date(subscription.startDate).toLocaleDateString()}
            </span>
          </div>
          {subscription.endDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                End Date
              </span>
              <span className="text-foreground font-medium">
                {new Date(subscription.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Cancelling...
            </>
          ) : (
            'Cancel Subscription'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
