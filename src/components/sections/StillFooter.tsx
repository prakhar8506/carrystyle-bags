import React, { useState } from 'react';
import { LegalModal } from './LegalModal';

export const StillFooter: React.FC = () => {
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="bg-ink text-bone py-16 border-t border-bone/10">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <a href="#" className="font-wordmark text-2xl font-black text-bone tracking-tight">
                CARRYSTYLE<span className="text-alpine">.</span>
              </a>
              <p className="text-xs text-bone/60 mt-1 max-w-sm">
                High-volume custom bag manufacturing crafted in India. 50,000+ monthly capacity.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-semibold text-bone/70">
              <a href="#categories" className="hover:text-bone transition-colors">Categories</a>
              <a href="#inside" className="hover:text-bone transition-colors">Craftsmanship</a>
              <a href="#story" className="hover:text-bone transition-colors">Story</a>
              <a href="#stockists" className="hover:text-bone transition-colors">Stockists</a>
              <button onClick={() => setLegalModalType('terms')} className="hover:text-bone transition-colors text-left">Terms</button>
              <button onClick={() => setLegalModalType('privacy')} className="hover:text-bone transition-colors text-left">Privacy Policy</button>
            </div>
          </div>

          <div className="pt-8 border-t border-bone/10 flex flex-col sm:flex-row items-center justify-between text-xs text-bone/50 gap-4">
            <p>© {new Date().getFullYear()} CARRYSTYLE. India Manufacturing Ltd. All rights reserved.</p>
            <p className="uppercase tracking-widest text-[10px]">Mumbai & NCR, India</p>
          </div>

        </div>
      </footer>

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </>
  );
};
