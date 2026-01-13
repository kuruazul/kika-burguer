'use client';

import { CATEGORIES, CategoryId } from '../lib/data';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onCategoryChange: (categoryId: CategoryId) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="sticky top-0 z-40 mb-6 bg-stone-950/90 backdrop-blur-xl border-b border-white/5 py-3 px-4 md:static md:bg-transparent md:border-none md:p-0 md:mx-0 md:mb-12 transition-all">
      <div className="flex overflow-x-auto pb-1 md:pb-0 md:flex-wrap md:justify-center gap-3 md:gap-4 scrollbar-hide" style={{ padding: "20px 0 !important" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              group relative whitespace-nowrap px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-out flex-shrink-0
              ${activeCategory === cat.id
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50 scale-105'
                : 'bg-stone-800/80 md:bg-stone-900/80 text-stone-400 hover:bg-stone-800 hover:text-white border border-stone-700 md:border-stone-800'
              }
            `}
          >
            {cat.label}
            {activeCategory === cat.id && (
              <span className="absolute -bottom-2 left-1/2 h-1 w-1/2 -translate-x-1/2 rounded-full bg-orange-400 blur-[2px] hidden md:block" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
