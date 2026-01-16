import { useState, useEffect } from "react";
import type { Lead, LeadFilters } from "@/types/lead";
import { leadApiService } from "@/services/lead-api";

export function useLeads(filters?: LeadFilters) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadApiService.getAllLeads(filters);
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [JSON.stringify(filters)]);

  const refresh = () => fetchLeads();

  return { leads, loading, error, refresh };
}
