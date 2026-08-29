import React, { useEffect, useRef } from 'react';
import { Plus, Zap, Aperture } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SparkIcon = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L13.18 6.82L14.76 7.24L17.18 5.82L16.76 8.24L19.18 9.66L16.76 11.08L17.18 13.5L14.76 12.08L13.18 12.5L12 17.32L10.82 12.5L9.24 12.08L6.82 13.5L7.24 11.08L4.82 9.66L7.24 8.24L6.82 5.82L9.24 7.24L10.82 6.82L12 2Z"
      fill="currentColor"
    />
  </svg>
);


const FeatureSection = () => {
  const sectionRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: '80% 30%',
        scrub: true, // Enables scroll syncing
        // markers: true // Optional: for debugging
      }
    });

    tl.from('.main-heading-anim', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    tl.from('.feature-card', {
      opacity: 0,
      y: 100,
      x:-50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.7');

  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section ref={sectionRef} id='info' className="bg-[#111111] text-white font-sans py-16 px-4 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto theme-font font-light">
        {/* Added a class for GSAP to target the heading */}
        <div className="max-w-3xl main-heading-anim">
          <h1 className="text-4xl md:text-5xl leading-tight">
            Our team
            <span className="inline-flex items-center justify-center bg-[#FF4D24] w-8 h-8 md:w-10 md:h-10 rounded-md mx-2">
              <Plus size={24} className="animate-spin" style={{ animationDuration: '4s' }} />
            </span>
            has built
            <span className="inline-flex items-center text-[#FF4D24] mx-2">
              <Zap
                size={32}
                className="transform -rotate-12 animate-gradient-color"
              />
            </span>

            <style jsx>{`
              @keyframes gradientColor {
                0% { color: white; }
                50% { color: #FF4D24; }
                100% { color: white; }
              }
              
              .animate-gradient-color {
                animation: gradientColor 3s ease-in-out infinite;
              }
            `}</style>
            a next-gen AI companion called
            <span className="inline-flex items-center bg-gray-700 px-3 py-1 rounded-md ml-2">
              <SparkIcon className="text-[#FF4D24] mr-2" />
              <span className="flex">
                {'Rabbit-R1'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="animate-text-color"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </span>

            <style jsx>{`
              @keyframes textColor {
                0%, 100% { color: white; }
                50% { color: #FF4D24; }
              }
              
              .animate-text-color {
                animation: textColor 1s infinite;
              }
            `}</style>
            for your everyday needs<span className='text-orange-500'>.</span>
          </h1>
          <p className="text-2xl text-gray-400 mt-4">Smarter. Simpler. Always with you.</p>
        </div>

        {/* Added "feature-card" class to all cards for GSAP targeting */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#E0E8F0] text-black rounded-2xl p-6 flex flex-col justify-between h-[400px] feature-card">
            <div>
              <SparkIcon className="text-[#FF4D24] w-10 h-10 mb-4" />
              <div className="flex space-x-2">
                <span className="blink-effect text-sm font-semibold px-4 py-2 rounded-lg">AI</span>
                <span className="blink-effect text-sm font-semibold px-4 py-2 rounded-lg">Voice</span>
              </div>
              <style jsx>{`
                @keyframes blinkEffect {
                  0%, 100% { 
                    background-color: #FF4D24;
                    color: white;
                  }
                  50% {
                    background-color: #808080;
                    color: white;
                  }
                }
                
                .blink-effect {
                  animation: blinkEffect 1s steps(2, start) infinite;
                }
              `}</style>
            </div>
            <div>
              <h3 className="text-2xl font-normal">Natural voice control</h3>
              <p className="text-gray-600 mt-1">Command apps, schedule tasks, or message friends — all hands-free.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center mt-10 feature-card">
            <div className="w-full bg-[#E0E8F0] rounded-2xl flex flex-col h-[400px]">
              <div className="bg-[#FF4D24] text-white flex justify-between items-center px-6 py-3 rounded-t-2xl">
                <span className="font-bold">QUICK ACCESS</span>
<Aperture className="animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="flex-grow flex flex-col justify-center items-center p-6 relative">
                <div className="relative">
                  <SparkIcon className="text-[#FF4D24] w-12 h-12" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-400 rounded-t-full border-b-4 border-gray-500"></div>
                </div>
                <div className="mt-8 border-2 border-red-500 text-red-500 font-bold px-6 py-2 rounded-full animate-pulse-shadow relative hover:scale-105 transition-transform">
                  AI in action
                  <style jsx>{`
                    @keyframes pulseShadow {
                      0% {
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
                      }
                      50% {
                        box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
                      }
                      100% {
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                      }
                    }
                    .animate-pulse-shadow {
                      animation: pulseShadow 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                      transition: all 0.3s ease;
                    }
                    .animate-pulse-shadow:hover {
                      box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
                      animation-duration: 1s;
                    }
                  `}</style>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full">
              <h3 className="text-2xl font-medium">Real-time assistance</h3>
              <p className="text-gray-400 mt-1 w-full mb-5 ">Get instant help navigating apps, booking rides, or searching — all in one step.</p>
            </div>
          </div>

          <div className="bg-[#E0E8F0] text-black rounded-2xl -mt-10 p-6 flex flex-col justify-between h-[400px] relative overflow-hidden feature-card">
            <div className="absolute top-20 -right-5 transform -rotate-12 bg-[#FF4D24] px-4 py-1 rounded-full text-white">Smart</div>
            <div className="absolute top-32 right-10 transform rotate-12 bg-gray-300 px-4 py-1 rounded-full text-gray-600">Daily</div>
            <div className="absolute top-48 -right-2 transform -rotate-6 bg-gray-300 px-4 py-1 rounded-full text-gray-600">Auto</div>
            <div className="flex-grow flex justify-center items-center">
              <div className="w-48 h-48 border-2 border-gray-400 rounded-full flex justify-center items-center relative animate-spin" style={{ animationDuration: '10s' }}>
                <SparkIcon className="text-[#FF4D24] w-12 h-12" />
                <p className="absolute text-gray-400 font-medium" style={{top: '-10px'}}>Smart</p>
                <p className="absolute text-gray-400 font-medium" style={{bottom: '-10px'}}>Agent</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-medium">Personalized automation</h3>
              <p className="text-gray-600 mt-1">Learns your habits to handle routine tasks before you even ask.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;