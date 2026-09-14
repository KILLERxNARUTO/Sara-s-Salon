import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Instagram } from '@/components/icons/Instagram';
import { BUSINESS_INFO } from '@/data/constants';
import { Button } from '@/components/Button';

export const InstagramSection: React.FC = () => {
  const posts = [
    { label: 'Bridal Saree Draping Perfection', tag: '#BridalSaree' },
    { label: 'Intricate Bridal Henna Pattern', tag: '#SaraMehendi' },
    { label: 'O3+ Illuminating Glow Session', tag: '#SkinGlow' },
    { label: 'Layer Cut & Soft Waves Styling', tag: '#HairArtistry' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#191715] text-[#F8F3ED] border-t border-[#2A2623]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#D4B87A] flex items-center justify-center md:justify-start gap-2">
              <Instagram className="w-4 h-4 text-[#D4B87A]" />
              <span>Follow Our Beauty Journey</span>
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-white">
              {BUSINESS_INFO.instagram_handle}
            </h2>
          </div>

          <Button
            href={BUSINESS_INFO.instagram_url}
            isExternal
            variant="outline"
            size="md"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Follow on Instagram
          </Button>
        </div>

        {/* Visual Instagram Card Previews */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={BUSINESS_INFO.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-[#2A2623] border border-[#B8955A]/20 hover:border-[#D4B87A]/60 aspect-square flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-full bg-[#191715] border border-[#B8955A]/30 flex items-center justify-center text-[#D4B87A] mb-3 group-hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif text-white group-hover:text-[#D4B87A] transition-colors line-clamp-2">
                {post.label}
              </span>
              <span className="text-[10px] text-[#E5D3BF]/60 tracking-wider mt-2">
                {post.tag}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
