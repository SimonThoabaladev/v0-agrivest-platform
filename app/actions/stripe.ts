'use server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

// Starts an embedded Stripe Checkout session for a single product.
// The price is always looked up from the database on the server so the
// client can never tamper with the amount being charged.
export async function startProductCheckout(productId: number, quantity = 1) {
  // Require an authenticated user to purchase
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    throw new Error('You must be signed in to make a purchase.')
  }

  const rows = await db.select().from(products).where(eq(products.id, productId)).limit(1)
  const product = rows[0]
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const qty = Math.max(1, Math.min(quantity, Math.max(1, product.stock || 1)))

  // Prices are stored in Maloti (LSL), pegged 1:1 to ZAR which Stripe supports.
  const unitAmount = Math.round(Number(product.price) * 100)

  const checkoutSession = await stripe.checkout.sessions.create({
    ui_mode: 'embedded_page',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'zar',
          product_data: {
            name: product.name,
            description: product.description?.slice(0, 250) || undefined,
          },
          unit_amount: unitAmount,
        },
        quantity: qty,
      },
    ],
    mode: 'payment',
    metadata: {
      productId: String(product.id),
      userId: session.user.id,
      quantity: String(qty),
    },
  })

  if (!checkoutSession.client_secret) {
    throw new Error('Failed to create checkout session')
  }

  return checkoutSession.client_secret
}
