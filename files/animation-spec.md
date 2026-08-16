# Carrystyle India — Animation & Scroll Choreography Spec

**Companion to:** `requirements.md`, `tech-stack.md`, `sitemap.md`

This is the detailed behavior spec for the hero's logo intro, the bag's scroll-driven transformation, and how the 3D scene hands off to standard content. Treat this as the shared reference between design and dev so "what should happen on scroll" isn't reinvented ad hoc during build.

---

## Stage 0 — Logo Intro / Loader

- On first load, the Carrystyle India logo animates in (draw-on, morph, or reveal — exact treatment is a design decision, but keep it under ~2 seconds so it never feels like an obstacle on repeat visits).
- Runs concurrently with real asset loading (3D model, textures, critical fonts) — the animation's timing should be at least partially tied to actual load progress, not a fixed fake timer, so slow connections don't finish the animation while the model is still loading.
- Minimum display floor (~1.5–2.5s) even on a fast connection, so the intro doesn't flash and feel broken.
- On completion: logo either fades out or transitions directly into the Stage 1 bag reveal — no jarring cut.
- Scroll should be **locked** during this stage (via Lenis `stop()`) so users can't scroll into content that isn't ready yet.

## Stage 1 — Hero Reveal (Bag Idle State)

- Bag scales/fades into frame center, ideally with a slight overshoot ease (GSAP `elastic.out` or similar) so it feels like a real object settling into place, not a flat fade.
- Once settled: subtle idle motion — slow auto-rotation and/or gentle vertical bob — communicates "this is a real, inspectable 3D object" before the user even starts scrolling.
- Scroll is unlocked here; a scroll-cue indicator appears (matches the "Scroll" prompt pattern from sarveio.in).
- Lighting/environment (via `@react-three/drei`'s `Environment` or custom rig) fades in alongside the model — avoid the bag popping in fully lit with no ambient buildup.

## Stage 2 — Scroll-Linked Transformation (the core interaction)

This is the section that needs the most prototyping time before the rest of the site is built around it — validate this in isolation first.

- Driven by a single **master GSAP timeline** with `ScrollTrigger.scrub` (not `scrub: true` blindly — tune a small numeric scrub value, e.g. `0.5–1`, so the animation trails the scroll slightly for a smoother feel rather than rigid 1:1 tracking) synced to Lenis scroll position.
- As the user scrolls through the hero/early sections, the bag:
  - **Rotates** to reveal different faces/angles in sync with scroll position.
  - **Moves/repositions** within the viewport (e.g., drifts from center to a side position) to make room for incoming text/content.
  - **Swaps material/texture** at a defined scroll checkpoint to visually "gain" a custom print — this is the direct tie-in to the Customization section in `sitemap.md` §4, and is worth treating as a signature moment, not a throwaway detail.
  - **Scales** down as it transitions from "hero subject" to "supporting element" for later sections.
- Content (headlines, feature blocks) should feel like it's emerging *because of* the scroll-linked bag motion — e.g., text elements pinned/revealed at the same scroll checkpoints that trigger bag state changes, so the two feel choreographed together rather than like two independent animations running in parallel.
- **Camera** should also move on this timeline (dolly/orbit), not just the object — a moving camera reads as much more cinematic than a static camera watching a spinning object, and is the technique that makes refractweb.com's own hero object feel expensive.

## Stage 3 — Section Pinning

- Individual sections (Products, Customization, Manufacturing Process) may use `ScrollTrigger.pin` to hold a section in place while sub-content scrubs through (e.g., pin the Product Categories section while individual bag category cards cycle through).
- Use pinning selectively — pinning every section back-to-back makes a page feel slow to get through. Reserve it for sections where the payoff justifies holding the user in place (Customization and Products are the strongest candidates; Testimonials/Footer should scroll normally).

## Stage 4 — 3D Scene Handoff (needs a decision during prototyping)

Once the visitor scrolls past the product/customization sections, three options — evaluate feasibility/performance during the prototype phase and pick one:

1. **Full unmount:** the 3D canvas unmounts entirely once scrolled past, and remaining sections (Manufacturing, USPs, Portfolio, Testimonials, Quote form) are standard DOM/CSS content with GSAP fade/slide-up entrance animations. *(Simplest, best for performance — recommended default unless design strongly wants the bag present throughout.)*
2. **Persistent background element:** the bag continues to exist at low opacity/small scale as a subtle background presence for the rest of the page. Higher performance cost for a subtle payoff — only worth it if user testing shows visitors miss having it there.
3. **Re-emergence:** the bag disappears after Stage 2 and re-appears briefly for a specific later moment (e.g., a final "your bag, your brand" close before the Quote section). Highest production complexity; strongest emotional payoff if done well. Treat as a stretch goal, not a v1 commitment.

## Micro-interactions (polish layer, build after core choreography works)

- Magnetic hover effect on primary buttons (matches the trend both reference sites lean into).
- Nav link underline/reveal animations on hover.
- Custom cursor *(optional — evaluate whether it fits Carrystyle's brand tone; refractweb.com's aesthetic leans into this, but it should feel intentional here, not borrowed)*.

## Accessibility & Reduced Motion (non-negotiable — ties to requirements §5.5)

- On `prefers-reduced-motion: reduce`: disable scroll-scrubbing and pinning entirely. Serve a static hero image (or the fallback video described in `tech-stack.md` §11), with normal-speed native scroll and simple fade-in entrance animations for content. This isn't a stripped-down "lesser" version to feel bad about shipping — it's a legitimate, fully-designed alternative experience.
- Ensure focus states and tab order remain logical even when the visual layout is being manipulated by scroll position.

## Performance Guardrails (ties to requirements §6.1 and tech-stack §11)

- Pause the render loop (`invalidateFrameloop` / conditional rendering) when the canvas is scrolled out of the viewport, using an `IntersectionObserver`.
- Cap `devicePixelRatio` at ~1.5–2 rather than using the raw device value — full DPR on high-density mobile screens is a common, easily-avoided performance killer.
- Lazy-load the R3F/three.js bundle via `next/dynamic` so it's not part of the initial JS payload for users who, e.g., land directly on a deep link or have JS-disabled crawlers hitting the page.
- Build the Lenis + ScrollTrigger sync (see `tech-stack.md` §3) and test it with the simplest possible placeholder object (a cube) before swapping in the real bag model — isolates scroll-sync bugs from model/asset bugs.

## Suggested Build Order

1. Lenis + ScrollTrigger sync, proven with a placeholder cube.
2. Stage 1 hero reveal + idle state with a placeholder or low-poly bag.
3. Stage 2 core scroll transformation timeline (rotation, camera move, position, scale) with placeholder geometry.
4. Swap in the final optimized bag model + material/texture swap moment.
5. Stage 0 logo intro, wired to real load progress.
6. Stage 3 section pinning for Products/Customization.
7. Stage 4 handoff decision + remaining sections' entrance animations.
8. Reduced-motion fallback path.
9. Mobile-specific tuning pass (separate from "responsive," this is its own testing pass — see requirements §5.4).
10. Performance pass against the budgets in requirements §6.1.
