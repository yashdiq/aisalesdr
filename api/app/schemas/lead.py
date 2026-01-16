from datetime import datetime

from pydantic import BaseModel, Field


class LeadBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    job_title: str | None = Field(None, max_length=255)
    phone_number: str | None = Field(None, max_length=50)
    company: str = Field(..., min_length=1, max_length=255)
    email: str | None = Field(None, max_length=255)
    headcount: int | None = Field(None, ge=0)
    industry: str | None = Field(None, max_length=100)


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=255)
    job_title: str | None = Field(None, max_length=255)
    phone_number: str | None = Field(None, max_length=50)
    company: str | None = Field(None, min_length=1, max_length=255)
    email: str | None = Field(None, max_length=255)
    headcount: int | None = Field(None, ge=0)
    industry: str | None = Field(None, max_length=100)


class LeadResponse(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
