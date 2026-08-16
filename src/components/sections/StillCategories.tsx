import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { StillBagScene } from '../3d/StillBagScene';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StillCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const StillCategories: React.FC<StillCategoriesProps> = ({ onSelectCategory }) => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeBagTypeId, setActiveBagTypeId] = useState<string>('gift-bag');
  const [contentOpacity, setContentOpacity] = useState(1);
  const activeBagTypeIdRef = useRef(activeBagTypeId);

  useEffect(() => {
    activeBagTypeIdRef.current = activeBagTypeId;
  }, [activeBagTypeId]);

  const activeBagType = STILL_COPY.bagTypes.find((b) => b.id === activeBagTypeId) || STILL_COPY.bagTypes[0];
  const bagTypes = STILL_COPY.bagTypes;

  const getVariant = (id: string): 'clear' | 'dawn' | 'dusk' => {
    if (id === 'eco-jute') return 'dawn';
    if (id === 'canvas-tote') return 'clear';
    return 'clear';
  };

  const useGlb = activeBagTypeId === 'gift-bag';

  const switchBagType = useCallback((id: string) => {
    if (id === activeBagTypeIdRef.current) return;

    if (reducedMotion) {
      activeBagTypeIdRef.current = id;
      setActiveBagTypeId(id);
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete() {
        activeBagTypeIdRef.current = id;
        setActiveBagTypeId(id);
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate() {
            setContentOpacity(gsap.getProperty(contentRef.current, 'opacity') as number);
          },
        });
      },
    });
  }, [reducedMotion]);

  // Scroll-driven progression through all three bag types
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${bagTypes.length * 80}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate(self) {
          const index = Math.min(
            bagTypes.length - 1,
            Math.floor(self.progress * bagTypes.length)
          );
          const nextId = bagTypes[index].id;
          if (nextId !== activeBagTypeIdRef.current) {
            switchBagType(nextId);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, switchBagType, bagTypes]);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full h-screen bg-bone overflow-hidden flex flex-col justify-between py-10"
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 flex items-center justify-center">
        <div
          className={`w-[60vh] h-[60vh] rounded-full transition-all duration-700 ${activeBagType.bgGlow}`}
          style={{ opacity: 0.9, transform: 'scale(1.1)' }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] pt-4">
        <div className="flex items-baseline justify-between gap-6 mb-3">
          <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist font-bold">
            <span className="text-ink">02</span>
            <span className="mx-2 text-mist/50">/</span>
            Featured Bag Types
          </div>
          <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist tabular-nums font-bold">
            {activeBagType.num} / 03
          </div>
        </div>

        <h2
          className="font-display font-light leading-[1.0] tracking-[-0.02em] text-ink whitespace-nowrap"
          style={{ fontSize: 'clamp(32px, min(4.6vw, 6.5vh), 64px)' }}
        >
          Three bag types.
        </h2>

        <p className="mt-2 font-sans text-[11px] tracking-[0.18em] uppercase text-mist font-bold hidden sm:block">
          Scroll to explore each type — or tap a number below
        </p>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex-1 min-h-0 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] my-auto flex items-center py-4"
        style={{ opacity: contentOpacity }}
      >
        <div className="grid w-full items-center gap-x-[clamp(16px,3vw,56px)] grid-cols-1 lg:grid-cols-12 gap-y-8">
          
          <div className="lg:col-span-6 min-w-0 space-y-6">
            <div>
              <div className="flex items-baseline justify-between font-sans text-[11px] tracking-[0.22em] uppercase font-bold">
                <span className="font-wordmark font-black tracking-[-0.02em] text-[17px] text-ink normal-case">
                  CARRYSTYLE.{activeBagType.num}
                </span>
                <span className="text-mist">{activeBagType.subtitle}</span>
              </div>

              <h3
                className="mt-3 font-display font-light leading-[0.95] tracking-[-0.015em] text-ink"
                style={{ fontSize: 'clamp(32px, min(4.5vw, 7vh), 64px)' }}
              >
                {activeBagType.name}
                <span style={{ color: activeBagType.accentHex }}>.</span>
              </h3>

              <p className="mt-2 font-serif italic text-mist text-base sm:text-lg">
                {activeBagType.materialTag}
              </p>

              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-ink/80 max-w-[46ch] font-medium">
                {activeBagType.shortDesc}
              </p>
            </div>

            <div className="h-px w-[72px]" style={{ backgroundColor: activeBagType.accentHex }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
              <div className="p-3 rounded-xl bg-white/60 border border-ink/10">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-mist font-bold block">Material</span>
                <span className="font-semibold text-ink leading-tight block mt-0.5">{activeBagType.specsCallouts.material}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/60 border border-ink/10">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-mist font-bold block">Print Method</span>
                <span className="font-semibold text-ink leading-tight block mt-0.5">{activeBagType.specsCallouts.printMethod}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/60 border border-ink/10">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-mist font-bold block">Size Range</span>
                <span className="font-semibold text-ink leading-tight block mt-0.5">{activeBagType.specsCallouts.sizeRange}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/60 border border-ink/10">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-mist font-bold block">Minimum Order</span>
                <span className="font-semibold text-alpine font-heading text-sm block mt-0.5">{activeBagType.specsCallouts.moq}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-ink/15 flex items-center justify-between">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-mist block font-bold">Monthly Production</span>
                <span className="font-display tabular-nums text-ink text-[18px] font-bold">
                  {activeBagType.activeCapacity}{' '}
                  <span className="text-[10px] tracking-[0.18em] uppercase text-mist font-normal">units</span>
                </span>
              </div>
              <button
                onClick={() => onSelectCategory(activeBagType.name)}
                className="px-6 py-2.5 rounded-full bg-ink text-bone font-sans text-xs font-semibold tracking-wider hover:bg-ink-slate transition-colors shadow-md"
              >
                Request Quote →
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[340px] lg:h-[460px] w-full flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-end pr-[2%] pointer-events-none select-none font-wordmark font-black text-[clamp(200px,22vw,360px)] leading-none tracking-[-0.02em] text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(15, 34, 66, 0.08)' }}
            >
              {activeBagType.num}
            </span>
            <div className="w-full h-full relative z-10">
              <StillBagScene
                key={activeBagTypeId}
                variantId={getVariant(activeBagType.id)}
                useGlb={useGlb}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] pt-2 pb-4 flex justify-end">
        <div className="flex items-center gap-6">
          {bagTypes.map((bag) => (
            <button
              key={bag.id}
              type="button"
              onClick={() => switchBagType(bag.id)}
              className="font-sans text-[13px] tracking-[0.18em] uppercase transition-colors duration-300 tabular-nums font-bold"
              style={{ color: activeBagTypeId === bag.id ? '#0F2242' : '#808A9D' }}
              aria-label={`View bag type ${bag.num}: ${bag.name}`}
              aria-current={activeBagTypeId === bag.id ? 'true' : undefined}
            >
              {bag.num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
