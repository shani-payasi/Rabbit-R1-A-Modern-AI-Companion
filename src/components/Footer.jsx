import  { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const images = [
  '/assets/grid/grid1.gif',
  '/assets/grid/grid2.jpg',
  '/assets/grid/grid3.jpg',
  '/assets/grid/grid4.gif',
  '/assets/grid/grid5.jpg',
  '/assets/grid/grid6.gif',
  '/assets/grid/grid7.jpg',
  '/assets/grid/grid8.jpg',
];

const Footer = () => {
  const R1Video = '/assets/videos/footer video.mp4';
  const orbitRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [radius, setRadius] = useState(160);
  const numCards = images.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationRef.current = gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, orbitRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const width = entry.contentRect.width;

       
        if (width >= 768) {


          setRadius(width*2);
        } else {
        

          setRadius(width / 2.5);
        }
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(animationRef.current.timeScale(1), { timeScale: 0.1, duration: 1 });
  };

  const handleMouseLeave = () => {
    gsap.to(animationRef.current.timeScale(0.1), { timeScale: 1, duration: 1 });
  };

  return (
    <main className="relative bg-gray-900 min-h-screen flex items-center justify-center overflow-hidden  font-sans p-4">
      <h1 className="theme-font absolute text-center text-[25vw] lg:text-[20vw] font-normal text-[#e47d4e] select-none z-0 leading-none opacity-50 mix-blend-difference" >
        RABBIT R1
      </h1>
      
      <div
        ref={containerRef}
        className="relative w-[85vw] h-[85vw] max-w-[700px] max-h-[700px] flex items-center justify-center z-10 translate-y-[50px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={orbitRef} className="absolute xl:-bottom-50  w-full h-full">
          {images.map((src, i) => {
            const angle = (i / numCards) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-28 sm:h-28 -m-10 sm:-m-14"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <img 
                  src={src} 
                  alt={`Grid item ${i + 1}`} 
                  className="w-full h-full rounded-2xl shadow-lg object-cover" 
                />
              </div>
            );
          })}
        </div>
      </div>
      <video 
        src={R1Video} 
        alt="" 
        autoPlay
        loop
        muted
        playsInline
        className='absolute w-20 sm:w-24 rounded-full bottom-4 right-4 cursor-pointer'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </main>
  );
};

export default Footer;