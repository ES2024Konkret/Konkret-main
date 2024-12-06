from backend.api.core.models import Equipment
from sqlalchemy.orm import Session

class EquipmentRepository:
    def __init__(self, db: Session):
        self.db = db
    def all(self):
        return self.db.query(Equipment).all()