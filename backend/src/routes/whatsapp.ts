import { Router, Request, Response } from 'express';
import { getWhatsAppStatus, sendWhatsAppBookingAlert, logoutWhatsAppClient } from '../services/baileysWhatsApp';

const router = Router();

// GET /api/whatsapp/status - API endpoint for status
router.get('/status', (_req: Request, res: Response) => {
  res.json(getWhatsAppStatus());
});

// POST /api/whatsapp/logout - Log out current WhatsApp device and generate fresh QR
router.post('/logout', async (_req: Request, res: Response) => {
  await logoutWhatsAppClient();
  res.json({ success: true, message: 'Logged out successfully. New QR code generating.' });
});

// POST /api/whatsapp/test - Trigger test alert
router.post('/test', async (_req: Request, res: Response) => {
  const result = await sendWhatsAppBookingAlert({
    customerName: 'Priya Sharma (Test)',
    phone: '+91 84381 65114',
    serviceName: 'Luxe Royal Bridal Package',
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    notes: 'Direct test alert from Sara Studio Backend',
    bookingRef: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
  });

  res.json(result);
});

// GET /whatsapp-qr - Visual Web Interface to Scan QR Code
router.get('/view-qr', (_req: Request, res: Response) => {
  const status = getWhatsAppStatus();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sara's Atelier — WhatsApp Bot Integration</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #141210;
      color: #F8F3ED;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      max-width: 480px;
      width: 100%;
      background: #191715;
      border: 1px solid rgba(212, 184, 122, 0.25);
      border-radius: 20px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5);
    }
    .tag {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #D4B87A;
      font-weight: 600;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 24px;
      font-weight: 500;
      letter-spacing: -0.01em;
      margin-bottom: 12px;
      color: #FFFFFF;
    }
    p {
      font-size: 13px;
      color: rgba(229, 211, 191, 0.8);
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .qr-container {
      background: #FFFFFF;
      padding: 16px;
      border-radius: 16px;
      display: inline-block;
      margin-bottom: 24px;
      border: 2px solid #D4B87A;
      box-shadow: 0 10px 30px rgba(212, 184, 122, 0.15);
    }
    .qr-container img {
      display: block;
      width: 250px;
      height: 250px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .badge-connected {
      background: rgba(29, 138, 110, 0.2);
      color: #4ADE80;
      border: 1px solid #1D8A6E;
    }
    .badge-waiting {
      background: rgba(212, 184, 122, 0.15);
      color: #D4B87A;
      border: 1px solid rgba(212, 184, 122, 0.3);
    }
    .steps {
      text-align: left;
      background: #141210;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 24px;
      font-size: 12px;
      color: rgba(229, 211, 191, 0.9);
      line-height: 1.8;
    }
    .steps ol { padding-left: 20px; }
    .btn {
      display: inline-block;
      width: 100%;
      background: #B8955A;
      color: #FFFFFF;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.1em;
      padding: 14px 20px;
      border-radius: 9999px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn:hover { background: #A07D45; transform: translateY(-1px); }
  </style>
</head>
<body>
  <div class="card" id="card-content">
    ${
      status.isConnected
        ? `
      <div class="tag">System Active</div>
      <div class="badge badge-connected">● WhatsApp Connected (+${status.connectedUserPhone})</div>
      <h1>Bot Online & Ready</h1>
      <p>Automated booking alerts are live. Every appointment booked by a customer will be automatically messaged to your WhatsApp in real-time.</p>
      <button class="btn" onclick="sendTestAlert()">Send Test WhatsApp Alert</button>
      <button class="btn" style="background: transparent; border: 1px solid rgba(229,211,191,0.25); color: #E5D3BF; margin-top: 12px;" onclick="unlinkDevice()">Switch Account / Link 9790690628</button>
      <div id="test-result" style="margin-top: 14px; font-size: 12px; color: #4ADE80;"></div>
    `
        : status.qrCodeDataUrl
        ? `
      <div class="tag">One-Time Setup</div>
      <div class="badge badge-waiting">● Scan QR Code with WhatsApp</div>
      <h1>Link Atelier WhatsApp</h1>
      <p>Scan this QR code to enable automated appointment notifications to your WhatsApp.</p>
      <div class="qr-container">
        <img src="${status.qrCodeDataUrl}" alt="WhatsApp QR Code" />
      </div>
      <div class="steps">
        <ol>
          <li>Open <strong>WhatsApp</strong> on your phone</li>
          <li>Tap <strong>Settings</strong> (or 3 dots on Android)</li>
          <li>Select <strong>Linked Devices</strong> & tap <strong>Link a Device</strong></li>
          <li>Point your camera at this QR code</li>
        </ol>
      </div>
      <p style="font-size: 11px; opacity: 0.6; margin-bottom: 0;">This page auto-refreshes every 2 seconds until connected.</p>
    `
        : `
      <div class="tag">Initializing</div>
      <div class="badge badge-waiting">● Generating Session...</div>
      <h1>Connecting to WhatsApp</h1>
      <p>Generating a secure WhatsApp Web session. This takes just a moment...</p>
    `
    }
  </div>

  <script>
    // Auto-poll status every 2 seconds
    async function checkStatus() {
      try {
        const res = await fetch('/api/whatsapp/status');
        const data = await res.json();
        const currentlyConnected = ${status.isConnected ? 'true' : 'false'};
        const hasQr = ${status.qrCodeDataUrl ? 'true' : 'false'};

        if (data.isConnected !== currentlyConnected || Boolean(data.qrCodeDataUrl) !== hasQr) {
          window.location.reload();
        }
      } catch (e) {}
    }
    setInterval(checkStatus, 2500);

    async function sendTestAlert() {
      const btn = document.querySelector('.btn');
      const resultDiv = document.getElementById('test-result');
      btn.innerText = 'Sending...';
      try {
        const res = await fetch('/api/whatsapp/test', { method: 'POST' });
        const json = await res.json();
        resultDiv.innerText = json.success ? 'Test alert sent to your WhatsApp!' : ('Error: ' + json.message);
      } catch (err) {
        resultDiv.innerText = 'Failed to send: ' + err.message;
      } finally {
        btn.innerText = 'Send Test WhatsApp Alert';
      }
    }

    async function unlinkDevice() {
      if (confirm('Disconnect current WhatsApp and show QR code to link 9790690628?')) {
        document.getElementById('test-result').innerText = 'Unlinking device and generating new QR...';
        await fetch('/api/whatsapp/logout', { method: 'POST' });
        setTimeout(() => window.location.reload(), 1500);
      }
    }
  </script>
</body>
</html>
  `;

  res.send(html);
});

export default router;
