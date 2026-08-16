import { useEffect, useRef, useCallback } from 'react';

interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

/**
 * Caches element bounding rects on resize — never reads layout inside scroll callbacks.
 */
export function useScrollLayout() {
  const cacheRef = useRef<Map<string, Rect>>(new Map());

  const measure = useCallback((key: string, el: HTMLElement | null) => {
    if (!el) {
      cacheRef.current.delete(key);
      return;
    }
    const r = el.getBoundingClientRect();
    cacheRef.current.set(key, {
      left: r.left,
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      width: r.width,
      height: r.height,
    });
  }, []);

  const getRect = useCallback((key: string): Rect | undefined => {
    return cacheRef.current.get(key);
  }, []);

  useEffect(() => {
    const refresh = () => {
      // Re-measure all cached elements on next frame after resize settles
      requestAnimationFrame(() => {
        cacheRef.current.forEach((_, key) => {
          const el = document.querySelector(`[data-layout-key="${key}"]`) as HTMLElement | null;
          if (el) {
            const r = el.getBoundingClientRect();
            cacheRef.current.set(key, {
              left: r.left,
              top: r.top,
              right: r.right,
              bottom: r.bottom,
              width: r.width,
              height: r.height,
            });
          }
        });
      });
    };

    window.addEventListener('resize', refresh, { passive: true });
    return () => window.removeEventListener('resize', refresh);
  }, []);

  return { measure, getRect };
}
