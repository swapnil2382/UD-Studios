import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Gamepad2, Zap, Cpu, ExternalLink } from "lucide-react";
import MINDS from "../imgs/MINDS.png";
import Redder from "../imgs/Redder.png";
import MRPA from "../imgs/mrpa.jpg";
import HeroImage from "../imgs/creationpage.webp";
import Footer from "./Footer";

const creationsData = {
    games: [
        {
            title: "MIND'S HOLLOW",
            tags: ["Horror", "Psychological", "2.5D"],
            description1: "Welcome to Mind's Hollow, a cursed realm where fantasy births fear, and reality twists in 2.5D. You're not alone… but you'll wish you were.",
            description2: "The timeline you walk was never yours. Here, time hunts you. Will you rip through the fabric of the Hollow, or be devoured by it?",
            image: MINDS,
            comingSoon: true,
        },
        {
            title: "REDDER",
            tags: ["Horror", "Multiplayer", "3D"],
            description1: "Redder is a 3D multiplayer psychological horror where three friends investigate their missing companion, only to find themselves trapped in a haunted house with a cursed tunnel.",
            description2: "Visions twist, trust fades, and reality fractures as the house feeds on their minds. Each step draws them deeper into a paranormal nightmare, where the only way out is through the madness.",
            image: Redder,
            comingSoon: true,
        },
    ],
    bots: [
        {
            title: "Mr.PA – Your AI Personal Assistant",
            description1: "Mr.PA is your all-in-one AI assistant that automates daily tasks, your company operations, marketing, and so on and so forth, straight from your commands",
            description2: "Specially crafted for startup founders, business owners and freelancers. Mr.PA listens, understands, and manages schedules, reminders, follow-ups, and more. All without hustle",
            description3: "Talk naturally. It remembers. It executes. Your day, handled while you focus on scaling.",
            image: MRPA,
        },
    ],
};

export default function CreationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState("games");
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

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100; // Adjust offset for header
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                // Ensure correct tab is active
                if (id.includes('mr.pa')) {
                    setActiveTab('bots');
                } else {
                    setActiveTab('games');
                }
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    // Split the hero heading text into words for animation
    const h1Text = "Our Creations".split(" ");

    // Tech icons for hero background
    const techIcons = [Code, Gamepad2, Zap, Cpu];

    // Handle Test Mr.PA button click
    const handleTestMrPA = () => {
        // Replace with actual Mr.PA website URL when available
        window.open("https://mr-pa.vercel.app/", "_blank");
    };

    return (
        <>
            {/* Add Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />

            <main className="px-4 sm:px-6 md:px-8 lg:px-16 pb-16 bg-black text-white relative overflow-hidden">
                {/* HERO SECTION */}
                <section
                    ref={containerRef}
                    className="min-h-screen flex items-center justify-center relative"
                >
                    {/* Mouse-following glow effect */}
                    <div
                        className="absolute pointer-events-none z-10"
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 100%)",
                            transform: "translate(-50%, -50%)",
                            filter: "blur(20px)",
                        }}
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0">
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

                    {/* Floating tech icons */}
                    {techIcons.map((Icon, index) => (
                        <motion.div
                            key={index}
                            className="absolute text-purple-400/30"
                            style={{
                                left: `${15 + index * 20}%`,
                                top: `${20 + (index % 2) * 60}%`
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                rotate: [0, 180, 360],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 8 + index * 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 1.5
                            }}
                        >
                            <Icon size={30 + index * 10} />
                        </motion.div>
                    ))}

                    <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-20">
                        {/* Left: Text and Button */}
                        <div className="w-full md:w-1/1 text-center md:text-left mb-8 md:mb-0">
                            <motion.h1
                                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider leading-tight mb-6 sm:mb-8"
                                style={{
                                    fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
                                    letterSpacing: '0.12em',
                                    fontWeight: '800',
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
                                    <span key={wordIndex} className="inline-block mr-2 sm:mr-3">
                                        {word.split("").map((letter, letterIndex) => (
                                            <motion.span
                                                key={`${wordIndex}-${letterIndex}`}
                                                className="inline-block"
                                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: wordIndex * 0.2 + letterIndex * 0.05,
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
                                className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-2xl mt-2 mb-4 sm:mb-4 max-w-md mx-auto md:mx-0"
                                style={{
                                    fontFamily: '"Avenir", "Inter", sans-serif',
                                    fontWeight: '500',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                                    letterSpacing: '0.02em',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Explore our portfolio of groundbreaking games and intelligent AI solutions, crafted to redefine interactive entertainment and streamline productivity.
                            </motion.p>
                            <motion.p
                                className="text-purple-500 text-sm sm:text-sm md:text-base mb-6 sm:mb-8 italic max-w-sm mx-auto md:mx-0"
                                style={{
                                    fontFamily: '"Avenir", sans-serif',
                                    fontWeight: '400',
                                    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                Innovate. Engage. Succeed.
                            </motion.p>
                            <motion.button
                                onClick={() => navigate('/servicepage')}
                                className="relative px-8 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-800 hover:from-purple-500 hover:to-blue-700 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
                                style={{
                                    fontFamily: '"Orbitron", monospace',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 6px 20px rgba(147, 51, 234, 0.5)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">Explore Our Services</span>
                            </motion.button>
                        </div>

                        {/* Right: Image (Desktop) / Top: Image (Mobile) */}
                        <motion.div
                            className="w-full md:w-1/2 flex justify-center md:justify-end"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <img
                                src={HeroImage}
                                alt="Creative Team Illustration"
                                className="w-3/3 sm:w-2/2 md:w-full max-w-xs sm:max-w-sm md:max-w-md object-contain scale-100 lg:scale-150 transition-transform duration-500"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* CREATIONS SECTION */}
                <section className="py-12 sm:py-16 md:py-20 w-full max-w-6xl mx-auto">
                    {/* Tabs */}
                    <div className="flex justify-center mb-8 sm:mb-12">
                        <div className="flex gap-4 bg-[#1a1a1a] rounded-full p-1 border border-purple-500/30">
                            <button
                                className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${activeTab === "games"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                style={{ fontFamily: '"Orbitron", monospace', letterSpacing: '0.05em' }}
                                onClick={() => setActiveTab("games")}
                            >
                                Games
                            </button>
                            <button
                                className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${activeTab === "bots"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                style={{ fontFamily: '"Orbitron", monospace', letterSpacing: '0.05em' }}
                                onClick={() => setActiveTab("bots")}
                            >
                                AI Agents
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {activeTab === "games" && (
                        <div>
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
                                style={{
                                    fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
                                    letterSpacing: '0.1em',
                                    background: 'linear-gradient(45deg, #ffffff 30%, rgba(255, 255, 255, 0.2) 50%, #ffffff 70%)',
                                    backgroundSize: '300% 300%',
                                    backgroundPosition: '100% 0%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shineText 3s linear infinite',
                                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Our Games
                            </motion.h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                                {creationsData.games.map((game, index) => (
                                    <motion.article
                                        key={index}
                                        id={game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                                        className="bg-[#1a1a1a] rounded-xl border border-white/10 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all duration-300 overflow-hidden"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={game.image}
                                                alt={game.title}
                                                className="w-full h-48 sm:h-64 md:h-72 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                            {game.comingSoon && (
                                                <motion.div
                                                    className="absolute top-4 right-4 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide shadow-md backdrop-blur-md"
                                                    style={{
                                                        fontFamily: '"Orbitron", sans-serif',
                                                        background: 'rgba(50, 50, 50, 0.9)',
                                                    }}
                                                    animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.03, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    Coming Soon
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className="p-6 sm:p-8">
                                            <h3
                                                className="text-xl sm:text-2xl font-semibold text-white mb-3"
                                                style={{ fontFamily: '"Orbitron", "Exo 2", sans-serif', letterSpacing: '0.05em' }}
                                            >
                                                {game.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {game.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-purple-600 bg-opacity-80 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white"
                                                        style={{ fontFamily: '"Rajdhani", sans-serif' }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <p
                                                className="text-gray-200 text-sm sm:text-base leading-relaxed mb-3"
                                                style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                                            >
                                                {game.description1}
                                            </p>
                                            <p
                                                className="text-gray-200 text-sm sm:text-base leading-relaxed"
                                                style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                                            >
                                                {game.description2}
                                            </p>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "bots" && (
                        <div>
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
                                style={{
                                    fontFamily: '"Orbitron", "Exo 2", "Rajdhani", monospace',
                                    letterSpacing: '0.1em',
                                    lineHeight: '1.3',
                                    background: 'linear-gradient(45deg, #ffffff 30%, rgba(255, 255, 255, 0.2) 50%, #ffffff 70%)',
                                    backgroundSize: '300% 300%',
                                    backgroundPosition: '100% 0%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shineText 3s linear infinite',
                                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Our AI Agents
                            </motion.h1>

                            {creationsData.bots.map((bot, index) => (
                                <motion.article
                                    key={index}
                                    id={bot.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                                    className="bg-[#1a1a1a] border border-purple-500 rounded-2xl p-6 sm:p-8 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all duration-300"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={bot.image}
                                                alt={bot.title}
                                                className="w-50 sm:w-45 md:w-56 h-auto object-contain rounded-lg"
                                            />
                                        </div>
                                        <div className="space-y-4 text-left">
                                            <h3
                                                className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-400"
                                                style={{ fontFamily: '"Orbitron", "Exo 2", sans-serif', letterSpacing: '0.05em' }}
                                            >
                                                {bot.title}
                                            </h3>
                                            <p
                                                className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                                                style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                                            >
                                                {bot.description1}
                                            </p>
                                            <p
                                                className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                                                style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                                            >
                                                {bot.description2}
                                            </p>
                                            <p
                                                className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                                                style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                                            >
                                                {bot.description3}
                                            </p>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}

                            {/* Test Mr.PA Button */}
                            <motion.div
                                className="flex justify-center mt-8 sm:mt-12"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <motion.button
                                    onClick={handleTestMrPA}
                                    className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600 transition-all duration-300 text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl border border-purple-400/30 hover:border-purple-300/50"
                                    style={{
                                        fontFamily: '"Orbitron", monospace',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 8px 25px rgba(147, 51, 234, 0.4)',
                                    }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -3, 
                                        boxShadow: "0 12px 35px rgba(147, 51, 234, 0.6)" 
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Test Mr.PA
                                        <ExternalLink size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                                    </span>
                                    
                                    {/* Animated background glow */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                </motion.button>
                            </motion.div>
                        </div>
                    )}
                </section>

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
                    
                    @keyframes textShine {
                        0% {
                            background-position: 100% 0%;
                        }
                        100% {
                            background-position: -100% 0%;
                        }
                    }
                `}</style>
            </main>
            <Footer/>
        </>
    );
}