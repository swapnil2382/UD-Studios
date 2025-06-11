import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ChevronRight, Instagram, Linkedin, Youtube } from 'lucide-react';
import Twitter from '../imgs/twitter.png';
import Reddit from '../imgs/reddit.png';
import Footerimg from '../imgs/footer.webp';

const Footer = ({ setIsOpen }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    "Game Development",
    "Branding & Logo Design",
    "Graphical Designing",
    "UI/UX Design",
    "Web Development",
  ];

  const socialLinks = [
    {
      icon: <img src={Twitter} alt="X" className="w-5 h-5" />,
      hoverFilter: 'brightness(0)', // Black on hover
      label: 'X',
      link: 'https://x.com'
    },
    {
      icon: <Instagram size={18} />,
      color: 'hover:text-pink-500',
      label: 'Instagram',
      link: 'https://instagram.com'
    },
    {
      icon: <Youtube size={18} />,
      color: 'hover:text-red-600',
      label: 'YouTube',
      link: 'https://youtube.com'
    },
    {
      icon: <Linkedin size={18} />,
      color: 'hover:text-blue-600',
      label: 'LinkedIn',
      link: 'https://linkedin.com'
    },
    {
      icon: <img src={Reddit} alt="Reddit" className="w-5 h-5" />,
hoverFilter: 'invert(50%) sepia(80%) hue-rotate(340deg) saturate(600%) brightness(80%)',
      label: 'Reddit',
      link: 'https://reddit.com'
    },
  ];

  return (
    <div className="flex flex-col md:flex-row flex-wrap w-full">
      {/* CTA Panel */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-purple-900 to-black text-white md:w-1/2 p-8 md:p-12 flex flex-col justify-between basis-[60%]"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-purple-300">
              Ready To Move Forward?
            </h2>
            <p className="text-gray-300 text-sm">
              Kickstart your next gaming project or get in touch.<br />
              We're ready to bring your ideas to life.
            </p>
            <motion.button
              onClick={() => setIsOpen(true)}
              className="mt-4 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-medium flex items-center gap-2 group transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Us</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <img
            src={Footerimg}
            alt="Gaming Decorative"
            className="w-[160px] sm:w-[180px] md:w-[200px] h-auto object-contain"
          />
        </div>

        {/* Social Links */}
        <div className="mt-8">
          <p className="font-medium mb-3 text-gray-300">Follow Us</p>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-white ${social.color || ''} ${social.hoverFilter ? 'hover:filter' : ''} transition-colors duration-300`}
                style={{ filter: social.hoverFilter ? 'none' : undefined }}
                whileHover={{ scale: 1.1, filter: social.hoverFilter || undefined }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer Panel */}
      <motion.footer
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-black text-white md:w-1/2 p-8 md:p-12 grid gap-6 basis-[40%]"
      >
        {/* Core Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400 border-b border-purple-500 inline-block">
            Core Services
          </h3>
          <ul className="grid gap-2 text-sm">
            {services.map((item) => (
              <li key={item} className="flex items-center hover:text-purple-300">
                <ChevronRight size={14} className="text-purple-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400 border-b border-purple-500 inline-block">
            Quick Links
          </h3>
          <ul className="grid gap-2 text-sm">
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Services', href: '#service' },
              { label: 'Our Games', href: '#Creations' },
              { label: 'Careers', href: '#career' },
            ].map(({ label, href }) => (
              <li key={label} className="flex items-center hover:text-purple-300">
                <ChevronRight size={14} className="text-purple-500 mr-2" />
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            ©2024 UD Studios™. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;