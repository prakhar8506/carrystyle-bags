import React, { useState, useEffect, useRef } from 'react';
import { HeroLensCursor } from '../3d/HeroLensCursor';
import { STILL_COPY } from '../../lib/content/stillCopy';

interface StillHeroProps {
  onOpenQuote: () => void;
}

export const StillHero: React.FC<StillHeroProps> = () => {
  const [lettersVisible, setLettersVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLettersVisible(true), 200);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const wordmarkText = STILL_COPY.brand.wordmark;

  return (
    <section
      ref={heroRef}
      id="hero"
      data-hero-cursor
      className="relative w-full min-h-screen bg-bone flex flex-col justify-between pt-20 select-none cursor-none"
    >
      {/* Giant wordmark — sits behind the lens layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-2 sm:px-6 overflow-hidden pointer-events-none">
        <h1
          ref={headlineRef}
          className="font-wordmark font-black leading-[0.76] tracking-[-0.045em] whitespace-nowrap text-ink text-center w-full pointer-events-none"
          style={{ fontSize: 'clamp(64px, 19.5vw, 300px)' }}
        >
          <span className="inline-block">
            <span className="sr-only">CARRYSTYLE.</span>
            {wordmarkText.split('').map((char, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="inline-block transition-opacity duration-700 ease-out"
                style={{
                  opacity: lettersVisible ? 1 : 0,
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                {char}
              </span>
            ))}
            <span
              aria-hidden="true"
              className="inline-block align-baseline transition-opacity duration-700 ease-out"
              style={{
                opacity: lettersVisible ? 1 : 0,
                transitionDelay: `${wordmarkText.length * 40}ms`,
                marginLeft: '0.04em',
                verticalAlign: 'baseline',
              }}
            >
              <span
                className="inline-block bg-alpine rounded-[2px]"
                style={{
                  width: 'clamp(10px, 0.14em, 36px)',
                  height: 'clamp(10px, 0.14em, 36px)',
                  transform: 'translateY(0.06em)',
                }}
              />
            </span>
          </span>
        </h1>
      </div>

      {/* Cursor sphere + lens reveal */}
      <HeroLensCursor heroRef={heroRef} headlineRef={headlineRef} isMobile={isMobile} active />

      {/* Left support panel — alpine green to pair with ink wordmark */}
      <div className="absolute top-24 left-6 sm:left-12 z-30 hidden xl:flex flex-col justify-start pointer-events-none max-w-[260px]">
        <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-alpine/70 font-bold">
          <span className="text-alpine">{STILL_COPY.hero.step}</span>
          <span className="mx-2 text-alpine/35">/</span>
          <span className="text-alpine">{STILL_COPY.hero.label}</span>
        </div>

        <h2 className="mt-3 font-display font-light leading-[1.12] tracking-[-0.01em] text-alpine text-lg sm:text-xl">
          {STILL_COPY.hero.headline}
        </h2>

        <div className="mt-4 h-px w-[48px] bg-alpine" />

        <p className="mt-4 text-xs leading-relaxed text-alpine/80 font-medium">
          {STILL_COPY.hero.description}
        </p>

        <div className="mt-5 flex items-baseline gap-4 font-sans text-xs text-alpine/70 font-semibold">
          <span>
            <span className="font-display font-bold text-alpine text-sm tabular-nums">
              {STILL_COPY.hero.metrics.capacity}
            </span>{' '}
            {STILL_COPY.hero.metrics.capacityLabel}
          </span>
          <span className="text-alpine/35">·</span>
          <span>
            <span className="font-display font-bold text-alpine text-sm tabular-nums">
              {STILL_COPY.hero.metrics.leadTime}
            </span>{' '}
            {STILL_COPY.hero.metrics.leadTimeLabel}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-30 inset-x-0 bottom-0 flex items-end justify-between px-[clamp(24px,4vw,64px)] pb-[clamp(20px,4vh,44px)] mt-auto pointer-events-none">
        <p
          className="font-display font-light text-ink leading-[1.15] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 20px)' }}
        >
          {STILL_COPY.brand.tagline.split('. ')[0]}.<br />
          {STILL_COPY.brand.tagline.split('. ')[1]}.
        </p>

        <div className="flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-mist font-bold">
            Hover Text To Reveal • Scroll
          </span>
          <span
            className="relative block"
            style={{
              width: '20px',
              height: '34px',
              border: '1px solid rgba(15, 34, 66, 0.3)',
              borderRadius: '10px',
            }}
          >
            <span
              className="absolute left-1/2 -translate-x-1/2 bg-alpine rounded-full animate-bounce"
              style={{ top: '6px', width: '4px', height: '4px' }}
            />
          </span>
        </div>

        <p
          className="font-sans uppercase text-mist text-right hidden sm:block"
          style={{ fontSize: '10px', letterSpacing: '0.24em', lineHeight: 1.8 }}
        >
          HIGH VOLUME MANUFACTURING<br />
          {STILL_COPY.brand.location}
        </p>
      </div>
    </section>
  );
};
