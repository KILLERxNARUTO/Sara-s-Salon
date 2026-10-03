import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRouter from './routes/services';
import bookingsRouter from './routes/bookings';
import testimonialsRouter from './routes/testimonials';
import whatsappRouter from './routes/whatsapp';
import { initWhatsAppClient } from './services/baileysWhatsApp';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/whatsapp', whatsappRouter);

// Visual QR Scanner Interface
app.get('/whatsapp-qr', (_req, res) => {
  res.redirect('/api/whatsapp/view-qr');
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'Sara\'s Beauty & Bridal Studio API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.send('Sara\'s Beauty & Bridal Studio API Server is running!');
});

// Start server and initialize Baileys client
app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
  console.log(`📱 WhatsApp QR Scanner available at: http://localhost:${PORT}/whatsapp-qr`);
  
  // Start WhatsApp Client
  initWhatsAppClient().catch((err) => {
    console.error('[WhatsApp Bot] Initialization error on start:', err);
  });
});

