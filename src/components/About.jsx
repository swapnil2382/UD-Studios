import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Code, Gamepad2, Zap, Target, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import gameShowcase from '../imgs/about.png';

const About = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xTransform = useTransform(mouseX, [0, window.innerWidth || 1920], [-50, 50]);
  const yTransform = useTransform(mouseY, [0, window.innerHeight || 1080], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const gamingIcons = [Code, Gamepad2, Zap, Target, Cpu];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-black text-white"
    >
      {/* Interactive Gaming Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(139, 92, 246, 0.4) 0%, transparent 20%),
                radial-gradient(circle at ${100 - mousePosition.x * 0.1}% ${100 - mousePosition.y * 0.1}%, rgba(139, 92, 246, 0.3) 0%, transparent 20%)
              `,
            }}
          />

          {/* Circuit Board Pattern (Purple Only) */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M20 20h60v60H20z" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
                  <circle cx="20" cy="20" r="2" fill="rgba(139, 92, 246, 0.4)" />
                  <circle cx="80" cy="20" r="2" fill="rgba(139, 92, 246, 0.4)" />
                  <circle cx="20" cy="80" r="2" fill="rgba(139, 92, 246, 0.4)" />
                  <circle cx="80" cy="80" r="2" fill="rgba(139, 92, 246, 0.4)" />
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
        </div>

        {/* Animated Code Snippets */}
        {[
          "function createGame()",
          "class Player extends Entity",
          "const gameEngine = new Engine()",
          "render() { return <Game /> }",
        ].map((code, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-mono text-purple-300/20 whitespace-nowrap"
            style={{
              left: `${10 + index * 25}%`,
              top: `${30 + index * 15}%`,
              transform: `rotate(${-15 + index * 10}deg)`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 2,
            }}
          >
            {code}
          </motion.div>
        ))}

        {/* Hexagonal Grid */}
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

        {/* Pulsing Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-blue-600/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Gaming Grid Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full max-w-full px-0 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/30">
            <Sparkles size={16} className="text-purple-400 mr-2" />
            <h2
              className="text-lg sm:text-xl font-semibold text-purple-300"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
            >
              About Us
            </h2>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-white"
          style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.06em' }}
        >
          Crafting Extraordinary Gaming Experiences
        </motion.h1>

        <div className="flex flex-col md:flex-row justify-between items-stretch">
          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 h-full"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20 group">
              <div className="absolute inset-0 z-0 group-hover:opacity-50 transition-opacity duration-500" />
              <img
                src={gameShowcase}
                alt="3D gaming projection"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 h-full flex flex-col justify-center px-4 sm:px-6 md:px-8"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.04em' }}
            >
              What if you could make{' '}
              <span className="inline-block bg-purple-600 text-white px-2 py-0.5 rounded-md">
                one decision
              </span>{' '}
              to simplify everything?
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
              style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
            >
              UD Studios is a dynamic and fast-growing gaming startup driven by a passion for crafting immersive, high-quality experiences across mobile and PC platforms. Founded by a talented team of Game and Web developers, our mission is to create innovative gameplay that seamlessly blends storytelling, strategy, and fun.
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
              style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
            >
              With a player-first mindset and a deep love for gaming, we're on a mission to shape the next generation of interactive entertainment—right here from Chennai.
            </p>

            <motion.button
              onClick={() => navigate('/servicepage')}
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md font-semibold text-base sm:text-lg border border-purple-400/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(153, 51, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Discover our services"
            >
              Discover Our Services
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;