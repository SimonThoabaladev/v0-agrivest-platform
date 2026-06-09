import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  Tractor,
  Shield,
  FileCheck,
  Users,
} from "lucide-react"

const services = [
  {
    icon: BookOpen,
    title: "AGRIBUSINESS ADVISORY & COACHING",
    items: [
      "Business Planning & Structuring",
      "Financial Record Keeping Setup",
      "Enterprise Development Coaching (Monthly)",
    ],
    color: "bg-[#1a3a1a]",
  },
  {
    icon: Tractor,
    title: "FARM MANAGEMENT & PRODUCTIVITY",
    items: [
      "Farm Layout & Design",
      "Livestock Production Advisory (Per Visit)",
      "Crop Production Systems (Per Visit)",
      "Productivity Improvement Plans",
    ],
    color: "bg-[#2d5a2d]",
  },
  {
    icon: Shield,
    title: "BIOSECURITY & DISEASE CONTROL",
    items: [
      "Biosecurity System Setup",
      "Disease Prevention Planning",
      "LSD (Lumpy Skin Disease) Advisory",
      "FMD (Foot & Mouth Disease) Advisory",
    ],
    color: "bg-[#3a6b3a]",
  },
  {
    icon: FileCheck,
    title: "BUSINESS & COMPLIANCE SUPPORT",
    items: [
      "Agribusiness Registration",
      "Tax Clearance Assistance",
      "Compliance & Documentation Support",
    ],
    color: "bg-[#4a7c4a]",
  },
  {
    icon: Users,
    title: "AGRIBUSINESS HR SOLUTIONS",
    items: [
      "Farm Workforce Structuring",
      "Staff Training & Capacity Building (Per Session)",
      "Operational Systems Setup",
    ],
    color: "bg-[#5a8c5a]",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#1a3a1a] flex items-center gap-2">
            <span className="w-8 h-1 bg-[#c4a43a]"></span>
            OUR SERVICES
            <span className="w-8 h-1 bg-[#c4a43a]"></span>
          </h2>
          <Button variant="outline" className="text-[#1a3a1a] border-[#1a3a1a] hover:bg-[#1a3a1a] hover:text-white">
            VIEW ALL SERVICES
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`${service.color} text-white rounded-lg p-5 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <service.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-3 min-h-[40px]">{service.title}</h3>
              <ul className="space-y-2 text-xs text-white/80">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#c4a43a]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
