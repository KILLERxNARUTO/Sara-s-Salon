// ============================================
// CallMeBot Free WhatsApp Notification Service
// Sends automated booking alerts directly to the salon owner's WhatsApp
// ============================================

interface AppointmentNotificationPayload {
  customerName: string;
  phone: string;
  email?: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  bookingRef: string;
}

export async function sendOwnerWhatsAppNotification(
  payload: AppointmentNotificationPayload
): Promise<{ success: boolean; message: string }> {
  const targetPhone = process.env.CALLMEBOT_PHONE || '918438165114';
  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    const guidance = 
      `[CallMeBot] CALLMEBOT_API_KEY is not configured in backend/.env.\n` +
      `To activate automated WhatsApp alerts directly to ${targetPhone}:\n` +
      `1. Send 'I allow callmebot to send me messages' to +34 644 44 20 83 on WhatsApp.\n` +
      `2. Copy the API key received from CallMeBot.\n` +
      `3. Put CALLMEBOT_API_KEY=<your_api_key> in backend/.env.`;
    console.warn(guidance);
    return {
      success: false,
      message: 'CALLMEBOT_API_KEY is not set yet in backend/.env. Setup required once.',
    };
  }

  // Format clean professional WhatsApp alert
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
  const encodedText = encodeURIComponent(messageText);

  // Clean phone digits (remove +, spaces, hyphens)
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');

  const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodedText}&apikey=${apiKey.trim()}`;

  try {
    const response = await fetch(callMeBotUrl, {
      method: 'GET',
    });

    const responseText = await response.text();

    if (response.ok && !responseText.toLowerCase().includes('error')) {
      console.log(`[CallMeBot] Successfully sent WhatsApp alert to ${cleanPhone} for booking ${payload.bookingRef}`);
      return { success: true, message: 'WhatsApp notification sent successfully to owner.' };
    } else {
      console.error(`[CallMeBot] CallMeBot API responded with:`, responseText);
      return { success: false, message: `CallMeBot: ${responseText}` };
    }
  } catch (error: any) {
    console.error(`[CallMeBot] Network error calling CallMeBot:`, error.message);
    return { success: false, message: error.message };
  }
}
