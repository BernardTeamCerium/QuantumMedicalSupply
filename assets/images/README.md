# Site Photography — Drop-in Guide

Every image below is already wired into the site. The files currently in this
folder are **branded placeholders**. To go live with real photography, just
**replace each file with a real photo using the exact same filename** — no HTML
or CSS changes are needed.

## How to replace

1. Pick/license a photo for each slot (see subject suggestions below).
2. Crop it to roughly the listed aspect ratio and export a **JPG** (quality ~80,
   ideally < 300 KB each; these are displayed at modest sizes).
3. Save it over the matching file in `assets/images/` using the **same name**.
4. Refresh the site — done.

> Tip: keep the exact filename and `.jpg` extension. If you only have PNGs, you
> can either convert to JPG or update the `src` in the HTML to `.png`.

## Image slots

| File | Size (px) | Aspect | Used on | Suggested subject |
|------|-----------|--------|---------|-------------------|
| `hero-home.jpg` | 1600×2000 | 4:5 (portrait) | Home hero | A happy, active older adult / senior couple living well; warm, hopeful, natural light |
| `lifestyle-support.jpg` | 1200×900 | 4:3 | Home "we do the hard part" | A friendly support specialist / care coordinator helping someone by phone |
| `product-diabetic-shoes.jpg` | 1200×900 | 4:3 | Home, Patients, Providers, Products | Therapeutic diabetic shoes — clean product shot or someone comfortably wearing them |
| `product-compression.jpg` | 1200×900 | 4:3 | Home, Patients, Providers, Products | A graduated compression garment on a leg/arm, or being fitted |
| `product-cgm.jpg` | 1200×900 | 4:3 | Home, Patients, Providers, Products | A CGM sensor (e.g., Dexcom/FreeStyle Libre) on the arm, ideally with the phone app |
| `patients-hero.jpg` | 1400×963 | ~16:11 | Patients page banner | A smiling senior relaxed and confident at home |
| `providers-hero.jpg` | 1400×963 | ~16:11 | Providers page banner | A clinician / physician in a practice setting |
| `about-story.jpg` | 1200×900 | 4:3 | About page | The team caring for patients, or the founder/pedorthist at work |

## Notes

- **Alt text** is already written into each `<img>` for accessibility/SEO. If a
  replacement photo shows something different, update the `alt=""` text on that
  `<img>` in the corresponding HTML file to match.
- **Licensing:** use photos you own or that are licensed for commercial use
  (e.g., a paid stock license, or a free license such as Unsplash/Pexels). Avoid
  using manufacturer/brand product images unless you have permission.
- **Faces & privacy:** if you photograph real patients, get written consent.
- The product photos are reused in several places, so replacing the three
  `product-*.jpg` files updates the cards on Home/Patients/Providers and the
  detailed sections on the Products page all at once.
