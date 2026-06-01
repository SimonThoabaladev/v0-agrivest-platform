'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createSubscription } from '@/app/actions/user'
import { Check, Loader2 } from 'lucide-react'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    period: 'month',
    features: [
      'Access to marketplace',
      'View professional profiles',
      'Basic news & articles',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 249,
    period: 'month',
    popular: true,
    features: [
      'Everything in Basic',
      'Book consultations',
      'Priority support',
      'Investment opportunities',
      'Exclusive webinars',
      'Market insights',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    period: 'month',
    features: [
      'Everything in Professional',
      'Unlimited consultations',
      'Dedicated account manager',
      'Custom reports',
      'API access',
      'White-label options',
    ],
  },
]

export function SubscriptionPlans() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function handleSubscribe(planId: string) {
    setLoading(planId)
    try {
      await createSubscription(planId)
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to subscribe')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative border-border ${
            plan.popular ? 'border-2 border-primary shadow-lg' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold text-foreground">M{plan.price}</span>
              <span className="text-muted-foreground">/{plan.period}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${
                plan.popular
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
              }`}
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id}
            >
              {loading === plan.id ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
