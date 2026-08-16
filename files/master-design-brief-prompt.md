# Master Design & Build Prompt — Carrystyle India Website

**How to use this document:** This is written as a single, self-contained prompt/brief — paste it whole into a design tool, an AI website-builder, or hand it to a design/dev agency as-is. It assumes the reader has no other context. It should be read alongside (not instead of) `requirements.md`, `sitemap.md`, `animation-spec.md`, `tech-stack.md`, `asset-checklist.md`, and `folder-structure.md`, which cover technical implementation in more depth than this document does.

---

## The Prompt

You are designing and building the marketing website for **Carrystyle India**, a bag manufacturer that produces bags at scale and offers custom printing/branding for corporate and bulk customers. The site's job is to make visitors believe two things within the first 30 seconds: this is a real, capable manufacturer — not a small print shop — and their custom design can become a real, beautifully finished physical bag.

The site should be built to the visual and motion quality bar of **refractweb.com** — its opening sequence, its confident typography, its scroll-driven storytelling — but the aesthetic itself should be Carrystyle's own, built from the brand identity below, not a copy of refractweb's dark-studio look.

---

### 1. Brand Foundation (extracted from provided logo + product sample)

**Logo:** A shopping-bag line icon containing the letters "CS" (C in navy, S in green), with a green-to-blue gradient wave beneath it, and the wordmark "Carrystyle" in navy below that.

**Color palette** *(estimated from the provided logo — confirm exact hex values against official brand guidelines if they exist; treat these as strong starting points, not final)*:
- **Navy / Deep Ink** `#0F2242` — primary text, wordmark, structural UI elements. This is the brand's "authority" color.
- **Leaf Green** `#6FA23A` — accent color, tied to the "S" in the logo. Use for highlights, active states, small accent details — not as a dominant background color.
- **Wave Blue-Teal gradient** `#3FA796 → #2E7BC4` — used sparingly, as the logo itself uses it: a single accent gradient (dividers, underlines, a subtle background wash in the hero), not a general-purpose UI color.
- **Warm Gold** `#B8944F` *(new — introduced from the product sample, not the logo)* — this is critical: the sample bag shows Carrystyle's actual printing capability is premium and ornate (gold foil damask on white). The website needs a way to communicate that craftsmanship, and pure navy/green/tech-blue won't do it alone. Use gold as a **tertiary, premium accent** — reserved for the Customization section, print-detail callouts, and possibly the "print texture" moment in the 3D bag animation — so it reads as intentional and premium, not decorative clutter.
- **Neutral base:** off-white/cream `#FAFAF8` for backgrounds (matches the sample bag's base tone better than pure white), with navy for dark-mode sections if used.

**Typography direction:** A confident, modern sans-serif for headings (something with real weight — geometric or grotesque, similar spirit to what refractweb.com uses) paired with a clean, highly readable body sans. Avoid anything ornate or script-like for body text — the *products* carry the ornate/premium feeling; the *typography system* should stay clean and confident so it doesn't compete with product imagery.

**Brand tone:** Capable, precise, quietly premium. Not flashy-startup, not old-fashioned-manufacturer. Think: a company that can produce 50,000 bags on schedule *and* get the gold foil detailing right on a boutique client's 200-unit custom order.

---

### 2. Opening Animation & Loader Sequence

Reference: refractweb.com's own load sequence — confident, brief, tied to real asset loading (not a fake spinner).

1. On load: the Carrystyle icon (the bag mark, not the full wordmark) animates in — draw-on or a clean geometric reveal, in navy, against the cream background. Keep it under ~2 seconds.
2. This plays while the 3D bag model, textures, and fonts load in the background — tie the animation's completion to real load progress where possible, not a fixed timer.
3. On completion, the icon either resolves directly into the 3D hero bag, or fades to reveal it — no hard cut, no blank frame in between.
4. Scroll is locked during this sequence.

---

### 3. Header & Navigation

- **Logo lockup:** icon + "Carrystyle" wordmark, left-aligned. Switches to icon-only on mobile/scroll-compressed states if needed.
- **Nav links:** Products, Customization, Manufacturing, Contact — kept short; this is a scroll-narrative site, not a multi-page site, so these should jump-link to sections (see `sitemap.md`) rather than navigate away.
- **Primary CTA button:** "Get a Quote" — persistent, visually distinct (this is likely the one spot where the gold accent earns a place, e.g. a subtle gold-on-navy button treatment), always reachable regardless of scroll position.
- **Scroll behavior:** header becomes a slim, blurred/translucent bar once the user scrolls past the hero — never fully disappears, so "Get a Quote" is always one click away.
- **Nav link hover treatment** *(borrowed from refractweb.com's own stylistic signature)*: a duplicate-text distortion/glitch effect on hover — overlapping offset copies of the link text — used sparingly, only on nav links, not applied everywhere or it loses its impact.
- **Mobile:** full-screen overlay menu, not a small dropdown — matches the confident, premium tone.

---

### 4. Section-by-Section Design Direction

*(Full content/copy requirements for each section are in `sitemap.md` — this section is about how each should **look and feel**, not what it says.)*

**Hero (3D Bag):**
Cream/off-white background, the 3D bag rendered with soft, warm studio lighting (echo the lighting in the provided product photo — warm ambient tones, soft shadow beneath the bag, not harsh studio-white). Headline in navy, large and confident. As the user scrolls, the bag transforms per `animation-spec.md` — and at the moment it "gains" a print texture, that's where the gold accent should visually appear for the first time on the page, making it feel earned rather than decorative.

**About Carrystyle India:**
Simple, editorial — generous whitespace, a strong pull-quote style statement about scale/capability, supported by a factory/production photo (see `asset-checklist.md`). Navy text on cream.

**What We Manufacture (Product Categories):**
A clean grid or horizontal-scroll showcase. Each category card should feel like a product shot, not an icon — real bag photography, consistent lighting/background treatment across all of them (this consistency does a lot of work to make the catalog feel professionally shot rather than assembled from scattered photos).

**Custom Printing & Customization:**
This is the section to spend the most design effort on outside the hero. A before/after or plain-to-printed reveal (scroll-triggered or hover-triggered), using the gold/ornate print style from the sample bag as the hero example. This section should visually *feel* different from the rest of the site — slightly warmer, slightly more ornate framing (thin gold-line borders, echoing the cartouche frame in the sample bag) — to physically communicate "this is where the craftsmanship happens."

**Manufacturing Process & Capacity:**
More technical, more structural — numbered steps, clean iconography or photography of the factory floor, navy-dominant, minimal color. This section should read as "credible operations," in contrast with the warmer Customization section before it.

**Why Carrystyle (USPs):**
Short, scannable, icon + short statement format. Green accent color fits naturally here for small icon details.

**Portfolio / Past Work:**
Full-bleed or masonry gallery of real completed orders. Let the photography do the work — minimal chrome/UI around the images.

**Testimonials / Clients:**
Simple, quiet — logo marquee (refractweb.com's own marquee-of-tech-logos pattern is a good structural reference, just populated with Carrystyle's client logos instead) plus 1–2 featured quotes in larger type.

**Get a Quote:**
Clean form, generously spaced fields, cream background, navy/green for interactive states. Should feel fast and low-friction — this is the conversion point, not a place for heavy decoration.

**Footer:**
Navy background (the one section where navy dominates as a background, not just text) with cream/white text — gives the page a confident close. Structure:
- Logo + one-line tagline
- Column: Company (About, Manufacturing, Careers if applicable)
- Column: Products (category links)
- Column: Legal (Terms & Conditions, Privacy Policy)
- Contact block: phone, email, address
- Social links
- Copyright line

---

### 5. Legal Pages — Structure (not final legal text)

Build **Terms & Conditions** and **Privacy Policy** pages using the site's standard typography system (simple, readable, no heavy design treatment needed — these are utility pages). Use the outline below as the section structure; **the actual legal language should be reviewed/drafted by a lawyer familiar with Indian e-commerce/data law (IT Act 2000, DPDP Act 2023) before publishing** — what's below is a structural starting point, not final copy.

**Terms & Conditions — suggested sections:**
1. Acceptance of terms
2. Description of services (manufacturing + custom printing; clarify that quote requests are inquiries, not binding orders, unless/until confirmed separately)
3. Custom design submissions — ownership/IP of designs uploaded by customers, and Carrystyle's rights to use completed work in its portfolio (with permission)
4. Order/quote process and any applicable minimums
5. Payment terms (once defined — v1 site may not need this if it's quote-only)
6. Limitation of liability
7. Governing law and jurisdiction (India)
8. Contact information for disputes/questions

**Privacy Policy — suggested sections:**
1. What data is collected (quote form: name, email, phone, company, uploaded files)
2. How data is used
3. Data storage/retention
4. Third-party services used (analytics, form backend — confirm final list from `tech-stack.md`)
5. User rights regarding their data
6. Cookie usage (if analytics/cookies are used)
7. Contact information for privacy inquiries

---

### 6. Motion & Interaction Principles (summary — full spec in `animation-spec.md`)

- Smooth scroll throughout (Lenis), scroll-linked 3D bag transformation as the signature interaction.
- Section entrance animations: understated fades/slide-ups, not bouncy or playful — matches the brand's "quietly premium" tone.
- Respect `prefers-reduced-motion` fully — static fallback experience, not a broken one.
- Motion should always feel like it's revealing craftsmanship (the print appearing, the bag turning to show detail) — not motion for its own sake.

---

### 7. What "Done" Looks Like

A visitor should be able to land on the site, watch the bag transform as they scroll through what Carrystyle makes and how customization works, and reach the quote form within a minute or two — coming away with a clear sense that this is a manufacturer capable of both scale and genuine craftsmanship, not just one or the other.
