import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, MapPin, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Organic Maize Seeds",
    category: "Seeds",
    price: "M 350",
    unit: "per 25kg bag",
    rating: 4.8,
    location: "Maseru",
    image: "/marketplace/grain-winnowing.jpeg",
    seller: "Green Farm Co.",
    verified: true,
  },
  {
    id: 2,
    name: "Merino Sheep",
    category: "Livestock",
    price: "M 2,500",
    unit: "per head",
    rating: 4.9,
    location: "Leribe",
    image: "/marketplace/cattle-grazing.jpeg",
    seller: "Highland Ranch",
    verified: true,
  },
  {
    id: 3,
    name: "Dairy Cattle Feed",
    category: "Feed",
    price: "M 450",
    unit: "per 50kg bag",
    rating: 4.7,
    location: "Berea",
    image: "/marketplace/grain-village.jpeg",
    seller: "AgriFeeds Ltd",
    verified: true,
  },
  {
    id: 4,
    name: "Tractor Hire Service",
    category: "Equipment",
    price: "M 800",
    unit: "per day",
    rating: 4.6,
    location: "Mafeteng",
    image: "/marketplace/mountain-village.jpeg",
    seller: "Farm Mechanix",
    verified: false,
  },
]

export function MarketplacePreview() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3a1a] flex items-center gap-2">
              <span className="w-8 h-1 bg-[#c4a43a]"></span>
              MARKETPLACE
            </h2>
            <p className="text-muted-foreground mt-2">Buy, sell and trade agricultural products with ease</p>
          </div>
          <Button variant="outline" className="text-[#1a3a1a] border-[#1a3a1a] hover:bg-[#1a3a1a] hover:text-white w-full sm:w-auto">
            VIEW ALL PRODUCTS
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-[#1a3a1a]">{product.category}</Badge>
                {product.verified && (
                  <Badge className="absolute top-2 right-2 bg-[#c4a43a]">Verified</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1a3a1a] mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">by {product.seller}</p>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Star className="h-4 w-4 text-[#c4a43a] fill-[#c4a43a]" />
                  <span>{product.rating}</span>
                  <span className="text-muted-foreground">•</span>
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{product.location}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-[#1a3a1a]">{product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.unit}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button size="sm" className="w-full bg-[#1a3a1a] hover:bg-[#0d1f0d] text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
