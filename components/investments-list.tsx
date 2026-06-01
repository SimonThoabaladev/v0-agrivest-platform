'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { expressInterest } from '@/app/actions/user'
import { MapPin, DollarSign, Clock, TrendingUp, Loader2, Briefcase, Plus } from 'lucide-react'
import Link from 'next/link'

type Investment = {
  id: number
  title: string
  description: string
  amount: string
  landSize: string | null
  location: string
  status: string
  returnRate: string | null
  duration: string | null
  createdAt: Date
}

export function InvestmentsList({ investments, isAdmin = false }: { investments: Investment[], isAdmin?: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState<{ id: number; role: string } | null>(null)

  async function handleInterest(id: number, role: 'investor' | 'landowner') {
    setLoading({ id, role })
    try {
      await expressInterest(id, role)
      alert('Interest expressed successfully! Our team will contact you.')
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Please sign in to express interest')
    } finally {
      setLoading(null)
    }
  }

  if (investments.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Opportunities Available</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            There are currently no investment opportunities available. 
            Check back later or contact us to discuss potential partnerships.
          </p>
          {isAdmin ? (
            <Link href="/admin?tab=investments">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Investment Opportunity
              </Button>
            </Link>
          ) : (
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <Link href="/admin?tab=investments">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Investment
            </Button>
          </Link>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <Card key={investment.id} className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{investment.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {investment.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Investment:</span>
                  <span className="font-semibold text-foreground">
                    M{Number(investment.amount).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{investment.location}</span>
                </div>
                
                {investment.landSize && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Land Size:</span>
                    <span className="text-foreground">{investment.landSize}</span>
                  </div>
                )}
                
                {investment.returnRate && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Expected Return:</span>
                    <span className="text-green-600 font-semibold">{investment.returnRate}%</span>
                  </div>
                )}
                
                {investment.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{investment.duration}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => handleInterest(investment.id, 'investor')}
                disabled={loading?.id === investment.id}
              >
                {loading?.id === investment.id && loading.role === 'investor' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Invest'
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleInterest(investment.id, 'landowner')}
                disabled={loading?.id === investment.id}
              >
                {loading?.id === investment.id && loading.role === 'landowner' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Offer Land'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
