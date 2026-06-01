import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { getServices, getProducts, getProfessionals, getNews, getUsers, getInvestmentsAdmin, getAllBookings } from '@/app/actions/admin'

export const dynamic = 'force-dynamic'

// Admin emails that can always access
const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const users = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
  
  // Check admin role OR admin email
  const isAdmin = (users.length > 0 && users[0].role === 'admin') || ADMIN_EMAILS.includes(session.user.email || '')
  
  if (!isAdmin) {
    redirect('/')
  }
  
  const [servicesData, productsData, professionalsData, newsData, usersData, investmentsData, bookingsData] = await Promise.all([
    getServices(),
    getProducts(),
    getProfessionals(),
    getNews(),
    getUsers(),
    getInvestmentsAdmin(),
    getAllBookings(),
  ])
  
  return (
    <AdminDashboard
      services={servicesData}
      products={productsData}
      professionals={professionalsData}
      news={newsData}
      users={usersData}
      investments={investmentsData}
      bookings={bookingsData}
    />
  )
}
