<script lang="ts">
  /** @type {import('./$types').PageData} */
  let { data } = $props();

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
</script>

<svelte:head>
  <title>{data.recording.originalFilename} — Tientje Ketama</title>
</svelte:head>

<a href="/" class="back">&larr; Back to recordings</a>

<h1>{data.recording.originalFilename}</h1>

<div class="player">
  <audio controls src="/api/recording/{data.recording.id}/stream" preload="metadata">
    Your browser does not support the audio element.
  </audio>
</div>

<dl class="details">
  <dt>Format</dt>
  <dd>{data.recording.format.toUpperCase()}</dd>
  <dt>Size</dt>
  <dd>{formatSize(data.recording.fileSizeBytes)}</dd>
</dl>

<style>
  .back {
    display: inline-block;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0 0 1.5rem;
    word-break: break-word;
  }

  .player {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  audio {
    width: 100%;
    display: block;
  }

  .details {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  .details dt {
    font-weight: 500;
    color: var(--color-text);
  }

  .details dd {
    margin: 0;
  }
</style>
