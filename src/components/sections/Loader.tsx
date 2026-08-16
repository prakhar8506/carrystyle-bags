import React, { useEffect, useState, useRef } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';
import { useAssetPreloader } from '../../hooks/useAssetPreloader';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const { lenis } = useSmoothScroll();
  const { progress: assetProgress, done: assetsDone } = useAssetPreloader();
  const reducedMotion = useReducedMotion();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const startTimeRef = useRef(Date.now());
  const completedRef = useRef(false);

  useEffect(() => {
    const hasLoadedThisSession = sessionStorage.getItem('cs_session_loaded');
    if (hasLoadedThisSession) {
      onComplete();
      return;
    }
    if (lenis) lenis.stop();
  }, [lenis, onComplete]);

  useEffect(() => {
    setDisplayProgress(assetProgress);
  }, [assetProgress]);

  useEffect(() => {
    if (!assetsDone || completedRef.current) return;

    const minFloorMs = reducedMotion ? 0 : 1500;
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minFloorMs - elapsed);

    const timer = setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;

      setDisplayProgress(100);
      sessionStorage.setItem('cs_session_loaded', 'true');
      setFadeOut(true);

      setTimeout(() => {
        if (lenis) lenis.start();
        onComplete();
      }, reducedMotion ? 0 : 400);
    }, remaining);

    return () => clearTimeout(timer);
  }, [assetsDone, lenis, onComplete, reducedMotion]);

  const hasLoadedThisSession =
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('cs_session_loaded');

  if (hasLoadedThisSession) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bone flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={fadeOut}
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Carrystyle logo loading">
            <path
              d="M 25 35 L 75 35 L 80 85 C 80 88 77 90 74 90 L 26 90 C 23 90 20 88 20 85 Z"
              fill="none"
              stroke="#0F2242"
              strokeWidth="6"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300 - (displayProgress / 100) * 300,
                transition: 'stroke-dashoffset 0.2s ease',
              }}
            />
            <path
              d="M 38 35 C 38 20 62 20 62 35"
              fill="none"
              stroke="#0F2242"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 43 50 C 37 50 35 55 35 60 C 35 65 37 70 43 70"
              fill="none"
              stroke="#0F2242"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 61 52 C 57 50 54 55 57 60 C 60 65 57 70 52 68"
              fill="none"
              stroke="#6FA23A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="space-y-1">
          <h1 className="font-wordmark font-black text-2xl text-ink tracking-tight">
            CARRYSTYLE<span className="text-alpine">.</span>
          </h1>
          <p className="text-[10px] font-bold tracking-widest text-mist uppercase">
            Preparing your experience
          </p>
        </div>

        <div className="w-full space-y-2">
          <div className="w-full h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-alpine transition-all duration-200 ease-out"
              style={{ width: `${displayProgress}%`, transform: 'translateZ(0)' }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-mist tabular-nums">
            <span>50,000+ Monthly Capacity</span>
            <span>{displayProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
