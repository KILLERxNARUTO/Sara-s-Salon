export const formatPrice = (price: number | null | undefined, priceType: 'FIXED' | 'STARTS_FROM' | 'CONTACT' = 'FIXED'): string => {
  if (price === null || price === undefined || priceType === 'CONTACT') {
    return 'Contact for Pricing';
  }

  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(price);

  if (priceType === 'STARTS_FROM') {
    return `Starts from ₹${formattedNumber}`;
  }

  return `₹${formattedNumber}`;
};

export const getPricePrefix = (priceType: 'FIXED' | 'STARTS_FROM' | 'CONTACT'): string => {
  if (priceType === 'STARTS_FROM') return 'Starts at';
  return '';
};
