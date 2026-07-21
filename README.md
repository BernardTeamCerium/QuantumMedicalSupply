# Quantum Medical Supply — Website

A clean, fast, fully static marketing website for Quantum Medical Supply, a
nationwide durable medical equipment (DME) provider. The site is **informational
only** — it does not sell products. Its purpose is to explain the products
Quantum helps patients obtain (diabetic shoes, compression garments, and
continuous glucose monitors) and to help patients and providers get those
supplies at little or no cost through Medicare and commercial insurance.

## Tech stack

- Plain **HTML, CSS, and a tiny bit of vanilla JavaScript** — no build step,
  no dependencies, no framework.
- Hostable anywhere static files are served (GitHub Pages, Netlify, Vercel,
  Cloudflare Pages, S3, traditional hosting, etc.).

## Project structure

```
.
├── index.html            # Home
├── patients.html         # For Patients
├── providers.html        # For Providers
├── products.html         # Products (diabetic shoes / compression / CGM)
├── about.html            # About Us
├── contact.html          # Contact
├── accessibility.html    # Accessibility statement
├── privacy.html          # Privacy policy (template — have counsel review)
├── 404.html              # Not-found page
├── css/styles.css        # Single design-system stylesheet
├── js/main.js            # Mobile nav toggle + footer year
├── assets/favicon.svg    # Logo / favicon
├── assets/images/        # Master photography (see its README to swap in real photos)
│   └── responsive/       # Auto-generated WebP + JPEG variants (do not hand-edit)
├── scripts/
│   └── generate-images.mjs  # Builds responsive image variants with sharp
├── package.json          # devDependency: sharp; script: build:images
├── robots.txt
└── sitemap.xml
```

## Local preview

No build is required. Just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Responsive images (WebP)

Photos are served through `<picture>` + `srcset`, so each browser downloads the
smallest **WebP** (with a **JPEG** fallback) that fits its screen. The optimized
variants in `assets/images/responsive/` are committed to the repo, so **no build
step is needed to deploy or serve the site** — just upload the files.

You only re-run the build when you change a photo:

```bash
npm install            # first time only (installs sharp)
npm run build:images   # regenerates assets/images/responsive/ from the masters
```

The masters are the eight `assets/images/*.jpg` files; replace one (keeping the
same filename) and re-run the command. See
[`assets/images/README.md`](assets/images/README.md) for the full photo guide.

### Automatic builds (GitHub Actions)

You don't have to run the build locally if you don't want to. The workflow
[`.github/workflows/build-images.yml`](.github/workflows/build-images.yml) runs
`npm run build:images` automatically whenever you push a changed master photo
(or the build script), then commits the regenerated `assets/images/responsive/`
variants back to the same branch. So the simplest workflow is:

1. Replace a master `assets/images/<name>.jpg` (same filename) and push.
2. The Action regenerates the WebP/JPEG variants and commits them for you —
   `git pull` to get them locally.

It only triggers on master-image/build changes (never on its own variant
commits), so there's no build loop.

**On pull requests** the same workflow runs in *preview* mode instead: it builds
the variants but does **not** commit them. It uploads the regenerated files as a
downloadable **`responsive-images` artifact** and posts a summary comment on the
PR, so reviewers can inspect the optimized images before merge. The variants are
then committed automatically once the change lands on a branch via push.

## Things to customize before launch

These values are used consistently across all pages — search & replace to update:

- **Call-to-action / form link:** every primary CTA button points to
  `https://sales.quantummedicalsupply.com/` (opens in a new tab). Replace this
  with the real external eligibility/referral form URL if different.
- **Phone:** `(800) 704-6515` (links use `tel:+18007046515`).
- **Email:** `orders@quantummedicalsupply.com`.
- **Address:** `1818 S Australian Ave, Ste 301, West Palm Beach, FL 33409`.
- **Hours:** `Mon–Fri, 8:00 AM – 5:00 PM ET`.
- **Domain** in `robots.txt` and `sitemap.xml` if not `www.quantummedicalsupply.com`.
- **Privacy policy** (`privacy.html`) is a starter template and should be
  reviewed by qualified counsel (HIPAA, state law, actual data practices).
- **Photography:** `assets/images/` ships with branded placeholder images that
  are already wired into every page. To go live, replace each file with a real
  photo using the **same filename** — no markup changes needed. See
  [`assets/images/README.md`](assets/images/README.md) for the slot-by-slot guide
  (sizes, aspect ratios, and subject suggestions).

## Design notes

- Colors, spacing, radii, and shadows are defined as CSS custom properties at
  the top of `css/styles.css` (`:root`) — adjust the palette there in one place.
- Icons are inline SVGs (no icon font / external requests).
- Fully responsive with a mobile hamburger menu; accessible (skip link,
  focus styles, semantic landmarks, reduced-motion support).
