import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Maximize2,
  X,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  Layers
} from 'lucide-react';
import { generateGeneralInquiryLink } from '@/utils/whatsapp';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  category: string;
  description: string;
  highlight: string;
}

interface RoomData {
  id: 'main' | 'bridal' | 'spa';
  name: string;
  subtitle: string;
  image: string;
  badge: string;
  description: string;
  hotspots: Hotspot[];
}

const ROOMS: RoomData[] = [
  {
    id: 'main',
    name: 'Main Salon Floor',
    subtitle: 'Hair & Skincare Atelier',
    image: '/images/parlour_interior_main.jpg',
    badge: '100% Ladies & Kids Exclusive',
    description: 'Gold arched illuminated vanity stations with hydraulic salon chairs and marble finish flooring.',
    hotspots: [
      {
        id: 'h1',
        x: 75,
        y: 40,
        title: 'Arch Gold LED Vanity Stations',
        category: 'Makeup & Hair',
        description: 'Color-accurate 4500K glowing perimeter lighting designed for flawless makeup matching and precision cuts.',
        highlight: 'HD Color-Accurate LED'
      },
      {
        id: 'h2',
        x: 42,
        y: 62,
        title: 'Hydraulic Comfort Chairs',
        category: 'Ergonomics',
        description: 'Ultra-plush leather styling chairs with full height adjustability and lumbar support during long treatments.',
        highlight: 'Maximum Comfort'
      },
      {
        id: 'h3',
        x: 18,
        y: 45,
        title: 'Reception & Consultation Desk',
        category: 'Welcome Lounge',
        description: 'Private greeting zone with complimentary herbal tea, skin patch tests, and digital hair texture analysis.',
        highlight: 'Personalized Care'
      }
    ]
  },
  {
    id: 'bridal',
    name: 'Private Bridal Suite',
    subtitle: 'VIP Dressing & Makeover Room',
    image: '/images/parlour_interior_bridal.jpg',
    badge: 'Private & Confidential Room',
    description: 'Opulent Hollywood vanity mirror, crystal chandelier, and velvet lounge exclusively for brides.',
    hotspots: [
      {
        id: 'b1',
        x: 72,
        y: 42,
        title: 'Hollywood Vanity Makeup Suite',
        category: 'Bridal Artistry',
        description: 'Dual-halo lighting suite for high-definition airbrush, waterproof draping, and saree pleating trials.',
        highlight: 'Airbrush & HD Ready'
      },
      {
        id: 'b2',
        x: 22,
        y: 48,
        title: 'Bridal Accessories & Jewelry Gallery',
        category: 'Trial Suite',
        description: 'Curated collection of antique hair accessories, tiaras, and matha patti for complete trial styling.',
        highlight: 'Full Trial Draping'
      },
      {
        id: 'b3',
        x: 52,
        y: 75,
        title: 'Emerald Velvet Entourage Lounge',
        category: 'Private Seating',
        description: 'Comfortable private sofa area for mother of the bride and bridesmaids to relax during preparation.',
        highlight: 'Family Friendly'
      }
    ]
  },
  {
    id: 'spa',
    name: 'Spa & Facial Suite',
    subtitle: 'Restorative Skincare Pod',
    image: '/images/parlour_interior_spa.jpg',
    badge: 'Sanitized & Soundproof',
    description: 'Acoustic bamboo walls, candlelit ambiance, and ergonomic facial beds for O3+ and herbal care.',
    hotspots: [
      {
        id: 's1',
        x: 72,
        y: 60,
        title: 'Ergonomic Facial Treatment Bed',
        category: 'Skincare Pod',
        description: 'Electrically adjustable plush treatment bed with heated linen for skin rejuvenation and relaxation.',
        highlight: '100% Sterilized Linens'
      },
      {
        id: 's2',
        x: 16,
        y: 74,
        title: 'Organic & O3+ Formulations',
        category: 'Dermatological Care',
        description: 'Single-use sealed O3+ facial kits, pure lotus botanicals, and herbal peel-off nutrient serums.',
        highlight: 'Sealed Single-Use Kits'
      },
      {
        id: 's3',
        x: 48,
        y: 28,
        title: 'Acoustic Bamboo & Marble Ambience',
        category: 'Aromatherapy',
        description: 'Calming lavender oil diffusion with sound-insulated walls to ensure deep rest and mental relaxation.',
        highlight: 'Aromatherapy Diffusers'
      }
    ]
  }
];

export const InteractiveStudioShowcase: React.FC = () => {
  const [activeRoomId, setActiveRoomId] = useState<'main' | 'bridal' | 'spa'>('main');
  const [isWarmMode, setIsWarmMode] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const currentRoom = ROOMS.find(r => r.id === activeRoomId) || ROOMS[0];
  const whatsappUrl = generateGeneralInquiryLink();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="relative w-full">
      {/* Room Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-[#191715]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#B8955A]/30 text-white text-xs shadow-lg">
        <div className="flex items-center gap-1 overflow-x-auto py-0.5" style={{ scrollbarWidth: 'none' }}>
          {ROOMS.map(room => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomId(room.id);
                setActiveHotspot(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeRoomId === room.id
                  ? 'bg-gradient-to-r from-[#B8955A] to-[#9E7A3F] text-[#191715] font-semibold shadow-md'
                  : 'text-[#E5D3BF]/75 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontSize: '11px' }}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 ml-auto shrink-0">
          <button
            onClick={() => setIsWarmMode(!isWarmMode)}
            title={isWarmMode ? 'Switch to Daylight View' : 'Switch to Warm Evening Glow'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4B87A] transition-colors"
            style={{ fontSize: '11px' }}
          >
            {isWarmMode ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-200" />}
            <span className="hidden sm:inline">{isWarmMode ? 'Warm Glow' : 'Daylight'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            title="Expand Interactive Parlour Tour"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Studio Image with 3D Tilt */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveHotspot(null)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B8955A]/40 aspect-[4/3] bg-[#191715] group cursor-pointer"
      >
        {/* Interior Image */}
        <img
          src={currentRoom.image}
          alt={currentRoom.name}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            filter: isWarmMode
              ? 'brightness(1.05) contrast(1.05) sepia(0.12)'
              : 'brightness(1.0)'
          }}
        />

        {/* Ambient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: isWarmMode
              ? 'linear-gradient(to top, rgba(25,23,21,0.8), rgba(120,80,30,0.15), rgba(200,160,80,0.08))'
              : 'linear-gradient(to top, rgba(25,23,21,0.6), transparent, transparent)',
            opacity: isWarmMode ? 1 : 0.5
          }}
        />

        {/* Top-left Badge */}
        <div className="absolute top-3 left-3 bg-[#191715]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B8955A]/40 text-white flex items-center gap-1.5 shadow-lg pointer-events-none" style={{ fontSize: '11px' }}>
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4B87A]" />
          <span className="font-medium text-[#F8F3ED]">{currentRoom.badge}</span>
        </div>

        {/* Top-right Hotspot Guide */}
        <div
          className="absolute top-3 right-3 bg-[#B8955A]/90 text-[#191715] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-md pointer-events-none"
          style={{ fontSize: '10px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        >
          <Sparkles className="w-3 h-3" />
          <span>Interactive Hotspots</span>
        </div>

        {/* Interactive Hotspot Pins */}
        {currentRoom.hotspots.map(hotspot => {
          const isActive = activeHotspot?.id === hotspot.id;
          return (
            <div
              key={hotspot.id}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isActive ? null : hotspot);
                }}
                className="relative flex items-center justify-center transition-transform"
                style={{ transform: isActive ? 'scale(1.25)' : 'scale(1)' }}
              >
                {/* Pulsing ring */}
                <span
                  className="absolute w-7 h-7 rounded-full bg-[#B8955A]/40"
                  style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                />
                {/* Center dot */}
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-white font-bold transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-[#B8955A] text-[#191715]'
                      : 'bg-[#191715]/90 text-[#D4B87A] hover:bg-[#B8955A] hover:text-[#191715]'
                  }`}
                  style={{
                    fontSize: '12px',
                    boxShadow: isActive ? '0 0 0 4px rgba(184,149,90,0.5)' : 'none'
                  }}
                >
                  ✦
                </span>
              </button>

              {/* Popover Card */}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-1/2 bottom-9 w-64 sm:w-72 bg-[#191715]/95 backdrop-blur-xl text-white p-3.5 rounded-2xl border border-[#B8955A]/60 shadow-2xl z-30"
                  style={{
                    transform: 'translateX(-50%)',
                    animation: 'fadeInUp 0.2s ease-out'
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span
                      className="uppercase font-bold tracking-widest text-[#D4B87A] bg-[#B8955A]/20 px-2 py-0.5 rounded-md border border-[#B8955A]/30"
                      style={{ fontSize: '10px' }}
                    >
                      {hotspot.category}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-white/60 hover:text-white p-0.5 rounded-full hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif text-sm font-semibold text-[#F8F3ED] mb-1">
                    {hotspot.title}
                  </h4>

                  <p className="text-[#E5D3BF]/80 leading-relaxed mb-2 font-light" style={{ fontSize: '11px' }}>
                    {hotspot.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2" style={{ fontSize: '10px' }}>
                    <span className="text-amber-300 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      {hotspot.highlight}
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4B87A] hover:underline font-semibold flex items-center gap-0.5"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#191715] via-[#191715]/80 to-transparent p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white z-10">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#F8F3ED] flex items-center gap-2">
              <span>{currentRoom.name}</span>
              <span
                className="font-sans text-[#D4B87A] bg-[#B8955A]/20 px-2 py-0.5 rounded-full border border-[#B8955A]/30"
                style={{ fontSize: '12px' }}
              >
                {currentRoom.subtitle}
              </span>
            </h3>
            <p className="text-[#E5D3BF]/75 font-light hidden sm:block max-w-md" style={{ fontSize: '12px' }}>
              {currentRoom.description}
            </p>
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="text-[#D4B87A] hover:text-white font-semibold flex items-center gap-1 shrink-0 bg-[#B8955A]/20 px-3 py-1.5 rounded-xl border border-[#B8955A]/40 hover:bg-[#B8955A] hover:text-[#191715] transition-all"
            style={{ fontSize: '12px' }}
          >
            <span>Explore Full View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Helper text */}
      <div className="flex items-center justify-between px-2 pt-2 text-[#2A2623]/70 font-medium" style={{ fontSize: '11px' }}>
        <span className="flex items-center gap-1 text-[#191715]">
          <Layers className="w-3.5 h-3.5 text-[#B8955A]" />
          <span>Click any ✦ hotspot to inspect salon interior details</span>
        </span>
        <span className="text-[#886835] font-serif italic hidden sm:inline">
          Sara's Beauty & Bridal Studio • Guduvanchery
        </span>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-[#191715]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 text-white"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B8955A]/30">
            <div>
              <span className="text-xs font-semibold text-[#D4B87A] uppercase tracking-widest">
                Interactive Parlour Interior Tour
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#F8F3ED]">
                {currentRoom.name} — {currentRoom.subtitle}
              </h2>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 rounded-3xl overflow-hidden border border-[#B8955A]/40 bg-black flex items-center justify-center">
            <img
              src={currentRoom.image}
              alt={currentRoom.name}
              className="w-full h-full object-contain"
              style={{
                filter: isWarmMode ? 'brightness(1.05) sepia(0.1)' : 'none'
              }}
            />

            {/* Fullscreen Room Tabs */}
            <div className="absolute bottom-6 left-1/2 bg-[#191715]/90 backdrop-blur-xl p-2 rounded-2xl border border-[#B8955A]/50 flex items-center gap-2" style={{ transform: 'translateX(-50%)' }}>
              {ROOMS.map(room => (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setActiveHotspot(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeRoomId === room.id
                      ? 'bg-[#B8955A] text-[#191715]'
                      : 'text-[#E5D3BF] hover:bg-white/10'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
