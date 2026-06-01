import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, UserCheck, TrendingUp, Newspaper } from "lucide-react"

const features = [
  {
    icon: ShoppingBag,
    title: "MARKETPLACE",
    description: "Buy, sell and trade agricultural products with ease",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
    cta: "BUY & SELL NOW",
    href: "/marketplace",
    color: "border-[#c4a43a]",
  },
  {
    icon: UserCheck,
    title: "PROFESSIONALS",
    description: "Connect with verified agricultural experts and book services",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
    cta: "FIND EXPERTS",
    href: "/professionals",
    color: "border-[#1a3a1a]",
  },
  {
    icon: TrendingUp,
    title: "INVESTMENT & CAPITAL LINKAGE",
    description: "Connect investors with landowners and structure owners for inclusivity",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    cta: "EXPLORE INVESTMENTS",
    href: "/investment",
    color: "border-[#c4a43a]",
  },
  {
    icon: Newspaper,
    title: "NEWS, EVENTS & RESOURCES",
    description: "Stay updated with agricultural news, events and training",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=300&fit=crop",
    cta: "EXPLORE NOW",
    href: "/news",
    color: "border-[#1a3a1a]",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 ${feature.color}`}
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <feature.icon className="h-5 w-5 text-[#1a3a1a]" />
                  <h3 className="font-bold text-sm text-[#1a3a1a]">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[#1a3a1a] border-[#1a3a1a] hover:bg-[#1a3a1a] hover:text-white group"
                >
                  {feature.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
