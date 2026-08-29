import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const BuyNowModal = ({ open, product, onClose, onOrderSuccess }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState('form');
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const successTl = useRef(null);

  useEffect(() => {
    if (open) {
      setStep('form');
      setName('');
      
      gsap.set(formRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(successRef.current, { autoAlpha: 0 });

      gsap.to(modalRef.current, { display: 'flex' });
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(
        modalRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => gsap.set(modalRef.current, { display: 'none' }),
        }
      );
    }
  }, [open]);

  const handlePlaceOrder = () => {
    if (!name.trim() || successTl.current?.isActive()) return;

    successTl.current = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (onOrderSuccess) onOrderSuccess();
        }, 2000);
      }
    })
    .to(formRef.current, {
      autoAlpha: 0,
      y: -30,
      duration: 0.3,
      ease: 'power2.in',
    })
    .set(successRef.current, { autoAlpha: 1 })
    .from(successRef.current, {
        scale: 0.8,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)'
    })
    .from(successRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
    }, "-=0.5");
    
    setStep('success');
  };
  
  return (
    <div
      ref={modalRef}
      className=" theme-font fixed inset-0 z-[99999] items-center justify-center hidden"
      style={{ background: `rgba(255, 77, 36, 0.9)` }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center relative min-w-[340px] max-w-[95vw] sm:max-w-md max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl transition-colors" onClick={onClose}>×</button>
        
        <div ref={formRef} className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-medium text-[#ff4d24] mb-4">Buy Now</h2>
          {product && (
            <div className="mb-4 flex flex-col items-center text-center">
              <img src={product.image} alt={product.title} className="w-24 h-24 object-contain mb-2" />
              <h3 className="text-xl font-light text-black mb-1">{product.title}</h3>
              {product.price && <p className="text-lg font-medium text-[#ff4d24]">{product.price}</p>}
            </div>
          )}
          <input
            className="border border-gray-300 rounded-lg px-4 py-2.5 mb-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d24]/50 focus:border-[#ff4d24]"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button
            className="bg-[#ff4d24] text-white px-8 py-3 rounded-lg text-xl font-bold shadow-lg hover:bg-[#d13a3a] transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePlaceOrder}
            disabled={!name.trim()}
          >
            Place Order
          </button>
        </div>
        
        <div ref={successRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 invisible">
          <h2 className="text-6xl font-extrabold text-green-500 mb-4">Success!</h2>
          <p className="theme-font font-medium text-lg text-gray-700">
            Thank you, <span className="font-bold text-black">{name}</span>!
            <br/>
            Your order for <span className="font-bold text-black">{product?.title}</span> is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;