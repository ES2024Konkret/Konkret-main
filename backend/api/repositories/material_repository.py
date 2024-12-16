from backend.api.core.models import Material, Report
from fastapi import HTTPException
from sqlalchemy.orm import Session

class MaterialRepository:
    def __init__(self, db: Session):
        self.db = db
    def all(self):
        return self.db.query(Material).all()
    def create_material(self, cust: float, quantity: int, type: str, report_id: str):
        report = self.db.query(Report).filter(Report.id == report_id).first()
        if report:
            new_material = Material(cust=cust, quantity=quantity, type=type, report_id=report_id)
            report.materials.append(new_material)
            self.db.add(new_material)
            self.db.add(report)
            self.db.commit()
            self.db.refresh(new_material)
            return new_material
        else:
            raise HTTPException(status_code=404, detail="Diario nao encontrado")
    def delete_material(self, id: str):
        material = self.db.query(Material).filter(Material.id == id).first()
        if material:
            self.db.delete(material)
            self.db.commit()
        return material
    def update_material(self, id: str, cust: float | None, quantity: int | None, type: str | None):
        material = self.db.query(Material).filter(Material.id == id).first()
        if material:
            if material.cust is not None:
                material.cust = cust
            if material.quantity is not None:
                material.quantity = quantity
            if material.type is not None:
                material.type = type 
            self.db.commit()
            self.db.refresh(material)
            return material
        return None
    def get_byID(self, id: str):
        material = self.db.query(Material).filter(Material.id == id).first()
        if material:
            return material
        return None