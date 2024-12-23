import os
from jose import jwt
from typing import Any, Union
from passlib.context import CryptContext
import re
from geopy.geocoders import Nominatim
import requests
import bcrypt
import datetime as dt
from dateutil import tz
from transformers import AutoTokenizer, AutoModelForCausalLM

SECRET_KEY = os.getenv("SECRET_KEY" , 'b1c7ce8cfdef7802eafd6a2189e8edfb')
ALGORITHM = os.getenv("JWT_ALGORITHM", 'HS512')
ACCESS_TOKEN_EXPIRE_HOURS = 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
Tamanho_min_senha = 8

def is_valid_password(password: str) -> bool:
    if len(password) < Tamanho_min_senha:
        return "A senha deve ter pelo menos 8 caracteres."
    if not re.search(r"[A-Z]", password):
        return "A senha deve conter pelo menos uma letra maiúscula."
    if not re.search(r"\d", password):
        return "A senha deve conter pelo menos um número."
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "A senha deve conter pelo menos um caractere especial."
    return None

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def encode(text: str) -> str:
    return bcrypt.hashpw(text.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def is_valid_cpf(cpf: str) -> bool:
    cpf = re.sub(r'\D', '', cpf)
    if len(cpf) != 11 or not cpf.isdigit():
        return False
    
    if cpf == cpf[0] * 11:
        return False

    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito1 = (soma * 10 % 11) % 10
    if digito1 != int(cpf[9]):
        return False

    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito2 = (soma * 10 % 11) % 10
    if digito2 != int(cpf[10]):
        return False
    return True

def is_valid_cnpj(cnpj: str) -> bool:
    cnpj = re.sub(r'\D', '', cnpj)

    if len(cnpj) != 14:
        return False

    if cnpj == cnpj[0] * len(cnpj):
        return False

    pesos_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(cnpj[i]) * pesos_1[i] for i in range(12))
    digito_1 = 11 - (soma % 11)
    digito_1 = digito_1 if digito_1 < 10 else 0

    if int(cnpj[12]) != digito_1:
        return False

    pesos_2 = [6] + pesos_1
    soma = sum(int(cnpj[i]) * pesos_2[i] for i in range(13))
    digito_2 = 11 - (soma % 11)
    digito_2 = digito_2 if digito_2 < 10 else 0

    return int(cnpj[13]) == digito_2

def verify_password(senha: str, hash_senha: str) -> bool:
    return bcrypt.checkpw(senha.encode('utf-8'), hash_senha.encode('utf-8'))

def cpf_normalize(cpf: str) -> str:
    return re.sub(r'[^0-9]', '', cpf)

def validate_phone_number(phone: str) -> bool:
    """
    Valida o número no formato +55 12 12345-6789
    """
    # Regex atualizado e restritivo
    pattern = r"^\+55\s\d{2}\s\d{5}-\d{4}$"
    
    return bool(re.fullmatch(pattern, phone))

def create_token(subject: Union[str, Any]) ->  str:
    expire = dt.datetime.now(dt.timezone.utc) + dt.timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS512")

def get_coordinates(address: str):
    geolocator = Nominatim(user_agent="Konkret")
    loc = geolocator.geocode(address)
    if loc is None:
        return None
    return [loc.latitude, loc.longitude]

def get_weather(lat: float, lon: float):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b1c7ce8cfdef7802eafd6a2189e8edfb&lang=pt_br&units=metric"
    response = requests.get(url)
    return response.json()


#ID user: b6a93652-7fac-41d9-9416-e65fe5c4a331
#ID propriwtario: 8b74eacd-ce2d-4efd-89d0-89fa098d8a1c
#ID Work: 430ece33-53f5-423a-a0aa-e774b432db5f
#ID Report: 19934ad1-8974-430e-b9d4-a1260b3c9655
#ID Material: 48053997-720d-434c-846b-dc28a3218cef

tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")