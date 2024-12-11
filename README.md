# Konkret

Konkret é um aplicativo que serve como um diário de pedreiro, auxiliando o eng. civil no seu trabalho cotidiano.

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/ES2024Konkret/Konkret-main
```

## Pré requisitos

1. **Instale o gerenciador de pacotes uv**: 
rode as seguintes linhas no terminal
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Ativação

1. Dê up no container
```bash
docker compose up --build
```

2. atualize as dependencies
```bash
uv sync
```

3. Atualize as bases de dados
```bash
uv run alembic upgrade head
```

## Uso

1. rode a api com o seguinte comando
```bash
uv run uvicorn backend.api.main:app --host 0.0.0.0 --reload
```

2. Para acessar o frontend, acesse a pasta frontend
```bash
cd frontend
```

3. Instale o expo
```bash
npm install
```

4. Inicie o expo com o seguinte comando
```bash
npm start
```

## Extras

1. Após a execução do container, acesse o postgres com o seguinte comando
```bash
docker exec -it konkret-main-db-1 psql -U postgres -d postgres_db
```
