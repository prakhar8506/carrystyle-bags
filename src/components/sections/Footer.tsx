import React, { useState } from 'react';
import { SITE_COPY } from '../../lib/content/siteCopy';
import { Phone, Mail, MapPin, Shield, FileText } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="bg-navy-deep text-cream pt-16 pb-8 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center p-1.5 shadow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 25 35 L 75 35 L 80 85 C 80 88 77 90 74 90 L 26 90 C 23 90 20 88 20 85 Z" fill="none" stroke="#0F2242" strokeWidth="8"/>
                    <path d="M 38 35 C 38 20 62 20 62 35" fill="none" stroke="#6FA23A" strokeWidth="8"/>
                    <path d="M 43 50 C 37 50 35 55 35 60 C 35 65 37 70 43 70" fill="none" stroke="#0F2242" strokeWidth="7"/>
                    <path d="M 61 52 C 57 50 54 55 57 60 C 60 65 57 70 52 68" fill="none" stroke="#6FA23A" strokeWidth="7"/>
                  </svg>
                </div>
                <span className="font-heading font-extrabold text-2xl text-cream tracking-tight">
                  Carrystyle<span className="text-green-brand">.in</span>
                </span>
              </div>

              <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
                {SITE_COPY.brand.subtagline} Direct-to-market bag manufacturing with gold foil stamping, screen printing, and high-volume embroidery.
              </p>

              <div className="pt-2 flex items-center space-x-3 text-xs text-cream/60">
                <span>ISO 9001:2015 Certified</span>
                <span>•</span>
                <span>Established 2008</span>
              </div>
            </div>

            {/* Column 2: Products */}
            <div className="space-y-3 text-xs">
              <p className="font-heading font-bold text-cream text-sm uppercase tracking-wider">
                Product Lines
              </p>
              <ul className="space-y-2 text-cream/70">
                <li><a href="#products" className="hover:text-green-brand transition-colors">Heavyweight Canvas Totes</a></li>
                <li><a href="#products" className="hover:text-green-brand transition-colors">Eco Jute & Juco Bags</a></li>
                <li><a href="#products" className="hover:text-green-brand transition-colors">High-Volume Non-Woven</a></li>
                <li><a href="#products" className="hover:text-green-brand transition-colors">Executive Laptop Backpacks</a></li>
                <li><a href="#products" className="hover:text-green-brand transition-colors">Event Drawstring Pouches</a></li>
                <li><a href="#products" className="hover:text-green-brand transition-colors">Gold-Foil Gift Pouches</a></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-3 text-xs">
              <p className="font-heading font-bold text-cream text-sm uppercase tracking-wider">
                Navigation
              </p>
              <ul className="space-y-2 text-cream/70">
                <li><a href="#about" className="hover:text-green-brand transition-colors">About Carrystyle India</a></li>
                <li><a href="#customization" className="hover:text-green-brand transition-colors">Custom Printing Showcase</a></li>
                <li><a href="#manufacturing" className="hover:text-green-brand transition-colors">Manufacturing Pipeline</a></li>
                <li><a href="#why-us" className="hover:text-green-brand transition-colors">Why Carrystyle</a></li>
                <li><a href="#portfolio" className="hover:text-green-brand transition-colors">Client Portfolio</a></li>
                <li><a href="#quote" className="hover:text-green-brand transition-colors">Get a Quote</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Legal */}
            <div className="space-y-3 text-xs">
              <p className="font-heading font-bold text-cream text-sm uppercase tracking-wider">
                Contact & Legal
              </p>
              <div className="space-y-2 text-cream/70">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gold-brand shrink-0" />
                  <span>+91 (022) 4890-2100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gold-brand shrink-0" />
                  <span>orders@carrystyle.in</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gold-brand shrink-0 mt-0.5" />
                  <span>Industrial Estate, Andheri East, Mumbai & NCR, India</span>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t border-cream/10">
                <button
                  onClick={() => setLegalModalType('terms')}
                  className="block text-left text-cream/60 hover:text-gold-brand transition-colors"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setLegalModalType('privacy')}
                  className="block text-left text-cream/60 hover:text-gold-brand transition-colors"
                >
                  Privacy Policy (DPDP 2023)
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 space-y-4 sm:space-y-0">
            <p>© {new Date().getFullYear()} Carrystyle India Manufacturing Ltd. All rights reserved.</p>
            <div className="flex space-x-6">
              <span>Made with Precision in India</span>
              <span>•</span>
              <a href="#top" className="hover:text-cream transition-colors">Back to Top ↑</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Render Legal Modal when triggered */}
      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </>
  );
};
