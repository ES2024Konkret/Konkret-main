from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from backend.api.core.models import User
from backend.api.core.schemas import RentEquipmentSchema, RentEquipmentSchemaPublic
from backend.api.dependencies import get_rent_equipment_service
from backend.api.services.rent_equipment_service import  RentEquipmentService
router = APIRouter(
    prefix="/rentequipment",
    tags=["rentequipment"]
)
#@router.get()
@router.post("", response_model=RentEquipmentSchemaPublic)
def create_rent_equipment(
    rent_equipment: RentEquipmentSchema,
    rent_equipment_service: Annotated[RentEquipmentService, Depends(get_rent_equipment_service)]
):
    # tratar excessoes caso não exista o work ou equipamento status 404 
    
    try:
        return rent_equipment_service.create_rent_equipment(work_id=rent_equipment.work_id, equipment_id= rent_equipment.equipment_id, comments= rent_equipment.comments,
    start_time = rent_equipment.start_time,
    end_time = rent_equipment.end_time)
    except Exception as e:
        return "deu ruim"