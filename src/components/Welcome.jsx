import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Feather } from 'lucide-react';

export default function Welcome({ settings }) {
  const welcomeTitle = settings?.welcome_title || 'Where Artistry Meets Pure Grace';
  const welcomeText = settings?.welcome_text || 
    'At Diyazhu Makeovers, beauty is an intimate celebration of who you are. We craft personalized bridal looks, red-carpet evening glamour, and radiant skin treatments that honor your personality while giving you an unforgettable, camera-ready glow.';

  const pillars = [
    {
      icon: <Sparkles size={24} color="var(--rose-gold)" />,
      title: 'Bespoke Artistry',
      desc: 'Each look is tailored to your facial geometry, bridal attire, skin tone, and personal comfort.'
    },
    {
      icon: <ShieldCheck size={24} color="var(--rose-gold)" />,
      title: 'Luxury Cosmetics',
      desc: 'Exclusively using genuine high-end, dermatologist-tested, and international luxury makeup.'
    },
    {
      icon: <Feather size={24} color="var(--rose-gold)" />,
      title: 'Weightless Long-Wear',
      desc: 'Advanced HD & airbrush techniques providing all-day sweat-resistant perfection without feeling heavy.'
    },
    {
      icon: <HeartHandshake size={24} color="var(--rose-gold)" />,
      title: 'Compassionate Care',
      desc: 'A calm, welcoming, and reassuring atmosphere so your special day starts with serenity and joy.'
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream-soft)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>Welcome to Diyazhu Makeovers</span>
          </div>
          <h2 className="section-title">{welcomeTitle}</h2>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc" style={{ fontSize: '1.15rem' }}>
            {welcomeText}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          className="welcome-pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="glass-card welcome-pillar-card"
              style={{
                padding: '2rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                background: '#ffffff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--bg-blush)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-light)'
                }}
              >
                {p.icon}
              </div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  marginBottom: '0.65rem',
                  color: 'var(--deep-rose)',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .welcome-pillars-grid {
            margin-top: 2rem !important;
            gap: 1.25rem !important;
          }
          .welcome-pillar-card {
            padding: 1.5rem 1.15rem !important;
          }
        }

        @media (max-width: 360px) {
          .welcome-pillar-card {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
