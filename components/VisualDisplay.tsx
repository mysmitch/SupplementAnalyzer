import React from 'react';
import { ScrapedData, Product } from '../types';

interface VisualDisplayProps {
  data: ScrapedData;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    name,
    brand,
    price,
    imageUrls,
    is_trusted,
    productUrl,
    ingredients,
    recommendation,
    nutritionalFacts,
    productIngredientList
  } = product;

  const mainImage = imageUrls[0] || 'https://via.placeholder.com/300x300?text=No+Image';

  // Helper to format ingredients into chips
  const renderIngredientChips = (list: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {list.map((item, idx) => {
          const isHighlight = item.toLowerCase().includes('extract') || item.toLowerCase().includes('organic');
          return (
            <span key={idx} className={`px-2 py-1 border rounded text-[11px] font-medium transition-all hover:scale-105 cursor-default ${isHighlight
                ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                : 'bg-brand-bg/50 border-brand-tertiary text-brand-secondary'
              }`}>
              {item}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-brand-fg/50 rounded-2xl border border-brand-tertiary overflow-hidden shadow-xl mb-12 backdrop-blur-sm">
      {/* Product Header */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative bg-white rounded-xl p-4 flex items-center justify-center overflow-hidden border border-brand-outline shadow-2xl min-h-[280px] group">
              <div className="absolute top-2 left-2 z-20 flex gap-2">
                {is_trusted && (
                  <span className="bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Trusted</span>
                )}
                <span className="bg-brand-accent text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Priority {recommendation.priority}</span>
              </div>

              <img
                src={mainImage}
                alt={name || 'Product Image'}
                className="w-full h-auto max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-110"
              />

              {imageUrls.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {imageUrls.slice(0, 5).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-sm"></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              {brand && (
                <span className="text-[10px] font-black text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded border border-brand-accent/20 uppercase tracking-widest">
                  {brand}
                </span>
              )}
            </div>

            <h2 className="text-3xl font-black text-brand-primary leading-tight mb-2 tracking-tight">{name || 'Unnamed Product'}</h2>

            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-normal/10 text-brand-normal text-[11px] font-bold px-3 py-1.5 rounded-full border border-brand-normal/20">
                {recommendation.reason}
              </div>
            </div>

            {/* Price & Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-bg/80 border border-brand-tertiary rounded-xl px-5 py-3 shadow-inner">
                <span className="text-brand-secondary text-[10px] uppercase font-black tracking-widest mb-1 opacity-60">Price</span>
                <div className="text-2xl font-black text-brand-primary flex items-baseline gap-1">
                  <span className="text-brand-accent text-lg">{price.currency}</span>
                  {price.amount}
                </div>
                {price.pricePerUnit && (
                  <span className="text-[10px] font-bold text-brand-secondary opacity-50 block mt-1">
                    {price.currency} {price.pricePerUnit} / {price.unitType || 'unit'}
                  </span>
                )}
              </div>

              <div className="bg-brand-bg/80 border border-brand-tertiary rounded-xl px-5 py-3 shadow-inner">
                <span className="text-brand-secondary text-[10px] uppercase font-black tracking-widest mb-1 opacity-60">Container</span>
                <div className="text-xl font-black text-brand-primary">
                  {price.unitsPerContainer || '—'}
                  <span className="text-xs ml-1 text-brand-secondary">{price.unitType || 'Units'}</span>
                </div>
                {price.averageRating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] font-bold text-yellow-500">★ {price.averageRating}</span>
                    <span className="text-[9px] font-bold text-brand-secondary opacity-40">({price.totalRatings} ratings)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              {productUrl && (
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white font-black text-xs transition bg-brand-accent px-6 py-3 rounded-xl hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20 active:scale-95 uppercase tracking-widest">
                  View Product
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Supplement Facts & Ingredients */}
      <div className="bg-brand-bg/30 border-t border-brand-tertiary p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Supplement Facts Panel */}
          <div className="bg-white text-black p-6 border-4 border-black font-sans shadow-xl">
            <h3 className="text-3xl font-black border-b-[8px] border-black pb-1 mb-4 italic uppercase tracking-tighter">Supplement Facts</h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-[4px] border-black text-left">
                  <th className="py-2 font-black uppercase text-xs">Component</th>
                  <th className="py-2 font-black uppercase text-xs text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {nutritionalFacts.map((fact, idx) => (
                  <tr key={idx} className="border-b-2 border-black last:border-b-[10px]">
                    <td className="py-2 font-black text-base">{fact.name}</td>
                    <td className="py-2 text-right font-medium text-base">
                      {fact.amount} {fact.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-gray-500">Active Ingredients</h4>
                <div className="grid grid-cols-1 gap-1">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-gray-100 pb-1">
                      <span className="font-bold">{ing.name}</span>
                      <span className="text-gray-600 font-mono">{ing.amount} {ing.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[10px] mt-4 font-bold italic leading-tight text-gray-400 uppercase tracking-tight">
              * Daily Value not established.
            </div>
          </div>

          {/* Other Details */}
          <div className="space-y-6">
            <div className="bg-brand-fg/20 p-6 rounded-2xl border border-brand-tertiary">
              <h3 className="text-brand-secondary font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"></span>
                Other Ingredients
              </h3>
              {renderIngredientChips(productIngredientList)}
            </div>

            <div className="bg-brand-accent/5 p-6 rounded-2xl border border-brand-accent/20">
              <h3 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                AI Analysis
              </h3>
              <p className="text-sm leading-relaxed text-brand-primary opacity-80">
                This product from <span className="font-bold text-brand-accent">{brand}</span> provides <span className="font-bold">{nutritionalFacts[0]?.name || 'essential nutrients'}</span> and is specifically recommended for <span className="italic">{recommendation.reason.toLowerCase()}</span>.
                It has been verified as {is_trusted ? 'a highly trusted formulation' : 'a standard market formulation'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisualDisplay: React.FC<VisualDisplayProps> = ({ data }) => {
  const { products } = data;

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-brand-fg/20 rounded-3xl border border-dashed border-brand-tertiary">
        <svg className="w-16 h-16 text-brand-secondary opacity-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-brand-secondary font-black text-xs uppercase tracking-widest">No products detected to analyze</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-black text-brand-primary tracking-tighter uppercase italic">Analysis Results</h1>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-accent to-transparent"></div>
        <span className="text-[10px] font-black bg-brand-tertiary px-3 py-1 rounded-full text-brand-secondary uppercase tracking-widest border border-brand-tertiary">
          {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
        </span>
      </div>

      <div className="space-y-12">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default VisualDisplay;