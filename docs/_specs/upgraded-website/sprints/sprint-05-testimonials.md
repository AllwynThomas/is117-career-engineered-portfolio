# Sprint 05 — Testimonials Section (Track C.1)

**Spec reference:** UPGRADE-SPEC.md → Track C.1  
**Prerequisites:** Sprint 02 complete (index.html is in its post-TypeScript-migration state).  
**Outcome:** A "Recommendations" section is inserted between `#projects` and `#contact`. A nav link is added. CSS supports the testimonial card layout.

---

## ⚠ Content Gate — Read Before Implementing

> **Do not deploy placeholder text on a recruiter-facing site.**  
> The spec (Track C.1) states: *"If real testimonials are not available at implementation time, omit the entire `<section id="testimonials">` block and its nav `<li>` from the deployed HTML. Placeholder bracket text on a live recruiter-facing site is a negative signal."*

**Before running this sprint, confirm with the developer:**
- Are real, attributed testimonials (LinkedIn recommendations, peer/professor endorsements) available to fill in?

If **yes** → proceed with Tasks 1–3 below, populating `[Quote text here.]`, `[Name]`, `[Title / Role]`, and `[Organization]` with the real content provided.

If **no** → **skip Tasks 1–2** (do not add the HTML). **Do complete Task 3** (add the CSS) so it is ready for when content becomes available, since the CSS has no visible effect without the HTML.

---

## Tasks

### 1. Add nav link for Recommendations

In `index.html`, find the navigation list. The current last item before the closing `</ul>` is:

```html
                <li class="nav__item"><a href="#projects" class="nav__link">Projects</a></li>
                <li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
            </ul>
```

Insert a new `<li>` between the Projects item and the Contact item:

```html
                <li class="nav__item"><a href="#projects" class="nav__link">Projects</a></li>
                <li class="nav__item"><a href="#testimonials" class="nav__link">Recommendations</a></li>
                <li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
            </ul>
```

---

### 2. Add testimonials section HTML

In `index.html`, locate the closing tag of the projects section and the start of the contact section:

```html
        </section>

        <!-- ========== SECTION 3.5 — LEAD-GEN / CONTACT ========== -->
        <section id="contact" class="contact section">
```

Insert the testimonials section **between** those two elements:

```html
        </section>

        <!-- ========== TESTIMONIALS ========== -->
        <section id="testimonials" class="testimonials section">
          <div class="container">
            <h2 class="section__title reveal">Recommendations</h2>
            <div class="testimonials__grid">

              <blockquote class="testimonial-card reveal">
                <p class="testimonial-card__quote">[Quote text here.]</p>
                <footer class="testimonial-card__footer">
                  <strong class="testimonial-card__name">[Name]</strong>
                  <span class="testimonial-card__role">[Title / Role], [Organization]</span>
                </footer>
              </blockquote>

              <!-- Add additional <blockquote> blocks here for each testimonial -->

            </div>
          </div>
        </section>

        <!-- ========== SECTION 3.5 — LEAD-GEN / CONTACT ========== -->
        <section id="contact" class="contact section">
```

Replace each bracketed placeholder with the actual testimonial content provided by the developer. Repeat the `<blockquote>` block for each additional testimonial.

---

### 3. Add testimonials CSS to `css/styles.css`

Find the end of the projects section CSS and the start of the contact section CSS. The boundary looks like this:

```css
.project-card__note i {
    margin-right: 4px;
}

/* ---------- Section 3.5 — Lead-Gen / Contact ---------- */
```

Insert the testimonials CSS block between them:

```css
.project-card__note i {
    margin-right: 4px;
}

/* ---------- Testimonials (Track C.1) ---------- */
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

/* ---------- Section 3.5 — Lead-Gen / Contact ---------- */
```

---

## Acceptance Criteria

- [ ] Testimonials CSS rules exist in `css/styles.css`.
- [ ] **If content is available:** Testimonials section appears between Projects and Contact in the rendered page.
- [ ] **If content is available:** Nav contains a "Recommendations" link that scrolls to `#testimonials`.
- [ ] **If content is available:** Each `<blockquote>` contains real, attributed quote text — no bracket placeholders are visible.
- [ ] **If content is available:** `.testimonial-card` elements carry the `reveal` class and animate in on scroll.
- [ ] **If content is NOT available:** No HTML changes are made; only the CSS is added.

---

## Files Modified

| File | Action |
|---|---|
| `index.html` | Nav `<li>` added; testimonials `<section>` inserted (only if real content is available) |
| `css/styles.css` | Testimonials CSS rules added |
