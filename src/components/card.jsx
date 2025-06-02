import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollableCards = ({ cards }) => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    
    el.addEventListener('wheel', handleWheel);
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Services</span>
        </h2>
      </div>
      
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-12 gap-6 px-6 md:px-12 hide-scrollbar snap-x snap-mandatory"
      >
        {cards.map((card, index) => (
          <ServiceCard key={index} card={card} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ card, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[280px] sm:min-w-[340px] flex-shrink-0 snap-center"
    >
      <motion.div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 h-full group"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden h-[200px]">
          <img 
            src={card.image} 
            alt={card.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{card.title}</h3>
          <p className="text-gray-400">{card.subtitle}</p>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600/20 text-purple-400 border border-purple-500/30 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.5L13 8L8 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollableCards;