// API service for Categories

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

export interface Category {
  _id: string
  name: string
  createdAt: string
}

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`)
    if (!response.ok) throw new Error("Failed to fetch categories")
    return response.json()
  },

  async getById(id: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`)
    if (!response.ok) throw new Error("Failed to fetch category")
    return response.json()
  },

  async create(data: Omit<Category, "_id" | "createdAt">): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create category")
    return response.json()
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update category")
    return response.json()
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete category")
  },
}
