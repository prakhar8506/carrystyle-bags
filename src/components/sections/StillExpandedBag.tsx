import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const StillExpandedBag: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section for the duration of the scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        id: 'expanded-bag-pin',
      });

      // Animate the text fading in and moving up
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expansion-trigger"
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bone pointer-events-none"
    >
      {/* The background here is bone, but the expanding cursor sphere (bg-ink) from StillHero will overlay it. */}
      {/* The text needs a high z-index to sit above the expanded cursor sphere (z-[40]). */}
      <div
        ref={textRef}
        className="relative z-[50] text-center max-w-4xl px-6 flex flex-col items-center gap-6"
      >
        <h2 className="font-display font-light text-white leading-[1.1] tracking-[-0.02em] text-4xl md:text-6xl lg:text-7xl">
          Built for scale.<br />
          <span className="text-alpine font-medium italic">Crafted with precision.</span>
        </h2>
        <p className="font-sans text-white/80 max-w-lg text-sm md:text-base leading-relaxed">
          Experience the finest manufacturing quality with fully customizable features, tailored specifically to elevate your brand's physical presence.
        </p>
      </div>
    </section>
  );
};
