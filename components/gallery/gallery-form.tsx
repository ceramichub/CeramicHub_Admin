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
import { mockApplicationTypes } from "@/lib/mock-data"

interface GalleryFormProps {
  item?: any
  onClose: () => void
}

export function GalleryForm({ item, onClose }: GalleryFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    description: item?.description || "",
    image: item?.image || "",
    applicationTypeId: item?.applicationTypeId || "",
    tags: item?.tags?.join(", ") || "",
    isInspirationGalleryVisible: item?.isInspirationGalleryVisible ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting gallery item:", formData)
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
                {item ? "Edit Gallery Item" : "Add Gallery Item"}
              </h1>
              <p className="text-sm text-muted-foreground">Fill in the showcase details</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Gallery Item Details</CardTitle>
              <CardDescription>Enter the information for this showcase item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Modern Kitchen Design"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of the showcased space"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Showcase Image*</Label>
                <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationType">Application Type*</Label>
                <Select
                  value={formData.applicationTypeId}
                  onValueChange={(value) => setFormData({ ...formData, applicationTypeId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockApplicationTypes.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.applicationType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="modern, kitchen, marble"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="visible">Visible in Gallery</Label>
                  <p className="text-sm text-muted-foreground">Show in inspiration gallery</p>
                </div>
                <Switch
                  id="visible"
                  checked={formData.isInspirationGalleryVisible}
                  onCheckedChange={(checked) => setFormData({ ...formData, isInspirationGalleryVisible: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{item ? "Update Item" : "Create Item"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
