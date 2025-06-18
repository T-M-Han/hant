'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LearnedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-orange-500/20 blur-md"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-red-500/20 blur-md"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <motion.div 
        className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-orange-500/10 blur-sm"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-8 inline-block"
        >
          <div className="text-8xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            🚧
          </div>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-8">
          I&rsquo;m currently curating all the valuable lessons and skills I&rsquo;ve acquired. Check back later for this knowledge repository!
        </p>

        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white font-medium hover:from-orange-500 hover:to-red-600 transition-all"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}