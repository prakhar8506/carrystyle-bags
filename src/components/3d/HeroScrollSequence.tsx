import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBagScene } from './HeroBagScene';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { heroSequence, heroSeqScrollVh } from '../../lib/heroSequence';

/**
 * Scroll-scrubbed hero sequence.
 *
 * A single pinned ScrollTrigger owns the whole choreography — no competing
 * scroll listeners on the pinned section. Scroll position, not time, drives a
 * normalised 0→1 timeline, so it scrubs identically in both directions:
 *
 *   Phase A  0.00–0.08  idle — the landing page exactly as it already is
 *   Phase B  0.08–0.25  iris grows, bag emerges from inside it
 *   Phase C  0.25–0.40  iris wipes past the viewport diagonal → dark
 *   Phase D  0.40–0.50  settle / hold
 *   Phase E  0.50–0.66  copy cascades in
 *   Phase F  0.66–1.00  resting state, scroll buffer before the pin releases
 *
 * Only `transform` and `opacity` are animated. The iris is a fixed-size circle
 * grown with `scale()` — its width/height/border-radius never change.
 */

/** Fixed iris diameter. Growth is scale-only so nothing re-lays-out per frame. */
const IRIS_BASE = 2000;
const IRIS_RADIUS = IRIS_BASE / 2;

/** Idle and grown iris diameters, as a fraction of viewport height. */
const IRIS_IDLE_VH = 0.38;
const IRIS_GROWN_VH = 0.55;

const irisIdleScale = () => (window.innerHeight * IRIS_IDLE_VH) / IRIS_BASE;
const irisGrownScale = () => (window.innerHeight * IRIS_GROWN_VH) / IRIS_BASE;

/**
 * How much larger the bag ends up once the iris has swallowed the screen.
 *
 * Through Phase B the bag is sized to sit inside the circle; once the circle
 * is the backdrop that constraint is gone, so it keeps growing with the wipe
 * and the whole thing reads as one expansion. Held back on narrow screens,
 * where the copy block sits underneath the bag rather than beside it.
 */
const bagFinalScale = () => (window.innerWidth < 768 ? 1.22 : 1.32);

/**
 * Scale needed for an iris centred at (cx, cy) to clear the farthest viewport
 * corner. Measured against the live viewport, so it covers at any size or
 * aspect ratio, and from any centre — the iris is not always centred.
 */
function irisCoverScale(cx: number, cy: number): number {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const far = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(w - cx, cy),
    Math.hypot(cx, h - cy),
    Math.hypot(w - cx, h - cy),
  );
  return (far + 48) / IRIS_RADIUS;
}

/** Frozen snapshot of the lens, taken the moment the scroll growth begins. */
interface Origin {
  /** Iris start centre + scale, matched to the lens circle. */
  x: number;
  y: number;
  scale: number;
  /** Product start pose, matched to whatever hover has already revealed. */
  bagX: number;
  bagY: number;
  bagOpacity: number;
  bagSize: number;
}

/**
 * Reads the hover lens's *current* pose. Called fresh every time scroll sits
 * near zero, so the growth always starts from what is actually on screen —
 * whether the user hovered first or never hovered at all.
 */
function sampleLens(): Origin {
  const pose = heroSequence.lens;
  const fallback = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  if (!pose.ready || pose.radius <= 1) {
    return {
      ...fallback,
      scale: irisIdleScale(),
      bagX: fallback.x,
      bagY: fallback.y,
      bagOpacity: 0,
      bagSize: 0,
    };
  }

  return {
    x: pose.x,
    y: pose.y,
    scale: (pose.radius * 2) / IRIS_BASE,
    bagX: pose.bagX,
    bagY: pose.bagY,
    bagOpacity: pose.bagOpacity,
    bagSize: pose.bagSize,
  };
}

export const HeroScrollSequence: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const irisFillRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // The product canvas is mounted just after first paint rather than during
  // the scroll, so Phase B never waits on context creation or a model fetch,
  // and the landing page's first frame still costs a single WebGL context.
  const [productMounted, setProductMounted] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setProductMounted(true);
      return;
    }
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setProductMounted(true), { timeout: 1200 })
      : window.setTimeout(() => setProductMounted(true), 700);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const iris = irisRef.current;
    const irisFill = irisFillRef.current;
    const halo = haloRef.current;
    const product = productRef.current;
    const glow = glowRef.current;
    if (!iris || !irisFill || !halo || !product || !glow) return;

    // Resolved to nodes up front: gsap.context() scopes selector strings to
    // rootRef, which lives inside #hero, so strings would not resolve here.
    const hero = document.getElementById('hero');
    if (!hero) return;

    const copyLeft = gsap.utils.toArray<HTMLElement>(
      hero.querySelectorAll('[data-hero-seq-left]'),
    );
    const copyRight = gsap.utils.toArray<HTMLElement>(
      hero.querySelectorAll('[data-hero-seq-right]'),
    );
    const copyLines = gsap.utils.toArray<HTMLElement>(
      hero.querySelectorAll('[data-hero-seq-line]'),
    );
    const chrome = gsap.utils.toArray<HTMLElement>(
      hero.querySelectorAll('[data-hero-chrome]'),
    );

    // Reduced motion: skip the scrub entirely and render the Phase F resting
    // state immediately — no pin, no scroll listeners, no motion.
    if (reducedMotion) {
      heroSequence.lensFade = 1;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      gsap.set([iris, halo], { xPercent: -50, yPercent: -50, x: cx, y: cy });
      gsap.set(iris, { scale: irisCoverScale(cx, cy), opacity: 1 });
      gsap.set(irisFill, { opacity: 0 });
      gsap.set(halo, { opacity: 0.55 });
      gsap.set(product, { x: 0, y: 0, '--seq-bag-scale': bagFinalScale(), opacity: 1 });
      gsap.set(glow, { opacity: 0.65 });
      gsap.set(copyLines, { opacity: 1, y: 0 });
      gsap.set(chrome, { opacity: 0 });

      return () => {
        heroSequence.lensFade = 0;
      };
    }

    // Origin = the lens's pose at the instant growth starts. Held frozen once
    // the growth is under way so scrubbing stays stable, but re-taken while
    // scroll is still parked at the top (see `onUpdate`), which is what lets a
    // hover that happens after page load still be picked up.
    let origin: Origin | null = null;
    const getOrigin = (): Origin => {
      if (!origin) origin = sampleLens();
      return origin;
    };

    // Where the product rests, relative to the hero box, and how big it is on
    // screen. Measured rather than assumed: it is not viewport-centred on
    // narrow screens. Only x/y need clearing first — scale pivots on the
    // centre, so it cannot skew the measurement.
    let home = { x: 0, y: 0, size: 1 };
    const measureHome = () => {
      gsap.set(product, { x: 0, y: 0 });
      const r = product.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      home = {
        x: r.left + r.width / 2 - h.left,
        y: r.top + r.height / 2 - h.top,
        size: r.height || 1,
      };
    };

    /**
     * Product start pose, blended by how much hover has already revealed.
     *
     * Not revealed: starts small and centred in the circle, so it emerges from
     * inside the iris exactly as the reference does. Already revealed: starts
     * matched to the lens's bag — same place, same on-screen size, same
     * opacity — so the hand-off is invisible instead of popping.
     */
    /**
     * Scale the iris reaches at the end of Phase B.
     *
     * Never smaller than where hover left the circle, so a hovered start keeps
     * growing instead of contracting first — the scroll growth composes on top
     * of the hover state rather than overriding it. Capped well below full
     * cover so Phase C still has room to accelerate.
     */
    const phaseBScale = () => {
      const cover = irisCoverScale(home.x, home.y);
      return Math.min(
        cover * 0.75,
        Math.max(irisGrownScale(), getOrigin().scale * 1.2),
      );
    };

    const productStart = () => {
      const o = getOrigin();
      const revealed = gsap.utils.clamp(0, 1, o.bagOpacity);
      const matchScale = o.bagSize > 0 ? o.bagSize / home.size : 1;
      return {
        x: gsap.utils.interpolate(o.x, o.bagX, revealed) - home.x,
        y: gsap.utils.interpolate(o.y, o.bagY, revealed) - home.y,
        scale: gsap.utils.interpolate(0.3, matchScale, revealed),
        opacity: revealed,
      };
    };

    /**
     * The Phase A resting pose: sequence layers parked on the lens but fully
     * transparent, so the idle landing page shows only the hover lens.
     *
     * Applied explicitly rather than leaning on the tweens' immediateRender,
     * which gets clobbered by ScrollTrigger refreshes and React re-renders and
     * was leaving a faint ghost bag over the wordmark before any scroll.
     */
    const applyPhaseA = () => {
      const o = getOrigin();
      const s = productStart();
      gsap.set([iris, halo], { x: o.x, y: o.y, scale: o.scale, opacity: 0 });
      gsap.set(irisFill, { opacity: 1 - s.opacity });
      gsap.set(product, { x: s.x, y: s.y, '--seq-bag-scale': s.scale, opacity: 0 });
      gsap.set(glow, { opacity: 0 });
    };

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.set([iris, halo], { xPercent: -50, yPercent: -50, force3D: true });
      measureHome();

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          // Shorter pinned travel on small viewports so touch scroll stays sane
          end: () => '+=' + window.innerHeight * heroSeqScrollVh(),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            origin = null;
            measureHome();
          },
          onRefresh: (self) => {
            if (self.progress < 0.04) applyPhaseA();
          },
          onUpdate: (self) => {
            // While scroll is still parked in Phase A the iris is invisible, so
            // keep re-reading the lens. That way the growth starts from the
            // live hover state no matter when the user hovered — and scrolling
            // without ever hovering still starts from the plain idle circle.
            if (self.progress < 0.04) {
              origin = null;
              self.animation?.invalidate();
              applyPhaseA();
            }

            // Cross-fade the hover lens out exactly as the iris fades in, so
            // Phase A still reads as the untouched landing page.
            heroSequence.lensFade = gsap.utils.clamp(
              0,
              1,
              (self.progress - 0.05) / 0.04,
            );
          },
          onToggle: (self) => {
            // will-change only while the pinned section is live
            const hint = self.isActive ? 'transform, opacity' : 'auto';
            [iris, halo, product].forEach((el) => {
              el.style.willChange = hint;
            });
          },
          onLeaveBack: () => {
            heroSequence.lensFade = 0;
          },
        },
      });

      tl
        // ── Phase A (0%–8%) — idle. The iris sits on the lens, unseen. ──

        // ── Phase B (8%–25%) — iris grows; bag emerges from inside it ──
        .fromTo(
          iris,
          { opacity: 0 },
          { opacity: 1, duration: 0.04, ease: 'power2.out' },
          0.05,
        )
        .fromTo(
          halo,
          { opacity: 0 },
          { opacity: 0.7, duration: 0.04, ease: 'power2.out' },
          0.05,
        )
        // Settles onto the product, so the bag stays centred within the iris
        .fromTo(
          [iris, halo],
          { x: () => getOrigin().x, y: () => getOrigin().y },
          {
            x: () => home.x,
            y: () => home.y,
            duration: 0.17,
            ease: 'power2.inOut',
          },
          0.08,
        )
        .fromTo(
          [iris, halo],
          { scale: () => getOrigin().scale },
          { scale: () => phaseBScale(), duration: 0.17, ease: 'power2.out' },
          0.08,
        )
        // The bag travels with the iris so it always reads as being inside it
        .fromTo(
          product,
          {
            x: () => productStart().x,
            y: () => productStart().y,
          },
          { x: 0, y: 0, duration: 0.17, ease: 'power2.inOut' },
          0.08,
        )
        // Opacity is a genuine cross-fade: it rises to exactly what hover had
        // already revealed while the lens fades out over the same window, so
        // the two bags never both show and there is nothing to pop. If hover
        // never happened this segment is 0→0 and the bag simply emerges below.
        .fromTo(
          product,
          { opacity: 0 },
          { opacity: () => productStart().opacity, duration: 0.04 },
          0.05,
        )
        .to(product, { opacity: 1, duration: 0.16, ease: 'power2.out' }, 0.09)
        // Metallic fill of the sphere fades as the bag comes through, the
        // same way the hover lens drops its solid layer — so the expanding
        // circle keeps its ink colour and glow instead of jumping to a
        // different disc.
        .fromTo(
          irisFill,
          { opacity: () => 1 - productStart().opacity },
          { opacity: 0, duration: 0.16, ease: 'power2.out' },
          0.09,
        )
        // Teal glow behind the bag, present from the moment the bag is, so
        // the hover-lens halo is never dropped during the hand-off.
        .fromTo(
          glow,
          { opacity: 0 },
          { opacity: 0.65, duration: 0.16, ease: 'power2.out' },
          0.09,
        )
        // inOut rather than out: when hover has already revealed the bag at
        // full size this is a settle down to the resting size, and a
        // front-loaded ease would make that read as a jolt.
        .fromTo(
          product,
          { '--seq-bag-scale': () => productStart().scale },
          { '--seq-bag-scale': 1, duration: 0.17, ease: 'power1.inOut' },
          0.08,
        )

        // ── Phase C (25%–40%) — the iris wipe. Split into accelerate then
        // decelerate so it reads as power2.in → power1.out as it swallows
        // the screen, rather than one flat curve.
        .to(
          iris,
          {
            scale: () => {
              const from = phaseBScale();
              return from + (irisCoverScale(home.x, home.y) - from) * 0.55;
            },
            duration: 0.08,
            ease: 'power2.in',
          },
          0.25,
        )
        .to(
          iris,
          {
            scale: () => irisCoverScale(home.x, home.y),
            duration: 0.07,
            ease: 'power1.out',
          },
          0.33,
        )
        // Bag rides the wipe, on the same split ease as the iris above, so the
        // circle's expansion looks like it is carrying the bag with it and the
        // bag lands larger on the dark screen
        .to(
          product,
          {
            '--seq-bag-scale': () => 1 + (bagFinalScale() - 1) * 0.55,
            duration: 0.08,
            ease: 'power2.in',
          },
          0.25,
        )
        .to(
          product,
          {
            '--seq-bag-scale': () => bagFinalScale(),
            duration: 0.07,
            ease: 'power1.out',
          },
          0.33,
        )
        // Halo stays with the rim until the iris has left the viewport —
        // killing it at the start of the wipe is what made the sphere look
        // like it had been swapped for a flat disc.
        .to(halo, { opacity: 0.35, duration: 0.15, ease: 'none' }, 0.25)
        .to(halo, { opacity: 0, duration: 0.08, ease: 'power1.out' }, 0.40)
        // Glow holds through the wipe; a slight lift once the backdrop is
        // fully the sphere, still the same teal wash, not a new light.
        .to(glow, { opacity: 0.8, duration: 0.14, ease: 'power2.out' }, 0.25)
        // Dark-on-light hero chrome fades out as the wipe passes over it —
        // late enough that the iris is already occluding most of the wordmark
        .to(chrome, { opacity: 0, duration: 0.08, ease: 'power2.out' }, 0.29)

        // ── Phase D (40%–50%) — hold. Nothing animates. ──

        // ── Phase E (50%–66%) — copy cascade, left then right ──
        .fromTo(
          copyLeft,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.018,
            ease: 'power2.out',
          },
          0.5,
        )
        .fromTo(
          copyRight,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.016,
            ease: 'power2.out',
          },
          0.52,
        );

      // ── Phase F (66%–100%) — resting state, no further motion ──
      // Empty tail so the timeline is exactly 1.0 long. Without it the
      // duration would end with the last tween and every phase position
      // above would be scaled against that shorter span instead of scroll %.
      tl.to({}, { duration: 0.001 }, 0.999);

      // Keep the start values pinned to the live lens for as long as scroll
      // sits in Phase A. Scroll events alone are not enough: hovering fires no
      // scroll, and a fast flick can land past the sampling window with a
      // stale pose, which showed up as the iris jumping back to its
      // un-hovered size. The last sample before growth begins is the one that
      // sticks, so the timeline always starts from what is actually on screen.
      let lastPose = '';
      const trackLens = () => {
        const st = tl.scrollTrigger;
        if (!st || st.progress >= 0.04) return;
        const l = heroSequence.lens;
        const pose = `${l.x | 0}|${l.y | 0}|${l.radius | 0}|${l.bagOpacity.toFixed(2)}`;
        if (pose === lastPose) return;
        lastPose = pose;
        origin = null;
        tl.invalidate();
      };
      gsap.ticker.add(trackLens);
      cleanups.push(() => gsap.ticker.remove(trackLens));
    }, rootRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      heroSequence.lensFade = 0;
    };
  }, [reducedMotion]);

  const copy = STILL_COPY.expanded;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-[35] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Large, soft, low-opacity halo ring around the iris (Phase A/B) */}
      <div
        ref={haloRef}
        className="hero-seq-halo"
        style={{ width: IRIS_BASE, height: IRIS_BASE, opacity: 0 }}
      />

      {/* Iris — fixed size, transform-scaled only. Same paint as the hover
          lens, so growth reads as that sphere enlarging. */}
      <div
        ref={irisRef}
        className="hero-seq-iris"
        style={{ width: IRIS_BASE, height: IRIS_BASE, opacity: 0 }}
      >
        <div ref={irisFillRef} className="hero-seq-iris-fill" />
        <div className="hero-seq-iris-sheen" />
      </div>

      {/* Product — above the iris, so it reads as emerging from within it.
          Sits high on narrow screens so the copy block has room beneath it.

          Growth is driven by the --seq-bag-scale variable rather than a
          transform on this wrapper: react-three-fiber sizes its canvas from
          getBoundingClientRect, so scaling any ancestor of the canvas makes it
          re-measure against its own scaled box and shrink away. The variable
          is applied to the canvas and glow themselves, which are leaves. */}
      <div className="absolute inset-0 z-[2] flex items-start justify-center pt-[9vh] md:items-center md:justify-center md:pt-0">
        <div
          ref={productRef}
          className="hero-seq-product relative"
          style={{ opacity: 0, ['--seq-bag-scale' as string]: 0.3 } as React.CSSProperties}
        >
          <div ref={glowRef} className="hero-seq-glow" style={{ opacity: 0 }} />
          <div className="relative h-[min(90vw,540px)] md:h-[min(112vh,1000px)] aspect-square overflow-visible">
            {productMounted && <HeroBagScene />}
          </div>
        </div>
      </div>

      {/* Copy block — Phase E, left of the bag */}
      <div className="absolute z-[3] left-6 right-6 bottom-16 sm:bottom-20 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-10 lg:left-16 xl:left-24 max-w-[min(100%,380px)]">
        <p
          data-hero-seq-line
          data-hero-seq-left
          className="font-sans text-[11px] tracking-[0.22em] uppercase text-white/45 font-bold"
          style={{ opacity: 0 }}
        >
          <span className="text-white/70">{copy.step}</span>
          <span className="mx-2 text-white/25">/</span>
          <span>{copy.label}</span>
        </p>

        <h2
          data-hero-seq-line
          data-hero-seq-left
          className="mt-5 font-serif font-light text-white leading-[1.12] tracking-[-0.02em] text-[28px] sm:text-[32px] lg:text-[38px] xl:text-[42px]"
          style={{ opacity: 0 }}
        >
          {copy.headline}
        </h2>

        <div
          data-hero-seq-line
          data-hero-seq-left
          className="mt-5 h-px w-[42px] bg-white/30"
          style={{ opacity: 0 }}
        />

        <p
          data-hero-seq-line
          data-hero-seq-left
          className="mt-5 text-[13px] sm:text-sm leading-relaxed text-white/65 font-medium max-w-[36ch]"
          style={{ opacity: 0 }}
        >
          {copy.description}
        </p>

        <p
          data-hero-seq-line
          data-hero-seq-left
          className="mt-8 font-sans text-[11px] sm:text-xs tracking-wide text-white/45 font-medium"
          style={{ opacity: 0 }}
        >
          {copy.stats}
        </p>
      </div>

      {/* Specs column — Phase E, right of the bag. Hidden on small screens
          where the left copy already sits under the product. */}
      <div className="absolute z-[3] hidden md:block right-10 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 w-[min(100%,260px)]">
        <p
          data-hero-seq-line
          data-hero-seq-right
          className="font-sans text-[11px] tracking-[0.22em] uppercase text-white/45 font-bold"
          style={{ opacity: 0 }}
        >
          {copy.aside.kicker}
        </p>

        <h3
          data-hero-seq-line
          data-hero-seq-right
          className="mt-3 font-serif font-light text-white leading-[1.15] tracking-[-0.02em] text-[20px] lg:text-[24px]"
          style={{ opacity: 0 }}
        >
          {copy.aside.title}
        </h3>

        <p
          data-hero-seq-line
          data-hero-seq-right
          className="mt-2.5 text-[12px] leading-relaxed text-white/55 font-medium"
          style={{ opacity: 0 }}
        >
          {copy.aside.note}
        </p>

        <div
          data-hero-seq-line
          data-hero-seq-right
          className="mt-5 h-px w-[42px] bg-white/25"
          style={{ opacity: 0 }}
        />

        <dl className="mt-5 grid grid-cols-1 gap-3.5">
          {copy.aside.specs.map((spec) => (
            <div key={spec.label} data-hero-seq-line data-hero-seq-right style={{ opacity: 0 }}>
              <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold">
                {spec.label}
              </dt>
              <dd className="mt-0.5 text-[13px] leading-snug text-white/75 font-medium">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
