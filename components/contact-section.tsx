"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-[#1a3a1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#c4a43a]"></span>
              GET IN TOUCH
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions about our services or need assistance? Our team is here to help you
              grow your agricultural business.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a3a1a] rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a3a1a]">Phone</h4>
                  <p className="text-muted-foreground">+266 568 06 429</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a3a1a] rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a3a1a]">Email</h4>
                  <p className="text-muted-foreground">letsosaren@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a3a1a] rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a3a1a]">Address</h4>
                  <p className="text-muted-foreground">Maseru, Lesotho</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a3a1a] rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a3a1a]">Business Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-[#1a3a1a] mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-1 block">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1 block">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1 block">
                  Phone Number
                </label>
                <Input id="phone" placeholder="+266 xxxx xxxx" />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-foreground mb-1 block">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-1 block">
                  Message
                </label>
                <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={4} />
              </div>
              <Button className="w-full bg-[#1a3a1a] hover:bg-[#0d1f0d] text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
