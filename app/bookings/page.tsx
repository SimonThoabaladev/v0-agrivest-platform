import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserBookings } from '@/app/actions/user'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookingsList } from '@/components/bookings-list'
import { CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const bookings = await getUserBookings()
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <CalendarDays className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground">Manage your scheduled consultations</p>
            </div>
          </div>
          
          <BookingsList bookings={bookings} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
