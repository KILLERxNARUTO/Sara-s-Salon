import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/SectionHeading';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '@/data/services';
import { SIGNATURE_CATEGORIES } from '@/data/constants';
import { PriceBadge } from '@/components/PriceBadge';
import { Button } from '@/components/Button';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  Sparkles,
  Film
} from 'lucide-react';

// ---- Beauty Parlour Curated Background Video Playlist ----
const BEAUTY_VIDEOS = [
  {
    id: 'bridal',
    title: 'Bridal Makeover & Royal Artistry',
    category: 'Bridal & Makeup',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-putting-on-makeup-42654-large.mp4',
    poster: '/images/parlour_interior_bridal.jpg',
    badge: '✨ Bespoke Bridal'
  },
  {
    id: 'hair',
    title: 'Hair Spa, Keratin & Salon Styling',
    category: 'Hair Care',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-styling-the-hair-of-a-client-41484-large.mp4',
    poster: '/images/services/hair.jpg',
    badge: '💇 Hair Artistry'
  },
  {
    id: 'facial',
    title: 'Radiance Facials & Skin Therapy',
    category: 'Skincare',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-receiving-a-facial-treatment-41804-large.mp4',
    poster: '/images/services/facial.jpg',
    badge: '🌸 Facial Glow'
  },
  {
    id: 'spa',
    title: 'Rejuvenating Aroma Spa & Relaxation',
    category: 'Spa & Wellness',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-masseuse-giving-a-facial-massage-to-a-woman-41805-large.mp4',
    poster: '/images/services/spa.jpg',
    badge: '🧖‍♀️ Deep Spa'
  }
];

export const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Background Video State
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = BEAUTY_VIDEOS[currentVideoIndex];

  // Auto-cycle to next video on completion
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % BEAUTY_VIDEOS.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % BEAUTY_VIDEOS.length);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted without user interaction
      });
      setIsPlaying(true);
    }
  }, [currentVideoIndex]);

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      s.category_id === selectedCategory ||
      SERVICE_CATEGORIES.find((c) => c.slug === selectedCategory)?.id === s.category_id;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8F3ED] min-h-screen">
      
      {/* ============ HERO BANNER WITH LIVE MULTIPLE BACKGROUND VIDEOS ============ */}
      <div className="relative py-24 md:py-32 overflow-hidden bg-[#141210] text-[#F8F3ED] border-b border-[#B8955A]/30">
        
        {/* Full Background Video Player */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            key={activeVideo.videoUrl}
            src={activeVideo.videoUrl}
            poster={activeVideo.poster}
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover filter brightness-50 contrast-110 transition-opacity duration-1000 scale-105"
          />

          {/* Luxury Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/90 via-[#191715]/75 to-[#141210]/95" />
          <div className="absolute inset-0 bg-radial from-[#B8955A]/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Video Controls & Playlist Switcher (Floating Bar) */}
        <div className="container-custom relative z-10 text-center space-y-6">
          
          {/* Top Live Video Indicator */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8955A]/30 text-[#D4B87A] text-[11px] font-bold uppercase tracking-wider border border-[#B8955A]/40">
              <Film className="w-3.5 h-3.5 animate-pulse" />
              Live Studio Visuals
            </span>

            {/* Quick Video Switcher Pills */}
            <div className="hidden sm:flex items-center gap-1">
              {BEAUTY_VIDEOS.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setCurrentVideoIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    idx === currentVideoIndex
                      ? 'bg-[#B8955A] text-[#191715] font-bold shadow-md'
                      : 'text-[#E5D3BF]/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {v.badge}
                </button>
              ))}
            </div>

            {/* Video Controls (Play, Next, Mute) */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={nextVideo}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Next Beauty Video"
                aria-label="Next Video"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleMute}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight">
              Service Menu & <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#D4B87A] to-[#B8955A]">Authentic Pricing</span>
            </h1>

            <p className="text-[#E5D3BF]/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Explore 80+ bespoke beauty rituals, HD bridal makeovers, and skin therapies with 100% genuine products and upfront prices.
            </p>
          </div>

          {/* Current Playing Video Title Caption */}
          <div className="text-[11px] text-[#D4B87A] font-mono tracking-wide flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Now Playing: {activeVideo.title}</span>
          </div>

        </div>
      </div>

      {/* ============ CATEGORY CARDS GRID ============ */}
      <div className="container-custom -mt-10 relative z-20 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {SIGNATURE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/services/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-[#E5D3BF] hover:border-[#B8955A] transition-all duration-500 hover:-translate-y-1.5 bg-[#191715]"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-serif text-sm font-semibold text-white group-hover:text-[#D4B87A] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[#E5D3BF]/80 uppercase tracking-wider font-semibold group-hover:text-white transition-colors">
                  <span>Explore Menu</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ============ SEARCH & FILTERABLE SERVICE LIST ============ */}
      <div className="py-8 md:py-16">
        <div className="container-custom">
          
          {/* Search & Filter Controls */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#886835]" />
              <input
                type="text"
                placeholder="Search 80+ services (e.g. Eyebrows, Diamond Facial, Keratin Spa, Saree Draping)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#E5D3BF] text-sm text-[#191715] placeholder-[#2A2623]/40 focus:outline-none focus:ring-2 focus:ring-[#B8955A]/60 shadow-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#191715] text-white shadow-md'
                    : 'bg-[#EFE3D5] text-[#2A2623] hover:bg-[#E5D3BF]'
                }`}
              >
                All Services ({SERVICES_DATA.length})
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#191715] text-white shadow-md'
                      : 'bg-[#EFE3D5] text-[#2A2623] hover:bg-[#E5D3BF]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-[#E5D3BF] shadow-sm hover:shadow-xl hover:border-[#B8955A]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#886835] bg-[#EFE3D5] px-2.5 py-1 rounded-lg">
                      {service.duration || 'Session'}
                    </span>
                    <PriceBadge price={service.price} priceType={service.price_type} size="sm" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#191715] group-hover:text-[#886835] transition-colors mb-2 leading-snug">
                    {service.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5D3BF]/60 flex items-center justify-between">
                  <Link
                    to={`/book?service=${encodeURIComponent(service.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8955A] hover:text-[#191715] transition-colors uppercase tracking-wider"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </Link>
                  <Link
                    to={`/services/${SERVICE_CATEGORIES.find((c) => c.id === service.category_id)?.page_slug || 'all'}`}
                    className="text-xs text-[#2A2623]/60 hover:text-[#B8955A] font-medium transition-colors"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 text-[#2A2623]/60 space-y-2">
              <p className="text-lg font-serif">No services found matching "{searchTerm}"</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="text-xs text-[#B8955A] hover:underline font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default ServicesPage;
