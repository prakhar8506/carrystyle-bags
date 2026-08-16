import React, { useState, useEffect } from 'react';
import { Send, Upload, CheckCircle2, Calculator, Sparkles, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteFormProps {
  prefilledCategory?: string;
  prefilledTechnique?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  prefilledCategory = '',
  prefilledTechnique = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: prefilledCategory || 'Canvas Tote Bags',
    quantity: 500,
    printNeeded: true,
    technique: prefilledTechnique || 'Gold / Silver Foil Stamping',
    notes: '',
  });

  const [fileName, setFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledCategory) {
      setFormData((prev) => ({ ...prev, category: prefilledCategory }));
    }
    if (prefilledTechnique) {
      setFormData((prev) => ({ ...prev, technique: prefilledTechnique }));
    }
  }, [prefilledCategory, prefilledTechnique]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F2242', '#6FA23A', '#B8944F', '#3FA796'],
      });
    }, 1200);
  };

  return (
    <section id="quote" className="py-24 bg-cream-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-gold-brand" />
            <span>Low-Friction B2B Quote Request</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Request Your Manufacturing Quote
          </h2>

          <p className="text-base text-navy/70 font-medium">
            Get direct factory pricing and a 3D digital artwork proof within 4 business hours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-navy/10 shadow-2xl p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl font-extrabold text-navy">
                    Quote Inquiry Received!
                  </h3>
                  <p className="text-sm text-navy/70 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-navy">{formData.name}</span>. Our industrial sales team will review your order parameters for <span className="font-bold text-green-brand">{formData.quantity} units</span> of {formData.category} and send your official quotation to <span className="font-bold text-navy">{formData.email}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-paper border border-navy/10 text-xs text-navy/80 max-w-md mx-auto space-y-1 text-left">
                  <p><span className="font-bold text-navy">Ref ID:</span> CS-REQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><span className="font-bold text-navy">Estimated SLA:</span> Within 4 Business Hours</p>
                  <p><span className="font-bold text-navy">Contact Direct:</span> +91 (022) 4890-2100</p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-xl bg-navy text-cream font-bold text-xs shadow hover:bg-navy-light"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Oberoi Luxury Group"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors"
                    />
                  </div>
                </div>

                {/* Category & Technique */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Bag Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors cursor-pointer"
                    >
                      <option value="Canvas Tote Bags">Heavyweight Canvas Tote Bags</option>
                      <option value="Eco Jute & Juco Bags">Premium Eco Jute & Juco Bags</option>
                      <option value="Non-Woven Bags">High-Volume Non-Woven Bags</option>
                      <option value="Executive Laptop Backpacks">Executive Corporate Laptop Bags</option>
                      <option value="Drawstring Pouches">Event & Athletic Drawstring Pouches</option>
                      <option value="Luxury Gift Packaging">Gold-Foil Gift & Packaging Pouches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">
                      Custom Print Technique
                    </label>
                    <select
                      value={formData.technique}
                      onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors cursor-pointer"
                    >
                      <option value="Gold / Silver Foil Stamping">Gold / Silver Foil Stamping</option>
                      <option value="High-Precision Screen Printing">High-Precision Screen Printing</option>
                      <option value="3D Embroidery">3D High-Density Embroidery</option>
                      <option value="Full Color Heat Transfer">Full Color Heat Transfer</option>
                      <option value="No Printing (Plain Bags)">No Printing (Plain Raw Bags)</option>
                    </select>
                  </div>
                </div>

                {/* Quantity Interactive Slider */}
                <div className="space-y-2 p-5 rounded-2xl bg-cream-paper border border-navy/10">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-navy uppercase">Estimated Order Quantity:</span>
                    <span className="text-green-brand text-base font-extrabold font-heading">
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
                    className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-green-brand"
                  />
                  <div className="flex justify-between text-[10px] text-navy/50 font-bold">
                    <span>MOQ: 100 Units</span>
                    <span>5,000</span>
                    <span>50,000+ Industrial Scale</span>
                  </div>
                </div>

                {/* File Upload Simulator */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Upload Logo / Artwork (Optional)
                  </label>
                  <div className="border-2 border-dashed border-navy/20 rounded-2xl p-6 text-center hover:border-gold-brand transition-colors relative bg-cream-paper/50">
                    <input
                      type="file"
                      accept=".pdf,.ai,.eps,.png,.jpg,.svg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-gold-brand mx-auto mb-2" />
                    <p className="text-xs font-bold text-navy">
                      {fileName ? `Selected File: ${fileName}` : 'Click or Drag Vector Logo (PDF, AI, EPS, PNG, SVG)'}
                    </p>
                    <p className="text-[10px] text-navy/50 mt-1">Maximum file size: 25MB</p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Additional Order Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify fabric GSM, target delivery date, packing requirements, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cream-paper border border-navy/15 text-navy font-semibold text-sm focus:outline-none focus:border-gold-brand transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-navy text-cream font-bold text-base shadow-xl hover:bg-navy-light transition-all flex items-center justify-center space-x-2 border border-gold-brand/40"
                >
                  {isSubmitting ? (
                    <span>Calculating Quotation...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-4 h-4 text-gold-brand" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Right Live Order Summary Panel */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-navy text-cream shadow-2xl space-y-6 border border-gold-brand/30">
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-cream flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-gold-brand" />
                <span>Order Summary</span>
              </h3>
              <p className="text-xs text-cream/60">Live B2B parameter breakdown</p>
            </div>

            <div className="space-y-4 text-xs border-t border-b border-cream/10 py-4">
              <div className="flex justify-between">
                <span className="text-cream/60">Category:</span>
                <span className="font-bold text-cream text-right">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/60">Volume:</span>
                <span className="font-bold text-green-brand font-heading text-sm">{formData.quantity.toLocaleString()} Bags</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/60">Technique:</span>
                <span className="font-bold text-gold-brand text-right">{formData.technique}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/60">Sample SLA:</span>
                <span className="font-bold text-cream">2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/60">Pan-India Freight:</span>
                <span className="font-bold text-cream">Insured Doorstep</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-deep border border-cream/10 space-y-2 text-[11px] text-cream/70">
              <p className="font-bold text-gold-brand uppercase">Direct Manufacturer Benefits:</p>
              <p>✔ Zero middleman markup</p>
              <p>✔ Free digital 3D artwork proof</p>
              <p>✔ ISO 9001:2015 certified production</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
