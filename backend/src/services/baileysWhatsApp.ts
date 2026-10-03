// ============================================
// Sara's Beauty Studio — Self-Hosted WhatsApp Service
// Powered by @whiskeysockets/baileys
// 100% Free, Automated WhatsApp Web Integration
// ============================================

import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
} from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import pino from 'pino';
import path from 'path';
import fs from 'fs';

let sock: WASocket | null = null;
let qrCodeDataUrl: string | null = null;
let connectionStatus: 'disconnected' | 'connecting' | 'qr_ready' | 'connected' = 'disconnected';
let connectedUserPhone: string | null = null;

// Auth session storage path
const AUTH_DIR = path.join(process.cwd(), 'auth_info_baileys');

export interface BookingAlertPayload {
  customerName: string;
  phone: string;
  email?: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  bookingRef: string;
}

/**
 * Initialize WhatsApp Web Socket connection
 */
export async function initWhatsAppClient(): Promise<void> {
  try {
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }) as any,
      browser: ['Sara Beauty Studio', 'Chrome', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        connectionStatus = 'qr_ready';
        try {
          qrCodeDataUrl = await QRCode.toDataURL(qr, {
            margin: 2,
            width: 320,
            color: {
              dark: '#141210',
              light: '#FFFFFF',
            },
          });
          console.log('\n[WhatsApp Bot] New QR Code generated! Open http://localhost:3001/whatsapp-qr to scan.');
        } catch (qrErr) {
          console.error('[WhatsApp Bot] QR generation error:', qrErr);
        }
      }

      if (connection === 'close') {
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        console.log(`[WhatsApp Bot] Connection closed. Status code: ${statusCode}. Reconnecting: ${shouldReconnect}`);
        connectionStatus = 'disconnected';
        connectedUserPhone = null;
        qrCodeDataUrl = null;

        if (shouldReconnect) {
          setTimeout(() => {
            initWhatsAppClient().catch(console.error);
          }, 3000);
        } else {
          console.warn('[WhatsApp Bot] Device logged out. Please clear auth_info_baileys and re-scan QR code.');
        }
      } else if (connection === 'open') {
        connectionStatus = 'connected';
        qrCodeDataUrl = null;

        const userJid = sock?.user?.id || '';
        connectedUserPhone = userJid.split(':')[0].split('@')[0];

        console.log(`\n======================================================`);
        console.log(`[WhatsApp Bot] CONNECTED SUCCESSFULLY as +${connectedUserPhone}!`);
        console.log(`[WhatsApp Bot] Automated WhatsApp booking alerts are now ACTIVE.`);
        console.log(`======================================================\n`);
      }
    });
  } catch (error: any) {
    console.error('[WhatsApp Bot] Initialization error:', error.message);
    connectionStatus = 'disconnected';
  }
}

/**
 * Get current connection state and live QR code
 */
export function getWhatsAppStatus() {
  return {
    status: connectionStatus,
    isConnected: connectionStatus === 'connected',
    qrCodeDataUrl,
    connectedUserPhone,
  };
}

/**
 * Send automated booking alert to owner's WhatsApp
 */
export async function sendWhatsAppBookingAlert(
  payload: BookingAlertPayload
): Promise<{ success: boolean; message: string }> {
  const rawPhones = process.env.CALLMEBOT_PHONE || process.env.OWNER_PHONE || '918438165114,919790690628';
  const targetPhones = rawPhones
    .split(',')
    .map((p) => p.trim().replace(/[^0-9]/g, ''))
    .filter(Boolean);

  const lines = [
    `*NEW APPOINTMENT BOOKED*`,
    `--------------------------------`,
    `*Client:* ${payload.customerName}`,
    `*Phone:* ${payload.phone}`,
    payload.email ? `*Email:* ${payload.email}` : null,
    `*Service:* ${payload.serviceName}`,
    `*Date:* ${payload.date}`,
    `*Time:* ${payload.time}`,
    payload.notes ? `*Notes:* ${payload.notes}` : null,
    `*Booking Ref:* ${payload.bookingRef}`,
    `--------------------------------`,
    `_Sara's Beauty & Bridal Studio Atelier_`,
  ].filter(Boolean);

  const messageText = lines.join('\n');

  if (!sock || connectionStatus !== 'connected') {
    const errorMsg = `WhatsApp bot is not connected yet (status: ${connectionStatus}). Please scan the QR code at http://localhost:3001/whatsapp-qr`;
    console.warn(`[WhatsApp Bot] Cannot send alert: ${errorMsg}`);
    return { success: false, message: errorMsg };
  }

  const results: string[] = [];

  for (const cleanPhone of targetPhones) {
    const recipientJid = `${cleanPhone}@s.whatsapp.net`;
    try {
      await sock.sendMessage(recipientJid, { text: messageText });
      console.log(`[WhatsApp Bot] Successfully sent automated alert to +${cleanPhone} for booking ${payload.bookingRef}`);
      results.push(`+${cleanPhone}`);
    } catch (error: any) {
      console.error(`[WhatsApp Bot] Failed to send message to +${cleanPhone}:`, error.message);
    }
  }

  if (results.length > 0) {
    return { success: true, message: `Alert sent via WhatsApp to: ${results.join(', ')}` };
  } else {
    return { success: false, message: 'Failed to send WhatsApp alert to recipients' };
  }
}

/**
 * Logout and clear session to link a different WhatsApp phone number
 */
export async function logoutWhatsAppClient(): Promise<void> {
  try {
    if (sock) {
      await sock.logout();
    }
  } catch (err) {}

  sock = null;
  connectionStatus = 'disconnected';
  connectedUserPhone = null;
  qrCodeDataUrl = null;

  if (fs.existsSync(AUTH_DIR)) {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
  }

  console.log('[WhatsApp Bot] Logged out. Re-generating fresh QR code for new device...');

  setTimeout(() => {
    initWhatsAppClient().catch(console.error);
  }, 1000);
}
