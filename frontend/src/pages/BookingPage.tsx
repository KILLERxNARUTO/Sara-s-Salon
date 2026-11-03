import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '@/components/SectionHeading';
import { SERVICES_DATA } from '@/data/services';
import { SALON_BRANCHES } from '@/data/constants';
import { Button } from '@/components/Button';
import { Calendar, CheckCircle2, AlertCircle, MapPin, MessageCircle } from 'lucide-react';
import { generateBookingWhatsAppLink } from '@/utils/whatsapp';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
];

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialOccasion = searchParams.get('occasion') || '';
  const initialBranch = searchParams.get('branch') || SALON_BRANCHES[0].id;

  const [formData, setFormData] = useState(() => ({
    branch: initialBranch,
    name: '',
    phone: '',
    serviceName: initialService || (initialOccasion ? `${initialOccasion} Package` : ''),
    date: '',
    time: '10:30 AM',
    notes: '',
  }));

  const [prevService, setPrevService] = useState(initialService);
  if (initialService !== prevService) {
    setPrevService(initialService);
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceName: initialService }));
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const selectedBranchObj =
    SALON_BRANCHES.find((b) => b.id === formData.branch) || SALON_BRANCHES[0];

  // Fetch booked slots whenever date or branch changes
  useEffect(() => {
    if (!formData.date) return;

    let isMounted = true;
    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const res = await fetch(
          `${API_URL}/api/bookings/booked-slots?date=${formData.date}&branch=${encodeURIComponent(formData.branch)}`
        );
        const data = await res.json();
        if (!isMounted) return;

        if (data.success && Array.isArray(data.bookedSlots)) {
          setBookedSlots(data.bookedSlots);

          // If current time is booked, switch to first open slot
          setFormData((prev) => {
            if (data.bookedSlots.includes(prev.time)) {
              const firstAvailable = TIME_SLOTS.find((s) => !data.bookedSlots.includes(s));
              if (firstAvailable) {
                return { ...prev, time: firstAvailable };
              }
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn('Could not check booked slots:', err);
      } finally {
        if (isMounted) setIsLoadingSlots(false);
      }
    };

    fetchSlots();

    return () => {
      isMounted = false;
    };
  }, [formData.date, formData.branch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.serviceName,
          branch: selectedBranchObj.address,
          branchName: selectedBranchObj.name,
          branchId: selectedBranchObj.id,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingRef(
          data.booking?.booking_reference ||
            data.booking?.id ||
            'SB-' + Math.floor(100000 + Math.random() * 900000)
        );
        setIsSubmitted(true);
      } else {
        // Handle slot conflict or validation error
        setErrorMessage(
          data.message || 'Could not process your booking. Please try another time slot.'
        );
        if (formData.date) {
          fetch(
            `${API_URL}/api/bookings/booked-slots?date=${formData.date}&branch=${encodeURIComponent(formData.branch)}`
          )
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

  const confirmationWhatsAppUrl = generateBookingWhatsAppLink({
    customerName: formData.name,
    branch: `${selectedBranchObj.name} (${selectedBranchObj.address})`,
    serviceName: formData.serviceName,
    date: formData.date,
    time: formData.time,
    notes: `Ref: ${bookingRef}${formData.notes ? ` | ${formData.notes}` : ''}`,
  });

  return (
    <div className="py-20 md:py-28 bg-[#FDFBF7] min-h-screen text-[#191715]">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Section Heading - Open Minimalist Editorial */}
        <SectionHeading
          subtitle="Atelier Reservation"
          title="Reserve Your Appointment"
          description="Choose your preferred salon branch, desired treatment, and timing. Your appointment is recorded in our system and instantly notified to our salon director."
          align="center"
        />

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSubmitted ? (
          /* Confirmation Screen */
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
                Thank you, <strong className="font-medium text-[#191715]">{formData.name}</strong>.
                Your appointment at{' '}
                <strong className="font-medium text-[#B8955A]">{selectedBranchObj.name}</strong>{' '}
                has been registered successfully.
              </p>
            </div>

            {/* Reservation Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6 border-t border-b border-[#E5D3BF]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Booking Reference
                </span>
                <span className="text-base font-semibold text-[#191715] mt-1 block">
                  {bookingRef}
                </span>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-[#A07D45] block font-medium">
                  Salon Branch
                </span>
                <span className="text-sm font-semibold text-[#191715] mt-1 block">
                  {selectedBranchObj.shortName}
                </span>
                <span className="text-[11px] text-[#2A2623]/70 font-light block leading-snug mt-0.5">
                  {selectedBranchObj.landmark}
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

            {/* Branch Address Banner */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E5D3BF] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B8955A] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#191715]">
                  Branch Address:
                </p>
                <p className="text-xs text-[#2A2623]/80 leading-relaxed font-light">
                  {selectedBranchObj.address}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                href={confirmationWhatsAppUrl}
                isExternal
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Send via WhatsApp
              </Button>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    branch: SALON_BRANCHES[0].id,
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
              <Button href="/" variant="primary" size="md">
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="pt-6 space-y-10">
            {/* Step 01: Branch Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  01
                </span>
                <h4 className="text-sm uppercase tracking-[0.18em] font-medium text-[#191715]">
                  Select Salon Branch
                </h4>
              </div>

              <p className="text-xs text-[#2A2623]/70 font-light">
                Sara's Beauty & Bridal Studio operates across two locations in Guduvancheri. Please select your preferred branch:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {SALON_BRANCHES.map((branch) => {
                  const isSelected = formData.branch === branch.id;
                  return (
                    <div
                      key={branch.id}
                      onClick={() => setFormData({ ...formData, branch: branch.id })}
                      className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-[#B8955A] bg-[#B8955A]/5 shadow-md shadow-[#B8955A]/15 ring-2 ring-[#B8955A]/60'
                          : 'border-[#E5D3BF] bg-white hover:border-[#B8955A]/50 hover:bg-[#FAF6F0]/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`p-1.5 rounded-lg ${
                                isSelected
                                  ? 'bg-[#B8955A] text-white'
                                  : 'bg-[#E5D3BF]/40 text-[#A07D45]'
                              }`}
                            >
                              <MapPin className="w-4 h-4" />
                            </span>
                            <span className="text-sm font-semibold text-[#191715] tracking-tight">
                              {branch.shortName}
                            </span>
                          </div>

                          {/* Custom Radio Dot */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-[#B8955A] bg-[#B8955A]'
                                : 'border-[#D1BA9E] bg-white'
                            }`}
                          >
                            {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Full Address Display */}
                        <p className="text-xs text-[#2A2623]/80 leading-relaxed font-light pl-8">
                          {branch.address}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E5D3BF]/60 flex items-center justify-between pl-8">
                        <span className="text-[10px] uppercase tracking-wider text-[#A07D45] font-medium bg-[#E5D3BF]/30 px-2.5 py-0.5 rounded-full">
                          Landmark: {branch.landmark}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-semibold text-[#B8955A] tracking-wider">
                            Selected Branch ✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 02: Guest Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  02
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

            {/* Step 03: Service & Timing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  03
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

            {/* Step 04: Special Notes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#E5D3BF] pb-3">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B8955A]">
                  04
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
                Appointment details will be booked for{' '}
                <strong className="text-[#191715] font-medium">{selectedBranchObj.shortName}</strong>{' '}
                and confirmed automatically.
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
