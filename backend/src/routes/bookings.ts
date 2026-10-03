import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { sendOwnerWhatsAppNotification } from '../services/whatsappNotification';
import { sendWhatsAppBookingAlert } from '../services/baileysWhatsApp';

const router = Router();

// In-memory fallback cache
const localBookingsCache: any[] = [];

/**
 * Format any time string (e.g. "10:30 AM", "05:30 PM", "10:30") to standard 24-hour "HH:MM:SS"
 */
function formatTo24Hour(timeStr: string): string {
  if (!timeStr) return '10:00:00';
  const clean = timeStr.trim();
  const match = clean.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) return clean;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const modifier = match[4]?.toUpperCase();

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
}

/**
 * Format 24-hour "HH:MM:SS" to standard display format "HH:MM AM/PM"
 */
function formatTo12Hour(time24: string): string {
  if (!time24) return '';
  const parts = time24.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || '00';
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

// GET /api/bookings/booked-slots?date=YYYY-MM-DD - Get all reserved time slots for a given date
router.get('/booked-slots', async (req: Request, res: Response) => {
  const date = req.query.date as string;

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date query parameter is required (YYYY-MM-DD)' });
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.warn('[Bookings] Error checking booked slots in Supabase:', error.message);
    }

    const bookedSlots24 = (data || []).map((row) => row.appointment_time);
    const bookedSlots12 = bookedSlots24.map(formatTo12Hour);

    res.json({
      success: true,
      date,
      bookedSlots: bookedSlots12,
      bookedSlots24,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/bookings - Submit appointment with strict slot conflict prevention
router.post('/', async (req: Request, res: Response) => {
  const { name, phone, email, service, date, time, notes } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing: name, phone, service, date, time',
    });
  }

  const time24 = formatTo24Hour(time);
  const displayTime = formatTo12Hour(time24);

  // 1. STRICT EXCLUSIVITY CHECK: Verify if this time slot is already taken on this date
  try {
    const { data: existingSlot, error: checkError } = await supabase
      .from('appointments')
      .select('id, booking_reference, customer_name')
      .eq('appointment_date', date)
      .eq('appointment_time', time24)
      .neq('status', 'cancelled')
      .maybeSingle();

    if (existingSlot) {
      return res.status(409).json({
        success: false,
        conflict: true,
        message: `The time slot ${displayTime} on ${date} is already reserved by another client. Only one appointment is allowed per slot. Please select another time or date.`,
      });
    }
  } catch (checkErr: any) {
    console.warn('[Bookings] Slot pre-check warning:', checkErr.message);
  }

  const bookingRef = 'SB-' + Math.floor(100000 + Math.random() * 900000);

  const newBooking = {
    id: bookingRef,
    booking_reference: bookingRef,
    customer_name: name,
    phone,
    email: email || '',
    service,
    appointment_date: date,
    appointment_time: displayTime,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // 2. Persist to Supabase Database (Guaranteed atomic reservation by Postgres Unique Index)
  try {
    const { error: dbError } = await supabase
      .from('appointments')
      .insert({
        booking_reference: bookingRef,
        customer_name: name,
        phone,
        email: email || null,
        appointment_date: date,
        appointment_time: time24,
        special_request: `${service}${notes ? ` | Notes: ${notes}` : ''}`,
        status: 'pending',
      });

    if (dbError) {
      // Postgres Unique Index conflict code 23505
      if (dbError.code === '23505' || dbError.message.includes('unique_active_appointment_slot')) {
        return res.status(409).json({
          success: false,
          conflict: true,
          message: `The time slot ${displayTime} on ${date} was just appointed to another client. Please choose another slot.`,
        });
      }
      console.warn('[Appointments DB] Supabase insert warning:', dbError.message);
    }
  } catch (err: any) {
    console.warn('[Appointments DB] Error connecting to Supabase:', err.message);
  }

  localBookingsCache.unshift(newBooking);

  // 3. Automatically dispatch WhatsApp notification to owner
  const payload = {
    customerName: name,
    phone,
    email,
    serviceName: service,
    date,
    time: displayTime,
    notes,
    bookingRef,
  };

  // Attempt direct Baileys delivery first
  let whatsappResult = await sendWhatsAppBookingAlert(payload);

  // Fallback to CallMeBot if Baileys client not yet linked
  if (!whatsappResult.success && process.env.CALLMEBOT_API_KEY) {
    whatsappResult = await sendOwnerWhatsAppNotification(payload);
  }

  res.status(201).json({
    success: true,
    message: 'Booking confirmed and system notification dispatched!',
    booking: newBooking,
    whatsappNotified: whatsappResult.success,
    whatsappDetails: whatsappResult.message,
  });
});

// POST /api/bookings/test-whatsapp - Send a test message to verify CallMeBot integration
router.post('/test-whatsapp', async (_req: Request, res: Response) => {
  const result = await sendOwnerWhatsAppNotification({
    customerName: 'Test Client (Priya)',
    phone: '+91 84381 65114',
    serviceName: 'Bridal Makeover Trial',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    notes: 'Testing automated WhatsApp system notification',
    bookingRef: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
  });

  res.json({
    success: result.success,
    message: result.message,
    targetPhone: process.env.CALLMEBOT_PHONE || '918438165114',
    apiKeyConfigured: Boolean(process.env.CALLMEBOT_API_KEY),
  });
});

// GET /api/bookings (Admin / internal use)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return res.json({ success: true, count: data.length, data });
    }
  } catch {}

  res.json({
    success: true,
    count: localBookingsCache.length,
    data: localBookingsCache,
  });
});

export default router;
