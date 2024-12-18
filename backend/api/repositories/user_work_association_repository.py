from backend.api.core.models import User_association
from sqlalchemy.orm import Session

class User_association_Repository:
    def __init__(self,db: Session):
        self.db = db

    def create_job(self,work_id: str, user_id: str):
        new_userWork = User_association(work_id=work_id, user_id=user_id)
        self.db.add(new_userWork)
        self.db.commit()
        self.db.refresh(new_userWork)
        return new_userWork
    
    def all(self):
        return self.db.query(User_association).all()
    
    def get(self, id: str):
        userWork = self.db.query(User_association).filter(User_association.id == id).first()
        if userWork:
            return userWork
        return None
    
    def delete(self, id: str):
        userWork = self.db.query(User_association).filter(User_association.id == id).first()
        if userWork:
            self.db.delete(userWork)
            self.db.commit()
            return userWork
        return None