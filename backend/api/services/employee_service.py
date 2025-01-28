from sqlite3 import Date
from backend.api.repositories.employee_repository import EmployeeRepository
from sqlalchemy.orm import Session

class EmployeeService:
    def __init__(self, db: Session):
        self.employee_repository = EmployeeRepository(db)

    def create_employee(self, name: str, rg: str, cpf: str, role: str, contract_start: Date, contract_end: Date):
        return self.employee_repository.create_employee(name,rg,cpf,role,contract_start,contract_end)

    def all(self):
        return self.employee_repository.all()

    def get(self, id: str):
        return self.employee_repository.get(id)
    
    def update(self, id: str, contract_end: Date = None, role: str = None, work_id: str = None):
        return self.employee_repository.update(id, contract_end, role)
    
    def delete(self, id: str):
        return self.employee_repository.delete(id)
        