# Technical Test - Fullstack Application

![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?logo=docker)
![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?logo=prisma)
![Node.js](https://img.shields.io/badge/Node.js-18.x+-339933?logo=nodedotjs)
![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)

A complete technical test solution with Docker, Prisma, React, and TypeScript.

## Features

- **Full Docker Integration**: Ready-to-run containerized environment
- **Prisma ORM**: Type-safe database operations
- **Automated Workflows**: Makefile commands for all common tasks
- **Modern Frontend**: React with TypeScript and styled-components
- **tRPC API**: End-to-end type safety

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+
- Make utility

## Quick Start

```bash
# Clone the repository
git clone https://github.com/PriccilaLucem/techinical-test.git
cd techinical-test

# Initial setup (builds containers, runs migrations, generates client)
make setup
```

## Makefile Commands

### Container Management
| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop and remove containers |
| `make restart` | Rebuild and restart services |
| `make logs` | View container logs |

### Database Operations
| Command | Description |
|---------|-------------|
| `make migrate` | Run Prisma migrations |
| `make generate` | Generate Prisma client |
| `make studio` | Open Prisma Studio (http://localhost:5555) |

### Development
| Command | Description |
|---------|-------------|
| `make sh` | Access container shell |
| `make setup` | Complete setup (up + migrate + generate) |

## Project Structure

```
techinical-test/
├── docker-compose.yml    # Main container configuration
├── Makefile            # Development commands
├── docker-entrypoint.sh  # Container initialization
├── prisma/             # Database schema
├── src/               # Application source
│   ├── client/         # React frontend
│   ├── server/         # tRPC backend
│   └── styles/         # Styled components
└── .env               # Environment configuration
```

## Environment Variables

Create `.env` file in root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@db:5432/techtest?schema=public"

# Application
APP_PORT=3000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000
```

## Development Workflow

1. Start development environment:
   ```bash
   make up
   ```

2. After making schema changes:
   ```bash
   make migrate generate
   ```

3. Access frontend:
   ```
   http://localhost:3000
   ```

4. Access Prisma Studio:
   ```bash
   make studio
   ```
   Then open: http://localhost:5555

## Deployment

For production deployment:

```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

**Database not connecting?**
```bash
make restart migrate
```

**Prisma client issues?**
```bash
make generate
```

**Frontend not updating?**
```bash
docker compose restart client
```

## License

MIT License. See [LICENSE](LICENSE) for details.