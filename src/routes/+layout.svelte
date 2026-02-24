<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';

  let { children } = $props();
</script>

<div class="shell">
  <header>
    <nav>
      <a href="/" class="brand">Tientje Ketama</a>
      <div class="nav-links">
        <a href="/" class:active={page.url.pathname === '/'}>Recordings</a>
        <a href="/upload" class:active={page.url.pathname === '/upload'}>Upload</a>
      </div>
    </nav>
  </header>

  <main>
    {@render children()}
  </main>
</div>

<style>
  .shell {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  header {
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  nav {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .brand {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--color-text);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 1.25rem;
  }

  .nav-links a {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  .nav-links a:hover {
    color: var(--color-text);
    text-decoration: none;
  }

  .nav-links a.active {
    color: var(--color-accent);
    border-bottom-color: var(--color-accent);
  }

  main {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 2rem 1.5rem;
    width: 100%;
    flex: 1;
  }
</style>
