import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { FaGamepad, FaPencilRuler, FaPaintBrush, FaLightbulb , FaRobot} from "react-icons/fa";
import { TbCube3dSphere } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const services = [
  {
    title: "Game Dev",
    subtitle: "Mobile & PC Production",
    icon: <FaGamepad size={40} />,
    description: "Step into the future of gaming with our cutting-edge development services. From mobile to PC, we craft immersive worlds powered by advanced mechanics and gripping narratives. Our team leverages Unreal Engine, Unity, and custom tech to deliver high-performance, cross-platform experiences. Whether it's a horror epic or a multiplayer adventure, we ensure every pixel pulses with innovation, captivating players and redefining interactive entertainment."
  },
  {
    title: "UI/UX",
    subtitle: "Experience & Interface Strategy",
    icon: <FaPencilRuler size={40} />,
    description: "Transform user interactions with our UI/UX expertise. We design intuitive interfaces and seamless experiences that captivate and convert. Using data-driven strategies and futuristic aesthetics, we optimize for engagement across apps and websites. Our process blends psychology, design, and technology to create interfaces that feel like an extension of the user's mind, ensuring every click is purposeful and delightful."
  },
  {
    title: "Graphic Artistry",
    subtitle: "Visual Content Creation",
    icon: <FaPaintBrush size={40} />,
    description: "Elevate your brand with stunning visual content. Our graphic artistry services deliver bold illustrations, cinematic assets, and dynamic animations. From concept art to marketing visuals, we use tools like Photoshop and Blender to craft designs that resonate. Every creation is a masterpiece, tailored to tell your story in vibrant, unforgettable detail, leaving a lasting impression on your audience."
  },
  {
    title: "Logo Creation",
    subtitle: "Brand Identity Emblems",
    icon: <FaLightbulb size={40} />,
    description: "Forge a timeless brand identity with our logo creation services. We design emblems that capture your vision and resonate with audiences. Combining minimalist elegance with futuristic flair, our logos are versatile across digital and print media. Each design is a beacon, guiding your brand through the competitive cosmos of modern markets, ensuring recognition and impact."
  },
  {
    title: "Web Dev",
    subtitle: "Responsive Site Development",
    icon: <CgWebsite size={40} />,
    description: "Launch responsive, high-performance websites that redefine digital presence. Our web development services blend React, Next.js, and custom solutions to create fast, scalable sites. From e-commerce to portfolios, we prioritize SEO, accessibility, and stunning visuals. Your website isn't just a page—it's a gateway to global impact, designed to engage and convert in a connected world."
  },
  {
    title: "Level Design",
    subtitle: "2D & 3D Environment Art",
    icon: <TbCube3dSphere size={40} />,
    description: "Shape immersive game worlds with our 2D and 3D level design expertise. We craft environments that blend art and functionality, from sprawling landscapes to intricate dungeons. Using tools like Maya and custom editors, we ensure every space tells a story. Our designs elevate gameplay, drawing players into unforgettable adventures where every corner sparks curiosity and wonder."
  },
  {
    title: 'AI Automation',
    subtitle: 'Effortless Digital Transformation',
    icon: <FaRobot size={24} />,
    description: "From managing emails to scheduling like a pro, it’s got you covered. Need content? Mr. PA got you. It works 24/7 to simplify your day and supercharge productivity.Smart, reliable, and always ready – Mr. PA does it all. Think faster schedules, smarter emails, and killer content in minutes.No burnout, no chaos – just smooth, intelligent automation.Your digital life, fully managed. Mr. PA never takes a day off."
  }
];

import HeroImage from "../imgs/serviecepage.png";

export default function ServicePage() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeDescription, setActiveDescription] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToDescription = (index) => {
    const element = document.getElementById(`service-${index}`);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const h1Text = "Ignite Growth".split(" ");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="bg-black text-white min-h-screen px-4 sm:px-6 md:px-8 lg:px-20 pb-16 relative overflow-hidden">
        {/* HERO SECTION */}
        <section
          ref={containerRef}
          className="min-h-screen flex items-center justify-center relative"
        >
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

          <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="w-full md:w-3/4 text-center md:text-left mb-8 md:mb-0">
              <motion.h1
                className="text-3xl xs:text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-wider leading-snug mb-6 sm:mb-8 max-w-[300px] md:max-w-full mx-auto md:mx-0"
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
                className="text-gray-200 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-10 max-w-md md:max-w-2xl mx-auto md:mx-0"
                style={{
                  fontFamily: '"Rajdhani", "Exo 2", sans-serif',
                  fontWeight: 500,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '0.02em',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Partner with us to craft immersive games and intelligent AI solutions that push boundaries, captivate audiences, and streamline innovation.
              </motion.p>
              <motion.button
                onClick={() => navigate('/creationpage')}
                className="group relative px-6 sm:px-8 md:px-12 lg:px-14 py-2 sm:py-3 md:py-4 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-blue-700 transition-all duration-300 text-xs sm:text-sm md:text-lg lg:text-xl whitespace-nowrap"
                style={{
                  fontFamily: '"Orbitron", monospace',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 6px 20px rgba(147, 51, 234, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-0">Explore Our Creations</span>
              </motion.button>
            </div>

            <motion.div
              className="w-full md:w-1/4 flex justify-center md={true} justify-content={true}"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <img
                src={HeroImage}
                alt="Professional Service Illustration"
                className="w-3/4 sm:w-2/3 md:w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md object-contain transform md:scale-110 lg:scale-125"
              />
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-12 sm:py-16 md:py-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-12 sm:mb-16 uppercase tracking-wider"
            style={{
              fontFamily: '"Orbitron", sans-serif',
              letterSpacing: '0.1em',
              background: 'linear-gradient(45deg, #ffffff 30%, rgba(255, 255, 255, 0.2) 50%, #ffffff 70%)',
              backgroundSize: '200% 200%',
              backgroundPosition: '0% 0%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shineText 3s linear infinite',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-[#1a1a1a] rounded-xl border border-white/10 p-6 sm:p-8 transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.7)",
                }}
                onClick={() => scrollToDescription(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-800/0 group-hover:from-purple-600/50 group-hover:to-purple-800/50 transition-all duration-300 z-0" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <motion.div
                    className="text-purple-400 group-hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.2, rotate: 0, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-white drop-shadow-md"
                    style={{ fontFamily: '"Orbitron", "Exo 2", sans-serif', letterSpacing: '0.05em' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-gray-300 text-sm sm:text-base group-hover:text-gray-100"
                    style={{ fontFamily: '"Rajdhani", "Exo 2", sans-serif', fontWeight: 500 }}
                  >
                    {service.subtitle}
                  </p>
                  <span
                    className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-semibold text-gray-400 pointer-events-none"
                    style={{ fontFamily: '"Orbitron", monospace', letterSpacing: '0.05em' }}
                  >
                    Click Me
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SERVICE DESCRIPTIONS */}
          <section id="descriptions" className="py-12 sm:py-16 md:py-20 max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-12 sm:mb-16 uppercase tracking-wider"
              style={{
                fontFamily: '"Orbitron", sans-serif',
                letterSpacing: '0.1em',
                background: 'linear-gradient(45deg, #ffffff 30%, rgba(255, 255, 255, 0.2) 50%, #ffffff 70%)',
                backgroundSize: '200% 200%',
                backgroundPosition: '0% 0%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shineText 3s linear infinite',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Service Insights
            </motion.h2>
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
              {services.map((service, index) => (
                <motion.article
                  id={`service-${index}`}
                  key={service.title}
                  className="bg-[#1a1e1a] rounded-xl border border-purple-500/20 p-6 sm:p-8 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-400 mb-4"
                    style={{ fontFamily: '"Orbitron", "Exo 2", sans-serif', letterSpacing: '0.05em' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{
                      fontFamily: '"Rajdhani", "Exo 2", sans-serif',
                      fontWeight: 500,
                      textAlign: 'justify',
                      wordBreak: 'keep-all',
                      hyphens: 'none',
                    }}
                  >
                    {service.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>
        </section>
      </div>

      <style jsx>{`
        @keyframes shineText {
          0% {
            background-position: 100% 0%;
          }
          100% {
            background-position: -100% 0%;
          }
        }
      `}</style>
      <Footer />
    </>
  );
}