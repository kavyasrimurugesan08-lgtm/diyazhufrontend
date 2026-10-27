import React from 'react';
import { Calendar, Eye, Sparkles, Heart, Crown, Award } from 'lucide-react';

export default function Hero({ openBookingModal, setCurrentView, settings }) {
  const heroTitle = settings?.hero_title || 'Your Beauty, Your Signature.';
  const heroSubtitle = settings?.hero_subtitle || 
    'Luxury bridal makeup, editorial transformations, and bespoke beauty experiences crafted with passion and precision.';

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '3.5rem 0 5rem 0',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(247, 214, 217, 0.45) 0%, rgba(250, 248, 245, 0.95) 60%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative luxury gradient blurs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(238, 203, 196, 0.5) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243, 233, 220, 0.6) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: '3rem'
          }}
        >
          {/* Left Column: Typography & CTAs */}
          <div style={{ maxWidth: '620px' }}>
            {/* Tag / Badge */}
            <div className="section-tag" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} color="var(--rose-gold)" />
              <span>Luxury Bridal & Beauty Studio</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.1rem, 5.8vw, 4rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--deep-rose-dark)',
                lineHeight: 1.18,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}
            >
              {heroTitle}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontWeight: 400
              }}
            >
              {heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                alignItems: 'center',
                marginBottom: '2.5rem'
              }}
            >
              <button
                onClick={() => openBookingModal()}
                className="btn-primary hero-btn"
                style={{ padding: '0.9rem 2rem', fontSize: '0.94rem' }}
              >
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary hero-btn"
                style={{ padding: '0.88rem 1.85rem', fontSize: '0.94rem' }}
              >
                <Eye size={18} />
                <span>Explore Our Looks</span>
              </button>
            </div>

            {/* Editorial highlights bar */}
            <div
              className="hero-stats-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(183, 110, 121, 0.2)'
              }}
            >
              <div>
                <div className="hero-stat-num" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                  Customized Artistry
                </div>
              </div>

              <div>
                <div className="hero-stat-num" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  HD & Airbrush
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                  Long-Wear Radiance
                </div>
              </div>

              <div>
                <div className="hero-stat-num" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  Studio & Venue
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                  On-Location Service
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Point with Editorial Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
            {/* Outer Decorative Ring */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                aspectRatio: '4 / 5',
                borderRadius: '160px 160px 24px 24px',
                padding: '8px',
                background: 'linear-gradient(135deg, rgba(238, 203, 196, 0.6) 0%, rgba(183, 110, 121, 0.3) 50%, rgba(247, 238, 217, 0.5) 100%)',
                boxShadow: '0 20px 50px rgba(110, 39, 53, 0.16)'
              }}
            >
              {/* Inner Image Container with arched top */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '152px 152px 16px 16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={settings?.hero_image || "/luxury-makeup-set.jpg"}
                  alt="Diyazhu Makeovers Editorial Artistry & Luxury Makeup"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease'
                  }}
                  className="hero-image"
                />

                {/* Subtle vignette overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(43, 34, 35, 0.45) 0%, transparent 45%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Floating caption on image bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.90)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                      Signature Muhurtham Glow
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Bespoke South Indian Bridal Makeover
                    </div>
                  </div>
                  <Crown size={18} color="var(--rose-gold)" style={{ flexShrink: 0 }} />
                </div>
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div
                className="animate-float hero-badge-left"
                style={{
                  position: 'absolute',
                  top: '10%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 24px rgba(110, 39, 53, 0.14)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--bg-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--rose-gold)',
                    flexShrink: 0
                  }}
                >
                  <Award size={15} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--deep-rose)' }}>
                  Certified Artistry
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div
                className="animate-float hero-badge-right"
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 24px rgba(110, 39, 53, 0.14)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  zIndex: 2,
                  animationDelay: '2.5s'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--bg-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--deep-rose)',
                    flexShrink: 0
                  }}
                >
                  <Heart size={14} fill="var(--rose-gold)" />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--deep-rose)' }}>
                  Flawless Longwear
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-badge-left {
          left: -15px;
        }
        .hero-badge-right {
          right: -15px;
        }

        @media (max-width: 900px) {
          .hero-section {
            padding: 2.75rem 0 4rem 0 !important;
            min-height: auto !important;
          }
          .hero-badge-left {
            left: 8px !important;
            top: 14px !important;
          }
          .hero-badge-right {
            right: 8px !important;
            bottom: 45px !important;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 2rem 0 3.25rem 0 !important;
          }
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .hero-btn {
            width: 100% !important;
            min-height: 46px;
          }
          .hero-badge-left {
            left: 6px !important;
            top: 10px !important;
            padding: 0.45rem 0.75rem !important;
            font-size: 0.72rem !important;
          }
          .hero-badge-right {
            right: 6px !important;
            bottom: 48px !important;
            padding: 0.45rem 0.75rem !important;
            font-size: 0.72rem !important;
          }
          .hero-stat-num {
            font-size: 1.15rem !important;
          }
        }

        @media (max-width: 400px) {
          .hero-stats-row {
            gap: 0.4rem !important;
          }
          .hero-stat-num {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
