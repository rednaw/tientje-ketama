[**<---**](README.md)

# Storage

Where audio files live, how they are organized, and limits.

---

## Overview

- **Location:** Filesystem on the server (bind mount or volume).
- **Scope:** Originals preserved; optional transcoding for web playback later.
- **Access:** App reads/writes via Node `fs`; served via SvelteKit or Nginx.

---

## Path structure

```
uploads/
  {recording_id}/
    original.{ext}      # As uploaded (WAV, MP3, FLAC, etc.)
    playback.{ext}      # (Phase 2) Optional transcoded for browser (e.g. MP3)
```

- **`recording_id`:** UUID or nanoid. Unique per recording. From DB.
- **`original.{ext}`:** Preserve original format. Extension from upload.
- **`playback.{ext}`:** Optional. Transcode to MP3/OGG for broad browser support. Add in Phase 2 if needed.

**Alternative (flat):**
```
uploads/
  {recording_id}.{ext}
```
Simpler, but one file per recording. Metadata lives in DB. Use if transcoding is not needed.

---

## Recommendations

| Choice | Recommendation |
|--------|----------------|
| **Structure** | Per-recording directory (`uploads/{id}/original.{ext}`). Room for playback copy later. |
| **ID** | UUID v4 or nanoid. No guessable paths. |
| **Filenames** | Store original filename in DB; on disk use `original.{ext}` so format is explicit. |

---

## Permissions

- App process must have read/write on `uploads/`.
- Directory created by app on first upload, or by deploy/init script.
- Mode: `0755` (owner rwx, others rx).

---

## Bind mount (Docker)

```yaml
# docker-compose.yml
volumes:
  - ./uploads:/app/uploads
```

Or use a named volume if data should outlive the container; bind mount is simpler for single-server.

---

## File size limits

- **Limit:** 500MB per file (confirmed).
- **Nginx:** `client_max_body_size 500M;`
- **SvelteKit/Node:** Configure body parser limit to match.
- **App:** Validate size before writing.

---

## Backup

- `uploads/` is application data; back up separately from DB.
- `rsync`, `tar`, or volume backup to external storage.
- See IAC docs for backup strategy when added.
