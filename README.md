# Patric Journey

A premium digital travel journal. Every journey becomes a story.

## Current build (v1 — scroll prototype)

Single-file static site, no build step required.

- **Welcome Home** — authentic double-exposure portrait, live countdown to the next journey, time-aware greeting
- **Signature Ceremony** — real handwritten signature, traced from the original artwork into vector strokes (skeletonized + graph-traced, left-to-right stroke order), animated with a synchronized pen-tip light
- **World Journey Ceremony** — real 3D globe (Three.js), NASA night-lights texture, live flight path drawn from real GPS coordinates for the current Southeast Asia Grand Tour 2026 route

## Structure

```
index.html          — the entire experience (HTML/CSS/JS, ES module imports for Three.js via CDN)
assets/
  hero-portrait.jpg  — Welcome Home background
  earth-lights.jpg   — globe night-lights texture
  earth-specular.jpg — globe land/ocean map
  earth-normal.jpg   — globe relief map
  signature.svg      — standalone vector signature (traced, gold stroke)
```

## Deploy

Cloudflare Pages: no build command needed. Root directory `/`, output directory `/`.

## Previous version

The earlier React/Vite "Living Hero v0.3" build (bottom nav, PWA manifest, service worker,
placeholder signature) is preserved at git tag `backup-v0.3-living-hero` if any of that
functionality needs to be ported forward.

Designed by Patric Bize · Built with Claude.
