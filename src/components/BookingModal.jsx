import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Sparkles, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { api } from '../api';

export default function BookingModal({ isOpen, onClose, preselectedService, services, settings }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    contact_number: '',
    service_name: '',
    preferred_date: '',
    preferred_time: '10:00 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Set initial preselected service or first available service
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_name: preselectedService }));
    } else if (services && services.length > 0 && !formData.service_name) {
      setFormData((prev) => ({ ...prev, service_name: services[0].title }));
    }
  }, [preselectedService, services]);

  // Today's date in YYYY-MM-DD for min date
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validations
    if (!formData.customer_name.trim()) {
      setError('Please provide your full name');
      return;
    }

    const cleanPhone = formData.contact_number.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.service_name) {
      setError('Please select a service');
      return;
    }

    if (!formData.preferred_date) {
      setError('Please choose your preferred appointment date');
      return;
    }

    if (!formData.preferred_time) {
      setError('Please select a preferred time slot');
      return;
    }

    setLoading(true);

    try {
      // Find matching service_id if applicable
      const matched = services?.find((s) => s.title === formData.service_name);

      const res = await api.bookAppointment({
        customer_name: formData.customer_name.trim(),
        contact_number: cleanPhone,
        service_id: matched ? matched.id : null,
        service_name: formData.service_name,
        preferred_date: formData.preferred_date,
        preferred_time: formData.preferred_time,
        message: formData.message.trim()
      });

      setSuccessData(res.appointment);
    } catch (err) {
      setError(err.message || 'Unable to submit appointment request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');

  const getExpediteWhatsAppUrl = () => {
    if (!successData) return `https://wa.me/91${cleanWhatsApp}`;
    const text = `Hello Diyazhu Makeovers! I just submitted an appointment request for ${successData.service_name} on ${successData.preferred_date} (${successData.preferred_time}). My Name: ${successData.customer_name}. Ref #${successData.id}.`;
    return `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="lightbox-overlay">
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.25rem',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          background: '#ffffff',
          boxShadow: '0 24px 60px rgba(43, 34, 35, 0.35)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-blush)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--deep-rose)',
            transition: 'var(--transition-smooth)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        {!successData ? (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem', paddingRight: '1rem' }}>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={13} color="var(--rose-gold)" />
                <span>Appointment Enquiry</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  color: 'var(--deep-rose)',
                  marginBottom: '0.4rem'
                }}
              >
                Request a Makeover Session
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Fill in your details below and our team will get in touch to confirm your booking.
              </p>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: '#fff5f5',
                  border: '1px solid #feb2b2',
                  borderRadius: 'var(--radius-sm)',
                  color: '#c53030',
                  fontSize: '0.86rem',
                  marginBottom: '1.25rem'
                }}
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Full Name */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={17}
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
                  />
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      background: 'var(--bg-cream-soft)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Contact Number (WhatsApp enabled) *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone
                    size={17}
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
                  />
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength={15}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      background: 'var(--bg-cream-soft)',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Requested Service *
                </label>
                <select
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-solid)',
                    background: 'var(--bg-cream-soft)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none'
                  }}
                >
                  {services && services.length > 0 ? (
                    services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} {s.price ? `(${s.price})` : ''}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Traditional Bridal Makeover">Traditional Bridal Makeover</option>
                      <option value="Royal Reception Glam">Royal Reception Glam</option>
                      <option value="Engagement & Muhurtham Elegance">Engagement & Muhurtham Elegance</option>
                      <option value="Party Makeup & Sangeet">Party Makeup & Sangeet</option>
                      <option value="Hairstyling & Saree Draping">Hairstyling & Saree Draping</option>
                      <option value="Pre-Bridal Facial & Skin">Pre-Bridal Facial & Skin</option>
                    </>
                  )}
                  <option value="Custom / Multiple Makeover Services">Custom / Multiple Services</option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    min={today}
                    value={formData.preferred_date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      background: 'var(--bg-cream-soft)',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Preferred Time *
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      background: 'var(--bg-cream-soft)',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none'
                    }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / Styling Request */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Notes or Styling Details (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Ceremony timing, venue location, or specific requirements..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-solid)',
                    background: 'var(--bg-cream-soft)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Disclaimer */}
              <div
                style={{
                  fontSize: '0.76rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-blush-light)',
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--rose-gold)',
                  lineHeight: 1.5
                }}
              >
                <strong>Important Notice:</strong> Appointment requests are subject to artist availability and are confirmed after our studio contacts you directly.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Submitting Request...' : 'Submit Appointment Request'}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#edfdf4',
                color: '#276749',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                color: 'var(--deep-rose)',
                marginBottom: '0.5rem'
              }}
            >
              Request Submitted!
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Thank you, <strong>{successData.customer_name}</strong>. We have received your request for{' '}
              <strong>{successData.service_name}</strong> on <strong>{successData.preferred_date}</strong> at{' '}
              <strong>{successData.preferred_time}</strong>.
            </p>

            <div
              style={{
                background: 'var(--bg-cream-soft)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Booking Reference:</span>
                <strong>#DY-{successData.id.toString().padStart(4, '0')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Status:</span>
                <span className="badge-status badge-pending">Pending Studio Confirmation</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-light)' }}>Contact:</span>
                <span>{successData.contact_number}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={getExpediteWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <MessageCircle size={18} />
                <span>Expedite via WhatsApp Now</span>
              </a>

              <button
                onClick={() => {
                  setSuccessData(null);
                  onClose();
                }}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.8rem' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
