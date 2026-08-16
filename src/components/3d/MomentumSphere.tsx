import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useHeroInteraction } from '../../context/HeroInteractionContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SPHERE_SIZE = 90;
const REVEAL_SIZE = 200;
const PADDING = 60;
const FRICTION = 0.92;
const BOUNCE = -0.55;
const FOLLOW_LERP = 0.14;

interface MomentumSphereProps {
  onRevealChange?: (progress: number) => void;
}

export const MomentumSphere: React.FC<MomentumSphereProps> = ({ onRevealChange }) => {
  const reducedMotion = useReducedMotion();
  const {
    revealMode,
    setRevealProgress,
    scrollRevealProgress,
    updateCursor,
  } = useHeroInteraction();

  const [pos, setPos] = useState({ x: window.innerWidth * 0.75, y: window.innerHeight * 0.42 });
  const [revealP, setRevealP] = useState(0);
  const posRef = useRef(pos);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: pos.x, y: pos.y, time: Date.now() });
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const sphereRef = useRef<HTMLDivElement>(null);
  const breathingTweenRef = useRef<gsap.core.Tween | null>(null);
  const revealTweenRef = useRef<gsap.core.Tween | null>(null);
  const followTargetRef = useRef({ x: pos.x, y: pos.y });
  const revealProxy = useRef({ value: 0 });

  const boundsRef = useRef({
    maxX: window.innerWidth - PADDING,
    maxY: window.innerHeight - PADDING,
    minX: PADDING,
    minY: PADDING,
  });

  useEffect(() => {
    const updateBounds = () => {
      boundsRef.current = {
        maxX: window.innerWidth - PADDING,
        maxY: window.innerHeight - PADDING,
        minX: PADDING,
        minY: PADDING,
      };
    };
    window.addEventListener('resize', updateBounds, { passive: true });
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    if (!sphereRef.current || reducedMotion) return;

    breathingTweenRef.current = gsap.fromTo(sphereRef.current, {
      scale: 0.94,
    }, {
      scale: 1.06,
      duration: 1.75,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      breathingTweenRef.current?.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      const instant = revealMode === 'reveal' ? 1 : 0;
      setRevealP(instant);
      setRevealProgress(instant);
      onRevealChange?.(instant);
      return;
    }

    revealTweenRef.current?.kill();

    const target = revealMode === 'reveal' ? 1 : 0;
    revealTweenRef.current = gsap.to(revealProxy.current, {
      value: target,
      duration: 0.45,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate() {
        const p = revealProxy.current.value;
        setRevealP(p);
        setRevealProgress(p);
        onRevealChange?.(p);
      },
    });

    return () => {
      revealTweenRef.current?.kill();
    };
  }, [revealMode, reducedMotion, setRevealProgress, onRevealChange]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY);
      followTargetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateCursor(e.touches[0].clientX, e.touches[0].clientY);
        followTargetRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [updateCursor]);

  // Physics on GSAP ticker — single RAF loop shared with Lenis
  useEffect(() => {
    const tick = () => {
      const bounds = boundsRef.current;
      const isRevealing = revealMode === 'reveal' && revealProxy.current.value > 0.01;
      const isScrollRevealing = scrollRevealProgress > 0.05;

      if (isScrollRevealing) {
        if (sphereRef.current) {
          sphereRef.current.style.opacity = String(Math.max(0, 1 - scrollRevealProgress * 2));
        }
        return;
      }

      if (sphereRef.current) {
        sphereRef.current.style.opacity = String(1 - revealProxy.current.value);
      }

      if (isRevealing) {
        const tx = followTargetRef.current.x;
        const ty = followTargetRef.current.y;
        const lerpX = posRef.current.x + (tx - posRef.current.x) * FOLLOW_LERP;
        const lerpY = posRef.current.y + (ty - posRef.current.y) * FOLLOW_LERP;
        setPos({ x: lerpX, y: lerpY });
      } else if (!isDraggingRef.current) {
        velocityRef.current.x *= FRICTION;
        velocityRef.current.y *= FRICTION;

        if (Math.abs(velocityRef.current.x) > 0.05 || Math.abs(velocityRef.current.y) > 0.05) {
          let newX = posRef.current.x + velocityRef.current.x;
          let newY = posRef.current.y + velocityRef.current.y;

          if (newX < bounds.minX) {
            newX = bounds.minX;
            velocityRef.current.x *= BOUNCE;
          } else if (newX > bounds.maxX) {
            newX = bounds.maxX;
            velocityRef.current.x *= BOUNCE;
          }

          if (newY < bounds.minY) {
            newY = bounds.minY;
            velocityRef.current.y *= BOUNCE;
          } else if (newY > bounds.maxY) {
            newY = bounds.maxY;
            velocityRef.current.y *= BOUNCE;
          }

          setPos({ x: newX, y: newY });
        }
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [revealMode, scrollRevealProgress]);

  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    if (revealMode === 'reveal') return;
    isDraggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = { x: 0, y: 0 };
    lastPointerRef.current = { x: clientX, y: clientY, time: Date.now() };
    breathingTweenRef.current?.pause();
    setPos({ x: clientX, y: clientY });
  }, [revealMode]);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const now = Date.now();
    const dt = Math.max(1, now - lastPointerRef.current.time);

    velocityRef.current = {
      x: (clientX - lastPointerRef.current.x) / (dt / 16),
      y: (clientY - lastPointerRef.current.y) / (dt / 16),
    };
    lastPointerRef.current = { x: clientX, y: clientY, time: now };
    setPos({ x: clientX, y: clientY });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    breathingTweenRef.current?.resume();
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();
    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  const size = SPHERE_SIZE + (REVEAL_SIZE - SPHERE_SIZE) * revealP;
  const hiddenByScroll = scrollRevealProgress > 0.3;

  if (hiddenByScroll) return null;

  return (
    <div
      ref={sphereRef}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }}
      className="fixed pointer-events-auto z-40 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        transition: isDragging ? 'none' : undefined,
      }}
    >
      <div
        className="absolute inset-0 rounded-full border border-teal/50 bg-teal/10"
        style={{
          boxShadow: revealP > 0.5
            ? '0 0 60px rgba(188, 211, 216, 0.7), inset 0 0 25px rgba(188, 211, 216, 0.3)'
            : '0 0 30px rgba(188, 211, 216, 0.4), inset 0 0 12px rgba(188, 211, 216, 0.2)',
        }}
      />
      <div
        className="absolute rounded-full sphere-cursor-glow flex items-center justify-center"
        style={{ inset: revealP > 0.5 ? '12px' : '6px' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm" />
      </div>
    </div>
  );
};
