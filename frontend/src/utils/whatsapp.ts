import { WHATSAPP_NUMBER } from '@/data/constants';

interface WhatsAppBookingData {
  serviceName?: string;
  categoryName?: string;
  customerName?: string;
  date?: string;
  time?: string;
  notes?: string;
}

export const generateWhatsAppLink = (message: string): string => {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const generateGeneralInquiryLink = (): string => {
  const message = `Hello Sara's Beauty & Bridal Studio! I would like to inquire about your services.`;
  return generateWhatsAppLink(message);
};

export const generateBookingWhatsAppLink = (data: WhatsAppBookingData): string => {
  let message = `Hello Sara's Beauty & Bridal Studio! I'd like to book an appointment.\n\n`;
  if (data.serviceName) {
    message += `✨ Service: ${data.serviceName}\n`;
  }
  if (data.categoryName) {
    message += `📂 Category: ${data.categoryName}\n`;
  }
  if (data.customerName) {
    message += `👤 Name: ${data.customerName}\n`;
  }
  if (data.date) {
    message += `📅 Date: ${data.date}\n`;
  }
  if (data.time) {
    message += `⏰ Preferred Time: ${data.time}\n`;
  }
  if (data.notes) {
    message += `💬 Note: ${data.notes}\n`;
  }
  message += `\nPlease confirm availability. Thank you!`;
  return generateWhatsAppLink(message);
};

export const generateBridalInquiryLink = (packageName?: string): string => {
  const message = packageName 
    ? `Hello Sara's Beauty & Bridal Studio! I am interested in your ${packageName} Bridal Package. Could you please share more details and availability?`
    : `Hello Sara's Beauty & Bridal Studio! I am planning my wedding and would like to inquire about your bridal makeover packages and consultation.`;
  return generateWhatsAppLink(message);
};
