import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin } from "lucide-react"

export function SymposiumBanner() {
  return (
    <section className="py-8 bg-[#c4a43a]/10">
      <div className="container mx-auto px-4">
        <div className="bg-[#1a3a1a] rounded-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 p-8">
            <div className="text-white">
              <p className="text-xs uppercase tracking-wide mb-2 text-[#c4a43a]">
                AGRIVEST CONVENING PARTNER
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                LESOTHO AGRICULTURAL SYMPOSIUM 2026
              </h2>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#c4a43a]" />
                  <span>28 November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#c4a43a]" />
                  <span>Maseru, Lesotho</span>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-6">
                Structuring, Systemising and Professionalising Agriculture for Employment, Food
                Security and Inclusivity.
              </p>
              <Button className="bg-[#c4a43a] hover:bg-[#b3943a] text-white group">
                LEARN MORE
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">CREATING AGRICULTURAL VALUE CHAINS</h3>
                <p className="text-sm text-white/80">
                  Through Innovative Strategic Partnerships & Inclusive Business Development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
