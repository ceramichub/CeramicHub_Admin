"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TestimonialForm } from "./testimonial-form"
import { mockTestimonials } from "@/lib/mock-data"
import { Testimonial, testimonialsApi } from "@/lib/api/testimonials"

export function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([] as Testimonial[])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t._id !== id))
    }
  }

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await testimonialsApi.getAll()
        setTestimonials(data.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      }
    }
    fetchTestimonials()
  }, [])

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingTestimonial(null)
  }

  if (isFormOpen) {
    return <TestimonialForm testimonial={editingTestimonial} onClose={handleFormClose} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Testimonials</h1>
                <p className="text-sm text-muted-foreground">Manage customer reviews and ratings</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <Avatar>
                      <AvatarImage src={testimonial.author.image || "/placeholder.svg"} alt={testimonial.author.name} />
                      <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{testimonial.author.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {testimonial.author.role} • {testimonial.author.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {testimonial.featured && <Badge className="bg-yellow-500">Featured</Badge>}
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
