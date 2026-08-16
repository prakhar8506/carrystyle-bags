import React, { useState } from 'react';
import { SITE_COPY } from '../../lib/content/siteCopy';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

interface CustomizationProps {
  onOpenQuote: (techniqueName?: string) => void;
}

export const Customization: React.FC<CustomizationProps> = ({ onOpenQuote }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [activeTechnique, setActiveTechnique] = useState(SITE_COPY.customization.techniques[0].id);

  const selectedTech = SITE_COPY.customization.techniques.find((t) => t.id === activeTechnique) || SITE_COPY.customization.techniques[0];

  return (
    <section id="customization" className="py-24 bg-cream-paper relative overflow-hidden">
      {/* Subtle Warm Gold Glow Background Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-brand/10 border border-gold-brand/30 text-gold-brand text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{SITE_COPY.customization.goldCallout}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            {SITE_COPY.customization.title}
          </h2>

          <p className="text-base sm:text-lg text-navy/70 leading-relaxed font-medium">
            {SITE_COPY.customization.subtitle}
          </p>
        </div>

        {/* Interactive Before/After Craftsmanship Slider Card */}
        <div className="rounded-3xl bg-white border border-gold-brand/30 shadow-2xl p-6 sm:p-10 mb-16 gold-cartouche-border relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Before/After Interactive Visual Slider Container */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-inner bg-cream-dark select-none border border-navy/10">
              
              {/* Layer 1: After (Gold Foil Damask Printed Bag) */}
              <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-gold-brand/10 flex items-center justify-center p-6">
                <div className="w-64 h-80 relative bg-white rounded-xl border-2 border-gold-brand p-6 shadow-xl flex flex-col items-center justify-center text-center">
                  <div className="absolute -top-6 w-24 h-10 border-4 border-navy border-b-0 rounded-t-full" />
                  
                  {/* Ornate Gold Cartouche Printed Crest */}
                  <div className="w-full h-full border-2 border-gold-brand p-3 rounded-lg flex flex-col items-center justify-center space-y-2 bg-gold-brand/5">
                    <div className="flex items-center space-x-1 text-3xl font-extrabold font-heading">
                      <span className="text-navy">C</span>
                      <span className="text-green-brand">S</span>
                    </div>
                    <p className="text-xs font-bold tracking-widest text-navy uppercase">CARRYSTYLE</p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-wave-teal to-wave-blue" />
                    <p className="text-[10px] font-bold text-gold-brand uppercase">24k Metallic Foil Damask</p>
                  </div>
                </div>
              </div>

              {/* Layer 2: Before (Plain Blank Raw Canvas Bag) - Clipped by Slider */}
              <div
                className="absolute inset-y-0 left-0 bg-cream-paper border-r-2 border-gold-brand flex items-center justify-center p-6 overflow-hidden transition-all"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="w-64 h-80 relative bg-cream-paper rounded-xl border border-navy/20 p-6 shadow flex flex-col items-center justify-center text-center shrink-0">
                  <div className="absolute -top-6 w-24 h-10 border-4 border-navy/40 border-b-0 rounded-t-full" />
                  
                  {/* Blank Fabric Texture */}
                  <div className="w-full h-full border border-dashed border-navy/20 p-3 rounded-lg flex flex-col items-center justify-center space-y-2">
                    <p className="text-xs font-bold text-navy/40 uppercase">Plain Craft Fabric</p>
                    <p className="text-[10px] text-navy/30">Raw Cotton / Jute</p>
                  </div>
                </div>
              </div>

              {/* Drag Handle Overlay */}
              <div
                className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-9 h-9 rounded-full bg-gold-brand text-navy font-bold shadow-2xl border-2 border-white flex items-center justify-center text-xs transform -translate-x-1/2">
                  ↔
                </div>
              </div>

              {/* Range Input Slider for Mouse/Touch */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                aria-label="Before after reveal slider"
              />

              {/* Labels */}
              <div className="absolute bottom-3 left-4 bg-navy/80 backdrop-blur-md text-cream text-[10px] font-bold px-2.5 py-1 rounded-md">
                BEFORE: Raw Fabric
              </div>
              <div className="absolute bottom-3 right-4 bg-gold-brand text-navy text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                AFTER: Gold Foil Printed
              </div>
            </div>

            {/* Right: Technique Tabs & Callout Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">
                  Explore Printing Options
                </h3>
                <p className="text-xs font-semibold text-gold-brand mt-1">
                  Drag slider to see transformation • Pick a technique below
                </p>
              </div>

              {/* Technique Selector Tabs */}
              <div className="grid grid-cols-2 gap-2">
                {SITE_COPY.customization.techniques.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTechnique(tech.id)}
                    className={`p-3 rounded-xl text-left text-xs font-bold transition-all border ${
                      activeTechnique === tech.id
                        ? 'bg-navy text-cream border-gold-brand shadow-md'
                        : 'bg-white text-navy/80 border-navy/10 hover:border-navy/30'
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>

              {/* Active Technique Specs Box */}
              <div className="p-5 rounded-2xl bg-cream-paper border border-navy/10 space-y-3">
                <h4 className="font-heading text-lg font-bold text-navy">
                  {selectedTech.name}
                </h4>
                <p className="text-xs text-navy/70 leading-relaxed font-medium">
                  {selectedTech.desc}
                </p>
                <div className="pt-2 border-t border-navy/10 flex items-center justify-between text-xs font-semibold">
                  <span className="text-navy/50">Minimum Order:</span>
                  <span className="text-gold-brand font-bold">{selectedTech.moq}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-navy/50">Ideal Application:</span>
                  <span className="text-navy font-bold">{selectedTech.idealFor}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenQuote(selectedTech.name)}
                className="w-full py-3.5 rounded-xl bg-gold-brand text-navy font-bold text-sm shadow-xl hover:bg-gold-bright transition-all flex items-center justify-center space-x-2"
              >
                <span>Request Sample With {selectedTech.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
