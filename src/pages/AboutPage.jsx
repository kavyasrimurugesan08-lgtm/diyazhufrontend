import React from 'react';
import { Sparkles, ShieldCheck, Heart, Crown, CheckCircle2, Feather, Calendar } from 'lucide-react';

export default function AboutPage({ settings, openBookingModal }) {
  const philosophy = settings?.about_philosophy || 
    'We believe that makeup should enhance, not mask. Every brush stroke is guided by facial geometry, skin undertones, lighting demands, and your personal comfort so you feel majestic and completely yourself.';

  const experience = settings?.about_experience || 
    'Specializing in South Indian Muhurtham, contemporary Reception glam, and high-definition photography makeup using top-tier international cruelty-free cosmetics.';

  const brandValues = [
    {
      title: 'Individual Signature',
      desc: 'No cookie-cutter bridal templates. We build color harmony that flatters your unique skin tone and bridal ensemble.'
    },
    {
      title: 'Uncompromising Hygiene',
      desc: 'Sanitized professional brush sets, single-use spatulas for cream products, and hospital-grade sanitization before every appointment.'
    },
    {
      title: 'High-Definition Longevity',
      desc: 'Formulations chosen to withstand emotional tears, bright camera flashes, humid climates, and long wedding ceremonies.'
    },
    {
      title: 'Serene Experience',
      desc: 'A calming presence and gentle demeanor ensuring the bride and her family feel comfortable and celebrated throughout the preparation.'
    }
  ];

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} color="var(--rose-gold)" />
            <span>Our Story & Philosophy</span>
          </div>
          <h1 className="section-title">About Diyazhu Makeovers</h1>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc">
            Your Beauty, Your Signature. Crafted with artistic intention, genuine warmth, and soft modern luxury.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            marginBottom: '4rem'
          }}
        >
          {/* Visual with frame */}
          <div className="about-visual-column" style={{ position: 'relative' }}>
            <div
              className="about-image-frame"
              style={{
                borderRadius: '180px 180px 24px 24px',
                overflow: 'hidden',
                aspectRatio: '4 / 5',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <img
                src="/luxury-makeup-set.jpg"
                alt="Diyazhu Makeovers Luxury Cosmetics & Makeup Set"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div
              className="about-floating-card"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '15px',
                background: '#ffffff',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 30px rgba(110, 39, 53, 0.15)',
                border: '1px solid var(--border-light)',
                maxWidth: '260px'
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--deep-rose)', fontWeight: 700 }}>
                Diyazhu Artistry
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Dedicated to bespoke bridal transformations & skin wellness.
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>
              <Feather size={14} color="var(--rose-gold)" />
              <span>Artistic Vision</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                color: 'var(--deep-rose)',
                lineHeight: 1.25,
                marginBottom: '1.25rem'
              }}
            >
              Enhancing What Is Naturally Yours.
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              {philosophy}
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              {experience}
            </p>

            <div
              style={{
                background: 'var(--bg-blush-light)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--rose-gold)',
                marginBottom: '2.5rem'
              }}
            >
              <div style={{ fontSize: '0.88rem', color: 'var(--deep-rose)', fontWeight: 600, marginBottom: '0.25rem' }}>
                Studio Owner & Lead Artist Profile
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Content is customizable through the studio admin dashboard to display verified certifications, artistic milestones, and personal background.
              </div>
            </div>

            <button
              onClick={() => openBookingModal()}
              className="btn-primary about-consult-btn"
            >
              <Calendar size={18} />
              <span>Schedule a Consultation</span>
            </button>
          </div>
        </div>

        {/* 4 Brand Values */}
        <div style={{ marginTop: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--deep-rose)' }}>
              Our Studio Standards
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Every client experiences our hallmark standards of comfort, luxury, and artistic integrity.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {brandValues.map((val, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  background: '#ffffff',
                  padding: '1.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: 'var(--rose-gold)'
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--deep-rose)', marginBottom: '0.5rem' }}>
                  {val.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-grid {
            gap: 2rem !important;
            margin-bottom: 2.5rem !important;
          }
          .about-visual-column {
            max-width: 340px;
            margin: 0 auto;
            width: 100%;
          }
          .about-consult-btn {
            width: 100% !important;
            justify-content: center;
            min-height: 46px;
          }
          .about-floating-card {
            position: static !important;
            margin-top: 1rem;
            max-width: 100% !important;
          }
        }

        @media (max-width: 380px) {
          .about-visual-column {
            max-width: 290px;
          }
        }
      `}</style>
    </div>
  );
}
