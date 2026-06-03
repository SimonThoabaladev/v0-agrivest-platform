'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Users, Package, Briefcase, Newspaper, Settings, ArrowLeft, Handshake, CalendarDays } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'
import {
  createService,
  updateService,
  deleteService,
  createProduct,
  updateProduct,
  deleteProduct,
  createProfessional,
  updateProfessional,
  deleteProfessional,
  createNews,
  updateNews,
  deleteNews,
  updateUserRole,
  deleteUser,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  updateBookingStatus,
} from '@/app/actions/admin'
import Link from 'next/link'

interface AdminDashboardProps {
  services: any[]
  products: any[]
  professionals: any[]
  news: any[]
  users: any[]
  investments: any[]
  bookings: any[]
}

export function AdminDashboard({ services, products, professionals, news, users, investments, bookings }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <img src="/images/logo.jpeg" alt="AgriVest" className="h-12 bg-white rounded p-1" />
        </div>
      </header>

      <main className="container mx-auto py-4 md:py-8 px-4">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full gap-1 h-auto p-1">
            <TabsTrigger value="services" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="professionals" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experts</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Handshake className="h-4 w-4" />
              <span className="hidden sm:inline">Investments</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 text-xs">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesTab services={services} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab products={products} />
          </TabsContent>

          <TabsContent value="professionals">
            <ProfessionalsTab professionals={professionals} />
          </TabsContent>

          <TabsContent value="news">
            <NewsTab news={news} />
          </TabsContent>

          <TabsContent value="investments">
            <InvestmentsTab investments={investments} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTab bookings={bookings} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab users={users} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ServicesTab({ services }: { services: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      category: formData.get('category') as string,
    }

    if (editingService) {
      await updateService(editingService.id, data)
    } else {
      await createService(data)
    }
    setLoading(false)
    setIsOpen(false)
    setEditingService(null)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Services</CardTitle>
          <CardDescription>Manage your agricultural services</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
              <DialogDescription>Fill in the service details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingService?.title} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingService?.description} required />
              </div>
              <div>
                <Label htmlFor="icon">Icon (emoji or icon name)</Label>
                <Input id="icon" name="icon" defaultValue={editingService?.icon} />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingService?.category || 'advisory'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advisory">Agribusiness Advisory</SelectItem>
                    <SelectItem value="farm-management">Farm Management</SelectItem>
                    <SelectItem value="biosecurity">Biosecurity</SelectItem>
                    <SelectItem value="compliance">Business Compliance</SelectItem>
                    <SelectItem value="hr">HR Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{service.category}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingService(service)
                      setIsOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No services yet. Add your first service.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ProductsTab({ products }: { products: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!imageUrl) {
      alert('Please upload a product image')
      return
    }
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      image: imageUrl,
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string) || 0,
    }

    if (editingProduct) {
      await updateProduct(editingProduct.id, data)
    } else {
      await createProduct(data)
    }
    setLoading(false)
    setIsOpen(false)
    setEditingProduct(null)
    setImageUrl('')
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      setEditingProduct(null)
      setImageUrl('')
    }
  }

  function handleEdit(product: any) {
    setEditingProduct(product)
    setImageUrl(product.image || '')
    setIsOpen(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Marketplace Products</CardTitle>
          <CardDescription>Manage products in your marketplace</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProduct(null); setImageUrl('') }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
              <DialogDescription>Fill in the product details and upload a photo</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload 
                value={imageUrl} 
                onChange={setImageUrl} 
                label="Product Image"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                </div>
                <div>
                  <Label htmlFor="price">Price (M)</Label>
                  <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingProduct?.description} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingProduct?.category || 'livestock'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="crops">Crops & Seeds</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="feed">Animal Feed</SelectItem>
                      <SelectItem value="fertilizer">Fertilizers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock || 0} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Product'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell>M {product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No products yet. Add your first product.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ProfessionalsTab({ professionals }: { professionals: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!imageUrl) {
      alert('Please upload a photo')
      return
    }
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      specialization: formData.get('specialization') as string,
      bio: formData.get('bio') as string,
      image: imageUrl,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      rate: formData.get('rate') as string,
      available: formData.get('available') === 'on',
    }

    if (editingProfessional) {
      await updateProfessional(editingProfessional.id, data)
    } else {
      await createProfessional(data)
    }
    setLoading(false)
    setIsOpen(false)
    setEditingProfessional(null)
    setImageUrl('')
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      setEditingProfessional(null)
      setImageUrl('')
    }
  }

  function handleEdit(pro: any) {
    setEditingProfessional(pro)
    setImageUrl(pro.image || '')
    setIsOpen(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this professional?')) {
      await deleteProfessional(id)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Agricultural Professionals</CardTitle>
          <CardDescription>Manage experts available for booking</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProfessional(null); setImageUrl('') }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Professional
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProfessional ? 'Edit Professional' : 'Add Professional'}</DialogTitle>
              <DialogDescription>Fill in the expert&apos;s details and upload a photo</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload 
                value={imageUrl} 
                onChange={setImageUrl} 
                label="Professional Photo"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={editingProfessional?.name} required />
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" name="title" placeholder="e.g. Veterinarian" defaultValue={editingProfessional?.title} required />
                </div>
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select name="specialization" defaultValue={editingProfessional?.specialization || 'livestock'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="crops">Crop Production</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="dairy">Dairy Farming</SelectItem>
                    <SelectItem value="agribusiness">Agribusiness</SelectItem>
                    <SelectItem value="veterinary">Veterinary Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" name="bio" rows={3} defaultValue={editingProfessional?.bio} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingProfessional?.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={editingProfessional?.phone} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate">Consultation Rate (M/hour)</Label>
                  <Input id="rate" name="rate" type="number" step="0.01" defaultValue={editingProfessional?.rate} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    defaultChecked={editingProfessional?.available ?? true}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="available">Available for Booking</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Professional'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professionals.map((pro) => (
              <TableRow key={pro.id}>
                <TableCell>
                  <img src={pro.image} alt={pro.name} className="w-12 h-12 object-cover rounded-full" />
                </TableCell>
                <TableCell className="font-medium">{pro.name}</TableCell>
                <TableCell>{pro.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{pro.specialization}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={pro.available ? 'default' : 'outline'}>
                    {pro.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(pro)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(pro.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {professionals.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No professionals yet. Add your first expert.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function NewsTab({ news }: { news: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!imageUrl) {
      alert('Please upload an image')
      return
    }
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      excerpt: formData.get('excerpt') as string,
      image: imageUrl,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      published: formData.get('published') === 'on',
    }

    if (editingNews) {
      await updateNews(editingNews.id, data)
    } else {
      await createNews(data)
    }
    setLoading(false)
    setIsOpen(false)
    setEditingNews(null)
    setImageUrl('')
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      setEditingNews(null)
      setImageUrl('')
    }
  }

  function handleEdit(item: any) {
    setEditingNews(item)
    setImageUrl(item.image || '')
    setIsOpen(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteNews(id)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>News & Articles</CardTitle>
          <CardDescription>Manage agricultural news and updates</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingNews(null); setImageUrl('') }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? 'Edit Article' : 'Add Article'}</DialogTitle>
              <DialogDescription>Write your news article and upload an image</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload 
                value={imageUrl} 
                onChange={setImageUrl} 
                label="Article Image"
              />
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingNews?.title} required />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
                <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={editingNews?.excerpt} required />
              </div>
              <div>
                <Label htmlFor="content">Full Content</Label>
                <Textarea id="content" name="content" rows={6} defaultValue={editingNews?.content} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" defaultValue={editingNews?.author} required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingNews?.category || 'general'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="crops">Crops</SelectItem>
                      <SelectItem value="market">Market Updates</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  defaultChecked={editingNews?.published ?? false}
                  className="h-4 w-4"
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Article'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{article.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={article.published ? 'default' : 'outline'}>
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(article)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {news.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No articles yet. Write your first article.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function UsersTab({ users }: { users: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleRoleChange(userId: string, role: string) {
    setLoading(userId)
    await updateUserRole(userId, role)
    setLoading(null)
  }

  async function handleDelete(userId: string) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setLoading(userId)
      await deleteUser(userId)
      setLoading(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user accounts and roles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Select
                    value={u.role}
                    onValueChange={(value) => handleRoleChange(u.id, value)}
                    disabled={loading === u.id}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(u.id)}
                    disabled={loading === u.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No users yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function InvestmentsTab({ investments }: { investments: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      amount: formData.get('amount') as string,
      landSize: formData.get('landSize') as string,
      location: formData.get('location') as string,
      returnRate: formData.get('returnRate') as string,
      duration: formData.get('duration') as string,
    }

    if (editingInvestment) {
      await updateInvestment(editingInvestment.id, data)
    } else {
      await createInvestment(data)
    }
    setLoading(false)
    setIsOpen(false)
    setEditingInvestment(null)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this investment opportunity?')) {
      await deleteInvestment(id)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Investment Opportunities</CardTitle>
          <CardDescription>Manage capital linkage opportunities</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingInvestment(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingInvestment ? 'Edit Opportunity' : 'Add Opportunity'}</DialogTitle>
              <DialogDescription>Create an investment opportunity</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingInvestment?.title} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} defaultValue={editingInvestment?.description} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Investment Amount (M)</Label>
                  <Input id="amount" name="amount" type="number" step="0.01" defaultValue={editingInvestment?.amount} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={editingInvestment?.location} required />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="landSize">Land Size</Label>
                  <Input id="landSize" name="landSize" placeholder="e.g., 10 hectares" defaultValue={editingInvestment?.landSize} />
                </div>
                <div>
                  <Label htmlFor="returnRate">Return Rate (%)</Label>
                  <Input id="returnRate" name="returnRate" type="number" step="0.01" defaultValue={editingInvestment?.returnRate} />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" placeholder="e.g., 12 months" defaultValue={editingInvestment?.duration} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.title}</TableCell>
                <TableCell>{inv.location}</TableCell>
                <TableCell>M {Number(inv.amount).toLocaleString()}</TableCell>
                <TableCell>{inv.returnRate ? `${inv.returnRate}%` : '-'}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === 'open' ? 'default' : 'secondary'}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingInvestment(inv)
                      setIsOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(inv.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {investments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No investment opportunities yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function BookingsTab({ bookings }: { bookings: any[] }) {
  const [loading, setLoading] = useState<number | null>(null)

  async function handleStatusChange(id: number, status: string) {
    setLoading(id)
    await updateBookingStatus(id, status)
    setLoading(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
        <CardDescription>Manage professional consultation bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Professional</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.user?.name || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">{booking.user?.email}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.professional?.name || 'Unknown'}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === 'confirmed'
                        ? 'default'
                        : booking.status === 'cancelled'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select
                    value={booking.status}
                    onValueChange={(value) => handleStatusChange(booking.id, value)}
                    disabled={loading === booking.id}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No bookings yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
