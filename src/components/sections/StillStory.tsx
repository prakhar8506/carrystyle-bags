import React from 'react';
import { STILL_COPY } from '../../lib/content/stillCopy';

export const StillStory: React.FC = () => {
  return (
    <section id="story" className="relative w-full bg-bone py-24">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <div className="font-sans uppercase text-mist text-xs font-semibold tracking-[0.6em]">
            <span className="text-ink font-bold">{STILL_COPY.story.sectionNum}</span>
            <span className="mx-2 text-mist/50">/</span>
            {STILL_COPY.story.label}
          </div>

          <h2
            className="font-display text-ink leading-[1.05] font-light tracking-[-0.01em]"
            style={{ fontSize: 'clamp(36px, 5.6vw, 68px)' }}
          >
            {STILL_COPY.story.headline}
          </h2>

          <p className="text-ink/80 text-base sm:text-lg leading-[1.55] max-w-[540px] mx-auto">
            {STILL_COPY.story.body}
          </p>
        </div>

        {/* Figure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STILL_COPY.story.figures.map((fig) => (
            <div key={fig.figNum} className="space-y-3 group">
              <figure className="relative w-full overflow-hidden bg-ink/5 aspect-[4/5] rounded-xl border border-ink/10 shadow-md">
                <img
                  src={fig.image}
                  alt={fig.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-ink/80 text-bone text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {fig.year}
                </div>
              </figure>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-alpine shrink-0" />
                <span className="font-sans uppercase text-mist tracking-widest text-[10px]">
                  FIG. {fig.figNum} · {fig.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
