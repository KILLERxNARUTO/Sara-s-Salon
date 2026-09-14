import React from 'react';
import { PackagesPreviewSection } from '@/sections/PackagesPreviewSection';
import { ExperienceFinderSection } from '@/sections/ExperienceFinderSection';

export const PackagesPage: React.FC = () => {
  return (
    <div>
      <PackagesPreviewSection />
      <ExperienceFinderSection />
    </div>
  );
};
