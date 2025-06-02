import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Code, Gamepad2, Zap, Target, Cpu } from "lucide-react";
import { FaHourglassEnd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Image paths
const mindsImage = "src/imgs/MINDS.png";
const redderImage = "src/imgs/Redder.png";
const mrPAImage = "src/imgs/mrpa.jpg";

const games = [
  {
    title: "MIND'S HOLLOW",
    tags: ["Horror", "Psychological", "2.5D"],
    description1: "Welcome to Mind's Hollow, a cursed realm where fantasy births fear, and reality twists in 2.5D. You're not alone… but you'll wish you were.",
    description2: "The timeline you walk was never yours. Here, time hunts you. Will you rip through the fabric of the Hollow, or be devoured by it?",
    image: mindsImage,
  },
  {
    title: "REDDER",
    tags: ["Horror", "Multiplayer", "3D"],
    description1: "Redder is a 3D multiplayer psychological horror where three friends investigate their missing companion, only to find themselves trapped in a haunted house with a cursed tunnel.",
    description2: "Visions twist, trust fades, and reality fractures as the house feeds on their minds. Each step draws them deeper into a paranormal nightmare, where the only way out is through the madness.",
    image: redderImage,
  },
];

const bots = [
  {
    title: "Mr.PA – Your AI Personal Assistant",
    description1: "Mr.PA is your all-in-one AI assistant that automates daily tasks, your company operations, marketing, and so on and so forth, straight from your commands",
    description2: "Specially crafted for startup founders, business owners and freelancers. Mr.PA listens, understands, and manages schedules, reminders, follow-ups, and more. All without hustle",
    description3: "Talk naturally. It remembers. It executes. Your day, handled while you focus on scaling.",
    description4: "",
    image: mrPAImage,
  }
];

const GameCard = ({ title, tags, description1, description2, image, index }) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  const handleLearnMore = () => {
    navigate('/creationpage');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  return (
    <motion.section
      className="game-card relative w-full rounded-xl overflow-hidden mb-16 cursor-pointer"
      initial={{ opacity: 1, y: 0 }}
      whileHover="hover"
      aria-labelledby={`game-title-${index}`}
      style={{ minHeight: "400px" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover filter brightness-50 md:bg-center bg-left"
          style={{ backgroundImage: `url(${image})` }}
          variants={{
            hover: { scale: 1.2 },
            initial: { scale: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-32 sm:h-32 border-t-4 border-l-4 border-purple-600" />
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-32 sm:h-32 border-b-4 border-r-4 border-purple-600" />
      </div>

      {/* Laptop View (md and above) */}
      <div
        className={`relative z-10 flex-col justify-center h-full px-4 sm:px-8 md:px-16 py-12 text-white hidden md:flex ${isEven ? "items-start text-left" : "items-end text-right"}`}
      >
        <h2
          id={`game-title-${index}`}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-wide"
          style={{ fontFamily: '"Orbitron", sans-serif' }}
        >
          {title}
        </h2>

        <div
          className={`flex flex-wrap gap-3 mb-6 ${isEven ? "justify-start" : "justify-end"}`}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-purple-600 bg-opacity-80 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider"
              style={{ fontFamily: '"Rajdhani", sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className="max-w-md text-sm sm:text-base md:text-base leading-relaxed mb-3"
          style={{ fontFamily: '"Rajdhani", sans-serif' }}
        >
          {description1}
        </p>
        <p
          className="max-w-md text-sm sm:text-base md:text-base leading-relaxed mb-8"
          style={{ fontFamily: '"Rajdhani", sans-serif' }}
        >
          {description2}
        </p>

        <button
          onClick={handleLearnMore}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-sm sm:text-base font-semibold hover:brightness-110 transition-all shadow-lg shadow-purple-600/30"
          aria-label={`Learn more about ${title}`}
          style={{ fontFamily: '"Rajdhani", sans-serif' }}
        >
          Learn More
        </button>
      </div>

      {/* Mobile View (below md) */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-8 py-12 text-white text-center md:hidden">
        <div className="flex flex-col items-center">
          <h2
            id={`game-title-${index}`}
            className="text-3xl sm:text-4xl font-bold mb-3 tracking-wide"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            {title}
          </h2>

          <p
            className="max-w-md text-sm sm:text-base leading-relaxed mb-3"
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
          >
            {description1}
          </p>

          <button
            onClick={handleLearnMore}
            className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-sm sm:text-base font-semibold hover:brightness-110 transition-all shadow-lg shadow-purple-600/30"
            aria-label={`Learn more about ${title}`}
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
          >
            Learn More
          </button>
        </div>
      </div>

      {title === "MIND'S HOLLOW" && (
        <motion.div
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md backdrop-blur-md"
          style={{
            fontFamily: '"Orbitron", sans-serif',
            background: 'rgba(50, 50, 50, 0.9)',
          }}
          animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Coming Soon ...
        </motion.div>
      )}
    </motion.section>
  );
};

const BotCard = ({ title, description1, description2, description3, description4, image }) => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto mb-16 flex flex-col md:flex-row rounded-xl overflow-hidden border border-purple-400/40 shadow-lg shadow-purple-900/30 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse-custom"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
    >
      <div className="w-full md:w-[35%] h-48 md:h-auto">
 <motion.img
  src={image}
  alt={title}
  className="w-full h-full md:object-cover"
  style={{ filter: "brightness(1)", objectPosition: "center" }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
/>


      </div>
      <div className="w-full md:w-[65%] flex flex-col justify-center px-6 sm:px-8 py-8 text-white">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 tracking-wider text-purple-400"
          style={{
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
          }}
        >
          {title}
        </h2>
        {[description1, description2, description3, description4].map(
          (desc, index) =>
            desc && (
              <p
                key={index}
                className="text-sm sm:text-base text-gray-300 mb-3 leading-relaxed"
                style={{ fontFamily: '"Rajdhani", sans-serif' }}
              >
                {desc}
              </p>
            )
        )}
      </div>
    </motion.section>
  );
};

const Creations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xTransform = useTransform(mouseX, [0, window.innerWidth || 1920], [-50, 50]);
  const yTransform = useTransform(mouseY, [0, window.innerHeight || 1080], [-30, 30]);

  useEffect(() => {
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
    <section id="Creations" className="bg-black py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
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

      <div className="container mx-auto max-w-6xl relative z-10">
        <div>
          <header className="mb-12 text-center text-white">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-widest"
              style={{ fontFamily: '"Orbitron", sans-serif' }}
            >
              Our Games
            </h3>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
              style={{ fontFamily: '"Rajdhani", sans-serif' }}
            >
              Dive into our portfolio of innovative games designed to captivate and inspire
            </p>
          </header>
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              title={game.title}
              tags={game.tags}
              description1={game.description1}
              description2={game.description2}
              image={game.image}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16">
          <header className="mb-12 text-center text-white">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-widest"
              style={{ fontFamily: '"Orbitron", sans-serif' }}
            >
              Our AI Agent
            </h3>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
              style={{ fontFamily: '"Rajdhani", sans-serif' }}
            >
              Discover our intelligent AI solutions crafted to streamline your productivity
            </p>
          </header>
          {bots.map((bot) => (
            <BotCard
              key={bot.title}
              title={bot.title}
              description1={bot.description1}
              description2={bot.description2}
              description3={bot.description3}
              description4={bot.description4}
              image={bot.image}
            />
          ))}
        </div>

        <div className="text-center mt-16 px-4">
          <div
            className="bg-gray-900/80 rounded-lg p-4 sm:p-5 border border-purple-700/30 max-w-2xl w-full mx-auto"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <FaHourglassEnd className="text-lg sm:text-2xl text-purple-400 shrink-0" />
              <h4 className="text-sm sm:text-xl font-bold text-purple-400 tracking-wide">
                Many More Creations Are Coming...
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations;