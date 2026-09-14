import { Router, Request, Response } from 'express';

const router = Router();

// In-memory bookings store
const bookings: any[] = [];

// POST /api/bookings
router.post('/', (req: Request, res: Response) => {
  const { name, phone, email, service, date, time, notes } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing: name, phone, service, date, time'
    });
  }

  const newBooking = {
    id: 'BK-' + Date.now().toString().slice(-6),
    name,
    phone,
    email: email || '',
    service,
    date,
    time,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);

  // Format WhatsApp confirmation URL
  const whatsappMessage = encodeURIComponent(
    `Hello Sara's Beauty Studio! I have booked an appointment.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${time}\n*Booking Ref:* ${newBooking.id}`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  res.status(201).json({
    success: true,
    message: 'Booking submitted successfully!',
    booking: newBooking,
    whatsappUrl
  });
});

// GET /api/bookings (Admin / internal use)
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

export default router;
