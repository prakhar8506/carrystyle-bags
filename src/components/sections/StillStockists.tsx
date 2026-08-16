import React from 'react';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { Building2, Hotel, Briefcase, Leaf } from 'lucide-react';

const CATEGORY_ICONS = [Hotel, Briefcase, Leaf];

export const StillStockists: React.FC = () => {
  return (
    <section id="stockists" className="py-24 bg-bone border-t border-ink/10 relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="font-sans uppercase text-mist text-xs font-semibold tracking-[0.4em]">
            <span className="text-ink font-bold">05</span>
            <span className="mx-2 text-mist/50">/</span>
            CLIENTS & INDUSTRIES
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight">
            {STILL_COPY.stockists.headline}
          </h2>

          <p className="text-mist text-sm font-medium leading-relaxed">
            {STILL_COPY.stockists.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STILL_COPY.stockists.categories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[idx] || Building2;
            return (
              <div
                key={cat.title}
                className="p-8 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-alpine/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-alpine" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-ink/75 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-mist max-w-2xl mx-auto leading-relaxed border-t border-ink/10 pt-8">
          {STILL_COPY.stockists.note}
        </p>

      </div>
    </section>
  );
};
