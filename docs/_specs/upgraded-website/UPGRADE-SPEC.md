# UPGRADE-SPEC.md — Portfolio v1.2 Agent Specification

> **Scope:** Three coordinated upgrades to the existing portfolio  
> **Agent:** Copilot / automated coding agent  
> **Baseline:** v1.0 MVP shipped Feb 11, 2026  
> **Targets:** AGENTS.md §5 roadmap items v1.1 + v1.2 + enhancements

---

## Overview

This spec covers three parallel upgrade tracks:

| Track | Description |
|---|---|
| **A** | Migrate `js/main.js` → TypeScript with a Vite build step |
| **B** | Add project screenshots to the Projects section |
| **C** | Add three new sections/features: Testimonials, Dark/Light mode toggle, Custom 404 page |

All changes must preserve the existing design system (CSS variables in `css/styles.css`), SEO attributes, and WCAG AA accessibility standards documented in `AGENTS.md §4`.

---

## Track A — TypeScript Migration with Vite

### Goal
Replace the raw `<script src="js/main.js">` approach with a Vite-bundled TypeScript pipeline. The compiled output must remain deployable to GitHub Pages (static files only, no server).

### Pre-migration audit
The current `js/main.js` contains ~75 lines across four responsibilities:
1. Mobile nav toggle (hamburger open/close + aria-expanded)
2. Header scroll background (`scrolled` class)
3. Scroll reveal via `IntersectionObserver` (`.reveal` → `.revealed`)
4. Active nav-link highlight based on scroll position

All four must be preserved exactly. Do not change any class names, IDs, or aria attributes.

### New repository structure after migration

```
is117-career-engineered-portfolio/
├── src/
│   └── main.ts          ← migrated from js/main.js
├── dist/                ← Vite build output (git-ignored)
│   ├── assets/
│   │   └── main-[hash].js
│   ├── 404.html         ← produced by Vite (multi-page build)
│   └── index.html       ← produced by Vite
├── 404.html             ← Vite source entry (Track C.3)
├── index.html           ← Vite entry point (source)
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
├── css/
│   └── styles.css
└── assets/
    ├── images/
    └── resume/
```

> **Note:** `js/main.js` is deleted after migration. `src/main.ts` is the sole JavaScript source of truth.

### Steps

#### 1. Initialize npm and install Vite + TypeScript

```bash
npm init -y
npm install --save-dev vite typescript
```

#### 2. Create `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',            // absolute base required so 404.html resolves assets correctly at any URL depth
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

> The `rollupOptions.input` map tells Vite to process `404.html` as a second HTML entry alongside `index.html`. Vite rewrites the `<link rel="stylesheet">` and any other asset references in both files, outputting a fully self-contained `dist/404.html` with hashed asset paths. `base: '/'` ensures those paths are absolute from root, which is necessary for `404.html` — GitHub Pages serves it for arbitrary URL paths (e.g. `/nonexistent`), so relative `./assets/…` paths would resolve incorrectly.

#### 3. Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

#### 4. Update `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

#### 5. Migrate `js/main.js` → `src/main.ts`

Apply strict TypeScript types throughout. Template:

```ts
'use strict';

// ---------- Mobile Navigation Toggle ----------
const navToggle = document.getElementById('nav-toggle') as HTMLButtonElement;
const navMenu = document.getElementById('nav-menu') as HTMLUListElement;
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__link');

navToggle.addEventListener('click', (): void => {
  const isOpen: boolean = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  const icon = navToggle.querySelector('i');
  if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

navLinks.forEach((link: HTMLAnchorElement): void => {
  link.addEventListener('click', (): void => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  });
});

// ---------- Header Background on Scroll ----------
const header = document.getElementById('header') as HTMLElement;

window.addEventListener('scroll', (): void => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---------- Scroll Animations / Intersection Observer ----------
const revealElements = document.querySelectorAll<HTMLElement>('.reveal');

const revealObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
  entries.forEach((entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
});

revealElements.forEach((el: HTMLElement): void => revealObserver.observe(el));

// ---------- Active Nav Link Highlight on Scroll ----------
const sections = document.querySelectorAll<HTMLElement>('section[id]');

const activateNavLink = (): void => {
  const scrollY: number = window.scrollY + 100;

  sections.forEach((section: HTMLElement): void => {
    const top: number = section.offsetTop - 100;
    const height: number = section.offsetHeight;
    const id: string | null = section.getAttribute('id');
    const link: HTMLAnchorElement | null = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
};

window.addEventListener('scroll', activateNavLink, { passive: true });
```

#### 6. Update `index.html` to use Vite entry point

Replace:
```html
<script src="js/main.js"></script>
```
With:
```html
<script type="module" src="/src/main.ts"></script>
```

> Vite handles this during `npm run dev` and replaces it with the hashed bundle output during `npm run build`.

Also update the footer copyright line:
```html
<p>&copy; 2026 Allwyn Thomas. Built with HTML, CSS &amp; JavaScript.</p>
```
Change to:
```html
<p>&copy; 2026 Allwyn Thomas. Built with TypeScript, CSS &amp; Vite.</p>
```

#### 7. Update `.gitignore`

Create or append:
```
node_modules/
dist/
```

#### 8. GitHub Pages deployment

Since Vite outputs to `dist/`, configure GitHub Pages to deploy from the `dist/` folder, **or** add a GitHub Actions workflow at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 9. Delete legacy file
Delete `js/main.js` after confirming `src/main.ts` compiles cleanly with `npm run build`.

---

## Track B — Project Screenshots

### Goal
Add a screenshot image to each of the three project cards in `index.html`. Images are provided by the developer and placed in `assets/images/projects/`.

### Image file convention

| Project | Expected filename |
|---|---|
| Covey.Town Interactive Whiteboard | `assets/images/projects/coveytown-whiteboard.png` |
| Generative AI Pictionary | `assets/images/projects/ai-pictionary.png` |
| Jewelry Store E-Commerce | `assets/images/projects/jewelry-store.png` |

- **Format:** PNG or WebP (WebP preferred for performance).
- **Recommended dimensions:** 1200×630px (16:10 aspect ratio). This matches the OG image ratio and looks sharp on retina displays when displayed at ~600px wide.
- **File size target:** Under 300 KB each. Use [Squoosh](https://squoosh.app/) or `sharp` CLI to compress before committing.
- **Alt text:** Must describe the screenshot content meaningfully (see markup below).

### HTML markup change

For each project card, insert an `<img>` block immediately inside the `<article>` element, **before** the `.project-card__label` or title element.

**Featured card (Covey.Town):**
```html
<article class="project-card project-card--featured reveal">
  <img
    src="assets/images/projects/coveytown-whiteboard.png"
    alt="Screenshot of the Covey.Town collaborative whiteboard showing multiple users drawing in real time"
    class="project-card__screenshot"
    width="1200"
    height="630"
    loading="lazy"
  >
  <div class="project-card__label">Featured Project</div>
  <!-- ... rest of card unchanged ... -->
</article>
```

**Standard cards (AI Pictionary, Jewelry Store):**
```html
<article class="project-card reveal">
  <img
    src="assets/images/projects/ai-pictionary.png"
    alt="Screenshot of the Generative AI Pictionary game showing a drawing canvas and AI guess panel"
    class="project-card__screenshot"
    width="1200"
    height="630"
    loading="lazy"
  >
  <h3 class="project-card__title">Generative AI Pictionary</h3>
  <!-- ... rest of card unchanged ... -->
</article>
```

### CSS additions to `css/styles.css`

Add these rules in the **Projects** section of the stylesheet:

```css
/* --- Project Card Screenshot --- */
/* overflow: hidden clips the image to the card's border-radius */
.project-card {
  overflow: hidden;
}

.project-card__screenshot {
  /* Negative margins extend the image flush with the card edges,
     overcoming the card's padding: var(--space-lg) on all sides */
  width: calc(100% + 2 * var(--space-lg));
  margin: calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-md);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  display: block;
  border-bottom: 1px solid var(--border);
}
```

> The negative-margin technique produces an edge-to-edge image at the top of each card, matching the standard card pattern. `overflow: hidden` on `.project-card` clips the image corners to match `--radius-lg`. If an image file is missing at deploy time, the `<img>` collapses to 0 height and the card continues to render correctly.

---

## Track C — New Sections and Features

---

### C.1 — Testimonials / Recommendations Section

#### Purpose
Social proof from peers, professors, or collaborators that reinforces the "team player who ships" brand positioning from `AGENTS.md §1`.

#### Placement
Insert between `#projects` and `#contact` in `index.html`. Navigation link added to `<nav>`.

#### Navigation update
```html
<li class="nav__item"><a href="#testimonials" class="nav__link">Recommendations</a></li>
```
Insert after the existing Projects `<li>` item.

#### HTML structure
```html
<!-- ========== TESTIMONIALS ========== -->
<section id="testimonials" class="testimonials section">
  <div class="container">
    <h2 class="section__title reveal">Recommendations</h2>
    <div class="testimonials__grid">

      <blockquote class="testimonial-card reveal">
        <p class="testimonial-card__quote">"[Quote text here.]"</p>
        <footer class="testimonial-card__footer">
          <strong class="testimonial-card__name">[Name]</strong>
          <span class="testimonial-card__role">[Title / Role], [Organization]</span>
        </footer>
      </blockquote>

      <!-- Repeat <blockquote> blocks for each testimonial -->

    </div>
  </div>
</section>
```

> **Content gate — do not deploy this section with placeholder text.** If real testimonials (LinkedIn recommendations, peer feedback, professor endorsements) are not available at implementation time, omit the entire `<section id="testimonials">` block and its nav `<li>` from the deployed HTML. Placeholder bracket text on a live recruiter-facing site is a negative signal. Add the section only when it can be populated with genuine, attributed quotes.

#### CSS for testimonials
```css
/* --- Testimonials --- */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin: 0;
}

.testimonial-card__quote {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

.testimonial-card__quote::before { content: '\201C'; }
.testimonial-card__quote::after  { content: '\201D'; }

.testimonial-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.testimonial-card__name {
  color: var(--accent-light);
  font-weight: 600;
}

.testimonial-card__role {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}
```

#### TypeScript module addition (`src/main.ts`)
No JS logic is needed for static testimonials. The existing `IntersectionObserver` applied to `.reveal` elements handles the scroll-entrance animation automatically, since `.testimonial-card` will carry the `reveal` class.

---

### C.2 — Dark / Light Mode Toggle

#### Purpose
Demonstrates CSS/JS competence. Improves usability for recruiter environments where light mode may be preferred.

#### Design constraint
The site's default is dark mode (current design). Light mode is an opt-in override. The toggle must persist across page reloads via `localStorage`.

#### Implementation

**HTML — add toggle button to `<nav>`:**
```html
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark mode" title="Toggle theme">
  <i class="fas fa-sun" id="theme-icon"></i>
</button>
```
Insert after `<button class="nav__toggle"...>` inside `<nav class="nav container">`.

**CSS — light mode variable overrides in `css/styles.css`:**
```css
/* --- Light Mode Theme Override --- */
body.light-mode {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-card: #ffffff;
  --bg-nav: rgba(248, 250, 252, 0.95);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --accent: #2563eb;
  --accent-light: #3b82f6;
  --accent-dark: #1d4ed8;
  --accent-glow: rgba(37, 99, 235, 0.1);
  --border: #e2e8f0;
  --white: #ffffff;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color var(--transition), border-color var(--transition), background var(--transition);
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-glow);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

**TypeScript — add to `src/main.ts`:**
```ts
// ---------- Dark / Light Mode Toggle ----------
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const themeIcon   = document.getElementById('theme-icon')   as HTMLElement;

const applyTheme = (theme: 'dark' | 'light'): void => {
  document.body.classList.toggle('light-mode', theme === 'light');
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
};

const raw = localStorage.getItem('theme');
const savedTheme: 'dark' | 'light' = raw === 'light' ? 'light' : 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', (): void => {
  const next: 'dark' | 'light' = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});
```

---

### C.3 — Custom 404 Page

#### Purpose
Polished error handling that keeps visitors on-brand rather than showing a bare GitHub Pages 404.

#### File
Create `404.html` at the repository root (GitHub Pages serves this automatically on missing routes).

#### HTML — `404.html`
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

> The `vite.config.ts` in Track A registers `404.html` as a second Rollup entry. Vite processes and outputs it to `dist/404.html` automatically — no manual copy step needed. The `<link rel="stylesheet" href="css/styles.css">` reference is rewritten by Vite to the hashed bundle path, the same as `index.html`. There is no post-build CSS path issue when Track A is implemented first.

---

## Acceptance Criteria

| Check | Track |
|---|---|
| `npm run build` completes with zero TypeScript errors | A |
| `npm run dev` hot-reloads correctly; all scroll/nav interactions work identically to v1.0 | A |
| GitHub Actions workflow deploys `dist/` to `gh-pages` branch on push to `main` | A |
| `js/main.js` file is deleted | A |
| Each project card displays its screenshot image | B |
| All `<img>` elements have meaningful `alt` text | B |
| Screenshots do not break card layout at 375px, 768px, or 1280px viewport widths | B |
| Recommendations section is visible between Projects and Contact | C.1 |
| `blockquote` elements use semantic HTML and real attribution text | C.1 |
| Theme toggle appears in nav and is keyboard accessible | C.2 |
| Clicking toggle switches between dark and light mode | C.2 |
| Theme preference persists on page reload via `localStorage` | C.2 |
| Navigating to a nonexistent URL (e.g. `/foo`) serves the custom 404 page | C.3 |
| 404 page links back to portfolio root and to GitHub | C.3 |
| WCAG AA color contrast maintained in both dark and light mode | C.2 |

---

## Files Created / Modified

| File | Action | Track |
|---|---|---|
| `src/main.ts` | **Create** (migrated + typed) | A |
| `vite.config.ts` | **Create** | A |
| `tsconfig.json` | **Create** | A |
| `package.json` | **Create** | A |
| `.gitignore` | **Create or update** | A |
| `.github/workflows/deploy.yml` | **Create** | A |
| `js/main.js` | **Delete** | A |
| `index.html` | **Modify** (script tag, screenshot `<img>`, testimonials section, theme toggle button, nav link) | A, B, C.1, C.2 |
| `css/styles.css` | **Modify** (screenshot, testimonials, light-mode, theme-toggle rules) | B, C.1, C.2 |
| `404.html` | **Create** | C.3 |
| `assets/images/projects/coveytown-whiteboard.png` | **Add** (developer-provided) | B |
| `assets/images/projects/ai-pictionary.png` | **Add** (developer-provided) | B |
| `assets/images/projects/jewelry-store.png` | **Add** (developer-provided) | B |

---

## Out of Scope for This Spec

The following are explicitly deferred and must **not** be added by the implementing agent:

- Blog / writing section
- Analytics (Plausible, GA, etc.)
- Custom domain setup
- Any backend, serverless function, or API
- Replacing `css/styles.css` with a CSS framework
- Changing the color palette or typography beyond the light-mode override

---

*Last updated: May 15, 2026*
