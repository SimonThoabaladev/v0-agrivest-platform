import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for individual farmers getting started",
    features: [
      "Basic marketplace access",
      "View professional listings",
      "News & updates",
      "Community forum access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Farmer Pro",
    price: "M 199",
    period: "/month",
    description: "For serious farmers looking to grow their business",
    features: [
      "Full marketplace access",
      "5 professional consultations/month",
      "Priority support",
      "Business analytics dashboard",
      "Verified seller badge",
      "Training resources",
    ],
    cta: "Subscribe Now",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "M 599",
    period: "/month",
    description: "For large farms and agricultural businesses",
    features: [
      "Everything in Farmer Pro",
      "Unlimited consultations",
      "Investment matching",
      "Capital linkage access",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function SubscriptionSection() {
  return (
    <section className="py-16 bg-[#1a3a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Get access to premium features and grow your agricultural business with our flexible subscription plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.highlighted
                  ? "border-[#c4a43a] border-2 shadow-xl md:scale-105"
                  : "border-white/20 bg-white/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-[#c4a43a] text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className={plan.highlighted ? "bg-white" : "bg-transparent"}>
                <h3 className={`text-xl font-bold ${plan.highlighted ? "text-[#1a3a1a]" : "text-white"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-[#1a3a1a]" : "text-white"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-muted-foreground" : "text-white/60"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlighted ? "text-muted-foreground" : "text-white/60"}`}>
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className={plan.highlighted ? "bg-white" : "bg-transparent"}>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`p-0.5 rounded-full ${plan.highlighted ? "bg-[#1a3a1a]" : "bg-[#c4a43a]"}`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className={`text-sm ${plan.highlighted ? "text-foreground" : "text-white/80"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className={plan.highlighted ? "bg-white" : "bg-transparent"}>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-[#1a3a1a] hover:bg-[#0d1f0d] text-white"
                      : "bg-[#c4a43a] hover:bg-[#b3943a] text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
