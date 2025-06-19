import React, { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreationPage from './components/CreationPage';

// Lazy loaded components
const Hero = lazy(() => import('./components/Hero'));
const Navbar = lazy(() => import('./components/Navbar'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Creations = lazy(() => import('./components/Creations'));
const Founder = lazy(() => import('./components/Founder'));
const Career = lazy(() => import('./components/Career'));
const Footer = lazy(() => import('./components/Footer'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const Loader = lazy(() => import('./components/Loader'));
const ServicePage = lazy(() => import('./components/ServicePage')); // Add this

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBlurredContent, setShowBlurredContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowBlurredContent(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Router>
      <ParallaxProvider>
        <div className="bg-gray-900 text-white overflow-hidden">
          <AnimatePresence>
            {loading && <Loader onLoadingComplete={handleLoadingComplete} />}
          </AnimatePresence>

          {!loading && (
            <Suspense fallback={null}>
              <Navbar setIsOpen={setIsOpen} />
            </Suspense>
          )}

          <motion.div
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={{
              filter: showBlurredContent ? 'blur(0px)' : 'blur(20px)',
              opacity: showBlurredContent ? 1 : 0
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut'
            }}
          >
            <Suspense fallback={
              <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <About />
                      <Services />
                      <Creations />
                      <Founder />
                      <Career />
                      <Footer setIsOpen={setIsOpen} />
                    </>
                  }
                />
                <Route path="/servicepage" element={<ServicePage />} />
                <Route path="/" element={<Hero />} />
                <Route path="/creationpage" element={<CreationPage />} />
              </Routes>
            </Suspense>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <Suspense fallback={null}>
                <ContactModal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              </Suspense>
            )}
          </AnimatePresence>
        </div>
      </ParallaxProvider>
    </Router>
  );
}

export default App;
