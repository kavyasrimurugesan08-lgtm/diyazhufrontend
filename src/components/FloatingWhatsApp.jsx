import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp({ settings }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = settings?.whatsapp || '9003979277';
  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');
  const url = `https://wa.me/91${cleanWhatsApp}?text=${encodeURIComponent("Hello Diyazhu Makeovers, I would like to enquire about your services and book an appointment.")}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip on hover */}
      {showTooltip && (
        <div
          style={{
            background: 'rgba(43, 34, 35, 0.92)',
            color: '#ffffff',
            padding: '0.45rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease-in'
          }}
        >
          Chat with Diyazhu Makeovers
        </div>
      )}

      {/* Floating Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease'
        }}
        className="whatsapp-float-btn"
      >
        <MessageCircle size={28} />
      </a>

      <style>{`
        .whatsapp-float-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.55);
        }
      `}</style>
    </div>
  );
}
