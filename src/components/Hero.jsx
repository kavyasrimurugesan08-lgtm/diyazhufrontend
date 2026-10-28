import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Eye, Sparkles, MapPin, Diamond, ArrowRight, Mouse } from 'lucide-react';
import { LotusLogo } from './Navbar';

// The user's actual uploaded images for the automatic slider
const BRIDAL_SLIDES = [
  {
    id: 'bride-dance',
    image: '/hero-bride-dance.png',
    alt: 'Joyful South Indian Bride Dancing in Festive Lehenga with Kundan Jewelry',
    label: 'Celebration Radiance',
    objectPosition: 'center 20%'
  },
  {
    id: 'bride-portrait',
    image: '/hero-bride-portrait.jpg',
    alt: 'Imperial South Indian Muhurtham Bride with Temple Jewelry and HD Makeup',
    label: 'Signature Muhurtham',
    objectPosition: 'center 16%'
  },
  {
    id: 'makeup-cosmetics',
    image: '/hero-makeup-cosmetics.jpg',
    alt: 'Haute Atelier Luxury Cosmetics Palette on Silk Satin',
    label: 'International Cosmetics',
    objectPosition: 'center center'
  },
  {
    id: 'brush-powder',
    image: '/hero-brush-powder.jpg',
    alt: 'Artisan Makeup Brush and Micro-Milled Powder Explosion',
    label: 'HD Airbrush Technique',
    objectPosition: 'center center'
  }
];

export default function Hero({ openBookingModal, setCurrentView, settings }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const heroSubtitle = settings?.hero_subtitle ||
    'Couture bridal artistry, editorial makeup transformations, and bespoke styling crafted with passion, precision, and soft luxury.';

  // Automatic image slider changing smoothly every 3.5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BRIDAL_SLIDES.length);
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [currentSlide]);

  const handleManualSlide = (index) => {
    setCurrentSlide(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % BRIDAL_SLIDES.length);
      }, 3500);
    }
  };

  return (
    <section
      className="hero-reference-layout"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 65px)',
        width: '100%',
        background: 'radial-gradient(ellipse at 52% 42%, #FFF6F3 0%, #FAECE8 40%, #F5DEE0 75%, #ECD0D4 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Floating Delicate Petals & Shimmering Sparkles */}
      <div
        className="ambient-particles"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
      >
        {[
          { top: '14%', left: '12%', size: 16, dur: '12s', delay: '0s', rot: '22deg' },
          { top: '22%', right: '28%', size: 20, dur: '15s', delay: '2s', rot: '-30deg' },
          { top: '55%', left: '44%', size: 17, dur: '13s', delay: '1s', rot: '40deg' },
          { top: '42%', right: '8%', size: 22, dur: '16s', delay: '3s', rot: '-18deg' },
          { top: '75%', left: '18%', size: 15, dur: '14s', delay: '2.5s', rot: '12deg' }
        ].map((petal, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: petal.top,
              left: petal.left,
              right: petal.right,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              background: 'radial-gradient(ellipse at 35% 35%, #eb9aa8 0%, #c4576c 60%, #87263b 100%)',
              borderRadius: '60% 40% 70% 30% / 70% 30% 70% 30%',
              opacity: 0.65,
              filter: 'drop-shadow(0 3px 6px rgba(110, 39, 53, 0.2))',
              transform: `rotate(${petal.rot})`,
              animation: `floatPetalSlow ${petal.dur} ease-in-out infinite alternate`,
              animationDelay: petal.delay
            }}
          />
        ))}

        {/* Golden Twinkling Sparkles */}
        {[
          { top: '18%', left: '26%', size: 17, delay: '0.4s' },
          { top: '28%', right: '35%', size: 20, delay: '2.1s' },
          { top: '68%', left: '38%', size: 15, delay: '1.2s' },
          { top: '35%', right: '14%', size: 18, delay: '3.3s' }
        ].map((sparkle, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: sparkle.top,
              left: sparkle.left,
              right: sparkle.right,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: 'rgba(218, 178, 132, 0.9)',
              animation: 'sparkleTwinkle 4s ease-in-out infinite',
              animationDelay: sparkle.delay
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* ==============================================================
          MAIN HERO 3-PART STAGE (Responsive Grid on Desktop, Fluid Column on Mobile)
          ============================================================== */}
      <div className="hero-main-stage">
        {/* ==============================================================
            LEFT COLUMN (Desktop Left; Mobile Unpacks to Headline & Actions)
            ============================================================== */}
        <div className="hero-left-column">
          {/* Header Block: Pill Badge & Headline */}
          <div className="hero-header-block">
            {/* Top Pill Badge */}
            <div className="hero-pill-badge">
              <Sparkles size={13} color="#741d2e" />
              <span>Luxury Bridal & Beauty Studio</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline-serif">
              Your Beauty,<br />
              Your Signature.
            </h1>
          </div>

          {/* Actions Block: Subtitle & Buttons */}
          <div className="hero-actions-block">
            {/* Description */}
            <p className="hero-desc-clean">
              {heroSubtitle}
            </p>

            {/* Action Buttons Row */}
            <div className="hero-cta-buttons">
              {/* Button 1: Book an Appointment → (Velvet Burgundy Pill) */}
              <button
                onClick={() => openBookingModal()}
                className="hero-btn-primary"
              >
                <Calendar size={17} />
                <span>Book an Appointment</span>
                <ArrowRight size={16} />
              </button>

              {/* Button 2: Explore Our Looks (White Pill with Burgundy Outline) */}
              <button
                onClick={() => {
                  setCurrentView('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hero-btn-secondary"
              >
                <Eye size={17} color="#741d2e" />
                <span>Explore Our Looks</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==============================================================
            CENTER COLUMN: OVAL ARCHED FRAME WITH GOLDEN ORBITS & AUTO-SLIDER
            ============================================================== */}
        <div className="hero-center-column">
          {/* Outer Golden Orbital Ring 1 (Tilted Celestial Ring) */}
          <div className="golden-orbit-ring ring-primary" />

          {/* Secondary Golden Halo Ring 2 */}
          <div className="golden-orbit-ring ring-secondary" />

          {/* Arched / Oval Portrait Frame */}
          <div className="hero-oval-frame">
            {/* Uploaded Bridal Images in Smooth Ken Burns Crossfade Slider */}
            {BRIDAL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 4s ease-out',
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: slide.objectPosition
                    }}
                  />
                </div>
              );
            })}

            {/* Subtle Radiant Vignette Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 65%, rgba(100, 30, 45, 0.12) 100%)',
                pointerEvents: 'none',
                zIndex: 4
              }}
            />
          </div>

          {/* Discrete Manual Slider Indicator Dots */}
          <div className="hero-slider-dots">
            {BRIDAL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleManualSlide(idx)}
                  aria-label={`Switch to slide ${idx + 1}: ${slide.label}`}
                  style={{
                    width: isActive ? '28px' : '8px',
                    height: '8px',
                    borderRadius: isActive ? '4px' : '50%',
                    background: isActive ? '#6B1728' : 'rgba(183, 110, 121, 0.45)',
                    transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  title={slide.label}
                />
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            RIGHT COLUMN: CALLIGRAPHY FLOURISH & VERTICAL SCROLL INDICATOR
            ============================================================== */}
        <div className="hero-right-column">
          {/* Handwritten Calligraphy Script: "Enhance Your Natural Beauty ♡" */}
          <div className="hero-calligraphy-wrap">
            <img
              src="/hero-script-flourish.png"
              alt="Enhance Your Natural Beauty ♡"
            />
          </div>

          {/* Far Right Vertical Scroll Indicator (Desktop Only) */}
          <div
            className="hero-scroll-indicator"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
            }}
          >
            {/* Rotated text "Scroll Down ————" */}
            <span className="hero-scroll-text">
              Scroll Down ————
            </span>

            {/* Mouse Scroll Icon with Animated Wheel Dot */}
            <div className="hero-mouse-icon">
              <div className="hero-mouse-wheel" />
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          BOTTOM EDITORIAL STATS BAR: DIAMOND, LOTUS & MAP PIN
          ============================================================== */}
      <div className="hero-bottom-stats-bar">
        {/* Stat 1: 100% Customized Artistry */}
        <div className="stat-item stat-item-1">
          <div className="stat-icon-wrap">
            <Diamond size={20} strokeWidth={1.6} />
          </div>
          <div>
            <div className="stat-value">100%</div>
            <div className="stat-label">Customized Artistry</div>
          </div>
        </div>

        {/* Divider 1 & Stat 2: HD & Airbrush Long-Wear Radiance */}
        <div className="stats-col-divider stat-item stat-item-2">
          <div className="stat-icon-wrap">
            <LotusLogo size={24} color="#741d2e" />
          </div>
          <div>
            <div className="stat-value">HD & Airbrush</div>
            <div className="stat-label">Long-Wear Radiance</div>
          </div>
        </div>

        {/* Stat 3: Studio & Venue On-Location Service */}
        <div className="stat-item stat-item-3">
          <div className="stat-icon-wrap">
            <MapPin size={20} strokeWidth={1.6} />
          </div>
          <div>
            <div className="stat-value">Studio & Venue</div>
            <div className="stat-label">On-Location Service</div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          CSS ANIMATIONS & COMPREHENSIVE RESPONSIVE PHONE ALIGNMENT
          ============================================================== */}
      <style>{`
        /* Hero Section Container Padding */
        .hero-reference-layout {
          padding: 2.25rem 1.5rem 1.75rem 1.5rem;
        }

        /* 3-Part Main Grid */
        .hero-main-stage {
          position: relative;
          z-index: 5;
          max-width: 1320px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(340px, 1.15fr) minmax(320px, 1fr) minmax(140px, 0.45fr);
          align-items: center;
          gap: 2rem;
          flex: 1;
          padding-top: 0.5rem;
        }

        /* Left Column Styles */
        .hero-left-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          z-index: 6;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.42rem 1.15rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(183, 110, 121, 0.38);
          box-shadow: 0 2px 8px rgba(116, 29, 46, 0.06);
          margin-bottom: 1.25rem;
        }

        .hero-pill-badge span {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #741d2e;
        }

        .hero-headline-serif {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.6rem, 4.5vw, 4.2rem);
          font-weight: 700;
          color: #46111C;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 1.2rem;
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
        }

        .hero-desc-clean {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: clamp(0.96rem, 1.2vw, 1.05rem);
          color: #5E3D45;
          line-height: 1.68;
          max-width: 470px;
          margin-bottom: 2rem;
          font-weight: 450;
        }

        .hero-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.86rem 2.15rem;
          font-size: 0.94rem;
          font-weight: 600;
          border-radius: 9999px;
          background: linear-gradient(135deg, #741d2e 0%, #54111f 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: none;
          transition: all 0.25s ease;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: none !important;
          background: linear-gradient(135deg, #87263b 0%, #601423 100%) !important;
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.82rem 2.05rem;
          font-size: 0.94rem;
          font-weight: 600;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          color: #54111f;
          border: 1.5px solid #741d2e;
          cursor: pointer;
          box-shadow: none;
          transition: all 0.25s ease;
        }

        .hero-btn-secondary:hover {
          transform: translateY(-2px);
          background: #ffffff !important;
          box-shadow: none !important;
        }

        /* Center Column & Oval Frame */
        .hero-center-column {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          z-index: 6;
        }

        .golden-orbit-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        .golden-orbit-ring.ring-primary {
          width: 122%;
          height: 112%;
          top: -6%;
          left: -11%;
          border: 1.5px solid rgba(212, 175, 122, 0.75);
          box-shadow: 0 0 25px rgba(212, 175, 122, 0.35);
          transform: rotate(-10deg);
        }

        .golden-orbit-ring.ring-secondary {
          width: 132%;
          height: 118%;
          top: -9%;
          left: -16%;
          border: 1px dashed rgba(212, 175, 122, 0.4);
          transform: rotate(14deg);
        }

        .hero-oval-frame {
          position: relative;
          width: 100%;
          max-width: 360px;
          height: 475px;
          border-radius: 240px 240px 220px 220px;
          border: 4.5px solid #FFFFFF;
          box-shadow: 0 22px 55px rgba(100, 30, 45, 0.22), 0 6px 18px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          background-color: #FFFFFF;
          z-index: 3;
        }

        .hero-slider-dots {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 0.55rem;
          margin-top: 1rem;
          z-index: 10;
        }

        /* Right Column */
        .hero-right-column {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justifyContent: space-between;
          height: 100%;
          min-height: 440px;
          z-index: 6;
        }

        .hero-calligraphy-wrap {
          margin-top: 2rem;
          transform: rotate(-4deg);
          transition: transform 0.3s ease;
        }

        .hero-calligraphy-wrap img {
          width: 180px;
          height: auto;
          display: block;
          filter: drop-shadow(0 2px 8px rgba(183, 110, 121, 0.2));
        }

        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .hero-scroll-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: #8E5D67;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hero-mouse-icon {
          width: 20px;
          height: 32px;
          border-radius: 12px;
          border: 1.8px solid #8E5D67;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }

        .hero-mouse-wheel {
          width: 3.5px;
          height: 6px;
          border-radius: 2px;
          background-color: #6B1728;
          animation: mouseWheelBob 1.6s ease-in-out infinite;
        }

        /* Bottom Editorial Stats Bar */
        .hero-bottom-stats-bar {
          position: relative;
          z-index: 7;
          max-width: 1100px;
          width: 100%;
          margin: 2rem auto 0 auto;
          padding: 1.25rem 2rem;
          background-color: rgba(255, 255, 255, 0.68);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(183, 110, 121, 0.22);
          box-shadow: 0 8px 30px rgba(100, 30, 45, 0.06);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }

        .stat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(183, 110, 121, 0.35);
          box-shadow: 0 4px 12px rgba(116, 29, 46, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #741d2e;
          flex-shrink: 0;
        }

        .stat-value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #46111C;
          line-height: 1.15;
        }

        .stat-label {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.78rem;
          color: #68454D;
          letter-spacing: 0.02em;
          margin-top: 1px;
        }

        /* Keyframe Animations */
        @keyframes floatPetalSlow {
          0% {
            transform: translateY(0px) rotate(15deg);
            opacity: 0.55;
          }
          50% {
            transform: translateY(-20px) rotate(32deg);
            opacity: 0.75;
          }
          100% {
            transform: translateY(8px) rotate(-8deg);
            opacity: 0.6;
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.7) rotate(0deg);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.25) rotate(45deg);
            filter: drop-shadow(0 0 6px rgba(218, 178, 132, 0.9));
          }
        }

        @keyframes mouseWheelBob {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.3;
          }
        }

        /* ==============================================================
           TABLET RESPONSIVE (1024px and below)
           ============================================================== */
        @media (max-width: 1024px) {
          .hero-main-stage {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.5rem !important;
          }

          .hero-left-column {
            display: contents !important;
          }

          .hero-header-block {
            order: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
          }

          .hero-center-column {
            order: 2 !important;
            margin: 0.5rem auto !important;
          }

          .hero-right-column {
            order: 3 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justifyContent: center !important;
            min-height: auto !important;
            height: auto !important;
            margin: 0.25rem 0 0.5rem 0 !important;
          }

          .hero-calligraphy-wrap {
            margin-top: 0 !important;
            transform: rotate(-2deg) !important;
          }

          .hero-calligraphy-wrap img {
            width: 155px !important;
          }

          .hero-scroll-indicator {
            display: none !important;
          }

          .hero-actions-block {
            order: 4 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
          }

          .hero-desc-clean {
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }

          .hero-cta-buttons {
            justify-content: center !important;
          }

          .hero-bottom-stats-bar {
            order: 5 !important;
          }
        }

        /* ==============================================================
           SMARTPHONE RESPONSIVE (768px and below)
           ============================================================== */
        @media (max-width: 768px) {
          .hero-reference-layout {
            padding: 1.25rem 1rem 1.75rem 1rem !important;
            min-height: auto !important;
          }

          .hero-main-stage {
            gap: 1.25rem !important;
          }

          .hero-pill-badge {
            padding: 0.35rem 0.95rem !important;
            margin-bottom: 0.85rem !important;
          }

          .hero-pill-badge span {
            font-size: 0.68rem !important;
            letter-spacing: 0.12em !important;
          }

          .hero-headline-serif {
            font-size: clamp(2rem, 7.8vw, 2.75rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 0.75rem !important;
          }

          .hero-oval-frame {
            max-width: 280px !important;
            height: 370px !important;
            border-radius: 200px 200px 180px 180px !important;
            border-width: 4px !important;
          }

          .golden-orbit-ring.ring-primary {
            width: 114% !important;
            height: 108% !important;
            top: -4% !important;
            left: -7% !important;
          }

          .golden-orbit-ring.ring-secondary {
            width: 122% !important;
            height: 112% !important;
            top: -6% !important;
            left: -11% !important;
          }

          .hero-calligraphy-wrap img {
            width: 140px !important;
          }

          .hero-desc-clean {
            font-size: 0.92rem !important;
            line-height: 1.62 !important;
            max-width: 90% !important;
            margin-bottom: 1.5rem !important;
          }

          .hero-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
            gap: 0.75rem !important;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
            min-height: 48px !important;
            padding: 0.82rem 1.5rem !important;
            font-size: 0.92rem !important;
          }

          /* Luxury Mobile Stats Card */
          .hero-bottom-stats-bar {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 0.65rem 1rem !important;
            margin-top: 1.75rem !important;
            border-radius: 14px !important;
            width: 100% !important;
            max-width: 340px !important;
          }

          .stat-item {
            padding: 0.7rem 0.25rem !important;
            justify-content: flex-start !important;
            text-align: left !important;
            gap: 0.85rem !important;
          }

          .stats-col-divider {
            border-top: 1px solid rgba(183, 110, 121, 0.16) !important;
            border-bottom: 1px solid rgba(183, 110, 121, 0.16) !important;
          }

          .stat-icon-wrap {
            width: 36px !important;
            height: 36px !important;
          }

          .stat-value {
            font-size: 1.15rem !important;
          }

          .stat-label {
            font-size: 0.74rem !important;
          }
        }

        /* ==============================================================
           NARROW PHONES (380px and below)
           ============================================================== */
        @media (max-width: 380px) {
          .hero-headline-serif {
            font-size: 1.95rem !important;
          }

          .hero-oval-frame {
            max-width: 245px !important;
            height: 330px !important;
            border-radius: 180px 180px 160px 160px !important;
          }

          .golden-orbit-ring.ring-primary {
            width: 110% !important;
            left: -5% !important;
          }

          .golden-orbit-ring.ring-secondary {
            width: 118% !important;
            left: -9% !important;
          }

          .hero-calligraphy-wrap img {
            width: 125px !important;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            font-size: 0.88rem !important;
            padding: 0.78rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
