import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 md:py-36 bg-[#F8F3ED] text-center">
      <div className="container-custom max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EFE3D5] flex items-center justify-center font-serif text-3xl font-bold text-[#886835] mx-auto">
          404
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#191715]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#2A2623]/70 font-light leading-relaxed">
          The beauty experience you are looking for doesn't exist or has been relocated.
        </p>
        <div className="pt-2">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
