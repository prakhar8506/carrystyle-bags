import React, { useState } from 'react';
import { PRODUCTS, ProductCategory } from '../../lib/content/products';
import { ArrowRight, Layers, Sparkles, Check, Package } from 'lucide-react';

interface ProductCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.id.includes(activeTab) || activeTab === 'tote');

  return (
    <section id="products" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5 text-green-brand" />
              <span>What We Manufacture</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
              High-Volume Bag Categories
            </h2>
            <p className="text-base text-navy/70 font-medium">
              Explore our full manufacturing catalog. Every bag category can be fully customized with your brand logo, custom colors, and specialty printing.
            </p>
          </div>
        </div>

        {/* Product Cards Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white border border-navy/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image Box */}
              <div className="relative h-64 w-full overflow-hidden bg-navy-slate/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-navy/90 backdrop-blur-md text-cream text-xs font-bold px-3 py-1 rounded-full shadow">
                  MOQ: {product.moq}
                </div>
                <div className="absolute top-4 right-4 bg-gold-brand text-navy font-bold text-xs px-3 py-1 rounded-full shadow flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Custom Print</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-green-brand transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold-brand mt-1">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-navy/70 line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specs Snippet */}
                <div className="pt-4 border-t border-navy/10 space-y-2 text-xs">
                  <div className="flex justify-between text-navy/80">
                    <span className="font-semibold text-navy/50">Weight/GSM:</span>
                    <span className="font-bold">{product.specs.weightGSM}</span>
                  </div>
                  <div className="flex justify-between text-navy/80">
                    <span className="font-semibold text-navy/50">Popular For:</span>
                    <span className="font-bold text-right truncate max-w-[180px]">{product.popularFor}</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(product.name);
                    }}
                    className="w-full py-2.5 rounded-xl bg-navy/5 hover:bg-navy hover:text-cream text-navy font-bold text-xs transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Request Quote For This Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-navy/10 text-navy font-bold flex items-center justify-center hover:bg-navy hover:text-cream transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full sm:w-48 h-48 object-cover rounded-xl shadow"
              />
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-brand/10 text-gold-brand text-xs font-bold">
                  MOQ: {selectedProduct.moq}
                </span>
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs font-semibold text-navy/60">
                  {selectedProduct.tagline}
                </p>
                <p className="text-sm text-navy/80">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-xl bg-cream-paper border border-navy/10">
              <div>
                <p className="font-bold text-navy uppercase">Material Options:</p>
                <ul className="mt-1 space-y-1 text-navy/75">
                  {selectedProduct.materialOptions.map((mat, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-green-brand" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-navy uppercase">Printing Techniques:</p>
                <ul className="mt-1 space-y-1 text-navy/75">
                  {selectedProduct.printTechniques.map((tech, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-gold-brand" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-navy/10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-xl border border-navy/20 text-navy font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cat = selectedProduct.name;
                  setSelectedProduct(null);
                  onSelectCategory(cat);
                }}
                className="px-6 py-2.5 rounded-xl bg-navy text-cream font-bold text-xs flex items-center space-x-2 shadow-lg hover:bg-navy-light"
              >
                <span>Select & Get Quote</span>
                <ArrowRight className="w-4 h-4 text-gold-brand" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
