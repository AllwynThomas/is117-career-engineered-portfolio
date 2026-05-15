# Sprint 03 — GitHub Actions Deployment (Track A, Part 3)

**Spec reference:** UPGRADE-SPEC.md → Track A, Step 8  
**Prerequisites:** Sprint 01 and Sprint 02 complete (`package.json` with build scripts exists, `npm run build` passes).  
**Outcome:** A GitHub Actions workflow is in place that automatically builds the project and deploys the `dist/` output to the `gh-pages` branch on every push to `main`.

---

## Tasks

### 1. Create the workflow directory

Create the directory `.github/workflows/` at the repository root if it does not already exist.

---

### 2. Create `.github/workflows/deploy.yml`

Create the file `.github/workflows/deploy.yml` with the following **exact** content:

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

**What this does:**
- Triggers on every push to the `main` branch.
- Checks out the code, sets up Node 20 with npm caching, installs dependencies with `npm ci` (deterministic install from `package-lock.json`), and runs `npm run build`.
- Publishes the `dist/` directory to the `gh-pages` branch using the `peaceiris/actions-gh-pages` action with the built-in `GITHUB_TOKEN` — no manual secret setup required.

---

### 3. Configure GitHub Pages (manual step — done once by the repository owner)

After the first successful workflow run, the repository owner must configure GitHub Pages in the repository settings:

1. Go to **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`.
3. Set **Branch** to `gh-pages`, folder `/` (root).
4. Save.

> This manual step only needs to be done once. Subsequent pushes to `main` will trigger the workflow and update the live site automatically.

---

## Acceptance Criteria

- [ ] `.github/workflows/deploy.yml` exists with the content above.
- [ ] The YAML is valid (no syntax errors).
- [ ] After pushing to `main`, the Actions tab shows the `Deploy to GitHub Pages` workflow running and succeeding.
- [ ] The `gh-pages` branch is created or updated with the built `dist/` contents.

---

## Files Created

| File | Action |
|---|---|
| `.github/workflows/deploy.yml` | Created |
