from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from pydantic import BaseModel
from backend.api.core.models import Base


# Pega a URL do banco de dados do arquivo .env
#DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL = "postgresql://postgres_573d_user:0cjNa4GhUZwuHMcmiMp6HJ9JTNGuzvWU@dpg-ctj0k0dumphs73f7g8rg-a.virginia-postgres.render.com/postgres_573d"

# Configurando o engine com parâmetros otimizados para evitar erros de conexão
engine = create_engine(
    DATABASE_URL,
    pool_size=10, # Tamanho inicial do pool de conexões
    max_overflow=20, # Conexões extras permitidas em casos de alta carga
    pool_timeout=30, # Tempo máximo de espera para uma conexão disponível
    pool_recycle=1800, # Tempo para reciclar conexões (em segundos)
    pool_pre_ping=True, # Verifica a saúde da conexão antes de utilizá-la
)

# Criando uma sessão com as configurações otimizadas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependência para obter uma sessão de banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Cria as tabelas no banco de dados, se ainda não existirem
#Base.metadata.drop_all(bind=engine)  # Apaga todas as tabelas
Base.metadata.create_all(bind=engine)  # Recria as tabelas
