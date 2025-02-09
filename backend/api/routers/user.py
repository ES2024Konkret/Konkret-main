from fastapi import APIRouter, Request, Query, Depends, HTTPException, Form
from typing import Annotated, List
from backend.api.services.user_service import UserService
from backend.api.core.schemas import UserSchema, UserPublic, LoginSchema, ResponsabilityType
from backend.api.dependencies import get_user_service, get_current_user
from backend.api.utils import is_valid_password, is_valid_cpf, is_valid_cnpj, verify_password, create_token, encode, validate_phone_number
from backend.api.core.models import User

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.post("", response_model=UserPublic)
def add_user(
    user: UserSchema,
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    password_error = is_valid_password(user.password)
    # phone_error = validate_phone_number(user.phone)

    # if not phone_error:
    #     raise HTTPException(status_code=400, detail="Telefone inválido")
    
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)
    
    if user.user_type.value == "PF" and not is_valid_cpf(user.cpf):
        raise HTTPException(status_code=400, detail="CPF inválido.")
    
    if user.user_type.value == "PJ" and not is_valid_cnpj(user.cnpj):
        raise HTTPException(status_code=400, detail="CNPJ inválido.")

    try:
        return user_service.create_user(user.name, user.email, user.phone, user.password, user.user_type, user.responsability_type, user.cpf, user.cnpj)        

    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
    

@router.put("/{id}/update", response_model=UserPublic)
def update_user(
    id: str,
    user: UserSchema,
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    password_error = is_valid_password(user.password)
    phone_error = validate_phone_number(user.phone)

    if phone_error:
        raise HTTPException(status_code=400, detail="Telefone inválido")
    
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)
    
    if user.user_type.value == "PF" and not is_valid_cpf(user.cpf):
        raise HTTPException(status_code=400, detail="CPF inválido.")
    
    if user.user_type.value == "PJ" and not is_valid_cnpj(user.cnpj):
        raise HTTPException(status_code=400, detail="CNPJ inválido.")
    
    try: 
        updated_user = user_service.update(id, user.name, user.email, user.phone, user.password, user.user_type, user.cpf, user.cnpj)
        if isinstance(updated_user, str):
            raise HTTPException(status_code=404)
        return updated_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")

@router.get("", response_model=List[UserPublic])
def getall_users(
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_logged: User = Depends(get_current_user)
):

    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return user_service.all()
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=UserPublic)
def get_user(
    id: str,
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return user_service.get(user_logged.id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.delete("/{id}", response_model=UserPublic)
def delete_user(
    id: str,
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        deleted_user = user_service.delete(id)
        # Verifica se o usuário foi encontrado e excluído corretamente
        if deleted_user is None:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return deleted_user
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.post("/login", response_model=dict)
def login(
    user_service: Annotated[UserService, Depends(get_user_service)],
    username: str = Form(...), 
    password: str = Form(...),
    
):
    user = user_service.find_by_email(username)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Senha inválida.")
    
    return {
        'access_token': create_token(user.id),
        'token_type': 'bearer',
        'responsability_type': user.responsability_type.value,
        'id_owner': user.id
    }

@router.get("/{id}/list", response_model=List[UserPublic])
def list_proprietarios(
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    users = user_service.list_proprietarios()
    print(f"All users: {users}")
    proprietarios = [
        user for user in users
        if user.responsability_type.value == ResponsabilityType.Proprietario.value
    ]
    print(f"Proprietários: {proprietarios}")
    try:
        return proprietarios
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")