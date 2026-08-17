import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBagScene } from './HeroBagScene';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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
    expansionProgress: 0,
    scrollAwayProgress: 0,
  });

  const bagSize = isMobile ? 420 : 700;

  useEffect(() => {
    if (!active || reducedMotion) return;

    const s = stateRef.current;
    s.targetX = window.innerWidth * 0.5;
    s.targetY = window.innerHeight * 0.5;
    s.x = s.targetX;
    s.y = s.targetY;

    // Set up ScrollTrigger for the expansion section
    const st = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#expansion-trigger',
        start: 'top bottom', // Start when the top of the trigger hits the bottom of viewport
        end: 'top top',      // End when it reaches the top (fully in view)
        scrub: true,
        onUpdate: (self) => {
          stateRef.current.expansionProgress = self.progress;
        },
      });

      // Scroll away trigger past pinned section
      ScrollTrigger.create({
        trigger: '#expansion-trigger',
        start: 'bottom top',
        end: () => 'bottom+=' + window.innerHeight + ' top',
        scrub: true,
        onUpdate: (self) => {
          stateRef.current.scrollAwayProgress = self.progress;
        },
      });
    });

    // Notify ExpandedBag that the cursor ScrollTrigger is ready
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
      const progress = s.expansionProgress;
      const scrollAway = s.scrollAwayProgress;
      
      // If expanding, override target towards viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const effectiveTargetX = s.targetX * (1 - progress) + centerX * progress;
      const effectiveTargetY = s.targetY * (1 - progress) + centerY * progress;
      
      const currentPosLerp = progress > 0 ? POS_LERP + progress * 0.15 : POS_LERP;
      s.x += (effectiveTargetX - s.x) * currentPosLerp;
      s.y += (effectiveTargetY - s.y) * currentPosLerp;

      frame++;
      if (frame % 8 === 0) measure();

      const hr = s.heroRect;
      // When expanding, always keep visible
      const inHero =
        hr &&
        s.x >= hr.left &&
        s.x <= hr.right &&
        s.y >= hr.top &&
        s.y <= hr.bottom;
      s.visible = !!inHero || progress > 0;

      const reveal = inHero ? computeReveal(s.x, s.y) : 0;
      // Force reveal to 1 if expanding
      s.reveal = Math.max(reveal, progress);
      
      const baseTargetRadius = MIN_RADIUS + (maxRadius - MIN_RADIUS) * s.reveal;
      // Expand to massive circle filling viewport completely (including corners)
      const expandedRadius = Math.max(window.innerWidth, window.innerHeight) * 2.5;
      s.targetRadius = baseTargetRadius * (1 - progress) + expandedRadius * progress;
      
      const currentRadiusLerp = progress > 0 ? RADIUS_LERP + progress * 0.2 : RADIUS_LERP;
      s.radius += (s.targetRadius - s.radius) * currentRadiusLerp;

      const targetBagOp = Math.max(targetBagOpacity(s.reveal), progress > 0 ? 1 : 0);
      s.bagOpacity += (targetBagOp - s.bagOpacity) * BAG_OPACITY_LERP;
      const solidOpacity = Math.max(0, (1 - s.bagOpacity) * (1 - progress * 2.5));

      const localX = s.x;
      const localY = s.y - scrollAway * window.innerHeight;
      const breath = reveal < 0.08 && progress < 0.01 ? 1 + Math.sin(performance.now() * 0.0025) * 0.035 : 1;
      const finalRadius = s.radius * breath;
      const diameter = finalRadius * 2;

      // World-locked bag: offset inside sphere so GLB stays at wordmark center initially,
      // but moves to the center of the sphere during expansion.
      const targetOffsetX = s.bagCenterX - localX;
      const targetOffsetY = s.bagCenterY - localY;
      const offsetX = targetOffsetX * (1 - progress);
      const offsetY = targetOffsetY * (1 - progress);

      if (sphereRef.current) {
        sphereRef.current.style.transform = `translate3d(${localX}px, ${localY}px, 0) translate(-50%, -50%)`;
        sphereRef.current.style.width = `${diameter}px`;
        sphereRef.current.style.height = `${diameter}px`;
        sphereRef.current.style.opacity = s.visible ? '1' : '0';
        sphereRef.current.style.visibility = s.visible ? 'visible' : 'hidden';
      }

      if (solidRef.current) {
        solidRef.current.style.opacity = String(solidOpacity);
      }

      if (solidDotRef.current) {
        solidDotRef.current.style.opacity = String(solidOpacity > 0.4 ? 1 : 0);
      }

      if (bagWrapRef.current) {
        bagWrapRef.current.style.opacity = String(s.bagOpacity);
        // Subtle pop for the bag when scrolling down
        const scale = 1 + progress * 0.15; 
        bagWrapRef.current.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
        bagWrapRef.current.style.visibility = s.bagOpacity > 0.015 ? 'visible' : 'hidden';
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = String(0.6 + progress * 0.4);
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.5})`;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      st.revert();
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
