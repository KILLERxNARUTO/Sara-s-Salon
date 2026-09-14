import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '@/data/services';
import { SectionHeading } from '@/components/SectionHeading';
import { PriceBadge } from '@/components/PriceBadge';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

export const ServiceMenuPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'facial' | 'hair' | 'waxing' | 'mehendi'>('all');

  const tabs = [
    { id: 'all', label: 'Popular Picks' },
    { id: 'facial', label: 'Facial & Skin' },
    { id: 'hair', label: 'Hair & Styling' },
    { id: 'waxing', label: 'Waxing & Threading' },
    { id: 'mehendi', label: 'Mehendi & Saree' },
  ] as const;

  // Filter top representative services
  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeTab === 'all') {
      return s.is_featured || ['svc-001', 'svc-022', 'svc-037', 'svc-041', 'svc-055', 'svc-068', 'svc-078', 'svc-089'].includes(s.id);
    }
    if (activeTab === 'facial') return s.category_id === 'cat-facial' || s.category_id === 'cat-addon';
    if (activeTab === 'hair') return s.category_id === 'cat-haircut' || s.category_id === 'cat-hairstyles' || s.category_id === 'cat-hairtreat';
    if (activeTab === 'waxing') return s.category_id === 'cat-honey-wax' || s.category_id === 'cat-rica-wax' || s.category_id === 'cat-threading';
    if (activeTab === 'mehendi') return s.category_id === 'cat-mehendi' || s.category_id === 'cat-other';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-[#F8F3ED]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Transparent Pricing"
          title="Service Menu Highlights"
          description="Explore our authentic menu with clear, upfront pricing. No hidden costs — only pure luxury care."
          align="center"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#191715] text-white shadow-md'
                  : 'bg-[#EFE3D5] text-[#2A2623] hover:bg-[#E5D3BF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-[#E5D3BF] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#886835] bg-[#EFE3D5] px-2.5 py-1 rounded-md">
                    {service.duration || 'Session'}
                  </span>
                  <PriceBadge price={service.price} priceType={service.price_type} size="sm" />
                </div>

                <h3 className="font-serif text-lg font-medium text-[#191715] mb-2 leading-snug">
                  {service.name}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5D3BF]/60 flex items-center justify-between">
                <Link
                  to={`/book?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8955A] hover:text-[#191715] transition-colors uppercase tracking-wider"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This</span>
                </Link>
                <Link
                  to="/services"
                  className="text-xs text-[#2A2623]/60 hover:text-[#191715]"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Button
            href="/services"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Full 80+ Service Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};
