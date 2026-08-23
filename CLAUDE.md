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
├── script.js           # Concert data loader & renderer (~230 lines)
├── CNAME               # GitHub Pages custom domain: www.marahalunga.com
├── .github/
│   └── workflows/
│       ├── claude.yml          # Claude Code integration (PR/issue comments)
│       └── sync-claude-md.yml  # Enforces CLAUDE.md stays in sync on PRs
├── assets/
│   ├── images/         # All images (logos, portraits, banners)
│   │   └── originals/  # Pre-optimization backups (do not edit)
│   ├── docs/           # EPK PDF and other documents
│   ├── fonts/          # DanhDa-Bold.otf (custom logo font)
│   └── data/
│       └── concerts.json  # Concert data (upcoming + past)
├── email/
│   └── newsletter-template.html  # Mailchimp campaign template (not part of the deployed site)
└── scripts/
    └── optimize_images.py  # Image optimization utility (Python/Pillow)
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (2 language files: EN, PT) |
| Styles | CSS3 (single `style.css`, ~900 lines) |
| Scripts | Vanilla JS (concert loader + rendering + gallery lightbox) |
| Data | JSON (`concerts.json` for concert listings) |
| Fonts | Google Fonts (Playfair Display, Source Sans Pro) + local DanhDa-Bold.otf |
| Hosting | GitHub Pages |
| Domain | CNAME → www.marahalunga.com |
| Analytics | Umami (cloud-hosted, privacy-friendly) |
| Utilities | Python 3 + Pillow (image optimization only) |

No npm, no bundler, no transpiler, no framework, no linter config.

---

## Page Structure (both HTML files)

Each HTML file follows the same section order:

1. **`<header>`** — Fixed navigation, logo, language switcher (EN/PT)
2. **`#home`** — Hero section: full-screen background, logo image
3. **`#about`** — Biography text + portrait image (`.about-text` / `.about-image`)
4. **`#music`** — Album card for "Vento Leste" with Spotify embed, YouTube video, streaming links, musician credits
5. **`#gallery`** — Photo gallery grid (12 images) with click-to-enlarge lightbox
6. **`#concerts`** — Dynamically loaded from `concerts.json`; split into upcoming and past subsections
7. **`#contact`** — Four contact cards: bookings email, social links, EPK download, newsletter signup
8. **`<footer>`** — Copyright with colored logo

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
- `.concerts-subsection` — upcoming/past concerts wrapper
- `.concerts-subsection-title` — subsection heading (gold, Playfair italic)
- `.performance-grid` — CSS Grid layout for concert cards
- `.performance-card` — concert listing cards
- `.ticket-link` — link to buy tickets (gold, bold)
- `.booking-section` — CTA section with gradient gold background
- `.contact-card` — contact section cards
- `.newsletter-card` / `.newsletter-cta` — newsletter signup card and CTA button
- `.spotify-embed` — Spotify iframe embed wrapper
- `.video-embed` / `.video-wrapper` — YouTube video embed with 16:9 responsive wrapper
- `.gallery-grid` / `.gallery-item` — photo gallery grid and individual items
- `.gallery-lightbox` — full-screen photo lightbox overlay
- `.hero-logo` — the large centered logo in the hero
- `.footer-logo` — small logo in footer

---

## Multilingual Workflow

Two parallel HTML files share the same `style.css` and `script.js`. When updating content:

1. **Always update both files** (`index.html`, `index-pt.html`) to keep them in sync.
2. Structure and CSS classes must remain identical across both — only the text content differs.
3. The language switcher `<div class="language-selector">` links between the two files; make sure the `active` class is on the correct language button in each file.
4. Concert data is shared via `assets/data/concerts.json` — `script.js` renders it in the correct language automatically.

---

## Key Assets

| File | Purpose |
|---|---|
| `assets/images/mara-halunga-logo-color.png` | Primary color logo (header + footer + hero) |
| `assets/images/mara-portrait-studio-bw.jpg` | Artist portrait (About section) |
| `assets/images/closed.jpg` | Hero background image |
| `assets/fonts/DanhDa-Bold.otf` | Custom display font |
| `assets/images/mara-portrait-smiling.jpg` | Gallery photo (smiling portrait) |
| `assets/images/mara-silhouette.jpg` | Gallery photo (silhouette) |
| `assets/images/mara-live-purple-light.jpg` | Gallery photo (live, purple stage lights) |
| `assets/images/mara-live-black-dress.jpg` | Gallery photo (live, black dress) |
| `assets/images/mara-live-outdoor-band.jpg` | Gallery photo (live, outdoor with band) |
| `assets/images/mara-live-orchestra-hall.jpg` | Gallery photo (live, concert hall) |
| `assets/images/mara-live-sequin-dress.jpg` | Gallery photo (live, sequin dress) |
| `assets/images/mara-studio-recording.jpg` | Gallery photo (recording studio) |
| `assets/images/mara-live-festival-stage.jpg` | Gallery photo (live, festival stage) |
| `assets/images/mara-live-green-smoke.jpg` | Gallery photo (live, green stage lights) |
| `assets/images/mara-live-blue-light-tambourine.jpg` | Gallery photo (live, tambourine, blue lights) |
| `assets/images/mara-live-festival-crowd.jpg` | Gallery photo (live, festival crowd) |
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

## Newsletter Email Template (`email/newsletter-template.html`)

Standalone HTML email template for Mailchimp campaigns, matching the site's dark/gold branding. **Not served by GitHub Pages** — it's an import artifact, not a site page.

- Table-based layout with inline styles (required for Outlook/Gmail/Apple Mail compatibility — no flexbox/grid)
- Uses Mailchimp merge tags: `*|IF:FNAME|*...*|ELSE:|*...*|END:IF|*` for the name greeting, `*|UNSUB|*` for the required unsubscribe link
- Sections marked "EDIT PER SEND" (announcement text, CTA link, upcoming-shows rows) should be updated by hand before each campaign — the shows list is static, not wired to `assets/data/concerts.json`
- To send: in Mailchimp, create a campaign → **Code your own → Paste in code** → paste this file's contents → edit the per-send sections → test send → send
- Mailchimp auto-appends its own required mailing-address compliance footer at send time regardless of what's in this template (CAN-SPAM requirement, enforced platform-side)

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

## Concerts Data (`assets/data/concerts.json`)

Concert data is stored as a JSON array. Each entry has:

```json
{
  "name": "Festival Name",
  "location": { "en": "City, Country", "pt": "Cidade, País" },
  "date": "2026-03-14",
  "time": "20:00",
  "url": "https://tickets.example.com"
}
```

- **`date`** supports variable precision: `"2026-03-14"` (full), `"2025-06"` (month), `"2025"` (year only)
- **`time`** is optional — shown only when present
- **`url`** is optional — renders a ticket link when present
- `script.js` automatically splits concerts into upcoming vs. past based on the current date
- Past concerts with the same name and location are grouped together, showing years

**Add a new concert:** Add an object to the array in `assets/data/concerts.json`. No HTML changes needed.

---

## Common Tasks

**Add a new concert/festival appearance:**
Add an entry to `assets/data/concerts.json` — concerts are rendered dynamically.

**Update streaming links:**
Search for `stream-btn` in all HTML files and update `href` values.

**Change a section heading or bio text:**
Edit the relevant `<p>` or `<h2>` in each HTML file with the appropriate translation.

**Add a new section:**
1. Add the `<section id="...">` block in both HTML files
2. Add a nav `<li><a href="#...">` link in both headers
3. Add CSS for the new section to `style.css`

**Add JavaScript interactivity:**
Write it in `script.js`. Keep it vanilla JS — no frameworks.

---

## Analytics & Click Tracking

Umami analytics is loaded in both HTML files via:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="67272770-7aca-401e-bea0-4c4793c2c844"></script>
```

Page views are tracked automatically. Custom click events use `data-umami-event` attributes on static HTML elements, and `umami.track()` in `script.js` for dynamically generated elements.

**Event naming conventions** — always use these exact names (language-independent so EN and PT stats aggregate):

| Event name | Element |
|---|---|
| `nav-home`, `nav-about`, `nav-music`, `nav-concerts`, `nav-contact` | Navigation links |
| `lang-switch-en`, `lang-switch-pt` | Language switcher buttons |
| `stream-spotify`, `stream-youtube`, `stream-all-platforms` | Music section streaming buttons |
| `social-spotify`, `social-instagram`, `social-youtube`, `social-linktree` | Contact section social links |
| `contact-booking-email` | Booking email link |
| `download-epk` | EPK download button |
| `ticket-click` | Concert ticket links (dynamic; also sets `data-umami-event-concert` to the concert name) |
| `show-past-concerts`, `hide-past-concerts` | Past concerts toggle button (dynamic) |
| `nav-gallery` | Gallery navigation link |
| `gallery-photo-view` | Gallery photo clicked to enlarge (dynamic) |
| `newsletter-signup` | Newsletter/mailing list CTA button |

**Rules:**
- Add `data-umami-event="<event-name>"` to any new static interactive element in both HTML files.
- For dynamically created elements in `script.js`, use `umami.track('<event-name>')` guarded by `if (typeof umami !== 'undefined')`.
- Keep event names identical across `index.html` and `index-pt.html`.

---

## Git Conventions

Commit messages observed in this project follow a short imperative style:
- `Add actual social media links`
- `Update website content based on new EPK`
- `Improve mobile responsiveness: fix hero logo sizing, add tablet & phone breakpoints`

A GitHub Actions workflow (`claude.yml`) provides Claude Code integration for PR and issue comments.

A `sync-claude-md.yml` workflow runs on every PR and posts a reminder comment if `CLAUDE.md` was not updated alongside other changes.

---

## Keeping CLAUDE.md in Sync

**This file must be updated whenever the codebase structure, conventions, or workflows change.** A GitHub Actions workflow (`sync-claude-md.yml`) enforces this by posting a reminder on PRs that modify code but don't update `CLAUDE.md`.

Changes that require a CLAUDE.md update include:
- Adding, removing, or renaming files/sections
- Changing the technology stack or data formats
- Modifying the multilingual workflow
- Adding new CSS classes or design tokens
- Changing deployment, build, or CI/CD processes

---

## What Does Not Exist Here

- No package.json / node_modules
- No test suite
- No server-side code
- No database
- No `.gitignore` (all files tracked)
- No linter or formatter configuration
- No build output directory
