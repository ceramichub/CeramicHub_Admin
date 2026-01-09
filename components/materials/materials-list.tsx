"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MaterialForm } from "./material-form"
import { mockMaterials, mockCategories } from "@/lib/mock-data"

export function MaterialsList() {
  const [materials, setMaterials] = useState(mockMaterials)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<any>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter((m) => m._id !== id))
    }
  }

  const handleEdit = (material: any) => {
    setEditingMaterial(material)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingMaterial(null)
  }

  const getCategoryName = (categoryId: string) => {
    return mockCategories.find((c) => c._id === categoryId)?.name || "Unknown"
  }

  if (isFormOpen) {
    return <MaterialForm material={editingMaterial} onClose={handleFormClose} />
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
                <h1 className="text-xl font-semibold text-foreground">Materials</h1>
                <p className="text-sm text-muted-foreground">Manage flooring products and materials</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <Card key={material._id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={material.image || "/placeholder.svg"}
                  alt={material.name}
                  className="w-full h-full object-cover"
                />
                {material.featured && <Badge className="absolute top-2 right-2 bg-yellow-500">Featured</Badge>}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    <CardDescription>{getCategoryName(material.categoryId)}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(material)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(material._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {material.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="h-6 w-6 rounded-full border-2 border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{material.startingPrice}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
