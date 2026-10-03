import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AvatarList {
  image: string;
}

export interface HeroProps {
  avatarList?: AvatarList[];
}

export default function HeroSection({ avatarList = [] }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#141210] text-[#E5D3BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4B87A]/30 text-[#D4B87A] text-xs uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Makeover & Bridal Sanctuary</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Where Elegance Becomes <span className="text-[#D4B87A]">Artistry</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#E5D3BF]/75 max-w-2xl mx-auto font-light leading-relaxed">
          Premium ladies & kids beauty studio offering bespoke bridal makeovers, couture hair sculpting, and luxury dermatological skin rituals.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="bg-gradient-to-r from-[#B8955A] via-[#C9A96A] to-[#B8955A] text-[#141210] font-semibold text-xs tracking-[0.16em] uppercase px-8 py-3 rounded-full shadow-lg shadow-[#D4B87A]/25"
          >
            <Link to="/book" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#141210]" />
              <span>Book Appointment</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-white/20 text-[#E5D3BF] hover:bg-white/5 text-xs tracking-[0.16em] uppercase px-7 py-3 rounded-full"
          >
            <Link to="/services" className="flex items-center gap-2">
              <span>View Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Client Avatars */}
        {avatarList.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#E5D3BF]/80">
            <div className="flex -space-x-3">
              {avatarList.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar.image}
                  alt={`Client ${idx + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-[#141210] object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#D4B87A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4B87A]" />
                ))}
              </div>
              <span className="font-medium text-white">5.0</span>
              <span className="text-[#E5D3BF]/60">(1,000+ Happy Clients)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
