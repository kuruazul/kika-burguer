'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HERO_TITLES } from '../lib/data';

export default function Hero() {
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}
