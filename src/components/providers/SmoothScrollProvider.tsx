import React, { useEffect, createContext, useContext, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

/**
 * The live Lenis instance, held outside the closure the scrollerProxy captures.
 *
 * ScrollTrigger caches a scroller's read function the first time a trigger uses
 * it, and children create their triggers before this provider's effect runs. In
 * StrictMode the provider mounts twice, so that cached function would otherwise
 * keep reading the first, already-destroyed instance — its scroll position
 * stays 0 forever and every scroll-linked animation silently freezes in dev.
 * Reading through this binding keeps the cached function pointed at whichever
 * instance is actually running.
 */
let activeLenis: Lenis | null = null;

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      if (!lenis) {
        if (typeof target === 'string') {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      const offset = options?.offset ?? 0;
      const duration = options?.duration;

      if (typeof target === 'string') {
        lenis.scrollTo(target, { offset, duration, lock: false });
      } else if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { offset, duration, lock: false });
      } else {
        lenis.scrollTo(target, { offset, duration, lock: false });
      }
    },
    [lenis]
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenisInstance = new Lenis({
      duration: reducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    activeLenis = lenisInstance;
    setLenis(lenisInstance);

    document.documentElement.classList.add('lenis');

    // scrollerProxy: ScrollTrigger reads Lenis scroll position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (!activeLenis) return 0;
        if (arguments.length && value !== undefined) {
          activeLenis.scrollTo(value, { immediate: true });
        }
        return activeLenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    // Single RAF loop: GSAP ticker drives Lenis
    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({
      scrub: 0.8,
    });

    const handleRefresh = () => {
      lenisInstance.resize();
    };
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    ScrollTrigger.refresh();

    return () => {
      if (activeLenis === lenisInstance) activeLenis = null;
      document.documentElement.classList.remove('lenis');
      lenisInstance.destroy();
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
