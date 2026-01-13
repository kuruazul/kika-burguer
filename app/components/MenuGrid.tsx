'use client';

import { MenuItem } from '../lib/data';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem, variantIndex?: number) => {
    const variant = variantIndex !== undefined && item.variants ? item.variants[variantIndex] : undefined;
    addToCart(item, variant);

    // Feedback animation
    const id = variant ? `${item.name}-${variant.name}` : item.name;
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-2">
      {items?.map((item, index) => (
        <div
          key={index}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl bg-stone-900/50 border border-stone-800 p-5 md:p-6 transition-all hover:bg-stone-900 hover:border-stone-700 duration-300"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute -right-10 -top-10 h-24 w-24 md:h-32 md:w-32 rounded-full bg-orange-600/10 blur-2xl md:blur-3xl transition-opacity group-hover:bg-orange-600/20" />

          <div className="flex justify-between items-start mb-2 relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors pr-2">
              {item.name}
            </h3>
            <span className="text-lg md:text-xl font-semibold text-orange-500 whitespace-nowrap">{item.price}</span>
          </div>

          <p className="text-stone-400 text-sm leading-relaxed mb-4 relative z-10">
            {item.description}
          </p>

          <div className="mt-auto relative z-10">
            {item.variants && item.variants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.variants.map((variant, vIndex) => (
                  <button
                    key={vIndex}
                    onClick={() => handleAddToCart(item, vIndex)}
                    className={`
                      inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95
                      ${addedItem === `${item.name}-${variant.name}`
                        ? 'bg-green-600/20 text-green-400 border-green-500/50'
                        : 'bg-stone-800/50 text-stone-300 border-stone-700/50 hover:bg-stone-800 hover:border-orange-500/50 hover:text-white'
                      }
                    `}
                  >
                    {addedItem === `${item.name}-${variant.name}` ? (
                      <span className="flex items-center gap-1">
                        ✓ Agregado
                      </span>
                    ) : (
                      <>
                        <span>{variant.name}</span>
                        {variant.price && (
                          <span className="ml-1.5 text-orange-400">{variant.price}</span>
                        )}
                        <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity text-stone-500">+</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(item)}
                className={`
                    w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95
                    ${addedItem === item.name
                    ? 'bg-green-600 text-white shadow-lg shadow-green-900/40'
                    : 'bg-stone-800 text-stone-300 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-900/40'
                  }
                  `}
              >
                {addedItem === item.name ? (
                  <>✓ Agregado</>
                ) : (
                  <>
                    Agregar al pedido
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>

          {item.popular && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 md:px-3 md:py-1 rounded-bl-xl uppercase tracking-wider shadow-sm">
                Popular
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
