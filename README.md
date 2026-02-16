# Tientje Ketama — Band archive

SvelteKit app for uploading and playing recordings. Core: scaffold, database, upload, list, play.

## Dev Containers

**Open this project folder** in Cursor (File → Open Folder → choose `tientje-ketama`). The folder you open is what gets mounted in the container; if you open the parent directory, the devcontainer will open in the wrong place.

Then choose **Reopen in Container** when prompted (or run **Dev Containers: Reopen in Container** from the command palette). After opening, run:

```bash
npm install
npm run db:migrate   # once, to apply migrations
npm run dev          # Vite dev server on port 5173
```


App runs at http://localhost:5173

## Routes

| Route | Description |
|-------|-------------|
| `/` | List recordings |
| `/upload` | Upload form |
| `/recording/[id]` | Play recording |
