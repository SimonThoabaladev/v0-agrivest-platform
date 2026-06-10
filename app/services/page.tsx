import { getServices } from '@/app/actions/public'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { requireAuth } from '@/lib/auth-guard'
import Link from 'next/link'
import { 
  Briefcase, 
  Leaf, 
  Shield, 
  FileCheck, 
  Users,
  TrendingUp,
  Building,
  Calculator,
  Sprout,
  Bug,
  Scale,
  GraduationCap,
  Plus,
  Settings
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

const iconMap: Record<string, React.ReactNode> = {
  'briefcase': <Briefcase className="w-8 h-8" />,
  'leaf': <Leaf className="w-8 h-8" />,
  'shield': <Shield className="w-8 h-8" />,
  'filecheck': <FileCheck className="w-8 h-8" />,
  'users': <Users className="w-8 h-8" />,
  'trending': <TrendingUp className="w-8 h-8" />,
  'building': <Building className="w-8 h-8" />,
  'calculator': <Calculator className="w-8 h-8" />,
  'sprout': <Sprout className="w-8 h-8" />,
  'bug': <Bug className="w-8 h-8" />,
  'scale': <Scale className="w-8 h-8" />,
  'graduation': <GraduationCap className="w-8 h-8" />,
}

const categoryColors: Record<string, string> = {
  'advisory': 'bg-primary/10 text-primary',
  'management': 'bg-secondary/10 text-secondary',
  'biosecurity': 'bg-red-100 text-red-700',
  'compliance': 'bg-blue-100 text-blue-700',
  'hr': 'bg-purple-100 text-purple-700',
  'default': 'bg-muted text-muted-foreground'
}

export default async function ServicesPage() {
  await requireAuth('/services')
  const services = await getServices()
  const session = await auth.api.getSession({ headers: await headers() })
  const isAdmin = (session?.user as any)?.role === 'admin' || ADMIN_EMAILS.includes(session?.user?.email || '')

  // Default services if database is empty
  const defaultServices = [
    {
      id: 1,
      title: 'Agribusiness Advisory & Coaching',
      description: 'Business Planning & Structuring, Financial Record Keeping Setup, Enterprise Development Coaching',
      icon: 'briefcase',
      category: 'advisory'
    },
    {
      id: 2,
      title: 'Farm Management & Productivity',
      description: 'Farm Layout & Design, Livestock Production Advisory, Crop Production Systems',
      icon: 'leaf',
      category: 'management'
    },
    {
      id: 3,
      title: 'Biosecurity & Disease Control',
      description: 'Biosecurity System Setup, Disease Prevention Planning, LSD & FMD Advisory',
      icon: 'shield',
      category: 'biosecurity'
    },
    {
      id: 4,
      title: 'Business & Compliance Support',
      description: 'Agribusiness Registration, Tax Clearance Assistance, Compliance & Documentation Support',
      icon: 'filecheck',
      category: 'compliance'
    },
    {
      id: 5,
      title: 'Agribusiness HR Solutions',
      description: 'Farm Workforce Structuring, Staff Training & Capacity Building, Operational Systems Setup',
      icon: 'users',
      category: 'hr'
    },
    {
      id: 6,
      title: 'Investment & Capital Linkage',
      description: 'Connect investors with landowners and structure owners for mutual agricultural investments',
      icon: 'trending',
      category: 'advisory'
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices
  const showDefaultServices = services.length === 0

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-pretty">
              Comprehensive agricultural solutions designed to help you succeed in farming, 
              livestock management, and agribusiness development.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {isAdmin && (
              <div className="flex justify-end mb-8">
                <Link href="/admin?tab=services">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Service
                  </Button>
                </Link>
              </div>
            )}

            {showDefaultServices && isAdmin && (
              <div className="text-center py-8 mb-8 bg-muted/50 rounded-lg">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Showing Default Services</h3>
                <p className="text-muted-foreground mb-4">Add your own custom services to replace these defaults.</p>
                <Link href="/admin?tab=services">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Custom Service
                  </Button>
                </Link>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${categoryColors[service.category] || categoryColors.default}`}>
                      {iconMap[service.icon || 'briefcase'] || <Briefcase className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[service.category] || categoryColors.default}`}>
                        {service.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our team of agricultural experts to discuss your specific needs and 
              how we can help you achieve your farming goals.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
