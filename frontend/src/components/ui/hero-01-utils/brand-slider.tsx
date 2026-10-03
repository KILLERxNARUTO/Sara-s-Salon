import React from "react";

export interface BrandList {
  image: string;
  lightimg?: string;
  name: string;
}

export interface BrandSliderProps {
  brandList?: BrandList[];
}

export default function BrandSlider({ brandList = [] }: BrandSliderProps) {
  if (!brandList.length) return null;

  return (
    <div className="py-8 bg-[#0F0E0D] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#D4B87A]/70 mb-6 font-medium">
          Trusted Luxury Products & Professional Brands
        </p>
        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-14 opacity-70 hover:opacity-100 transition-opacity">
          {brandList.map((brand, i) => (
            <div key={i} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
              <img
                src={brand.lightimg || brand.image}
                alt={brand.name}
                className="h-7 w-auto object-contain brightness-200 contrast-125"
              />
              <span className="text-xs tracking-wider text-white/50 font-light">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
