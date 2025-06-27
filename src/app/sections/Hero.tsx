'use client';
import { useEffect, useState } from 'react'
import { getProfile, Profile } from '@/lib/sanity.queries'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  if (!profile) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </section>
    )
  }

  return (
    <section 
      id="home" 
      className="min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
            {profile.headline.split(' ').map((word, i, arr) => (
              <span
                key={i}
                className={
                  i === arr.length - 1
                    ? 'bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent'
                    : ''
                }
              >
                {word + ' '}
              </span>
            ))}
          </h1>

          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            {profile.subheadline}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            {profile.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a
              href="/contact"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg font-medium text-sm sm:text-base"
            >
              Contact Me
            </a>
            <a
              href="/projects"
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm sm:text-base"
            >
              View Projects
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center relative"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
            {/* 🌕 Large central glow */}
            <motion.div
              className="absolute inset-0 bg-orange-500/20 blur-[120px] -z-10 rounded-xl"
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🟠 Floating small blobs */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-orange-500/30 blur-md -z-10"
                style={{
                  width: `${Math.random() * 12 + 8}px`,
                  height: `${Math.random() * 12 + 8}px`,
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                }}
                animate={{
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* 🖼️ Profile image (no circle shape) */}
            {profile.profileImageUrl && (
              <Image
                src={profile.profileImageUrl}
                alt="Profile"
                fill
                className="object-contain drop-shadow-2xl"
              />
            )}

            {/* 🔥 Glowing bottom bar (stick to image) */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
              initial={{ scaleX: 0.95, opacity: 0.8 }}
              animate={{ scaleX: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
