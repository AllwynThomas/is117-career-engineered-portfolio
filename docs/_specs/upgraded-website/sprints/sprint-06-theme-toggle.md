# Sprint 06 — Dark / Light Mode Toggle (Track C.2)

**Spec reference:** UPGRADE-SPEC.md → Track C.2  
**Prerequisites:** Sprint 02 complete (`src/main.ts` exists; `index.html` uses the `<script type="module" src="/src/main.ts">` entry point).  
**Outcome:** A theme toggle button appears in the nav bar. Clicking it switches between dark mode (default) and light mode. The preference persists across page reloads via `localStorage`. Both modes maintain WCAG AA color contrast.

---

## Tasks

### 1. Add theme toggle button to `index.html`

In `index.html`, find the navigation's hamburger toggle button. It currently reads:

```html
            <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
        </nav>
    </header>
```

Insert the theme toggle button **between** the `<button class="nav__toggle">` element and the closing `</nav>` tag:

```html
            <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <button class="theme-toggle" id="theme-toggle" aria-label="Switch to light mode" title="Toggle theme">
                <i class="fas fa-sun" id="theme-icon"></i>
            </button>
        </nav>
    </header>
```

> The `aria-label` is initialized to "Switch to light mode" because the default theme is dark. The TypeScript code in Task 3 updates it dynamically.

---

### 2. Add light mode and toggle CSS to `css/styles.css`

Find the end of the accessibility focus-states section — the last block in the file. It ends with:

```css
.nav__link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
}
```

Append the following CSS **after** this closing `}`, at the very end of the file:

```css

/* ---------- Light Mode Theme Override (Track C.2) ---------- */
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

> The `body.light-mode` block overrides every CSS custom property that affects color. Because all colors in `css/styles.css` use `var(--...)`, a single class on `<body>` is sufficient to re-theme the entire page — no component-level changes are needed.

---

### 3. Add theme toggle TypeScript to `src/main.ts`

Open `src/main.ts`. The file currently ends with the active nav link scroll handler:

```ts
window.addEventListener('scroll', activateNavLink, { passive: true });
```

Append the following block **after** that last line, at the end of the file:

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

**What this code does:**
- On page load, reads `localStorage.getItem('theme')`. If the stored value is `'light'`, applies light mode immediately (before paint). Otherwise defaults to dark.
- `applyTheme` toggles the `light-mode` class on `<body>`, swaps the icon (sun ↔ moon), and updates `aria-label` to always describe the *next* action.
- On click, determines the next theme, saves it to `localStorage`, and calls `applyTheme`.

---

### 4. Verify TypeScript compiles cleanly

Run:

```bash
npm run build
```

Expected: zero TypeScript errors. If `tsc --noEmit` reports unused variable or parameter errors, check that `themeToggle`, `themeIcon`, `applyTheme`, and `savedTheme` are all referenced.

---

## Acceptance Criteria

- [ ] Theme toggle button appears in the nav bar on both desktop and mobile viewports.
- [ ] Button is keyboard accessible (focusable, has `aria-label`, visible focus ring via `:focus-visible`).
- [ ] Clicking the button toggles `light-mode` class on `<body>`.
- [ ] Dark → light: background becomes light gray/white, text becomes dark navy, icon changes to moon.
- [ ] Light → dark: background returns to deep navy, text returns to light, icon changes to sun.
- [ ] Refreshing the page after toggling preserves the selected theme (`localStorage` persistence).
- [ ] Both dark and light modes pass WCAG AA contrast (4.5:1 for body text). Verify with browser DevTools accessibility checker or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- [ ] `npm run build` completes with zero TypeScript errors.

---

## Files Modified

| File | Action |
|---|---|
| `index.html` | Theme toggle `<button>` added to nav |
| `css/styles.css` | `body.light-mode` variable overrides and `.theme-toggle` rules appended |
| `src/main.ts` | Theme toggle logic appended |
