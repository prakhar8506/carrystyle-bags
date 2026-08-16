import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STILL_COPY } from '../../lib/content/stillCopy';

interface StillShopQuoteProps {
  prefilledCategory?: string;
  onClose?: () => void;
}

const DEFAULT_BAG_TYPE = STILL_COPY.bagTypes[0].name;

export const StillShopQuote: React.FC<StillShopQuoteProps> = ({ prefilledCategory = '', onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: prefilledCategory || DEFAULT_BAG_TYPE,
    quantity: 500,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefilledCategory) {
      setFormData((prev) => ({ ...prev, category: prefilledCategory }));
    }
  }, [prefilledCategory]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email';
    if (!formData.phone.trim()) next.phone = 'Phone is required';
    else if (!/^[\d\s+\-()]{8,}$/.test(formData.phone)) next.phone = 'Enter a valid phone number';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // TODO: wire to production endpoint (e.g. Formspree, custom API, or CRM webhook)
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };
    console.info('[Carrystyle Quote]', payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F2242', '#6FA23A', '#B8944F', '#BCD3D8'],
      });
    }, 800);
  };

  return (
    <section id="shop" className="py-24 bg-bone relative border-t border-ink/10">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="font-sans uppercase text-mist text-xs font-semibold tracking-[0.4em]">
            <span className="text-ink font-bold">06</span>
            <span className="mx-2 text-mist/50">/</span>
            REQUEST A QUOTE
          </div>

          <h2 className="font-display font-light text-ink text-4xl sm:text-5xl tracking-tight">
            Order Your Bags.
          </h2>

          <p className="text-mist text-sm font-medium">
            Receive direct factory pricing and a digital artwork proof within 4 business hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-ink/10 shadow-2xl p-8 sm:p-12">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-alpine/10 text-alpine flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-ink">
                  Inquiry Received
                </h3>
                <p className="text-sm text-mist max-w-md mx-auto">
                  Thank you, <span className="text-ink font-bold">{formData.name}</span>. Our sales team is reviewing your requirement for <span className="text-alpine font-bold">{formData.quantity.toLocaleString()} units</span> of {formData.category}.
                </p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-ink text-bone font-sans text-xs font-bold"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-bone border text-ink font-medium text-sm focus:outline-none focus:border-ink ${
                      errors.name ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-bone border text-ink font-medium text-sm focus:outline-none focus:border-ink ${
                      errors.email ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-bone border text-ink font-medium text-sm focus:outline-none focus:border-ink ${
                      errors.phone ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bone border border-ink/15 text-ink font-medium text-sm focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1">
                  Select Bag Type *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bone border border-ink/15 text-ink font-medium text-sm focus:outline-none focus:border-ink cursor-pointer"
                >
                  {STILL_COPY.bagTypes.map((bag) => (
                    <option key={bag.id} value={bag.name}>
                      {bag.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-5 rounded-2xl bg-bone border border-ink/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-ink uppercase">Order Quantity:</span>
                  <span className="text-alpine text-base font-extrabold tabular-nums">
                    {formData.quantity.toLocaleString()} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-alpine"
                />
                <div className="flex justify-between text-[10px] text-mist font-bold">
                  <span>MOQ: 100</span>
                  <span>5,000</span>
                  <span>50,000+ Scale</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1">
                  Order Details / Custom Printing Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Target delivery date, logo placement, custom colour preferences, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bone border border-ink/15 text-ink font-medium text-sm focus:outline-none focus:border-ink"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-ink text-bone font-sans font-bold text-sm shadow-xl hover:bg-ink-slate transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <Send className="w-4 h-4 text-alpine" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
