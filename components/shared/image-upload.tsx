"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uploadApi } from "@/lib/api/upload"

interface ImageUploadProps {
  value?: string | string[]
  onChange: (url: string | string[]) => void
  folderName?: string
  multiple?: boolean
  maxFiles?: number
}

export function ImageUpload({
  value,
  onChange,
  folderName = "testimonials",
  multiple = false,
  maxFiles = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previews, setPreviews] = useState<string[]>(
    value ? (Array.isArray(value) ? value : [value]).filter(Boolean) : [],
  )

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (multiple && previews.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`)
      return
    }

    const newPreviews: string[] = []
    for (const file of files) {
      const reader = new FileReader()
      await new Promise((resolve) => {
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          resolve(null)
        }
        reader.readAsDataURL(file)
      })
    }

    const updatedPreviews = multiple ? [...previews, ...newPreviews] : newPreviews
    setPreviews(updatedPreviews)

    setIsUploading(true)
    try {
      console.log("[v0] Starting upload for", files.length, "file(s)")
      const response = await uploadApi.uploadFiles(files, folderName)

      console.log("[v0] Upload response status:", response.status)

      if (response.status === "success" && response.data && response.data.length > 0) {
        const uploadedUrls = response.data.map((file) => file.url)
        console.log("[v0] Uploaded URLs:", uploadedUrls)

        if (multiple) {
          const existingUrls = Array.isArray(value) ? value : value ? [value] : []
          const allUrls = [...existingUrls, ...uploadedUrls]
          setPreviews(allUrls)
          onChange(allUrls)
        } else {
          setPreviews([uploadedUrls[0]])
          onChange(uploadedUrls[0])
        }
      } else {
        throw new Error(response.data?.[0]?.error || "Upload failed")
      }
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      setPreviews(value ? (Array.isArray(value) ? value : [value]).filter(Boolean) : [])
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)

    if (multiple) {
      onChange(newPreviews)
    } else {
      onChange("")
    }
  }

  return (
    <div className="space-y-2">
      {previews.length > 0 && (
        <div className={cn("grid gap-4", multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
          {previews.map((preview, index) => (
            <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
              <img
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => handleRemove(index)}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {(!multiple || previews.length < maxFiles) && (
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted cursor-pointer transition-colors",
            isUploading && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className="flex flex-col items-center justify-center py-6">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-2" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-foreground">Click to upload {multiple ? "images" : "image"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 10MB {multiple && `(${previews.length}/${maxFiles})`}
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            multiple={multiple}
          />
        </label>
      )}
    </div>
  )
}
