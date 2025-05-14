# Caminhos
PROJECT_NAME=my-app
DOCKER_COMPOSE=docker compose
ENTRYPOINT=./docker-entrypoint.sh

# Comandos Docker
up:
	@echo "🔼 Setting execute permissions..."
	@chmod +x $(ENTRYPOINT)
	@echo "🔼 Starting containers with Docker Compose..."
	$(DOCKER_COMPOSE) up --build
	
down:
	@echo "🧹 Derrubando containers..."
	$(DOCKER_COMPOSE) down

restart:
	@echo "♻️  Reiniciando containers..."
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build

# Prisma
migrate:
	@echo "📦 Rodando migrações do Prisma..."
	$(DOCKER_COMPOSE) exec web npx prisma migrate dev --name init

generate:
	@echo "🛠  Gerando Prisma Client..."
	$(DOCKER_COMPOSE) exec web npx prisma generate

studio:
	@echo "🖥  Abrindo Prisma Studio..."
	$(DOCKER_COMPOSE) exec web npx prisma studio

# Acesso ao container
sh:
	@echo "🖥  Entrando no container..."
	$(DOCKER_COMPOSE) exec web sh

# Helpers
logs:
	@$(DOCKER_COMPOSE) logs -f

# Comando completo para subir tudo
setup: up migrate generate
	@echo "✅ Tudo pronto! Aplicação está rodando com migrações e client gerados"

help:
	@echo "Comandos disponíveis:"
	@echo "  make up         - Sobe a aplicação (Docker Compose)"
	@echo "  make down       - Derruba os containers"
	@echo "  make restart    - Reinicia os containers"
	@echo "  make migrate    - Roda as migrações Prisma"
	@echo "  make generate   - Gera Prisma Client"
	@echo "  make studio     - Abre Prisma Studio"
	@echo "  make sh         - Entra no container +s containers"
