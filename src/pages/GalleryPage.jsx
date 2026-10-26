import React, { useState } from 'react';
import { Sparkles, Eye, Maximize2, X, Calendar, Info } from 'lucide-react';

export default function GalleryPage({ gallery, openBookingModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState(null);

  const categories = [
    'All',
    'Bridal Looks',
    'Reception & Party',
    'Hairstyling',
    'Transformations'
  ];

  const filteredGallery = gallery
    ? gallery.filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory))
    : [];

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-cream-soft)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} color="var(--rose-gold)" />
            <span>Makeover Portfolio</span>
          </div>
          <h1 className="section-title">The Bridal & Artistry Gallery</h1>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc">
            Explore diverse makeup styles, traditional Muhurtham adornments, and glamorous evening transformations.
          </p>
        </div>

        {/* Portfolio Demonstration Notice Banner */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto 2.5rem auto',
            background: 'var(--bg-blush-light)',
            border: '1px solid var(--border-solid)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Info size={22} color="var(--rose-gold)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong>Portfolio Showcase Notice:</strong> The images currently featured in this gallery serve as artistic demonstrations and style references for Diyazhu Makeovers. Original client photographs can be uploaded and managed directly through the studio admin dashboard.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.55rem 1.35rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'var(--rose-gold-gradient)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid transparent' : '1px solid var(--border-light)',
                  boxShadow: isActive ? '0 4px 14px rgba(183, 110, 121, 0.35)' : 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              style={{
                height: '380px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-light)'
              }}
              className="gallery-card-item"
            >
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="gallery-card-img"
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(43, 34, 35, 0.8) 0%, rgba(43, 34, 35, 0.15) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  color: '#ffffff'
                }}
              >
                <div style={{ fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f7eed9' }}>
                  {item.category}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 600, marginTop: '2px' }}>
                  {item.title}
                </div>
                {item.caption && (
                  <div style={{ fontSize: '0.82rem', color: '#e5d7d9', marginTop: '4px', opacity: 0.9 }}>
                    {item.caption}
                  </div>
                )}

                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.45rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Maximize2 size={16} color="#ffffff" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p>No gallery images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="lightbox-overlay" onClick={() => setActiveLightbox(null)}>
          <div
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: '#ffffff',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(43, 34, 35, 0.75)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <img
              src={activeLightbox.image_url}
              alt={activeLightbox.title}
              style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', background: '#1c1617' }}
            />

            <div
              style={{
                padding: '1.5rem',
                background: '#ffffff',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>
                <span className="section-tag" style={{ marginBottom: '0.25rem', padding: '0.2rem 0.75rem', fontSize: '0.72rem' }}>
                  {activeLightbox.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--deep-rose)' }}>
                  {activeLightbox.title}
                </h3>
                {activeLightbox.caption && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {activeLightbox.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  const look = activeLightbox.title;
                  setActiveLightbox(null);
                  openBookingModal(look);
                }}
                className="btn-primary"
              >
                <Calendar size={16} />
                <span>Enquire for This Look</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card-item:hover .gallery-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
