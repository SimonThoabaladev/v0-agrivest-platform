import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { db } from '@/lib/db'
import { investments } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { InvestmentsList } from '@/components/investments-list'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { requireAuth } from '@/lib/auth-guard'
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Shield,
  FileText,
  Eye,
  Coins,
  ArrowRight,
  CheckCircle,
  Sprout
} from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getOpenInvestments() {
  return db
    .select()
    .from(investments)
    .where(eq(investments.status, 'open'))
    .orderBy(desc(investments.createdAt))
}

const benefits = [
  { icon: FileText, text: 'Transparent Agreements' },
  { icon: Shield, text: 'Secure Documentation' },
  { icon: Eye, text: 'Project Monitoring' },
  { icon: Coins, text: 'Mutual Value Creation' },
]

const investorBenefits = [
  'Access to vetted agricultural investment opportunities',
  'Diversify your portfolio with real agricultural assets',
  'Earn attractive returns on your investment',
  'Professional project management by AgriVest',
  'Regular progress reports and updates',
  'Exit options and profit-sharing agreements',
]

const landownerBenefits = [
  'Access capital without selling your land',
  'Professional farm management support',
  'Share in the profits of agricultural ventures',
  'Maintain ownership of your property',
  'Learn modern farming techniques',
  'Build long-term wealth through partnership',
]

const ADMIN_EMAILS = ['sellosthoabala@gmail.com', 'simonthoabala208@gmail.com']

export default async function InvestmentsPage() {
  await requireAuth('/investments')
  const investmentsList = await getOpenInvestments()
  const session = await auth.api.getSession({ headers: await headers() })
  const isAdmin = (session?.user as any)?.role === 'admin' || ADMIN_EMAILS.includes(session?.user?.email || '')
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a3a1a] via-[#2d5a2d] to-[#1a3a1a] py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#c4a43a]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4a7c4a]/20 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
                <Handshake className="h-4 w-4 text-[#c4a43a]" />
                Capital Linkage Program
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Invest in Lesotho&apos;s <span className="text-[#c4a43a]">Agricultural Future</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Connect investors with landowners through our innovative tripartite agreement model.
                AgriVest facilitates secure, transparent partnerships for sustainable agricultural development.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-[#c4a43a] hover:bg-[#b3943a] text-white">
                    Start Investing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#opportunities">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3a1a]">
                    View Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">The Tripartite Agreement Model</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our unique three-party partnership brings together capital, land, and expertise 
                to create successful agricultural ventures.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="bg-card border-t-4 border-t-[#c4a43a] text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-[#c4a43a]/10 flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-[#c4a43a]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Investors</h3>
                  <p className="text-muted-foreground mb-4">
                    Provide the capital needed to establish and operate agricultural projects. 
                    Earn returns based on project performance.
                  </p>
                  <div className="text-sm text-[#c4a43a] font-medium">Capital Provider</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a3a1a] text-white text-center relative">
                <CardContent className="p-8">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c4a43a] text-white text-xs px-3 py-1 rounded-full">
                    Facilitator
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 mt-2">
                    <Shield className="w-10 h-10 text-[#c4a43a]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AgriVest</h3>
                  <p className="text-white/80 mb-4">
                    Facilitates the partnership, manages documentation, monitors progress, 
                    and ensures fair terms for all parties.
                  </p>
                  <div className="text-sm text-[#c4a43a] font-medium">Agreement Manager</div>
                </CardContent>
              </Card>

              <Card className="bg-card border-t-4 border-t-[#2d5a2d] text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-[#2d5a2d]/10 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-[#2d5a2d]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Landowners</h3>
                  <p className="text-muted-foreground mb-4">
                    Contribute land and structures for agricultural production. 
                    Share in profits while maintaining property ownership.
                  </p>
                  <div className="text-sm text-[#2d5a2d] font-medium">Resource Provider</div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="bg-muted/50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground text-center mb-6">
                Partnership Benefits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#1a3a1a] rounded-xl flex items-center justify-center mb-3">
                      <benefit.icon className="h-6 w-6 text-[#c4a43a]" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For Investors & Landowners */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#c4a43a] rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">For Investors</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Looking for alternative investments with real impact? Agricultural investments 
                    offer stable returns while contributing to food security.
                  </p>
                  <ul className="space-y-3">
                    {investorBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#c4a43a] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="mt-6 bg-[#c4a43a] hover:bg-[#b3943a]">
                      Become an Investor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#2d5a2d] rounded-lg">
                      <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">For Landowners</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Own land that could be more productive? Partner with investors to unlock 
                    the full potential of your property.
                  </p>
                  <ul className="space-y-3">
                    {landownerBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#2d5a2d] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button className="mt-6 bg-[#2d5a2d] hover:bg-[#1a3a1a]">
                      List Your Land
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Investment Opportunities */}
        <section id="opportunities" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Current Investment Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore available agricultural investment opportunities. Each project has been 
                vetted by our team to ensure viability and potential returns.
              </p>
            </div>
            <InvestmentsList investments={investmentsList} isAdmin={isAdmin} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1a3a1a]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re an investor looking for opportunities or a landowner seeking partnerships, 
              AgriVest is here to facilitate your success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-[#c4a43a] hover:bg-[#b3943a] text-white">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3a1a]">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
