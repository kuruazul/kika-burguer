'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { CATEGORIES, MENU_ITEMS, CategoryId } from './lib/data';
import { CartProvider } from './context/CartContext';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import MenuGrid from './components/MenuGrid';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get('category');
  const activeCategory = (CATEGORIES.find(c => c.id === categoryParam)?.id || CATEGORIES[0].id) as CategoryId;

  const handleCategoryChange = (categoryId: CategoryId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-orange-500 selection:text-white">
        <Hero />

        {/* Main Content */}
        <main className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 pb-20 -mt-6 md:-mt-10">

          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <MenuGrid items={MENU_ITEMS[activeCategory]} />

          <LocationSection />

          <Footer />
        </main>

        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">Cargando menú...</div>}>
      <MenuContent />
    </Suspense>
  );
}
