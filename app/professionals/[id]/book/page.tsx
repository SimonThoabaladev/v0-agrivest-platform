import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { professionals } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { BookProfessionalForm } from '@/components/book-professional-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'

export default async function BookProfessionalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const { id } = await params
  
  const professional = await db
    .select()
    .from(professionals)
    .where(eq(professionals.id, parseInt(id)))
    .limit(1)
  
  if (!professional[0]) {
    redirect('/professionals')
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Consultation</h1>
          <p className="text-muted-foreground mb-8">
            Schedule a session with {professional[0].name}
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={professional[0].image || '/images/placeholder-professional.jpg'}
                alt={professional[0].name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{professional[0].name}</h2>
                <p className="text-primary">{professional[0].title}</p>
                <p className="text-muted-foreground text-sm">{professional[0].specialization}</p>
                {professional[0].rate && (
                  <p className="text-secondary font-medium mt-1">
                    M{Number(professional[0].rate).toFixed(2)}/session
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <BookProfessionalForm professionalId={parseInt(id)} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
