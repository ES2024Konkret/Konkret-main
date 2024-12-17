from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.activity_service import ActivityService
from backend.api.core.schemas import ActivitySchema, ActivityPublic
from backend.api.dependencies import get_activity_service, get_current_user

router = APIRouter(
    prefix="/activity",
    tags=["activity"]
)

@router.post("", response_model=ActivityPublic)
def add_activity(
    activity: ActivitySchema,
    activity_service: Annotated[ActivityService, Depends(get_activity_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return activity_service.create_activity(activity.employee_id, activity.report_id, activity.description)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")