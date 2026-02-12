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
| Auth | Magic links, sessions, Mailersend |
| DB | PostgreSQL + Prisma |
| Storage | Node `fs` for uploads |
| Email | Mailersend REST API |
| Deploy | Docker, IAC pattern (Compose, Nginx, private registry) |

---

## Flow

| Layer | Role |
|-------|------|
| **Browser** | SvelteKit SPA or SSR pages |
| **SvelteKit server** | API routes, auth logic, DB access, file writes, Mailersend calls |
| **PostgreSQL** | Users, invites, recordings metadata, scores |
| **Filesystem** | Audio files (e.g. `/uploads`) |
| **Mailersend** | Magic link emails |

---

## Auth flow

1. User requests magic link → form submits to SvelteKit API route (`POST /auth/send-link`).
2. Server: validate email, create token, store in DB, call Mailersend.
3. User clicks link → `GET /auth/verify/[token]` server route.
4. Server: validate token, create session (cookie or DB), redirect to app.
5. User is logged in; SvelteKit checks session on protected routes.

---

## Upload flow

1. User selects file → form posts to `POST /api/upload` server route.
2. Server: validate, write file to disk, insert metadata in PostgreSQL.
3. UI: refresh list or show new recording.

---

## Sessions

- Cookie (e.g. session ID) or signed cookie.
- Session store: PostgreSQL or in-memory (with Sticky sessions if scaled).

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
- **secrets.yml** → `MAILERSEND_API_TOKEN`, `DATABASE_URL`, etc.
- **Nginx:** Virtual host for the app (e.g. `tientjeketama.example.com`).

