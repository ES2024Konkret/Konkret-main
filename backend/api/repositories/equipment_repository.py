from backend.api.core.models import Equipment
from sqlalchemy.orm import Session

class EquipmentRepository:
    def __init__(self, db: Session):
        self.db = db
    def all(self):
        return self.db.query(Equipment).all()
    def create_equipment(self, brand: str | None, description: str | None, quantity: int, type: str):
        new_equipment = Equipment(brand=brand, description=description, quantity=quantity, type=type)
        self.db.add(new_equipment)
        self.db.commit()
        self.db.refresh(new_equipment)
        return new_equipment