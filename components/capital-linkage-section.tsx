import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Building, Handshake, CheckCircle, FileText, Eye, TrendingUp } from "lucide-react"
import Image from "next/image"

const benefits = [
  { icon: FileText, label: "Transparent Agreements" },
  { icon: CheckCircle, label: "Secure Documentation" },
  { icon: Eye, label: "Project Monitoring" },
  { icon: TrendingUp, label: "Mutual Value Creation" },
]

export function CapitalLinkageSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1a3a1a] text-center mb-10 flex items-center justify-center gap-2">
          <span className="w-8 h-1 bg-[#c4a43a]"></span>
          CAPITAL LINKAGE: TRIPARTITE AGREEMENT
          <span className="w-8 h-1 bg-[#c4a43a]"></span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Diagram */}
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8 items-center w-full max-w-md">
                {/* Investors */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-[#1a3a1a] rounded-full flex items-center justify-center mb-3">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1a3a1a]">INVESTORS</h4>
                  <p className="text-xs text-muted-foreground">Provide Capital</p>
                </div>

                {/* AgriVest */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-[#c4a43a] rounded-full flex items-center justify-center mb-3 relative">
                    <Image
                      src="/images/agrivest-logo.jpeg"
                      alt="AgriVest"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-[#1a3a1a]">AGRIVEST</h4>
                  <p className="text-xs text-muted-foreground">Facilitates & Manages the Agreement</p>
                </div>

                {/* Landowners */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-[#1a3a1a] rounded-full flex items-center justify-center mb-3">
                    <Building className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1a3a1a]">LANDOWNERS / STRUCTURE OWNERS</h4>
                  <p className="text-xs text-muted-foreground">Provide Land / Structures</p>
                </div>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                <path
                  d="M80 100 L200 100"
                  stroke="#c4a43a"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <path
                  d="M200 100 L320 100"
                  stroke="#c4a43a"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <path
                  d="M80 100 Q200 50 320 100"
                  stroke="#1a3a1a"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-[#1a3a1a] rounded-lg p-8 text-white">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {benefits.map((benefit) => (
                <div key={benefit.label} className="flex items-center gap-3">
                  <div className="p-2 bg-[#c4a43a] rounded-lg">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{benefit.label}</span>
                </div>
              ))}
            </div>
            <Button className="bg-[#c4a43a] hover:bg-[#b3943a] text-white w-full group">
              LEARN MORE
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
