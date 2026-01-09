"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FAQ_OPTIONS = ["Products & Materials", "Design & Consultation", "Orders & Shipping", "Installation & Maintenance"]

interface FAQCategoryFormProps {
  category?: any
  onClose: () => void
}

export function FAQCategoryForm({ category, onClose }: FAQCategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting FAQ category:", formData)
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
                {category ? "Edit FAQ Category" : "Add FAQ Category"}
              </h1>
              <p className="text-sm text-muted-foreground">Select a category name</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>FAQ Category Details</CardTitle>
              <CardDescription>Select from predefined FAQ categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name*</Label>
                <Select value={formData.name} onValueChange={(value) => setFormData({ ...formData, name: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {FAQ_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
