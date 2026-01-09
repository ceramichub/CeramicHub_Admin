// API service for Materials
// This centralizes all API calls related to materials

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

export interface Material {
  _id: string
  name: string
  description: string
  categoryId: string
  image: string
  colors: string[]
  features: string[]
  startingPrice: string
  featured: boolean
  createdAt: string
}

export const materialsApi = {
  // Get all materials
  async getAll(): Promise<Material[]> {
    const response = await fetch(`${API_BASE_URL}/materials`)
    if (!response.ok) throw new Error("Failed to fetch materials")
    return response.json()
  },

  // Get single material by ID
  async getById(id: string): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/materials/${id}`)
    if (!response.ok) throw new Error("Failed to fetch material")
    return response.json()
  },

  // Create new material
  async create(data: Omit<Material, "_id" | "createdAt">): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create material")
    return response.json()
  },

  // Update material
  async update(id: string, data: Partial<Material>): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/materials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update material")
    return response.json()
  },

  // Delete material
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/materials/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete material")
  },
}
