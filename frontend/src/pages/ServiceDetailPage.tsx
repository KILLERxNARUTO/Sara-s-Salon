import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '@/data/services';
import { SIGNATURE_CATEGORIES } from '@/data/constants';
import type { ServiceCategory } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { PriceBadge } from '@/components/PriceBadge';
import { Button } from '@/components/Button';
import { ArrowLeft, Calendar } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find category or categories that match page_slug or slug
  const matchedCategories = SERVICE_CATEGORIES.filter(
    (c) => c.page_slug === slug || c.slug === slug
  );

  const categoryIds = matchedCategories.map((c) => c.id);

  const services = SERVICES_DATA.filter((s) => categoryIds.includes(s.category_id));

  const fallbackCategory: ServiceCategory = {
    id: slug || 'services',
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Services',
    description: 'Explore our specialized services tailored to your personal aesthetic goals.',
    slug: slug || '',
    page_slug: slug || '',
    image_url: '',
    display_order: 0,
    is_active: true,
  };

  const primaryCategory: ServiceCategory = matchedCategories[0] || fallbackCategory;

  // Find image from SIGNATURE_CATEGORIES
  const signatureMatch = SIGNATURE_CATEGORIES.find(
    (c) => c.slug === slug || c.slug === primaryCategory.page_slug
  );
  const heroImage = signatureMatch?.image;

  return (
    <div className="bg-[#F8F3ED]">
      {/* Hero Banner with Service Image */}
      {heroImage && (
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={heroImage}
            alt={primaryCategory.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3ED] via-black/40 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E5D3BF] mb-3">
              Category Menu
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {primaryCategory.name} Treatments
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl font-light">
              {primaryCategory.description}
            </p>
          </div>
        </div>
      )}

      <div className="py-16 md:py-24">
        <div className="container-custom">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#886835] hover:text-[#191715] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Categories</span>
            </Link>
          </div>

          {/* Show section heading only when there's no hero image */}
          {!heroImage && (
            <SectionHeading
              subtitle="Category Menu"
              title={`${primaryCategory.name} Treatments`}
              description={primaryCategory.description}
              align="center"
            />
          )}

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-[#E5D3BF] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#886835] bg-[#EFE3D5] px-2.5 py-1 rounded-md">
                      {service.duration || 'Session'}
                    </span>
                    <PriceBadge price={service.price} priceType={service.price_type} size="sm" />
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#191715] mb-2 leading-snug">
                    {service.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5D3BF]/60 flex items-center justify-between">
                  <Button
                    href={`/book?service=${encodeURIComponent(service.name)}`}
                    variant="primary"
                    size="sm"
                    icon={<Calendar className="w-3.5 h-3.5" />}
                    className="w-full"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12 text-[#2A2623]/60">
              <p className="text-base font-serif mb-4">No specific services found in this section.</p>
              <Button href="/services" variant="primary" size="md">
                View All Services
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
