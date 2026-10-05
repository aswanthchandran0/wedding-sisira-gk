// src/components/MusicController.jsx
import { useEffect, useState } from 'react';
import { Music, Pause } from 'lucide-react';

/**
 * Floating circular music controller (bottom-right corner).
 * Hidden until the audio starts playing at least once.
 *
 * Usage:
 *   const audioRef = useRef(null);
 *   <audio ref={audioRef} src={song} preload="auto" loop />
 *   <MusicController audioRef={audioRef} />
 */
const MusicController = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // ← new: tracks first-ever play

  // Sync state with actual audio element play/pause events
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasStarted(true); // once it plays, the controller is allowed to show
    };
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Set initial state (in case audio was already playing)
    if (!audio.paused) {
      setIsPlaying(true);
      setHasStarted(true);
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [audioRef]);

  const toggleMusic = (e) => {
    e.stopPropagation();
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .catch((err) => console.log('Audio play failed:', err));
    } else {
      audio.pause();
    }
  };

  // Don't render anything until the audio has played at least once
  if (!hasStarted) return null;

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className="fixed bottom-6 right-6 z-50 group"
      style={{
        WebkitTapHighlightColor: 'transparent',
        animation: 'musicFadeIn 0.6s cubic-bezier(.22,.9,.32,1) forwards'
      }}
    >
      {/* Outer pulsing ring (visible when playing) */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: '2px solid rgba(212,175,55,0.55)',
          animation: isPlaying ? 'musicPulse 2s ease-out infinite' : 'none',
          opacity: isPlaying ? 1 : 0
        }}
      />

      {/* Main circular button */}
      <span
        className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 group-hover:scale-110 group-active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #F7E7A9 100%)',
          boxShadow:
            '0 8px 24px -6px rgba(212,175,55,0.65), 0 3px 10px rgba(169,129,44,0.28), inset 0 1px 1px rgba(255,255,255,0.75)'
        }}
      >
        {/* Spinning ring around the icon while playing */}
        <span
          className="absolute inset-1 rounded-full pointer-events-none"
          style={{
            border: '1.5px dashed rgba(74,58,18,0.45)',
            animation: isPlaying ? 'musicSpin 8s linear infinite' : 'none'
          }}
        />

        {isPlaying ? (
          <Pause
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            style={{ color: '#4a3a12' }}
            fill="#4a3a12"
            strokeWidth={2.2}
          />
        ) : (
          <Music
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            style={{ color: '#4a3a12' }}
            strokeWidth={2.2}
          />
        )}
      </span>

      {/* Tooltip on hover (desktop) */}
      <span
        className="hidden md:block absolute right-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-md text-[11px] font-['Cormorant_Garamond'] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'rgba(74,58,18,0.92)',
          color: '#F7E7A9',
          fontWeight: 600
        }}
      >
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </span>

      {/* Keyframes */}
      <style>{`
        @keyframes musicPulse {
          0%   { transform: scale(1);   opacity: 0.85; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes musicSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes musicFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="musicPulse"], [style*="musicSpin"], [style*="musicFadeIn"] {
            animation: none !important;
          }
        }
      `}</style>
    </button>
  );
};

export default MusicController;