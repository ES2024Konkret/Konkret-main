from backend.api.repositories.equipment_repository import EquipmentRepository
from sqlalchemy.orm import Session

class EquipmentService:
    def __init__(self, db: Session):
        self.equipment_repository = EquipmentRepository(db)
    def all(self):
        return self.equipment_repository.all()
    def create_equipment(
            self, brand: str | None, description: str | None, quantity: int, type: str
            ):
        return self.equipment_repository.create_equipment(brand, description, quantity, type)
    def delete_equipment(
            self, id: str
    ):
        return  self.equipment_repository.delete_equipment(id)
    def update_equipment(
            self, id: str, brand: str | None, description: str | None, quantity: int, type: str   
    ):
        return self.equipment_repository.update_equipment(id, brand, description, quantity, type)