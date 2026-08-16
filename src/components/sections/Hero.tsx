import React from 'react';
import { ArrowRight, ShieldCheck, Factory, Sparkles } from 'lucide-react';
import { Scene } from '../3d/Scene';
import { SceneFallback } from '../3d/SceneFallback';
import { ScrollCue } from '../ui/ScrollCue';
import { SITE_COPY } from '../../lib/content/siteCopy';

interface HeroProps {
  scrollProgress: number;
  printProgress: number;
  useWebGL: boolean;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  scrollProgress,
  printProgress,
  useWebGL,
  onOpenQuote,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-cream">
      {/* Background Subtle Gradient Wash */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wave-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gold-brand/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
        
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-navy text-xs font-bold tracking-wide">
            <Factory className="w-4 h-4 text-green-brand" />
            <span>DIRECT BAG MANUFACTURER • MUMBAI & NCR</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.1]">
            Bags, Built For Your <span className="gold-shimmer-text">Brand.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-navy/70 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {SITE_COPY.hero.subheadline}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy text-cream font-bold text-base shadow-xl shadow-navy/20 hover:shadow-2xl hover:bg-navy-light transition-all duration-300 flex items-center justify-center space-x-3 border border-gold-brand/50 group"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-5 h-5 text-gold-brand group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#products"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-cream-paper hover:bg-cream-dark text-navy font-bold text-base border border-navy/15 transition-all duration-300 text-center"
            >
              Explore Products
            </a>
          </div>

          {/* Trust Badges Bar */}
          <div className="pt-6 border-t border-navy/10 grid grid-cols-3 gap-4 text-left">
            <div>
              <p className="font-heading text-xl font-bold text-navy">50,000+</p>
              <p className="text-xs font-semibold text-navy/60">Bags / Month</p>
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-green-brand">100 Units</p>
              <p className="text-xs font-semibold text-navy/60">Low MOQ Option</p>
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-gold-brand">24k Gold</p>
              <p className="text-xs font-semibold text-navy/60">Foil Precision</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas */}
        <div className="lg:col-span-6 h-[480px] sm:h-[540px] lg:h-[600px] w-full relative flex items-center justify-center">
          {useWebGL ? (
            <Scene
              scrollProgress={scrollProgress}
              printProgress={printProgress}
            />
          ) : (
            <SceneFallback printProgress={printProgress} />
          )}

          {/* Interactive Hint */}
          <div className="absolute bottom-4 right-4 bg-navy/80 backdrop-blur-md text-cream text-[10px] font-bold px-3 py-1.5 rounded-full border border-gold-brand/30 flex items-center space-x-1.5 pointer-events-none shadow-lg">
            <Sparkles className="w-3 h-3 text-gold-brand animate-pulse" />
            <span>3D Interactive Model • Drag to Rotate</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex justify-center pt-4 relative z-10">
        <ScrollCue />
      </div>
    </section>
  );
};
