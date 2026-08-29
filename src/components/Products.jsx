import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BuyNowModal from './BuyNowModal';

gsap.registerPlugin(ScrollTrigger);

const R1Image = '/assets/rabbit r1 transparent.png';
const WatchImage = '/assets/watch transparent.png';
const PocketImage = '/assets/rabbit r1 key transparent.png';

const PRODUCTS = [
    { id: 1, title: 'R1-Minimal', subtitle: 'Speak, Listen, Do', image: R1Image, price: '$199' },
    { id: 2, title: 'R1 Watch', subtitle: 'AI on your wrist', image: WatchImage, price: '$299' },
    { id: 3, title: 'R1 POCKET EDITION', subtitle: 'Pocket-sized AI power for everyday tasks.', image: PocketImage, price: '$149' },
];


const Products = () => {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const timelines = useRef({});
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const [activeCardId, setActiveCardId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const ctx = gsap.context(() => {
            gsap.from(cardRefs.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom center',
                    scrub: 1,
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                ease: 'power3.out'
            });

            PRODUCTS.forEach(product => {
                const cardElement = cardRefs.current[product.id];
                if (!cardElement) return;

                const overlay = cardElement.querySelector('.product-overlay');
                const hoverTitle = cardElement.querySelector('.hover-title');
                const hoverImage = cardElement.querySelector('.hover-image');
                const buyButton = cardElement.querySelector('.buy-button');

                const tl = gsap.timeline({ paused: true });
                tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
                  .fromTo(hoverTitle, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
                  .fromTo(hoverImage, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }, "-=0.3")
                  .fromTo(buyButton, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, "-=0.3");

                timelines.current[product.id] = tl;
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (productId) => {
        if (!isTouchDevice) {
            timelines.current[productId]?.play();
        }
    };

    const handleMouseLeave = (productId) => {
        if (!isTouchDevice) {
            timelines.current[productId]?.reverse();
        }
    };

    const handleCardClick = (productId) => {
        if (isTouchDevice) {
            if (activeCardId && activeCardId !== productId) {
                timelines.current[activeCardId]?.reverse();
            }

            if (activeCardId === productId) {
                timelines.current[productId]?.reverse();
                setActiveCardId(null);
            } else {
                timelines.current[productId]?.play();
                setActiveCardId(productId);
            }
        }
    };

    const handleBuyButtonClick = (e, product) => {
        e.stopPropagation(); 
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 500);
    };

    const handleOrderSuccess = () => {
        setTimeout(() => {
            setModalOpen(false);
            setSelectedProduct(null);
        }, 1200);
    };


return (
    <>
        <div ref={containerRef} id='buy' className="theme-font flex flex-col justify-center items-center gap-10 bg-[#111111] p-4 sm:p-8 py-24 md:min-h-screen">
            <h2 className="product-heading text-5xl font-medium text-white text-center mb-8">
                Discover Our Devices
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-10 ">
                {PRODUCTS.map((product) => (
                    <article
                        key={product.id}
                        ref={el => cardRefs.current[product.id] = el}
                        className="product-card group relative w-80 h-80 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-2xl cursor-pointer"
                        style={{
                            background: product.id === 1 ? 'radial-gradient(circle at center, #dc2f02, #9a2101)' : product.id === 2 ? '#f1f1f1' : '#212121',
                            color: product.id === 2 ? '#333' : 'white',
                        }}
                        onMouseEnter={() => handleMouseEnter(product.id)}
                        onMouseLeave={() => handleMouseLeave(product.id)}
                        onClick={() => handleCardClick(product.id)}
                    >
                        {product.id === 1 && (
                            <div className="w-full h-full p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
                                    <div className="font-light text-3xl leading-tight mt-4 space-y-4">
                                        <span className="bg-gray-900 w-full px-4 py-1 rounded-md inline-block">R1-Minimal</span>
                                        <h3 className='text-xl block text-right'>Speak<br />Listen<br />Do</h3>
                                    </div>
                                </div>
                                <img src={R1Image} alt="Rabbit R1" className="default-image w-56 h-auto absolute -bottom-2 -left-4" />
                            </div>
                        )}
                        {product.id === 2 && (
                            <>
                                <div className="absolute -bottom-1/4 -right-1/4 w-[90%] h-[90%] bg-[radial-gradient(circle_at_center,_#ff7f50,_#ff6347)] rounded-full blur-[70px] opacity-70"></div>
                                <div className="relative w-full h-full p-8 flex flex-col z-10">
                                    <h3 className="font-medium text-gray-800/80 tracking-wider">Rabbit</h3>
                                    <h2 className="font-light text-2xl uppercase mt-4"><span className="font-medium text-[#ff6b47]">R1 Watch</span> – AI on your wrist</h2>
                                    <img src={WatchImage} alt="Rabbit R1 Watch" className="default-image w-full absolute bottom-0 -right-18 h-auto mt-4" />
                                    <a href="#build" className="bg-gray-800 text-white py-1 px-5 rounded-md no-underline font-medium self-start mt-auto z-30">* BEST IN RABBITs</a>
                                </div>
                            </>
                        )}
                        {product.id === 3 && (
                            <div className="w-full h-full p-8 flex flex-col bg-[radial-gradient(rgba(200,50,50,0.1)_1px,transparent_1px)] [background-size:15px_15px]">
                                <h3 className="font-medium opacity-80 tracking-wider">Rabbit</h3>
                                <div className="mt-6">
                                    <span className="block text-7xl font-normal leading-none text-[#ff6b47] [text-shadow:2px_0_#212121,-2px_0_#212121,0_2px_#212121,0_-2px_#212121]">R1</span>
                                    <span className="block font-light text-xl uppercase -mt-4">POCKET EDITION</span>
                                </div>
                                <p className="text-sm leading-relaxed opacity-80 mt-4">Pocket-sized AI power for everyday tasks.</p>
                                <img src={PocketImage} alt="Rabbit R1 Pocket Edition" className="default-image w-48 h-auto absolute top-4 right-4" />
                            </div>
                        )}

                        <div className="product-overlay absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 pointer-events-none z-40">
                            <h3 className="hover-title absolute top-3 text-lg font-light text-white opacity-0">{product.title}</h3>
                            <img src={product.image} alt={`${product.title} Center`} className="hover-image h-auto opacity-0" style={{ width: product.id === 2 ? '16rem' : '12rem' }} />
                            <button
                                className="buy-button mt-4 py-2 px-6 text-sm font-normal text-white bg-[#e47d4e] rounded-lg cursor-pointer hover:bg-[#d13a3a] transition-colors opacity-0 pointer-events-auto"
                                onClick={(e) => handleBuyButtonClick(e, product)}
                            >
                                Buy Now
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
        <BuyNowModal open={modalOpen} product={selectedProduct} onClose={handleCloseModal} onOrderSuccess={handleOrderSuccess} />
    </>
);
};

export default Products;