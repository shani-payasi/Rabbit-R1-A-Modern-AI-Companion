

import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const HeroText = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <div ref={heroRef} className='hero-text   w-full  flex   items-center text-white justify-between  p-10' >
     
    <div className="section section-1 p-6 md:p-12 theme-font w-[50%]">
  <h2 className="text-3xl md:text-4xl font-midium mb-4">
    Capture Life. <span className="text-[#ec5a16]">Smart.</span>
  </h2>
  <p className="text-sm md:text-base  mb-2">01/</p>
  <p className="text-base md:text-lg leading-relaxed text-[#9e9e9e] max-w-xl">
    <strong>Pocket-sized AI Companion</strong> designed for seamless communication and productivity. 
    With an onboard mic and speaker, Rabbit R1 lets you interact using voice commands, play music, 
    take notes, and control smart devices—all hands-free. Easily pair with your phone or accessories 
    via Bluetooth or USB-C.
  </p>


     </div>
   <div className="section section-2 p-6 md:p-12 theme-font w-[50%] mt-3">
  <p className="text-sm md:text-base mb-2">02/</p>
  <ul className="list-disc list-inside text-base md:text-lg leading-relaxed text-[#9e9e9e] ">
    <li>Real-time AI voice commands</li>
    <li>Clear mic & speaker built-in</li>
    <li>Vibrant display for feedback</li>
    <li>All-day battery backup</li>
    <li>Magnetic, compact design</li>
    <li>Cloud sync for notes & media</li>
  </ul>
</div>

    </div>
  )
}

export default HeroText
