"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClientJourneyForm } from "./client-journey-form"
import { clientJourneyApi, ClientJourneyStep } from "@/lib/api/client-journey"
import { useRouter } from "next/navigation"
import { ro } from "date-fns/locale"

export function ClientJourneyList() {
  const [steps, setSteps] = useState([] as ClientJourneyStep[])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStep, setEditingStep] = useState<any>(null)

  useEffect(() => {
    async function fetchClientJourney() {
      try {
        const data = await clientJourneyApi.getAll()
        setSteps(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching client journey steps:", error)
        setSteps([])
      }
    }
    fetchClientJourney()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this step?")) {
      setSteps(steps.filter((s) => s._id !== id))
    }
  }

  const handleEdit = (step: any) => {
    setEditingStep(step)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingStep(null)
  }

  if (isFormOpen) {
    return <ClientJourneyForm step={editingStep} onClose={handleFormClose} />
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
                <h1 className="text-xl font-semibold text-foreground">Client Journey</h1>
                <p className="text-sm text-muted-foreground">Manage customer journey steps</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Step
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-4">
          {steps
            .sort((a, b) => Number(a.step) - Number(b.step))
            .map((step) => (
              <Card key={step._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Badge variant="outline" className="h-fit">
                        Step {step.step}
                      </Badge>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">Duration: {step.duration}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(step)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(step._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {step.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
