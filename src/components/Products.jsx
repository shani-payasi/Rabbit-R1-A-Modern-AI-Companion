import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const R1Image = '/assets/rabbit r1 transparent.png';
const WatchImage = '/assets/watch transparent.png';
const PocketImage = '/assets/rabbit r1 key transparent.png';

const Products = () => {
    const containerRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll-triggered card reveal animation
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom center',
                    scrub: 1,
                },
            });
            scrollTl.from([card1Ref.current, card2Ref.current, card3Ref.current], {
                opacity: 0,
                x: -50,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Helper function for hover animations on each card
            const setupHoverAnimation = (cardElement) => {
                if (!cardElement) return;

                // Select elements for animation
                const hoverTitle = cardElement.querySelector('.hover-title');
                const hoverImage = cardElement.querySelector('.hover-image');
                const buyButton = cardElement.querySelector('.buy-button');

                // Create a paused timeline for the hover effect
                const hoverTl = gsap.timeline({ paused: true });

                // Add animations for a smooth, staggered effect on hover
                hoverTl
                    .fromTo(hoverTitle,
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
                    )
                    .fromTo(hoverImage,
                        { opacity: 0, scale: 0.8, y: 30 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
                        "-=0.3" // Stagger animation start
                    )
                    .fromTo(buyButton,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
                        "-=0.3" // Stagger animation start
                    );

                const onEnter = () => hoverTl.play();
                const onLeave = () => hoverTl.reverse();

                cardElement.addEventListener('mouseenter', onEnter);
                cardElement.addEventListener('mouseleave', onLeave);

                // Cleanup function to remove event listeners
                return () => {
                    cardElement.removeEventListener('mouseenter', onEnter);
                    cardElement.removeEventListener('mouseleave', onLeave);
                };
            };

            // Apply hover animation to each card
            setupHoverAnimation(card1Ref.current);
            setupHoverAnimation(card2Ref.current);
            setupHoverAnimation(card3Ref.current);

        }, containerRef);

        // Cleanup GSAP context and animations
        return () => ctx.revert();
    }, []);

    return (
        // The main container is already responsive. The `p-4` class provides padding on mobile,
        // and the `flex-wrap` class on the inner div ensures cards wrap on smaller screens.
        <div ref={containerRef} className="theme-font flex flex-col justify-center items-center gap-10 min-h-screen bg-[#111111] p-4 sm:p-8">
            <h2 className="product-heading text-5xl font-medium text-white text-center mb-8">
                Discover Our Devices
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-10 pl-22">
                {/* Card 1 */}
                <article ref={card1Ref} className="product-card group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-white bg-[radial-gradient(circle_at_center,_#dc2f02,_#9a2101)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="w-full h-full p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
                            <div className="font-light text-3xl leading-tight mt-4 space-y-4">
                                <span className="bg-gray-900 w-full px-4 py-1 rounded-md inline-block">R1-Minimal</span>
                                <h3 className='text-xl block text-right'>Speak<br />Listen<br />Do</h3>
                            </div>
                        </div>
                        <img src={R1Image} alt="Rabbit R1" className="default-image w-56 h-auto absolute -bottom-2 -left-4 transition-opacity duration-300"/>
                    </div>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <h3 className="hover-title absolute top-3 text-lg font-light text-white opacity-0">R1-Minimal</h3>
                        <img src={R1Image} alt="Rabbit R1 Center" className="hover-image w-48 h-auto opacity-0"/>
                        <button className="buy-button mt-4 py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors opacity-0">Buy Now</button>
                    </div>
                </article>

                {/* Card 2 */}
                <article ref={card2Ref} className="product-card group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-gray-800 bg-gray-100 transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_#ff7f50,_#ff6347)] rounded-full blur-lg opacity-80"></div>
                    <div className="relative w-full h-full p-8 flex flex-col z-10">
                        <h3 className="font-medium text-gray-800/80 tracking-wider">Rabbit</h3>
                        <h2 className="font-light text-2xl uppercase mt-4"><span className="font-medium text-[#ff6b47]">R1 Watch</span> – AI on your wrist</h2>
                        <img src={WatchImage} alt="Rabbit R1 Watch" className="default-image w-full absolute bottom-0 -right-15  h-auto mt-4 transition-opacity duration-300"/>
                        <a href="#build" className="bg-gray-800 text-white py-1 px-5 rounded-md no-underline font-medium self-start mt-auto z-30">* BEST IN RABBITs</a>
                    </div>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-20">
                        <h3 className="hover-title absolute top-3 text-lg font-light text-white opacity-0">R1 Watch</h3>
                        <img src={WatchImage} alt="Rabbit R1 Watch Center" className="hover-image w-100 h-auto opacity-0"/>
                        <button className="buy-button mt-4 py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors opacity-0">Buy Now</button>
                    </div>
                </article>

                {/* Card 3 */}
                <article ref={card3Ref} className="product-card group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl text-white bg-gray-800 bg-[radial-gradient(rgba(200,50,50,0.1)_1px,transparent_1px)] [background-size:15px_15px] transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="w-full h-full p-8 flex flex-col">
                        <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
                        <div className="mt-6">
                            <span className="block text-7xl font-normal leading-none text-[#ff6b47] [text-shadow:2px_0_#212121,-2px_0_#212121,0_2px_#212121,0_-2px_#212121]">R1</span>
                            <span className="block font-light text-xl uppercase -mt-4">POCKET EDITION</span>
                        </div>
                        <p className="text-sm leading-relaxed opacity-80 mt-4">Pocket-sized AI power for everyday tasks.</p>
                        <img src={PocketImage} alt="Rabbit R1 Pocket Edition" className="default-image w-48 h-auto absolute top-4 right-4 transition-opacity duration-300"/>
                    </div>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <h3 className="hover-title absolute top-3 text-lg font-light text-white opacity-0">R1 POCKET EDITION</h3>
                        <img src={PocketImage} alt="Rabbit R1 Pocket Edition Center" className="hover-image w-52 h-auto opacity-0"/>
                        <button className="buy-button mt-4 py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors opacity-0">Buy Now</button>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Products;