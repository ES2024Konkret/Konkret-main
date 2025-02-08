from backend.api.repositories.user_repository import UserRepository
from sqlalchemy.orm import Session

class UserService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def create_user(self, name, email, phone, password, user_type, responsability_type, cpf, cnpj):
        return self.user_repository.create(name, email, phone, password, user_type, responsability_type, cpf, cnpj)

    def update(self, id, name, email, phone, password, user_type, responsability_type, cpf, cnpj):
        return self.user_repository.update(id, name, email, phone, password, user_type, responsability_type, cpf, cnpj)

    def all(self):
        return self.user_repository.all()

    def get(self, id: str):
        return self.user_repository.get(id)
    
    def delete(self, id: str):
        return self.user_repository.delete(id)

    def find_by_email(self, email_or_cpf: str):
        return self.user_repository.find_by_email(email_or_cpf)