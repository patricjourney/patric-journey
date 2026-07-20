# Patric Journey v0.1

First production-style React implementation of the approved Welcome Home design.

## Included
- Responsive living hero
- Time-aware greeting
- Live countdown to 1 December 2026
- Parallax motion
- Animated multi-stroke SVG signature component
- Real Thailand 2026 route and summary data
- Bottom navigation shell
- Static Vite build suitable for Cloudflare Pages

## Add the final portrait
Place Patric's approved double-exposure image here:

`public/hero-patric.jpg`

The app includes a gradient fallback so it still renders before the final image is added.

## Exact signature
`src/components/SignatureAnimation.tsx` already animates multiple SVG strokes.
Replace the placeholder path data with traced SVG paths from Patric's original signature to preserve the exact handwriting.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
