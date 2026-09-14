import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '@/components/SectionHeading';
import { SERVICES_DATA } from '@/data/services';
import { Button } from '@/components/Button';
import { generateBookingWhatsAppLink } from '@/utils/whatsapp';
import { Calendar, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialOccasion = searchParams.get('occasion') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceName: initialService || (initialOccasion ? `${initialOccasion} Package` : ''),
    date: '',
    time: '10:30 AM',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceName: initialService }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappBookingUrl = generateBookingWhatsAppLink({
    customerName: formData.name,
    serviceName: formData.serviceName,
    date: formData.date,
    time: formData.time,
    notes: formData.notes,
  });

  return (
    <div className="py-16 md:py-24 bg-[#F8F3ED] min-h-screen">
      <div className="container-custom max-w-3xl mx-auto">
        <SectionHeading
          subtitle="Easy Online Booking"
          title="Reserve Your Appointment"
          description="Select your preferred service and time. We will confirm your slot instantly."
          align="center"
        />

        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5D3BF] shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl font-medium text-[#191715]">
              Appointment Request Received!
            </h3>

            <p className="text-sm text-[#2A2623]/80 font-light max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>! We have noted your request for <strong>{formData.serviceName}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
            </p>

            <div className="p-4 bg-[#F8F3ED] rounded-2xl max-w-md mx-auto text-xs text-[#2A2623]/80">
              💡 For fastest instant confirmation, click below to notify us directly on WhatsApp with your booking details.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                href={whatsappBookingUrl}
                isExternal
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Send via WhatsApp
              </Button>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
              >
                Book Another Service
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5D3BF] shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                Select Service / Package *
              </label>
              <select
                required
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50 bg-white"
              >
                <option value="">-- Choose a Service or Package --</option>
                <optgroup label="Popular & Bridal Packages">
                  <option value="Bridal Makeover (O3+) - ₹4000">Bridal Makeover (O3+) - ₹4,000</option>
                  <option value="Bridal Makeover (Lotus) - ₹3500">Bridal Makeover (Lotus) - ₹3,500</option>
                  <option value="Signature Bridal Package">Signature Bridal Package</option>
                  <option value="Luxe Royal Bridal Package">Luxe Royal Bridal Package</option>
                  <option value="Bridal Mehendi Full Hand - ₹3000">Bridal Mehendi Full Hand - ₹3,000</option>
                </optgroup>
                <optgroup label="All Individual Salon Services">
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={`${s.name} - ₹${s.price}`}>
                      {s.name} ({s.price_type === 'STARTS_FROM' ? 'Starts ' : ''}₹{s.price})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50 bg-white"
                />
              </div>

              {/* Preferred Time Slot */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                  Preferred Time *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50 bg-white"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
            </div>

            {/* Special Instructions / Notes */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#191715]">
                Special Requests / Skin Concerns (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Let us know if you have specific preferences, wedding date details, or skin sensitivity..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E5D3BF] text-sm text-[#191715] focus:outline-none focus:ring-2 focus:ring-[#B8955A]/50"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                icon={<Calendar className="w-4 h-4" />}
              >
                Confirm Appointment Request
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
