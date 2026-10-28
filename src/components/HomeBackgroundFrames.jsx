import React from 'react';

/**
 * HomeBackgroundFrames
 * Ambient animated floating frames and sparkle particles that drift gently
 * across the background of the Home page, creating a luxury animation theme.
 */
export default function HomeBackgroundFrames() {
  return (
    <div
      className="home-bg-animation-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Ambient Radial Color Blooms */}
      <div
        className="ambient-bloom bloom-1"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(238, 203, 196, 0.45) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(60px)',
          animation: 'bloomPulse 12s ease-in-out infinite alternate'
        }}
      />
      <div
        className="ambient-bloom bloom-2"
        style={{
          position: 'absolute',
          top: '32%',
          left: '-8%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247, 214, 217, 0.4) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(70px)',
          animation: 'bloomPulse 15s ease-in-out infinite alternate-reverse'
        }}
      />
      <div
        className="ambient-bloom bloom-3"
        style={{
          position: 'absolute',
          top: '65%',
          right: '-6%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243, 233, 220, 0.5) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(60px)',
          animation: 'bloomPulse 14s ease-in-out infinite alternate'
        }}
      />

      {/* Floating Framed Photo Accent 1 - Top Right Drift (Bride Portrait) */}
      <div
        className="floating-bg-frame frame-tr"
        style={{
          position: 'absolute',
          top: '8%',
          right: '2%',
          width: '160px',
          height: '210px',
          padding: '7px',
          background: 'linear-gradient(135deg, #dfb78c 0%, #b76e79 50%, #fdf6ec 100%)',
          borderRadius: '18px 18px 12px 12px',
          boxShadow: '0 18px 45px rgba(110, 39, 53, 0.16), 0 0 20px rgba(223, 183, 140, 0.3)',
          opacity: 0.75,
          transform: 'rotate(7deg)',
          animation: 'floatDrift1 14s ease-in-out infinite'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '14px 14px 8px 8px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            position: 'relative'
          }}
        >
          <img
            src="/hero-bride-portrait.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.02)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(110, 39, 53, 0.3) 0%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* Floating Framed Photo Accent 2 - Mid Left Drift (Brush Powder Splash) */}
      <div
        className="floating-bg-frame frame-ml"
        style={{
          position: 'absolute',
          top: '28%',
          left: '1.5%',
          width: '145px',
          height: '145px',
          padding: '6px',
          background: 'linear-gradient(135deg, #f7eed9 0%, #b76e79 60%, #4a1823 100%)',
          borderRadius: '50%',
          boxShadow: '0 15px 40px rgba(110, 39, 53, 0.18), 0 0 25px rgba(183, 110, 121, 0.3)',
          opacity: 0.7,
          animation: 'floatDrift2 16s ease-in-out infinite'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.85)'
          }}
        >
          <img
            src="/hero-brush-powder.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Floating Framed Photo Accent 3 - Lower Right (Dancing Bride) */}
      <div
        className="floating-bg-frame frame-br"
        style={{
          position: 'absolute',
          top: '55%',
          right: '1.8%',
          width: '170px',
          height: '220px',
          padding: '8px',
          background: 'linear-gradient(135deg, #ffd79a 0%, #d49a89 50%, #914f59 100%)',
          borderRadius: '16px',
          boxShadow: '0 20px 48px rgba(110, 39, 53, 0.17), 0 0 22px rgba(212, 154, 137, 0.35)',
          opacity: 0.72,
          transform: 'rotate(-6deg)',
          animation: 'floatDrift3 18s ease-in-out infinite'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.85)'
          }}
        >
          <img
            src="/hero-bride-dance.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Floating Framed Photo Accent 4 - Lower Mid Left (Silk Cosmetics Flat Lay) */}
      <div
        className="floating-bg-frame frame-bl"
        style={{
          position: 'absolute',
          top: '78%',
          left: '2%',
          width: '155px',
          height: '155px',
          padding: '6px',
          background: 'linear-gradient(135deg, #fff3e3 0%, #dfb78c 40%, #b76e79 100%)',
          borderRadius: '20px',
          boxShadow: '0 16px 42px rgba(110, 39, 53, 0.15)',
          opacity: 0.68,
          transform: 'rotate(5deg)',
          animation: 'floatDrift1 15s ease-in-out infinite reverse'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <img
            src="/hero-makeup-cosmetics.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Twinkling Golden Sparkle Stars */}
      {[
        { top: '12%', left: '15%', size: 18, delay: '0s', dur: '4s' },
        { top: '22%', right: '18%', size: 22, delay: '1.2s', dur: '5s' },
        { top: '42%', left: '8%', size: 16, delay: '2.5s', dur: '4.5s' },
        { top: '60%', right: '12%', size: 20, delay: '0.8s', dur: '5.2s' },
        { top: '75%', left: '20%', size: 17, delay: '1.8s', dur: '4.8s' },
        { top: '88%', right: '22%', size: 24, delay: '3.1s', dur: '6s' }
      ].map((star, idx) => (
        <div
          key={idx}
          className="bg-sparkle-star"
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            right: star.right,
            width: `${star.size}px`,
            height: `${star.size}px`,
            color: 'rgba(223, 183, 140, 0.85)',
            animation: `sparkleTwinkle ${star.dur} ease-in-out infinite`,
            animationDelay: star.delay
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      ))}

      {/* CSS Keyframes for smooth ambient drifting */}
      <style>{`
        @keyframes floatDrift1 {
          0%, 100% {
            transform: translateY(0px) rotate(7deg) scale(1);
          }
          50% {
            transform: translateY(-24px) rotate(4deg) scale(1.03);
          }
        }

        @keyframes floatDrift2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(-6deg) scale(1.04);
          }
        }

        @keyframes floatDrift3 {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg) scale(1);
          }
          50% {
            transform: translateY(-26px) rotate(-2deg) scale(1.03);
          }
        }

        @keyframes bloomPulse {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.18) translate(15px, -15px);
            opacity: 0.75;
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7) rotate(0deg);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.25) rotate(45deg);
            filter: drop-shadow(0 0 6px rgba(223, 183, 140, 0.9));
          }
        }

        @media (max-width: 1200px) {
          .floating-bg-frame {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

