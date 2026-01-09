"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ApiResponse, clientJourneyApi, ClientJourneyStep } from "@/lib/api/client-journey"

interface ClientJourneyFormProps {
  step?: any
  onClose: () => void
}

export function ClientJourneyForm({ step, onClose }: ClientJourneyFormProps) {
  const [formData, setFormData] = useState({
    step: step?.step?.toString() || "",
    title: step?.title || "",
    description: step?.description || "",
    details: step?.details?.join("\n") || "",
    duration: step?.duration || "",
    icon: step?.icon || "",
    color: step?.color || "",
  })

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    async function submitData() {
      const payload = {
        step: Number(formData.step),
        title: formData.title,
        description: formData.description,
        details: formData.details.split("\n").map((detail: any) => detail.trim()),
        duration: formData.duration,
        icon: formData.icon,
        color: formData.color,
      }
      try{
        if(payload){
          const response: ApiResponse<ClientJourneyStep> = await clientJourneyApi.create(payload);
          if(response.status == "success"){
            console.log("Client journey step created successfully")
          } else {
            console.error("Failed to create client journey step")
          }
        }
      }catch(error){
        console.error("Error creating client journey step:", error)
      }
    }

    await submitData();
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
                {step ? "Edit Journey Step" : "Add Journey Step"}
              </h1>
              <p className="text-sm text-muted-foreground">Fill in the step details</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Journey Step Details</CardTitle>
              <CardDescription>Define the customer journey step</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="step">Step Number*</Label>
                  <Input
                    id="step"
                    type="number"
                    min="1"
                    value={formData.step}
                    onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                    placeholder="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration*</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="1-2 weeks"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Initial Consultation"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of this step"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Details (one per line)*</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Detail point 1&#10;Detail point 2&#10;Detail point 3"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon Reference*</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="calendar"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color Token*</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="brand.500"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{step ? "Update Step" : "Create Step"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
