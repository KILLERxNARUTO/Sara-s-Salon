import React from 'react';
import { Sparkles, Award, Star, ShieldCheck, Heart, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface TickerItem {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { icon: <Sparkles className="w-3.5 h-3.5 text-[#D4B87A]" />, text: 'HD & Airbrush Bridal Makeovers', highlight: 'Bespoke Artistry' },
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: '100% Private Ladies & Kids Sanctuary', highlight: 'Female Staff Only' },
  { icon: <Award className="w-3.5 h-3.5 text-[#D4B87A]" />, text: '10+ Years of Beauty Excellence', highlight: 'Guduvanchery' },
  { icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />, text: '500+ Happy Brides Styled', highlight: '4.9 / 5.0 Google Rated' },
  { icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, text: 'Original MAC, Kryolan, O3+ & Lotus', highlight: 'Certified Genuine' },
  { icon: <MapPin className="w-3.5 h-3.5 text-[#D4B87A]" />, text: 'Mahalakshmi Nagar Main Road', highlight: 'Near NPR Mandapam' },
  { icon: <Phone className="w-3.5 h-3.5 text-emerald-400" />, text: 'Call for Appointments: +91 97906 90628', highlight: 'Direct WhatsApp' },
  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B87A]" />, text: 'Medical Autoclave & UV Sanitized Tools', highlight: 'Hygienic Care' },
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#141210] py-3.5 border-y border-[#B8955A]/30 text-xs tracking-wider uppercase font-medium z-20 shadow-lg">
      
      {/* Left/Right Edge Shadow Blurs for smooth infinite fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#141210] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#141210] to-transparent z-10 pointer-events-none" />

      {/* Infinite Moving Marquee Content */}
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First Loop */}
        {TICKER_ITEMS.map((item, idx) => (
          <div key={`ticker-1-${idx}`} className="inline-flex items-center gap-2.5 px-3">
            <span className="p-1 rounded-full bg-white/10">{item.icon}</span>
            <span className="text-[#E5D3BF]">{item.text}</span>
            {item.highlight && (
              <span className="px-2 py-0.5 rounded-full bg-[#B8955A]/25 text-[#D4B87A] text-[10px] font-bold border border-[#B8955A]/40">
                {item.highlight}
              </span>
            )}
            <span className="text-white/20 ml-4 font-mono">•</span>
          </div>
        ))}

        {/* Second Loop (Seamless repeat) */}
        {TICKER_ITEMS.map((item, idx) => (
          <div key={`ticker-2-${idx}`} className="inline-flex items-center gap-2.5 px-3">
            <span className="p-1 rounded-full bg-white/10">{item.icon}</span>
            <span className="text-[#E5D3BF]">{item.text}</span>
            {item.highlight && (
              <span className="px-2 py-0.5 rounded-full bg-[#B8955A]/25 text-[#D4B87A] text-[10px] font-bold border border-[#B8955A]/40">
                {item.highlight}
              </span>
            )}
            <span className="text-white/20 ml-4 font-mono">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
