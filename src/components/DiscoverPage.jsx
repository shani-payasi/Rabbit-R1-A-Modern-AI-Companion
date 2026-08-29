import  { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverPage({ onClose }) {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(componentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
      
      const scroller = componentRef.current;
      
      gsap.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power3.out', delay: 0.6 });

      const sections = gsap.utils.toArray('.content-section');
      sections.forEach((section) => {
        const heading = section.querySelector('.section-heading');
        const text = section.querySelector('.section-text');
        
        gsap.from(heading, { y: 70, opacity: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: section, scroller: scroller, start: 'top 85%', toggleActions: 'play none none none' } });
        gsap.from(text, { y: 50, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.2, scrollTrigger: { trigger: section, scroller: scroller, start: 'top 80%', toggleActions: 'play none none none' } });
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="w-full overflow-x-hidden min-h-screen bg-[#1d1d20] text-white theme-font overflow-y-auto">
      <button onClick={onClose} className="fixed top-4 right-4 lg:top-6 lg:right-8 z-30 text-4xl text-white bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#ff4d24] transition-all">
        ×
      </button>
      
      <div className="lg:w-1/2">
        <div className="relative z-10 mx-auto max-w-xl p-8 lg:py-40">
          <section className="min-h-screen lg:min-h-0 lg:h-auto flex flex-col justify-center text-left mb-32 lg:mb-64">
            <h1 className="hero-title text-5xl md:text-7xl font-medium">
              Interactive 3D Rabbit R1 Model
            </h1>
            <p className="hero-subtitle mt-6 text-lg md:text-xl font-normal text-gray-300">
              Scroll down to explore its features
            </p>
          </section>
          <section className="content-section flex flex-col justify-center text-left min-h-[50vh] lg:min-h-0 mb-32 lg:mb-64">
            <h2 className="section-heading text-4xl md:text-6xl font-medium">Intuitive by Design</h2>
            <p className="section-text mt-5 text-lg md:text-xl font-normal text-gray-300">The device is crafted for a seamless user experience, making powerful AI accessible to everyone.</p>
          </section>
          <section className="content-section flex flex-col justify-center text-left min-h-[50vh] lg:min-h-0 mb-32 lg:mb-64">
            <h2 className="section-heading text-4xl md:text-6xl font-medium">Powered by LAM</h2>
            <p className="section-text mt-5 text-lg md:text-xl font-normal text-gray-300">Underneath its simple interface is a sophisticated Large Action Model ready to assist with your tasks.</p>
          </section>
        </div>
      </div>

      <div className="relative w-full h-[60vh] lg:fixed lg:top-0 lg:right-0 lg:w-1/2 lg:h-screen">
        <div className="absolute w-full h-full -top-10 -right-0 sm:-right-1/4 lg:-right-[25%]">
          <Spline scene="https://prod.spline.design/VvhFTCX5M9PKkaRF/scene.splinecode" />
        </div>
      </div>

    </div>
  );
}