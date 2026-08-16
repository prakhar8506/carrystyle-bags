# Carrystyle India — Sitemap & Information Architecture

**Companion to:** `requirements.md`

This is a single continuous scroll experience (like sarveio.in and refractweb.com), not a traditional multi-page site with a nav bar jumping between separate pages. Section order below is the narrative order — it's designed to build the case ("we manufacture at scale" → "here's what we make" → "here's how customization works" → "here's proof" → "get a quote") rather than just listing pages.

*Placeholder content is marked clearly — needs confirmation from the client (see `requirements.md` §9).*

---

## 0. Loader / Logo Intro
- Carrystyle India logo animation, tied to real asset-loading progress.
- Minimum display time even if assets load instantly (avoid a jarring flash) — target ~1.5–2.5s.

## 1. Hero — The Bag
- 3D bag, headline, one-line value proposition.
- *Draft headline direction (placeholder, needs client input): "Bags, built for your brand." / "From factory floor to your logo — bags made to move."*
- Subtle scroll-cue (matches the "Scroll" indicator pattern used on sarveio.in).

## 2. About Carrystyle India
- Brief brand story: years in operation, manufacturing base/location, scale of operation.
- **Placeholder — confirm with client:** founding year, factory location(s), team size, production capacity (units/month), any certifications (ISO, export licenses, etc.).

## 3. What We Manufacture (Product Categories)
- Grid/showcase of bag categories.
- **Placeholder — confirm actual catalog.** Common categories in this industry, to validate against the real one:
  - Tote bags
  - Non-woven bags
  - Jute bags
  - Drawstring bags
  - Laptop / corporate bags
  - Promotional / event bags
  - Packaging pouches
- Each category ideally links to (or expands into) more detail — quantity, material options, use cases.

## 4. Custom Printing & Customization
- This is the section that should make the "hand us a design, get real bags back" promise feel concrete.
- **Placeholder — confirm actual techniques offered:** screen printing, digital/DTG printing, embroidery, heat transfer, etc.
- Visual before/after or design-to-product showcase — plain bag → printed bag, ideally using real client work.
- This section is a strong candidate for tying directly into the 3D bag's material/texture swap (see `animation-spec.md` Stage 2) — the same 3D object visibly gains a printed design as the visitor scrolls into this section.

## 5. Manufacturing Process & Capacity
- How an order actually happens: design → sampling → production → quality check → delivery.
- Builds B2B trust — bulk buyers want to see there's a real process, not a garage operation.
- **Placeholder — confirm actual step count/process**, and whether factory photos/video exist to use here.

## 6. Why Carrystyle (USPs)
- Short, scannable differentiators. **Placeholder examples pending client confirmation:**
  - Manufacturing scale / turnaround time
  - Material quality / sustainability (if applicable — e.g., jute/non-woven eco-positioning)
  - Minimum order quantity flexibility
  - In-house design support
  - Pricing competitiveness for bulk orders

## 7. Portfolio / Past Work Gallery
- Real photos of completed custom orders — the single most persuasive section for a new prospective client evaluating capability.
- **Needs client-supplied photography** (see `asset-checklist.md`).

## 8. Clients / Testimonials
- Logos of past corporate clients (with permission) and/or short testimonial quotes.
- **Needs client-supplied names/logos/quotes** — do not fabricate.

## 9. Get a Quote
- Form per `requirements.md` §5.2.
- Should be reachable via a persistent nav CTA, not only at the bottom of the page — bulk buyers often want to inquire immediately without reading the full story.

## 10. Footer
- Nav links, contact details (phone/email/address), social links, legal (privacy/terms if applicable).

---

## Persistent Elements (present across the whole scroll, not their own section)
- **Top navigation:** logo (returns to top), jump-links to key sections (Products, Customization, Contact), a persistent "Get a Quote" button.
- **Progress indicator** *(optional, nice-to-have)*: a subtle scroll-progress marker, common on this style of site, helps orient visitors during a long single-page scroll.

## Phase 2 / Future Consideration (not in v1 scope per `requirements.md` §7)
- Individual product detail pages per bag category
- Bulk order calculator / instant quote estimator
- Blog / sustainability journal
