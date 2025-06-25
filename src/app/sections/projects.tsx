'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
import { getFeaturedProjects } from '@/lib/sanity.queries'

type Project = {
  title: string
  description: string
  tags: string[]
  github: string
  liveDemo?: string
  imageUrl: string
}

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showInProgress, setShowInProgress] = useState(false)

  useEffect(() => {
    getFeaturedProjects().then(setProjects)
  }, [])

  const handleLiveDemoClick = (e: React.MouseEvent, hasLiveDemo: boolean) => {
    if (!hasLiveDemo) {
      e.preventDefault()
      setShowInProgress(true)
      setTimeout(() => setShowInProgress(false), 3000)
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              A selection of my academic and personal projects showcasing my skills and experience
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all group"
          >
            View All Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-black backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/30 transition-all relative z-10 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={500}
                  height={300}
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
                      <FiExternalLink /> Demo
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleLiveDemoClick(e, false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all flex-1 text-center"
                    >
                      <FiExternalLink /> Demo
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
  )
}
