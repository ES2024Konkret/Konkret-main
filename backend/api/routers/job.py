from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.job_service import JobService
from backend.api.core.schemas import JobSchemaPublic, JobSchema
from backend.api.dependencies import get_job_service, get_current_user

router = APIRouter(
    prefix="/jobs",
    tags=["job"]
)
    
@router.post("", response_model=JobSchemaPublic)
def add_job(
    job: JobSchemaPublic,
    job_service: Annotated[JobService, Depends(get_job_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return job_service.create_job(job.work_id, job.employee_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("", response_model=List[JobSchema])
def getall_jobs(
    job_service: Annotated[JobService, Depends(get_job_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return job_service.all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=JobSchema)
def get_job(
    id: str,
    job_service: Annotated[JobService, Depends(get_job_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        job = job_service.get(id)
        if job is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return job
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.delete("/{id}", response_model=JobSchemaPublic)
def delete_job(
    id:str,
    job_service: Annotated[JobService, Depends(get_job_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        result = job_service.delete(id)
        if result is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")