import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Gamepad2, Zap, Target, Cpu } from 'lucide-react';
import VasanthImg from '../imgs/vasanth vk.jpg'; // Adjust path if needed

const Founder = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section className="relative py-20 bg-black overflow-hidden">
      <style>
        {`
          @keyframes glow-pulse {
            0% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
            50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
            100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
          }
          @keyframes spark-orbit {
            0% { transform: rotate(0deg) translateX(15px); opacity: 1; }
            100% { transform: rotate(360deg) translateX(15px); opacity: 0.5; }
          }
          .spark {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #9333ea;
            border-radius: 50%;
            animation: spark-orbit 4s linear infinite;
          }
          .spark:nth-child(2) { animation-delay: -1s; top: 10%; left: 90%; }
          .spark:nth-child(3) { animation-delay: -2s; top: 90%; left: 10%; }
          .spark:nth-child(4) { animation-delay: -3s; top: 50%; left: 50%; }
          .glow-frame {
            animation: glow-pulse 2s infinite;
          }
          .corner-border {
            position: relative;
            padding: 1.5rem; /* Reduced padding for mobile */
          }
          @media (min-width: 768px) {
            .corner-border {
              padding: 3rem; /* Original padding for laptop view */
            }
          }
          .corner-border::before,
          .corner-border::after {
            content: '';
            position: absolute;
            border-color: #9333ea;
            border-style: solid;
            border-width: 2px;
          }
          .corner-border::before {
            top: 0;
            right: 0;
            border-bottom: none;
            border-left: none;
            width: 50%;
            height: 50%;
          }
          .corner-border::after {
            bottom: 0;
            left: 0;
            border-top: none;
            border-right: none;
            width: 50%;
            height: 50%;
          }
        `}
      </style>

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
                <circle cx="60" cy="20" r="2" fill="rgba(59, 130, 246, 0.5)" />
                <circle cx="20" cy="60" r="2" fill="rgba(59, 130, 246, 0.5)" />
                <circle cx="60" cy="60" r="2" fill="rgba(139, 92, 246, 0.5)" />
                <path
                  d="M20 20L60 20M20 60L60 60M20 20L20 60M60 20L60 60"
                  stroke="rgba(60, 0, 246, 0.2)"
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

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-12 relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side: Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative max-w-md sm:max-w-lg md:max-w-xl corner-border">
              {/* Wave Particles Background */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="wave-particle" style={{ top: '10%' }} />
                <div className="wave-particle" />
                <div className="wave-particle" />
                <div className="wave-particle" />
                <div className="wave-particle" />
              </div>
              <motion.img
                src={VasanthImg}
                alt="Founder Vasanth"
                className="relative w-full h-[400px] object-contain rounded-lg"
                style={{ aspectRatio: '4/3' }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Right side: Text Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="rounded-2xl p-4 md:p-8 shadow-xl">
              <div className="relative">
                <svg className="absolute -top-8 -left-8 w-16 h-16 text-purple-600/30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}>
                  A great game is <span className="bg-purple-600 text-white px-2">never finished</span>.
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6" style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}>
Your game shouldn't be a one-and-done release—it should be a living, breathing world that evolves alongside your players. In today's fast-paced gaming landscape, launching a game is just the beginning. After contributing to the development of countless titles over the years, I've seen too many promising games lose momentum due to a lack of long-term vision and community engagement. That's exactly why I founded UD Studios. Our mission is to craft experiences that not only make a powerful first impression but also deepen over time, fueled by feedback, content updates, and meaningful connections with the players who matter most. We don't just ship games—we nurture them into enduring worlds.                </p>
                

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: '"Orbitron", sans-serif' }}>Vasanth K</p>
                    <p className="text-sm sm:text-base text-purple-300" style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}>Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Founder;