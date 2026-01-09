// API service for Client Journeys

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

export interface ClientJourneyStep {
    _id: string
    title: string
    description: string
    details: string[]
    step: number
    duration: string
    icon: string
    color: string
    createdAt: string
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

export const clientJourneyApi = {
    async getAll(): Promise<ClientJourneyStep[]> {
        const response = await fetch(`${API_BASE_URL}/client-journey/client-journeys`)
        if (!response.ok) throw new Error("Failed to fetch client journey steps")
        const data = await response.json()    
        return data.data;
    },

    // async getById(id: string): Promise<ClientJourneyStep> {
    //     const response = await fetch(`${API_BASE_URL}/client-journey/${id}`)
    //     if (!response.ok) throw new Error("Failed to fetch client journey step")
    //     return response.json()
    // },

    async create(data: Omit<ClientJourneyStep, "_id" | "createdAt">): Promise<ApiResponse<ClientJourneyStep>> {
        const response = await fetch(`${API_BASE_URL}/client-journey/add-client-journey`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error("Failed to create client journey step")
        return response.json()
    }

    // async update(id: string, data: Partial<ClientJourneyStep>): Promise<ClientJourneyStep> {
    //     const response = await fetch(`${API_BASE_URL}/client-journey/${id}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data),
    //     })
    //     if (!response.ok) throw new Error("Failed to update client journey step")
    //     return response.json()
    // },

    // async delete(id: string): Promise<void> {
    //     const response = await fetch(`${API_BASE_URL}/client-journey/${id}`, {
    //         method: "DELETE",
    //     })
    //     if (!response.ok) throw new Error("Failed to delete client journey step")
    // },
}