import gsap from 'gsap';

/** Off-canvas park distance in world units — past the camera frustum. */
export const WHOOSH_X = 8.4;

type Slide = { x: number; o: number };

/** Discrete frame state for the categories bag stage. Not a scrubbed track. */
export const categoryCarousel = {
  index: 0,
  slides: [
    { x: 0, o: 1 },
    { x: WHOOSH_X, o: 0 },
    { x: WHOOSH_X, o: 0 },
  ] as Slide[],
};

let whooshTl: gsap.core.Timeline | null = null;

export function parkSlides(index: number) {
  whooshTl?.kill();
  whooshTl = null;
  categoryCarousel.index = index;
  categoryCarousel.slides.forEach((slide, i) => {
    slide.x = i === index ? 0 : WHOOSH_X;
    slide.o = i === index ? 1 : 0;
  });
}

/** Whoosh the outgoing bag off one side and bring the next in from the other. */
export function whooshTo(next: number, reducedMotion = false) {
  const from = categoryCarousel.index;
  if (next === from) return;
  if (next < 0 || next >= categoryCarousel.slides.length) return;

  if (reducedMotion) {
    parkSlides(next);
    return;
  }

  const dir = next > from ? 1 : -1;
  const outgoing = categoryCarousel.slides[from];
  const incoming = categoryCarousel.slides[next];

  incoming.x = dir * WHOOSH_X;
  incoming.o = 0;

  categoryCarousel.slides.forEach((slide, i) => {
    if (i !== from && i !== next) {
      slide.o = 0;
      slide.x = WHOOSH_X;
    }
  });

  whooshTl?.kill();
  whooshTl = gsap.timeline({
    defaults: { overwrite: 'auto' },
    onComplete: () => {
      categoryCarousel.slides.forEach((slide, i) => {
        if (i !== next) {
          slide.x = WHOOSH_X;
          slide.o = 0;
        }
      });
    },
  });

  whooshTl.to(
    outgoing,
    { x: -dir * WHOOSH_X, o: 0, duration: 0.42, ease: 'power3.in' },
    0,
  );
  whooshTl.fromTo(
    incoming,
    { x: dir * WHOOSH_X, o: 0 },
    { x: 0, o: 1, duration: 0.7, ease: 'expo.out' },
    0.12,
  );

  categoryCarousel.index = next;
}
