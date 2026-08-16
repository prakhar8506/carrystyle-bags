import React from 'react';
import { CLIENT_LOGOS, TESTIMONIALS } from '../../lib/content/testimonials';
import { Star, Quote, Building2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-green-brand" />
            <span>Trusted By Corporate Procurement Leaders</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Client Partners & Reviews
          </h2>
        </div>

        {/* Client Logo Infinite Marquee Ticker */}
        <div className="relative w-full overflow-hidden bg-white border-y border-navy/10 py-6 mb-16 shadow-inner">
          <div className="flex space-x-12 animate-marquee whitespace-nowrap">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 text-navy/40 font-heading font-extrabold text-lg sm:text-xl tracking-wider uppercase hover:text-navy transition-colors select-none"
              >
                <span className="w-2 h-2 rounded-full bg-gold-brand/40" />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-white border border-navy/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex space-x-1 text-gold-brand">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-brand" />
                  ))}
                </div>

                <blockquote className="text-sm text-navy/80 leading-relaxed font-medium italic">
                  "{review.quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-navy/10 mt-6 space-y-1">
                <p className="font-heading font-bold text-navy text-base">
                  {review.clientName}
                </p>
                <p className="text-xs font-semibold text-green-brand">
                  {review.role} • {review.company}
                </p>
                <p className="text-[10px] text-navy/50 font-bold uppercase tracking-wider pt-1">
                  {review.orderSpec}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
