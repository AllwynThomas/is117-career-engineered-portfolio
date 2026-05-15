# Sprint 02 — TypeScript Migration (Track A, Part 2)

**Spec reference:** UPGRADE-SPEC.md → Track A, Steps 5, 6, 9  
**Prerequisites:** Sprint 01 complete (`package.json`, `vite.config.ts`, `tsconfig.json`, and `node_modules/` all exist).  
**Outcome:** `js/main.js` is deleted. `src/main.ts` is the sole JavaScript source of truth. `index.html` points to the TypeScript entry. `npm run build` completes with zero TypeScript errors.

---

## Tasks

### 1. Create the `src/` directory and `src/main.ts`

Create the file `src/main.ts` with the following **exact** content:

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

> This is a strict TypeScript rewrite of the original `js/main.js`. All four responsibilities are preserved: mobile nav toggle, header scroll background, scroll reveal observer, and active nav highlight. No class names, IDs, or aria attributes are changed.

---

### 2. Update `index.html` — script tag

Find this line near the bottom of `index.html` (just before `</body>`):

```html
    <!-- JavaScript (Section 2 — vanilla ES6+) -->
    <script src="js/main.js"></script>
```

Replace it with:

```html
    <!-- JavaScript entry point (Vite + TypeScript) -->
    <script type="module" src="/src/main.ts"></script>
```

---

### 3. Update `index.html` — footer copyright

Find this line in the `<footer>` of `index.html`:

```html
            <p>&copy; 2026 Allwyn Thomas. Built with HTML, CSS &amp; JavaScript.</p>
```

Replace it with:

```html
            <p>&copy; 2026 Allwyn Thomas. Built with TypeScript, CSS &amp; Vite.</p>
```

---

### 4. Delete `js/main.js`

Delete the file `js/main.js`.

After deletion, the `js/` directory will be empty. Delete the empty `js/` directory as well, or leave it — either is acceptable.

---

### 5. Verify the build

Run:

```bash
npm run build
```

Expected output: Vite reports a successful build, `dist/` is created, `dist/index.html` exists, and a hashed JS asset is listed in the output summary. Zero TypeScript compiler errors.

If `tsc --noEmit` fails, fix the type errors in `src/main.ts` before proceeding.

---

## Acceptance Criteria

- [ ] `src/main.ts` exists with full TypeScript content.
- [ ] `js/main.js` is deleted.
- [ ] `index.html` references `<script type="module" src="/src/main.ts">`.
- [ ] Footer reads "Built with TypeScript, CSS & Vite."
- [ ] `npm run build` completes with zero errors and produces `dist/`.
- [ ] `npm run dev` serves the site at `http://localhost:5173`; all nav, scroll, and animation behaviors work identically to the v1.0 MVP.

---

## Files Created / Modified / Deleted

| File | Action |
|---|---|
| `src/main.ts` | Created |
| `index.html` | Modified (script tag + footer text) |
| `js/main.js` | **Deleted** |
