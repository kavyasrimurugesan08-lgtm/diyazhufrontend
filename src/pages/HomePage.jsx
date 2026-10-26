import React, { useState } from 'react';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import BridalHighlight from '../components/BridalHighlight';
import BookingBanner from '../components/BookingBanner';
import { Calendar, Eye, Sparkles, Clock, ArrowRight, Maximize2, X } from 'lucide-react';

export default function HomePage({
  services,
  gallery,
  settings,
  openBookingModal,
  setCurrentView
}) {
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Take first 6 active services for featured preview
  const featuredServices = services ? services.slice(0, 6) : [];

  // Take first 6 gallery items for preview
  const previewGallery = gallery ? gallery.slice(0, 6) : [];

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        openBookingModal={openBookingModal}
        setCurrentView={setCurrentView}
        settings={settings}
      />

      {/* 2. Welcome Section */}
      <Welcome settings={settings} />

      {/* 3. Featured Services Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Sparkles size={14} color="var(--rose-gold)" />
              <span>Couture Services</span>
            </div>
            <h2 className="section-title">Signature Makeover Experiences</h2>
            <div className="section-ornament">
              <span className="ornament-diamond" />
            </div>
            <p className="section-desc">
              From traditional Muhurtham brides to high-fashion reception glam, discover our carefully curated beauty offerings.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}
          >
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-md)',
                  background: '#ffffff',
                  border: '1px solid var(--border-light)'
                }}
              >
                {/* Service Image */}
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="service-card-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: 'var(--deep-rose)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {service.category}
                  </div>

                  {service.price && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        background: 'var(--rose-gold-gradient)',
                        color: '#ffffff',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(183, 110, 121, 0.3)'
                      }}
                    >
                      {service.price}
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      color: 'var(--deep-rose)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(183, 110, 121, 0.15)',
                      marginTop: 'auto'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                      <Clock size={15} color="var(--rose-gold)" />
                      <span>{service.duration || 'Flexible'}</span>
                    </div>

                    <button
                      onClick={() => openBookingModal(service.title)}
                      className="btn-primary btn-sm"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 1.15rem' }}
                    >
                      <Calendar size={14} />
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Services CTA */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setCurrentView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              <span>Explore All Services & Packages</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Bridal Feature */}
      <BridalHighlight
        setCurrentView={setCurrentView}
        openBookingModal={openBookingModal}
      />

      {/* 5. Gallery Preview Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream-soft)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Eye size={14} color="var(--rose-gold)" />
              <span>Our Portfolio</span>
            </div>
            <h2 className="section-title">Glimpses of Perfection</h2>
            <div className="section-ornament">
              <span className="ornament-diamond" />
            </div>
            <p className="section-desc">
              Every photograph is a testament to individuality, high-fashion detailing, and timeless South Indian aesthetics.
            </p>
          </div>

          {/* Gallery Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}
          >
            {previewGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                style={{
                  height: '320px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--border-light)'
                }}
                className="gallery-item-hover"
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
                  className="gallery-img"
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(43, 34, 35, 0.75) 0%, rgba(43, 34, 35, 0.1) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                    color: '#ffffff',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f7eed9' }}>
                    {item.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, marginTop: '2px' }}>
                    {item.title}
                  </div>
                  {item.caption && (
                    <div style={{ fontSize: '0.78rem', color: '#e5d7d9', marginTop: '4px', opacity: 0.9 }}>
                      {item.caption}
                    </div>
                  )}

                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', padding: '0.4rem', borderRadius: '50%' }}>
                    <Maximize2 size={16} color="#ffffff" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setCurrentView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              <span>View Full Makeover Gallery</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Booking Banner */}
      <BookingBanner
        openBookingModal={openBookingModal}
        settings={settings}
      />

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
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(43, 34, 35, 0.7)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activeLightbox.image_url}
              alt={activeLightbox.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', background: '#1a1415' }}
            />

            <div style={{ padding: '1.5rem', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="section-tag" style={{ marginBottom: '0.25rem', padding: '0.2rem 0.75rem', fontSize: '0.72rem' }}>
                  {activeLightbox.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--deep-rose)' }}>
                  {activeLightbox.title}
                </h3>
                {activeLightbox.caption && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {activeLightbox.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  setActiveLightbox(null);
                  openBookingModal(activeLightbox.title);
                }}
                className="btn-primary btn-sm"
              >
                <Calendar size={15} />
                <span>Book This Look</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover Zoom CSS */}
      <style>{`
        .service-card-img:hover {
          transform: scale(1.05);
        }
        .gallery-item-hover:hover .gallery-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
