import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Lead, LeadFilters } from "@/types/lead";
import { useLeads } from "@/hooks/use-leads";
import { leadApiService } from "@/services/lead-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Sparkles,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export function LeadsListPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<LeadFilters>({});
  const { leads, loading, error, refresh } = useLeads(filters);

  const [industry, setIndustry] = useState<string>("");
  const [headcountMin, setHeadcountMin] = useState<string>("");
  const [headcountMax, setHeadcountMax] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const handleFilter = () => {
    const newFilters: LeadFilters = {};
    if (industry && industry !== "all") newFilters.industry = industry;
    if (headcountMin) newFilters.headcount_min = parseInt(headcountMin);
    if (headcountMax) newFilters.headcount_max = parseInt(headcountMax);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setIndustry("");
    setHeadcountMin("");
    setHeadcountMax("");
    setFilters({});
  };

  const handleEnrich = async (lead: Lead) => {
    try {
      await leadApiService.enrichLead(lead.id);
      setSuccessMessage(`Lead ${lead.name} enriched successfully!`);
      refresh();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to enrich lead");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDelete = async (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!leadToDelete) return;

    try {
      await leadApiService.deleteLead(leadToDelete.id);
      setSuccessMessage(`Lead ${leadToDelete.name} deleted successfully!`);
      refresh();
      setDeleteDialogOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete lead");
      setDeleteDialogOpen(false);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const industries = Array.from(
    new Set(leads.map((lead) => lead.industry).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <Button onClick={() => navigate("/add-lead")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="bg-card border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="All industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All industries</SelectItem>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind || ""}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Min Headcount
            </label>
            <Input
              type="number"
              placeholder="Min"
              value={headcountMin}
              onChange={(e) => setHeadcountMin(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Max Headcount
            </label>
            <Input
              type="number"
              placeholder="Max"
              value={headcountMax}
              onChange={(e) => setHeadcountMax(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={handleFilter} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              onClick={handleClearFilters}
              variant="destructive"
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Headcount</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="text-muted-foreground">
                    No leads found. Add your first lead to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.job_title || "-"}</TableCell>
                  <TableCell>{lead.phone_number || "-"}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email || "-"}</TableCell>
                  <TableCell>{lead.headcount || "-"}</TableCell>
                  <TableCell>{lead.industry || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEnrich(lead)}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(lead)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {leads.length} lead{leads.length !== 1 ? "s" : ""}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              lead {leadToDelete?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
