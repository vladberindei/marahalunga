# CLAUDE.md — Mara Halunga Website

This file documents the codebase structure, conventions, and workflows for AI assistants working on this repository.

## Project Overview

Static artist portfolio website for **Mara Halunga**, a Romanian-Brazilian singer-songwriter. Hosted on GitHub Pages at [www.marahalunga.com](https://www.marahalunga.com).

**No build step. No backend. No package manager.** Edit files directly and push — GitHub Pages deploys automatically.

---

## Repository Structure

```
marahalunga/
├── index.html          # English version (primary/canonical page)
├── index-pt.html       # Portuguese version
├── style.css           # All styles (single file)
├── script.js           # Minimal JS placeholder (3 lines)
├── CNAME               # GitHub Pages custom domain: www.marahalunga.com
├── assets/
│   ├── images/         # All images (logos, portraits, banners)
│   │   └── originals/  # Pre-optimization backups (do not edit)
│   ├── docs/           # EPK PDF and other documents
│   ├── fonts/          # DanhDa-Bold.otf (custom logo font)
│   └── data/           # Placeholder (currently unused)
└── scripts/
    └── optimize_images.py  # Image optimization utility (Python/Pillow)
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (3 separate language files) |
| Styles | CSS3 (single `style.css`, ~850 lines) |
| Scripts | Vanilla JS (minimal placeholder) |
| Fonts | Google Fonts (Playfair Display, Source Sans Pro) + local DanhDa-Bold.otf |
| Hosting | GitHub Pages |
| Domain | CNAME → www.marahalunga.com |
| Utilities | Python 3 + Pillow (image optimization only) |

No npm, no bundler, no transpiler, no framework, no linter config.

---

## Page Structure (all three HTML files)

Each HTML file follows the same section order:

1. **`<header>`** — Fixed navigation, logo, language switcher (EN/RO/PT)
2. **`#home`** — Hero section: full-screen background, logo image, subtitle, CTA button
3. **`#about`** — Biography text + portrait image (`.about-text` / `.about-image`)
4. **`#music`** — Album card for "Vento Leste" with track list, streaming links, musician credits
5. **`#performances`** — Two performance cards with festival listings + booking blurb
6. **`#contact`** — Three contact cards: bookings email, social links, EPK download
7. **`<footer>`** — Copyright with colored logo

---

## CSS Conventions

**Design system** (defined as CSS custom properties in `:root`):

```css
--primary-gold: #d4af37
--secondary-gold: #b8941f
--dark-bg: #0a0a0a        /* page background */
--medium-dark: #1a1a1a    /* card backgrounds */
--light-dark: #2a2a2a     /* borders, dividers */
--text-light: #ffffff
--text-gray: #cccccc
--accent-red: #8b0000
--gradient-gold: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #b8941f 100%)
```

**Typography:**
- Body: `Source Sans Pro`, Arial, sans-serif
- Headings: `Playfair Display`, serif (italic for elegance)
- Logo/display: `DanhDa` (local font, bold only)

**Responsive breakpoints** (mobile-first additions):
- `1200px` — wide desktop adjustments
- `768px` — tablet
- `640px` — small tablet / large phone
- `480px` — phone

**Key CSS classes:**
- `.cta-button` — gold gradient call-to-action button
- `.stream-btn` — streaming platform links
- `.lang-btn` / `.lang-btn.active` — language switcher buttons
- `.album-card` — music section card
- `.performance-card` — festival listing cards
- `.contact-card` — contact section cards
- `.hero-logo` — the large centered logo in the hero
- `.footer-logo` — small logo in footer

---

## Multilingual Workflow

Two parallel HTML files share the same `style.css` and `script.js`. When updating content:

1. **Always update both files** (`index.html`, `index-pt.html`) to keep them in sync.
2. Structure and CSS classes must remain identical across both — only the text content differs.
3. The language switcher `<div class="language-selector">` links between the two files (EN / PT); make sure the `active` class is on the correct language button in each file.

---

## Key Assets

| File | Purpose |
|---|---|
| `assets/images/mara-halunga-logo-color.png` | Primary color logo (header + footer + hero) |
| `assets/images/Portrait 1 copy.jpg` | Artist portrait (About section) |
| `assets/images/closed.jpg` | Hero background image |
| `assets/fonts/DanhDa-Bold.otf` | Custom display font |
| `assets/docs/EPK_Mara_Halunga_EN_26.pdf` | Electronic Press Kit (19.4 MB) |

Do **not** commit new large images without running the optimizer first (see below).

---

## Image Optimization

Before committing new images, run:

```bash
python3 scripts/optimize_images.py
```

The script:
- Backs up originals to `assets/images/originals/` before modifying
- Resizes JPEGs to max 1920px wide, quality 80, progressive encoding
- Losslessly optimizes PNGs (skips files with "logo" in the name)
- Only processes files above size thresholds (500 KB for JPEG, 200 KB for PNG)
- Prints before/after sizes

Requires: `pip install Pillow`

---

## Deployment

Deployment is fully automatic via GitHub Pages:

1. Push to `master` branch → GitHub Pages rebuilds and serves within ~60 seconds
2. No build command or CI/CD pipeline needed
3. The custom domain is configured via the `CNAME` file — do not delete it

---

## Important Content Details

**Artist:** Mara Halunga
**Genre:** Brazilian music / jazz / world music / Romanian folk fusion
**Debut Album:** *Vento Leste* (8 tracks, recorded in São Paulo, produced by Bruno Dos Reis)
**Primary collaborator:** Cauê de Marinis (guitar, bass; co-composer)
**Booking email:** bookingmarcadarte@gmail.com
**Social links:**
- Spotify: https://open.spotify.com/artist/1agti7NaIB2OH70QeSy0g2
- Instagram: https://www.instagram.com/marahalunga
- YouTube: https://www.youtube.com/@MaraHalunga
- Linktree: https://linktr.ee/marahalunga

---

## Common Tasks

**Add a new festival appearance:**
Add a `<li>` to the appropriate `.achievements` list in all three HTML files.

**Update streaming links:**
Search for `stream-btn` in all HTML files and update `href` values.

**Change a section heading or bio text:**
Edit the relevant `<p>` or `<h2>` in each HTML file with the appropriate translation.

**Add a new section:**
1. Add the `<section id="...">` block in all three HTML files
2. Add a nav `<li><a href="#...">` link in all three headers
3. Add CSS for the new section to `style.css`

**Add JavaScript interactivity:**
Write it in `script.js`. Keep it vanilla JS — no frameworks.

---

## Git Conventions

Commit messages observed in this project follow a short imperative style:
- `Add actual social media links`
- `Update website content based on new EPK`
- `Improve mobile responsiveness: fix hero logo sizing, add tablet & phone breakpoints`

No linting, no hooks, no CI. Commit and push directly.

---

## What Does Not Exist Here

- No package.json / node_modules
- No test suite
- No CI/CD pipeline
- No server-side code
- No database
- No `.gitignore` (all files tracked)
- No linter or formatter configuration
- No build output directory
