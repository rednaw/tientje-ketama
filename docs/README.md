# Tientje Ketama — Design

This document describes the design for Tientje Ketama: a band archive where members upload audio recordings and organize the collection.

## Context

- **Content:** Hundreds of audio recordings (rehearsals, gigs, sessions), some 20+ years old, various formats (WAV, MP3, FLAC, cassette digitizations, DAT transfers).
- **Users:** 7 band members. No authentication for now; the app is accessible to anyone with the URL.
- **Workflow:** Members upload recordings and listen back. New recordings are added regularly.

## Tech decisions

- **Language:** TypeScript
- **Framework:** SvelteKit (adapter-node)
- **Package manager:** npm
- **ORM:** Prisma
- **Deploy:** Standard IAC app — same server, Docker Compose, Nginx, private registry. PostgreSQL in app's compose stack.
- **Upload limit:** 500MB per file

## Phases

| Phase | Features |
|-------|----------|
| **1** | Upload media files → stored on server. Basic playback. |
| **2** | Scoring (1–5). Aggregated ordering. Metadata. |
| **3** | (Optional) AI: transcription for search, technical quality hints. Human judgment remains primary. |

## Aspects

- [Architecture](architecture.md) — SvelteKit end-to-end, stack, flows, deploy
- [Storage](storage.md) — Path structure, permissions, limits, backup
- [Database](database.md) — Schema, tables, indexes, migrations
