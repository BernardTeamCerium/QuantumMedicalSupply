# Top Banner (FreeStyle Libre)

The homepage shows a full-width promo banner at the very top. It uses a
`<picture>` element that swaps in a mobile-optimized image on small screens.

## Two image slots

| File | Shown on | Notes |
| --- | --- | --- |
| `freestyle-libre-3.jpg` | screens **wider than 640px** (desktop/tablet) | Current art is 1456×180 (very wide). |
| `freestyle-libre-3-mobile.jpg` | screens **640px and narrower** (phones) | Currently a stand-in copy of the desktop art — replace with a proper stacked/taller layout. |

## Replace either image
1. Save the approved Abbott/FreeStyle Libre banner with the matching filename
   above, in this folder, overwriting the existing file.
2. Commit/upload it. No code changes needed.

### Desktop image
- Recommended width **1456px** (matches the current art), short height.

### Mobile image
- The wide desktop banner becomes tiny/illegible on phones. A proper mobile
  banner should re-flow the same content into a **taller, narrower layout**
  (e.g. ~750×420) so the logo, CTA, and required legal text stay readable.
- Do **not** crop the desktop art to make a mobile version — the Abbott legal
  and trademark text must remain intact for compliance. Use an Abbott-provided
  mobile/square asset instead.

- The whole banner links to the Typeform eligibility funnel
  (`nocostcgm.typeform.com/...`). Tell me if that should change.
- If you only have PNGs, save them as `.png` and tell me — I'll point the
  markup at the `.png` files.

> Note: the banner is currently shown only on the homepage, per your choice.
