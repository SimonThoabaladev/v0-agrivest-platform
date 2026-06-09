"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Lightbulb, TrendingUp, Sprout, Leaf, Sun, Wheat } from "lucide-react"

const features = [
  { icon: Award, label: "EXPERT GUIDANCE", description: "Professional Agricultural Advice" },
  { icon: Lightbulb, label: "PRACTICAL SOLUTIONS", description: "Real-world Implementations" },
  { icon: TrendingUp, label: "SUSTAINABLE RESULTS", description: "Measurable Long-term Impact" },
  { icon: Sprout, label: "PROFITABLE AGRIBUSINESSES", description: "Driving Growth & Profitability" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Main Hero */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-[#1a3a1a] via-[#2d5a2d] to-[#1a3a1a]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c4a43a]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4a7c4a]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c4a43a]/5 rounded-full blur-3xl" />
          
          {/* Floating Icons */}
          <Leaf className="absolute top-32 right-1/4 h-8 w-8 text-[#c4a43a]/30 animate-pulse" />
          <Sun className="absolute top-48 left-1/4 h-10 w-10 text-[#c4a43a]/20" />
          <Wheat className="absolute bottom-32 right-1/3 h-12 w-12 text-white/10" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sprout className="h-4 w-4 text-[#c4a43a]" />
                <span className="text-sm font-medium">AGRIVEST LIVESTOCK & AGRIBUSINESS ADVISORY</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                Systemizing Agriculture.
                <span className="block text-[#c4a43a]">Empowering Farmers.</span>
                Building The Future.
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
                An agribusiness advisory and systems development platform supporting farmers,
                agribusinesses, and investors in building structured, productive, and sustainable
                agricultural enterprises in Lesotho.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#1a3a1a] group backdrop-blur-sm"
                  >
                    EXPLORE SERVICES
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-[#c4a43a] hover:bg-[#b3943a] text-white group shadow-lg shadow-[#c4a43a]/25">
                    JOIN AGRIVEST
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold text-[#c4a43a]">600+</div>
                  <div className="text-sm text-white/70">Farmers Engaged</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#c4a43a]">300+</div>
                  <div className="text-sm text-white/70">Consultations Conducted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#c4a43a]">120+</div>
                  <div className="text-sm text-white/70">Startups Supported</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-[#c4a43a] rounded-xl flex items-center justify-center mb-4">
                    <Wheat className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Marketplace</h3>
                  <p className="text-white/70 text-sm">Buy and sell quality agricultural products with verified sellers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-[#c4a43a] rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Investment</h3>
                  <p className="text-white/70 text-sm">Connect investors with landowners for profitable ventures</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-[#c4a43a] rounded-xl flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Professionals</h3>
                  <p className="text-white/70 text-sm">Book consultations with certified agricultural experts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-[#c4a43a] rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Advisory</h3>
                  <p className="text-white/70 text-sm">Get expert guidance on farm management and business growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-[#0d1f0d]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="p-2 bg-[#c4a43a] rounded-lg shrink-0">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.label}</p>
                  <p className="text-xs text-white/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
