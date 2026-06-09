'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  CheckCircle
} from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    details: ['AgriVest House', 'Kingsway Road', 'Maseru 100', 'Lesotho'],
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: ['+266 568 06 429'],
  },
  {
    icon: Mail,
    title: 'Email Addresses',
    details: ['letsosaren@gmail.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
  },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
              <Mail className="h-4 w-4 text-[#c4a43a]" />
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions about our services? Want to partner with us? We&apos;d love to hear from you.
              Reach out and let&apos;s discuss how we can help transform your agricultural journey.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-20">
              {contactInfo.map((item) => (
                <Card key={item.title} className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-[#1a3a1a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-7 w-7 text-[#c4a43a]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                    <div className="space-y-1">
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We&apos;ll get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+266 XXXX XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#1a3a1a] hover:bg-[#0d1f0d]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-6">
                <Card className="bg-card overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-[#1a3a1a]/10 to-[#c4a43a]/10 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="h-16 w-16 text-[#1a3a1a] mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Visit Our Office</h3>
                      <p className="text-muted-foreground text-sm">
                        AgriVest House, Kingsway Road<br />
                        Maseru 100, Lesotho
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Follow us on social media for the latest updates, agricultural tips, 
                      and community news.
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-10 h-10 bg-[#1a3a1a] rounded-lg flex items-center justify-center text-white hover:bg-[#c4a43a] transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a3a1a] text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Need Urgent Assistance?</h3>
                    <p className="text-white/80 text-sm mb-4">
                      For immediate support or emergency agricultural consultations, 
                      call our hotline.
                    </p>
                    <a 
                      href="tel:+26656806429" 
                      className="inline-flex items-center gap-2 bg-[#c4a43a] text-white px-4 py-2 rounded-lg hover:bg-[#b3943a] transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      +266 568 06 429
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about AgriVest services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How do I become a member?</h3>
                  <p className="text-sm text-muted-foreground">
                    Simply create an account on our platform and choose a subscription plan that 
                    suits your needs. You can start with our free tier and upgrade anytime.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">What areas do you serve?</h3>
                  <p className="text-sm text-muted-foreground">
                    We primarily serve Lesotho but are expanding our services across Southern Africa. 
                    Our digital platform is accessible from anywhere.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How does capital linkage work?</h3>
                  <p className="text-sm text-muted-foreground">
                    We connect investors with landowners through a tripartite agreement. AgriVest 
                    facilitates the partnership, provides oversight, and ensures fair terms for all parties.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Can I sell on the marketplace?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Verified farmers and suppliers can list their agricultural products on our 
                    marketplace. Contact us to become a verified seller.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
