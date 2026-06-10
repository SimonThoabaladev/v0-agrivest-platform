import { getFarmFeedProducts } from "@/app/actions/public"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { BuyButton } from "@/components/buy-button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAuth } from "@/lib/auth-guard"

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

async function getIsAdmin() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) return false
    const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1)
    return dbUser[0]?.role === 'admin' || ADMIN_EMAILS.includes(session.user.email || '')
  } catch {
    return false
  }
}

export default async function FarmFeedsPage() {
  await requireAuth('/farm-feeds')

  const products = await getFarmFeedProducts()
  const isAdmin = await getIsAdmin()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Farm Feeds &amp; Medication
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Quality animal feeds, supplements and veterinary medication to keep your livestock
              healthy and productive. Sourced from trusted suppliers.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground">Available Products</h2>
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Button asChild>
                    <Link href="/admin?tab=products">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Link>
                  </Button>
                )}
                <Badge variant="secondary">{products.length} Products</Badge>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Products Available</h3>
                <p className="text-muted-foreground mb-6">Check back later for new farm feeds and medication.</p>
                {isAdmin && (
                  <Button asChild size="lg">
                    <Link href="/admin?tab=products">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Product
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                        {product.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          M{Number(product.price).toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.stock} in stock
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <BuyButton
                        productId={product.id}
                        productName={product.name}
                        price={product.price}
                        inStock={product.stock > 0}
                        className="w-full"
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
