from backend.api.repositories.user_work_association_repository import User_association_Repository
from sqlalchemy.orm import Session

class UserWorkAssociation:
    def __init__(self, db: Session):
        self.user_work_association_repository = User_association_Repository(db)

    def create_job(self, work_id: str, user_id: str):
        return self.user_work_association_repository.create_job(work_id, user_id)

    def all(self):
        return self.user_work_association_repository.all()

    def get(self, id: str):
        return self.user_work_association_repository.get(id)
    
    def delete(self, id: str):
        return self.user_work_association_repository.delete(id)
        