import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { IngredientBagDetail } from '../3d/IngredientBagDetail';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const StillCraftsmanship: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeIngredientId, setActiveIngredientId] = useState<string>('gold-foil');
  const contentRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeIngredientId);

  const activeIngredient = STILL_COPY.craftsmanship.ingredients.find((i) => i.id === activeIngredientId) || STILL_COPY.craftsmanship.ingredients[0];

  const switchTab = useCallback((id: string) => {
    if (id === activeIdRef.current) return;
    activeIdRef.current = id;

    if (reducedMotion || !contentRef.current) {
      setActiveIngredientId(id);
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete() {
        setActiveIngredientId(id);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', overwrite: 'auto' }
        );
      },
    });
  }, [reducedMotion]);

  return (
    <section id="inside" className="relative w-full bg-ink text-bone overflow-hidden flex flex-col justify-between py-16 min-h-screen">
      
      <div className="shrink-0 pb-2 z-20 flex flex-col items-center text-center">
        <div className="font-sans uppercase text-bone/50 text-xs tracking-[0.4em]">
          <span className="text-bone font-bold">{STILL_COPY.craftsmanship.sectionNum}</span>
          <span className="mx-2 text-bone/30">·</span>
          {STILL_COPY.craftsmanship.label}
        </div>

        <h2
          className="mt-3 font-display italic text-bone tracking-[-0.01em] font-light"
          style={{ fontSize: 'clamp(36px, 4.4vw, 56px)' }}
        >
          {STILL_COPY.craftsmanship.headline}
        </h2>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
          {STILL_COPY.craftsmanship.ingredients.map((ing) => (
            <button
              key={ing.id}
              type="button"
              onClick={() => switchTab(ing.id)}
              className="font-sans uppercase transition-all duration-300 flex items-center justify-center rounded-full text-xs font-semibold tracking-[0.25em] px-5 py-2.5 border"
              style={{
                backgroundColor: activeIngredientId === ing.id ? '#FAFAF8' : 'transparent',
                color: activeIngredientId === ing.id ? '#0F2242' : '#FAFAF8',
                borderColor: activeIngredientId === ing.id ? '#FAFAF8' : 'rgba(250, 250, 248, 0.3)',
                opacity: activeIngredientId === ing.id ? 1 : 0.65,
              }}
            >
              {ing.title}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="flex-1 flex items-center min-h-0 w-full my-auto py-8 will-change-transform">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,4vw,48px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-y-8 md:gap-x-[clamp(16px,2.4vw,48px)]">
            
            <div className="md:col-span-4 z-10 text-center md:text-left">
              <h3 className="font-wordmark text-bone leading-[0.9] uppercase text-[clamp(28px,4vw,44px)] font-black tracking-tight">
                {activeIngredient.title}
              </h3>
              
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                <Sparkles className="w-6 h-6 text-gold" />
                <p className="font-serif italic text-bone/60 text-lg">
                  {activeIngredient.latin}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 relative flex items-center justify-center h-[280px] md:h-[420px]">
              <div
                className="absolute rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: activeIngredient.accentHex,
                  width: '65%',
                  height: '65%',
                  filter: 'blur(100px)',
                  opacity: 0.45,
                }}
              />
              <IngredientBagDetail key={activeIngredientId} activeIngredientId={activeIngredientId} />
            </div>

            <div className="md:col-span-4 z-10 text-left space-y-4 max-w-sm mx-auto md:mx-0">
              <div className="font-sans uppercase text-bone/50 text-xs tracking-[0.4em]">
                {activeIngredient.num}
              </div>

              <p className="text-bone text-[15px] leading-[1.6]">
                {activeIngredient.description}
              </p>

              <div className="pt-4 border-t border-bone/15 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">Source</span>
                  <span className="font-sans text-[13px] text-bone font-medium">{activeIngredient.source}</span>
                </div>

                <div className="flex items-baseline justify-between border-t border-bone/15 pt-3">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">Role</span>
                  <span className="font-sans text-[13px] text-bone font-medium">{activeIngredient.role}</span>
                </div>

                <div className="border-t border-bone/15 pt-3 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">Specification</span>
                    <span className="font-display tabular-nums text-bone text-[17px] leading-none font-bold">
                      {activeIngredient.dose}{' '}
                      <span className="text-[10px] tracking-[0.18em] uppercase text-bone/60 font-normal">
                        {activeIngredient.doseTotal}
                      </span>
                    </span>
                  </div>

                  <div className="h-1 w-full bg-bone/15 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: `${activeIngredient.progress * 100}%`,
                        backgroundColor: activeIngredient.accentHex,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="shrink-0 text-center pointer-events-none pb-4">
        <div className="font-sans uppercase text-bone/60 text-xs font-semibold tracking-[0.4em]">
          {STILL_COPY.craftsmanship.subtitle}
        </div>
      </div>

    </section>
  );
};
