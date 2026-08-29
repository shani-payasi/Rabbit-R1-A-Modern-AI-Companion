
import { FaPlayCircle } from "react-icons/fa";
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CircularText from './components/CircularText';
import DarkVeil from './components/DarkVeil';
import ImageTrail from './components/ImageTrail';
import './App.css';
import GlassyNavBar from './components/GlassyNavBar';
import AnimatedImage from './components/AnimatedImage';
import HeroText from "./components/HeroText";
import HeroVideo from "./components/HeroVideo";
import FeatureSection from "./components/FeatureSection";
import Products from "./components/Products";


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className='w-full min-h-screen overflow-x-hidden bg-black'>
      <GlassyNavBar />

      {/* Scrollable Page Content */}
      <div className='w-full relative'>

        {/* Hero Section */}
        <section className='relative w-full min-h-screen flex items-center justify-center'>
          <DarkVeil />

          {/* Image Trail */}
          <div
            style={{
              height: '300px',
              width: '70%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              overflow: 'visible',
              zIndex: 1000,
            }}
          >
            <ImageTrail
              items={[
                '/assets/gifs/compressed/gif1.gif',
                '/assets/gifs/compressed/gif2.gif',
                '/assets/gifs/compressed/gif3.gif',
                '/assets/gifs/compressed/gif4.gif',
                '/assets/gifs/compressed/gif5.gif',
                '/assets/gifs/compressed/gif6.gif',
              ]}
              renderImageWidth={100}
              rotationRange={10}
              variant={2}
            />
          </div>

          {/* Animated Hand */}
          <div className='absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-10'>
            <AnimatedImage src="/assets/hand.png" alt="Hand" />
          </div>

          {/* Main Title */}
          <h1
            className="rabbit-text absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 theme-font leading-none font-light !lg:scale-0"
            style={{
              scale: 15,
              fontSize: '1rem',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
            }}
          >
            RABBIT R1
          </h1>
        </section>

        {/* Play Circle + Circular Text */}
          <div className='cercular-text absolute w-full h-[200px]  top-[400px]'>
          <div className='absolute w-[200px] h-[200px] bottom-5 right-5'>
            <CircularText
              text="RABBIT R1 * RABBIT R1 * RABBIT R1 * "
              onHover="slowDown"
              spinDuration={7}
              className="absolute top-0 left-0 w-full h-full font-thin scale-50"
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <FaPlayCircle className="text-3xl text-white cursor-pointer" />
            </div>
          </div>

          <div className='absolute w-[100px] h-[100px] bottom-10 right-50'>
            <img src="/assets/tag.png" alt="" />
          </div>
        </div>

        {/* HeroText Component */}

        <HeroText />
        <HeroVideo />
        <FeatureSection />



        <Products />
        {/* 🧪 Dummy Scroll Section to Ensure Scrolling */}
        <div className="h-[150vh] bg-[#111] flex items-center justify-center">
          <h2 className="text-white text-3xl">SCROLL IS WORKING ✅</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
