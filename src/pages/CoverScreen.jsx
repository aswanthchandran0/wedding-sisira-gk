import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import song from '../assets/song.mp3'; // Adjust the path as needed

const WeddingInvitation = () => {
  const ctaRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();
      const target = e.currentTarget;
      target.style.transform = 'scale(0.97)';
      setTimeout(() => { target.style.transform = ''; }, 180);
      
      // Play the song
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
      
      // Navigate to invitation page
      navigate('/invitation');
    };

    const cta = ctaRef.current;
    if (cta) {
      cta.addEventListener('click', handleClick);
      return () => cta.removeEventListener('click', handleClick);
    }
  }, [navigate]);

  // Handle audio ended event
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleAudioEnd = () => {
        // Audio ended - you can add any cleanup here
        console.log('Song finished playing');
      };
      
      audio.addEventListener('ended', handleAudioEnd);
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2E2A28] font-sans overflow-x-hidden antialiased">
      {/* Audio element */}
      <audio ref={audioRef} src={song} preload="auto" />
      
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[min(92vh,820px)] min-h-[560px] overflow-hidden bg-white"
        aria-label="Wedding hero image"
      >
        {/* Hero scene with SVG */}
        <div
          className="absolute inset-0 opacity-0 scale-[1.045]"
          style={{
            animation: 'heroReveal 2.1s cubic-bezier(.22,.9,.32,1) forwards',
            animationDelay: '.15s',
            maskImage: 'linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.75) 78%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.75) 78%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0) 100%)'
          }}
        >
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F6E3C4"/>
                <stop offset="38%" stopColor="#F3D9B8"/>
                <stop offset="68%" stopColor="#F7E6C9"/>
                <stop offset="100%" stopColor="#FFFFFF"/>
              </linearGradient>
              <radialGradient id="sun" cx="50%" cy="46%" r="50%">
                <stop offset="0%" stopColor="#FFF6DE" stopOpacity="0.95"/>
                <stop offset="45%" stopColor="#F7E7A9" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#F7E7A9" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="groundFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9DAC0" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="1200" height="800" fill="url(#sky)"/>
            <circle cx="600" cy="360" r="360" fill="url(#sun)"/>
            <circle cx="600" cy="380" r="86" fill="#FBF3DD" opacity="0.9"/>

            {/* distant birds */}
            <g stroke="#C9A55C" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round">
              <path d="M300 220 q10 -14 20 0 q10 -14 20 0"/>
              <path d="M360 250 q8 -11 16 0 q8 -11 16 0"/>
              <path d="M840 200 q10 -14 20 0 q10 -14 20 0"/>
            </g>

            {/* ground haze */}
            <rect x="0" y="560" width="1200" height="240" fill="url(#groundFade)"/>

            {/* couple silhouette, embracing, golden hour */}
            <g transform="translate(600,560)" fill="#3B2F22" opacity="0.92">
              {/* her gown */}
              <path d="M-46,180 C-70,80 -58,-10 -30,-46 C-18,-60 2,-62 8,-48 C18,-24 20,60 8,150 C4,168 -2,180 -12,182 Z"/>
              {/* her upper body & head */}
              <ellipse cx="-14" cy="-70" rx="15" ry="18"/>
              <path d="M-30,-52 C-22,-64 -4,-66 6,-56 C12,-50 12,-38 6,-30 L-24,-30 C-30,-38 -32,-46 -30,-52 Z"/>
              {/* her arm reaching to him */}
              <path d="M4,-34 C16,-26 26,-14 30,0 C32,8 26,12 20,6 C10,-6 2,-16 -4,-26 Z"/>

              {/* him suit */}
              <path d="M18,182 C10,120 8,20 22,-56 C28,-80 60,-84 70,-58 C86,-10 86,90 74,182 Z"/>
              {/* his head */}
              <ellipse cx="46" cy="-84" rx="16" ry="19"/>
              <path d="M30,-62 C34,-76 58,-78 66,-64 C70,-56 68,-44 62,-38 L34,-38 C28,-46 27,-54 30,-62 Z"/>
              {/* his arm around her */}
              <path d="M24,-40 C10,-30 -2,-16 -8,0 C-11,8 -5,12 1,6 C12,-6 20,-18 30,-30 Z"/>
            </g>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { left: '18%', width: '6px', height: '6px', delay: '0.9s, 1s', dx: '14px', opacity: '0.55', duration: '9s' },
            { left: '32%', width: '4px', height: '4px', delay: '1.6s, 1.3s', dx: '-10px', opacity: '0.4', duration: '11s' },
            { left: '47%', width: '8px', height: '8px', delay: '0.6s, 1.6s', dx: '18px', opacity: '0.5', duration: '8s' },
            { left: '61%', width: '5px', height: '5px', delay: '2s, 1.9s', dx: '-16px', opacity: '0.45', duration: '12s' },
            { left: '74%', width: '7px', height: '7px', delay: '1.1s, 2.1s', dx: '10px', opacity: '0.5', duration: '9.5s' },
            { left: '85%', width: '4px', height: '4px', delay: '1.9s, 2.3s', dx: '-8px', opacity: '0.4', duration: '10.5s' },
            { left: '26%', width: '3px', height: '3px', delay: '2.4s, 2.5s', dx: '12px', opacity: '0.35', duration: '13s' },
            { left: '68%', width: '3px', height: '3px', delay: '2.7s, 2.7s', dx: '-12px', opacity: '0.35', duration: '12.5s' },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute bottom-[6%] rounded-full"
              style={{
                left: p.left,
                width: p.width,
                height: p.height,
                opacity: 0,
                animation: `drift ${p.duration} ease-in-out infinite, fadeInParticle 2.5s ease forwards`,
                animationDelay: p.delay,
                '--max-opacity': p.opacity,
                '--dx': p.dx,
                background: 'radial-gradient(circle at 35% 35%, rgba(247,231,169,0.9), rgba(212,175,55,0.15) 65%, rgba(212,175,55,0) 75%)'
              }}
            />
          ))}
        </div>

        {/* Glow effect */}
        <div
          className="absolute left-1/2 bottom-[6%] w-[120%] h-[38%] -translate-x-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(247,231,169,0.35) 0%, rgba(247,231,169,0) 70%)',
            filter: 'blur(18px)',
            opacity: 0,
            animation: 'glowIn 2.4s cubic-bezier(.22,.9,.32,1) forwards',
            animationDelay: '.6s'
          }}
        />

        {/* Fade overlay */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[46%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 45%, #FFFFFF 92%)'
          }}
        />
      </section>

      {/* CONTENT SECTION */}
      <main className="relative max-w-[620px] mx-auto px-7 pb-[120px] text-center">
        <div className="-mt-[4.5vh]">
          <p
            className="font-['Cormorant_Garamond'] italic text-[17px] tracking-[0.14em] text-[#A9812C] uppercase"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.35s'
            }}
          >
            The beginning of forever
          </p>

          <div
            className="flex items-center justify-center gap-2.5 my-[22px] mx-auto w-full"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.5s'
            }}
          >
            <span className="h-px w-[46px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
            <span className="h-px w-[46px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* COUPLE NAMES - Added here */}
          <div
            className="mb-6"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.55s'
            }}
          >
            <h2 className="font-['Playfair_Display'] text-[clamp(32px,5vw,48px)] font-medium text-[#2E2A28] leading-[1.2]">
              <span className="text-[#A9812C]">Gautham</span>
              <span className="mx-4 text-[#D4AF37]">&</span>
              <span className="text-[#A9812C]">Sisira</span>
            </h2>
            <p className="font-['Cormorant_Garamond'] italic text-[18px] text-[#8C8478] mt-1 tracking-[0.08em]">
              together with their families
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-2.5 my-[22px] mx-auto w-full"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.6s'
            }}
          >
            <span className="h-px w-[30px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="w-1 h-1 bg-[#D4AF37] rotate-45" />
            <span className="h-px w-[30px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <h1
            className="font-['Playfair_Display'] font-medium text-[clamp(24px,4vw,38px)] leading-[1.38] tracking-[0.005em] text-[#2E2A28]"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.65s'
            }}
          >
            we joyfully invite you to celebrate<br />
            <em className="not-italic text-[#A9812C] font-medium">the beginning of our forever.</em>
          </h1>

          <p
            className="mt-[30px] font-sans font-light text-[16px] leading-[1.9] text-[#8C8478] tracking-[0.01em] max-w-[480px] mx-auto"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.85s'
            }}
          >
            You have received this invitation because you are a cherished part of our lives.
            We would be honored to celebrate this beautiful day with you.
          </p>

          <div
            className="mt-[56px]"
            style={{
              opacity: 0,
              transform: 'translateY(26px)',
              animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '1.15s'
            }}
          >
            <a
              ref={ctaRef}
              href="#invitation"
              className="relative inline-block font-sans font-medium text-[14.5px] tracking-[0.14em] uppercase text-[#4a3a12] no-underline px-[52px] py-[19px] rounded-[999px] bg-gradient-to-br from-[#D4AF37] to-[#F7E7A9] transition-all duration-[0.45s] ease-[cubic-bezier(.22,.9,.32,1)] hover:translate-y-[-3px] hover:scale-[1.045] hover:shadow-[0_16px_40px_-8px_rgba(212,175,55,0.65),0_4px_14px_rgba(169,129,44,0.32),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:bg-gradient-to-br hover:from-[#DEBB4A] hover:to-[#F7E7A9] active:translate-y-[-1px] active:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#A9812C] focus:ring-offset-4"
              style={{
                boxShadow: '0 10px 30px -8px rgba(212,175,55,0.55), 0 2px 8px rgba(169,129,44,0.25), inset 0 1px 1px rgba(255,255,255,0.6)'
              }}
              id="openInvitation"
            >
              Open Invitation
            </a>
            <p
              className="mt-[22px] font-['Cormorant_Garamond'] italic text-[15px] text-[#B7B0A3] tracking-[0.03em]"
              style={{
                opacity: 0,
                transform: 'translateY(26px)',
                animation: 'fadeUp 1.1s cubic-bezier(.22,.9,.32,1) forwards',
                animationDelay: '1.4s'
              }}
            >
              Tap to begin your journey with us.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center px-5 pb-[56px] font-['Cormorant_Garamond'] text-[13px] tracking-[0.18em] uppercase text-[#B7B0A3]">
        With Love — Est. Forever
      </footer>

      {/* Keyframe animations */}
      <style>{`
        @keyframes heroReveal {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glowIn {
          to { opacity: 1; }
        }
        @keyframes fadeInParticle {
          to { opacity: var(--max-opacity, 0.6); }
        }
        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(var(--dx,12px), -60px) scale(1.06); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 560px) {
          .particle {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;