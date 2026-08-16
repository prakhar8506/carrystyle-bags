# Carrystyle India — Asset Checklist

**Companion to:** `requirements.md`, `tech-stack.md`

Everything below is needed from the client (or needs to be commissioned, e.g. 3D modeling) before — or early in — the build, so development isn't blocked waiting on assets mid-project. Use this as the literal request list to send to Carrystyle India.

---

## 1. Brand Assets
- [ ] Logo — vector format (SVG or AI), including any variant marks (icon-only, wordmark-only, dark/light versions).
- [ ] Brand color palette (hex codes) — if not formally defined, this project may need to define one; flag which is the case.
- [ ] Approved typography / font files (or confirm licensing is open to choose new web fonts as part of this project).
- [ ] Tagline or positioning line, if one exists.

## 2. 3D Bag Model
- [ ] **Reference photography** of the actual bag(s) to be modeled — multiple angles (front, back, side, top, interior if relevant), ideally with a scale reference and in good lighting.
- [ ] Confirm **which specific bag** should be the hero model — if Carrystyle makes many types, pick the one that best represents the brand (likely the most commonly custom-printed style, e.g. a tote).
- [ ] Real-world **dimensions** and material notes (canvas, jute, non-woven, etc. — affects how the 3D material/shader should look).
- [ ] **3D modeling deliverable spec** (for whoever builds the model — in-house, freelancer, or client's existing 3D asset if one exists):
  - Format: **GLB** (glTF binary)
  - Target: **30k–60k triangles** for the hero model (adjust based on visual complexity needed — a bag with stitching/fabric detail may need to sit toward the higher end)
  - Clean, non-overlapping **UV unwrap** — required for the material/print-texture swap described in `animation-spec.md` Stage 2
  - PBR texture set: base color, normal map, roughness map, and AO (ambient occlusion) — baked and exported at a resolution to be compressed via KTX2 (see `tech-stack.md` §4)
  - A **second, decimated low-poly version** (or confirm the pipeline will auto-generate one) for the mobile/fallback path
  - If the bag needs to visually "gain" a print mid-animation, the model/UVs need to support a **texture swap or material variant**, not just a static bake

## 3. Sample Print Designs
- [ ] 3–5 real examples of past custom print work (actual client designs, with permission to display, or Carrystyle's own sample designs) — needed for:
  - The Customization section showcase (`sitemap.md` §4)
  - The texture-swap moment in the 3D animation (`animation-spec.md` Stage 2)

## 4. Copy / Written Content
- [ ] About Carrystyle India — company story, founding year, location(s), scale.
- [ ] Product category names + short descriptions (per `sitemap.md` §3 — confirm the real catalog against the placeholder list).
- [ ] Customization/printing techniques offered, with any relevant specs (e.g. minimum quantities per technique).
- [ ] Manufacturing process steps (design → sample → production → QC → delivery, or whatever the real flow is).
- [ ] USP bullet points (`sitemap.md` §6).
- [ ] Testimonial quotes, with permission to publish, and attribution (name/company).
- [ ] Certifications, if any (ISO, export licenses, sustainability certifications).
- [ ] Contact details: phone, email, physical address, business hours if relevant.

## 5. Photography / Video
- [ ] Product photography — clean shots of finished bags (multiple categories), used across Product and Portfolio sections.
- [ ] Manufacturing/factory photography or video — floor shots, machinery, production in progress. High-value for the Manufacturing Process section and for B2B trust generally.
- [ ] Portfolio photography — real completed custom orders (with permission), ideally showing the bag in context (branded event, retail use, etc.) rather than just product-shot style.
- [ ] Client logos (with permission) for the Testimonials/Clients section.

## 6. Legal / Compliance
- [ ] Privacy policy text (required if the quote form collects personal data) — confirm if Carrystyle has existing legal text or needs this drafted.
- [ ] Terms of service, if applicable to the quote/order process.

## 7. Accounts / Access (technical, not creative — but needed early)
- [ ] Domain registrar access or DNS management access, for eventual hosting setup.
- [ ] Preferred form-backend/email destination for quote submissions (see `requirements.md` §5.2 and §9.5).
- [ ] Analytics preference (GA4 property, or confirm one needs to be created).

---

## Priority Order (what actually blocks development start)

**Blocking — needed before build starts:**
- Logo + brand colors (Stage 0 can't be designed without this)
- Confirmed bag reference photography + which bag is the hero model (3D modeling is on the critical path and takes real time)
- Confirmed product catalog and customization techniques (affects sitemap content, not just copy)

**Needed during build, not before:**
- Full copy for every section
- Photography/video for Portfolio and Manufacturing sections
- Testimonials/client logos
- Legal text

**Needed before launch, not before build:**
- Hosting/DNS access
- Analytics setup
