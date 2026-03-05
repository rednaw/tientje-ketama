<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

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

  function handleDelete() {
    return async ({ result }: { result: { type: string } }) => {
      if (result.type === 'success') {
        await invalidateAll();
      }
    };
  }

  function confirmDelete(e: SubmitEvent) {
    if (!confirm('Delete this recording?')) {
      e.preventDefault();
    }
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
      <li class="row">
        <a href="/recording/{r.id}" class="card">
          <span class="filename">{r.originalFilename}</span>
          <span class="meta">
            {r.format.toUpperCase()} · {formatSize(r.fileSizeBytes)} · {formatDate(r.recordedAt)}
          </span>
        </a>
        <form action="?/delete" method="POST" use:enhance={handleDelete} onsubmit={confirmDelete} class="delete-form">
          <input type="hidden" name="id" value={r.id} />
          <button type="submit" class="delete-btn" title="Delete recording">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" x2="10" y1="11" y2="17"/>
              <line x1="14" x2="14" y1="11" y2="17"/>
            </svg>
          </button>
        </form>
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

  .row {
    display: flex;
    align-items: stretch;
    gap: 0.25rem;
  }

  .row .card {
    flex: 1;
    min-width: 0;
  }

  .delete-form {
    display: flex;
    align-items: center;
  }

  .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .delete-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
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
