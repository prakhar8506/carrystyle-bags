import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type RevealMode = 'idle' | 'reveal' | 'scroll';

interface HeroInteractionContextType {
  revealMode: RevealMode;
  isRevealing: boolean;
  cursorPos: { x: number; y: number };
  setRevealMode: (mode: RevealMode) => void;
  startNavReveal: () => void;
  endNavReveal: () => void;
  updateCursor: (x: number, y: number) => void;
  revealProgress: number;
  setRevealProgress: (p: number) => void;
  scrollRevealProgress: number;
  setScrollRevealProgress: (p: number) => void;
}

const HeroInteractionContext = createContext<HeroInteractionContextType | null>(null);

export const HeroInteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [revealMode, setRevealMode] = useState<RevealMode>('idle');
  const [revealProgress, setRevealProgress] = useState(0);
  const [scrollRevealProgress, setScrollRevealProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const revealCountRef = useRef(0);

  const updateCursor = useCallback((x: number, y: number) => {
    setCursorPos({ x, y });
  }, []);

  const startNavReveal = useCallback(() => {
    revealCountRef.current++;
    setRevealMode('reveal');
  }, []);

  const endNavReveal = useCallback(() => {
    revealCountRef.current = Math.max(0, revealCountRef.current - 1);
    if (revealCountRef.current === 0) {
      setRevealMode('idle');
      setRevealProgress(0);
    }
  }, []);

  const isRevealing = revealMode === 'reveal' || revealProgress > 0;

  return (
    <HeroInteractionContext.Provider
      value={{
        revealMode,
        isRevealing,
        cursorPos,
        setRevealMode,
        startNavReveal,
        endNavReveal,
        updateCursor,
        revealProgress,
        setRevealProgress,
        scrollRevealProgress,
        setScrollRevealProgress,
      }}
    >
      {children}
    </HeroInteractionContext.Provider>
  );
};

export const useHeroInteraction = () => {
  const ctx = useContext(HeroInteractionContext);
  if (!ctx) throw new Error('useHeroInteraction must be used within HeroInteractionProvider');
  return ctx;
};
