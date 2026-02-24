<script lang="ts">
  /** @type {import('./$types').PageData} */
  let { data } = $props();

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
</script>

<svelte:head>
  <title>Recordings — Tientje Ketama</title>
</svelte:head>

<h1>Recordings</h1>

{#if data.recordings.length === 0}
  <div class="empty">
    <p>No recordings yet.</p>
    <a href="/upload">Upload the first one</a>
  </div>
{:else}
  <ul class="list">
    {#each data.recordings as r}
      <li>
        <a href="/recording/{r.id}" class="card">
          <span class="filename">{r.originalFilename}</span>
          <span class="meta">
            {r.format.toUpperCase()} · {formatSize(r.fileSizeBytes)} · {formatDate(r.recordedAt)}
          </span>
        </a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  h1 {
    margin: 0 0 1.5rem;
  }

  .empty {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--color-text-muted);
  }

  .empty a {
    display: inline-block;
    margin-top: 0.5rem;
    font-weight: 500;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s;
  }

  .card:hover {
    border-color: var(--color-accent);
    text-decoration: none;
  }

  .filename {
    font-weight: 500;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meta {
    color: var(--color-text-muted);
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>
