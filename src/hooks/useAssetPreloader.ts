import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ASSETS = {
  glb: [
    '/models/tote-bag.glb',
    '/models/white-bag.glb',
    '/models/pink-bag.glb',
  ],
  images: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=75',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=75',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=75',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=75',
  ],
};

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadGlb(src: string): Promise<void> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load(src, () => resolve(), undefined, () => resolve());
  });
}

export function useAssetPreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const totalSteps = ASSETS.glb.length + ASSETS.images.length + 1;
    let completed = 0;

    const tick = () => {
      if (!cancelled) {
        completed++;
        setProgress(Math.round((completed / totalSteps) * 100));
      }
    };

    const run = async () => {
      for (const src of ASSETS.glb) {
        await preloadGlb(src);
        tick();
      }

      await Promise.all(
        ASSETS.images.map(async (src) => {
          await preloadImage(src);
          tick();
        })
      );

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      tick();

      if (!cancelled) setDone(true);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { progress, done };
}
