'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { client } from '@/lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

// Sanity-specific types
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface SanityProject {
  _id: string
  _type: 'project'
  _createdAt: string
  title: string
  description: string
  tags?: string[]
  image: SanityImage
  github?: string
  liveDemo?: string
}

// Frontend project type
interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  liveDemo?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showInProgress, setShowInProgress] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch<SanityProject[]>(
          `*[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            description,
            tags,
            image,
            github,
            liveDemo,
            _createdAt
          }`
        )

        if (!data) {
          throw new Error('No response from Sanity API')
        }

        const mappedProjects: Project[] = data.map((proj) => ({
          title: proj.title,
          description: proj.description,
          tags: proj.tags || [],
          image: builder.image(proj.image).url(),
          github: proj.github || '#',
          liveDemo: proj.liveDemo
        }))
        
        setProjects(mappedProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleLiveDemoClick = (e: React.MouseEvent, hasLiveDemo: boolean) => {
    if (!hasLiveDemo) {
      e.preventDefault()
      setShowInProgress(true)
      setTimeout(() => setShowInProgress(false), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Loading projects...</div>
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="text-red-500 text-xl max-w-md text-center p-6 border border-red-500 rounded-lg bg-black/80">
          <h2 className="text-2xl font-bold mb-4">Error Loading Projects</h2>
          <p className="mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-black backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/30 transition-all relative z-10 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  priority={index < 3}
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

      {/* In Progress Toast */}
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