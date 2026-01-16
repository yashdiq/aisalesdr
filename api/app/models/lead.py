from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

from app.models.base import BaseModel


class Lead(BaseModel):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    job_title = Column(String)
    phone_number = Column(String)
    company = Column(String, nullable=False)
    email = Column(String)
    headcount = Column(Integer)
    industry = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
