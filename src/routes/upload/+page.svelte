<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  /** @type {import('./$types').ActionData} */
  let { form } = $props();
  let uploading = $state(false);
  let fileName = $state('');

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    fileName = input.files?.[0]?.name ?? '';
  }

  function handleSubmit() {
    uploading = true;
    return async ({ result, update }: { result: any; update: () => Promise<void> }) => {
      if (result.type === 'redirect') {
        await goto(result.location);
      } else {
        await update();
      }
      uploading = false;
    };
  }
</script>

<svelte:head>
  <title>Upload — Tientje Ketama</title>
</svelte:head>

<h1>Upload recording</h1>

<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
  <label class="file-input" class:has-file={fileName}>
    <input
      type="file"
      name="file"
      accept="audio/*"
      required
      disabled={uploading}
      onchange={handleFileChange}
    />
    <span class="file-label">
      {fileName || 'Choose an audio file'}
    </span>
  </label>

  <button type="submit" disabled={uploading || !fileName}>
    {uploading ? 'Uploading…' : 'Upload'}
  </button>
</form>

{#if uploading}
  <p class="status">Uploading file, please wait…</p>
{/if}

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<style>
  h1 {
    margin: 0 0 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 24rem;
  }

  .file-input {
    display: block;
    position: relative;
    padding: 2rem 1rem;
    border: 2px dashed var(--color-border);
    border-radius: var(--radius);
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s;
    background: var(--color-surface);
  }

  .file-input:hover {
    border-color: var(--color-accent);
  }

  .file-input.has-file {
    border-color: var(--color-accent);
    border-style: solid;
  }

  .file-input input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .file-label {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .has-file .file-label {
    color: var(--color-text);
    font-weight: 500;
  }

  button {
    align-self: flex-start;
  }

  .status {
    color: var(--color-text-muted);
    margin-top: 0.5rem;
  }

  .error {
    color: var(--color-error);
    margin-top: 0.5rem;
  }
</style>
