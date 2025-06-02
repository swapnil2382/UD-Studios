import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Gamepad2, Zap, Target, Cpu } from 'lucide-react';

const technologies = {
  'Game Designer': ['2D/3D Level Design', '3D Modeling', 'Unity', '2D Art', 'Blender'],
  'Game Development': ['Unity', 'C#', 'Game Physics', 'Game AI'],
  'Graphical Design': ['Photoshop', 'Illustrator', 'Figma', 'Adobe XD', 'Canva', 'Substance Painter', 'Krita'],
  'Animation': ['3D Animation', '2D Animation', 'Maya', 'Blender'],
  'Frontend': ['HTML/CSS', 'AngularJS', 'ReactJS', 'VueJS'],
  'Full Stack': ['MEAN', 'MERN', 'JavaScript', 'Python']
};

const TechCard = ({ title, items, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-black/50 border border-purple-600/20 hover:border-purple-500/40 shadow-xl hover:shadow-purple-600/30 transition-all duration-300 rounded-2xl p-6 backdrop-blur"
    >
      <h3
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 mb-4"
        style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((tech, i) => (
          <li key={i} className="flex items-center text-gray-300">
            <span className="w-2 h-2 mr-2 rounded-full bg-purple-500" />
            <span style={{ fontFamily: '"Rajdhani", sans-serif' }}>{tech}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Career = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
    <section id="career" className="relative py-20 bg-black overflow-hidden">
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

      {/* Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-black/50 border border-purple-400/30 rounded-full backdrop-blur-sm">
            <span className="text-purple-300 font-semibold text-lg" style={{ fontFamily: '"Orbitron", sans-serif' }}>
              Career Opportunities
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mt-4"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
          >
            Join the Future of Gaming
          </h2>
          <p
            className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
          >
            Explore various paths where creativity meets technology. Whether you're a designer, developer, or animator—your skills are valued here.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(technologies).map(([title, items], index) => (
            <TechCard key={title} title={title} items={items} index={index} />
          ))}
        </div>

        {/* Apply Now Button */}
        <div className="text-center">
          <a
            href="https://forms.gle/HL8FTRcBtC4mMuNL9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-500 text-white font-semibold py-3 px-10 rounded-full shadow-lg transition-transform hover:scale-105"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
          >
            Apply Now
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Career;