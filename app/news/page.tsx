import { getNews } from "@/app/actions/public"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { Calendar, User, Plus, Newspaper } from "lucide-react"

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

export default async function NewsPage() {
  const articles = await getNews()
  const session = await auth.api.getSession({ headers: await headers() })
  const isAdmin = (session?.user as any)?.role === 'admin' || ADMIN_EMAILS.includes(session?.user?.email || '')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              News, Events & Resources
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Stay updated with agricultural news, events, and training opportunities. 
              Get the latest insights from the agribusiness sector.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{articles.length} Articles</Badge>
                {isAdmin && (
                  <Link href="/admin?tab=news">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Article
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Published</h3>
                <p className="text-muted-foreground mb-6">Check back later for news and updates.</p>
                {isAdmin && (
                  <Link href="/admin?tab=news">
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add Your First Article
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {article.image && (
                      <div className="relative h-48">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                          {article.category}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button className="w-full py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium">
                        Read More
                      </button>
                    </CardContent>
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
