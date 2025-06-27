'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { getTechLogos, TechLogo } from '@/lib/sanity.queries';

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -5,
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function Skills() {
  const [skills, setSkills] = useState<TechLogo[]>([]);

  useEffect(() => {
    getTechLogos().then(setSkills);
  }, []);

  return (
    <section id="skills" className="py-16 bg-white dark:bg-orange-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">
            My <span className="text-orange-600 dark:text-orange-500">Tech Stack</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Technologies I use to build great products
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              variants={item}
              whileHover="hover"
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-blue-950 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                className="w-16 h-16 relative mb-3"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </motion.div>
              <h3 className="font-medium text-white-800 dark:text-gray-200 text-center">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Background Elements */}
        <motion.div
          className="absolute left-1/4 top-1/3 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl -z-10"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 w-40 h-40 rounded-full bg-red-500/10 blur-3xl -z-10"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
    </section>
  );
}
