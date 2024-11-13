from app.api.services.user_service import UserService
from app.api.services.employee_service import EmployeeService
from app.api.services.work_service import WorkService
from app.api.services.proprietary_service import ProprietaryService
from app.api.core.session import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from typing import Annotated

def get_user_service(db: Annotated[Session, Depends(get_db)]):
    return UserService(db)

def get_employee_service(db: Annotated[Session, Depends(get_db)]):
    return EmployeeService(db)

def get_work_service(db: Annotated[Session, Depends(get_db)]):
    return WorkService(db)

def get_proprietary_service(db: Annotated[Session, Depends(get_db)]):
    return ProprietaryService(db)