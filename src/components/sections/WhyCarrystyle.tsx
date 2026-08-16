import React from 'react';
import { SITE_COPY } from '../../lib/content/siteCopy';
import { Factory, Sparkles, Layers, Truck } from 'lucide-react';

export const WhyCarrystyle: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="w-8 h-8 text-green-brand" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-gold-brand" />;
      case 'Layers':
        return <Layers className="w-8 h-8 text-wave-teal" />;
      case 'Truck':
        return <Truck className="w-8 h-8 text-wave-blue" />;
      default:
        return <Factory className="w-8 h-8 text-green-brand" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
            <span>Competitive Differentiators</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Why Corporate Clients Choose Carrystyle
          </h2>

          <p className="text-base text-navy/70 font-medium">
            We combine high-volume industrial machinery with meticulous artisanal detail.
          </p>
        </div>

        {/* 4 USP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SITE_COPY.usps.map((usp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-navy/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cream-paper flex items-center justify-center p-3 shadow-inner group-hover:scale-110 transition-transform">
                  {getIcon(usp.icon)}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy group-hover:text-green-brand transition-colors">
                  {usp.title}
                </h3>
                <p className="text-xs text-navy/70 leading-relaxed font-medium">
                  {usp.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy/10 flex items-center space-x-2 text-xs font-bold text-green-brand">
                <span className="w-2 h-2 rounded-full bg-green-brand" />
                <span>Carrystyle Advantage</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
