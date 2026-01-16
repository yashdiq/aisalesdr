export interface Lead {
  id: number;
  name: string;
  job_title?: string;
  phone_number?: string;
  company: string;
  email?: string;
  headcount?: number;
  industry?: string;
  created_at: string;
  updated_at?: string;
}

export interface LeadCreate {
  name: string;
  job_title?: string;
  phone_number?: string;
  company: string;
  email?: string;
  headcount?: number;
  industry?: string;
}

export interface LeadUpdate {
  name?: string;
  job_title?: string;
  phone_number?: string;
  company?: string;
  email?: string;
  headcount?: number;
  industry?: string;
}

export interface LeadFilters {
  industry?: string;
  headcount_min?: number;
  headcount_max?: number;
}
