import React from 'react';
import { Calendar, Eye, Sparkles, Heart, Crown, Award } from 'lucide-react';

export default function Hero({ openBookingModal, setCurrentView, settings }) {
  const heroTitle = settings?.hero_title || 'Your Beauty, Your Signature.';
  const heroSubtitle = settings?.hero_subtitle || 
    'Luxury bridal makeup, editorial transformations, and bespoke beauty experiences crafted with passion and precision.';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        padding: '3rem 0 5rem 0',
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
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
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--deep-rose-dark)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}
            >
              {heroTitle}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
                fontWeight: 400
              }}
            >
              {heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '3rem'
              }}
            >
              <button
                onClick={() => openBookingModal()}
                className="btn-primary"
                style={{ padding: '0.95rem 2.2rem', fontSize: '0.96rem' }}
              >
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '0.92rem 2.1rem', fontSize: '0.96rem' }}
              >
                <Eye size={18} />
                <span>Explore Our Looks</span>
              </button>
            </div>

            {/* Editorial highlights bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(183, 110, 121, 0.2)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Customized Artistry
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  HD & Airbrush
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Long-Wear Radiance
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                  Studio & Venue
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  On-Location Service
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Point with Editorial Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Outer Decorative Ring */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '4 / 5',
                borderRadius: '160px 160px 24px 24px',
                padding: '10px',
                background: 'linear-gradient(135deg, rgba(238, 203, 196, 0.6) 0%, rgba(183, 110, 121, 0.3) 50%, rgba(247, 238, 217, 0.5) 100%)',
                boxShadow: '0 24px 60px rgba(110, 39, 53, 0.16)'
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
                  src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85"
                  alt="Diyazhu Makeovers Editorial Bridal Artistry"
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
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    padding: '0.85rem 1.15rem',
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--deep-rose)' }}>
                      Signature Muhurtham Glow
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Bespoke South Indian Bridal Makeover
                    </div>
                  </div>
                  <Crown size={20} color="var(--rose-gold)" />
                </div>
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div
                className="animate-float"
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '-28px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 24px rgba(110, 39, 53, 0.14)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--bg-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--rose-gold)'
                  }}
                >
                  <Award size={16} />
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--deep-rose)' }}>
                  Certified Artistry
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div
                className="animate-float"
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  right: '-24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 24px rgba(110, 39, 53, 0.14)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 2,
                  animationDelay: '2.5s'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--bg-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--deep-rose)'
                  }}
                >
                  <Heart size={15} fill="var(--rose-gold)" />
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--deep-rose)' }}>
                  Flawless Longwear
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
