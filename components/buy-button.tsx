'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ShoppingCart, CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { startProductCheckout } from '@/app/actions/stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
)

interface BuyButtonProps {
  productId: number
  productName: string
  price: string | number
  inStock?: boolean
  className?: string
}

export function BuyButton({ productId, productName, price, inStock = true, className }: BuyButtonProps) {
  const [open, setOpen] = useState(false)
  const [complete, setComplete] = useState(false)

  const fetchClientSecret = useCallback(
    () => startProductCheckout(productId),
    [productId],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setComplete(false)
      }}
    >
      <DialogTrigger asChild>
        <Button className={className} disabled={!inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? 'Buy Now' : 'Out of Stock'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            {productName} &mdash; M{Number(price).toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        {complete ? (
          <div className="flex flex-col items-center text-center py-10 gap-3">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Payment successful</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Thank you for your purchase of {productName}. A confirmation has been sent to your email.
            </p>
            <Button onClick={() => setOpen(false)} className="mt-2">
              Done
            </Button>
          </div>
        ) : (
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret,
                onComplete: () => setComplete(true),
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
