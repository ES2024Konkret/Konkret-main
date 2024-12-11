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
    def delete_equipment(self, id: str):
        equipment = self.db.query(Equipment).filter(Equipment.id == id).first()
        if equipment:
            for rent in equipment.rentequipment:
                self.db.delete(rent)
            self.db.delete(equipment)
            self.db.commit()
        return equipment
    def update_equipment(self, id: str, brand: str | None, description: str | None, quantity: int, type: str):
        equipment = self.db.query(Equipment).filter(Equipment.id == id).first()
        if equipment:
            if equipment.brand is not None:
                equipment.brand = brand
            if equipment.description is not None:
                equipment.description = description
            if equipment.quantity is not None:
                equipment.quantity = quantity
            if equipment.type is not None:
                equipment.type = type 
            self.db.commit()
            self.db.refresh(equipment)
            return equipment
        return None
    def get_byID(self, id: str):
        equipment = self.db.query(Equipment).filter(Equipment.id == id).first()
        if equipment:
            return equipment
        return None
