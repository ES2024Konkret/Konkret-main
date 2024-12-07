from fastapi import APIRouter, HTTPException, Depends
from backend.api.core.models import User
from backend.api.core.schemas import RentEquipmentSchema, RentEquipmentSchemaPublic

router = APIRouter(
    prefix="/rentequipment",
    tags=["rentequipment"]
)
#@router.get()
@router.post("")#, #response_model=RentEquipmentSchemaPublic)
def create_rent_equipment(
    work_id: str,
    equipment_id: str
):
    return "Teste"