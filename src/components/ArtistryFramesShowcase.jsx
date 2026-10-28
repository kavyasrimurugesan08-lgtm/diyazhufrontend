import React, { useState } from 'react';
import { Sparkles, Crown, Eye, Calendar, Award, Star } from 'lucide-react';

/**
 * Royal Corner Filigree SVG Component
 */
function FrameCorner({ position = 'top-left' }) {
  const styles = {
    'top-left': { top: '6px', left: '6px' },
    'top-right': { top: '6px', right: '6px', transform: 'scaleX(-1)' },
    'bottom-left': { bottom: '6px', left: '6px', transform: 'scaleY(-1)' },
    'bottom-right': { bottom: '6px', right: '6px', transform: 'scale(-1)' }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 5,
        color: '#dfb78c',
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))',
        ...styles[position]
      }}
    >
      <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" stroke="currentColor">
        <path d="M4 36 V14 C4 8.48 8.48 4 14 4 H36" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M9 31 V16 C9 12.13 12.13 9 16 9 H31" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="15" cy="15" r="3" fill="currentColor" />
        <path d="M4 4 L14 14" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 26 C14 26 22 22 26 14" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function ArtistryFramesShowcase({ openBookingModal, onOpenLightbox }) {
  const [hoveredId, setHoveredId] = useState(null);

  const framesData = [
    {
      id: 'bride-portrait',
      imageUrl: '/hero-bride-portrait.jpg',
      tag: 'Couture Bridal Artistry',
      title: 'Imperial Muhurtham Radiance',
      subtitle: 'Bespoke South Indian Bridal Glow',
      desc: 'Ornate uncut diamond & emerald temple choker, floral maang tikka, and glass-skin HD coverage designed for camera perfection.',
      frameStyle: 'arch',
      accentColor: '#dfb78c',
      badge: 'Signature Look'
    },
    {
      id: 'bride-dance',
      imageUrl: '/hero-bride-dance.png',
      tag: 'Celebration & Sangeet',
      title: 'Joyous Festive Elegance',
      subtitle: 'High-Spirited Celebration Glam',
      desc: 'Radiant bride in rich magenta & saffron lehenga with kundan neckpiece and kaleeras, crafted with sweat-resistant radiance.',
      frameStyle: 'baroque',
      accentColor: '#e8a598',
      badge: 'Flawless Longwear'
    },
    {
      id: 'makeup-cosmetics',
      imageUrl: '/hero-makeup-cosmetics.jpg',
      tag: 'Haute Atelier Kits',
      title: 'Luxury Cosmetics on Silk',
      subtitle: 'Genuine International Formulations',
      desc: 'Curated vanity of dermatologist-approved luxury brands including Charlotte Tilbury, Dior, NARS & Huda Beauty.',
      frameStyle: 'silk-bevel',
      accentColor: '#dfb78c',
      badge: 'Certified Luxury'
    },
    {
      id: 'brush-powder',
      imageUrl: '/hero-brush-powder.jpg',
      tag: 'HD Airbrush Technique',
      title: 'Artisan Powder & Brush Burst',
      subtitle: 'Sculpted Studio Perfection',
      desc: 'Micro-milled HD powders and ultra-fine bristles in dynamic action, creating a velvety weightless finish that lasts 16+ hours.',
      frameStyle: 'noir-gold',
      accentColor: '#f7eed9',
      badge: 'Master Artistry'
    }
  ];

  return (
    <section
      className="section-padding artistry-frames-section"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--bg-cream-soft) 0%, #fff9f6 50%, var(--bg-cream) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative luxury background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(238, 203, 196, 0.35) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Crown size={14} color="var(--rose-gold)" />
            <span>Artistry In Frames • Animation Theme</span>
          </div>
          <h2 className="section-title">Framed in Perfection</h2>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc">
            Explore our signature artistry captured in handcrafted royal frames. Every brush stroke, bridal moment, and luxury cosmetic formulation is a tribute to your timeless beauty.
          </p>
        </div>

        {/* 4 Royal Framed Cards Showcase Grid */}
        <div
          className="artistry-frames-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {framesData.map((item, idx) => {
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="royal-frame-wrapper"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
                }}
              >
                {/* Outer Handcrafted Royal Frame */}
                <div
                  className="ornate-gold-frame"
                  style={{
                    position: 'relative',
                    padding: '14px',
                    borderRadius: item.frameStyle === 'arch' ? '140px 140px 18px 18px' : '22px',
                    background: 'linear-gradient(135deg, #e4be93 0%, #c4886e 25%, #fff1df 50%, #b76e79 75%, #8c4250 100%)',
                    boxShadow: isHovered
                      ? '0 24px 55px rgba(110, 39, 53, 0.22), 0 0 30px rgba(228, 190, 147, 0.45)'
                      : '0 16px 40px rgba(110, 39, 53, 0.12), 0 4px 15px rgba(183, 110, 121, 0.15)',
                    transition: 'all 0.5s ease'
                  }}
                >
                  {/* Decorative Frame Shimmer Ring */}
                  <div
                    className="frame-shimmer-ring"
                    style={{
                      position: 'absolute',
                      inset: '2px',
                      borderRadius: item.frameStyle === 'arch' ? '138px 138px 16px 16px' : '20px',
                      border: '1px solid rgba(255, 255, 255, 0.7)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Corner Filigrees for rectangular frames */}
                  {item.frameStyle !== 'arch' && (
                    <>
                      <FrameCorner position="top-left" />
                      <FrameCorner position="top-right" />
                      <FrameCorner position="bottom-left" />
                      <FrameCorner position="bottom-right" />
                    </>
                  )}

                  {/* Arched Top Crown for Arch Frame */}
                  {item.frameStyle === 'arch' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #dfb78c, #c4886e)',
                        color: '#4a1823',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(110, 39, 53, 0.25)',
                        border: '2px solid #ffffff',
                        zIndex: 6
                      }}
                    >
                      <Crown size={18} color="#ffffff" />
                    </div>
                  )}

                  {/* Inner Matting Container */}
                  <div
                    style={{
                      width: '100%',
                      height: '320px',
                      borderRadius: item.frameStyle === 'arch' ? '128px 128px 10px 10px' : '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#1a1415',
                      boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* The Framed Photo */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        filter: isHovered ? 'brightness(1.04)' : 'brightness(0.98)'
                      }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(43, 34, 35, 0.85) 0%, rgba(43, 34, 35, 0.2) 50%, transparent 80%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Top Floating Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--deep-rose)',
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 3
                      }}
                    >
                      <Sparkles size={12} color="var(--rose-gold)" />
                      <span>{item.badge}</span>
                    </div>

                    {/* Expand View Quick Action */}
                    <button
                      onClick={() => onOpenLightbox && onOpenLightbox(item)}
                      aria-label="Enlarge Framed View"
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(43, 34, 35, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'var(--transition-smooth)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        zIndex: 3
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.background = 'var(--rose-gold)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'rgba(43, 34, 35, 0.75)';
                      }}
                    >
                      <Eye size={16} />
                    </button>

                    {/* Bottom Caption Inside Frame */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1.15rem',
                        right: '1.15rem',
                        color: '#ffffff',
                        zIndex: 3
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#f7eed9',
                          marginBottom: '2px',
                          fontWeight: 600
                        }}
                      >
                        {item.tag}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.18rem',
                          fontWeight: 600,
                          lineHeight: 1.25,
                          textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details & Action Beneath the Frame */}
                <div
                  style={{
                    padding: '1.35rem 0.5rem 0.5rem 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}
                  >
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button
                      onClick={() => openBookingModal(item.title)}
                      className="btn-primary btn-sm"
                      style={{
                        flex: 1,
                        padding: '0.65rem 1rem',
                        fontSize: '0.84rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <Calendar size={14} />
                      <span>Book Look</span>
                    </button>

                    <button
                      onClick={() => onOpenLightbox && onOpenLightbox(item)}
                      className="btn-secondary btn-sm"
                      style={{
                        padding: '0.65rem 0.9rem',
                        fontSize: '0.84rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Enlarge View"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luxury Ornament Quote Banner */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '1.75rem 2.5rem',
            background: 'linear-gradient(135deg, rgba(252, 241, 242, 0.85) 0%, rgba(253, 251, 247, 0.95) 100%)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-card)',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--rose-gold)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            <Sparkles size={15} />
            <span>Timeless Bridal Philosophy</span>
            <Sparkles size={15} />
          </div>
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: 'var(--deep-rose)',
              fontStyle: 'italic',
              lineHeight: 1.6
            }}
          >
            "A makeover should never mask who you are; it should gently unveil the celestial queen that has always lived within."
          </blockquote>
        </div>
      </div>

      <style>{`
        @keyframes frameBorderGlow {
          0%, 100% {
            filter: drop-shadow(0 0 6px rgba(223, 183, 140, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(223, 183, 140, 0.8));
          }
        }

        .ornate-gold-frame:hover {
          animation: frameBorderGlow 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .artistry-frames-grid {
            gap: 1.75rem !important;
            margin-bottom: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          .artistry-frames-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

