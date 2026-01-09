"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GalleryForm } from "./gallery-form"
import { mockGalleryItems, mockApplicationTypes } from "@/lib/mock-data"

export function GalleryList() {
  const [items, setItems] = useState(mockGalleryItems)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      setItems(items.filter((i) => i._id !== id))
    }
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingItem(null)
  }

  const getApplicationType = (typeId: string) => {
    return mockApplicationTypes.find((t) => t._id === typeId)?.applicationType || "Unknown"
  }

  if (isFormOpen) {
    return <GalleryForm item={editingItem} onClose={handleFormClose} />
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
                <h1 className="text-xl font-semibold text-foreground">Gallery Items</h1>
                <p className="text-sm text-muted-foreground">Manage inspiration gallery showcase</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Gallery Item
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant={item.isInspirationGalleryVisible ? "default" : "secondary"}>
                    {item.isInspirationGalleryVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{getApplicationType(item.applicationTypeId)}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
