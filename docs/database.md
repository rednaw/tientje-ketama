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

---

## Tables

### recordings

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| original_filename | text | As uploaded |
| format | text | e.g. 'wav', 'mp3', 'flac' |
| duration_seconds | integer | NULL if unknown |
| file_size_bytes | bigint | |
| uploaded_at | timestamptz | default now() |
| recorded_date | date | NULL, optional |
| venue | text | NULL, optional |
| source | text | NULL, e.g. 'DAT', 'cassette' |
| notes | text | NULL, optional |

- File on disk: `uploads/{id}/original.{ext}` (see [Storage](storage.md)).

---

## Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| recordings | uploaded_at | List by date |

---

## Prisma schema example

```prisma
model Recording {
  id               String   @id @default(uuid())
  originalFilename String
  format           String
  fileSizeBytes    BigInt
  uploadedAt       DateTime @default(now())

  @@index([uploadedAt])
}
```
