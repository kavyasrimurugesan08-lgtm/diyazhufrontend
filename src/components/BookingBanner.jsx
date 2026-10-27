import React from 'react';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';

export default function BookingBanner({ openBookingModal, settings }) {
  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your services and book an appointment.")}`;

  return (
    <section
      className="booking-banner-section"
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #782a3b 0%, #b76e79 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative backdrop elements */}
      <div
        style={{
          position: 'absolute',
          top: '-40%',
          right: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fdfbf7',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={14} color="#f7eed9" />
            <span>Reserved Appointments Recommended</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '1.25rem'
            }}
          >
            Let's Create Your Signature Look.
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}
          >
            Whether you are walking down the aisle, attending a high-fashion gala, or treating your skin to a rejuvenating facial, our artists are ready to bring out your most radiant self.
          </p>

          <div
            className="banner-cta-group"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => openBookingModal()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.9rem 2.2rem',
                background: '#ffffff',
                color: 'var(--deep-rose)',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'var(--transition-smooth)'
              }}
              className="booking-btn-hover banner-btn"
            >
              <Calendar size={18} />
              <span>Book an Appointment</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp banner-btn"
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            * Appointment requests are subject to confirmation by Diyazhu Makeovers.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .booking-banner-section {
            padding: 3.25rem 0 !important;
          }
          .banner-cta-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .banner-btn {
            width: 100% !important;
            min-height: 46px;
          }
        }
        @media (max-width: 380px) {
          .booking-banner-section {
            padding: 2.5rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
