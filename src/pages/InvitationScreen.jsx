import HeroImage from "../assets/hero.jpeg";
import DressCodeImage from "../assets/dressCode.png";
import { useEffect, useState, useRef } from "react";
import { CalendarDays, MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import song from '../assets/song.mp3';

import gallary1 from '../assets/gallary1.jpeg';
import gallary2 from '../assets/gallary2.png';
import gallary3 from '../assets/gallary3.jpeg';
import gallary4 from '../assets/gallary4.png';
import gallary5 from '../assets/gallary5.jpeg'
import gallary6 from '../assets/gallary6.jpeg'

const galleryImages = [
  { id: 1, image: gallary1 },
  { id: 2, image: gallary2 },
  { id: 3, image: gallary4 },
  { id: 4, image: gallary3 },
  // {id:  5, image:gallary5  },
  // {id:  6, image:gallary6  }
];

const InvitationScreen = () => {
  const weddingDate = new Date("2026-12-06T10:00:00");
  const location = useLocation();
  const audioRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClicked, setIsClicked] = useState(false);

  const greetingsRef = useRef(null);
  const timerRef = useRef(null);
  const scheduleRef = useRef(null);
  const dateRef = useRef(null);
  const ceremonyRef = useRef(null);
  const dressCodeRef = useRef(null);
  const reception1IntroRef = useRef(null);
  const reception1DateRef = useRef(null);
  const reception1TimeRef = useRef(null);
  const reception2IntroRef = useRef(null);
  const reception2TimeRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryImagesRef = useRef([]);

  // Auto-play audio
  useEffect(() => {
    if (audioRef.current) {
      const fromCover = location.state?.fromCover || true;
      if (fromCover) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    }
  }, [location]);

  // Handle audio end
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleAudioEnd = () => {
        console.log('Song finished playing');
      };
      audio.addEventListener('ended', handleAudioEnd);
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = [
      greetingsRef.current,
      timerRef.current,
      scheduleRef.current,
      dateRef.current,
      ceremonyRef.current,
      dressCodeRef.current,
      reception1IntroRef.current,
      reception1DateRef.current,
      reception1TimeRef.current,
      reception2IntroRef.current,
      reception2TimeRef.current,
      galleryRef.current,
      ...galleryImagesRef.current
    ];

    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.9s cubic-bezier(.22,.9,.32,1), transform 0.9s cubic-bezier(.22,.9,.32,1)';
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToGoogleCalendar = () => {
    const title = "Gautham & Sisira Wedding";
    const venue = "Manikkal Mana Kozhikode, Kerala";
    const startDate = "20261206T100000";
    const endDate = "20261206T170000";

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(venue)}&details=${encodeURIComponent("Join us in celebrating our special day!")}`;

    window.open(googleCalendarUrl, '_blank');
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const viewLocation = () => {
    const venueAddressMapUrl = 'https://www.google.com/maps/place/Manikkal+Mana/@11.19007,75.8559693,51m/data=!3m1!1e3!4m20!1m10!3m9!1s0x3ba65bbe6ea4f613:0x26795632dc1c0663!2sManikkal+Mana!5m2!4m1!1i2!8m2!3d11.1900312!4d75.8560102!16s%2Fg%2F11rx6v_yzq!3m8!1s0x3ba65bbe6ea4f613:0x26795632dc1c0663!5m2!4m1!1i2!8m2!3d11.1900312!4d75.8560102!16s%2Fg%2F11rx6v_yzq?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D';
    window.open(venueAddressMapUrl, "_blank");
  };

  const ReceptionViewLocation = () => {
    const venueAddressMapUrl = 'https://www.google.com/maps/place/Maniyattu+Auditorium/@9.3638716,76.6600456,859m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b063df9ae8268c7:0xa42144519c40e70e!8m2!3d9.3638716!4d76.6626205!16s%2Fg%2F11swhjhdcr?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';
    window.open(venueAddressMapUrl, "_blank");
  };

  const scrollToContent = () => {
    const target = document.getElementById('invitation-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FBF8F2] overflow-x-hidden">
        <audio ref={audioRef} src={song} preload="auto" />

        <main className="max-w-[620px] mx-auto lg:px-7 pb-[120px] text-center">
          {/* ---------- HERO IMAGE ---------- */}
          <div
            className="relative w-full h-[100vh] overflow-hidden"
            style={{
              opacity: 0,
              transform: 'scale(1.03)',
              animation: 'heroReveal 2.1s cubic-bezier(.22,.9,.32,1) forwards',
              animationDelay: '.15s'
            }}
          >
            <img
              src={HeroImage}
              alt="Wedding hero"
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.35) 100%)'
              }}
            />

            {/* Couple names */}
            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeUp 1.3s cubic-bezier(.22,.9,.32,1) forwards',
                animationDelay: '.6s'
              }}
            >
              <h1 className="font-['Great_Vibes'] text-[#FBF8F2] text-6xl leading-none drop-shadow-lg">
                Gautham &amp; Sisira
              </h1>
              <p className="mt-2 font-['Cormorant_Garamond'] text-[#FBF8F2] uppercase tracking-[0.3em] text-xl drop-shadow-md">
                WE ARE GETTING MARRIED
              </p>
            </div>

            {/* ---------- SCROLL DOWN INDICATOR (BLACK) ---------- */}
            <button
              onClick={scrollToContent}
              aria-label="Scroll down to see invitation details"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none focus:outline-none group"
              style={{
                opacity: 0,
                animation: 'fadeUp 1.3s cubic-bezier(.22,.9,.32,1) forwards',
                animationDelay: '1.4s'
              }}
            >
              <span
                className="font-['Cormorant_Garamond'] uppercase tracking-[0.35em] text-[11px] font-semibold transition-all duration-500 group-hover:tracking-[0.45em]"
                style={{
                  color: '#1A1A1A',
                  textShadow: '0 1px 6px rgba(255,255,255,0.85), 0 0 12px rgba(255,255,255,0.6)'
                }}
              >
                Scroll Down
              </span>

              <span
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 group-hover:scale-110"
                style={{
                  border: '1.5px solid #1A1A1A',
                  backgroundColor: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
                }}
              >
                <ChevronDown
                  className="w-5 h-5"
                  style={{
                    color: '#1A1A1A',
                    animation: 'bounceDown 2s ease-in-out infinite'
                  }}
                />
              </span>

              {/* subtle pulsing ring (black) */}
              <span
                className="absolute bottom-0 w-9 h-9 rounded-full pointer-events-none"
                style={{
                  border: '1.5px solid rgba(26,26,26,0.5)',
                  animation: 'pulseRing 2.2s ease-out infinite'
                }}
              />
            </button>

            {/* Bottom fade into page */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#FBF8F2]/50 to-[#FBF8F2] pointer-events-none" />
          </div>

          {/* ---------- CONTENT ---------- */}
          <div id="invitation-content">
            {/* Greetings */}
            <div ref={greetingsRef} className="w-full pt-16 text-start px-8">
              <h2 className="font-['Cormorant_Garamond'] font-bold text-2xl font-medium text-[#2E2A28] leading-[1.2]">
                YOU ARE INVITED TO
              </h2>
              <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
                our wedding
              </h2>
              <p className="font-['Poppins'] text-[17px] pt-5 leading-8 text-[#6B6B6B]">
                We would love for you to be part of this very special moment for us.
              </p>

              <h2 className="font-['Cormorant_Garamond'] uppercase tracking-[0.18em] text-xl pt-5 font-semibold text-[#2E2A28] text-end">
                UNTIL THE
              </h2>
              <h2 className="font-['Great_Vibes'] text-4xl leading-none mt-2 text-end">
                Big Day
              </h2>
            </div>

            {/* Timer */}
            <div ref={timerRef} className="w-full justify-center gap-4 flex flex-row pt-8 px-8">
              <div className="flex flex-col">
                <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">
                  {timeLeft.days}
                </h1>
                <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">DAYS</p>
              </div>

              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>

              <div className="flex flex-col">
                <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">{timeLeft.hours}</h1>
                <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">HOURS</p>
              </div>

              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>

              <div className="flex flex-col">
                <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">{timeLeft.minutes}</h1>
                <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">MINUTES</p>
              </div>

              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>

              <div className="flex flex-col">
                <h1 className="font-['Poppins'] text-4xl font-medium text-[#A9812C]">{timeLeft.seconds}</h1>
                <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">SECONDS</p>
              </div>
            </div>

            {/* Schedule button */}
            <div ref={scheduleRef} className="w-full flex justify-center pt-8 px-8">
              <button
                onClick={addToGoogleCalendar}
                className={`flex flex-row items-center gap-2 py-3 px-6 w-fit rounded-lg shadow-md bg-white text-[#4A4A4A] hover:bg-[#2E2A28] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 ${isClicked ? 'scale-95' : 'active:scale-95'}`}
              >
                <CalendarDays className="size-4" />
                <p className="font-['Poppins'] text-[15px] font-medium">Schedule Reminder</p>
              </button>
            </div>

            {/* Ceremony date */}
            <div ref={dateRef} className="flex flex-col justify-center pt-24">
              <h3 className="font-['Cormorant_Garamond'] uppercase tracking-[0.12em] text-2xl text-[#4A4A4A]">
                DECEMBER
              </h3>
              <h1 className="font-['Cormorant_Garamond'] text-8xl font-medium leading-none text-[#4A4A4A]">
                06
              </h1>
              <h3 className="font-['Cormorant_Garamond'] tracking-[0.35em] text-2xl text-[#4A4A4A]">
                2026
              </h3>
            </div>

            {/* Ceremony */}
            <div ref={ceremonyRef} className="w-full pt-24 text-start px-8">
              <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
                Ceremony
              </h2>
              <p className="font-['Poppins'] text-[17px] leading-8 text-[#6B6B6B]">
                We would love for you to be a part of our intimate wedding celebration at the beautiful Manikkal Mana.
              </p>
              <h2 className="font-['Great_Vibes'] pt-12 text-4xl text-[#2E2A28] leading-none">
                Muhurtham
              </h2>
              <p className="font-['JetBrains'] text-[17px] leading-8 text-[#6B6B6B]">
                11:50 AM - 12:20 PM
              </p>

              <div className="pt-4">
                <button
                  onClick={viewLocation}
                  className="flex flex-row items-center gap-2 py-3 px-6 sm:w-fit rounded-lg shadow-md bg-[#A9812C] text-white hover:bg-[#8F6E25] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <MapPin className="size-4" />
                  <p className="font-['Poppins'] text-[15px] font-medium">View Location</p>
                </button>
              </div>
            </div>

            {/* Dress Code */}
            <div ref={dressCodeRef} className="w-full pt-16 px-8 flex">
              <div className="flex-1 flex items-center justify-center">
                <img src={DressCodeImage} alt="dress code" className="lg:w-52 w-32" />
                <div className="ml-auto h-28 w-px bg-[#D8D2CA]" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-start font-['Cormorant_Garamond'] text-xl font-semibold tracking-[0.15em] uppercase">
                  Dress Code
                </h2>
                <p className="pt-4 font-['Poppins'] text-[16px] text-[#7A7A7A] pl-1">
                  Come dressed in your traditional Kerala best.
                </p>
              </div>
            </div>

            {/* Reception 1 (groom's side) */}
            <div ref={reception1IntroRef} className="w-full pt-24 text-start px-8">
              <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
                Reception
              </h2>
              <p className="font-['Poppins'] text-[17px] leading-8 text-[#6B6B6B]">
                An evening of love, laughter &amp; celebration with the groom's family.
              </p>
            </div>

            <div ref={reception1DateRef} className="flex flex-col justify-center pt-24">
              <h3 className="font-['Cormorant_Garamond'] uppercase tracking-[0.12em] text-2xl text-[#4A4A4A]">
                DECEMBER
              </h3>
              <h1 className="font-['Cormorant_Garamond'] text-8xl font-medium leading-none text-[#4A4A4A]">
                09
              </h1>
              <h3 className="font-['Cormorant_Garamond'] tracking-[0.35em] text-2xl text-[#4A4A4A]">
                2026
              </h3>
            </div>

            <div ref={reception1TimeRef} className="w-full pt-24 text-start px-8">
              <h2 className="font-['poppins'] font-bold text-xl text-[#2E2A28] leading-none">
                Time
              </h2>
              <p className="font-['JetBrains'] text-[17px] leading-8 text-[#6B6B6B]">
                6:00 PM - 10:00 PM
              </p>

              <div className="pt-4">
                <button
                  onClick={ReceptionViewLocation}
                  className="flex flex-row items-center gap-2 py-3 px-6 sm:w-fit rounded-lg shadow-md bg-[#A9812C] text-white hover:bg-[#8F6E25] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <MapPin className="size-4" />
                  <p className="font-['Poppins'] text-[15px] font-medium">View Location</p>
                </button>
              </div>
            </div>

            {/* Reception 2 (bride's side) */}
            <div ref={reception2IntroRef} className="w-full pt-24 text-start px-8">
              <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
                Reception
              </h2>
              <p className="font-['Poppins'] text-[17px] leading-8 text-[#6B6B6B]">
                An evening of love, laughter &amp; celebration with bride's family.
              </p>
            </div>

            <div ref={reception2TimeRef} className="w-full pt-8 text-start px-8">
              <h2 className="font-['poppins'] font-bold text-xl text-[#2E2A28] leading-none">
                Time
              </h2>
              <p className="font-['JetBrains'] text-[17px] leading-8 text-[#6B6B6B]">
                4:00 PM - 8:00 PM
              </p>

              <h2 className="font-['poppins'] font-bold text-xl pt-4 text-[#2E2A28] leading-none">
                Location
              </h2>
              <p className="font-['JetBrains'] text-[17px] leading-8 text-[#6B6B6B]">
                Bride's Residence
              </p>
            </div>

            {/* Gallery */}
            <section ref={galleryRef} className="w-full pt-20 px-8">
              <div className="text-center mb-10">
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#2E2A28]">
                  Gallery
                </h2>
                <p className="font-['Poppins'] text-[#6B6B6B] mt-3">
                  A glimpse of our beautiful journey together.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((item, index) => (
                  <div
                    key={item.id}
                    ref={el => (galleryImagesRef.current[index] = el)}
                    className="overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={`Gallery ${item.id}`}
                      className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes heroReveal {
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.9); opacity: 0.7; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
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
    </>
  );
};

export default InvitationScreen;