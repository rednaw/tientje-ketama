<script lang="ts">
  import { enhance } from '$app/forms';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
  let errorMessage = $state<string | null>(null);

  function handleError({ result, update }: Parameters<Parameters<typeof enhance>[0]>[0]) {
    if (result.type === 'failure') {
      errorMessage = result.data?.error || 'Upload failed';
    } else if (result.type === 'error') {
      errorMessage = 'An unexpected error occurred';
    }
    return async () => {
      await update();
    };
  }
</script>

<h1>Upload recording</h1>

<form method="POST" enctype="multipart/form-data" use:enhance={handleError}>
  <div>
    <label for="file">Audio file</label>
    <input type="file" name="file" id="file" accept="audio/*" required />
  </div>
  <button type="submit">Upload</button>
</form>

{#if errorMessage || data?.error}
  <p class="error">{errorMessage || data?.error}</p>
{/if}

<style>
  .error {
    color: red;
  }
</style>
