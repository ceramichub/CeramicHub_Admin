// API service for Gallery Items

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

export interface GalleryItem {
  _id: string
  title: string
  description: string
  image: string
  applicationTypeId: string
  tags?: string[]
  isInspirationGalleryVisible?: boolean
  createdAt: string
}

export const galleryApi = {
  async getAll(): Promise<GalleryItem[]> {
    const response = await fetch(`${API_BASE_URL}/gallery`)
    if (!response.ok) throw new Error("Failed to fetch gallery items")
    return response.json()
  },

  async getById(id: string): Promise<GalleryItem> {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`)
    if (!response.ok) throw new Error("Failed to fetch gallery item")
    return response.json()
  },

  async create(data: Omit<GalleryItem, "_id" | "createdAt">): Promise<GalleryItem> {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create gallery item")
    return response.json()
  },

  async update(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update gallery item")
    return response.json()
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete gallery item")
  },
}
