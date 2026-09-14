import { Router, Request, Response } from 'express';

const router = Router();

const testimonials = [
  {
    id: '1',
    clientName: 'Priya Ramanathan',
    service: 'HD Airbrush Bridal Makeup',
    rating: 5,
    comment: 'Sara and her team made me feel like an absolute queen on my wedding day! The HD Airbrush makeup lasted all through the 8-hour ceremony without a single smudge.',
    verified: true,
    location: 'Guduvanchery'
  },
  {
    id: '2',
    clientName: 'Kavitha Sundaram',
    service: 'Keratin Hair Treatment & Hydra Glow Facial',
    rating: 5,
    comment: 'Best salon experience in Guduvanchery hands down. Extremely polite staff, clean hygienic ambience, and very reasonable pricing.',
    verified: true,
    location: 'Kanchipuram'
  },
  {
    id: '3',
    clientName: 'Ananya Krishnan',
    service: 'Pre-Bridal Glow Package',
    rating: 5,
    comment: 'Took the 3-session pre-bridal package. My skin cleared up completely and had a natural radiance on my reception day!',
    verified: true,
    location: 'Tambaram'
  }
];

router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

export default router;
