import type { ApiResponse } from "./client-journey"

export interface UploadedFile {
  originalName: string
  filename: string
  url: string
  size: number
  mimetype: string
}

export interface UploadResponse {
  code: number
  data: UploadedFile[]
  status: string
}

class UploadApi {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  }

  async uploadFiles(files: File[], folder: string): Promise<ApiResponse<UploadedFile[]>> {
    try {
      const formData = new FormData()

      // Append all files
      files.forEach((file) => {
        formData.append("files", file)
      })

      formData.append("folder", folder)

      console.log("[v0] Uploading files:", files.length, "to folder:", folder)

      const response = await fetch(`${this.baseUrl}/upload/upload-files`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const result: UploadResponse = await response.json()
      console.log("[v0] Upload response:", result)

      if (result.code === 200 && result.status === "success" && result.data) {
        return {
          code: result.code,
          status: "success",
          data: result.data,
        }
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      return {
        code: 500,
        status: "error",
        data: [{ error: error instanceof Error ? error.message : "Upload failed" }] as any[],
      }
    }
  }
}

export const uploadApi = new UploadApi()
