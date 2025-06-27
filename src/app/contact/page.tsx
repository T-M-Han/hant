'use client';
import { useEffect, useState } from 'react';
import { getContactInfo, ContactInfo } from '@/lib/sanity.queries';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContactInfo().then(setContact);
  }, []);

  if (!contact) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Loading contact info...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* 🔸 Animated Background Blobs */}
      <motion.div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-orange-500/20 blur-md"
        animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-red-500/20 blur-md"
        animate={{ y: [0, 20, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-orange-500/10 blur-sm"
        animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🔸 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="mb-8 inline-block"
        >
          <div className="flex justify-center">
            <div className="bg-orange-10 rounded-full">
              <Mail className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className="space-y-4 max-w-md mx-auto">
          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 flex items-start gap-4 text-left"
          >
            <div className="p-2.5 bg-orange-500/10 rounded-full flex-shrink-0">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-orange-500 font-medium mb-1">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-orange-500 transition-colors break-all">
                {contact.email}
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 flex items-start gap-4 text-left"
          >
            <div className="p-2.5 bg-orange-500/10 rounded-full flex-shrink-0">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-orange-500 font-medium mb-1">Location</h3>
              <p className="text-gray-300">{contact.location}</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M22 12a10.06 10.06 1 0 0-3.6-7.78C17.4 3.32 16.06 3 14.6 3h-1.2c-1.46 0-2.8.32-3.8.78A10.06 10.06 1 0 0 2 12a10.06 10.06 1 0 0 3.6 7.78c1 .46 2.34.78 3.8.78h1.2c1.46 0 2.8-.32 3.8-.78A10.06 10.06 1 0 0 22 12Z" />
                  <path d="M16 8v8" />
                  <path d="M8 11v5" />
                  <path d="m12 16 3-8 3 8" />
                </svg>
              </div>
              <h3 className="text-orange-500 font-medium">Social</h3>
            </div>
            <div className="flex justify-center space-x-8">
              {contact.linkedin && (
                <motion.a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              )}
              {contact.github && (
                <motion.a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Return Home */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 inline-block">
          <Link href="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white font-medium hover:from-orange-500 hover:to-red-600 transition-all">
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
