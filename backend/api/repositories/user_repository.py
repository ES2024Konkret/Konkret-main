from backend.api.core.models import User, Work, UserType
from sqlalchemy.orm import Session
import bcrypt
from passlib.context import CryptContext
import re
from backend.api.utils import pwd_context
from typing import Optional

class UserRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, name: str, email: str, phone: str, password: str, user_type: str, cpf: Optional[str], cnpj: Optional[str]):
        cpf = re.sub(r'[^0-9]', '', cpf)
        cnpj = re.sub(r'[^0-9]', '', cnpj)
        hashed_password = pwd_context.hash(password)
        new_user = User(   
    name=name,
    email=email,
    phone=phone,
    password=hashed_password,
    user_type=user_type.value,
    cpf=cpf if user_type.value == "PF" else None,
    cnpj=cnpj if user_type.value == "PJ" else None,
    )
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user 
    
    def update(self, id: str, name: str, email: str = None, phone: str = None, password: str = None,user_type: str = None,cpf: str = None, cnpj: str = None):
        user = self.db.query(User).filter(User.id == id).first()
        if user:
            if user_type is not None:
                if user_type.value not in ["PF", "PJ"]:
                    raise ValueError("Tipo de usuário inválido. Deve ser 'PF' ou 'PJ'.") 
                user.user_type = user_type.value
            if user_type == "PF" or user.user_type == "PF":
                if cpf is not None:
                    user.cpf = cpf
                user.cnpj = None  

            if user_type == "PJ" or user.user_type == "PJ":
                if cnpj is not None:
                    user.cnpj = cnpj
                user.cpf = None  


            if email is not None:
                user.email = email

            if phone is not None:
                user.phone = phone

            if name is not None:
                user.name = name

            if password is not None:
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                user.password = hashed_password

            self.db.commit()
            self.db.refresh(user)
            return user
        return None
    
    def all(self):
        return self.db.query(User).all()
    
    def get(self, id: str):
        user = self.db.query(User).filter(User.id == id).first()
        if user:
            return user
        return None
    
    def delete(self, id: str):
        user = self.db.query(User).filter(User.id == id).first()
        works = self.db.query(Work).all()
        if user:
            for work in works:
                if user.id in work.workers:
                    Work.workers.remove(user.id)
            self.db.delete(user)
            self.db.commit()
            return user
        return None
    
    def find_by_email(self, email: str):
        user = self.db.query(User).filter(User.email == email).first()
        if user:
            return user
        return None
    
    def get_works(self, id: str):
        works_list = []
        user = self.db.query(User).filter(User.id == id).first()
        if user:
            for work in user.works:
                works_list.append(work.works)
        return works_list