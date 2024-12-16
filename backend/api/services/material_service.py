from backend.api.repositories.material_repository import MaterialRepository
from sqlalchemy.orm import Session

class MaterialService:
    def __init__(self, db: Session):
        self.material_repository = MaterialRepository(db)
    def all(self):
        return self.material_repository.all()
    def create_material(
            self, cust: float, quantity: int, type: str
            ):
        return self.material_repository.create_material(cust, quantity, type)
    def delete_material(
            self, id: str
    ):
        return  self.material_repository.delete_material(id)
    def update_material(
            self, id: str, cust: float | None, quantity: int | None, type: str | None  
    ):
        return self.material_repository.update_material(id, cust, quantity, type)
    def get_byID(self, id: str):
        return self.material_repository.get_byID(id)