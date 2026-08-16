import React from 'react';
import { SITE_COPY } from '../../lib/content/siteCopy';
import { Cog, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ManufacturingProcess: React.FC = () => {
  return (
    <section id="manufacturing" className="py-24 bg-navy text-cream relative overflow-hidden">
      {/* Background Subtle Accent Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#6FA23A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-green-brand text-xs font-bold uppercase tracking-wider">
            <Cog className="w-4 h-4 animate-spin-slow" />
            <span>Industrial Operations</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-tight">
            {SITE_COPY.process.title}
          </h2>

          <p className="text-base sm:text-lg text-cream/70 leading-relaxed font-medium">
            {SITE_COPY.process.subtitle}
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {SITE_COPY.process.steps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-navy-deep border border-cream/10 shadow-xl flex flex-col justify-between group hover:border-gold-brand/50 transition-all duration-300"
            >
              <div>
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-3xl font-extrabold text-gold-brand group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-brand" />
                </div>

                <h3 className="font-heading text-lg font-bold text-cream mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-cream/65 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Step Indicator */}
              <div className="mt-6 pt-4 border-t border-cream/10 flex items-center justify-between text-[10px] font-bold text-cream/40 uppercase tracking-widest">
                <span>Phase {index + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-green-brand opacity-80" />
              </div>
            </div>
          ))}
        </div>

        {/* Factory Capacity Guarantee Bar */}
        <div className="mt-16 p-6 rounded-2xl bg-navy-slate/30 border border-gold-brand/30 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-gold-brand shrink-0" />
            <div>
              <p className="font-heading text-lg font-bold text-cream">
                Guaranteed On-Time Production Commitment
              </p>
              <p className="text-xs text-cream/60">
                Pan-India logistics dispatched within agreed SLA dates with batch quality certificates.
              </p>
            </div>
          </div>
          <a
            href="#quote"
            className="px-6 py-3 rounded-xl bg-gold-brand text-navy font-bold text-xs hover:bg-gold-bright transition-colors shrink-0"
          >
            Start Bulk Order Discussion
          </a>
        </div>

      </div>
    </section>
  );
};
