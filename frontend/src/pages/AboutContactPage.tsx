import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  MessageCircle, 
  CheckCircle2, 
  Copy, 
  Navigation, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Send
} from 'lucide-react';
import { BUSINESS_INFO, PHONE_LINKS, EMAIL_LINK } from '@/data/constants';
import { generateWhatsAppLink, generateBookingWhatsAppLink } from '@/utils/whatsapp';
import { Button } from '@/components/Button';

// Instagram SVG Icon Component
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Distance Landmarks
const LANDMARKS = [
  { name: 'NPR Kalyana Mandapam', distance: '50m', time: '1 min walk' },
  { name: 'Guduvanchery Railway Station', distance: '800m', time: '3 mins' },
  { name: 'GST Road (NH 45 Junction)', distance: '500m', time: '2 mins' },
  { name: 'SRM University (Kattankulathur)', distance: '4 km', time: '8 mins' },
  { name: 'Vandalur Zoo / Crescent Univ', distance: '6.5 km', time: '12 mins' },
];

// FAQ Data
const FAQS = [
  {
    question: "Is Sara's Beauty & Bridal Studio exclusively for women?",
    answer: "Yes, absolutely! Sara's Studio is strictly for Ladies & Kids only. All our staff members and master artists are female, ensuring complete comfort, modesty, and a safe, private pampering environment."
  },
  {
    question: "Do you offer Bridal makeovers at wedding halls and home venues?",
    answer: "Yes! Our bridal team regularly travels to wedding halls, reception venues, and homes across Guduvanchery, Chengalpattu, Tambaram, and throughout Chennai. Early reservation is recommended to secure dates."
  },
  {
    question: "Is prior appointment booking mandatory?",
    answer: "Walk-ins are always warmly welcomed for quick services (threading, waxing, cleanups). However, for Bridal makeovers, Hair Spa/Treatments, and specialized Facials, advance booking is highly recommended to ensure zero waiting time."
  },
  {
    question: "Which makeup and skincare brands do you use?",
    answer: "We use only 100% genuine, dermatologist-tested, and premium salon brands including MAC, Kryolan, O3+, Lotus Professional, L'Oreal Professionnel, Nature's Essence, and Rica Waxing."
  },
  {
    question: "Where exactly are you located in Guduvanchery?",
    answer: "We are situated at No:77, Mahalakshmi Nagar, Main Road, Guduvanchery (PIN: 603202), right near NPR Kalyana Mandapam, just 3 minutes from Guduvanchery Railway Station and 2 minutes from GST Road."
  }
];

export const AboutContactPage: React.FC = () => {
  // Live Open/Closed Status
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Open Now until 8:30 PM');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mapMode, setMapMode] = useState<'visual' | 'google'>('visual');

  // Interactive Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Bridal Makeover (HD / O3+ / Lotus)',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Check operating hours (9:30 AM to 8:30 PM IST)
    const checkHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const timeVal = currentHour * 60 + currentMinute;
      const openTime = 9 * 60 + 30; // 9:30 AM
      const closeTime = 20 * 60 + 30; // 8:30 PM

      if (timeVal >= openTime && timeVal < closeTime) {
        setIsOpenNow(true);
        setStatusMessage('Open Now • Closes at 8:30 PM');
      } else {
        setIsOpenNow(false);
        setStatusMessage('Closed Now • Opens Tomorrow at 9:30 AM');
      }
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    const fullAddr = `${BUSINESS_INFO.address_line_1}, ${BUSINESS_INFO.address_line_2}, ${BUSINESS_INFO.city} (Landmark: ${BUSINESS_INFO.landmark})`;
    navigator.clipboard.writeText(fullAddr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappLink = generateBookingWhatsAppLink({
      customerName: formData.name,
      serviceName: formData.service,
      date: formData.date || 'Preferred earliest slot',
      time: formData.time,
      notes: `Phone: ${formData.phone}${formData.message ? ` | Note: ${formData.message}` : ''}`
    });
    window.open(whatsappLink, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#141210] text-[#F8F3ED] selection:bg-[#B8955A] selection:text-white overflow-hidden">
      
      {/* Dynamic Background Image with Ambient Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-25 mix-blend-screen scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/images/parlour_interior_main.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.65) contrast(1.15) saturate(1.1)'
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#141210]/95 via-[#191715]/90 to-[#141210]/98" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#B8955A]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[30rem] h-[30rem] bg-[#D4B87A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10">

        {/* 1. Hero Header */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 text-center px-4">
          <div className="container-custom max-w-4xl mx-auto space-y-6">
            
            {/* Badges & Live Status */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#B8955A]/20 text-[#E5D3BF] border border-[#B8955A]/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D4B87A]" />
                About Us & Studio Contact
              </span>

              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md ${
                isOpenNow 
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40' 
                  : 'bg-amber-950/50 text-amber-300 border-amber-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{statusMessage}</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
              Sara's Beauty & <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#D4B87A] to-[#B8955A]">Bridal Studio</span>
            </h1>

            <p className="text-base sm:text-lg text-[#E5D3BF]/85 font-light max-w-2xl mx-auto leading-relaxed">
              Guduvanchery's trusted haven for bespoke bridal artistry, radiant skincare therapies, and complete pampering.
            </p>

            {/* Quick-Jump Anchor Tabs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <a 
                href="#legacy" 
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#B8955A]/20 border border-white/10 hover:border-[#B8955A]/50 transition-all text-[#E5D3BF] hover:text-white"
              >
                ✨ Our Legacy
              </a>
              <a 
                href="#contact" 
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#B8955A]/20 border border-white/10 hover:border-[#B8955A]/50 transition-all text-[#E5D3BF] hover:text-white"
              >
                📞 Contact & Enquiry
              </a>
              <a 
                href="#location" 
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#B8955A]/20 border border-white/10 hover:border-[#B8955A]/50 transition-all text-[#E5D3BF] hover:text-white"
              >
                📍 Map & Directions
              </a>
              <a 
                href="#instagram" 
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#B8955A]/20 border border-white/10 hover:border-[#B8955A]/50 transition-all text-[#E5D3BF] hover:text-white"
              >
                📸 Instagram Feed
              </a>
              <a 
                href="#faqs" 
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#B8955A]/20 border border-white/10 hover:border-[#B8955A]/50 transition-all text-[#E5D3BF] hover:text-white"
              >
                ❓ FAQs
              </a>
            </div>
          </div>
        </section>


        {/* 2. Our Legacy Section */}
        <section id="legacy" className="py-12 md:py-16 px-4 scroll-mt-24">
          <div className="container-custom max-w-6xl mx-auto">
            
            {/* Story Card */}
            <div className="relative rounded-3xl p-8 md:p-14 bg-gradient-to-br from-[#231F1C]/90 to-[#191715]/95 border border-[#B8955A]/30 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8955A]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Story Text */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B8955A]/20 border border-[#B8955A]/40 text-[#D4B87A] text-xs font-semibold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    Celebrating 10+ Years of Artistry
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                    Where Passion Meets <span className="text-[#D4B87A] italic">Perfection</span>
                  </h2>

                  <p className="text-[#E5D3BF]/90 font-light text-base leading-relaxed">
                    Founded in 2014, <strong className="text-white font-medium">Sara's Beauty & Bridal Studio</strong> was born with a singular mission: to provide women and kids a private, hygienic, and luxurious environment for personalized care.
                  </p>

                  <p className="text-[#E5D3BF]/80 font-light text-sm sm:text-base leading-relaxed">
                    Over the past decade, we have proudly transformed over <strong>500+ brides</strong> and welcomed more than <strong>1,000+ happy clients</strong>. Whether you are visiting for a rejuvenating facial, intricate bridal mehendi, precision haircut, or a full Muhurtham makeover, our certified specialists craft each ritual with undivided personal care.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-[#D4B87A]">10+</div>
                      <div className="text-[11px] text-[#E5D3BF]/70 uppercase tracking-wider mt-0.5">Years Experience</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-[#D4B87A]">500+</div>
                      <div className="text-[11px] text-[#E5D3BF]/70 uppercase tracking-wider mt-0.5">Brides Styled</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-[#D4B87A]">100%</div>
                      <div className="text-[11px] text-[#E5D3BF]/70 uppercase tracking-wider mt-0.5">Ladies & Kids</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-[#D4B87A]">4.9★</div>
                      <div className="text-[11px] text-[#E5D3BF]/70 uppercase tracking-wider mt-0.5">Google Rating</div>
                    </div>
                  </div>
                </div>

                {/* Right Image Showcase */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#B8955A]/40 shadow-2xl group">
                    <img 
                      src="/images/parlour_interior_bridal.jpg" 
                      alt="Sara's Beauty Studio Interior" 
                      className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#191715]/80 backdrop-blur-md border border-white/10">
                      <p className="text-xs text-[#D4B87A] font-semibold uppercase tracking-wider">Studio Sanctuary</p>
                      <p className="text-sm text-white font-serif">Private, serene & hygienic beauty cabins</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. Contact & Interactive Enquiry Section */}
        <section id="contact" className="py-12 md:py-16 px-4 scroll-mt-24">
          <div className="container-custom max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4B87A] font-bold">
                Direct Touchpoint
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Get in Touch & Book Your Session
              </h2>
              <p className="text-sm text-[#E5D3BF]/80 font-light">
                Call, message on WhatsApp, or send a quick online inquiry. We are always ready to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct Phone & WhatsApp Hub */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* WhatsApp Quick Direct Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-900/30 border border-emerald-500/40 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-white font-medium">WhatsApp Priority Chat</h3>
                        <p className="text-xs text-emerald-300/80">Instant reply during studio hours</p>
                      </div>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <p className="text-xs text-[#E5D3BF]/80 leading-relaxed font-light">
                    Have questions about bridal packages, service prices, or custom styling? Chat directly with our manager.
                  </p>

                  <a 
                    href={generateWhatsAppLink("Hello Sara's Beauty Studio! I would like to inquire about appointments and bridal packages.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-950/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                </div>

                {/* Direct Calling Numbers Card */}
                <div className="p-6 rounded-3xl bg-[#1E1B18]/80 border border-white/10 backdrop-blur-xl space-y-4">
                  <h3 className="text-sm uppercase tracking-wider text-[#D4B87A] font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Direct Phone Lines
                  </h3>

                  <div className="space-y-3">
                    <a 
                      href={PHONE_LINKS.primary}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#B8955A]/40 transition-all group"
                    >
                      <div>
                        <div className="text-[11px] text-[#E5D3BF]/60 uppercase">Primary Mobile & WhatsApp</div>
                        <div className="text-base font-serif font-bold text-white group-hover:text-[#D4B87A] transition-colors">
                          +91 97906 90628
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-[#B8955A]/20 text-[#D4B87A] border border-[#B8955A]/30">
                        Call Now
                      </span>
                    </a>

                    <a 
                      href={PHONE_LINKS.secondary}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#B8955A]/40 transition-all group"
                    >
                      <div>
                        <div className="text-[11px] text-[#E5D3BF]/60 uppercase">Secondary Mobile</div>
                        <div className="text-base font-serif font-bold text-white group-hover:text-[#D4B87A] transition-colors">
                          +91 99400 99380
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-[#B8955A]/20 text-[#D4B87A] border border-[#B8955A]/30">
                        Call Now
                      </span>
                    </a>

                    <a 
                      href={PHONE_LINKS.landline}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#B8955A]/40 transition-all group"
                    >
                      <div>
                        <div className="text-[11px] text-[#E5D3BF]/60 uppercase">Studio Landline</div>
                        <div className="text-base font-serif font-bold text-white group-hover:text-[#D4B87A] transition-colors">
                          044 - 48555426
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-[#B8955A]/20 text-[#D4B87A] border border-[#B8955A]/30">
                        Call Now
                      </span>
                    </a>
                  </div>

                  {/* Email */}
                  <a 
                    href={EMAIL_LINK}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-[#E5D3BF] hover:text-white transition-all"
                  >
                    <Mail className="w-4 h-4 text-[#D4B87A] shrink-0" />
                    <span className="truncate">{BUSINESS_INFO.email}</span>
                  </a>
                </div>

                {/* Operating Hours Card */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#D4B87A]" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#D4B87A] font-semibold">Studio Timings</h4>
                      <p className="text-sm font-medium text-white">Monday — Sunday: 9:30 AM – 8:30 PM</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded bg-white/10 text-[#E5D3BF] font-mono">
                    Open 7 Days
                  </span>
                </div>

              </div>

              {/* Right Column: Interactive Quick Booking & Enquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-8 md:p-10 rounded-3xl bg-[#1E1B18]/90 border border-[#B8955A]/40 backdrop-blur-xl shadow-2xl relative">
                  
                  <div className="mb-6 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#B8955A]/20 text-[#D4B87A] border border-[#B8955A]/30">
                      <Sparkles className="w-3 h-3" /> Quick Online Request
                    </div>
                    <h3 className="font-serif text-2xl text-white font-medium">Send an Enquiry or Booking</h3>
                    <p className="text-xs text-[#E5D3BF]/75 font-light">
                      Fill out your details below — our system will immediately connect you with our bridal specialist via WhatsApp.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="font-serif text-xl text-white">Enquiry Prepared!</h4>
                      <p className="text-xs text-emerald-200/90 leading-relaxed max-w-md mx-auto">
                        Your appointment request details have been formatted. We have opened WhatsApp to connect you directly with Sara's studio team.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                            Your Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Priya Sundaram"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8955A] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                            Phone Number *
                          </label>
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. 9876543210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8955A] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Service Category */}
                      <div>
                        <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                          Desired Service / Package
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8955A] transition-colors"
                        >
                          <option value="Bridal Makeover (HD / O3+ / Lotus)" className="bg-[#191715] text-white">💍 Bridal Makeover (HD / O3+ / Lotus)</option>
                          <option value="Bridal Mehendi & Saree Draping" className="bg-[#191715] text-white">🌿 Bridal Mehendi & Saree Draping</option>
                          <option value="Hair Spa & Keratin / Smoothening" className="bg-[#191715] text-white">💇 Hair Spa, Keratin & Styling</option>
                          <option value="O3+ / Lotus Radiance Facial" className="bg-[#191715] text-white">✨ O3+ / Lotus Radiance Facial</option>
                          <option value="Rica Waxing & Threading" className="bg-[#191715] text-white">🍯 Rica Waxing & Threading</option>
                          <option value="Manicure, Pedicure & Nail Art" className="bg-[#191715] text-white">💅 Manicure, Pedicure & Nail Art</option>
                          <option value="Kids Haircut & Pampering" className="bg-[#191715] text-white">👧 Kids Haircut & Pampering</option>
                          <option value="Other Custom Services" className="bg-[#191715] text-white">🌟 Other Custom Services</option>
                        </select>
                      </div>

                      {/* Preferred Date & Time Slot */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                            Preferred Date
                          </label>
                          <input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8955A] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                            Preferred Time
                          </label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8955A] transition-colors"
                          >
                            <option value="Morning (10:00 AM - 1:00 PM)" className="bg-[#191715] text-white">Morning (10:00 AM - 1:00 PM)</option>
                            <option value="Afternoon (1:00 PM - 4:00 PM)" className="bg-[#191715] text-white">Afternoon (1:00 PM - 4:00 PM)</option>
                            <option value="Evening (4:00 PM - 8:00 PM)" className="bg-[#191715] text-white">Evening (4:00 PM - 8:00 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Note / Special Requirement */}
                      <div>
                        <label className="block text-xs font-medium text-[#E5D3BF] mb-1.5">
                          Notes / Specific Request (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your occasion, skin concerns, or preferred stylist..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8955A] transition-colors resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#B8955A] via-[#D4B87A] to-[#B8955A] hover:from-[#A8854A] hover:to-[#C4A86A] text-[#191715] font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Booking Request via WhatsApp</span>
                      </button>

                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>


        {/* 5. Location & Map Directions Section */}
        <section id="location" className="py-12 md:py-16 px-4 scroll-mt-24">
          <div className="container-custom max-w-6xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4B87A] font-bold">
                Studio Address & Navigation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Visit Us in Guduvanchery
              </h2>
              <p className="text-sm text-[#E5D3BF]/80 font-light">
                Conveniently located near NPR Mandapam with effortless road and train connectivity.
              </p>
            </div>

            <div className="p-6 md:p-10 rounded-3xl bg-[#1E1B18]/90 border border-[#B8955A]/30 backdrop-blur-xl shadow-2xl space-y-8">
              
              {/* Address Header + Action Buttons */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D4B87A]">
                    <MapPin className="w-5 h-5 text-[#B8955A]" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Sara's Beauty & Bridal Studio</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">
                    No:77, Mahalakshmi Nagar, Main Road, Guduvanchery - 603 202
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5D3BF]/80 font-light">
                    Prominent Landmark: <strong className="text-white">Near NPR Kalyana Mandapam</strong> (3 mins from Guduvanchery Station)
                  </p>
                </div>

                {/* Quick Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCopyAddress}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-2 border border-white/10 transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#D4B87A]" />
                        <span>Copy Full Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={BUSINESS_INFO.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#B8955A] hover:bg-[#A8854A] text-[#191715] font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Map Display & Interactive Switcher */}
              <div className="space-y-4">
                
                {/* View Switcher Tabs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 p-1 rounded-xl bg-black/40 border border-white/10">
                    <button
                      onClick={() => setMapMode('visual')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        mapMode === 'visual' 
                          ? 'bg-[#B8955A] text-[#191715] font-bold' 
                          : 'text-[#E5D3BF]/70 hover:text-white'
                      }`}
                    >
                      🗺️ Studio Landmark Map
                    </button>
                    <button
                      onClick={() => setMapMode('google')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        mapMode === 'google' 
                          ? 'bg-[#B8955A] text-[#191715] font-bold' 
                          : 'text-[#E5D3BF]/70 hover:text-white'
                      }`}
                    >
                      📍 Live Google Map
                    </button>
                  </div>

                  <span className="hidden sm:inline-block text-xs text-[#E5D3BF]/60">
                    Landmark Guide & GPS Routes
                  </span>
                </div>

                {/* Map View Area */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-black/60 min-h-[340px]">
                  {mapMode === 'visual' ? (
                    <div className="relative group">
                      <img 
                        src="/images/studio_map.jpg" 
                        alt="Guduvanchery Studio Location Map" 
                        className="w-full h-80 sm:h-[400px] object-cover"
                      />
                      <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-[#191715]/90 backdrop-blur-md border border-[#B8955A]/40 text-xs text-white">
                        <p className="font-semibold text-[#D4B87A]">Sara's Beauty & Bridal Studio</p>
                        <p className="text-[11px] text-[#E5D3BF]/80">Mahalakshmi Nagar Main Rd (Near NPR Mandapam)</p>
                      </div>
                      <a
                        href={BUSINESS_INFO.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 px-3.5 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-xs text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#D4B87A]" />
                        <span>Navigate on Phone</span>
                      </a>
                    </div>
                  ) : (
                    <iframe
                      title="Google Map Studio Location"
                      src="https://maps.google.com/maps?q=12.8427,80.0614&hl=en&z=15&output=embed"
                      width="100%"
                      height="400"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                      allowFullScreen={false}
                      loading="lazy"
                    />
                  )}
                </div>

              </div>

              {/* Nearby Landmarks & Distances */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                {LANDMARKS.map((lm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[11px] text-[#D4B87A] font-semibold truncate">{lm.name}</div>
                    <div className="flex items-center justify-between text-xs text-[#E5D3BF]/80">
                      <span>{lm.distance}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">{lm.time}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>


        {/* 6. Instagram Account Showcase (ID & Details Only) */}
        <section id="instagram" className="py-12 md:py-16 px-4 scroll-mt-24">
          <div className="container-custom max-w-5xl mx-auto">
            
            {/* Instagram Account Profile Card (ID & Details Only) */}
            <div className="p-8 md:p-10 rounded-3xl bg-[#1E1B18]/90 border border-[#B8955A]/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#fd1d1d]/10 via-[#833ab4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                
                {/* Left: Avatar & Profile Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  {/* Story Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#fd1d1d] via-[#f56040] to-[#833ab4] shadow-lg">
                      <div className="w-full h-full rounded-full bg-[#191715] flex items-center justify-center overflow-hidden p-2">
                        <img src="/logo.png" alt="Sara's Studio" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#191715]" />
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="font-serif text-2xl text-white font-bold tracking-tight">
                        saras_beauty_and_bridal_studio
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold border border-sky-500/30 flex items-center gap-1">
                        ✓ Verified Studio
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E5D3BF]/90 font-light max-w-xl leading-relaxed">
                      ✨ <strong className="text-white">Sara's Makeover Artistry</strong> • Premier Bridal & Ladies Sanctuary in Guduvanchery (Near NPR Mandapam). Handcrafted bridal looks, HD makeup & personalized luxury self-care.
                    </p>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#D4B87A] font-medium">
                        👰 500+ Brides Styled
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#E5D3BF] font-medium">
                        💄 10+ Yrs Artistry
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#E5D3BF] font-medium">
                        📍 Guduvanchery, Chennai
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Instagram Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href={BUSINESS_INFO.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Follow on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={BUSINESS_INFO.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#E5D3BF] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                    <span>View Highlights & Reels</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* 7. Interactive Studio FAQs Section */}
        <section id="faqs" className="py-12 md:py-16 px-4 scroll-mt-24">
          <div className="container-custom max-w-4xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4B87A] font-bold">
                Clear Answers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#E5D3BF]/80 font-light">
                Everything you need to know before visiting Sara's Studio.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-[#1E1B18]/80 border border-white/10 overflow-hidden transition-all backdrop-blur-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#D4B87A] transition-colors"
                    >
                      <span className="font-serif text-base sm:text-lg font-medium">
                        {faq.question}
                      </span>
                      <span className="p-1.5 rounded-full bg-white/5 text-[#D4B87A] shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#E5D3BF]/80 font-light leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* 8. Bottom Booking Call-to-Action Bar */}
        <section className="py-16 px-4 text-center border-t border-white/10 bg-gradient-to-t from-[#141210] to-[#191715]/80">
          <div className="container-custom max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4B87A] font-bold">
              Ready for your makeover?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Experience the Artistry of Sara's Studio
            </h2>
            <p className="text-sm text-[#E5D3BF]/80 font-light max-w-xl mx-auto">
              Call us or book an appointment online to reserve your exclusive pampering session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                href="/book"
                variant="primary"
                size="lg"
                icon={<Calendar className="w-4 h-4" />}
              >
                Book Appointment Online
              </Button>

              <Button
                href={generateWhatsAppLink("Hello! I would like to book a bridal consultation.")}
                isExternal
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};
