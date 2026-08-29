// src/App.jsx

import  { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { FaPlayCircle } from "react-icons/fa";
import CircularText from "./components/CircularText";
import DarkVeil from "./components/DarkVeil";
import ImageTrail from "./components/ImageTrail";
import GlassyNavBar from "./components/GlassyNavBar";
import AnimatedImage from "./components/AnimatedImage";
import HeroText from "./components/HeroText";
import HeroVideo from "./components/HeroVideo";
import FeatureSection from "./components/FeatureSection";
import Products from "./components/Products";
import Footer from "./components/Footer";
import DiscoverPage from "./components/DiscoverPage";
import Loader from "./components/Loader";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(15);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const heroVideoRef = useRef(null);
  const buyRef = useRef(null);
  const infoRef = useRef(null);
    const lenisRef = useRef(null); 
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
      lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setTimeout(() => setIsVisible(true), 500);
    setTimeout(() => setLoading(false), 1500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newScale = Math.max(15, 15 + scrollPosition * 0.05);
      setScale(newScale);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  const handlePlayClick = (e) => {
    e.preventDefault();
    if (heroVideoRef.current) {
      heroVideoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleInfoClick = (e) => {
    e.preventDefault();
  lenisRef.current?.scrollTo(infoRef.current, { lerp: 0.1 });
  };
  const handleBuyClick = (e) => {
    e.preventDefault();
    if (buyRef.current) {
      lenisRef.current?.scrollTo(buyRef.current, { lerp: 0.1 });
    }
  };


  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black">
      {loading && <Loader />}

      {!loading &&
        (discoverOpen ? (
          <DiscoverPage onClose={() => setDiscoverOpen(false)} />
        ) : (
          <>
            <GlassyNavBar
              onDiscover={() => setDiscoverOpen(true)}
              onInfoClick={handleInfoClick}
              onBuyClick={handleBuyClick}
            />
            <div className="w-full relative">
              <section className="relative w-full min-h-screen flex items-center justify-center">
                <DarkVeil />
                <div
                  style={{
                    height: "300px",
                    width: "70%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflow: "visible",
                    zIndex: 1000,
                  }}
                >
                  <ImageTrail
                    items={[
                      "/assets/gifs/compressed/gif1.gif",
                      "/assets/gifs/compressed/gif2.gif",
                      "/assets/gifs/compressed/gif3.gif",
                      "/assets/gifs/compressed/gif4.gif",
                      "/assets/gifs/compressed/gif5.gif",
                      "/assets/gifs/compressed/gif6.gif",
                    ]}
                    renderImageWidth={100}
                    rotationRange={10}
                    variant={2}
                  />
                </div>
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-10">
                  <AnimatedImage src="/assets/hand.png" alt="Hand" />
                </div>
                <h1
                  ref={titleRef}
                  className={`rabbit-text absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 theme-font leading-none font-light !lg:scale-0 transition-opacity duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    scale: scale,
                    fontSize: "1rem",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.04em",
                    transition: "scale 0.3s ease-out",
                  }}
                >
                  RABBIT R1
                </h1>
              </section>
              <div className="cercular-text absolute w-full h-[200px]  top-[400px]">
                <div className="absolute w-[200px] h-[200px] bottom-5 right-5">
                  <CircularText
                    text="RABBIT R1 * RABBIT R1 * RABBIT R1 * "
                    onHover="slowDown"
                    spinDuration={7}
                    className="absolute top-0 left-0 w-full h-full font-thin scale-50"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button
                      onClick={handlePlayClick}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        cursor: "pointer",
                      }}
                    >
                      <FaPlayCircle className="text-3xl text-white cursor-pointer" />
                    </button>
                  </div>
                </div>
                <div className="absolute w-[100px] h-[100px] bottom-10 right-50">
                  <img src="/assets/tag.png" alt="" />
                </div>
              </div>
              <HeroText />
              <div ref={heroVideoRef}>
                <HeroVideo />
              </div>
              <div ref={infoRef}>
                <FeatureSection />
              </div>
              <div ref={buyRef}>
                {" "}
                <Products />
              </div>
              <Footer />
            </div>
          </>
        ))}
    </div>
  );
}

export default App;
