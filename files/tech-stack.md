# Carrystyle India — Tech Stack

**Companion to:** `requirements.md`, `animation-spec.md`

This stack mirrors what both reference sites are built on (Next.js + React + GSAP is explicitly listed in refractweb.com's own tech marquee), so it's a proven combination for exactly this kind of experience rather than an experimental choice.

---

## 1. Core Framework

- **Next.js (React, App Router)** — server-side rendering / static generation so all real content is crawlable (see requirements 6.2), plus clean code-splitting so the 3D bundle only loads where it's needed.
- **TypeScript** — worth it on a project with this much animation/state choreography; catches a large class of "scroll trigger fired on the wrong element" bugs at compile time.

## 2. 3D Rendering

- **three.js** — the rendering engine itself.
- **@react-three/fiber (R3F)** — React renderer for three.js. Strongly recommended over vanilla three.js here: it lets the 3D scene live inside the same component tree as the rest of the site, which matters a lot when the bag needs to hand off to/from regular DOM content mid-scroll.
- **@react-three/drei** — helper library on top of R3F (loaders, camera controls, environment/lighting helpers, performance helpers like `<Detailed>` for LOD). Saves rebuilding a lot of common scene-setup boilerplate.
- **@react-three/postprocessing** *(optional, evaluate during prototyping)* — for bloom/depth-of-field polish on the hero bag if the design calls for it. Adds render cost, so only include if the visual payoff is worth the performance budget.

## 3. Animation & Scroll

- **GSAP** (core) + **ScrollTrigger** plugin — drives the scroll-linked transformation timeline (bag rotation, camera moves, section pinning, content reveal).
- **Lenis** — smooth-scroll library, sets the actual scroll physics/easing the user feels.
- **Critical integration detail:** Lenis and ScrollTrigger must be explicitly synced — Lenis needs to drive GSAP's ticker (or vice versa) so ScrollTrigger's scroll position calculations match what Lenis is actually rendering. This is the single most common source of janky/desynced scroll-3D bugs in this exact stack combination, and should be one of the first things built and tested in isolation, before any real content is added.

## 4. 3D Asset Pipeline

- **Blender** — modeling/UV work for the bag (matches refractweb's own listed tooling).
- **glTF/GLB** export format — the standard for web-delivered 3D, supported natively by three.js loaders.
- **Draco compression** (geometry) + **KTX2/Basis Universal** (textures) — required to hit the file-size budget in `requirements.md` §6.1. Use `gltf-transform` (CLI) to apply both in one optimization pass.
- **gltfjsx** *(optional)* — auto-generates a typed R3F component from a GLB file; speeds up wiring the model into React considerably.

## 5. Styling

- **Tailwind CSS** — fast to build consistent, responsive UI around the 3D canvas without fighting a separate CSS architecture. *(If the client/team has a different preference — CSS Modules, styled-components — that's a fine substitution; flagging Tailwind as the default recommendation only.)*

## 6. Forms / Backend for Quote Requests

- Options, pending the "Open Question" in `requirements.md` §9.5:
  - **Formspree / Resend / a small serverless API route** for a low-complexity email-based flow.
  - **CMS-integrated form** (see §7) if a CMS is already in play.
- Whichever is chosen, keep it decoupled from the 3D/animation code — form logic should not live inside animation components.

## 7. Content Management (pending decision — see requirements §5.3)

If the client needs non-developer content editing:
- **Sanity** or **Contentful** — both integrate cleanly with Next.js, support image optimization pipelines, and won't fight the SSR/SEO requirement.

If a hard-coded/config-driven site is acceptable for v1:
- Store copy/content in typed JSON or TS config files — simpler, faster to ship, easy to migrate to a CMS later if needed.

## 8. Hosting & Deployment

- **Vercel** — first choice, given the Next.js pairing and zero-config deployment. Confirm against client's existing hosting/DNS situation.

## 9. Analytics & Monitoring

- **GA4** (or client preference) for standard analytics.
- **Vercel Analytics / Speed Insights** *(optional)* — useful specifically for catching real-world performance regressions on a 3D-heavy site, where lab testing alone can miss device-specific slowdowns.

## 10. Package List (initial — versions to be pinned at project start)

```
next
react / react-dom
typescript
three
@react-three/fiber
@react-three/drei
gsap
lenis
tailwindcss
gltf-transform (dev/build tooling, not shipped to client)
```

## 11. Fallback Strategy (ties to requirements §6.3)

- Feature-detect WebGL2 support on load.
- If unsupported (or `prefers-reduced-motion` is set — see requirements §5.5), serve a static hero image or a short looping video of the bag instead of mounting the live 3D scene. This is effectively the same technique refractweb.com itself uses for its own hero object (pre-rendered video rather than live WebGL) — worth considering even as the *primary* approach for lower-end devices generally, not just as an accessibility fallback, since it removes an entire class of performance risk on mobile.
