from sqlite3 import Date
from backend.api.repositories.activity_repository import ActivityRepository
from sqlalchemy.orm import Session

class ActivityService:
  def __init__(self, db: Session):
    self.activity_repository = ActivityRepository(db)

  def create_activity(self, employee_id: str, report_id: str, description: str):
    return self.activity_repository.create_activity(employee_id, report_id, description)