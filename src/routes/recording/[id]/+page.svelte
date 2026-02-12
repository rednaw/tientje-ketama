<script lang="ts">
  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.recording.originalFilename} — Tientje Ketama</title>
</svelte:head>

<h1>{data.recording.originalFilename}</h1>

<audio controls src="/api/recording/{data.recording.id}/stream" preload="metadata">
  Your browser does not support the audio element.
</audio>

<p class="meta">
  {data.recording.format.toUpperCase()} · {Math.round(data.recording.fileSizeBytes / 1024)} KB
</p>

<p><a href="/">← Back to recordings</a></p>

<style>
  .meta {
    color: #666;
    font-size: 0.9em;
  }
  audio {
    width: 100%;
    max-width: 32rem;
  }
</style>
