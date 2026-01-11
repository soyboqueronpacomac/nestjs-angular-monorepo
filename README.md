# NestJS + Angular Monorepo

Full-stack monorepo with NestJS backend and Angular 21 frontend, configured with Docker for development.

## Tech Stack

### Backend
- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - HTTP server

### Frontend
- **Angular 21** - Modern web framework with signals
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe development

### DevOps
- **Docker & Docker Compose** - Containerized development
- **Turborepo** - Monorepo build system
- **Bun** - Fast package manager (local development)
- **npm** - Package manager (Docker containers)

## Project Structure

```
nestjs-angular-monorepo/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── products/       # Products CRUD module
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── Dockerfile.dev
│   │
│   └── client-angular/         # Angular 21 frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── app-service.ts
│       │   │   └── app.ts
│       │   └── main.ts
│       ├── proxy.conf.json     # API proxy config
│       └── Dockerfile.dev
│
├── docker-compose.yml          # Docker orchestration
├── DOCKER.md                   # Docker documentation
├── turbo.json                  # Turborepo config
└── package.json                # Root package.json
```

## Features

- ✅ **Monorepo Architecture** - Shared configuration and dependencies
- ✅ **Docker Development** - Full containerized environment
- ✅ **Hot Reload** - Changes reflect instantly in both apps
- ✅ **API Versioning** - `/api/v1` prefix with NestJS versioning
- ✅ **CORS Configured** - Backend accepts frontend requests
- ✅ **Proxy Setup** - Angular proxies API calls to avoid CORS
- ✅ **TypeScript** - Full type safety across the stack
- ✅ **Products CRUD** - Example REST API implementation

## Quick Start

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Git** for version control

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/soyboqueronpacomac/nestjs-angular-monorepo.git
   cd nestjs-angular-monorepo
   ```

2. **Start the containers**
   ```bash
   docker-compose up
   ```

3. **Access the applications**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000/api/v1
   - Products endpoint: http://localhost:3000/api/v1/products

### Running Locally (Without Docker)

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Start the backend**
   ```bash
   cd apps/api
   bun run start:dev
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd apps/client-angular
   bun run start:dev
   ```

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/products/:id` | Get product by ID |
| POST | `/api/v1/products` | Create new product |
| PATCH | `/api/v1/products/:id` | Update product |
| DELETE | `/api/v1/products/:id` | Delete product |

### Example Response

```json
GET /api/v1/products

[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "High-performance laptop"
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 29.99,
    "description": "Wireless mouse"
  }
]
```

## Development

### Project Commands

```bash
# Start all apps in development mode
bun run start:dev

# Build all apps
bun run build

# Run tests
bun run test
```

### Docker Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Stop containers
docker-compose down

# Remove volumes
docker-compose down -v
```

### Hot Reload

Both applications support hot reload in Docker:

- **Backend**: Changes in `apps/api/src/` trigger recompilation
- **Frontend**: Changes in `apps/client-angular/src/` trigger rebuild

## Architecture

### Backend Architecture

- **Modular structure** with NestJS modules
- **Dependency injection** for services
- **DTOs** for request/response validation
- **Global prefix** `/api` for all endpoints
- **URI versioning** with default version `v1`

### Frontend Architecture

- **Standalone components** (Angular 21)
- **Signals** for reactive state management
- **HttpClient** with RxJS Observables
- **Service layer** for API communication
- **Proxy configuration** for API calls

### Communication Flow

```
Browser → Angular (localhost:4200)
          ↓ Proxy /api/* requests
          → NestJS API (localhost:3000)
          → Response (JSON)
          ↓
Browser ← Angular (displays data)
```

## Configuration

### CORS Configuration

Located in `apps/api/src/main.ts`:

```typescript
app.enableCors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```

### Proxy Configuration

Located in `apps/client-angular/proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://api:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 4200 are occupied, edit `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change host port
```

### Containers Not Communicating

```bash
docker-compose down
docker-compose up --build
```

### Hot Reload Not Working

Rebuild the specific service:

```bash
docker-compose stop api
docker-compose rm -f api
docker-compose up -d --build api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Angular Documentation](https://angular.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Author

**Francisco Javier Moreno Garcia** - [@soyboqueronpacomac](https://github.com/soyboqueronpacomac)
