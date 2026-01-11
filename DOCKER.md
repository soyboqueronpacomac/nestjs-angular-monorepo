# Docker Setup - Development

Este proyecto usa Docker Compose para orquestar el backend NestJS y el frontend Angular en contenedores separados.

## Estructura

```
nestjs-angular-monorepo/
├── docker-compose.yml          # Orquestación de servicios
├── .dockerignore               # Archivos ignorados por Docker
├── apps/
│   ├── api/
│   │   └── Dockerfile.dev      # Dockerfile de NestJS
│   └── client-angular/
│       ├── Dockerfile.dev      # Dockerfile de Angular
│       └── proxy.conf.json     # Configuración de proxy
```

## Servicios

- **api**: Backend NestJS corriendo en puerto `3000`
- **client**: Frontend Angular corriendo en puerto `4200`

Ambos servicios están conectados en una red Docker llamada `app-network`.

## Comandos

### Levantar todo el stack
```bash
docker-compose up
```

### Levantar en modo detached (background)
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f api
docker-compose logs -f client
```

### Detener los contenedores
```bash
docker-compose down
```

### Rebuild (si cambiás dependencias)
```bash
docker-compose up --build
```

### Eliminar volúmenes y contenedores
```bash
docker-compose down -v
```

## Acceso a las Apps

- **Frontend Angular**: http://localhost:4200
- **Backend NestJS**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api/v1

## Hot Reload

Ambos servicios tienen **hot-reload** habilitado:

- Cambios en `apps/api/src/` se recargan automáticamente
- Cambios en `apps/client-angular/src/` se recargan automáticamente

## Proxy Configuration

Angular usa un proxy para redirigir las llamadas `/api/*` al backend. Esto evita problemas de CORS y simplifica la configuración.

**Configuración en `proxy.conf.json`:**
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

## Networking

- El servicio `client` puede comunicarse con `api` usando el hostname `api` (nombre del servicio)
- Desde el navegador, las llamadas van a rutas relativas (`/api/v1`) que son proxeadas por Angular al backend

## Troubleshooting

### Los contenedores no se comunican
```bash
docker-compose down
docker-compose up --build
```

### Puerto ya en uso
Si el puerto 3000 o 4200 está ocupado, editá `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Cambia el puerto host
```

### Ver qué está corriendo
```bash
docker ps
```

### Entrar a un contenedor
```bash
docker exec -it nestjs-api sh
docker exec -it angular-client sh
```

## Notas Importantes

1. **Bun**: Usa la imagen oficial `oven/bun:1.2.0`
2. **Volumes**: El código fuente está montado para hot-reload
3. **Dependencies**: Si agregás nuevas dependencias, hacé `docker-compose up --build`
