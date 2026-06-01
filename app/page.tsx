import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesSection } from "@/components/features-section"
import { CapitalLinkageSection } from "@/components/capital-linkage-section"
import { MarketplacePreview } from "@/components/marketplace-preview"
import { ProfessionalsPreview } from "@/components/professionals-preview"
import { SubscriptionSection } from "@/components/subscription-section"
import { SymposiumBanner } from "@/components/symposium-banner"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <MarketplacePreview />
        <ProfessionalsPreview />
        <CapitalLinkageSection />
        <SubscriptionSection />
        <SymposiumBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
