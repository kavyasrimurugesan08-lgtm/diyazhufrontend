import React from 'react';
import { Crown, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BridalHighlight({ setCurrentView, openBookingModal }) {
  const highlights = [
    'Comprehensive Pre-Bridal Consultation & Skin Preparation',
    'Customized Muhurtham HD Longwear Artistry',
    'Intricate Temple Jewelry & Floral Poola Jada Placement',
    'Pin-Tight Silk Saree Draping & Box Pleat Finishing',
    'Available for Destination & Venue Bookings Across South India'
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', position: 'relative' }}>
      <div className="container">
        <div
          className="bridal-highlight-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            background: 'linear-gradient(135deg, rgba(252, 241, 242, 0.7) 0%, rgba(250, 248, 245, 0.95) 100%)',
            padding: '3.5rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {/* Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(110, 39, 53, 0.18)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=85"
                alt="Bridal Couture Makeover Diyazhu"
                className="bridal-showcase-img"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(43, 34, 35, 0.5) 0%, transparent 40%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  color: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Crown size={18} color="#f7eed9" />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f7eed9' }}>
                    Couture Bridal Artistry
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600 }}>
                  Crafting the Queen in Every Bride
                </div>
              </div>
            </div>

            {/* Small offset accent photo on desktop */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '140px',
                height: '140px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                display: 'none'
              }}
              className="accent-photo"
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"
                alt="Bridal Hairstyling Detail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Details & Action */}
          <div>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>
              <Crown size={14} color="var(--rose-gold)" />
              <span>Signature Bridal Highlight</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontFamily: 'var(--font-serif)',
                color: 'var(--deep-rose)',
                marginBottom: '1.25rem',
                lineHeight: 1.2
              }}
            >
              Your Dream Wedding Look, Perfected.
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              From intimate morning Muhurtham rituals to sparkling grand evening Receptions, Diyazhu Makeovers crafts bridal transformations that photograph effortlessly and remain immaculate from the first ritual to the final farewell.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={19} color="var(--rose-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.94rem', color: 'var(--text-main)', fontWeight: 500 }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div className="bridal-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setCurrentView('bridal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary bridal-btn"
                style={{ padding: '0.85rem 1.85rem' }}
              >
                <span>View Bridal Gallery</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => openBookingModal('Traditional Bridal Makeover')}
                className="btn-secondary bridal-btn"
                style={{ padding: '0.82rem 1.75rem' }}
              >
                <span>Enquire for Bridal Dates</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bridal-highlight-card {
            padding: 2.5rem 1.75rem !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .bridal-highlight-card {
            padding: 1.75rem 1.25rem !important;
            gap: 2rem !important;
          }
          .bridal-showcase-img {
            height: 300px !important;
          }
          .bridal-cta-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .bridal-btn {
            width: 100% !important;
            min-height: 46px;
          }
        }

        @media (max-width: 400px) {
          .bridal-highlight-card {
            padding: 1.25rem 0.95rem !important;
            gap: 1.5rem !important;
          }
          .bridal-showcase-img {
            height: 250px !important;
          }
        }

        @media (min-width: 992px) {
          .accent-photo {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
