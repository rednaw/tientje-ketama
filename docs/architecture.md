[**<---**](README.md)

# Architecture — End-to-end with SvelteKit

SvelteKit is full-stack: frontend plus server routes. No separate backend. Single Node process.

---

## Stack

| Component | Implementation |
|-----------|----------------|
| Language | TypeScript |
| UI | SvelteKit (Svelte) |
| API | SvelteKit server routes |
| DB | PostgreSQL + Prisma |
| Storage | Node `fs` for uploads |
| Deploy | Docker, IAC pattern (Compose, Traefik, private registry) |

---

## Flow

| Layer | Role |
|-------|------|
| **Browser** | SvelteKit SPA or SSR pages |
| **SvelteKit server** | API routes, DB access, file writes |
| **PostgreSQL** | Recordings metadata |
| **Filesystem** | Audio files (e.g. `/uploads`) |

---

## Upload flow

1. User selects file → form posts to `POST /api/upload` server route.
2. Server: validate, write file to disk, insert metadata in PostgreSQL.
3. UI: refresh list or show new recording.

---

## SvelteKit adapter

- **adapter-node** — For Docker deploy. Outputs a Node server; `node build` runs the app.

## Package manager

- **npm** — `npm ci`, `npm run build`, etc.

## Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
CMD ["node", "build"]
```

---

## Deploy

Standard IAC app. Same server as other apps, same flow: `task app:deploy`, Nginx, private registry.

- **Docker Compose:** App + PostgreSQL in the same stack. Postgres persists in a volume.
- **iac.yml** → `REGISTRY_NAME`, `IMAGE_NAME`
- **secrets.yml** → `DATABASE_URL`, etc.
- **Nginx:** Virtual host for the app (e.g. `tientjeketama.example.com`).

