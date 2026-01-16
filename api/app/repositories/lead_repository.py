
from sqlalchemy.orm import Session

from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadUpdate


class LeadRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, industry: str | None = None, headcount_min: int | None = None, headcount_max: int | None = None) -> list[Lead]:
        query = self.db.query(Lead)

        if industry:
            query = query.filter(Lead.industry == industry)

        if headcount_min is not None:
            query = query.filter(Lead.headcount >= headcount_min)

        if headcount_max is not None:
            query = query.filter(Lead.headcount <= headcount_max)

        return query.all()

    def get_by_id(self, lead_id: int) -> Lead | None:
        return self.db.query(Lead).filter(Lead.id == lead_id).first()

    def create(self, lead_data: LeadCreate) -> Lead:
        db_lead = Lead(**lead_data.model_dump())
        self.db.add(db_lead)
        self.db.commit()
        self.db.refresh(db_lead)
        return db_lead

    def update(self, lead_id: int, lead_data: LeadUpdate) -> Lead | None:
        db_lead = self.get_by_id(lead_id)
        if not db_lead:
            return None

        update_data = lead_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_lead, field, value)

        self.db.commit()
        self.db.refresh(db_lead)
        return db_lead

    def delete(self, lead_id: int) -> bool:
        db_lead = self.get_by_id(lead_id)
        if not db_lead:
            return False

        self.db.delete(db_lead)
        self.db.commit()
        return True
