#!/usr/bin/env node
/**
 * Responsive image build for Quantum Medical Supply.
 *
 * Reads the "master" photos in assets/images/ and generates lightweight,
 * responsive variants in assets/images/responsive/ as both WebP and JPEG:
 *
 *     assets/images/hero-home.jpg   (master, you replace this)
 *        -> assets/images/responsive/hero-home-400.webp   + .jpg
 *        -> assets/images/responsive/hero-home-800.webp   + .jpg
 *        -> assets/images/responsive/hero-home-1200.webp  + .jpg
 *        -> assets/images/responsive/hero-home-1600.webp  + .jpg  (hero only)
 *
 * The HTML already references these variants via <picture> + srcset, so after
 * replacing a master photo you only need to re-run:  npm run build:images
 *
 * Idempotent: safe to run repeatedly. Variants are only (re)written when the
 * master is newer than the existing output.
 */
import { readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "assets", "images");
const OUT_DIR = join(SRC_DIR, "responsive");

// Widths to emit. Variants wider than the master are skipped automatically.
const WIDTHS = [400, 800, 1200, 1600];
const WEBP_QUALITY = 78;
const JPEG_QUALITY = 80;

// Only process known master photos (ignores favicon, READMEs, the responsive
// output folder, etc.). Add a filename here if you introduce a new image slot.
const MASTERS = [
  "hero-home",
  "lifestyle-support",
  "product-diabetic-shoes",
  "product-compression",
  "product-cgm",
  "patients-hero",
  "providers-hero",
  "about-story",
];

async function newer(src, out) {
  if (!existsSync(out)) return true;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return a.mtimeMs > b.mtimeMs;
}

async function processMaster(base) {
  const srcPath = join(SRC_DIR, base + ".jpg");
  if (!existsSync(srcPath)) {
    console.warn(`  ! skip ${base}: no master file (${base}.jpg)`);
    return { made: 0, skipped: 0, missing: true };
  }
  const input = await readFile(srcPath);
  const meta = await sharp(input).metadata();
  const targets = WIDTHS.filter((w) => w <= (meta.width || Infinity));
  if (targets.length === 0) targets.push(meta.width);

  let made = 0,
    skipped = 0;
  for (const w of targets) {
    const webpOut = join(OUT_DIR, `${base}-${w}.webp`);
    const jpgOut = join(OUT_DIR, `${base}-${w}.jpg`);

    if (await newer(srcPath, webpOut)) {
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toFile(webpOut);
      made++;
    } else skipped++;

    if (await newer(srcPath, jpgOut)) {
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toFile(jpgOut);
      made++;
    } else skipped++;
  }
  console.log(
    `  ✓ ${base}  [${targets.join(", ")}]  ${made} written, ${skipped} up-to-date`
  );
  return { made, skipped, missing: false };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // Warn about any unexpected master-looking files not in the MASTERS list.
  const present = (await readdir(SRC_DIR))
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => f.replace(/\.jpg$/, ""));
  for (const f of present) {
    if (!MASTERS.includes(f)) {
      console.warn(`  ? ${f}.jpg is not in the MASTERS list — not processed`);
    }
  }

  console.log("Generating responsive WebP + JPEG variants...");
  let totalMade = 0,
    totalSkipped = 0,
    missing = 0;
  for (const base of MASTERS) {
    const r = await processMaster(base);
    totalMade += r.made;
    totalSkipped += r.skipped;
    if (r.missing) missing++;
  }
  console.log(
    `\nDone. ${totalMade} files written, ${totalSkipped} already current` +
      (missing ? `, ${missing} master(s) missing` : "") +
      `\nOutput: assets/images/responsive/`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
