<script lang="ts">
  import { enhance } from '$app/forms';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
  let uploading = $state(false);

  function handleSubmit() {
    uploading = true;
    return async ({ update }: { update: () => Promise<void> }) => {
      try {
        await update();
      } finally {
        uploading = false;
      }
    };
  }
</script>

<h1>Upload recording</h1>

<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
  <div>
    <label for="file">Audio file</label>
    <input type="file" name="file" id="file" accept="audio/*" required disabled={uploading} />
  </div>
  <button type="submit" disabled={uploading}>
    {uploading ? 'Uploading...' : 'Upload'}
  </button>
</form>

{#if uploading}
  <p>Uploading file, please wait...</p>
{/if}

{#if data?.error}
  <p class="error">{data.error}</p>
{/if}

<style>
  .error {
    color: red;
  }
</style>
