"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationTypeForm } from "./application-type-form"
import { mockApplicationTypes } from "@/lib/mock-data"

export function ApplicationTypesList() {
  const [types, setTypes] = useState(mockApplicationTypes)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingType, setEditingType] = useState<any>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this application type?")) {
      setTypes(types.filter((t) => t._id !== id))
    }
  }

  const handleEdit = (type: any) => {
    setEditingType(type)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingType(null)
  }

  if (isFormOpen) {
    return <ApplicationTypeForm type={editingType} onClose={handleFormClose} />
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
                <h1 className="text-xl font-semibold text-foreground">Application Types</h1>
                <p className="text-sm text-muted-foreground">Residential, Commercial, and Outdoor categories</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Type
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((type) => (
            <Card key={type._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{type.applicationType}</CardTitle>
                    <CardDescription className="text-xs">
                      Created {new Date(type.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(type)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(type._id)}>
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
