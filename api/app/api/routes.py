
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.lead import LeadCreate, LeadResponse, LeadUpdate
from app.services.lead_service import LeadService

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.get("", response_model=list[LeadResponse])
def get_leads(
    industry: str | None = Query(None, description="Filter by industry"),
    headcount_min: int | None = Query(None, description="Minimum headcount"),
    headcount_max: int | None = Query(None, description="Maximum headcount"),
    db: Session = Depends(get_db)
):
    """
    Get all leads with optional filters.
    """
    service = LeadService(db)
    return service.get_all_leads(industry, headcount_min, headcount_max)


@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int, db: Session = Depends(get_db)):
    """
    Get a specific lead by ID.
    """
    service = LeadService(db)
    lead = service.get_lead_by_id(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.post("", response_model=LeadResponse, status_code=201)
def create_lead(lead_data: LeadCreate, db: Session = Depends(get_db)):
    """
    Create a new lead.
    """
    service = LeadService(db)
    return service.create_lead(lead_data)


@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: int, lead_data: LeadUpdate, db: Session = Depends(get_db)):
    """
    Update an existing lead.
    """
    service = LeadService(db)
    lead = service.update_lead(lead_id, lead_data)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.delete("/{lead_id}", status_code=204)
def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    """
    Delete a lead.
    """
    service = LeadService(db)
    success = service.delete_lead(lead_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lead not found")
    return None


@router.post("/{lead_id}/enrich", response_model=LeadResponse)
def enrich_lead(lead_id: int, db: Session = Depends(get_db)):
    """
    Enrich lead data using 3rd party APIs (placeholder).
    """
    service = LeadService(db)
    lead = service.enrich_lead(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead
