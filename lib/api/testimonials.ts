// API service for Testimonials

import { ApiResponse } from "./client-journey"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

export interface Testimonial {
  _id: string
  author: {
    name: string
    role: string
    location: string
    image: string
  }
  content: string
  rating: number
  featured: boolean
  createdAt: string
}

export const testimonialsApi = {
  async getAll(): Promise<ApiResponse<Testimonial[]>> {
    const response = await fetch(`${API_BASE_URL}/testimonial/testimonials`)
    if (!response.ok) throw new Error("Failed to fetch testimonials")
    return response.json();  
  },

  // async getById(id: string): Promise<Testimonial> {
  //   const response = await fetch(`${API_BASE_URL}/testimonials/${id}`)
  //   if (!response.ok) throw new Error("Failed to fetch testimonial")
  //   return response.json()
  // },

  async create(data: Omit<Testimonial, "_id" | "createdAt">): Promise<ApiResponse<Testimonial>> {
    const response = await fetch(`${API_BASE_URL}/testimonial/add-testimonial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create testimonial")
    return response.json()
  },

  // async update(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
  //   const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //   if (!response.ok) throw new Error("Failed to update testimonial")
  //   return response.json()
  // },

  // async delete(id: string): Promise<void> {
  //   const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
  //     method: "DELETE",
  //   })
  //   if (!response.ok) throw new Error("Failed to delete testimonial")
  // },
}
