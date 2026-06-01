'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { bookings, subscriptions, investments, professionals } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Booking Actions
export async function createBooking(data: {
  professionalId: number
  date: string
  time: string
  notes?: string
}) {
  const userId = await getUserId()
  
  await db.insert(bookings).values({
    userId,
    professionalId: data.professionalId,
    date: new Date(data.date),
    time: data.time,
    notes: data.notes || null,
    status: 'pending',
  })
  
  revalidatePath('/bookings')
  return { success: true }
}

export async function getUserBookings() {
  const userId = await getUserId()
  
  const userBookings = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      notes: bookings.notes,
      createdAt: bookings.createdAt,
      professional: {
        id: professionals.id,
        name: professionals.name,
        title: professionals.title,
        image: professionals.image,
      },
    })
    .from(bookings)
    .leftJoin(professionals, eq(bookings.professionalId, professionals.id))
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt))
  
  return userBookings
}

export async function cancelBooking(id: number) {
  const userId = await getUserId()
  
  await db
    .update(bookings)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(and(eq(bookings.id, id), eq(bookings.userId, userId)))
  
  revalidatePath('/bookings')
  return { success: true }
}

// Subscription Actions
export async function createSubscription(plan: string) {
  const userId = await getUserId()
  
  // Check for existing active subscription
  const existing = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
    .limit(1)
  
  if (existing.length > 0) {
    throw new Error('You already have an active subscription')
  }
  
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + (plan === 'annual' ? 12 : 1))
  
  await db.insert(subscriptions).values({
    userId,
    plan,
    status: 'active',
    endDate,
  })
  
  revalidatePath('/subscription')
  return { success: true }
}

export async function getUserSubscription() {
  const userId = await getUserId()
  
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1)
  
  return subscription[0] || null
}

export async function cancelSubscription() {
  const userId = await getUserId()
  
  await db
    .update(subscriptions)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
  
  revalidatePath('/subscription')
  return { success: true }
}

// Investment Actions
export async function getInvestments() {
  return db
    .select()
    .from(investments)
    .where(eq(investments.status, 'open'))
    .orderBy(desc(investments.createdAt))
}

export async function expressInterest(investmentId: number, role: 'investor' | 'landowner') {
  const userId = await getUserId()
  
  const updateData = role === 'investor' 
    ? { investorId: userId } 
    : { landownerId: userId }
  
  await db
    .update(investments)
    .set({ ...updateData, updatedAt: new Date() })
    .where(eq(investments.id, investmentId))
  
  revalidatePath('/investments')
  return { success: true }
}
