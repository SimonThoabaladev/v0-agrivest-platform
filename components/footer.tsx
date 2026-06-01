// Footer component for AgriVest agricultural platform
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Professionals", href: "/professionals" },
  { label: "Investment Opportunities", href: "/investment" },
  { label: "News & Events", href: "/news" },
  { label: "Contact Us", href: "/contact" },
]

const services = [
  { label: "Agribusiness Advisory", href: "/services/advisory" },
  { label: "Farm Management", href: "/services/farm-management" },
  { label: "Biosecurity", href: "/services/biosecurity" },
  { label: "Business Support", href: "/services/business-support" },
  { label: "HR Solutions", href: "/services/hr-solutions" },
  { label: "Capital Linkage", href: "/investment/capital-linkage" },
]

const support = [
  { label: "Help Center", href: "/help" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "FAQs", href: "/faqs" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a3a1a] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">SUBSCRIBE TO OUR NEWSLETTER</h3>
              <p className="text-sm text-white/70">Get the latest updates, news and opportunities.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50 w-full md:w-64"
              />
              <Button className="bg-[#c4a43a] hover:bg-[#b3943a] text-white font-semibold">
                SUBSCRIBE
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">FOLLOW US</span>
              <div className="flex gap-3">
                <Link href="#" className="hover:text-[#c4a43a] transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[#c4a43a] transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[#c4a43a] transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[#c4a43a] transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[#c4a43a] transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.jpeg"
              alt="AgriVest Logo"
              width={140}
              height={60}
              className="h-14 w-auto mb-4 rounded bg-white p-1"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Systemizing Agriculture. Empowering Farmers. Building The Future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c4a43a]">QUICK LINKS</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c4a43a]">SERVICES</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c4a43a]">SUPPORT</h4>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#c4a43a]">CONTACT US</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 text-[#c4a43a]" />
                <span>+266 5800 6429</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 text-[#c4a43a]" />
                <span>letsoasen@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-[#c4a43a] flex-shrink-0 mt-0.5" />
                <span>Maseru, Lesotho</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/60">
            <p>&copy; 2026 AgriVest Livestock & Agribusiness Advisory. All Rights Reserved.</p>
            <p>Systemizing Agriculture. Empowering Farmers. Building The Future.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
