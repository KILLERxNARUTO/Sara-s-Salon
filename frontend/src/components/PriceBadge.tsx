import React from 'react';
import { formatPrice } from '@/utils/price';

interface PriceBadgeProps {
  price: number | null | undefined;
  priceType?: 'FIXED' | 'STARTS_FROM' | 'CONTACT';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  priceType = 'FIXED',
  size = 'md',
  className = '',
}) => {
  const formatted = formatPrice(price, priceType);

  const sizeClasses = {
    sm: 'text-xs font-medium py-1 px-2.5',
    md: 'text-sm font-semibold py-1.5 px-3',
    lg: 'text-base font-bold py-2 px-4',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#EFE3D5] text-[#191715] border border-[#B8955A]/30 tracking-tight ${sizeClasses} ${className}`}
    >
      {formatted}
    </span>
  );
};
