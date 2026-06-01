'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { services, products, professionals, news, user, investments, bookings } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Admin emails that bypass role check
const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

async function getAdminUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  
  const userEmail = session.user.email
  
  // Check if user is in admin emails list
  if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
    return session.user
  }
  
  // Otherwise check database role
  const users = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
  
  if (users.length === 0 || users[0].role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return session.user
}

// Services CRUD
export async function getServices() {
  return db.select().from(services).orderBy(desc(services.createdAt))
}

export async function createService(data: {
  title: string
  description: string
  icon?: string
  category: string
}) {
  await getAdminUser()
  await db.insert(services).values(data)
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function updateService(
  id: number,
  data: {
    title?: string
    description?: string
    icon?: string
    category?: string
  }
) {
  await getAdminUser()
  await db.update(services).set({ ...data, updatedAt: new Date() }).where(eq(services.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteService(id: number) {
  await getAdminUser()
  await db.delete(services).where(eq(services.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
}

// Products CRUD
export async function getProducts() {
  return db.select().from(products).orderBy(desc(products.createdAt))
}

export async function createProduct(data: {
  name: string
  description: string
  price: string
  image: string
  category: string
  stock: number
}) {
  await getAdminUser()
  await db.insert(products).values(data)
  revalidatePath('/admin')
  revalidatePath('/marketplace')
}

export async function updateProduct(
  id: number,
  data: {
    name?: string
    description?: string
    price?: string
    image?: string
    category?: string
    stock?: number
  }
) {
  await getAdminUser()
  await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id))
  revalidatePath('/admin')
  revalidatePath('/marketplace')
}

export async function deleteProduct(id: number) {
  await getAdminUser()
  await db.delete(products).where(eq(products.id, id))
  revalidatePath('/admin')
  revalidatePath('/marketplace')
}

// Professionals CRUD
export async function getProfessionals() {
  return db.select().from(professionals).orderBy(desc(professionals.createdAt))
}

export async function createProfessional(data: {
  name: string
  title: string
  specialization: string
  bio: string
  image: string
  email?: string
  phone?: string
  rate?: string
  available?: boolean
}) {
  await getAdminUser()
  await db.insert(professionals).values(data)
  revalidatePath('/admin')
  revalidatePath('/professionals')
}

export async function updateProfessional(
  id: number,
  data: {
    name?: string
    title?: string
    specialization?: string
    bio?: string
    image?: string
    email?: string
    phone?: string
    rate?: string
    available?: boolean
  }
) {
  await getAdminUser()
  await db.update(professionals).set({ ...data, updatedAt: new Date() }).where(eq(professionals.id, id))
  revalidatePath('/admin')
  revalidatePath('/professionals')
}

export async function deleteProfessional(id: number) {
  await getAdminUser()
  await db.delete(professionals).where(eq(professionals.id, id))
  revalidatePath('/admin')
  revalidatePath('/professionals')
}

// News CRUD
export async function getNews(publishedOnly = false) {
  if (publishedOnly) {
    return db.select().from(news).where(eq(news.published, true)).orderBy(desc(news.createdAt))
  }
  return db.select().from(news).orderBy(desc(news.createdAt))
}

export async function createNews(data: {
  title: string
  content: string
  excerpt: string
  image?: string
  author: string
  category: string
  published?: boolean
}) {
  await getAdminUser()
  await db.insert(news).values(data)
  revalidatePath('/admin')
  revalidatePath('/news')
}

export async function updateNews(
  id: number,
  data: {
    title?: string
    content?: string
    excerpt?: string
    image?: string
    author?: string
    category?: string
    published?: boolean
  }
) {
  await getAdminUser()
  await db.update(news).set({ ...data, updatedAt: new Date() }).where(eq(news.id, id))
  revalidatePath('/admin')
  revalidatePath('/news')
}

export async function deleteNews(id: number) {
  await getAdminUser()
  await db.delete(news).where(eq(news.id, id))
  revalidatePath('/admin')
  revalidatePath('/news')
}

// User Management
export async function getUsers() {
  await getAdminUser()
  return db.select().from(user).orderBy(desc(user.createdAt))
}

export async function updateUserRole(userId: string, role: string) {
  await getAdminUser()
  await db.update(user).set({ role, updatedAt: new Date() }).where(eq(user.id, userId))
  revalidatePath('/admin')
}

export async function deleteUser(userId: string) {
  await getAdminUser()
  await db.delete(user).where(eq(user.id, userId))
  revalidatePath('/admin')
}

// Investments CRUD
export async function getInvestmentsAdmin() {
  await getAdminUser()
  return db.select().from(investments).orderBy(desc(investments.createdAt))
}

export async function createInvestment(data: {
  title: string
  description: string
  amount: string
  landSize?: string
  location: string
  returnRate?: string
  duration?: string
}) {
  await getAdminUser()
  await db.insert(investments).values(data)
  revalidatePath('/admin')
  revalidatePath('/investments')
}

export async function updateInvestment(
  id: number,
  data: {
    title?: string
    description?: string
    amount?: string
    landSize?: string
    location?: string
    status?: string
    returnRate?: string
    duration?: string
  }
) {
  await getAdminUser()
  await db.update(investments).set({ ...data, updatedAt: new Date() }).where(eq(investments.id, id))
  revalidatePath('/admin')
  revalidatePath('/investments')
}

export async function deleteInvestment(id: number) {
  await getAdminUser()
  await db.delete(investments).where(eq(investments.id, id))
  revalidatePath('/admin')
  revalidatePath('/investments')
}

// Bookings Management
export async function getAllBookings() {
  await getAdminUser()
  return db
    .select({
      id: bookings.id,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      notes: bookings.notes,
      createdAt: bookings.createdAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      professional: {
        id: professionals.id,
        name: professionals.name,
        title: professionals.title,
      },
    })
    .from(bookings)
    .leftJoin(user, eq(bookings.userId, user.id))
    .leftJoin(professionals, eq(bookings.professionalId, professionals.id))
    .orderBy(desc(bookings.createdAt))
}

export async function updateBookingStatus(id: number, status: string) {
  await getAdminUser()
  await db.update(bookings).set({ status, updatedAt: new Date() }).where(eq(bookings.id, id))
  revalidatePath('/admin')
}
