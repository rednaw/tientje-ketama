# Tientje Ketama — Band archive

SvelteKit app for uploading and playing recordings. Core: scaffold, database, upload, list, play.

## Dev Containers

Open the repo in VS Code or Cursor and choose **Reopen in Container** when prompted (or run **Dev Containers: Reopen in Container** from the command palette). The container includes Node 20, PostgreSQL, and runs `npm install` and `prisma generate` on create. After opening:

```bash
npm run db:migrate   # once, to apply migrations
npm run dev          # Vite dev server on port 5173
```

## Local dev

Requires Node 20+ and npm.

```bash
# Install dependencies (generates package-lock.json)
npm install

# Copy env
cp .env.example .env

# Start Postgres (or use your own)
docker compose up -d db

# Run migrations
npm run db:migrate

# Dev server
npm run dev
```

## Docker

```bash
docker compose up --build
```

App runs at http://localhost:3000. Migrations run on startup.

## Routes

| Route | Description |
|-------|-------------|
| `/` | List recordings |
| `/upload` | Upload form |
| `/recording/[id]` | Play recording |
