import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedImage = ({ src, alt, className }) => {
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Initial animation from bottom with fade in
    gsap.fromTo(imageRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.5, ease: 'power3.out',delay:1 }
    );
    
    return () => {
      gsap.killTweensOf(imageRef.current);
    };
  }, []);
  
  return (
    <img 
      ref={imageRef} 
      src={src} 
      alt={alt || ''} 
      
      style={{ transformOrigin: 'center center' }}
      className='hand-image mask-fade-bottom'
    />
  );
};

export default AnimatedImage;