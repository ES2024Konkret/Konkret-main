from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List
from backend.api.core.models import Equipment
from backend.api.core.schemas import EquipmentPublic, EquipmentSchema
from backend.api.services.equipment_service import EquipmentService
from backend.api.dependencies import get_equipment_service
router = APIRouter(
    prefix="/equipment",
    tags=["equipment"]
)

@router.get("", response_model=List[EquipmentPublic])
def getall_equipments(
    equipment_service: Annotated[EquipmentService, Depends(get_equipment_service)]
    ):
    try:
        return equipment_service.all() 
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")

@router.post("", response_model=EquipmentPublic)
def add_equipment(
    equipment: EquipmentSchema,
    equipment_service: Annotated[EquipmentService, Depends(get_equipment_service)]
):
    try:
        return equipment_service.create_equipment(equipment.brand, equipment.description, equipment.quantity, equipment.type) 
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
@router.delete("/{id}", response_model=EquipmentPublic)
def delete_equipment(
    id: str,
    equipment_service: Annotated[EquipmentService, Depends(get_equipment_service)]
    ):
    try:
        return equipment_service.delete_equipment(id) 
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}", response_model=EquipmentPublic)
def update_equipment(
    id: str,
    equipment: EquipmentSchema,
    equipment_service: Annotated[EquipmentService, Depends(get_equipment_service)]
    ):
    try:
        updated = equipment_service.update_equipment(id, equipment.brand, equipment.description, equipment.quantity, equipment.type)
        if isinstance(updated, str):
            raise HTTPException(status_code=404)
        return updated
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=EquipmentPublic)
def getEquipment(
    id: str,
    equipment_service: Annotated[EquipmentService, Depends(get_equipment_service)]
):
    try:
        return equipment_service.get_byID(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")