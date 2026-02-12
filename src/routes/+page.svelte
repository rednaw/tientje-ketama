<script lang="ts">
  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

<h1>Recordings</h1>

{#if data.recordings.length === 0}
  <p>No recordings yet. <a href="/upload">Upload one</a>.</p>
{:else}
  <ul>
    {#each data.recordings as r}
      <li>
        <a href="/recording/{r.id}">{r.originalFilename}</a>
        <span class="meta">({r.format}, {Math.round(r.fileSizeBytes / 1024)} KB)</span>
      </li>
    {/each}
  </ul>
  <p><a href="/upload">Upload another</a></p>
{/if}

<style>
  .meta {
    color: #666;
    font-size: 0.9em;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 0.5rem 0;
  }
</style>
