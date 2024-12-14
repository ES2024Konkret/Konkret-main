from typing import Annotated, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from backend.api.core.models import User
from backend.api.services.user_service import UserService
from backend.api.services.employee_service import EmployeeService
from backend.api.services.report_service import ReportService
from backend.api.services.proprietary_service import ProprietaryService
from backend.api.services.work_service import WorkService
from backend.api.services.equipment_service import EquipmentService
from backend.api.services.rent_equipment_service import RentEquipmentService
from backend.api.services.job_service import JobService
from backend.api.core.session import get_db
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from backend.api.utils import ALGORITHM, SECRET_KEY

def get_user_service(db: Annotated[Session, Depends(get_db)]):
    return UserService(db)

def get_employee_service(db: Annotated[Session, Depends(get_db)]):
    return EmployeeService(db)

def get_report_service(db: Annotated[Session, Depends(get_db)]):
    return ReportService(db)

def get_proprietary_service(db: Annotated[Session, Depends(get_db)]):
    return ProprietaryService(db)

def get_work_service(db: Annotated[Session, Depends(get_db)]):
    return WorkService(db)

def get_equipment_service(db: Annotated[Session, Depends(get_db)]):
    return EquipmentService(db)

def get_rent_equipment_service(db: Annotated[Session, Depends(get_db)]):
    return RentEquipmentService(db)

def get_job_service(db: Annotated[Session, Depends(get_db)]):
    return JobService(db)

class TokenPayload(BaseModel):
    sub: Optional[str] = None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

def get_current_user(db: Annotated[Session, Depends(get_db)], token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user_id = token_data.sub
    user = UserService(db).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
