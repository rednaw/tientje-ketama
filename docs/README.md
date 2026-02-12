# Tientje Ketama — Design

This document describes the design for Tientje Ketama: a band archive where members upload audio recordings, rank them collaboratively, and organize the collection.

## Context

- **Content:** Hundreds of audio recordings (rehearsals, gigs, sessions), some 20+ years old, various formats (WAV, MP3, FLAC, cassette digitizations, DAT transfers).
- **Users:** 7 band members.
- **Workflow:** Everyone uploads and ranks at their own pace (async). New recordings are added regularly.
- **Ranking:** Subjective quality (good → bad). Shared effort; aggregate scores across all 7.

## Tech decisions

- **Language:** TypeScript
- **Framework:** SvelteKit (adapter-node)
- **Package manager:** npm
- **ORM:** Prisma
- **Auth:** Magic links (Mailersend), invite-only
- **Deploy:** Standard IAC app — same server, Docker Compose, Nginx, private registry. PostgreSQL in app's compose stack.
- **Upload limit:** 500MB per file

## Phases

| Phase | Features |
|-------|----------|
| **1** | Upload media files → stored on server. Per-user authentication. Basic playback. |
| **2** | Per-user scoring (1–5). Aggregated ordering. Progress ("X of 7 have scored this"). Metadata. |
| **3** | (Optional) AI: transcription for search, technical quality hints. Human judgment remains primary. |

## Aspects

- [Architecture](architecture.md) — SvelteKit end-to-end, stack, flows, deploy
- [Authentication](auth.md) — Magic links, no passwords, Mailersend, invite flow, bootstrap seed script
- [Storage](storage.md) — Path structure, permissions, limits, backup
- [Database](database.md) — Schema, tables, indexes, migrations
