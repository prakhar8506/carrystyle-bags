import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { StillBagScene } from '../3d/StillBagScene';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { parkSlides, whooshTo } from '../../lib/categoryCarousel';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

interface StillCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

const PIN_ID = 'categories-pin';

export const StillCategories: React.FC<StillCategoriesProps> = ({ onSelectCategory }) => {
  const reducedMotion = useReducedMotion();
  const { lenis } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const bagTypes = STILL_COPY.bagTypes;
  const lastIndex = bagTypes.length - 1;
  const activeBagType = bagTypes[activeIndex] || bagTypes[0];
  const palette = activeBagType.palette;

  const switchFrame = useCallback((next: number) => {
    if (next === activeIndexRef.current) return;
    const dir = next > activeIndexRef.current ? 1 : -1;
    activeIndexRef.current = next;

    whooshTo(next, reducedMotion);

    glowRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === next ? 1 : 0, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
    });

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: bagTypes[next].palette.wash,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    const reveal = () => {
      setActiveIndex(next);
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: dir * 36 },
        { opacity: 1, x: 0, duration: 0.55, ease: 'expo.out', overwrite: 'auto' },
      );
    };

    if (reducedMotion || !contentRef.current) {
      reveal();
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      x: dir * -24,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: reveal,
    });
  }, [reducedMotion, bagTypes]);

  useEffect(() => {
    if (!sectionRef.current) {
      parkSlides(0);
      return;
    }

    if (reducedMotion) {
      parkSlides(0);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: PIN_ID,
        trigger: sectionRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * lastIndex,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const index = Math.min(
            lastIndex,
            Math.max(0, Math.round(self.progress * lastIndex)),
          );
          switchFrame(index);
        },
        onRefresh(self) {
          const index = Math.min(
            lastIndex,
            Math.max(0, Math.round(self.progress * lastIndex)),
          );
          if (index === activeIndexRef.current) {
            parkSlides(index);
          } else {
            switchFrame(index);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      parkSlides(0);
    };
  }, [reducedMotion, switchFrame, lastIndex]);

  const goToIndex = (index: number) => {
    const st = ScrollTrigger.getById(PIN_ID);
    if (!st || reducedMotion) {
      switchFrame(index);
      return;
    }
    const y = st.start + (st.end - st.start) * (index / lastIndex);
    if (lenis) lenis.scrollTo(y, { duration: 0.7 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const specs = [
    { label: 'Material', value: activeBagType.specsCallouts.material },
    { label: 'Print', value: activeBagType.specsCallouts.printMethod },
    { label: 'Size', value: activeBagType.specsCallouts.sizeRange },
    { label: 'Minimum', value: activeBagType.specsCallouts.moq, accent: true },
  ];

  return (
    <section
      ref={sectionRef}
      id="categories"
      data-active-bag={activeBagType.id}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: palette.wash, color: palette.ink }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(28px,7vw,128px)] pt-12">
        <div className="flex items-baseline justify-between gap-6 mb-5">
          <div
            className="font-sans text-[11px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: palette.muted }}
          >
            <span style={{ color: palette.accent }}>02</span>
            <span className="mx-2 opacity-40">/</span>
            Featured Bag Types
          </div>
          <div
            className="font-sans text-[11px] tracking-[0.22em] uppercase tabular-nums font-semibold"
            style={{ color: palette.muted }}
          >
            {activeBagType.num} / 03
          </div>
        </div>

        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(28px, min(4.2vw, 5.8vh), 52px)', color: palette.ink }}
        >
          Three bag types.
        </h2>
      </div>

      <div className="relative z-10 flex-1 min-h-0 mx-auto w-full max-w-[1440px] px-[clamp(28px,7vw,128px)] flex items-center">
        <div className="grid w-full items-center gap-x-[clamp(32px,5vw,80px)] grid-cols-1 lg:grid-cols-12">
          <div ref={contentRef} className="lg:col-span-5 min-w-0">
            <div className="flex items-baseline justify-between gap-4">
              <span
                className="font-wordmark font-black tracking-[-0.03em] text-[15px] normal-case"
                style={{ color: palette.ink }}
              >
                CARRYSTYLE.{activeBagType.num}
              </span>
              <span
                className="font-sans text-[10px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: palette.muted }}
              >
                {activeBagType.subtitle}
              </span>
            </div>

            <h3
              className="mt-6 font-display font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(30px, min(4.1vw, 6.2vh), 56px)', color: palette.ink }}
            >
              {activeBagType.name}
              <span style={{ color: palette.accent }}>.</span>
            </h3>

            <p
              className="mt-5 font-serif italic text-[17px] sm:text-[19px] leading-snug"
              style={{ color: palette.accent }}
            >
              {activeBagType.materialTag}
            </p>

            <p
              className="mt-5 text-[15px] leading-[1.75] font-normal max-w-[38ch]"
              style={{ color: palette.ink, opacity: 0.72 }}
            >
              {activeBagType.shortDesc}
            </p>

            <div className="mt-10 h-px w-14" style={{ backgroundColor: palette.line }} />

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt
                    className="font-sans text-[9px] tracking-[0.22em] uppercase font-semibold"
                    style={{ color: palette.muted }}
                  >
                    {spec.label}
                  </dt>
                  <dd
                    className="mt-2 text-[13px] leading-snug font-medium"
                    style={{ color: spec.accent ? palette.accent : palette.ink }}
                  >
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex items-end justify-between gap-6">
              <div>
                <span
                  className="font-sans text-[9px] tracking-[0.22em] uppercase font-semibold block"
                  style={{ color: palette.muted }}
                >
                  Monthly production
                </span>
                <span
                  className="font-display tabular-nums text-[22px] font-light mt-1 block"
                  style={{ color: palette.ink }}
                >
                  {activeBagType.activeCapacity}
                  <span
                    className="ml-2 font-sans text-[9px] tracking-[0.18em] uppercase font-semibold"
                    style={{ color: palette.muted }}
                  >
                    units
                  </span>
                </span>
              </div>
              <button
                onClick={() => onSelectCategory(activeBagType.name)}
                className="px-6 py-3 rounded-full font-sans text-[11px] font-semibold tracking-[0.14em] uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: palette.ctaBg, color: palette.ctaFg }}
              >
                Request Quote
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[360px] lg:h-[500px] w-full">
            {bagTypes.map((bag, i) => (
              <div
                key={bag.id}
                ref={(el) => { glowRefs.current[i] = el; }}
                className={`absolute left-1/2 top-[48%] w-[90%] h-[90%] rounded-full pointer-events-none ${bag.bgGlow}`}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: 'translate(-50%, -50%) scale(1.4)',
                }}
              />
            ))}
            <div className="bag-stage-shadow z-[1]" />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-end pr-[4%] pointer-events-none select-none font-wordmark font-black text-[clamp(180px,20vw,320px)] leading-none tracking-[-0.04em] text-transparent"
              style={{ WebkitTextStroke: `1.5px ${palette.numberStroke}` }}
            >
              {activeBagType.num}
            </span>
            <div className="absolute inset-0 z-10 overflow-hidden">
              <StillBagScene />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(28px,7vw,128px)] pb-10 pt-4 flex justify-end">
        <div className="flex items-center gap-8">
          {bagTypes.map((bag, i) => (
            <button
              key={bag.id}
              type="button"
              onClick={() => goToIndex(i)}
              className="font-sans text-[12px] tracking-[0.2em] uppercase tabular-nums font-semibold transition-colors duration-300"
              style={{ color: i === activeIndex ? palette.ink : palette.serialIdle }}
              aria-label={`View bag type ${bag.num}: ${bag.name}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              {bag.num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
