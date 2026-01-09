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
import { mockCategories } from "@/lib/mock-data"

interface MaterialFormProps {
  material?: any
  onClose: () => void
}

export function MaterialForm({ material, onClose }: MaterialFormProps) {
  const [formData, setFormData] = useState({
    name: material?.name || "",
    description: material?.description || "",
    categoryId: material?.categoryId || "",
    image: material?.image || "",
    colors: material?.colors?.join(", ") || "",
    features: material?.features?.join("\n") || "",
    startingPrice: material?.startingPrice || "",
    featured: material?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting material:", formData)
    // Here you would call your API
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
              <h1 className="text-xl font-semibold text-foreground">{material ? "Edit Material" : "Add Material"}</h1>
              <p className="text-sm text-muted-foreground">Fill in the details below</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
              <CardDescription>Enter the information for this flooring material</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Material Name*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Italian Marble"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter a short marketing description"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product Image*</Label>
                <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="colors">Color Palette (comma-separated hex codes)*</Label>
                <Input
                  id="colors"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  placeholder="#8B7355, #D4C4B0, #F5F5DC"
                  required
                />
                <p className="text-xs text-muted-foreground">Enter hex color codes separated by commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)*</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Durable and long-lasting&#10;Water resistant&#10;Easy to maintain"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Starting Price*</Label>
                <Input
                  id="price"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  placeholder="$8.99/sq ft"
                  required
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Featured Product</Label>
                  <p className="text-sm text-muted-foreground">Display on homepage</p>
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
            <Button type="submit">{material ? "Update Material" : "Create Material"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
