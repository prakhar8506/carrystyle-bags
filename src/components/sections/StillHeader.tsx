import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';
import { HERO_SEQ_DARK_AT, heroSeqScrollVh } from '../../lib/heroSequence';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StillHeaderProps {
  onOpenQuote: () => void;
}

export const StillHeader: React.FC<StillHeaderProps> = ({ onOpenQuote }) => {
  const { lenis, scrollTo } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onExpanded, setOnExpanded] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      setIsScrolled(lenis.scroll > 50);
    };

    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  // Nav switches to light type while the hero holds the screen dark.
  //
  // Reduced motion renders the hero's dark resting state immediately, so the
  // nav starts light and only reverts once the hero is scrolled away. With
  // motion, the dark range is expressed as absolute scroll positions rather
  // than a `#hero` trigger, because the hero is pinned across that whole range
  // and its own top never advances.
  useEffect(() => {
    if (reducedMotion) {
      setOnExpanded(true);
      const st = ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom 12%',
        onToggle: (self) => setOnExpanded(!self.isActive),
      });
      return () => st.kill();
    }

    const st = ScrollTrigger.create({
      start: () => window.innerHeight * heroSeqScrollVh() * HERO_SEQ_DARK_AT,
      end: () => window.innerHeight * (heroSeqScrollVh() + 1),
      invalidateOnRefresh: true,
      onToggle: (self) => setOnExpanded(self.isActive),
    });
    return () => st.kill();
  }, [reducedMotion]);

  const navLinks = [
    { name: 'Bag Types', href: '#categories' },
    { name: 'Craftsmanship', href: '#inside' },
    { name: 'Story', href: '#story' },
    { name: 'Clients', href: '#stockists' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -72 });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          onExpanded
            ? 'bg-transparent py-5'
            : isScrolled
              ? 'bg-bone/90 backdrop-blur-md border-b border-ink/10 py-3 shadow-sm'
              : 'bg-transparent py-5'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <div className="mx-auto h-full max-w-[1440px] flex items-center justify-between px-5 md:px-8">
          <div className="flex-1 md:flex-none">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className={`inline-flex items-baseline font-wordmark leading-none group cursor-pointer transition-colors duration-300 ${
                onExpanded ? 'text-bone' : 'text-ink'
              }`}
              style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px' }}
              aria-label="CARRYSTYLE. — back to top"
            >
              <span>{STILL_COPY.brand.wordmark}</span>
              <span
                aria-hidden="true"
                className="inline-block bg-alpine align-baseline transition-transform group-hover:scale-125"
                style={{ width: '8px', height: '8px', marginLeft: '2px' }}
              />
            </a>
          </div>

          <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-underline font-sans transition-colors duration-250 text-sm tracking-wider cursor-pointer ${
                    onExpanded ? 'text-bone/70 hover:text-bone' : 'text-mist hover:text-ink'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-5 md:flex-none">
            <button
              onClick={onOpenQuote}
              className={`hidden md:inline-flex items-center font-sans group text-sm font-medium tracking-wider gap-1.5 cursor-pointer transition-colors duration-300 ${
                onExpanded ? 'text-bone' : 'text-ink'
              }`}
            >
              <span>Get a Quote</span>
              <span aria-hidden="true" className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenQuote}
              className={`relative inline-flex items-center justify-center transition-colors p-1 cursor-pointer ${
                onExpanded ? 'text-bone hover:text-bone/70' : 'text-ink hover:text-mist'
              }`}
              aria-label="Open quote cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-alpine text-white text-[9px] font-bold flex items-center justify-center">
                1
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 cursor-pointer transition-colors duration-300 ${
                onExpanded ? 'text-bone' : 'text-ink'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className={`block h-[1.5px] w-full ${onExpanded ? 'bg-bone' : 'bg-ink'}`} />
                <span className={`block h-[1.5px] w-full ${onExpanded ? 'bg-bone' : 'bg-ink'}`} />
                <span className={`block h-[1.5px] w-full ${onExpanded ? 'bg-bone' : 'bg-ink'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-bone flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-ink cursor-pointer"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans text-ink text-3xl font-semibold tracking-tight cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="font-sans text-ink mt-4 inline-flex items-center text-xl font-medium tracking-wider gap-2 cursor-pointer"
            >
              <span>Get a Quote</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
