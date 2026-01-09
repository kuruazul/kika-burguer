'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// -----------------------------------------------------------------------------
// CONFIGURACIÓN DEL MENÚ
// Para agregar más tipos de comidas en el futuro, simplemente agrega una nueva
// entrada en `CATEGORIES` y sus items correspondientes en `MENU_ITEMS`.
// -----------------------------------------------------------------------------

type CategoryId = 'antojitos' | 'rapidas' | 'hamburguesas' | string;

interface Variant {
  name: string;
  price?: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  variants?: Variant[];
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'antojitos', label: 'Antojitos' },
  { id: 'rapidas', label: 'Comidas Rápidas' },
  { id: 'hamburguesas', label: 'Hamburguesas' },
];

const HERO_TITLES = ['Antojitos', 'Hamburguesas', 'Comidas'];

const MENU_ITEMS: Record<CategoryId, MenuItem[]> = {
  antojitos: [
    {
      name: 'Picadas Sencillas',
      description: 'Salsa roja o verde, con queso fresco y cebolla.',
      price: '$12',
      variants: [
        { name: 'Rojas' },
        { name: 'Verdes' },
      ]
    },
    {
      name: 'Picadas Preparadas',
      description: 'Con crema, huevo o guisos del día.',
      price: '$18',
      popular: true,
      variants: [
        { name: 'Huevo' },
        { name: 'Carne' },
      ]
    },
    {
      name: 'Empanadas',
      description: 'Rellenas de queso, pollo, carne o jamón con queso. Orden de 3.',
      price: '$0',
      variants: [
        { name: 'Carne' },
        { name: 'Pollo' },
        { name: 'Queso' },
        { name: 'Jamón con queso' },
      ]
    },
    {
      name: 'Garnachas',
      description: 'Tortillas fritas con salsa y guisos tradicionales.',
      price: '$0',
      variants: [
        { name: 'Mole con carne' },
        { name: 'Frijol con carne' },
        { name: 'Frijol con pollo' },
      ]
    },
    { name: 'Gorditas de Frijol', description: 'Masa de maíz con frijol negro, fritas y crujientes.', price: '$18' },
    {
      name: 'Tostadas',
      description: 'Crujientes tortillas con sus guisos favoritos.',
      price: '$0',
      variants: [
        { name: 'Frijol con carne' },
        { name: 'Mole con carne' },
        { name: 'Carne o pollo' },
        { name: 'Pollo con frijol o mole' },
      ]
    },
    {
      name: 'Panuchos',
      description: 'Tortilla rellena de frijol, con lechuga, tomate y aguacate.',
      price: '$40',
      variants: [
        { name: 'Jamón con queso' },
        { name: 'Pollo' },
        { name: 'Carne' },
      ]
    },
    {
      name: 'Panucho Loco',
      description: 'Frijol, carne, jamón, pollo y queso (panucho grande).',
      price: '$85',
    },
    {
      name: 'Plátanos Fritos',
      description: 'Plátanos machos fritos al gusto.',
      price: '$0',
      variants: [
        { name: 'Con crema y queso' },
        { name: 'Preparados (lechera, crema, choco chips)' },
      ]
    },
    {
      name: 'Tacos Fritos',
      description: 'Tacos de pollo (4 piezas).',
      price: '$45',
    },
  ],
  rapidas: [
    {
      name: 'Hot Dog Clásico',
      description: 'Salchicha de pavo, tocino, tomate, cebolla y aderezos.',
      price: '$35',
      variants: [
        { name: 'Orden de Papas', price: '+$30' },
      ]
    },
    { name: 'Hot Dog Especial', description: 'Con queso gratinado y champiñones.', price: '$45' },
    { name: 'Nuggets de Pollo', description: '10 piezas doraditas acompañadas de papas a la francesa.', price: '$60' },
    { name: 'Salchipapas', description: 'Salchichas fritas con papas y queso líquido.', price: '$50', popular: true },
  ],
  hamburguesas: [
    {
      name: 'Hamburguesa Sencilla',
      description: 'Carne de res 100%, queso americano, lechuga, tomate y cebolla.',
      price: '$65',
      variants: [
        { name: 'Extra Queso', price: '+$15' },
        { name: 'Tocino', price: '+$20' },
      ]
    },
    { name: 'Hamburguesa Hawaiana', description: 'Carne, queso, jamón y rebanada de piña asada.', price: '$75' },
    {
      name: 'Hamburguesa Kika',
      description: 'Doble carne, doble queso, tocino crujiente, aguacate y aros de cebolla.',
      price: '$95',
      popular: true,
      variants: [
        { name: 'Carne Extra', price: '+$35' },
      ]
    },
    { name: 'Burger BBQ', description: 'Con salsa BBQ casera, tocino y queso monterey jack.', price: '$85' },
  ],
};

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get('category');
  const activeCategory = (CATEGORIES.find(c => c.id === categoryParam)?.id || CATEGORIES[0].id) as CategoryId;
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);

  const handleCategoryChange = (categoryId: CategoryId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative h-[45vh] md:h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero.png"
          alt="Antojitos Kika Food Spread"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="relative mb-4 h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full border-4 border-orange-500/20 shadow-2xl">
            <Image
              src="/tia-kika.png"
              alt="Logo Tia Kika"
              fill
              className="object-cover"
            />
          </div>
          <span className="mb-3 md:mb-4 inline-block rounded-full bg-orange-600/20 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-orange-400 backdrop-blur-md border border-orange-500/20 uppercase tracking-widest">
            Auténtico Sabor
          </span>
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl h-[1.2em] md:h-auto overflow-hidden md:overflow-visible">
            <div className="h-[1.2em] relative overflow-hidden flex flex-col items-center md:items-end w-full md:w-auto">
              <div
                className="transition-transform duration-500 ease-in-out flex flex-col items-center md:items-end"
                style={{ transform: `translateY(-${(heroTitleIndex * 100) / HERO_TITLES.length}%)` }}
              >
                {HERO_TITLES.map((title) => (
                  <span key={title} className="block h-[1.2em] leading-[1.2em] text-right">{title}</span>
                ))}
              </div>
            </div>
            <span className="text-orange-500">Kika</span>
          </h1>
          <p className="mt-2 md:mt-4 max-w-lg text-base md:text-xl text-stone-300 font-light px-2">
            La mejor comida veracruzana, snacks y hamburguesas en un solo lugar.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 pb-20 -mt-6 md:-mt-10">

        {/* Category Navigation - Sticky on Mobile */}
        <div className="sticky top-0 z-40 mb-6 bg-stone-950/90 backdrop-blur-xl border-b border-white/5 py-3 px-4 md:static md:bg-transparent md:border-none md:p-0 md:mx-0 md:mb-12 transition-all">
          <div className="flex overflow-x-auto pb-1 md:pb-0 md:flex-wrap md:justify-center gap-3 md:gap-4 scrollbar-hide" style={{ padding: "20px 0 !important" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
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

        {/* Menu Grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {MENU_ITEMS[activeCategory]?.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl bg-stone-900/50 border border-stone-800 p-5 md:p-6 transition-all hover:bg-stone-900 hover:border-stone-700 hover:-translate-y-1 duration-300 active:scale-[0.98]"
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

              {item.variants && (
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {item.variants.map((variant, vIndex) => (
                    <span
                      key={vIndex}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-800/50 text-stone-300 border border-stone-700/50"
                    >
                      {variant.name}
                      {variant.price && (
                        <span className="ml-1.5 text-orange-400">{variant.price}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}

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

        {/* Location Section */}
        <section className="mb-12 mt-16 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </span>
            <h2 className="text-2xl font-bold text-white">Ubicación</h2>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/50 shadow-2xl relative group">
            <div className="aspect-video w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1436.8920155256565!2d-95.27581781223945!3d18.33964998319688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c26b52787e68cf%3A0xe21683070cd058!2sAntojitos%20Kika!5e0!3m2!1ses!2smx!4v1704778000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[50%] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 pointer-events-none border-4 border-stone-800/20 rounded-2xl shadow-inner"></div>
            </div>

            <div className="p-4 md:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Antojitos Kika</h3>
                <p className="text-stone-400 text-sm">Visítanos y disfruta del auténtico sabor.</p>
              </div>
              <a
                href="https://maps.app.goo.gl/oEV9RS7UYYhUKa8t6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 active:scale-95 whitespace-nowrap"
              >
                <span>Cómo llegar</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-20 text-center border-t border-stone-800 pt-10 pb-10">
          <p className="text-stone-400 font-medium mb-4">
            Aceptamos pago en Efectivo 💵 y Transferencia 💳
          </p>
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Antojitos Kika. Precios sujetos a cambio sin previo aviso.
          </p>
        </div>
      </main>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/522941004099"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-green-500/50 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">Cargando menú...</div>}>
      <MenuContent />
    </Suspense>
  );
}
