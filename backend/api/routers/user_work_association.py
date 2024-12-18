from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.user_work_association import UserWorkAssociation
from backend.api.core.schemas import UserWorkAssociationSchema, UserWorkAssociationSchemaPublic
from backend.api.dependencies import get_user_work_association, get_current_user

router = APIRouter(
    prefix="/user_work_association",
    tags=["user_work_association"]
)
    
@router.post("", response_model=UserWorkAssociationSchemaPublic)
def add_job(
    userWork: UserWorkAssociationSchemaPublic,
    user_work_association: Annotated[UserWorkAssociation, Depends(get_user_work_association)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return user_work_association.create_job(userWork.work_id, userWork.user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("", response_model=List[UserWorkAssociationSchema])
def getall_jobs(
    user_work_association: Annotated[UserWorkAssociation, Depends(get_user_work_association)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return user_work_association.all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=UserWorkAssociationSchema)
def get_job(
    id: str,
    user_work_association: Annotated[UserWorkAssociation, Depends(get_user_work_association)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        userWork = user_work_association.get(id)
        if userWork is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return userWork
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.delete("/{id}", response_model=UserWorkAssociationSchemaPublic)
def delete_job(
    id:str,
    user_work_association: Annotated[UserWorkAssociation, Depends(get_user_work_association)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        result = user_work_association.delete(id)
        if result is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")