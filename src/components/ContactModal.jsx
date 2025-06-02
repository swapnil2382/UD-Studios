import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel as={motion.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-purple-500/30 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-purple-300 hover:text-white transition"
              >
                <X size={20} />
              </button>

              <Dialog.Title
                className="text-3xl sm:text-4xl font-bold mb-6 text-center text-purple-400"
                style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
              >
                Get in Touch
              </Dialog.Title>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm mb-1" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 bg-black/30 border border-purple-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400"
                    style={{ fontFamily: '"Rajdhani", sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-black/30 border border-purple-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400"
                    style={{ fontFamily: '"Rajdhani", sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Your message"
                    className="w-full px-4 py-2 bg-black/30 border border-purple-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400 resize-none"
                    style={{ fontFamily: '"Rajdhani", sans-serif' }}
                  />
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-md border border-purple-400/20 shadow-md hover:shadow-purple-500/30 transition-all font-semibold"
                    style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.04em' }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;