import React, { useState } from 'react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../../lib/content/portfolio';
import { Sparkles, Maximize2, Tag, CheckCircle2 } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Corporate', 'Retail', 'Events', 'Eco-Series'];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-cream-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-brand" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
              Past Custom Works Gallery
            </h2>
            <p className="text-base text-navy/70 font-medium">
              Real completed client orders showcasing gold foil damask stamping, 3D embroidery, azo-free screen printing, and custom bag construction.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-navy text-cream shadow-md'
                    : 'bg-white text-navy/70 border border-navy/10 hover:bg-navy/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-navy/10 shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col"
              onClick={() => setActiveItem(item)}
            >
              {/* Image Frame */}
              <div className="relative h-64 w-full overflow-hidden bg-navy-slate/10">
                <img
                  src={item.image}
                  alt={item.clientName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-navy/90 text-cream text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {item.category}
                </div>
                <div className="absolute top-4 right-4 bg-gold-brand text-navy text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  {item.quantity}
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-green-brand transition-colors">
                    {item.clientName}
                  </h3>
                  <p className="text-xs font-semibold text-gold-brand mt-0.5">
                    {item.bagType}
                  </p>
                  <p className="text-xs text-navy/70 mt-2 line-clamp-2 leading-relaxed">
                    {item.highlights}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy/10 flex items-center justify-between text-xs text-navy/60">
                  <span className="font-semibold">{item.printTechnique}</span>
                  <span className="font-bold text-green-brand text-[10px]">VERIFIED ORDER</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-navy/80 text-cream font-bold flex items-center justify-center hover:bg-navy transition-colors"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img
                src={activeItem.image}
                alt={activeItem.clientName}
                className="w-full h-80 md:h-full object-cover"
              />
              <div className="p-8 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-brand/10 text-gold-brand text-xs font-bold">
                  {activeItem.category} • {activeItem.quantity}
                </span>
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {activeItem.clientName}
                </h3>
                <p className="text-xs font-semibold text-navy/60">
                  {activeItem.bagType}
                </p>
                <p className="text-sm text-navy/80 leading-relaxed">
                  {activeItem.highlights}
                </p>
                <div className="p-4 rounded-xl bg-cream-paper border border-navy/10 space-y-2 text-xs">
                  <p className="font-bold text-navy">Order Specifications:</p>
                  <p><span className="text-navy/60">Technique:</span> {activeItem.printTechnique}</p>
                  <p><span className="text-navy/60">Volume Delivered:</span> {activeItem.quantity}</p>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="w-full py-3 rounded-xl bg-navy text-cream font-bold text-xs shadow hover:bg-navy-light"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
