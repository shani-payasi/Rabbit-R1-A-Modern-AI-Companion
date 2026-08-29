import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const getResponsiveWidth = () => {
  if (window.innerWidth < 640) return '95vw'; 
  if (window.innerWidth < 1024) return '80vw';
  return '50vw';
};

const GlassyNavBar = () => {
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    gsap.set(navRef.current, {
      width: 60,
      height: 60,
      left: '50%',
      top: 10,
      position: 'fixed',
      transform: 'translateX(-50%)',
      overflow: 'hidden',
      borderRadius: '50%',
    });

    gsap.to(navRef.current, {
      width: getResponsiveWidth(),
      borderRadius: '9999px',
      duration: 1.5,
      ease: 'power3.inOut',
      delay: 0.1,
      onComplete: () => {
        gsap.set(navRef.current, { overflow: 'visible', height: 'auto' });
        setShowContent(true);
      }
    });

    const handleResize = () => {
      gsap.to(navRef.current, {
        width: getResponsiveWidth(),
        duration: 0.5,
        ease: 'power3.inOut',
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showContent && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [showContent]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-1/2 translate-y-[10px] w-1/2 sm:w-4/5 lg:w-1/2 max-w-screen-lg z-50 theme-font font-medium rounded-full"
      style={{
        transform: 'translateX(-50%)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
      >
        <div 
          className="flex flex-wrap items-center justify-between rounded-full px-2 sm:px-4 py-1 sm:py-2"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="logo flex items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
              style={{
                background: '#ec5a16'
              }}
            >
              <span className="text-[#fff] font-normal  text-base sm:text-lg">R</span>
            </div>
                 <div className="flex flex-wrap space-x-1">
            <button className="nav-item px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-sm sm:text-base">
              INFO
            </button>
            <button className="nav-item px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-sm sm:text-base">
              BUY
            </button>
          </div>
          </div>

          {/* Navigation Items */}
     

          {/* Right Side Items */}
          <div className="flex flex-wrap items-center space-x-1 sm:space-x-2 mt-1 sm:mt-0">
            <button 
              className="nav-item px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white transition-all duration-300 text-sm sm:text-base"
              style={{
                border: '1px dashed rgba(255, 255, 255, 0.5)'
              }}
            >
              DISCOVER 
            </button>
        
            <button className="nav-item w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all duration-300">
              #
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlassyNavBar;