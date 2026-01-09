"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FAQCategoryForm } from "./faq-category-form"
import { mockFAQCategories } from "@/lib/mock-data"

export function FAQCategoriesList() {
  const [categories, setCategories] = useState(mockFAQCategories)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ category?")) {
      setCategories(categories.filter((c) => c._id !== id))
    }
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  if (isFormOpen) {
    return <FAQCategoryForm category={editingCategory} onClose={handleFormClose} />
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
                <h1 className="text-xl font-semibold text-foreground">FAQ Categories</h1>
                <p className="text-sm text-muted-foreground">Organize FAQ sections</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <CardDescription className="text-xs">
                      Created {new Date(category.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
