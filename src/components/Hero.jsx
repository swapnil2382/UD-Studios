import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Udlogo from "../imgs/UDLOGO.png"; // Adjust the path as necessary





export default function HeroSection() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Split the h1 text into words, then into letters for hover animation
  const h1Text = "You've Entered the Arena".split(" ");
  // Split the paragraph text into words for animation
  const pText = "Delivering unparalleled gaming experiences through innovative technology that redefines interactive entertainment for the next generation of players.".split(" ");

  return (
    <>
      {/* Add Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
       id="home"
        ref={containerRef}
        className="min-h-screen bg-black text-white relative overflow-hidden flex items-center"
      >
        {/* Enhanced Mouse-following glow - Brighter Purple, No Transition */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: "400px",
            height: "400px",
            borderRadius: "10%",
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 80%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(20px)",
          }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {/* Left image */}
          <motion.div
            className="w-2/3 sm:w-1/2 md:w-[25%] mb-8 md:mb-0 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -80, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative perspective-1000 md:scale-[1.75] scale-[1.25]"
              style={{
                transformStyle: "preserve-3d",
                rotateY: 4, // Reduced rotation for better centering
                rotateX: -4,
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 6,
                rotateX: -6,
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }}
            >
              <img
                src={Udlogo}
                alt="UD Studios Logo"
                className="relative w-full h-auto object-contain filter brightness-110 transition-transform duration-300 ease-in-out"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))", // Purple glow to match theme
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right text - 75% width */}
          <motion.div
            className="w-full md:w-3/4 md:pl-8 lg:pl-12"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black tracking-wider uppercase select-none relative max-w-full sm:max-w-3/4 mx-auto py-2 sm:py-3"
              style={{
                fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
                letterSpacing: '0.12em',
                fontWeight: '800',
                textTransform: 'uppercase',
                background: 'linear-gradient(45deg, #ffffff 30%, rgba(255, 255, 255, 0.2) 50%, #ffffff 70%)',
                backgroundSize: '300% 300%',
                backgroundPosition: '100% 0%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shineText 3s linear infinite',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              }}
            >
              {h1Text.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-3 sm:mr-4">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + wordIndex * 0.2 + letterIndex * 0.05,
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      }}
                      whileHover={{
                        scale: 1.2,
                        color: "#000000",
                        WebkitTextStroke: "1px #ffffff",
                        transition: { duration: 0.1 },
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-full sm:max-w-3/4 mx-auto"
              style={{
                fontFamily: '"Rajdhani", "Exo 2", sans-serif',
                fontWeight: 500,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                letterSpacing: '0.02em',
              }}
            >
              {pText.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* More Elegant Buttons */}
           <motion.div
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center sm:justify-start"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1 }}
>
  <motion.button
    onClick={() => navigate('/creationpage')}
    className="group relative px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
    style={{
      fontFamily: '"Orbitron", monospace',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
    }}
    whileHover={{
      scale: 1.05,
      y: -2,
      boxShadow: "0 6px 20px rgba(128, 0, 128, 0.5)",
    }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="relative z-10">Explore Creations</span>
  </motion.button>

  <motion.button
    onClick={() => navigate('/servicepage')}
    className="group relative px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 rounded-full font-semibold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-300"
    style={{
      fontFamily: '"Orbitron", monospace',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
    }}
    whileHover={{
      scale: 1.05,
      y: -2,
      boxShadow: "0 6px 20px rgba(255, 255, 255, 0.5)",
    }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="relative z-10">Our Services</span>
  </motion.button>
</motion.div>

          </motion.div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes shineText {
            0% {
              background-position: 100% 0%;
            }
            100% {
              background-position: -100% 0%;
            }
          }

          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(100px, 100px);
            }
          }
        `}</style>
      </div>
    </>
  );
}