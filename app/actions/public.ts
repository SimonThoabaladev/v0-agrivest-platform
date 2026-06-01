'use server'

import { db } from '@/lib/db'
import { products, professionals, news, services } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getProducts() {
  return db.select().from(products).orderBy(desc(products.createdAt))
}

export async function getProductsByCategory(category: string) {
  return db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt))
}

export async function getProfessionals() {
  return db.select().from(professionals).where(eq(professionals.available, true)).orderBy(desc(professionals.createdAt))
}

export async function getProfessionalsBySpecialization(specialization: string) {
  return db.select().from(professionals).where(eq(professionals.specialization, specialization)).orderBy(desc(professionals.createdAt))
}

export async function getNews() {
  return db.select().from(news).where(eq(news.published, true)).orderBy(desc(news.createdAt))
}

export async function getNewsByCategory(category: string) {
  return db.select().from(news).where(eq(news.category, category)).orderBy(desc(news.createdAt))
}

export async function getServices() {
  return db.select().from(services).orderBy(desc(services.createdAt))
}

export async function getServicesByCategory(category: string) {
  return db.select().from(services).where(eq(services.category, category)).orderBy(desc(services.createdAt))
}
