import type { Lead, LeadCreate, LeadUpdate, LeadFilters } from "@/types/lead";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class LeadApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = `${baseUrl}/api/leads`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async getAllLeads(filters?: LeadFilters): Promise<Lead[]> {
    const params = new URLSearchParams();
    if (filters?.industry) params.append("industry", filters.industry);
    if (filters?.headcount_min !== undefined)
      params.append("headcount_min", filters.headcount_min.toString());
    if (filters?.headcount_max !== undefined)
      params.append("headcount_max", filters.headcount_max.toString());

    const query = params.toString();
    const endpoint = query ? `?${query}` : "";
    return this.request<Lead[]>(endpoint);
  }

  async getLeadById(id: number): Promise<Lead> {
    return this.request<Lead>(`/${id}`);
  }

  async createLead(data: LeadCreate): Promise<Lead> {
    return this.request<Lead>("", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateLead(id: number, data: LeadUpdate): Promise<Lead> {
    return this.request<Lead>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteLead(id: number): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: "DELETE",
    });
  }

  async enrichLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/${id}/enrich`, {
      method: "POST",
    });
  }
}

export const leadApiService = new LeadApiService();
