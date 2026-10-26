import React, { useState } from 'react';
import { Sparkles, Clock, Calendar, Check, MessageCircle, HelpCircle } from 'lucide-react';

export default function ServicesPage({ services, openBookingModal, settings }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Bridal Makeup',
    'Party Makeup',
    'Hairstyling',
    'Facials & Skin',
    'Other Services'
  ];

  const filteredServices = services
    ? services.filter((s) => (selectedCategory === 'All' ? true : s.category === selectedCategory))
    : [];

  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} color="var(--rose-gold)" />
            <span>Our Service Portfolio</span>
          </div>
          <h1 className="section-title">Beauty & Makeover Services</h1>
          <div className="section-ornament">
            <span className="ornament-diamond" />
          </div>
          <p className="section-desc">
            Explore our curated range of bridal transformations, editorial makeup, and signature skin rituals. Every service is personalized to complement your beauty.
          </p>
        </div>

        {/* Pricing Transparency & Customization Notice */}
        <div
          style={{
            maxWidth: '850px',
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
          <HelpCircle size={22} color="var(--rose-gold)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong>Studio Consultation Notice:</strong> The prices and packages listed are indicative starting estimates. Final quotations can be tailored based on your venue location, ceremony timings, and party size upon direct consultation.
          </div>
        </div>

        {/* Category Tabs */}
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
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'var(--rose-gold-gradient)' : 'rgba(255, 255, 255, 0.85)',
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

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {filteredServices.map((service) => {
            const serviceWhatsAppUrl = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent(
              `Hello Diyazhu Makeovers, I would like to enquire about availability and details for "${service.title}".`
            )}`;

            return (
              <div
                key={service.id}
                className="glass-card"
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {/* Image */}
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.85rem',
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
                        padding: '0.4rem 0.95rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 15px rgba(183, 110, 121, 0.4)'
                      }}
                    >
                      {service.price}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: 'var(--deep-rose)',
                      marginBottom: '0.65rem'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                      marginBottom: '1.5rem',
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
                      padding: '0.75rem 0',
                      borderTop: '1px solid rgba(183, 110, 121, 0.15)',
                      borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
                      marginBottom: '1.25rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} color="var(--rose-gold)" />
                      <span>Duration: <strong>{service.duration || 'Consultation based'}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#276749' }}>
                      <Check size={14} />
                      <span>Available</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem' }}>
                    <button
                      onClick={() => openBookingModal(service.title)}
                      className="btn-primary"
                      style={{ padding: '0.75rem 1rem', fontSize: '0.86rem' }}
                    >
                      <Calendar size={15} />
                      <span>Book Service</span>
                    </button>

                    <a
                      href={serviceWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '0.75rem 1rem', color: '#25d366' }}
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p>No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
