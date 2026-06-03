"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingCart, Bell, Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  {
    label: "SERVICES",
    href: "/services",
    dropdown: [
      "Agribusiness Advisory",
      "Farm Management",
      "Biosecurity",
      "Business Support",
      "HR Solutions",
    ],
  },
  { label: "MARKETPLACE", href: "/marketplace" },
  { label: "PROFESSIONALS", href: "/professionals" },
  { label: "INVESTMENT", href: "/investments" },
  { label: "NEWS & EVENTS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
]

const ADMIN_EMAILS = ['simonthoabala208@gmail.com']

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  // Check admin role OR admin email
  const isAdmin = (session?.user as any)?.role === "admin" || ADMIN_EMAILS.includes(session?.user?.email || '')

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <span>Convening Partner of</span>
            <span className="font-semibold text-foreground">
              LESOTHO AGRICULTURAL SYMPOSIUM 2026
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services, products, experts..."
                className="pl-10 w-64 h-9 text-sm"
              />
            </div>
            <ShoppingCart className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            
            {isPending ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-24 truncate">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground text-xs">
                    {session.user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-primary" asChild>
                  <Link href="/sign-in">LOGIN</Link>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/sign-up">SIGN UP</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.jpeg"
              alt="AgriVest Logo"
              width={140}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-muted rounded transition-colors">
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem} asChild>
                        <Link href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, "-")}`}>
                          {subItem}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-medium rounded transition-colors ${
                    item.label === "HOME"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {session?.user && isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-primary hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ADMIN DASHBOARD
                </Link>
              )}
              <div className="flex gap-2 px-4 pt-4 border-t border-border mt-2">
                {session?.user ? (
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleSignOut}>
                    SIGN OUT
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href="/sign-in">LOGIN</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary text-primary-foreground" asChild>
                      <Link href="/sign-up">SIGN UP</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export { Header }
