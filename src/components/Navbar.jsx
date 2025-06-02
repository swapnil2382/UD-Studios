import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsOpen }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is /servicepage or /creationpage
  const isSpecialPage = location.pathname === '/servicepage' || location.pathname === '/creationpage';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (isSpecialPage) {
      navigate('/');
    } else {
      const homeElement = document.getElementById('home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Element with id="home" not found on the main page.');
        // Fallback: Navigate to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    handleMobileLinkClick();
  };

  const navLinks = [
    { name: 'Home', href: '#home' }, // href kept for non-Home links, but Home uses navigate
    ...(isSpecialPage ? [] : [
      { name: 'Who We Are', href: '#about' },
      { name: 'What We Do', href: '#service' },
      { name: 'Our Creations', href: '#Creations' },
      { name: 'Career', href: '#career' },
    ]),
  ];

  return (
    <header className="fixed top-0 z-50 w-full flex justify-center">
      <motion.div
        className={`w-full max-w-7xl mx-4 px-6 py-3 flex items-center justify-end transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Desktop Nav */}
        <motion.nav
          className="rounded-full shadow-md bg-gray-800/90 backdrop-blur-sm px-6 py-3 hidden md:flex items-center space-x-6 font-medium text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {navLinks.map((link, index) => (
            link.name === 'Home' ? (
              <motion.button
                key={link.name}
                onClick={handleHomeClick}
                className="hover:text-purple-400 transition-colors relative group"
                style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '0.05em' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                whileHover={{ scale: 1.05 }}
                aria-label="Navigate to home"
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"
                  layoutId={`underline-${link.name}`}
                />
              </motion.button>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                className="hover:text-purple-400 transition-colors relative group"
                style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '0.05em' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"
                  layoutId={`underline-${link.name}`}
                />
              </motion.a>
            )
          ))}
          <motion.button
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-full text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
        </motion.nav>

        {/* Mobile Toggle */}
        <motion.div
          className="rounded-full shadow-md bg-gray-800/90 backdrop-blur-sm px-4 py-2 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-purple-400 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-[74px] w-[90%] mx-auto left-0 right-0 bg-gray-800/95 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 text-center z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              link.name === 'Home' ? (
                <motion.button
                  key={link.name}
                  onClick={handleHomeClick}
                  className="block w-full py-3 text-gray-200 hover:text-purple-400 border-b border-gray-700 last:border-none text-center bg-transparent"
                  style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                  aria-label="Navigate to home"
                >
                  {link.name}
                </motion.button>
              ) : (
                <motion.a
                  key={link.name}
                  onClick={handleMobileLinkClick}
                  href={link.href}
                  className="block py-3 text-gray-200 hover:text-purple-400 border-b border-gray-700 last:border-none"
                  style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              )
            ))}
            <motion.button
              onClick={() => {
                setIsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="mt-3 bg-purple-600 hover:bg-purple-700 px-6 py-2 w-full rounded-lg text-white font-medium transition-all duration-300"
              style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '0.05em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
};

export default Navbar;