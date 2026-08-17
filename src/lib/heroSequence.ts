/**
 * Shared state + constants for the scroll-scrubbed hero sequence.
 *
 * Kept in its own module so the hover lens (HeroLensCursor) and the scroll
 * timeline (HeroScrollSequence) can hand off to each other without DOM/dataset
 * hacks or a second scroll listener.
 *
 * The two behaviours are deliberately independent: hover owns the reveal, the
 * scroll timeline owns the grow-to-fullscreen. They act on separate elements,
 * so neither ever writes to a transform the other also controls. This module
 * is the one-way channel between them — the lens publishes what it currently
 * looks like, and the timeline reads that as its starting point.
 */

/** Pinned scroll travel, in viewport heights. */
export const HERO_SEQ_VH_DESKTOP = 3.5;
export const HERO_SEQ_VH_MOBILE = 2.2;

/**
 * Scroll progress at which the nav switches to light type. Tuned to the moment
 * the growing iris has swallowed most of the nav row: earlier and dark links
 * sit on dark, later and the pale wordmark sits on the still-light corner.
 */
export const HERO_SEQ_DARK_AT = 0.33;

/**
 * Live snapshot of the hover lens, rewritten by HeroLensCursor every frame.
 * Read-only for everyone else. This is what lets the scroll timeline start
 * from the lens's *current* state rather than assuming one fixed pose.
 */
export interface HeroLensState {
  /** Circle centre, viewport coordinates. */
  x: number;
  y: number;
  /** Current circle radius in px, including the idle breathing wobble. */
  radius: number;
  /** Where the revealed bag actually sits — world-locked, not the circle centre. */
  bagX: number;
  bagY: number;
  /** 0 when the bag is hidden, 1 when hover has fully revealed it. */
  bagOpacity: number;
  /** On-screen size of the bag canvas inside the lens, in px. */
  bagSize: number;
  /** False before the lens has ever run (reduced motion, or not yet mounted). */
  ready: boolean;
}

export const heroSequence = {
  /** 0 = hover lens fully visible, 1 = fully handed off to the scroll iris. */
  lensFade: 0,
  lens: {
    x: 0,
    y: 0,
    radius: 0,
    bagX: 0,
    bagY: 0,
    bagOpacity: 0,
    bagSize: 0,
    ready: false,
  } as HeroLensState,
};

export function heroSeqScrollVh(): number {
  return window.innerWidth < 768 ? HERO_SEQ_VH_MOBILE : HERO_SEQ_VH_DESKTOP;
}
