[**<---**](README.md)

# Database schema

PostgreSQL. ORM: Prisma.

---

## Prisma setup

### Schema file
- `prisma/schema.prisma` — Declarative schema. Maps to tables below.

### Client
- `prisma generate` — Generates type-safe client.
- Run in build step; import `PrismaClient` in server code.

### Migrations
- `prisma migrate dev` — Development (creates migration, applies).
- `prisma migrate deploy` — Production (applies pending migrations).
- Run `prisma migrate deploy` on deploy (e.g. Docker entrypoint or pre-start script).

### Environment
- `DATABASE_URL` — PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/db`).
- Add to `secrets.yml` (SOPS) or `.env` for deploy.

### Seed script
- `prisma/seed.ts` (or `seed.js`) — Creates first admin when users table empty.
- Run via `prisma db seed` or `node scripts/seed-admin.js` that uses Prisma client.
- See [Authentication — Bootstrap](auth.md#bootstrap--first-admin).

---

## Tables

### users

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| email | text | UNIQUE, NOT NULL |
| role | text | 'admin' or 'member', default 'member' |
| created_at | timestamptz | default now() |

- Admins can create invites.
- All users can upload, score, and view.

---

### invites

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| token | text | UNIQUE, random 32+ bytes hex |
| created_by | uuid | FK → users.id |
| created_at | timestamptz | default now() |
| expires_at | timestamptz | e.g. created_at + 7 days |
| used_at | timestamptz | NULL until used |
| used_by | uuid | FK → users.id, NULL until used |

- Token stored in plain text (or hashed; then verify with plain token on redeem).
- Index on token for lookup.

---

### sessions

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → users.id |
| created_at | timestamptz | default now() |
| expires_at | timestamptz | e.g. created_at + 30 days |

- Session id stored in cookie.
- Index on id for lookup; index on user_id for cleanup.

---

### recordings

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| original_filename | text | As uploaded |
| format | text | e.g. 'wav', 'mp3', 'flac' |
| duration_seconds | integer | NULL if unknown |
| file_size_bytes | bigint | |
| uploaded_at | timestamptz | default now() |
| uploaded_by | uuid | FK → users.id |
| recorded_date | date | NULL, optional |
| venue | text | NULL, optional |
| source | text | NULL, e.g. 'DAT', 'cassette' |
| notes | text | NULL, optional |

- File on disk: `uploads/{id}/original.{ext}` (see [Storage](storage.md)).

---

### scores

| Column | Type | Notes |
|--------|------|-------|
| recording_id | uuid | FK → recordings.id |
| user_id | uuid | FK → users.id |
| score | integer | 1–5 |
| scored_at | timestamptz | default now() |
| PRIMARY KEY (recording_id, user_id) | | One score per user per recording |

- Aggregated order: `AVG(score)` per recording.
- Allow update: user can change score; `scored_at` updates.

---

## Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| users | email | Login lookup |
| invites | token | Join-link lookup |
| invites | (created_by, created_at) | Admin list invites |
| sessions | id | Session lookup |
| sessions | expires_at | Cleanup expired |
| recordings | uploaded_at | List by date |
| recordings | uploaded_by | List by uploader |
| scores | (recording_id, user_id) | PK, already indexed |
| scores | user_id | List user's scores |

---

## Prisma schema example

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      String   @default("member")
  createdAt DateTime @default(now())
  // relations
  invitesCreated Invite[] @relation("createdBy")
  sessions       Session[]
  recordings     Recording[]
  scores         Score[]
}
// ... other models
```
