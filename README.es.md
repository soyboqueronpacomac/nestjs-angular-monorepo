# NestJS + Angular Monorepo

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)

Monorepo full-stack con backend NestJS y frontend Angular 21, configurado con Docker para desarrollo.

## Stack Tecnológico

### Backend
- **NestJS 11** - Framework progresivo de Node.js
- **TypeScript** - Desarrollo con tipado seguro
- **Express** - Servidor HTTP

### Frontend
- **Angular 21** - Framework web moderno con signals
- **RxJS** - Programación reactiva
- **TypeScript** - Desarrollo con tipado seguro

### DevOps
- **Docker & Docker Compose** - Desarrollo containerizado
- **Turborepo** - Sistema de build para monorepos
- **Bun** - Gestor de paquetes rápido (desarrollo local)
- **npm** - Gestor de paquetes (contenedores Docker)

## Estructura del Proyecto

```
nestjs-angular-monorepo/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── src/
│   │   │   ├── products/       # Módulo CRUD de productos
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── Dockerfile.dev
│   │
│   └── client-angular/         # Frontend Angular 21
│       ├── src/
│       │   ├── app/
│       │   │   ├── app-service.ts
│       │   │   └── app.ts
│       │   └── main.ts
│       ├── proxy.conf.json     # Configuración proxy API
│       └── Dockerfile.dev
│
├── docker-compose.yml          # Orquestación Docker
├── DOCKER.md                   # Documentación Docker
├── turbo.json                  # Configuración Turborepo
└── package.json                # package.json raíz
```

## Características

- ✅ **Arquitectura Monorepo** - Configuración y dependencias compartidas
- ✅ **Desarrollo en Docker** - Entorno completamente containerizado
- ✅ **Hot Reload** - Los cambios se reflejan instantáneamente en ambas apps
- ✅ **Versionado de API** - Prefijo `/api/v1` con versionado de NestJS
- ✅ **CORS Configurado** - El backend acepta peticiones del frontend
- ✅ **Configuración de Proxy** - Angular hace proxy de las llamadas a la API para evitar CORS
- ✅ **TypeScript** - Tipado completo en todo el stack
- ✅ **CRUD de Productos** - Implementación de ejemplo de API REST

## Inicio Rápido

### Prerequisitos

- **Docker** y **Docker Compose** instalados
- **Git** para control de versiones

### Ejecutar con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/soyboqueronpacomac/nestjs-angular-monorepo.git
   cd nestjs-angular-monorepo
   ```

2. **Iniciar los contenedores**
   ```bash
   docker-compose up
   ```

3. **Acceder a las aplicaciones**
   - Frontend: http://localhost:4200
   - API Backend: http://localhost:3000/api/v1
   - Endpoint de productos: http://localhost:3000/api/v1/products

### Ejecutar Localmente (Sin Docker)

1. **Instalar dependencias**
   ```bash
   bun install
   ```

2. **Iniciar el backend**
   ```bash
   cd apps/api
   bun run start:dev
   ```

3. **Iniciar el frontend** (en una nueva terminal)
   ```bash
   cd apps/client-angular
   bun run start:dev
   ```

## Endpoints de la API

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products` | Obtener todos los productos |
| GET | `/api/v1/products/:id` | Obtener producto por ID |
| POST | `/api/v1/products` | Crear nuevo producto |
| PATCH | `/api/v1/products/:id` | Actualizar producto |
| DELETE | `/api/v1/products/:id` | Eliminar producto |

### Ejemplo de Respuesta

```json
GET /api/v1/products

[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "Laptop de alto rendimiento"
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 29.99,
    "description": "Mouse inalámbrico"
  }
]
```

## Desarrollo

### Comandos del Proyecto

```bash
# Iniciar todas las apps en modo desarrollo
bun run start:dev

# Construir todas las apps
bun run build

# Ejecutar tests
bun run test
```

### Comandos Docker

```bash
# Iniciar contenedores
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Reconstruir contenedores
docker-compose up --build

# Detener contenedores
docker-compose down

# Eliminar volúmenes
docker-compose down -v
```

### Hot Reload

Ambas aplicaciones soportan hot reload en Docker:

- **Backend**: Los cambios en `apps/api/src/` activan recompilación
- **Frontend**: Los cambios en `apps/client-angular/src/` activan rebuild

## Arquitectura

### Arquitectura del Backend

- **Estructura modular** con módulos de NestJS
- **Inyección de dependencias** para servicios
- **DTOs** para validación de request/response
- **Prefijo global** `/api` para todos los endpoints
- **Versionado URI** con versión por defecto `v1`

### Arquitectura del Frontend

- **Componentes standalone** (Angular 21)
- **Signals** para gestión de estado reactivo
- **HttpClient** con Observables de RxJS
- **Capa de servicios** para comunicación con API
- **Configuración de proxy** para llamadas a la API

### Flujo de Comunicación

```
Navegador → Angular (localhost:4200)
          ↓ Proxy de peticiones /api/*
          → API NestJS (localhost:3000)
          → Respuesta (JSON)
          ↓
Navegador ← Angular (muestra datos)
```

## Configuración

### Configuración CORS

Ubicada en `apps/api/src/main.ts`:

```typescript
app.enableCors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```

### Configuración del Proxy

Ubicada en `apps/client-angular/proxy.conf.json`:

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

## Solución de Problemas

### Puerto Ya en Uso

Si los puertos 3000 o 4200 están ocupados, editar `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambiar puerto del host
```

### Los Contenedores No se Comunican

```bash
docker-compose down
docker-compose up --build
```

### Hot Reload No Funciona

Reconstruir el servicio específico:

```bash
docker-compose stop api
docker-compose rm -f api
docker-compose up -d --build api
```

## Contribuir

1. Hacer fork del repositorio
2. Crear tu rama de feature (`git checkout -b feature/caracteristica-increible`)
3. Commit de tus cambios (`git commit -m 'Agregar característica increíble'`)
4. Push a la rama (`git push origin feature/caracteristica-increible`)
5. Abrir un Pull Request

## Licencia

Este proyecto es código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## Enlaces

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación Angular](https://angular.dev/)
- [Documentación Docker](https://docs.docker.com/)
- [Documentación Turborepo](https://turbo.build/repo/docs)

## Autor

**Francisco Javier Moreno Garcia** - [@soyboqueronpacomac](https://github.com/soyboqueronpacomac)
