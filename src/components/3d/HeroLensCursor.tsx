import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroBagScene } from './HeroBagScene';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { heroSequence } from '../../lib/heroSequence';

interface HeroLensCursorProps {
  heroRef: React.RefObject<HTMLElement>;
  headlineRef: React.RefObject<HTMLElement>;
  isMobile: boolean;
  active: boolean;
}

const MIN_RADIUS = 44;
const MAX_RADIUS_DESKTOP = 400;
const MAX_RADIUS_MOBILE = 240;
const POS_LERP = 0.18;
const RADIUS_LERP = 0.12;
const BAG_OPACITY_LERP = 0.11;

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/** Progressive reveal while moving over text — full at center */
function targetBagOpacity(reveal: number): number {
  if (reveal <= 0.1) return 0;
  return smoothstep(Math.pow(reveal, 0.92));
}

export const HeroLensCursor: React.FC<HeroLensCursorProps> = ({
  heroRef,
  headlineRef,
  isMobile,
  active,
}) => {
  const reducedMotion = useReducedMotion();
  const sphereRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);
  const solidDotRef = useRef<HTMLDivElement>(null);
  const bagWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    radius: MIN_RADIUS,
    targetRadius: MIN_RADIUS,
    reveal: 0,
    bagOpacity: 0,
    bagCenterX: 0,
    bagCenterY: 0,
    headlineRect: null as DOMRect | null,
    heroRect: null as DOMRect | null,
    visible: true,
  });

  const bagSize = isMobile ? 420 : 700;

  useEffect(() => {
    if (!active || reducedMotion) return;

    const s = stateRef.current;
    s.targetX = window.innerWidth * 0.5;
    s.targetY = window.innerHeight * 0.5;
    s.x = s.targetX;
    s.y = s.targetY;

    window.dispatchEvent(new CustomEvent('hero-cursor-ready'));

    const measure = () => {
      const hr = heroRef.current?.getBoundingClientRect();
      const headline = headlineRef.current?.getBoundingClientRect();
      if (hr) stateRef.current.heroRect = hr;
      if (headline) {
        stateRef.current.headlineRect = headline;
        stateRef.current.bagCenterX = headline.left + headline.width / 2;
        stateRef.current.bagCenterY = headline.top + headline.height / 2;
      }
    };

    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', measure, { passive: true });

    const maxRadius = isMobile ? MAX_RADIUS_MOBILE : MAX_RADIUS_DESKTOP;

    const onPointerMove = (e: PointerEvent) => {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        stateRef.current.targetX = e.touches[0].clientX;
        stateRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const computeReveal = (cx: number, cy: number) => {
      const rect = stateRef.current.headlineRect;
      if (!rect) return 0;

      const padX = 36;
      const padY = 24;
      const inX = cx >= rect.left - padX && cx <= rect.right + padX;
      const inY = cy >= rect.top - padY && cy <= rect.bottom + padY;
      if (!inX || !inY) return 0;

      const hcx = rect.left + rect.width / 2;
      const hcy = rect.top + rect.height / 2;
      const dist = Math.hypot(cx - hcx, cy - hcy);
      const maxDist = Math.hypot(rect.width * 0.52, rect.height * 0.52);
      const proximity = 1 - Math.min(1, dist / maxDist);

      return Math.pow(0.12 + proximity * 0.88, 0.9);
    };

    let frame = 0;

    const tick = () => {
      const s = stateRef.current;

      s.x += (s.targetX - s.x) * POS_LERP;
      s.y += (s.targetY - s.y) * POS_LERP;

      frame++;
      if (frame % 8 === 0) measure();

      const hr = s.heroRect;
      const inHero =
        !!hr &&
        s.x >= hr.left &&
        s.x <= hr.right &&
        s.y >= hr.top &&
        s.y <= hr.bottom;
      s.visible = inHero;

      const reveal = inHero ? computeReveal(s.x, s.y) : 0;
      s.reveal = reveal;

      s.targetRadius = MIN_RADIUS + (maxRadius - MIN_RADIUS) * s.reveal;
      s.radius += (s.targetRadius - s.radius) * RADIUS_LERP;

      const targetBagOp = targetBagOpacity(s.reveal);
      s.bagOpacity += (targetBagOp - s.bagOpacity) * BAG_OPACITY_LERP;
      const solidOpacity = Math.max(0, 1 - s.bagOpacity);

      const breath = reveal < 0.08 ? 1 + Math.sin(performance.now() * 0.0025) * 0.035 : 1;
      const diameter = s.radius * breath * 2;
      const offsetX = s.bagCenterX - s.x;
      const offsetY = s.bagCenterY - s.y;

      // Publish the current pose so the scroll sequence can start its growth
      // from whatever hover has left the lens looking like. Read-only channel:
      // nothing here feeds back into the hover behaviour above.
      const pose = heroSequence.lens;
      pose.x = s.x;
      pose.y = s.y;
      pose.radius = diameter / 2;
      pose.bagX = s.bagCenterX;
      pose.bagY = s.bagCenterY;
      pose.bagOpacity = s.bagOpacity;
      pose.bagSize = bagSize * 0.9;
      pose.ready = true;

      // Cross-fade out as the scroll sequence's iris takes over
      const lensOpacity = s.visible ? 1 - heroSequence.lensFade : 0;

      if (sphereRef.current) {
        sphereRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
        sphereRef.current.style.width = `${diameter}px`;
        sphereRef.current.style.height = `${diameter}px`;
        sphereRef.current.style.opacity = String(lensOpacity);
        sphereRef.current.style.visibility = lensOpacity > 0.01 ? 'visible' : 'hidden';
      }

      if (solidRef.current) {
        solidRef.current.style.opacity = String(solidOpacity);
      }

      if (solidDotRef.current) {
        solidDotRef.current.style.opacity = String(solidOpacity > 0.4 ? 1 : 0);
      }

      if (bagWrapRef.current) {
        bagWrapRef.current.style.opacity = String(s.bagOpacity);
        bagWrapRef.current.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        bagWrapRef.current.style.visibility = s.bagOpacity > 0.015 ? 'visible' : 'hidden';
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = '0.6';
        glowRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [active, reducedMotion, isMobile, headlineRef, heroRef]);

  if (!active) return null;

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full overflow-hidden bg-ink border border-teal/30"
          style={{ width: bagSize, height: bagSize }}
        >
          <HeroBagScene isMobile={isMobile} />
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero-lens-sphere"
      ref={sphereRef}
      className="fixed top-0 left-0 z-[40] pointer-events-none will-change-transform rounded-full overflow-hidden bg-ink"
      style={{
        width: MIN_RADIUS * 2,
        height: MIN_RADIUS * 2,
        border: '2px solid rgba(188, 211, 216, 0.55)',
        boxShadow:
          '0 0 0 1px rgba(188, 211, 216, 0.2), 0 0 55px rgba(188, 211, 216, 0.32), inset 0 0 55px rgba(15, 34, 66, 0.42)',
      }}
    >
      {/* Solid metallic fill — 100% opaque, fades only as bag reveals */}
      <div ref={solidRef} className="absolute inset-0 rounded-full sphere-cursor-glow" />

      {/* Bag GLB — parallax-offset so it stays fixed at wordmark center while sphere moves */}
      <div
        ref={bagWrapRef}
        className="absolute left-1/2 top-1/2 pointer-events-none will-change-transform"
        style={{
          width: bagSize,
          height: bagSize,
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <div
            ref={glowRef}
            className="absolute left-1/2 top-1/2 pointer-events-none radial-blur-teal will-change-transform"
            style={{
              width: '88%',
              height: '88%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6,
            }}
          />
          <div className="absolute inset-[5%]">
            <HeroBagScene isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* Unified inner highlight + vignette (same element — no disconnected ring) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.14) 0%, transparent 26%)',
          boxShadow: 'inset 0 0 35px rgba(15, 34, 66, 0.35)',
        }}
      />

      {/* Cursor dot — only visible in solid mode */}
      <div
        ref={solidDotRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm" />
      </div>
    </div>
  );
};
