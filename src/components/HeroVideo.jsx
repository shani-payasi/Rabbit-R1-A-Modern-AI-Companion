import  { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const textWrapRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
    
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150% ', 
          pin: true,    
          scrub: 2,
        //   markers: true,
        },
      });

    
      tl.fromTo(
        videoRef.current,
        { scale: 0.9, y:50  },
        { scale: 1, duration: 1 ,y:0} 
      );

      
    tl.to(
      textWrapRef.current,
      {
        xPercent: -85, 
        ease: 'power1.inOut',
        duration: 2, 
      },
      '<' 
    );
    }, containerRef); 

    
    return () => ctx.revert();
  }, []);

  return (
    <>
   
      <section ref={containerRef} className="relative  overflow-hidden">
       
        <video
          ref={videoRef}
          src="/assets/main video.mp4"
          autoPlay
          muted
          loop
          id='heroVideo'
          className="w-full h-screen object-cover"
        />

       
        <div className="absolute bottom-0   left-0 w-full h-[200px] flex items-center overflow-hidden">
          <div
            ref={textWrapRef}
            className="video-text flex gap-16 md:gap-40 px-4 md:px-10 theme-font font-light text-3xl sm:text-4xl md:text-8xl pl-8 md:pl-[1400px] whitespace-nowrap w-max"
          >
            <h1 className="text-white">VOICE</h1>
            <h1 className="text-white">VISION</h1>
            <h1 className="text-white">MOTION</h1>
            <h1 className="text-white">CONTROL</h1>
          </div>
        </div>
      </section>

     
    </>
  );
};

export default HeroVideo;