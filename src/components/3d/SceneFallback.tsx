import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface SceneFallbackProps {
  printProgress: number;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({ printProgress }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-6">
      <div className="relative w-72 h-88 rounded-2xl bg-cream-paper border-2 border-navy/10 shadow-2xl flex flex-col items-center justify-center p-6 text-center group overflow-hidden">
        {/* Soft Gold Shimmer Background Wash */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gold-brand/10 via-wave-teal/5 to-navy/10 transition-opacity duration-700"
          style={{ opacity: 0.2 + printProgress * 0.8 }}
        />

        {/* CSS Bag Representation */}
        <div className="w-44 h-56 relative bg-gradient-to-b from-white to-cream-paper rounded-xl border border-navy/20 shadow-md flex flex-col items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
          {/* Handle */}
          <div className="absolute -top-10 w-20 h-14 border-4 border-navy border-b-0 rounded-t-full" />
          
          {/* Cartouche Foil Logo */}
          <div 
            className="w-full h-full rounded-lg border-2 border-gold-brand/60 p-3 flex flex-col items-center justify-center transition-all duration-700"
            style={{ 
              backgroundColor: printProgress > 0.4 ? 'rgba(184, 148, 79, 0.08)' : 'transparent',
              borderColor: printProgress > 0.4 ? '#B8944F' : 'rgba(15, 34, 66, 0.2)'
            }}
          >
            <div className="flex items-center space-x-1 font-bold text-2xl tracking-tighter">
              <span className="text-navy">C</span>
              <span className="text-green-brand">S</span>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-navy mt-1">CARRYSTYLE</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-wave-teal to-wave-blue my-1" />
            <p className="text-[8px] text-gold-brand font-semibold">GOLD FOIL DAMASK</p>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center space-x-2 text-xs font-semibold text-navy/70">
          <Sparkles className="w-4 h-4 text-gold-brand animate-pulse" />
          <span>Interactive 3D Preview (Reduced Motion)</span>
        </div>
      </div>
    </div>
  );
};
