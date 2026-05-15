# Sprint 01 — Build Infrastructure (Track A, Part 1)

**Spec reference:** UPGRADE-SPEC.md → Track A, Steps 1–4, 7  
**Prerequisites:** None — this is the first sprint.  
**Outcome:** npm workspace initialized, Vite + TypeScript installed and configured, `.gitignore` updated. The project can run `npm run dev` (serving `index.html` via Vite) and `npm run build` (outputting `dist/`).

> **Note on 404.html:** `vite.config.ts` is created here with only `index.html` as the input entry. The `404.html` entry is added in **Sprint 07** when that file is created. Doing it this way prevents a build error from a missing source file.

---

## Tasks

### 1. Initialize npm

Run in the repository root (`is117-career-engineered-portfolio/`):

```bash
npm init -y
npm install --save-dev vite typescript
```

After this step, `package.json` and `node_modules/` exist in the root.

---

### 2. Update `package.json` scripts

Open the generated `package.json`. Replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc --noEmit && vite build",
  "preview": "vite preview"
},
```

The full `scripts` section must look exactly like this. Do not remove any other fields npm generated (name, version, description, etc.).

---

### 3. Create `vite.config.ts`

Create this file at the repository root:

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

> `base: '/'` sets absolute asset paths — required so the built output works correctly on GitHub Pages regardless of subdirectory depth.  
> The `notFound` entry for `404.html` is added in Sprint 07.

---

### 4. Create `tsconfig.json`

Create this file at the repository root:

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

---

### 5. Create or update `.gitignore`

If `.gitignore` does not exist, create it. If it does exist, append the lines below only if they are not already present:

```
node_modules/
dist/
```

---

## Acceptance Criteria

- [ ] `package.json` exists with `dev`, `build`, and `preview` scripts.
- [ ] `vite.config.ts` exists at the repository root.
- [ ] `tsconfig.json` exists at the repository root.
- [ ] `node_modules/` directory exists (dependencies installed).
- [ ] `node_modules/` and `dist/` are listed in `.gitignore`.
- [ ] Running `npx vite --version` from the project root prints a version number without error.

---

## Files Created / Modified

| File | Action |
|---|---|
| `package.json` | Created by `npm init -y`, then scripts updated |
| `vite.config.ts` | Created |
| `tsconfig.json` | Created |
| `.gitignore` | Created or updated |
| `node_modules/` | Created by `npm install` |
