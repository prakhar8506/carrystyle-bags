import React from 'react';

export const ScrollCue: React.FC = () => {
  return (
    <a
      href="#about"
      className="inline-flex flex-col items-center space-y-2 text-navy/60 hover:text-navy transition-colors group cursor-pointer"
    >
      <span className="text-[10px] font-bold tracking-widest uppercase group-hover:text-green-brand transition-colors">
        Scroll To Transform
      </span>
      <div className="w-5 h-8 rounded-full border-2 border-navy/30 group-hover:border-navy flex justify-center p-1 transition-colors">
        <div className="w-1 h-2 bg-green-brand rounded-full animate-bounce" />
      </div>
    </a>
  );
};
