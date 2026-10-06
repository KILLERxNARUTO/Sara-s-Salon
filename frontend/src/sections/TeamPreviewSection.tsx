import React from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Award } from 'lucide-react';

export const TeamPreviewSection: React.FC = () => {
  const team = [
    {
      name: 'Sara K.',
      role: 'Founder & Chief Bridal Artist',
      specialty: 'Bridal Makeovers & Saree Draping',
      experience: '10+ Years Experience',
    },
    {
      name: 'Priya R.',
      role: 'Senior Hair & Mehendi Stylist',
      specialty: 'Bridal Mehendi & Hair Care',
      experience: '7+ Years Experience',
    },
    {
      name: 'Deepa M.',
      role: 'Skin & Aesthetic Specialist',
      specialty: 'O3+ Facials & Rejuvenation',
      experience: '6+ Years Experience',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8F3ED] border-b border-[#E5D3BF]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Passionate Artists"
          title="Meet Our Master Stylists"
          description="Experienced, certified beauty professionals devoted to perfecting every delicate detail."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E5D3BF] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center">
                {/* Monogram Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EFE3D5] to-[#D4B87A] flex items-center justify-center font-serif text-2xl font-bold text-[#191715] mb-5 shadow-inner border border-[#B8955A]/30">
                  {member.name.charAt(0)}
                </div>

                <span className="text-[10px] uppercase tracking-widest font-bold text-[#886835] bg-[#EFE3D5] px-3 py-1 rounded-full mb-3">
                  {member.role}
                </span>

                <h3 className="font-serif text-2xl font-medium text-[#191715] mb-1">
                  {member.name}
                </h3>

                <p className="text-xs text-[#2A2623]/70 font-light mb-4">
                  {member.specialty}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-[#E5D3BF]/60 flex items-center justify-center gap-1.5 text-xs text-[#191715] font-medium">
                <Award className="w-4 h-4 text-[#B8955A]" />
                <span>{member.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
