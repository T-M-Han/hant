'use client';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiLayers, FiSmartphone, FiServer } from 'react-icons/fi';

const skillsData = [
  {
    category: "Frontend",
    icon: <FiLayers className="w-8 h-8" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
    ]
  },
  {
    category: "Backend",
    icon: <FiServer className="w-8 h-8" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "Django", level: 70 },
    ]
  },
  {
    category: "Database",
    icon: <FiDatabase className="w-8 h-8" />,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Firebase", level: 75 },
      { name: "Redis", level: 65 },
    ]
  },
  {
    category: "Mobile",
    icon: <FiSmartphone className="w-8 h-8" />,
    skills: [
      { name: "React Native", level: 80 },
      { name: "Flutter", level: 70 },
      { name: "Swift", level: 60 },
    ]
  },
  {
    category: "DevOps",
    icon: <FiCpu className="w-8 h-8" />,
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 90 },
    ]
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="relative py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 bg-gradient-to-r from-orange-500 to-red-500 -z-10"></div>
      
      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-orange-500/10 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-red-500/10 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies I&apos;ve worked with and my proficiency level in each
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                          className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Additional skills card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: skillsData.length * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <FiCode className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold ml-3">Also Work With</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['GraphQL', 'Jest', 'Cypress', 'Sass', 'Redux', 'Webpack', 'Three.js', 'Electron'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}