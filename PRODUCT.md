# Product

## Register

brand

This is a single-page portfolio. Design IS the product — the site itself is the proof of work.

## Users

Founders, CTOs, and tech leads who land here from a cold-email reply, a LinkedIn intro, or a referral. They are evaluating Miguel Borges as a potential contract hire on the AI / agents layer of their product. They decide in ~60 seconds whether to write back or close the tab. Reading context: laptop or phone, between meetings, skim mode. They are not the warm bottom-of-funnel; they are a sceptical decision-maker who has seen a hundred "AI engineer" portfolios this month.

## Product Purpose

Convert qualified inbound interest into a discovery call. The site has to:

1. Signal in the first viewport that Miguel ships production AI systems, not prototypes
2. Show concrete proof — named projects with status (live, private, in development), real stack, real responsibilities
3. Make contact a 5-second action, not a buried form

Success = founder/CTO reads the Hero, scrolls through Selected Work, lands at the form, sends a message. Anti-success = founder/CTO bounces because the site reads as templated.

## Brand Personality

Senior. Honest. Ships. The voice across the site is "I don't pitch — I deliver." No marketing fluff. No "transform your workflow." Specific verbs, specific numbers, named clients (when possible), named tools, named outcomes.

Three words: **direct · brooding · alive**.

- **direct** — every label and tagline says what the thing literally is
- **brooding** — dark UI, calm typography, restraint everywhere except where intensity is intentional
- **alive** — Hero is a statement moment; pulsing status dots and the in-development progress strip signal real movement, not stock template

## Anti-references

What this is explicitly NOT:

- ❌ Generic SaaS portfolio templates (Awwwards-shaped, Framer-marketplace-shaped). If you can guess the section order from the category alone, it failed
- ❌ "Trusted by" logo strips. No carousel of social proof
- ❌ Animated counters, testimonial slides, hero-metric tiles (big number / small label / supporting stats)
- ❌ Three-column "What I do" grids with stock icons
- ❌ Stock photography, AI-generated abstract shapes, gradient meshes as backgrounds
- ❌ Purple/blue tech-startup gradients, glassmorphism, glow as decoration anywhere except Hero
- ❌ "Hi, I'm Miguel" hero copy
- ❌ Drop shadows on cards (subtle hairline border instead)
- ❌ Emoji and neon green outside the Hero
- ❌ Tiny tracked uppercase eyebrow on every section as default scaffolding

## Design Principles

1. **The Hero shouts; the rest works.** The Hero is a statement (massive name, fluorescent green, portrait, glow). Below the fold, the design DIALS DOWN — the Hero earns the intensity because the rest is calm.
2. **Specific over generic.** Real project names (TheFacio, DocFlow, Mini-Miguel, Almi). Real status strings (LIVE · ACTIVE, PRIVATE, LOCAL · BETA, IN DEVELOPMENT). No "Project Alpha", no "Coming soon" without a date.
3. **Honesty in hierarchy.** The visual weight of each work card matches its real status. TheFacio (live) is brightest. Almi (in development) is most recessed with a dashed border. The page tells you what's real.
4. **No JS-required reveals.** Content is always visible by default. CSS animations layer on top with `animation-fill-mode: backwards`. If JS fails, slow, or is blocked, every section still renders fully.
5. **Anti-slop discipline, with one allowed exception.** Strict refusal of the tells (gradient text, neon, glassmorphism, emoji as decoration, drop shadows on cards) everywhere except the Hero, where the intensity is the point. The contrast is what makes the Hero land.

## Accessibility & Inclusion

- WCAG AAA contrast on body text (`bone #F5F0E8` on `ink #0A0A0A` = 15.4:1)
- WCAG AAA on accent links (`sage #84C7AE` on `ink` = 8.2:1)
- `prefers-reduced-motion: reduce` disables every CSS animation (Hero entrance, pulse dots, progress strip, section reveals). Verified via CSS media-query branches; no JS gating.
- All interactive elements keyboard-reachable; form fields have visible focus state (sage-coloured underline)
- Photo cutout has explicit `alt="Miguel Borges"`; SCROLL indicator is `aria-hidden` (decorative)
- Form fields have visible labels (not just placeholders)
