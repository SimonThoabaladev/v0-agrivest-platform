import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  Sprout,
  Handshake,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with transparency and honesty in all our dealings with farmers, investors, and partners.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in the power of community and work to strengthen agricultural networks across Lesotho.'
  },
  {
    icon: Sprout,
    title: 'Sustainability',
    description: 'We promote environmentally responsible farming practices for long-term agricultural success.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide, from advisory to marketplace solutions.'
  },
]

const milestones = [
  { year: '2020', title: 'Founded', description: 'AgriVest was established in Maseru, Lesotho' },
  { year: '2021', title: 'First 100 Farmers', description: 'Reached our first milestone of serving 100 farmers' },
  { year: '2023', title: 'Marketplace Launch', description: 'Launched our digital marketplace platform' },
  { year: '2024', title: 'Capital Linkage', description: 'Introduced investor-landowner partnership program' },
  { year: '2026', title: 'Agricultural Symposium', description: 'Hosting the first Lesotho Agricultural Symposium' },
]

const team = [
  {
    name: 'Dr. Thabo Mokoena',
    role: 'Founder & CEO',
    bio: 'Agricultural economist with 15+ years of experience in livestock management and agribusiness development.',
  },
  {
    name: 'Mpho Letsie',
    role: 'Chief Operations Officer',
    bio: 'Expert in agricultural supply chain management and rural development initiatives.',
  },
  {
    name: 'Lineo Mohapi',
    role: 'Head of Advisory Services',
    bio: 'Certified agricultural consultant specializing in sustainable farming practices.',
  },
  {
    name: 'Teboho Nkuebe',
    role: 'Investment Director',
    bio: 'Financial expert focused on agricultural investments and capital linkage programs.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a3a1a] via-[#2d5a2d] to-[#1a3a1a] py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#c4a43a]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4a7c4a]/20 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
                <Sprout className="h-4 w-4 text-[#c4a43a]" />
                About AgriVest
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                Transforming Agriculture in Lesotho Through Innovation
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                AgriVest Livestock & Agribusiness Advisory is dedicated to systemizing agriculture, 
                empowering farmers, and building a sustainable future for Lesotho&apos;s agricultural sector.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-[#1a3a1a] bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#1a3a1a] rounded-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To revolutionize agriculture in Lesotho by providing comprehensive advisory services, 
                    facilitating market access, connecting investors with landowners, and empowering farmers 
                    with the knowledge and resources they need to build profitable, sustainable agribusinesses.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#c4a43a] bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#c4a43a] rounded-lg">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading agricultural ecosystem in Southern Africa, where every farmer has 
                    access to expert guidance, fair markets, and investment opportunities, creating a 
                    thriving agricultural sector that ensures food security and economic prosperity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                AgriVest was born from a deep understanding of the challenges facing Lesotho&apos;s 
                agricultural sector. Our founders, with decades of combined experience in agriculture, 
                finance, and rural development, recognized the need for a comprehensive platform that 
                could address the fragmented nature of agricultural services in the country.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="inline-block bg-card">
                        <CardContent className="p-6">
                          <span className="text-[#c4a43a] font-bold text-lg">{milestone.year}</span>
                          <h3 className="font-semibold text-foreground mt-1">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-[#1a3a1a] rounded-full border-4 border-background shrink-0 z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at AgriVest, from how we serve our farmers 
                to how we build partnerships with investors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-[#1a3a1a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-[#c4a43a]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our experienced team brings together expertise in agriculture, finance, and rural development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card key={member.name} className="bg-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1a3a1a] to-[#2d5a2d] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-white/80" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-[#c4a43a] font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-t-4 border-t-[#1a3a1a]">
                <CardContent className="p-6">
                  <TrendingUp className="h-10 w-10 text-[#1a3a1a] mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Advisory Services</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Agribusiness Planning & Structuring
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Farm Management & Productivity
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Biosecurity & Disease Control
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Business & Compliance Support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-t-4 border-t-[#c4a43a]">
                <CardContent className="p-6">
                  <Handshake className="h-10 w-10 text-[#c4a43a] mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Capital Linkage</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Investor-Landowner Matching
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Tripartite Agreement Facilitation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Project Monitoring & Support
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Secure Documentation
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-t-4 border-t-[#2d5a2d]">
                <CardContent className="p-6">
                  <Sprout className="h-10 w-10 text-[#2d5a2d] mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Marketplace & More</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Agricultural Product Marketplace
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Professional Expert Booking
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      News & Resources
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#c4a43a] shrink-0 mt-0.5" />
                      Events & Training
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1a3a1a]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Agricultural Journey?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers, investors, and agricultural professionals who are part of the AgriVest ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-[#c4a43a] hover:bg-[#b3943a] text-white">
                  Join AgriVest Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3a1a]">
                  Contact Us
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
