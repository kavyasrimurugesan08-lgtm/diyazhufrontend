import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Heart, Lock, Sparkles } from 'lucide-react';
import { LotusLogo } from './Navbar';

export default function Footer({ setCurrentView, settings, openBookingModal }) {
  const phone = settings?.phone || '9003979277';
  const whatsapp = settings?.whatsapp || '9003979277';
  const email = settings?.email || 'diyazhumakeovers@gmail.com';
  const address = settings?.address || 'Studio & On-Location Services Across Tamil Nadu & South India';
  const hours = settings?.hours || 'Mon - Sun: 9:00 AM - 8:00 PM (By Appointment)';

  const cleanPhone = phone.replace(/\D/g, '');
  const cleanWhatsApp = whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your services and book an appointment.")}`;

  return (
    <footer
      className="site-footer"
      style={{
        background: '#23181a',
        color: '#fdfbf7',
        padding: '5rem 0 2rem 0',
        borderTop: '1px solid rgba(183, 110, 121, 0.25)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LotusLogo size={36} color="#eecbc4" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    color: '#ffffff'
                  }}
                >
                  Diyazhu Makeovers
                </div>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose-gold-light)' }}>
                  YOUR BEAUTY, YOUR SIGNATURE.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#b8a6a8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Your Beauty, Your Signature. Specialized in couture South Indian bridal artistry, high-definition muhurtham aesthetics, and personalized beauty care.
            </p>

            <button
              onClick={() => openBookingModal()}
              className="btn-primary btn-sm"
              style={{ fontSize: '0.82rem' }}
            >
              <Sparkles size={14} />
              Book Makeover
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}
            >
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Our Services & Pricing' },
                { id: 'bridal', label: 'Bridal Makeovers' },
                { id: 'gallery', label: 'Portfolio Gallery' },
                { id: 'about', label: 'About Diyazhu' },
                { id: 'contact', label: 'Contact & Location' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentView(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    textAlign: 'left',
                    color: '#c2b2b4',
                    transition: 'color 0.2s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rose-gold-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#c2b2b4')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Quicklist */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}
            >
              Signature Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#c2b2b4' }}>
              <div>• Traditional Muhurtham Bridal HD</div>
              <div>• Royal Reception & Sangeet Glam</div>
              <div>• South Indian Temple Jewelry Styling</div>
              <div>• Designer Saree Draping & Box Pleating</div>
              <div>• Floral Poola Jada Artistry</div>
              <div>• Luxe 24K Pre-Bridal Hydra Facial</div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}
            >
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: '#c2b2b4' }}>
              <a
                href={`tel:${cleanPhone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e8d9c5' }}
              >
                <Phone size={16} color="var(--rose-gold-light)" />
                <span>+91 {phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#25d366' }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp: {whatsapp}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Clock size={16} color="var(--rose-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{hours}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} color="var(--rose-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div
          className="footer-bottom-bar"
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#8c7a7c'
          }}
        >
          <div>
            © {new Date().getFullYear()} Diyazhu Makeovers. All rights reserved. Your Beauty, Your Signature.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#b8a6a8',
                fontSize: '0.8rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#b8a6a8')}
            >
              <Lock size={13} />
              <span>Studio Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .site-footer {
            padding: 3.25rem 0 2rem 0 !important;
          }
          .footer-grid {
            gap: 2rem !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 1.25rem !important;
          }
        }

        @media (max-width: 400px) {
          .site-footer {
            padding: 2.75rem 0 1.5rem 0 !important;
          }
          .footer-grid {
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
