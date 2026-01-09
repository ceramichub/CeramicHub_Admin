"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const TYPE_OPTIONS = ["Residential", "Commercial", "Outdoor"]

interface ApplicationTypeFormProps {
  type?: any
  onClose: () => void
}

export function ApplicationTypeForm({ type, onClose }: ApplicationTypeFormProps) {
  const [formData, setFormData] = useState({
    applicationType: type?.applicationType || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting application type:", formData)
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
                {type ? "Edit Application Type" : "Add Application Type"}
              </h1>
              <p className="text-sm text-muted-foreground">Select an application type</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Application Type Details</CardTitle>
              <CardDescription>Select from predefined application types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Application Type*</Label>
                <Select
                  value={formData.applicationType}
                  onValueChange={(value) => setFormData({ ...formData, applicationType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map((option) => (
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
            <Button type="submit">{type ? "Update Type" : "Create Type"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
