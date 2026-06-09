# miguelborges.dev

Personal portfolio for Miguel Borges — AI Engineer based in Lisbon, Portugal.  
Single-page, statically exported, zero JS animation libraries.

Live: [miguelborges.dev](https://miguelborges.dev)

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, `output: 'export'`) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Fonts | Instrument Serif (display) · Geist (body) · JetBrains Mono (accents) |
| Animations | CSS keyframes + IntersectionObserver — no framer-motion, no GSAP |
| Hosting | Cloudflare Pages (static deploy) |

## Animation system

All entry animations are pure CSS. Stagger delays are injected via a `--d` CSS custom property set inline on each element, avoiding JS-computed timelines entirely:

```tsx
// In Hero.tsx
const d = (ms: number): CSSProperties => ({ ['--d' as any]: `${ms}ms` });

<div className="hero-enter" style={d(500)}>...</div>
```

```css
/* In globals.css */
.hero-enter {
  opacity: 0;
  transform: translateY(12px);
  animation: fade-up var(--dur-enter, 900ms) var(--ease-expo-out) var(--d, 0ms) forwards;
}
```

Section reveals use `Reveal.tsx` — an IntersectionObserver wrapper that flips a class when the element enters the viewport. The default state is **always visible**; the animation is layered on top and degrades gracefully if JS doesn't run.

`prefers-reduced-motion: reduce` disables all animations at the CSS layer — no JS gating needed.

## Design tokens

Defined in `tailwind.config.ts`.

| Token | Value | Used for |
|-------|-------|---------|
| `ink` | `#0A0A0A` | Background |
| `bone` | `#F5F0E8` | Primary text |
| `muted` | `#A8A29E` | Secondary text |
| `sage` | `#84C7AE` | Accent — links, status, highlights (max 3× per viewport) |
| `hairline` | `#1F1F1F` | Borders |

Contrast ratios: `bone/ink` = 15.4:1 · `sage/ink` = 8.2:1 (both WCAG AAA).

## Project structure

```
app/
  layout.tsx           Root layout — fonts, metadata, globals
  page.tsx             Section composition (no logic, just ordering)
  globals.css          Design tokens, keyframes, reduced-motion overrides

components/
  Hero.tsx             Name + cutout photo + availability info
  Work.tsx             Work entries with year, status, stack, and description
  WorkCard.tsx         Individual card — status badge, stack pills, optional link
  CodeBlock.tsx        Syntax block with a muted (non-rainbow) palette
  Stack.tsx            3×2 bento grid — tools: Claude, n8n, Supabase, Next, CF, TS
  Services.tsx         Service list with hover-swap to concrete "e.g." examples
  About.tsx            Long-form copy + facts rail (location, availability, focus)
  Contact.tsx          Formspree-backed form — client-validated, success state
  Marquee.tsx          Tech-logo strip, paused on hover, hidden on reduced-motion
  StatusBar.tsx        Availability badge + build date
  Nav.tsx              Fixed top nav — transparent by default, blur-on-scroll
  Footer.tsx           © + back-to-top
  Reveal.tsx           IntersectionObserver fade-up wrapper
  SectionLabel.tsx     Mono small-caps label + horizontal hairline

public/
  favicon.svg          MB monogram
  miguel-cutout.png    Hero photo cutout
  screenshots/         Work screenshots (add thefacio.png, docflow.png here)
```

## Adding work screenshots

Drop a screenshot into `public/screenshots/` and add `image: '/screenshots/<name>.png'` to the matching entry in `components/Work.tsx`. The `WorkCard` handles the rest.

## Contact form

The form posts to Formspree (`/f/xpqnvkbe`). If you fork this, replace the endpoint in `components/Contact.tsx` with your own Formspree form ID.

## Develop

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build & deploy

```bash
npm run build     # outputs static site to ./out
```

Deploy `./out` to Cloudflare Pages:
- Dashboard: Pages → Create application → Direct upload → select `./out`
- Git integration: set build command `npm run build`, output directory `out`

---

Built by [Miguel Borges](https://miguelborges.dev) · [hello@miguelborges.dev](mailto:hello@miguelborges.dev)
