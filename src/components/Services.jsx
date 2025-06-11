import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gamepad2, PaintBucket, Layout, Shapes, Globe, Mountain, ChevronLeft, ChevronRight, Code, Zap, Target, Cpu } from 'lucide-react';
import Game from '../imgs/game dev.jpg'; // Assuming you have a game image
import UIUX from '../imgs/UX Design.jpg'; // Assuming you have a UI/UX image
import GraphicArt from '../imgs/Graphic Artistry.png'; // Assuming you have a Graphic Art image
import Logo from '../imgs/Logo Creation.avif'; // Assuming you have a Logo image
import WebDev from '../imgs/Web Development.jpg'; // Assuming you have a Web Development image
import LevelDesign from '../imgs/Level Design.jpg'; // Assuming you have a Level Design image

const ServiceCard = ({ title, subtitle, icon, image, isActive }) => {
  return (
    <motion.div
      className="w-full max-w-xs sm:max-w-sm md:max-w-xl h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-lg shadow-purple-500/20 mx-auto"
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
        filter: isActive ? 'blur(0px)' : 'blur(3px)',
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-purple-900/40" />
      <div className="relative h-full w-full p-4 sm:p-6 flex flex-col items-center justify-center z-10 text-center">
        <motion.div
          className="mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/40"
          animate={{ 
            scale: isActive ? [1, 1.08, 1] : 1,
            rotate: isActive ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>
        <h3
          className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 drop-shadow-lg"
          style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.06em' }}
        >
          {title}
        </h3>
        <p
          className="text-xs sm:text-sm md:text-base text-gray-100 drop-shadow-md"
          style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const services = [
    {
      title: 'Game Development',
      subtitle: 'Mobile & PC Production',
      icon: <Gamepad2 size={24} />,
      image: Game,
    },
    {
      title: 'UI/UX Design',
      subtitle: 'Experience & Interface Strategy',
      icon: <Layout size={24} />,
      image: UIUX,
    },
    {
      title: 'Graphic Artistry',
      subtitle: 'Visual Content Creation',
      icon: <PaintBucket size={24} />,
      image: GraphicArt,
    },
    {
      title: 'Logo Creation',
      subtitle: 'Brand Identity Emblems',
      icon: <Shapes size={24} />,
      image: Logo,
    },
    {
      title: 'Web Development',
      subtitle: 'Responsive Site Development',
      icon: <Globe size={24} />,
      image: WebDev,
    },
    {
      title: 'Level Design',
      subtitle: '2D & 3D Environment Art',
      icon: <Mountain size={24} />,
      image: LevelDesign,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused && inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, inView, services.length]);

  const handlePrev = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleDotClick = (index) => {
    setIsPaused(true);
    setActiveIndex(index);
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Mouse tracking for background effect
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xTransform = useTransform(mouseX, [0, window.innerWidth || 1920], [-50, 50]);
  const yTransform = useTransform(mouseY, [0, window.innerHeight || 1080], [-30, 30]);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const gamingIcons = [Code, Gamepad2, Zap, Target, Cpu];

  return (
    <section id="service" className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      {/* Background elements from Creations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at ${100 - mousePosition.x * 0.1}% ${100 - mousePosition.y * 0.1}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
              `,
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20 20h60v60H20z" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="2" fill="rgba(139, 92, 246, 0.5)" />
                <circle cx="80" cy="20" r="2" fill="rgba(59, 130, 246, 0.5)" />
                <circle cx="20" cy="80" r="2" fill="rgba(59, 130, 246, 0.5)" />
                <circle cx="80" cy="80" r="2" fill="rgba(139, 92, 246, 0.5)" />
                <path
                  d="M20 20L80 20M20 80L80 80M20 20L20 80M80 20L80 80"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
        {gamingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-purple-400/15"
            style={{ left: `${15 + index * 20}%`, top: `${20 + (index % 2) * 60}%` }}
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut", delay: index * 1.5 }}
          >
            <Icon size={40 + index * 10} />
          </motion.div>
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ x: xTransform, y: yTransform, scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          />
        ))}
        {[
          "function createGame()",
          "class Player extends Entity",
          "const gameEngine = new Engine()",
          "render() { return <Game /> }",
        ].map((code, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-mono text-purple-300/15 whitespace-nowrap"
            style={{ left: `${10 + index * 25}%`, top: `${30 + index * 15}%`, transform: `rotate(${-15 + index * 10}deg)` }}
            animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 2 }}
          >
            {code}
          </motion.div>
        ))}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon
                  points="30,2 52,15 52,37 30,50 8,37 8,15"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/40 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-blue-600/40 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2
            className="inline-block px-4 sm:px-6 py-2 bg-black/50 backdrop-blur-sm text-purple-300 rounded-full mb-4 border border-purple-500/30"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
          >
            Our Services
          </h2>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.06em' }}
          >
            What We Do
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl sm:max-w-3xl mx-auto"
            style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
          >
            From concept to completion, we deliver exceptional gaming experiences and creative solutions
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center w-full mb-8">
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 md:left-8 z-20 p-2 sm:p-3 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/40 hover:bg-purple-500/30 hover:border-purple-400/60 transition-all duration-300 group"
            aria-label="Previous service"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-purple-200 group-hover:text-white transition-colors duration-300" />
          </button>
          
          <div
            className="relative w-full max-w-10xl mx-auto flex items-center justify-center px-12 sm:px-16 md:px-20"
            onMouseEnter={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Mobile: Show only center card */}
            <div className="block sm:hidden w-full max-w-xs mx-auto">
              <ServiceCard
                title={services[activeIndex].title}
                subtitle={services[activeIndex].subtitle}
                icon={services[activeIndex].icon}
                image={services[activeIndex].image}
                isActive={true}
              />
            </div>

            {/* Desktop: Show three cards */}
            <div className="hidden sm:flex w-full">
              {/* Left Card */}
              <div className="flex-1 flex justify-end pr-2 md:pr-4">
                <ServiceCard
                  title={services[(activeIndex - 1 + services.length) % services.length].title}
                  subtitle={services[(activeIndex - 1 + services.length) % services.length].subtitle}
                  icon={services[(activeIndex - 1 + services.length) % services.length].icon}
                  image={services[(activeIndex - 1 + services.length) % services.length].image}
                  isActive={false}
                />
              </div>
              
              {/* Center Card */}
              <div className="flex-1 flex justify-center px-2 md:px-4">
                <ServiceCard
                  title={services[activeIndex].title}
                  subtitle={services[activeIndex].subtitle}
                  icon={services[activeIndex].icon}
                  image={services[activeIndex].image}
                  isActive={true}
                />
              </div>
              
              {/* Right Card */}
              <div className="flex-1 flex justify-start pl-2 md:pl-4">
                <ServiceCard
                  title={services[(activeIndex + 1) % services.length].title}
                  subtitle={services[(activeIndex + 1) % services.length].subtitle}
                  icon={services[(activeIndex + 1) % services.length].icon}
                  image={services[(activeIndex + 1) % services.length].image}
                  isActive={false}
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 md:right-8 z-20 p-2 sm:p-3 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/40 hover:bg-purple-500/30 hover:border-purple-400/60 transition-all duration-300 group"
            aria-label="Next service"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 text-purple-200 group-hover:text-white transition-colors duration-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-purple-500 shadow-lg shadow-purple-500/50 scale-125'
                  : 'bg-gray-600 hover:bg-purple-400 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;