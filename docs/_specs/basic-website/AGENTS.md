# AGENTS.md — Portfolio Strategy Document

> **Owner:** Allwyn Thomas  
> **Role Target:** Software Engineer  
> **Date:** February 11, 2026  
> **Status:** Strategy Approved — Ready to Build

---

## 1. The Mandate

**Target Career Outcome:**  
Position Allwyn Thomas as a **job-ready, full-stack Software Engineer** to technical recruiters and hiring managers at high-growth companies in the **NY/NJ metropolitan area** — including but not limited to Fintech, Defense Tech, HealthTech, and SaaS sectors.

**Success Metrics:**
- A live, polished portfolio on GitHub Pages by end of day (February 11, 2026).
- Recruiters who visit the site can assess technical ability within **30 seconds**.
- Every section drives toward a single outcome: **the recruiter takes action** (clicks GitHub, downloads resume, or connects on LinkedIn).

**Brand Positioning:**  
> *"Full-stack software engineer out of NJIT Honors (3.95 GPA) who builds real things — from AI-powered games to real-time collaborative tools — and ships them."*

---

## 2. The Tech Stack

| Technology | Role | Why |
|---|---|---|
| **HTML5** | Structure | Semantic markup for SEO and accessibility. No framework overhead for a single-page portfolio. |
| **CSS3 (vanilla + CSS variables)** | Styling | Custom properties enable a consistent dark theme with deep navy/electric blue accents. No dependency on Bootstrap or Tailwind — proves CSS fluency. |
| **JavaScript (vanilla ES6+)** | Interactivity | ~50–80 lines total for scroll animations, mobile nav, and intersection observers. TypeScript's compile step adds friction against the same-day deadline with near-zero type-safety ROI at this scale. TS migration is a planned semester upgrade. |
| **GitHub Pages** | Hosting | Free, zero-config static hosting. Deploys on `git push`. Recruiters see the repo — the deployment method itself is a signal of Git proficiency. |
| **Google Fonts** | Typography | Professional, fast-loading typefaces via CDN. |
| **Font Awesome / SVG Icons** | Iconography | Recognizable tech/social icons for skills and contact links. |

**What we are NOT using (and why):**
- ❌ **React / Next.js / Vite** — Over-engineered for a single-page static site with no dynamic data.
- ❌ **TypeScript** — Deferred to semester upgrade phase. Current JS scope (~60 lines of DOM logic) doesn't justify the build toolchain.
- ❌ **CSS frameworks (Bootstrap, Tailwind)** — A custom design is more memorable and demonstrates genuine CSS skill.
- ❌ **Backend / CMS** — No server-side logic needed. Content is static and author-managed.

---

## 3. The Sitemap

Single-page, section-scrolling architecture. Each section maps to a navigation anchor.

### 3.1 — Hero
- **Full name:** Allwyn Thomas
- **Title:** Software Engineer
- **Tagline:** A concise one-liner conveying full-stack capability and builder mentality.
- **Primary CTAs:** "View My GitHub Contributions" button + "Download Resume" button.
- **Secondary link:** LinkedIn profile.
- **Visual treatment:** Dark background, large typography, subtle entrance animation.

### 3.2 — About
- 2–3 sentences covering: NJIT Computer Science major, Information Technology minor, Albert Dorman Honors College, 3.95 GPA, and core motivation.
- Establishes academic credibility quickly so the rest of the page can focus on proof.

### 3.3 — Skills
- Visual grid of tech stack chips/tags, grouped by category:
  - **Languages:** Python, TypeScript, JavaScript, Java, PHP
  - **Frameworks & Libraries:** Node.js, React, Pygame, TensorFlow, Keras
  - **Databases:** MongoDB, MariaDB, SQLite
  - **Tools & Platforms:** Git, AWS (EC2), WebSockets, JWT Auth
- Serves as a scannable keyword layer for both recruiters and search engines.

### 3.4 — Case Studies (Projects)

Three project cards, each structured as a mini case study:

| # | Project | Story | Tech Stack | Links |
|---|---|---|---|---|
| 1 | **Covey.Town Interactive Whiteboard** ⭐ Headliner | Joined a team to extend a 2D virtual meeting platform. Implemented real-time collaborative whiteboard with persistence using Tldraw, WebSockets, and SQLite. Deployed to AWS EC2. | TypeScript, Node.js, React, SQLite, WebSockets, Tldraw | GitHub, Live Demo |
| 2 | **Generative AI Pictionary** | Built a Pictionary-style game where a player competes against AI. Trained CNN and GAN models on Google's Quick Draw dataset for AI drawing generation and guess recognition. | Python, Pygame, TensorFlow, Keras | GitHub |
| 3 | **Jewelry Store E-Commerce** | Designed and built a full-stack e-commerce site with JWT authentication, user/admin roles, order management, and a MariaDB-backed product catalog. | HTML, CSS, PHP, JavaScript, MariaDB | — |

**Card design:** Each card includes a brief problem → solution → result narrative, tech tags, and action links. Covey.Town receives the most visual prominence (first position, potential screenshot/GIF).

### 3.5 — Lead-Gen / Contact

- **Purpose:** Convert recruiter interest into a real connection.
- **Implementation:** Clean contact section with direct action links:
  - 📧 **Email:** aet@njit.edu (mailto link)
  - 💼 **LinkedIn:** linkedin.com/in/allwyn-thomas
  - 🐙 **GitHub:** github.com/AllwynThomas
  - 📄 **Resume:** Direct PDF download link
- **Design note:** Framed as an invitation ("Let's build something together" or "Looking for a Software Engineer?") rather than a passive list. Functions as a lead-generation endpoint without the spam liability of an open form on a static site.

---

## 4. Non-Negotiables

### 4.1 — Mobile Responsiveness
- The site **must** render correctly and look intentional on all viewports: mobile (320px+), tablet (768px+), and desktop (1024px+).
- Navigation collapses to a hamburger menu on mobile.
- Project cards stack vertically on small screens.
- Touch targets meet minimum 44×44px accessibility guidelines.
- Tested against Chrome DevTools device emulation before deployment.

### 4.2 — SEO-Optimized Keywords (NJ/NY Focus)
The following keywords and phrases must appear naturally in the page content, meta tags, and semantic HTML:

- **Title tag:** `Allwyn Thomas | Software Engineer — NJ/NY`
- **Meta description:** Includes "software engineer," "New Jersey," "New York," and "full-stack."
- **Heading tags (H1–H3):** Include "Software Engineer" in H1.
- **Content keywords:** `software engineer`, `full-stack developer`, `New Jersey`, `New York`, `NYC`, `NJ`, `NJIT`, `Python`, `TypeScript`, `Node.js`, `React`, `machine learning`, `real-time`, `collaborative`, `AWS`.
- **Open Graph tags:** Properly set so LinkedIn link previews display the name, title, and a compelling description.
- **Semantic HTML:** `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` — not just `<div>` soup.

### 4.3 — Primary Call to Action
> **"View My GitHub Contributions"**

- This CTA appears in the **Hero section** as the primary action button.
- Links directly to: `https://github.com/AllwynThomas`
- Styled as the highest-contrast interactive element on the page (electric blue button on dark background).
- A secondary CTA — **"Download Resume"** — sits alongside it for recruiters who prefer a traditional document.
- The CTAs are **repeated** in the Contact/Lead-Gen section at the bottom of the page to capture visitors who scroll the full page.

### 4.4 — Performance & Accessibility
- Page load under 2 seconds on 3G (no heavy frameworks, optimized images).
- All images include `alt` attributes.
- Color contrast ratios meet WCAG AA (4.5:1 minimum for body text).
- Keyboard navigable (focus states on all interactive elements).

---

## 5. Semester Roadmap (Post-Launch)

| Phase | Upgrade | Timing |
|---|---|---|
| **v1.0** | Ship MVP portfolio (today) | Feb 11, 2026 |
| **v1.1** | Add project screenshots/GIFs, refine copy | Week 2 |
| **v1.2** | Migrate JS → TypeScript with build step | Week 4 |
| **v1.3** | Add blog/writing section | Mid-semester |
| **v1.4** | Add new projects as completed | Ongoing |
| **v2.0** | Custom domain + analytics | End of semester |

---

*This document serves as the single source of truth for all portfolio development decisions. Any scope additions must be evaluated against the mandate: does it help a recruiter say "yes" faster?*
