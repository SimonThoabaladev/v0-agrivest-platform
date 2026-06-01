'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cancelBooking } from '@/app/actions/user'
import { Calendar, Clock, User, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

type Booking = {
  id: number
  date: Date
  time: string
  status: string
  notes: string | null
  createdAt: Date
  professional: {
    id: number | null
    name: string | null
    title: string | null
    image: string | null
  } | null
}

export function BookingsList({ bookings }: { bookings: Booking[] }) {
  const router = useRouter()
  const [cancellingId, setCancellingId] = useState<number | null>(null)

  async function handleCancel(id: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    
    setCancellingId(id)
    try {
      await cancelBooking(id)
      router.refresh()
    } catch (error) {
      alert('Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (bookings.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Bookings Yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            You haven&apos;t scheduled any consultations with our professionals.
          </p>
          <Link href="/professionals">
            <Button className="bg-primary hover:bg-primary/90">
              Find a Professional
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {booking.professional?.image ? (
                  <img
                    src={booking.professional.image}
                    alt={booking.professional.name || 'Professional'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-foreground">
                    {booking.professional?.name || 'Unknown Professional'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.professional?.title || 'Professional'}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {booking.time}
              </div>
            </div>
            {booking.notes && (
              <p className="mt-3 text-sm text-foreground bg-muted p-3 rounded-md">
                {booking.notes}
              </p>
            )}
          </CardContent>
          {booking.status === 'pending' && (
            <CardFooter className="border-t border-border pt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancel(booking.id)}
                disabled={cancellingId === booking.id}
              >
                {cancellingId === booking.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  'Cancel Booking'
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
