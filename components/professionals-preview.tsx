import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, MapPin, Calendar, CheckCircle } from "lucide-react"

const professionals = [
  {
    id: 1,
    name: "Dr. Thabo Mokoena",
    specialty: "Veterinary Services",
    rating: 4.9,
    reviews: 127,
    location: "Maseru",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
    available: true,
    verified: true,
    hourlyRate: "M 350",
  },
  {
    id: 2,
    name: "Mme Lineo Ntho",
    specialty: "Crop Specialist",
    rating: 4.8,
    reviews: 89,
    location: "Leribe",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    available: true,
    verified: true,
    hourlyRate: "M 280",
  },
  {
    id: 3,
    name: "Ntate Moshe Rabolele",
    specialty: "Farm Management",
    rating: 4.7,
    reviews: 156,
    location: "Berea",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    available: false,
    verified: true,
    hourlyRate: "M 400",
  },
  {
    id: 4,
    name: "Dr. Palesa Mofokeng",
    specialty: "Animal Nutrition",
    rating: 4.9,
    reviews: 203,
    location: "Maseru",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    available: true,
    verified: true,
    hourlyRate: "M 320",
  },
]

export function ProfessionalsPreview() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#1a3a1a] flex items-center gap-2">
              <span className="w-8 h-1 bg-[#c4a43a]"></span>
              PROFESSIONALS
            </h2>
            <p className="text-muted-foreground mt-2">Connect with verified agricultural experts and book services</p>
          </div>
          <Button variant="outline" className="text-[#1a3a1a] border-[#1a3a1a] hover:bg-[#1a3a1a] hover:text-white">
            VIEW ALL EXPERTS
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {professional.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#c4a43a] rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-[#1a3a1a] mb-1">{professional.name}</h3>
                <Badge variant="secondary" className="mb-2">{professional.specialty}</Badge>
                <div className="flex items-center justify-center gap-2 text-sm mb-2">
                  <Star className="h-4 w-4 text-[#c4a43a] fill-[#c4a43a]" />
                  <span className="font-medium">{professional.rating}</span>
                  <span className="text-muted-foreground">({professional.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{professional.location}</span>
                </div>
                <div className="text-lg font-bold text-[#1a3a1a] mb-1">
                  {professional.hourlyRate}
                  <span className="text-xs font-normal text-muted-foreground">/hour</span>
                </div>
                <Badge className={professional.available ? "bg-green-600" : "bg-gray-400"}>
                  {professional.available ? "Available" : "Busy"}
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  size="sm"
                  className="w-full bg-[#1a3a1a] hover:bg-[#0d1f0d] text-white"
                  disabled={!professional.available}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
