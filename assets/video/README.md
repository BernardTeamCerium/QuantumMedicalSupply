# Home Hero Video

The homepage hero shows a **video** in the top-right spot. Until a real video is
added, it gracefully displays the poster image (`assets/images/hero-home.jpg`),
so the page looks complete either way.

## How to add the video

1. Export your clip as **MP4 (H.264 + AAC)** — the broadly compatible format.
   Optionally also export a **WebM (VP9)** for smaller size on modern browsers.
2. Name the file(s) exactly and drop them in this folder:
   - `assets/video/hero.mp4`   (required)
   - `assets/video/hero.webm`  (optional, loads first if present)
3. Commit/upload them. The hero will autoplay the video on next load.

That's it — no HTML changes needed (the hero already points at these filenames).

## Recommended specs

- **Aspect ratio:** ~**4:5 (portrait)** to fill the hero frame without cropping
  — e.g. **1080 × 1350**. Other ratios work but get center-cropped to fit.
  (Want a wide 16:9 hero instead? Ask and we'll switch the frame shape.)
- **Length:** a short **8–20s loop** works best.
- **Audio:** none needed — the hero is **muted + autoplay + loop** (browsers
  require muted to autoplay). Keep file size small (**aim for < 8–10 MB**).
- **Content:** warm, on-brand lifestyle/clinical footage; the first frame should
  look good as a still (it shows while the video buffers).

## Notes

- Autoplay is muted and loops; it also respects users who prefer reduced motion.
- The poster (`assets/images/hero-home.jpg`) is the fallback for any device that
  can't play the video, so keep that image looking good too.
