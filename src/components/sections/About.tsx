import React from 'react';
import { CheckCircle2, Factory, Award, Shield, Users } from 'lucide-react';
import { SITE_COPY } from '../../lib/content/siteCopy';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-cream-paper relative overflow-hidden border-t border-b border-navy/5">
      {/* Background Accent Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-brand/10 text-green-brand text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            <span>Manufacturing Scale & Credibility</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            {SITE_COPY.about.title}
          </h2>

          <p className="text-base sm:text-lg text-navy/70 leading-relaxed font-medium">
            {SITE_COPY.about.subtitle}
          </p>
        </div>

        {/* Editorial Pull Quote Frame */}
        <div className="relative rounded-2xl bg-cream p-8 sm:p-12 border border-navy/10 shadow-xl max-w-4xl mx-auto mb-16 gold-cartouche-border">
          <div className="absolute top-4 left-6 text-6xl font-serif text-gold-brand/30 leading-none">“</div>
          <blockquote className="text-lg sm:text-xl text-navy font-semibold italic text-center relative z-10 px-4 leading-relaxed">
            {SITE_COPY.about.quote}
          </blockquote>
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs font-bold tracking-widest text-gold-brand uppercase">
            <Award className="w-4 h-4" />
            <span>ISO Certified Quality Assurance • Direct Factory Dispatch</span>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_COPY.about.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-navy/10 shadow-md hover:shadow-xl transition-all duration-300 group text-center"
            >
              <p className="font-heading text-3xl sm:text-4xl font-extrabold text-navy group-hover:text-green-brand transition-colors">
                {metric.value}
              </p>
              <p className="text-xs font-bold text-gold-brand uppercase tracking-wider mt-1">
                {metric.unit}
              </p>
              <p className="text-sm font-semibold text-navy/70 mt-2">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Manufacturing Strengths List */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-navy/10">
          <div className="flex items-center space-x-3 text-navy">
            <CheckCircle2 className="w-5 h-5 text-green-brand shrink-0" />
            <span className="text-sm font-semibold">100% In-House Production & Cutting</span>
          </div>
          <div className="flex items-center space-x-3 text-navy">
            <CheckCircle2 className="w-5 h-5 text-green-brand shrink-0" />
            <span className="text-sm font-semibold">Zero-Lead Water-Based Eco Inks</span>
          </div>
          <div className="flex items-center space-x-3 text-navy">
            <CheckCircle2 className="w-5 h-5 text-green-brand shrink-0" />
            <span className="text-sm font-semibold">Strict Pan-India Doorstep Dispatch</span>
          </div>
        </div>

      </div>
    </section>
  );
};
