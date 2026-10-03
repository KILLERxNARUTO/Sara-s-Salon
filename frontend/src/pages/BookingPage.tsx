import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '@/components/SectionHeading';
import { SERVICES_DATA } from '@/data/services';
import { Button } from '@/components/Button';
import { Calendar, CheckCircle2, Clock, User, Phone, Sparkles, AlertCircle } from 'lucide-react';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const TIME_SLOTS = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceName: initialService }));
    }
  }, [initialService]);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!formData.date) return;

    let isMounted = true;
    setIsLoadingSlots(true);

    fetch(`http://localhost:3001/api/bookings/booked-slots?date=${formData.date}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.bookedSlots)) {
          setBookedSlots(data.bookedSlots);

          // If the currently selected time is booked, switch to first open slot
          if (data.bookedSlots.includes(formData.time)) {
            const firstAvailable = TIME_SLOTS.find((s) => !data.bookedSlots.includes(s));
            if (firstAvailable) {
              setFormData((prev) => ({ ...prev, time: firstAvailable }));
            }
          }
        }
      })
      .catch((err) => {
        console.warn('Could not check booked slots:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.serviceName,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingRef(data.booking?.booking_reference || data.booking?.id || 'SB-' + Math.floor(100000 + Math.random() * 900000));
        setIsSubmitted(true);
      } else {
        // Handle slot conflict or validation error
        setErrorMessage(data.message || 'Could not process your booking. Please try another time slot.');
        // Refresh booked slots
        if (formData.date) {
          fetch(`http://localhost:3001/api/bookings/booked-slots?date=${formData.date}`)
            .then((r) => r.json())
            .then((d) => {
              if (d.success && Array.isArray(d.bookedSlots)) {
                setBookedSlots(d.bookedSlots);
              }
            })
            .catch(() => {});
        }
      }
    } catch (err: any) {
      console.warn('Booking API connection issue:', err);
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 md:py-28 bg-[#FDFBF7] min-h-screen text-[#191715]">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Section Heading - Open Minimalist Editorial */}
        <SectionHeading
          subtitle="Atelier Reservation"
          title="Reserve Your Appointment"
          description="Select your desired treatment and preferred time. Your details will be registered and automatically dispatched directly to our atelier director's WhatsApp."
          align="center"
        />

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSubmitted ? (
          /* Confirmation Screen - Box Free Editorial Layout */
          <div className="py-12 border-t border-b border-[#E5D3BF] space-y-8 animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#191715] text-[#D4B87A] flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8955A] font-medium">
                Reservation Confirmed
              </span>
              <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#191715]">
                Appointment Request Registered
              </h3>
              <p className="text-sm text-[#2A2623]/80 font-light max-w-lg leading-relaxed">
                Thank you, <strong className="font-medium text-[#191715]">{formData.name}</strong>. Your appointment request has been recorded into our atelier database and an automated notification has been dispatched to our director on WhatsApp.
              </p>
            </div>

            {/* Reservation Summary - Hairline Divided Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-[#E5D3BF]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Booking Reference
                </span>
                <span className="text-base font-medium text-[#191715] mt-1 block">
                  {bookingRef}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Service / Package
                </span>
                <span className="text-sm font-medium text-[#191715] mt-1 block truncate">
                  {formData.serviceName}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Date & Time
                </span>
                <span className="text-sm font-medium text-[#191715] mt-1 block">
                  {formData.date} at {formData.time}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Contact Phone
                </span>
                <span className="text-sm font-medium text-[#191715] mt-1 block">
                  {formData.phone}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    serviceName: '',
                    date: '',
                    time: '10:30 AM',
                    notes: '',
                  });
                }}
                variant="outline"
                size="md"
              >
                Book Another Service
              </Button>
              <Button
                href="/"
                variant="primary"
                size="md"
              >
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          /* Form Screen - Open Editorial Flow, No Heavy Box Cards */
          <form
            onSubmit={handleSubmit}
            className="pt-6 space-y-10"
          >
            {/* Step 1: Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  01
                </span>
                <h4 className="text-sm uppercase tracking-[0.18em] font-medium text-[#191715]">
                  Guest Information
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  02
                </span>
                <h4 className="text-sm uppercase tracking-[0.18em] font-medium text-[#191715]">
                  Treatment & Timing
                </h4>
              </div>

              <div className="space-y-6 pt-2">
                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                    Select Service or Bridal Package *
                  </label>
                  <select
                    required
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                  >
                    <option value="">-- Select treatment or couture ritual --</option>
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
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                        Preferred Time *
                      </label>
                      {isLoadingSlots && (
                        <span className="text-[10px] text-[#B8955A] font-light">
                          Checking slots...
                        </span>
                      )}
                    </div>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                    >
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <option
                            key={slot}
                            value={slot}
                            disabled={isBooked}
                            className={isBooked ? 'text-gray-400 bg-gray-50' : 'text-[#191715]'}
                          >
                            {slot} {isBooked ? '— Reserved (Unavailable)' : ''}
                          </option>
                        );
                      })}
                    </select>
                    {bookedSlots.length > 0 && (
                      <p className="text-[11px] text-[#A07D45] pt-0.5">
                        {bookedSlots.length} time slot(s) already appointed for this date.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Special Notes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  03
                </span>
                <h4 className="text-sm uppercase tracking-[0.18em] font-medium text-[#191715]">
                  Special Instructions
                </h4>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs uppercase font-medium tracking-wider text-[#191715]">
                  Requests / Skin Considerations (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify skin concerns, wedding date timings, entourage details, or specific preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5D3BF] bg-white text-sm text-[#191715] focus:outline-none focus:ring-1 focus:ring-[#B8955A] focus:border-[#B8955A] transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#E5D3BF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#2A2623]/70 font-light">
                Appointment details are automatically relayed to salon management for instant confirmation.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto !px-8 !py-3.5 shadow-lg shadow-[#B8955A]/20"
                icon={<Calendar className="w-4 h-4" />}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
