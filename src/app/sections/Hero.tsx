'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
        {/* Text Content (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
            Hi, I&apos;m <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">HANT</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            Junior Web Developer | Software Engineer | Tech Enthusiast | Problem Solver
          </h2>
          
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            I build exceptional digital experiences with modern web technologies.
            Passionate about creating efficient, scalable solutions that make an impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/contact"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg font-medium text-sm sm:text-base"
            >
              Contact Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/projects"
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm sm:text-base"
            >
              View Projects
            </motion.a>
          </div>
        </motion.div>

        {/* Enhanced Profile Picture with faster background animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center mb-8 lg:mb-0 relative"
        >
          <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem]">
            {/* Faster rotating background elements */}
            <motion.div 
              className="absolute inset-0 overflow-hidden rounded-full"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 30, // Faster rotation (was 60)
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div 
                className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-orange-500/20 blur-md"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4, // Faster (was 8)
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-red-500/20 blur-md"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 3.5, // Faster (was 7)
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-yellow-500/20 blur-md"
                animate={{
                  y: [0, -10, 10, 0],
                  scale: [1, 1.3, 0.7, 1]
                }}
                transition={{
                  duration: 5, // Faster (was 9)
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              ></motion.div>
            </motion.div>
            
            {/* Static profile image */}
            <div className="relative w-full h-full">
              <Image
                src="/profile1.png"
                alt="HANT Profile Picture"
                width={512}
                height={512}
                className="object-contain w-full h-full drop-shadow-2xl"
                priority
              />
            </div>

            {/* Animated orange line at the bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full"
              initial={{ scaleX: 0.8, opacity: 0.7 }}
              animate={{ 
                scaleX: [0.97, 1.1, 0.97],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl -z-10"></div>
            
            {/* Faster floating decoration dots */}
            <motion.div 
              className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-orange-500/10 blur-sm"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 16, // Faster (was 8)
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-red-500/10 blur-sm"
              animate={{
                y: [0, 15, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 14, // Faster (was 7)
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}