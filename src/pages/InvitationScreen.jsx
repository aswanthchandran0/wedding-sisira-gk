import HeroImage from "../assets/hero.jpeg";
import DressCodeImage from "../assets/dressCode.png";
import { useEffect, useState, useRef } from "react";
import { CalendarDays, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import song from '../assets/song.mp3'; // Adjust the path as needed

import gallary1 from '../assets/gallary1.jpeg';
import gallary2 from '../assets/gallary2.png';
import gallary3 from '../assets/gallary3.jpeg';
import gallary4 from '../assets/gallary4.png';

const galleryImages = [
  { id: 1, image: gallary1 },
  { id: 2, image: gallary2 },
  { id: 3, image: gallary4 },
  { id: 4, image: gallary3 },
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

  // Refs for scroll animations
  const greetingsRef = useRef(null);
  const timerRef = useRef(null);
  const scheduleRef = useRef(null);
  const dateRef = useRef(null);
  const ceremonyRef = useRef(null);
  const celebrationRef = useRef(null);
  const dressCodeRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryImagesRef = useRef([]);

  // Auto-play audio when component mounts (only if coming from cover page)
  useEffect(() => {
    if (audioRef.current) {
      // Check if we came from the cover page (you can pass state)
      const fromCover = location.state?.fromCover || true;
      
      if (fromCover) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    }
  }, [location]);

  // Handle audio end - close/stop music
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleAudioEnd = () => {
        // Option 1: Just log that it ended
        console.log('Song finished playing');
        
        // Option 2: Navigate back or show a message
        // navigate('/');
      };
      
      audio.addEventListener('ended', handleAudioEnd);
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  // Timer logic
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

  // Intersection Observer for scroll animations
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
        }
      });
    }, observerOptions);

    const elements = [
      greetingsRef.current,
      timerRef.current,
      scheduleRef.current,
      dateRef.current,
      ceremonyRef.current,
      celebrationRef.current,
      dressCodeRef.current,
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

  // Function to add to Google Calendar
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

  const [isClicked, setIsClicked] = useState(false);

  const viewLocation = () => {
    const venueAddressMapUrl = 'https://www.google.com/maps/place/Manikkal+Mana/@11.19007,75.8559693,51m/data=!3m1!1e3!4m20!1m10!3m9!1s0x3ba65bbe6ea4f613:0x26795632dc1c0663!2sManikkal+Mana!5m2!4m1!1i2!8m2!3d11.1900312!4d75.8560102!16s%2Fg%2F11rx6v_yzq!3m8!1s0x3ba65bbe6ea4f613:0x26795632dc1c0663!5m2!4m1!1i2!8m2!3d11.1900312!4d75.8560102!16s%2Fg%2F11rx6v_yzq?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D';
    window.open(venueAddressMapUrl, "_blank");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FBF8F2] overflow-x-hidden">
        {/* Audio element */}
        <audio ref={audioRef} src={song} preload="auto" />
        
        {/* content div */}
        <main className="max-w-[620px] mx-auto lg:px-7 pb-[120px] text-center">
          {/* image - hero animation on load */}
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
              alt="photo"
              className="w-full h-full object-cover"
            />
            
            {/* Better text readability - gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0.15) 100%)'
              }}
            />

            <div 
              className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeUp 1.3s cubic-bezier(.22,.9,.32,1) forwards',
                animationDelay: '.6s'
              }}
            >
              <h1 className="font-['Great_Vibes'] text-[#FBF8F2] text-6xl leading-none drop-shadow-lg">
                Gautham & Sisira
              </h1>
              <p className="mt-2 font-['Cormorant_Garamond'] text-[#FBF8F2] uppercase tracking-[0.3em] text-xl drop-shadow-md">
                WE ARE GETTING MARRIED
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#FBF8F2]/50 to-[#FBF8F2]" />
          </div>

          {/* Rest of your content remains the same... */}
          {/* greetings - scroll animation */}
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

          {/* timer - scroll animation */}
          <div ref={timerRef} className="w-full justify-center gap-4 flex flex-row pt-8 px-8">
            <div className="flex flex-col">
              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">
                {timeLeft.days} 
              </h1>
              <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">
                DAYS
              </p>
            </div>

            <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>

            <div className="flex flex-col">
              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">
                {timeLeft.hours} 
              </h1>
              <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">
                HOURS
              </p>
            </div>

            <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>
            
            <div className="flex flex-col">
              <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">
                {timeLeft.minutes} 
              </h1>
              <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">
                MINUTES
              </p>
            </div>

            <h1 className="font-['Poppins'] text-4xl font-medium text-[#3E3E3E]">:</h1>

            <div className="flex flex-col">
              <h1 className="font-['Poppins'] text-4xl font-medium text-[#A9812C]">
                {timeLeft.seconds}
              </h1>
              <p className="text-[#7A7A7A] font-medium uppercase text-xs tracking-wider">
                SECONDS
              </p>
            </div>
          </div>

          {/* schedule button - scroll animation */}
          <div ref={scheduleRef} className="w-full flex justify-center pt-8 px-8">
            <button
              onClick={addToGoogleCalendar}
              className="flex flex-row items-center gap-2 py-3 px-6 w-fit rounded-lg shadow-md bg-white text-[#4A4A4A] hover:bg-[#2E2A28] hover:text-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <CalendarDays className="size-4 hover:text-white transition-colors duration-300" /> 
              <p className="font-['Poppins'] text-[15px] font-medium">
                Schedule Reminder
              </p>
            </button>
          </div>

          {/* date - scroll animation */}
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

          {/* Ceremony - scroll animation */}
          <div ref={ceremonyRef} className="w-full pt-24 text-start px-8">
            <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
              Ceremony
            </h2>
            <p className="font-['Poppins'] text-[17px] leading-8 text-[#6B6B6B]">
              We look forward to welcoming you at <br className="hidden lg:block"/> Manikkal Mana
            </p>
            <p className="font-['Poppins'] text-[17px] pt-4 leading-8 text-[#6B6B6B]">
              11:50 AM - 12:50 PM
            </p>

            <div className="pt-4">
              <button
                onClick={viewLocation}
                className="flex flex-row items-center gap-2 py-3 px-6 sm:w-fit rounded-lg shadow-md bg-[#A9812C] text-white hover:bg-[#8F6E25] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MapPin className="size-4" /> 
                <p className="font-['Poppins'] text-[15px] font-medium">
                  View Location
                </p>
              </button>
            </div>
          </div>

          {/* Celebration - scroll animation */}
          <div ref={celebrationRef} className="w-full pt-16 text-start px-8">
            <h2 className="font-['Great_Vibes'] text-4xl text-[#2E2A28] leading-none">
              Celebration
            </h2>
            <p className="font-['Poppins'] text-[17px] leading-8 text-[#6B6B6B]">
              Join us for music, dance, delicious food, <br className="hidden lg:block"/> and unforgettable moments.
            </p>
            <p className="font-['Poppins'] text-[17px] pt-4 leading-8 text-[#6B6B6B]">
              Following the Ceremony
            </p>
          </div>

          {/* Dress Code - scroll animation */}
          <div ref={dressCodeRef} className="w-full pt-16 px-8 flex">
            <div className="flex-1 flex items-center justify-center">
              <img
                src={DressCodeImage}
                alt="dress code"
                className="lg:w-52 w-32"
              />
              <div className="ml-auto h-28 w-px bg-[#D8D2CA]" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-start font-['Cormorant_Garamond'] text-xl font-semibold tracking-[0.15em] uppercase">
                Dress Code
              </h2>
              <p className="text-start pt-4 font-['Poppins'] text-[16px] text-[#7A7A7A] pl-1">
                formal <br/> Wear your best look!
              </p>
            </div>
          </div>

          {/* Gallery - scroll animation */}
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
                  ref={el => galleryImagesRef.current[index] = el}
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