from sqlite3 import Date
from backend.api.core.models import Activity
from sqlalchemy.orm import Session

class ActivityRepository:
  def __init__(self,db: Session):
    self.db = db
  
  def create_activity(self,employee_id: str, report_id: str, description: str):
    new_activity = Activity(employee_id=employee_id, report_id=report_id, description=description)
    self.db.add(new_activity)
    self.db.commit()
    self.db.refresh(new_activity)
    return new_activity