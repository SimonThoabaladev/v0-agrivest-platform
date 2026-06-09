import { Users, MessageSquare, Rocket, Building2, Sprout, TrendingUp } from "lucide-react"

const stats = [
  { icon: Users, value: "600+", label: "Farmers engaged through advisory and training services" },
  { icon: MessageSquare, value: "300+", label: "Consultations conducted across crop and livestock systems" },
  { icon: Rocket, value: "120+", label: "Agribusiness startups supported at early development stage" },
  { icon: Building2, value: "45+", label: "Small agribusinesses structurally developed" },
  { icon: Sprout, value: "25+", label: "Youth-led agricultural initiatives supported" },
  { icon: TrendingUp, value: "M3M–M7M", label: "Estimated value of agricultural opportunities facilitated" },
]

export function ImpactSection() {
  return (
    <section className="py-16 bg-[#0d1f0d]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-[#c4a43a]"></span>
            OUR IMPACT (2026 SNAPSHOT)
          </h2>
          <p className="text-white/70 leading-relaxed">
            Measurable results from our work supporting farmers, agribusinesses, and investors in building
            structured, productive, and sustainable agricultural enterprises in Lesotho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-[#c4a43a] rounded-xl flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-[#c4a43a] mb-2">{stat.value}</div>
              <p className="text-sm text-white/70 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
