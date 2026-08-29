import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// You can define image paths directly or import them
const R1Image = '/assets/rabbit r1 transparent.png';
const WatchImage = '/assets/watch transparent.png';
const PocketImage = '/assets/rabbit r1 key transparent.png';

const Products = () => {
  // Create a ref for each card and each image
  const card1Ref = useRef(null);
  const image1Ref = useRef(null);
  const card2Ref = useRef(null);
  const image2Ref = useRef(null);
  const card3Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    // Helper function to create the hover animation
    const setupHoverAnimation = (cardElement, imageElement) => {
      if (!cardElement || !imageElement) return;

      // The animation timeline for the image
      const tl = gsap.timeline({ paused: true });
      tl.to(imageElement, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)', // "Pop out" effect
      });

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      cardElement.addEventListener('mouseenter', onEnter);
      cardElement.addEventListener('mouseleave', onLeave);

      // Cleanup listeners on component unmount
      return () => {
        cardElement.removeEventListener('mouseenter', onEnter);
        cardElement.removeEventListener('mouseleave', onLeave);
      };
    };

    // Apply the animation to each card
    setupHoverAnimation(card1Ref.current, image1Ref.current);
    setupHoverAnimation(card2Ref.current, image2Ref.current);
    setupHoverAnimation(card3Ref.current, image3Ref.current);
  }, []);

  return (
    <div className="theme-font flex flex-wrap justify-center items-center gap-10 min-h-screen bg-gray-900 p-4 sm:p-8">

      {/* Card 1 */}
      <article ref={card1Ref} className="group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-white bg-[radial-gradient(circle_at_center,_#dc2f02,_#9a2101)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
        <div className="w-full h-full p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
            <div className="font-light text-3xl leading-tight mt-4 space-y-4">
              <span className="bg-gray-900 px-4 py-1 rounded-md inline-block">R1-Minimal</span>
              <h3 className='text-xl block'>Speak, Listen, Do</h3>
            </div>
          </div>
          <a href="#invest" className="text-sm text-white/70 no-underline">www.rabbit.tech/minimal</a>
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-between items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p className="text-xs font-light text-white/80 tracking-widest">MINIMAL</p>
          <img
            ref={image1Ref}
            src={R1Image}
            alt="Rabbit R1"
            className="w-56 h-auto opacity-0 scale-75 transform -translate-y-4"
          />
          <button className="py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors">Buy Now</button>
        </div>
      </article>

      {/* Card 2 */}
      <article ref={card2Ref} className="group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-gray-800 bg-gray-100 transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_#ff7f50,_#ff6347)] rounded-full blur-lg opacity-80"></div>
        <div className="relative w-full h-full p-8 flex flex-col">
          <h3 className="font-medium text-gray-800/80 tracking-wider">Rabbit</h3>
          <h2 className="font-light text-2xl uppercase mt-4"><span className="font-medium text-[#ff6b47]">R1 Watch</span> – AI on your wrist</h2>
          <p className="text-sm leading-relaxed text-gray-800/80 mt-4">Seamlessly blends intelligent assistant with elegant design.</p>
          <a href="#build" className="bg-gray-800 text-white py-1 px-5 rounded-md no-underline font-medium self-start mt-auto z-10">* BEST IN RABBITs</a>
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-between items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p className="text-xs font-light text-white/80 tracking-widest">WATCH</p>
          <img
            ref={image2Ref}
            src={WatchImage}
            alt="Rabbit R1 Watch"
            className="w-56 h-auto opacity-0 scale-75 transform -translate-y-4"
          />
          <button className="py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors">Buy Now</button>
        </div>
      </article>

      {/* Card 3 */}
      <article ref={card3Ref} className="group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-white bg-gray-800 bg-[radial-gradient(rgba(200,50,50,0.1)_1px,transparent_1px)] [background-size:15px_15px] transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
        <div className="w-full h-full p-8 flex flex-col">
          <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
          <div className="mt-6">
            <span className="block text-7xl font-normal leading-none text-[#ff6b47] [text-shadow:2px_0_#212121,-2px_0_#212121,0_2px_#212121,0_-2px_#212121]">R1</span>
            <span className="block font-light text-xl uppercase -mt-4">POCKET EDITION</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80 mt-4">Pocket-sized AI power for everyday tasks, questions, and beyond.</p>
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-between items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p className="text-xs font-light text-white/80 tracking-widest">POCKET</p>
          <img
            ref={image3Ref}
            src={PocketImage}
            alt="Rabbit R1 Pocket Edition"
            className="w-56 h-auto opacity-0 scale-75 transform -translate-y-4"
          />
          <button className="py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors">Buy Now</button>
        </div>
      </article>

    </div>
  );
};

export default Products;