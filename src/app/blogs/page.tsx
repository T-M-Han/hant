'use client'

import { useEffect, useState } from 'react'
import { getBlogPosts, BlogPost } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selected, setSelected] = useState<BlogPost | null>(null)

  useEffect(() => {
    getBlogPosts().then(setPosts)
  }, [])

  return (
    <section className="relative min-h-screen px-6 py-12 bg-black text-white overflow-hidden">
      {/* 🌀 Animated Background */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-40 h-40 bg-orange-500/20 blur-2xl rounded-full"
        animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-32 h-32 bg-red-500/10 blur-xl rounded-full"
        animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          Blog Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow hover:shadow-orange-500/20 transition"
              >
                {post.coverImageUrl && (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-orange-400 mb-2">{post.title}</h2>
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(post)}
                  className="text-sm text-orange-400 underline hover:text-orange-300"
                >
                  Read More
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 text-white rounded-xl max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] shadow-lg relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-orange-400 mb-2">{selected.title}</h2>
              <div className="text-sm text-gray-400 mb-4">{new Date(selected.date).toLocaleDateString()}</div>

              {selected.coverImageUrl && (
                <Image
                  src={selected.coverImageUrl}
                  alt="Cover"
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />
              )}

              <PortableText value={selected.content} />

              {selected.gallery && selected.gallery.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {selected.gallery.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Gallery image ${i + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg border border-white/10"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
