from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from backend.api.dependencies import get_work_service, get_current_user
from backend.api.core.models import User
from backend.api.services.work_service import WorkService

router = APIRouter()

@router.get("/reports_notifications", response_model=List[str])
def get_notifications(
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    try:
        return work_service.fetch_notifications(user_logged.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")