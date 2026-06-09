import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, CheckCircle, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProfessionals } from "@/app/actions/public"

export async function ProfessionalsPreview() {
  const allProfessionals = await getProfessionals()
  const professionals = allProfessionals.slice(0, 4)

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3a1a] flex items-center gap-2 text-balance">
              <span className="w-8 h-1 bg-[#c4a43a]" />
              PROFESSIONALS
            </h2>
            <p className="text-muted-foreground mt-2 text-pretty">
              Connect with verified agricultural experts and book services
            </p>
          </div>
          <Link href="/professionals" className="shrink-0">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-[#1a3a1a] border-[#1a3a1a] hover:bg-[#1a3a1a] hover:text-white"
            >
              VIEW ALL EXPERTS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {professionals.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#1a3a1a] mb-2">No Professionals Yet</h3>
            <p className="text-muted-foreground">Check back soon for verified agricultural experts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {professionals.map((professional) => (
              <Card key={professional.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={professional.image || "/placeholder-user.jpg"}
                      alt={professional.name}
                      fill
                      sizes="96px"
                      className="object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#c4a43a] rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#1a3a1a] mb-1 text-balance">{professional.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{professional.title}</p>
                  <Badge variant="secondary" className="mb-3">
                    {professional.specialization}
                  </Badge>
                  {professional.phone && (
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{professional.phone}</span>
                    </div>
                  )}
                  {professional.rate && (
                    <div className="text-lg font-bold text-[#1a3a1a] mb-1">
                      M{Number(professional.rate).toFixed(2)}
                      <span className="text-xs font-normal text-muted-foreground">/session</span>
                    </div>
                  )}
                  <Badge className={professional.available ? "bg-green-600" : "bg-gray-400"}>
                    {professional.available ? "Available" : "Busy"}
                  </Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/professionals/${professional.id}/book`} className="w-full">
                    <Button
                      size="sm"
                      className="w-full bg-[#1a3a1a] hover:bg-[#0d1f0d] text-white"
                      disabled={!professional.available}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
