# Carrystyle India — Proposed Project Structure

**Companion to:** `tech-stack.md`

Next.js App Router structure, organized so the 3D/animation code stays cleanly separated from standard UI — important on a project like this where the 3D layer will be touched constantly during the animation-tuning phase and shouldn't be tangled up with, e.g., the quote form or footer code.

```
carrystyle-website/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, global providers
│   ├── page.tsx                   # Main single-scroll page — composes all sections
│   ├── globals.css
│   └── api/
│       └── quote/
│           └── route.ts           # Quote form submission handler
│
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx               # Canvas root, camera, lighting rig
│   │   ├── BagModel.tsx            # Loaded GLB model + material logic
│   │   ├── BagScrollController.tsx # Master GSAP/ScrollTrigger timeline for the bag
│   │   └── SceneFallback.tsx       # Static image/video fallback (WebGL unsupported / reduced motion)
│   │
│   ├── sections/
│   │   ├── Loader.tsx              # Stage 0 — logo intro
│   │   ├── Hero.tsx                # Stage 1/2 wrapper — hosts <Scene /> + hero copy
│   │   ├── About.tsx
│   │   ├── ProductCategories.tsx
│   │   ├── Customization.tsx
│   │   ├── ManufacturingProcess.tsx
│   │   ├── WhyCarrystyle.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── QuoteForm.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/
│   │   ├── Nav.tsx
│   │   ├── Button.tsx
│   │   ├── ScrollCue.tsx
│   │   └── ScrollProgress.tsx      # optional persistent progress indicator
│   │
│   └── providers/
│       └── SmoothScrollProvider.tsx # Lenis setup + GSAP ticker sync (see tech-stack §3)
│
├── lib/
│   ├── animations/
│   │   ├── heroTimeline.ts         # GSAP timeline definitions, kept out of components
│   │   ├── sectionReveals.ts       # Shared fade/slide-up entrance animation helpers
│   │   └── scrollTriggerConfig.ts  # Shared ScrollTrigger defaults (scrub values, easing)
│   ├── content/
│   │   ├── products.ts             # Typed config for product categories (see requirements §5.3)
│   │   ├── testimonials.ts
│   │   └── siteCopy.ts
│   └── utils/
│       ├── useReducedMotion.ts     # Hook wrapping prefers-reduced-motion
│       └── useWebGLSupport.ts      # Feature-detection hook for the fallback path
│
├── public/
│   ├── models/
│   │   ├── bag-hero.glb            # Draco + KTX2 compressed, per asset-checklist §2
│   │   └── bag-hero-lowpoly.glb    # Mobile/fallback variant
│   ├── textures/
│   │   └── print-designs/          # Sample print textures for the material-swap moment
│   ├── video/
│   │   └── bag-fallback-loop.mp4   # Non-WebGL / reduced-motion fallback
│   └── images/
│       ├── portfolio/
│       ├── manufacturing/
│       └── logos/                  # Client logos for Testimonials section
│
├── styles/
│   └── (Tailwind config lives at root as tailwind.config.ts, if using Tailwind)
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Notes on This Structure

- **`components/3d/` is intentionally isolated** from `components/sections/` — `Hero.tsx` composes the 3D scene into the page, but the scene's internal logic (camera, model loading, scroll-linked timeline) doesn't leak into section components. This matters because the 3D layer will likely go through many iterations during the animation-tuning phase (see `animation-spec.md`'s suggested build order), and keeping it isolated means that tuning doesn't risk breaking unrelated sections.
- **`lib/animations/` holds timeline logic, not components** — keeps GSAP timeline definitions testable and reviewable on their own, separate from JSX/render logic.
- **`lib/content/` as typed config files** is the "hard-coded but structured" approach from `tech-stack.md` §7 — if a CMS is confirmed later, these files are the natural place to swap a config import for a CMS fetch, without restructuring the rest of the app.
- **Fallback assets live alongside primary assets** (`bag-fallback-loop.mp4` next to `bag-hero.glb`) rather than being an afterthought bolted on later — reinforces that the fallback path (requirements §5.5, §6.3) is a first-class part of the build, not a patch.
