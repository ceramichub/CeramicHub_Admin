"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/shared/image-upload"
import type { ApiResponse } from "@/lib/api/client-journey"
import { type Testimonial, testimonialsApi } from "@/lib/api/testimonials"

interface TestimonialFormProps {
  testimonial?: any
  onClose: () => void
}

export function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    authorName: testimonial?.author.name || "",
    authorRole: testimonial?.author.role || "",
    authorLocation: testimonial?.author.location || "",
    authorImage: testimonial?.author.image || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating?.toString() || "5",
    featured: testimonial?.featured || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    async function submitData() {
      const payload = {
        author: {
          name: formData.authorName,
          role: formData.authorRole,
          location: formData.authorLocation,
          image: formData.authorImage,
        },
        content: formData.content,
        rating: Number(formData.rating),
        featured: formData.featured,
      }
      try {
        if (payload) {
          const response: ApiResponse<Testimonial> = await testimonialsApi.create(payload)
          if (response.status == "success") {
            console.log("Testimonial created successfully")
          } else {
            console.error("Failed to create testimonial")
          }
        }
      } catch (error) {
        console.error("Error creating testimonial:", error)
      }
    }
    await submitData()
    onClose()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {testimonial ? "Edit Testimonial" : "Add Testimonial"}
              </h1>
              <p className="text-sm text-muted-foreground">Fill in the review details</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
              <CardDescription>Enter the customer's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Full Name*</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorRole">Role*</Label>
                  <Input
                    id="authorRole"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="Homeowner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorLocation">Location*</Label>
                <Input
                  id="authorLocation"
                  value={formData.authorLocation}
                  onChange={(e) => setFormData({ ...formData, authorLocation: e.target.value })}
                  placeholder="San Francisco, CA"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Profile Image</Label>
                <ImageUpload
                  value={formData.authorImage}
                  onChange={(url) => setFormData({ ...formData, authorImage: url as string })}
                  folderName="testimonials"
                  multiple={false}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Review Content</CardTitle>
              <CardDescription>Enter the testimonial text and rating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Text*</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the customer's review here..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating*</Label>
                <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Featured Testimonial</Label>
                  <p className="text-sm text-muted-foreground">Highlight on homepage</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{testimonial ? "Update Testimonial" : "Create Testimonial"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
