
from sqlalchemy.orm import Session

from app.repositories.lead_repository import LeadRepository
from app.schemas.lead import LeadCreate, LeadResponse, LeadUpdate


class LeadService:
    def __init__(self, db: Session):
        self.repository = LeadRepository(db)

    def get_all_leads(self, industry: str | None = None, headcount_min: int | None = None, headcount_max: int | None = None) -> list[LeadResponse]:
        leads = self.repository.get_all(industry, headcount_min, headcount_max)
        return [LeadResponse.model_validate(lead) for lead in leads]

    def get_lead_by_id(self, lead_id: int) -> LeadResponse | None:
        lead = self.repository.get_by_id(lead_id)
        if lead:
            return LeadResponse.model_validate(lead)
        return None

    def create_lead(self, lead_data: LeadCreate) -> LeadResponse:
        lead = self.repository.create(lead_data)
        return LeadResponse.model_validate(lead)

    def update_lead(self, lead_id: int, lead_data: LeadUpdate) -> LeadResponse | None:
        lead = self.repository.update(lead_id, lead_data)
        if lead:
            return LeadResponse.model_validate(lead)
        return None

    def delete_lead(self, lead_id: int) -> bool:
        return self.repository.delete(lead_id)

    def enrich_lead(self, lead_id: int) -> LeadResponse | None:
        """
        Placeholder for lead enrichment functionality.
        In a real implementation, this would call 3rd party APIs
        to fetch additional data about the lead.
        """
        lead = self.repository.get_by_id(lead_id)
        if not lead:
            return None

        # Simulate enrichment - in production, this would call external APIs
        # For now, we'll just return the lead as is
        return LeadResponse.model_validate(lead)
