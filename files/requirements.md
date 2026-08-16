# Carrystyle India — Website Requirements

**Document status:** Draft v1 — for client + dev team review before build starts
**Project type:** Marketing / brand website with an interactive 3D hero experience
**Reference sites:** refractweb.com (animation quality bar), sarveio.in (author's own prior 3D + scroll build)

---

## 1. Project Overview

Carrystyle India manufactures bags and offers custom printing/branding on bags for corporate and bulk customers. The website's job is to do two things at once: **look like a company capable of premium, large-scale manufacturing**, and **make the custom-printing capability feel tangible** — a visitor should understand, within seconds of scrolling, that they can hand Carrystyle a design and get real bags back.

The centerpiece is a 3D bag on the landing page that the visitor doesn't just look at — it **transforms into the website itself** as they scroll. This is the single most important interaction on the site and should get the majority of design/dev attention.

---

## 2. Goals

1. Communicate manufacturing scale and quality credibility (not a small print shop — a real factory/production capability).
2. Make the custom-printing process visually understandable (what can be printed, on what bag types, how the process works).
3. Generate qualified inquiries/quote requests from both bulk B2B buyers and corporate/custom-order customers.
4. Be memorable and shareable — the kind of site that gets sent around internally at a company deciding on a bag supplier.
5. Stay fast and usable despite the 3D content — this cannot become a site that's beautiful but frustrating to load on a mid-range phone.

---

## 3. Target Audience

- **Bulk/wholesale buyers** — procurement teams at retailers, event organizers, exporters looking for a manufacturing partner.
- **Corporate custom-order buyers** — companies wanting branded tote/conference/gift bags, ordering in the hundreds-to-thousands range.
- **Smaller custom-print customers** — boutique brands or individuals wanting smaller custom runs.

*(Confirm with client: what's the actual split of business today — is bulk manufacturing or custom printing the primary revenue driver? This should influence which gets more visual weight on the homepage.)*

---

## 4. Core Experience Concept

1. **Intro / Loader:** Carrystyle India logo animation plays while assets (3D model, textures, fonts) load in the background.
2. **Hero reveal:** The 3D bag appears center-stage — a brief "idle" moment (subtle rotation/breathing motion) so the visitor registers it as a real, inspectable object.
3. **Scroll-driven transformation:** As the visitor scrolls, the bag responds continuously — rotating, repositioning, changing material/print texture — while site content (headlines, feature blocks, sections) emerges around and through that motion. The bag doesn't just sit beside the content; scrolling *is* what drives its transformation, so the 3D object and the page content feel like one continuous piece, not a hero banner followed by a separate normal website.
4. **Content sections unfold** in the established narrative order (see `sitemap.md`) as the bag either recedes into a smaller persistent element, hands off to a 2D-scroll experience, or continues reacting subtly in the background — final approach to be decided during the animation prototyping phase (see `animation-spec.md`, Stage 4).
5. **Conversion point:** A clear, low-friction path to request a quote or start a custom order, reachable well before the very bottom of the page (don't make visitors scroll through everything just to find "contact").

---

## 5. Functional Requirements

### 5.1 Sections (see `sitemap.md` for full detail)
- Loader / logo intro
- Hero with 3D bag
- About Carrystyle India
- Product categories (bag types manufactured)
- Custom printing / customization capability
- Manufacturing process & capacity
- Why Carrystyle (USPs)
- Portfolio / past custom work gallery
- Client logos / testimonials
- Get a Quote (form)
- Footer

### 5.2 Get-a-Quote Form
- Fields: name, company (optional), email, phone, bag type/category (dropdown), estimated quantity, custom print needed (yes/no), design file upload (optional), message.
- Submits to email / CRM / form backend — **confirm with client which they already use (Google Sheets, email, HubSpot, etc.) or whether one needs to be set up.**
- Basic spam protection (honeypot field or lightweight captcha — avoid heavy reCAPTCHA UI that fights the site's premium feel).

### 5.3 Content Management
- **Open question for client:** does content (product categories, gallery images, testimonials) need to be editable without a developer (i.e., a CMS), or is a hard-coded/config-driven site acceptable for v1? This materially changes the tech stack (see `tech-stack.md`) and should be settled before build starts.

### 5.4 Responsiveness
- Full experience must degrade gracefully across desktop, tablet, and mobile — not just "shrink," but genuinely re-choreographed where needed (e.g., camera framing, pin distances, and interaction model may all need mobile-specific values). This is the same problem solved for the phone model on sarveio.in and the approach should carry over directly.
- Touch-based scroll must feel as smooth as desktop wheel scroll — Lenis + ScrollTrigger config needs explicit mobile testing, not just a responsive breakpoint check.

### 5.5 Accessibility & Motion Preference
- Respect `prefers-reduced-motion`: visitors who've set this at the OS level should get a version with minimal/no scroll-jacking or parallax — static imagery and standard scroll instead. This isn't optional polish; treat it as a requirement.
- All interactive elements (nav, form, buttons) must remain keyboard-navigable even though the hero is a canvas-based experience.

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Target **60fps on desktop**, **30fps minimum on mid-range mobile** for the 3D scene.
- Initial meaningful content (logo, first section text) visible well before the full 3D scene finishes loading — never show a blank white screen while a multi-MB model downloads.
- 3D model file size budget: **under ~3–5MB compressed** (Draco geometry compression + KTX2/Basis texture compression) — see `asset-checklist.md` for full spec.
- Lighthouse performance score target: **75+ on mobile, 90+ on desktop** (heavy 3D sites rarely hit 90+ on mobile — that's expected and fine, but shouldn't be ignored).

### 6.2 SEO
- WebGL/canvas content is invisible to search engines — all meaningful copy (headings, product info, about text) must exist as real DOM/HTML content, not baked into the 3D scene or canvas-rendered text.
- Use server-side rendering or static generation (Next.js) so crawlers get full HTML, not a JS-only shell.
- Standard meta tags, Open Graph image, sitemap.xml, robots.txt.

### 6.3 Browser & Device Support
- Latest 2 versions of Chrome, Safari, Firefox, Edge (desktop + mobile).
- Explicit fallback required for browsers/devices without solid WebGL2 support — a static hero image/video loop, not a broken canvas.

### 6.4 Hosting
- Recommended: Vercel (pairs naturally with Next.js, matches the stack refractweb.com itself is built on) — **confirm with client if they have an existing hosting preference or domain/DNS constraints.**

---

## 7. Out of Scope (v1)

- E-commerce checkout / payment processing (quote-request flow only, unless client confirms this is needed)
- User accounts / login
- Multi-language support (flag if needed — not assumed here)
- Blog/CMS-driven articles (unless folded into the CMS decision in 5.3)

---

## 8. Deliverables

- Fully responsive production website matching the sitemap and animation spec
- 3D bag model (or client-supplied model, per `asset-checklist.md`) integrated and optimized
- Logo intro animation
- Get-a-Quote form wired to an agreed backend/destination
- Basic analytics integration (GA4 or client's preference)
- Deployment to agreed hosting

---

## 9. Open Questions for Client

1. Confirm actual product catalog (bag types manufactured) — placeholders are used in `sitemap.md` pending this.
2. Confirm printing techniques offered (screen printing, digital/DTG, embroidery, heat transfer, etc.) for the customization section.
3. Confirm whether bulk manufacturing or custom printing is the primary business driver — affects homepage emphasis.
4. Confirm CMS requirement (5.3) — hard-coded vs. editable content.
5. Confirm quote-form backend/destination.
6. Confirm hosting preference.
7. Provide (or approve budget for) 3D modeling of the hero bag — see `asset-checklist.md` for what's needed either way.
8. Provide brand guidelines (logo files, color palette, typography) if they exist, or confirm these need to be defined as part of this project.
