# Docker Demo Guide

This project includes:
- Backend: Spring Boot (`demo`)
- Frontend: React + Nginx (`demo-fe`)
- Database: MySQL
- Cache: Redis

All services are packaged and started with one Docker Compose file:
- `docker-compose.demo.yml`

## 1) Requirements

- Docker Desktop installed and running

## 2) Start the full system

From project root (`interview`), run:

```bash
docker compose -f docker-compose.demo.yml up -d --build
```

## 3) Access URLs

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API base: [http://localhost:8081/api](http://localhost:8081/api)

Quick health check:

```bash
curl http://localhost:8081/api/products?page=0&size=8
```

## 4) Default demo accounts

Seed data creates these users:

- Admin: `admin` / `admin123`
- User: `user` / `user123`

## 5) Useful commands

### View logs

```bash
docker compose -f docker-compose.demo.yml logs -f
```

### Stop containers

```bash
docker compose -f docker-compose.demo.yml down
```

### Stop and delete DB volume (reset all data)

```bash
docker compose -f docker-compose.demo.yml down -v
```

## 6) Common issues

- Port already in use:
  - Stop conflicting local services (MySQL/Redis/other apps), then run compose again.
- Frontend cannot call API:
  - Make sure `backend` container is healthy and running:
    ```bash
    docker compose -f docker-compose.demo.yml ps
    ```
- Rebuild after code change:
  - Run:
    ```bash
    docker compose -f docker-compose.demo.yml up -d --build
    ```
