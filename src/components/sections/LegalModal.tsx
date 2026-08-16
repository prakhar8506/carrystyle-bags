import React from 'react';
import { SITE_COPY } from '../../lib/content/siteCopy';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const content = type === 'terms' ? SITE_COPY.legal.terms : SITE_COPY.legal.privacy;

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-navy/10 text-navy font-bold flex items-center justify-center hover:bg-navy hover:text-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-10 border-b border-navy/10 pb-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-gold-brand uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-navy">
            {content.title}
          </h2>
          <p className="text-xs text-navy/50">
            Last Updated: {content.lastUpdated} • Compliant with Indian IT Act 2000 & DPDP Act 2023
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-6 text-sm text-navy/80 leading-relaxed">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-navy">
                {section.heading}
              </h3>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-navy/10 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-navy/60">
            <ShieldCheck className="w-4 h-4 text-green-brand" />
            <span>Official Carrystyle India Legal Copy</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-navy text-cream font-bold text-xs shadow hover:bg-navy-light"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
