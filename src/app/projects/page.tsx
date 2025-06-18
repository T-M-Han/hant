'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image'; // Added Image import

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  liveDemo?: string;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with cart, checkout, and admin dashboard.",
    tags: ["HTML5", "CSS3", "PHP", "JavaScript", "MYSQL", "Apache"],
    image: "/projects/seeker.png",
    github: "https://github.com/T-M-Han/WebProject_Seeker",
    
  },
  {
    title: "Secure Token-Based Authentication System",
    description: "A secure JWT-based authentication system, implementing industry-standard security practices.",
    tags: ["Python", "Tkinter GUI"],
    image: "/projects/token.png",
    github: "https://github.com/T-M-Han/Secure-Token-Based-Authentication-System" 
  },
  {
    title: "MobileProject_MealMate",
    description: "A mobile Meal Mate application for designed to help users manage dailt meals plan efficiently.",
    tags: ["Java"],
    image: "/projects/mealmate.jpg",
    github: "https://github.com/T-M-Han/MobileProject_MealMate",
  },
  {
    title: "MobileProject_TODO",
    description: "A mobile To-Do List application for academic purposes, designed to help users manage tasks efficiently.",
    tags: ["Java"],
    image: "/projects/todo.png",
    github: "https://github.com/MobileProject_TODO"
  },
  {
    title: "WebProject_BookHeart",
    description: "An academic web project for an online books store that allows users to browse, search, and purchase books.",
    tags: ["HTML5", "CSS3", "PHP", "JavaScript","Hack", "MYSQL", "Apache"],
    image: "/projects/bookheart.jpg",
    github: "https://github.com/T-M-Han/WebProject_Seeker",
  },
  {
    title: "WebProject_AI-Solution",
    description: "An web project featuring a full-stack e-commerce platform for sneaker enthusiasts with admin management.",
    tags: ["React.js", "Tailwind CSS","JavaScript", "Vite", "Git"],
    image: "/projects/aisolution.png",
    github: "https://github.com/T-M-Han/WebProject_AI-Solution",
  },
];

export default function ProjectsPage() {
  const [showInProgress, setShowInProgress] = useState(false);

  const handleLiveDemoClick = (e: React.MouseEvent, hasLiveDemo: boolean) => {
    if (!hasLiveDemo) {
      e.preventDefault();
      setShowInProgress(true);
      setTimeout(() => setShowInProgress(false), 3000);
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Enhanced Animated background elements */}
      <motion.div 
        className="absolute top-20 left-20 w-16 h-16 rounded-full bg-orange-500/30 blur-xl"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.2, 1, 0.9, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-red-500/20 blur-lg"
        animate={{
          x: [0, -30, 0, 30, 0],
          y: [0, 20, 0, -20, 0],
          scale: [1, 0.8, 1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500/20 blur-md"
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-blue-500/15 blur-lg"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.7, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            className="mb-6 inline-block"
          >
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          
          <p className="text-xl text-gray-400">
            A collection of my academic and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-black backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/30 transition-all relative z-10 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={500} // Added width
                  height={300} // Added height
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-orange-600/20 to-red-500/20 text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto flex gap-3">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all flex-1 text-center"
                  >
                    <FiGithub /> Code
                  </Link>
                  {project.liveDemo ? (
                    <Link
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all flex-1 text-center"
                    >
                      <FiExternalLink /> Live Demo
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleLiveDemoClick(e, false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all flex-1 text-center"
                    >
                      <FiExternalLink /> Live Demo
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In Progress Notification */}
      <AnimatePresence>
        {showInProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <FiExternalLink className="animate-pulse" />
            <span>Live demo is in progress - coming soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}