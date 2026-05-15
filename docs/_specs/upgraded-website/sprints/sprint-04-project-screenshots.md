# Sprint 04 — Project Screenshots (Track B)

**Spec reference:** UPGRADE-SPEC.md → Track B  
**Prerequisites:** Sprint 02 complete (`index.html` updated with TypeScript script tag; the rest of `index.html` structure is unchanged from v1.0).  
**Outcome:** Each of the three project cards in `index.html` displays a screenshot image at the top of the card. The images break edge-to-edge within the card using the negative-margin technique. Missing image files degrade gracefully (card still renders).

---

## Image file prerequisite (developer action)

Before this sprint can be visually verified, the developer must place the following image files in the repository:

| File path | Description |
|---|---|
| `assets/images/projects/coveytown-whiteboard.png` | Screenshot of the Covey.Town collaborative whiteboard |
| `assets/images/projects/ai-pictionary.png` | Screenshot of the Generative AI Pictionary game |
| `assets/images/projects/jewelry-store.png` | Screenshot of the Jewelry Store e-commerce site |

**Image requirements:**
- Format: PNG or WebP (WebP preferred)
- Recommended dimensions: 1200 × 630 px (16:9 or 16:10)
- File size: under 300 KB each (compress with [Squoosh](https://squoosh.app/) if needed)

**Create the directory** `assets/images/projects/` now so that the HTML references do not produce 404s in development:

```bash
mkdir -p assets/images/projects
```

The agent should create this directory. If no image files are placed in it yet, the `<img>` elements will simply collapse to 0 height and the cards will render normally.

---

## Tasks

### 1. Add screenshot to Project 1 (Covey.Town — Featured card)

In `index.html`, locate the featured project article. It begins with:

```html
                    <!-- Project 1: Covey.Town — Headliner -->
                    <article class="project-card project-card--featured reveal">
                        <div class="project-card__label">Featured Project</div>
```

Insert the `<img>` block **between** the opening `<article>` tag and the `<div class="project-card__label">` line, so it reads:

```html
                    <!-- Project 1: Covey.Town — Headliner -->
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
```

---

### 2. Add screenshot to Project 2 (Generative AI Pictionary)

In `index.html`, locate the second project article. It begins with:

```html
                    <!-- Project 2: Generative AI Pictionary -->
                    <article class="project-card reveal">
                        <h3 class="project-card__title">Generative AI Pictionary</h3>
```

Insert the `<img>` block **between** the opening `<article>` tag and the `<h3>` line, so it reads:

```html
                    <!-- Project 2: Generative AI Pictionary -->
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
```

---

### 3. Add screenshot to Project 3 (Jewelry Store E-Commerce)

In `index.html`, locate the third project article. It begins with:

```html
                    <!-- Project 3: Jewelry Store E-Commerce -->
                    <article class="project-card reveal">
                        <h3 class="project-card__title">Jewelry Store E-Commerce</h3>
```

Insert the `<img>` block **between** the opening `<article>` tag and the `<h3>` line, so it reads:

```html
                    <!-- Project 3: Jewelry Store E-Commerce -->
                    <article class="project-card reveal">
                        <img
                            src="assets/images/projects/jewelry-store.png"
                            alt="Screenshot of the Jewelry Store e-commerce site showing a product listing page with JWT-authenticated admin controls"
                            class="project-card__screenshot"
                            width="1200"
                            height="630"
                            loading="lazy"
                        >
                        <h3 class="project-card__title">Jewelry Store E-Commerce</h3>
```

---

### 4. Add screenshot CSS to `css/styles.css`

Locate the existing `.project-card` rule in `css/styles.css`. It currently reads:

```css
.project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: transform var(--transition), box-shadow var(--transition);
}
```

Add `overflow: hidden;` to this rule so it becomes:

```css
.project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: transform var(--transition), box-shadow var(--transition);
    overflow: hidden;
}
```

Then, immediately after the closing `}` of the `.project-card__note` rule block (the last project-card sub-rule, before the `/* ---------- Section 3.5 — Lead-Gen / Contact ---------- */` comment), insert the following new rule block:

```css
/* --- Project Card Screenshot --- */
.project-card__screenshot {
    width: calc(100% + 2 * var(--space-lg));
    margin: calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) var(--space-md);
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    display: block;
    border-bottom: 1px solid var(--border);
}
```

**Why these rules:**
- `overflow: hidden` on `.project-card` clips the image corners to match `--radius-lg`, preventing square image corners peeking out of the rounded card.
- The negative `margin` on `.project-card__screenshot` extends the image flush to the card edges, overcoming the card's `padding: var(--space-lg)`. This produces the full-bleed top-image pattern.

---

## Acceptance Criteria

- [ ] `assets/images/projects/` directory exists.
- [ ] All three project cards have an `<img class="project-card__screenshot">` as their first child element.
- [ ] All `<img>` elements include meaningful `alt` text.
- [ ] All `<img>` elements include `loading="lazy"`, `width="1200"`, and `height="630"`.
- [ ] `.project-card` CSS rule includes `overflow: hidden`.
- [ ] `.project-card__screenshot` CSS rule exists with the negative-margin and `aspect-ratio` declarations.
- [ ] When image files are present: images display edge-to-edge at the top of each card at 375 px, 768 px, and 1280 px viewports.
- [ ] When image files are absent: cards render correctly without broken-image visual artifacts breaking layout.

---

## Files Modified

| File | Action |
|---|---|
| `index.html` | Three `<img>` elements inserted into project cards |
| `css/styles.css` | `overflow: hidden` added to `.project-card`; `.project-card__screenshot` rule added |
| `assets/images/projects/` | Directory created |
