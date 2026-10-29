import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MessageCircle, UserCheck } from 'lucide-react';

// Delicate Vector Lotus Icon matching the brand mockup
export function LotusLogo({ size = 36, color = '#741d2e', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      {...props}
    >
      {/* Central Petal */}
      <path
        d="M50 8 C46 24 43 45 50 68 C57 45 54 24 50 8 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(212, 175, 122, 0.12)"
      />
      {/* Left Inner Petal */}
      <path
        d="M50 25 C34 28 22 46 32 66 C39 52 46 42 50 25 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Inner Petal */}
      <path
        d="M50 25 C66 28 78 46 68 66 C61 52 54 42 50 25 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Outer Petal */}
      <path
        d="M34 45 C15 48 5 62 18 72 C30 68 36 60 40 52"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Outer Petal */}
      <path
        d="M66 45 C85 48 95 62 82 72 C70 68 64 60 60 52"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delicate Base Curved Arc */}
      <path
        d="M30 72 C42 77 58 77 70 72"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Inline Social Icons matching the mockup
export function InstagramIcon({ size = 18, color = '#6B1728' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 19, color = '#6B1728' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: 'block', color: color }}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export default function Navbar({ currentView, setCurrentView, openBookingModal, settings, isAuthenticated }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
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

  // Exact navigation items from reference screenshot
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramUrl = settings?.instagram_url || 'https://www.instagram.com/diyazhumakeovers/';
  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '') || '9003979277';
  const whatsappUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your bridal and beauty services.")}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 main-site-navbar ${
          isScrolled
            ? 'bg-cream-scrolled shadow-subtle backdrop-blur-md'
            : 'bg-cream-header backdrop-blur-sm'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(252, 248, 244, 0.97)' : 'rgba(250, 246, 240, 0.92)',
          borderBottom: '1px solid rgba(183, 110, 121, 0.16)',
          position: 'sticky',
          top: 0,
          padding: isScrolled ? '0.75rem 0' : '1.05rem 0',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div
          className="container navbar-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}
        >
          {/* ==============================================================
              LEFT: LOTUS OUTLINE LOGO & BRAND WORDMARK
              ============================================================== */}
          <button
            onClick={() => handleNavClick('home')}
            className="navbar-brand-btn"
            style={{
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Diyazhu Makeovers Home"
          >
            {/* Lotus Line Art Emblem */}
            <div
              className="navbar-lotus-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <LotusLogo size={38} color="#741d2e" />
            </div>

            <div className="navbar-brand-text">
              <div
                className="brand-title-serif"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: '1.38rem',
                  letterSpacing: '0.03em',
                  color: '#46111C',
                  lineHeight: 1.15
                }}
              >
                Diyazhu Makeovers
              </div>
              <div
                className="brand-tagline-caps"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8E5D67',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  marginTop: '2px'
                }}
              >
                YOUR BEAUTY, YOUR SIGNATURE.
              </div>
            </div>
          </button>

          {/* ==============================================================
              CENTER: CLEAN LUXURY NAVIGATION LINKS
              ============================================================== */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav-center"
          >
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#46111C' : '#5A3E45',
                    position: 'relative',
                    padding: '0.5rem 0.15rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  className="nav-link-reference"
                >
                  {item.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '0',
                        right: '0',
                        height: '2.5px',
                        background: '#6B1728',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ==============================================================
              RIGHT: "BOOK NOW" PILL BUTTON + SOCIAL MEDIA ICONS
              ============================================================== */}
          <div
            style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }}
            className="desktop-actions-right"
          >
            {/* Velvet Burgundy "Book Now" Pill Button */}
            <button
              onClick={() => openBookingModal()}
              className="navbar-book-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.68rem 1.65rem',
                fontSize: '0.92rem',
                fontWeight: 600,
                borderRadius: '9999px',
                background: '#6B1728',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <Calendar size={16} />
              <span>Book Now</span>
            </button>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="social-icon-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  color: '#6B1728',
                  transition: 'transform 0.2s ease, opacity 0.2s ease'
                }}
              >
                <InstagramIcon size={19} color="#6B1728" />
              </a>
            </div>

            {/* Quick Admin Access Keyhole */}
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(183, 110, 121, 0.12)',
                color: isAuthenticated ? '#6B1728' : '#8E5D67',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Studio Admin Dashboard"
              aria-label="Studio Admin"
            >
              <UserCheck size={16} />
            </button>
          </div>

          {/* ==============================================================
              MOBILE CONTROLS: Book & Hamburger Toggle
              ============================================================== */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }} className="mobile-nav-toggle">
            {/* Quick Book Button on Mobile */}
            <button
              onClick={() => openBookingModal()}
              className="mobile-book-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '9999px',
                background: '#6B1728',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Calendar size={13} />
              <span>Book</span>
            </button>

            {/* Hamburger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-trigger"
              style={{
                padding: '0.4rem',
                color: '#46111C',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </header>

      {/* ==============================================================
          MOBILE SLIDE-DOWN DRAWER
          ============================================================== */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: isScrolled ? '58px' : '65px',
            height: isScrolled ? 'calc(100dvh - 58px)' : 'calc(100dvh - 65px)',
            backgroundColor: 'rgba(250, 246, 240, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem 1.5rem 2.5rem 1.5rem',
            gap: '1.25rem',
            overflowY: 'auto',
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
                    fontSize: '1.2rem',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    padding: '0.85rem 0',
                    borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
                    color: active ? '#6B1728' : '#46111C',
                    fontWeight: active ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{item.label}</span>
                  {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6B1728' }} />}
                </button>
              );
            })}
          </div>

          {/* Social Links on Mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#8E5D67' }}>Connect:</span>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6B1728' }} title="Instagram"><InstagramIcon size={20} /></a>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                borderRadius: '9999px',
                background: '#6B1728',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(107, 23, 40, 0.3)'
              }}
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(37, 211, 102, 0.12)',
                color: '#1da851',
                border: '1.5px solid rgba(37, 211, 102, 0.35)',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              style={{
                fontSize: '0.82rem',
                color: '#8E5D67',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                marginTop: '0.25rem'
              }}
            >
              Studio Owner / Admin Login
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .navbar-book-pill:hover {
          transform: translateY(-2px);
          box-shadow: none !important;
          background: #54111f !important;
        }
        .social-icon-btn:hover {
          transform: scale(1.15);
          opacity: 0.85;
        }
        .nav-link-reference:hover {
          color: #6B1728 !important;
        }

        @media (min-width: 992px) {
          .desktop-nav-center {
            display: flex !important;
          }
          .desktop-actions-right {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }

        /* Phone Web View Alignment */
        @media (max-width: 768px) {
          .main-site-navbar {
            padding: 0.55rem 0 !important;
          }
          .navbar-container {
            padding: 0 1rem !important;
          }
          .navbar-brand-btn {
            gap: 0.6rem !important;
          }
          .navbar-lotus-wrap svg {
            width: 32px !important;
            height: 32px !important;
          }
          .brand-title-serif {
            font-size: clamp(1.08rem, 4.4vw, 1.25rem) !important;
            white-space: nowrap !important;
          }
          .brand-tagline-caps {
            font-size: clamp(0.48rem, 2vw, 0.55rem) !important;
            letter-spacing: 0.16em !important;
            white-space: nowrap !important;
          }
          .mobile-nav-toggle {
            gap: 0.45rem !important;
          }
        }

        @media (max-width: 380px) {
          .navbar-container {
            padding: 0 0.65rem !important;
          }
          .navbar-brand-btn {
            gap: 0.45rem !important;
          }
          .navbar-lotus-wrap svg {
            width: 28px !important;
            height: 28px !important;
          }
          .brand-title-serif {
            font-size: 1.02rem !important;
          }
          .brand-tagline-caps {
            display: none !important;
          }
          .mobile-book-btn span {
            display: none !important;
          }
          .mobile-book-btn {
            padding: 0.45rem !important;
            width: 32px !important;
            height: 32px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}
