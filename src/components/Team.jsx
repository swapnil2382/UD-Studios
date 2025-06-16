import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Gamepad2, Zap, Target, Cpu } from 'lucide-react';
import chang from '../imgs/chang.jpg'; 
import joy from '../imgs/Joy.jpg';
import vk from '../imgs/Vasanth.jpg';

const TeamMemberCard = ({ name, image }) => {
  return (
    <motion.div
      className="w-full rounded-xl overflow-hidden border border-purple-400/40 shadow-lg shadow-purple-900/30 bg-gradient-to-br from-black via-gray-900 to-black"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-[440px] object-cover object-top rounded-t-xl border-b-2 border-purple-500/30"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300')} // Fallback image
          style={{ boxShadow: 'inset 0 0 10px rgba(147, 51, 234, 0.3)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>
      <div className="px-6 py-4 text-white">
        <h3
          className="text-xl sm:text-2xl font-bold mb-2 tracking-wider text-purple-400"
          style={{
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
          }}
        >
          {name}
        </h3>
        <p
          className="text-sm sm:text-base text-gray-300 leading-relaxed"
          style={{ fontFamily: '"Rajdhani", sans-serif' }}
        >
          {/* Placeholder for role/description */}
        </p>
      </div>
    </motion.div>
  );
};

const Team = () => {
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

  // Team members data
  const teamMembers = [
    { name: "Joy Prancyka", image: joy },
    { name: "Chang", image: chang },
    { name: "Madhu Malar", image: vk },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      <style>
        {`
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.4); }
            50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.6); }
            100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.4); }
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-transparent to-blue-600/40 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className="inline-block px-4 sm:px-6 py-2 bg-purple-900/40 backdrop-blur-sm text-purple-300 rounded-full mb-4 border border-purple-600/30"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
          >
            Meet Key Players
          </h2>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.06em' }}
          >
            Our Team
          </h3>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto mb-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
            >
              We Follow No Rules,
            </h3>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-300 mb-4"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
            >
              But Own Responsibilities
            </h3>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed"
              style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
            >
              These are the minds behind the mission. The masterminds. The strategists. Get to know the crew behind every glitch-free miracle and game-changing move. Our developers are the architects of innovation writing clean code, squashing bugs, and building seamless digital worlds. Our designers are visual storytellers turning big ideas into bold, beautiful interfaces that captivate at first glance. Our marketing mavericks are the voice and vision crafting campaigns that cut through the noise and spark real impact.
            </p>
          </motion.div>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                image={member.image}
              />
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
          >
            Work Hard, Dream Big
          </h3>
          <p
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto"
            style={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 400 }}
          >
            We work with the same ease and comfort of home
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Team;