<script lang="ts">
  import { enhance } from '$app/forms';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

<h1>Upload recording</h1>

<form method="POST" enctype="multipart/form-data" use:enhance>
  <div>
    <label for="file">Audio file</label>
    <input type="file" name="file" id="file" accept="audio/*" required />
  </div>
  <button type="submit">Upload</button>
</form>

{#if data?.error}
  <p class="error">{data.error}</p>
{/if}

<style>
  .error {
    color: red;
  }
</style>
