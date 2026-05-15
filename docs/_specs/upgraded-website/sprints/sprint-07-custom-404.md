# Sprint 07 — Custom 404 Page (Track C.3)

**Spec reference:** UPGRADE-SPEC.md → Track C.3  
**Prerequisites:** Sprint 01 complete (`vite.config.ts` exists). Sprint 02 complete (`index.html` is in its post-migration state and `css/styles.css` is the single stylesheet).  
**Outcome:** A branded `404.html` exists at the repository root. GitHub Pages automatically serves it for any unrecognized URL path. `vite.config.ts` is updated to include `404.html` as a second build entry so Vite rewrites its asset references on `npm run build`.

---

## Tasks

### 1. Create `404.html`

Create the file `404.html` at the repository root with the following **exact** content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Page Not Found | Allwyn Thomas</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <style>
    .not-found {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--space-xl);
      gap: var(--space-md);
    }
    .not-found__code {
      font-size: clamp(5rem, 20vw, 10rem);
      font-weight: 800;
      line-height: 1;
      color: var(--accent);
      letter-spacing: -0.05em;
    }
    .not-found__title {
      font-size: var(--font-size-2xl);
      color: var(--text-primary);
    }
    .not-found__subtitle {
      color: var(--text-secondary);
      max-width: 420px;
    }
    .not-found__actions {
      display: flex;
      gap: var(--space-sm);
      flex-wrap: wrap;
      justify-content: center;
      margin-top: var(--space-sm);
    }
  </style>
</head>
<body>
  <main class="not-found">
    <p class="not-found__code">404</p>
    <h1 class="not-found__title">Page not found</h1>
    <p class="not-found__subtitle">This URL doesn't exist — but the portfolio does. Head back and take a look.</p>
    <div class="not-found__actions">
      <a href="/" class="btn btn--primary"><i class="fas fa-home"></i> Back to Portfolio</a>
      <a href="https://github.com/AllwynThomas" target="_blank" rel="noopener noreferrer" class="btn btn--outline"><i class="fab fa-github"></i> GitHub</a>
    </div>
  </main>
</body>
</html>
```

**Design notes:**
- `<meta name="robots" content="noindex">` prevents search engines from indexing the 404 page.
- Inherits the full design system from `css/styles.css` (dark theme, CSS variables, `.btn` classes).
- `href="/"` on the "Back to Portfolio" link works correctly on GitHub Pages because `vite.config.ts` sets `base: '/'`.
- No `<script>` tag — the 404 page is intentionally static with no JavaScript dependency.

---

### 2. Update `vite.config.ts` to add `404.html` as a build entry

Open `vite.config.ts`. It currently reads:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
```

Replace the `rollupOptions.input` object to add the `notFound` entry:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
```

**Why this matters:** Vite processes both HTML files as entry points. It rewrites the `<link rel="stylesheet" href="css/styles.css">` reference in `404.html` to the content-hashed bundle path (e.g., `assets/styles-abc123.css`), the same path used in `index.html`. Without this, the built `dist/404.html` would reference a non-existent `css/styles.css` path and render unstyled.

---

### 3. Verify the build

Run:

```bash
npm run build
```

Expected output:
- Both `dist/index.html` and `dist/404.html` are listed in the build output.
- Both reference the same hashed CSS and JS assets.
- Zero TypeScript or Rollup errors.

Spot-check: Open `dist/404.html` in a text editor and confirm the `<link rel="stylesheet">` href points to a hashed path under `assets/` (not a bare `css/styles.css` reference).

---

## Acceptance Criteria

- [ ] `404.html` exists at the repository root.
- [ ] `vite.config.ts` includes `notFound: resolve(__dirname, '404.html')` in `rollupOptions.input`.
- [ ] `npm run build` produces both `dist/index.html` and `dist/404.html`.
- [ ] `dist/404.html` references hashed asset paths (not bare `css/styles.css`).
- [ ] Navigating to a nonexistent URL on the deployed GitHub Pages site (e.g., `https://allwynthomas.github.io/nonexistent`) serves the custom 404 page with full styles applied.
- [ ] "Back to Portfolio" button links to `/` (portfolio root).
- [ ] "GitHub" button links to `https://github.com/AllwynThomas` and opens in a new tab.
- [ ] Page renders correctly in both dark mode (default) and light mode (if Sprint 06 is complete).

---

## Files Created / Modified

| File | Action |
|---|---|
| `404.html` | Created |
| `vite.config.ts` | Modified — `notFound` entry added to `rollupOptions.input` |
