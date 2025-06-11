import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import logo from '../imgs/UDLOGO.png'; // Replace with your actual logo path

const Loader = ({ onLoadingComplete }) => {
  const [loadingStage, setLoadingStage] = useState('initial'); // 'initial', 'zooming', 'waves', 'fading', 'complete'

  useEffect(() => {
    // Stage 1: Initial loading (0.5 seconds)
    const initialTimer = setTimeout(() => {
      setLoadingStage('zooming');
    },1800);

    const fadeTimer = setTimeout(() => {
      setLoadingStage('complete');
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(fadeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: loadingStage === 'complete' ? 0 : 1,
        backdropFilter: loadingStage === 'fading' ? 'blur(20px)' : 'blur(0px)',
      }}
      transition={{ 
        duration: loadingStage === 'complete' ? 1.2 : 
                  loadingStage === 'fading' ? 1 : 0.1,
        ease: 'easeOut' 
      }}
      style={{ pointerEvents: loadingStage === 'complete' ? 'none' : 'auto' }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="text-center relative">
        {/* Main logo container */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Logo with zoom effect only */}
          <motion.div
            className="relative"
            initial={{ scale: 1, z: -500 }}
            animate={{
              scale: loadingStage === 'initial' ? 1 : 
                     loadingStage === 'zooming' ? 4 : 
                     loadingStage === 'waves' ? 6 : 
                     loadingStage === 'fading' ? 8 : 1,
              z: loadingStage === 'initial' ? -500 : 
                 loadingStage === 'zooming' ? -200 : 
                 loadingStage === 'waves' ? -100 : 
                 loadingStage === 'fading' ? -20 : -500,
              opacity: loadingStage === 'fading' ? 0 : 1,
            }}
            transition={{ 
              duration: loadingStage === 'zooming' ? 1 : 
                       loadingStage === 'fading' ? 1 : 0.5,
              ease: 'easeOut'
            }}
          >
            <motion.img
              src={logo}
              alt="UD Studios Logo"
              className="w-40 md:w-44 h-auto"
              animate={{
                filter: loadingStage === 'waves' || loadingStage === 'fading' ? 
                  'brightness(1.3) saturate(1.2) drop-shadow(0 0 20px rgba(96, 165, 250, 0.6))' : 
                  'brightness(1.1) saturate(1.1) drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

        

          {/* Small energy particles */}
          {loadingStage === 'waves' && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    scale: 0, 
                    x: 0, 
                    y: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos((i * 30) * Math.PI / 180) * 80,
                    y: Math.sin((i * 30) * Math.PI / 180) * 80,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 1,
                    delay: i * 0.08,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Loading text (only during initial stage) */}
        {loadingStage === 'initial' && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-3 mt-8"
              style={{ 
                fontFamily: '"Orbitron", sans-serif',
                letterSpacing: '0.1em'
              }}
            >
              UD STUDIOS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-lg mb-6"
              style={{ 
                fontFamily: '"Rajdhani", sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              Initializing Gaming Experience
            </motion.p>
            
            {/* Elegant loading bar */}
            <motion.div
              className="w-64 h-0.5 bg-gray-700/50 rounded-full mx-auto overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ 
                  duration: 0.5, 
                  ease: 'easeInOut',
                  delay: 0.8
                }}
              />
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Blur transition overlay for smooth hero appearance */}
        {loadingStage === 'fading' && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              backdropFilter: 'blur(0px)',
            }}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(15px)' }}
            transition={{ 
              duration: 1,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Loader;