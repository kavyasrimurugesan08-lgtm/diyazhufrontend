import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Calendar, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api';

export default function ContactPage({ settings, openBookingModal }) {
  const phone = settings?.phone || '9003979277';
  const whatsapp = settings?.whatsapp || '9003979277';
  const email = settings?.email || 'diyazhumakeovers@gmail.com';
  const address = settings?.address || 'Studio & On-Location Services Across Tamil Nadu & South India';
  const hours = settings?.hours || 'Mon - Sun: 9:00 AM - 8:00 PM (By Appointment)';

  const cleanPhone = phone.replace(/\D/g, '');
  const cleanWhatsApp = whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your services and book an appointment.")}`;

  // Direct Enquiry Form state
  const [form, setForm] = useState({
    customer_name: '',
    contact_number: '',
    service_name: 'Traditional Bridal Makeover',
    preferred_date: '',
    preferred_time: '10:00 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.customer_name.trim() || !form.contact_number.trim() || !form.preferred_date) {
      setError('Please provide your name, contact number, and preferred date');
      return;
    }

    const cleanNum = form.contact_number.replace(/\D/g, '');
    if (cleanNum.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      await api.bookAppointment({
        customer_name: form.customer_name.trim(),
        contact_number: cleanNum,
        service_name: form.service_name,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        message: form.message.trim()
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-cream-soft)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} color="var(--rose-gold)" />
            <span>Connect With Us</span>
          </div>
          <h1 className="section-title">Contact Diyazhu Makeovers</h1>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc">
            We are delighted to assist you with booking enquiries, bridal trials, package customizations, or venue styling consultations.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Contact Details & WhatsApp Banner */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                color: 'var(--deep-rose)',
                marginBottom: '1rem'
              }}
            >
              Reach Out Directly
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Whether you prefer a quick phone call, a WhatsApp conversation, or reserving your dates via our booking request form, we ensure responsive and warm assistance.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <a
                href={`tel:${cleanPhone}`}
                className="btn-primary"
                style={{ padding: '0.95rem 1.75rem', justifyContent: 'flex-start' }}
              >
                <Phone size={19} />
                <span>Call Us Now: +91 {phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.95rem 1.75rem', justifyContent: 'flex-start' }}
              >
                <MessageCircle size={19} />
                <span>WhatsApp Instant Enquiry (+91 {whatsapp})</span>
              </a>
            </div>

            {/* Studio Info Card */}
            <div
              className="glass-card"
              style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--deep-rose)', marginBottom: '1.25rem' }}>
                Studio Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <MapPin size={20} color="var(--rose-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '2px' }}>
                      Location & Coverage:
                    </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Clock size={20} color="var(--rose-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '2px' }}>
                      Operating Hours:
                    </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{hours}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Mail size={20} color="var(--rose-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '2px' }}>
                      Email Inquiries:
                    </strong>
                    <a href={`mailto:${email}`} style={{ color: 'var(--deep-rose)' }}>{email}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Appointment Request Form */}
          <div
            className="glass-card"
            style={{
              background: '#ffffff',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
                <span>Online Reservation</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--deep-rose)' }}>
                Request an Appointment
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Please fill in your details and our team will get in touch with you.
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

            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#edfdf4',
                    color: '#276749',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <CheckCircle2 size={34} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--deep-rose)', marginBottom: '0.5rem' }}>
                  Request Received!
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you! We will reach out to <strong>{form.contact_number}</strong> to confirm your slot.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <MessageCircle size={18} />
                  <span>Follow Up via WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    placeholder="Enter your name"
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
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Contact Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.contact_number}
                    onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
                    placeholder="10-digit mobile number"
                    maxLength={15}
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
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Requested Service *
                  </label>
                  <select
                    value={form.service_name}
                    onChange={(e) => setForm({ ...form, service_name: e.target.value })}
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
                    <option value="Traditional Bridal Makeover">Traditional Bridal Makeover</option>
                    <option value="Royal Reception & Cocktail Glam">Royal Reception & Cocktail Glam</option>
                    <option value="Engagement & Muhurtham Elegance">Engagement & Muhurtham Elegance</option>
                    <option value="Signature Party & Sangeet Makeover">Signature Party & Sangeet Makeover</option>
                    <option value="Couture Hair Styling & Braiding">Couture Hair Styling & Braiding</option>
                    <option value="Luxe Hydra-Glow Pre-Bridal Facial">Luxe Hydra-Glow Pre-Bridal Facial</option>
                    <option value="Precision Saree Draping & Box Pleating">Precision Saree Draping & Box Pleating</option>
                    <option value="Custom / Multiple Makeover Services">Custom / Multiple Services</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={form.preferred_date}
                      onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Preferred Time *
                    </label>
                    <select
                      value={form.preferred_time}
                      onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
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
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Ceremony Notes / Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Venue details, morning muhurtham time, or custom requirements..."
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

                <div
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-blush-light)',
                    padding: '0.65rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--rose-gold)'
                  }}
                >
                  * Submitting this request does not confirm the booking immediately. Diyazhu Makeovers will verify artist availability and call/WhatsApp you.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Submitting...' : 'Send Appointment Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
