import { getProfessionals } from "@/app/actions/public"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { Mail, Phone, Plus, Users } from "lucide-react"

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals()
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
              Agricultural Professionals
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Connect with verified agricultural experts and book services. 
              Our professionals are ready to help with advisory, farm management, and more.
            </p>
          </div>
        </section>

        {/* Professionals Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Find Experts</h2>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{professionals.length} Professionals</Badge>
                {isAdmin && (
                  <Link href="/admin?tab=professionals">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Professional
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {professionals.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Professionals Available</h3>
                <p className="text-muted-foreground mb-6">Check back later for available experts.</p>
                {isAdmin && (
                  <Link href="/admin?tab=professionals">
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add Your First Professional
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((professional) => (
                  <Card key={professional.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-64 bg-muted">
                      <Image
                        src={professional.image || "/placeholder-user.jpg"}
                        alt={professional.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{professional.name}</h3>
                          <p className="text-sm text-primary font-medium">{professional.title}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {professional.specialization}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{professional.bio}</p>
                      
                      {professional.rate && (
                        <p className="text-sm font-semibold text-foreground mb-4">
                          Rate: <span className="text-primary">M{Number(professional.rate).toFixed(2)}/session</span>
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {professional.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{professional.email}</span>
                          </div>
                        )}
                        {professional.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{professional.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <Link href={`/professionals/${professional.id}/book`}>
                        <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                          Book Consultation
                        </button>
                      </Link>
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
