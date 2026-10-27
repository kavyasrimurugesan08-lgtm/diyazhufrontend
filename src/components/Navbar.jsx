import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MessageCircle, Sparkles, UserCheck } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, openBookingModal, settings, isAuthenticated }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'bridal', label: 'Bridal Makeup' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your services and book an appointment.")}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-soft shadow-subtle border-b border-rose-gold/20 backdrop-blur-md'
            : 'bg-cream/85 backdrop-blur-sm border-b border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(253, 251, 247, 0.96)' : 'rgba(250, 248, 245, 0.90)',
          borderBottom: isScrolled ? '1px solid rgba(183, 110, 121, 0.22)' : '1px solid rgba(183, 110, 121, 0.1)',
          position: 'sticky',
          top: 0,
          padding: isScrolled ? '1rem 0' : '1.45rem 0',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
            aria-label="Diyazhu Makeovers Home"
          >
            <div
              className="brand-logo-avatar"
              style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #eecbc4 0%, #b76e79 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                boxShadow: '0 5px 16px rgba(183, 110, 121, 0.35)',
                flexShrink: 0
              }}
            >
              D
            </div>
            <div>
              <div
                className="brand-logo-title"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--deep-rose)',
                  textTransform: 'uppercase',
                  lineHeight: 1.15
                }}
              >
                DIYAZHU
              </div>
              <div
                className="brand-logo-subtitle"
                style={{
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--rose-gold)',
                  fontWeight: 600,
                  marginTop: '2px'
                }}
              >
                MAKEOVERS • STUDIO
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.1rem'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--deep-rose)' : 'var(--text-muted)',
                    position: 'relative',
                    padding: '0.5rem 0.25rem',
                    transition: 'var(--transition-smooth)',
                    letterSpacing: '0.01em'
                  }}
                  className="nav-link-item"
                >
                  {item.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: '2.5px',
                        background: 'var(--rose-gold)',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="desktop-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire via WhatsApp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(37, 211, 102, 0.12)',
                color: '#25d366',
                border: '1.5px solid rgba(37, 211, 102, 0.35)',
                transition: 'var(--transition-smooth)'
              }}
              title="Chat on WhatsApp"
            >
              <MessageCircle size={22} />
            </a>

            <button
              onClick={() => openBookingModal()}
              className="btn-primary"
              style={{ padding: '0.82rem 1.75rem', fontSize: '0.94rem', fontWeight: 600 }}
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </button>

            {/* Quick Admin Access */}
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                color: isAuthenticated ? 'var(--deep-rose)' : 'var(--text-light)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}
              title="Studio Admin Dashboard"
            >
              <UserCheck size={15} />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile Right Controls: WhatsApp & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="mobile-controls">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(37, 211, 102, 0.15)',
                color: '#25d366',
                border: '1px solid rgba(37, 211, 102, 0.35)'
              }}
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '0.5rem',
                color: 'var(--deep-rose)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: isScrolled ? '62px' : '68px',
            height: isScrolled ? 'calc(100dvh - 62px)' : 'calc(100dvh - 68px)',
            backgroundColor: 'rgba(250, 248, 245, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem 1.25rem 2.5rem 1.25rem',
            gap: '1rem',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            animation: 'fadeIn 0.2s ease-in'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '1.22rem',
                    fontFamily: 'var(--font-serif)',
                    padding: '0.85rem 0',
                    borderBottom: '1px solid rgba(183, 110, 121, 0.12)',
                    color: active ? 'var(--deep-rose)' : 'var(--text-main)',
                    fontWeight: active ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '48px'
                  }}
                >
                  <span>{item.label}</span>
                  {active && <Sparkles size={16} color="var(--rose-gold)" />}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem 1rem', minHeight: '48px' }}
            >
              <Calendar size={18} />
              <span>Book an Appointment</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', padding: '0.9rem 1rem', minHeight: '48px' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Enquiry</span>
            </a>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'underline',
                  padding: '0.5rem'
                }}
              >
                Studio Owner / Admin Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Brand & Navigation CSS */}
      <style>{`
        .brand-logo-avatar {
          width: 44px;
          height: 44px;
          font-size: 1.3rem;
        }
        .brand-logo-title {
          font-size: 1.32rem;
        }
        .brand-logo-subtitle {
          font-size: 0.68rem;
        }

        @media (max-width: 480px) {
          .brand-logo-avatar {
            width: 36px;
            height: 36px;
            font-size: 1.1rem;
          }
          .brand-logo-title {
            font-size: 1.08rem;
            letter-spacing: 0.08em;
          }
          .brand-logo-subtitle {
            font-size: 0.55rem;
            letter-spacing: 0.14em;
          }
        }

        @media (max-width: 360px) {
          .brand-logo-avatar {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
          .brand-logo-title {
            font-size: 0.98rem;
          }
          .brand-logo-subtitle {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
            gap: clamp(1.2rem, 1.8vw, 2.1rem) !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-controls {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
