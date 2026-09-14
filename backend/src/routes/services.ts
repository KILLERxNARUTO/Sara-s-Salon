import { Router, Request, Response } from 'express';

const router = Router();

// Fallback services data matching the salon's price menu
const servicesData = [
  { id: '1', name: 'Threading - Eyebrows', category: 'Threading', price: 50, duration: '15 mins', popular: true },
  { id: '2', name: 'Threading - Upper Lip', category: 'Threading', price: 30, duration: '10 mins', popular: false },
  { id: '3', name: 'Threading - Full Face', category: 'Threading', price: 250, duration: '30 mins', popular: true },
  { id: '4', name: 'Fruit Facial', category: 'Facial & Cleanups', price: 800, duration: '45 mins', popular: false },
  { id: '5', name: 'Hydra Glow Facial', category: 'Facial & Cleanups', price: 2500, duration: '60 mins', popular: true },
  { id: '6', name: 'O3+ Brightening Facial', category: 'Facial & Cleanups', price: 3500, duration: '75 mins', popular: true },
  { id: '7', name: 'Golden Glow Shahnaz Facial', category: 'Facial & Cleanups', price: 4000, duration: '90 mins', popular: true },
  { id: '8', name: 'HD Airbrush Bridal Makeup', category: 'Bridal & Makeup', price: 15000, duration: '180 mins', popular: true },
  { id: '9', name: 'Traditional South Indian Bridal Package', category: 'Bridal & Makeup', price: 22000, duration: '240 mins', popular: true },
  { id: '10', name: 'Royal Maharani 3-Day Luxury Package', category: 'Bridal & Makeup', price: 35000, duration: '3 Days', popular: true },
  { id: '11', name: 'Hair Cut & Styling', category: 'Hair Care & Styling', price: 450, duration: '45 mins', popular: true },
  { id: '12', name: 'L\'Oreal Hair Spa', category: 'Hair Care & Styling', price: 1200, duration: '60 mins', popular: true },
  { id: '13', name: 'Keratin Hair Treatment', category: 'Hair Care & Styling', price: 4500, duration: '150 mins', popular: true },
  { id: '14', name: 'Permanent Smoothening / Straightening', category: 'Hair Care & Styling', price: 6000, duration: '210 mins', popular: true },
  { id: '15', name: 'Bridal Mehendi - Full Hands & Feet', category: 'Mehendi & Art', price: 5000, duration: '240 mins', popular: true },
  { id: '16', name: 'Rica Honey Waxing - Full Arms & Legs', category: 'Waxing & Bleach', price: 1200, duration: '45 mins', popular: true }
];

// GET /api/services
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: servicesData.length,
    data: servicesData
  });
});

// GET /api/services/:id
router.get('/:id', (req: Request, res: Response) => {
  const service = servicesData.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

export default router;
