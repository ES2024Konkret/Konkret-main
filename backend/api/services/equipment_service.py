from backend.api.repositories.equipment_repository import EquipmentRepository
from sqlalchemy.orm import Session

class EquipmentService:
    def __init__(self, db: Session):
        self.equipment_repository = EquipmentRepository(db)
    def all(self):
        return self.equipment_repository.all()