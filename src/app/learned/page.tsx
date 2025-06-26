'use client'

import { useEffect, useState } from 'react'
import { getLearnedItems, LearnedItem } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function LearnedPage() {
  const [items, setItems] = useState<LearnedItem[] | null>(null)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState<LearnedItem | null>(null)

  useEffect(() => {
    getLearnedItems()
      .then(setItems)
      .catch((err) => {
        console.error('Failed to fetch learned items:', err)
        setError(true)
      })
  }, [])

  const openModal = (item: LearnedItem) => setSelected(item)
  const closeModal = () => setSelected(null)

  if (error) {
    return (
      <section className="min-h-screen px-4 py-12 bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-lg">Error loading entries. Please try again later.</p>
      </section>
    )
  }

  if (!items) {
    return (
      <section className="min-h-screen px-4 py-12 bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen px-6 py-12 bg-black text-white overflow-hidden">
      {/* 🔥 Animated background blobs */}
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
      <motion.div
        className="absolute bottom-10 left-1/5 w-56 h-56 bg-orange-500/10 blur-3xl rounded-full"
        animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          Just Learned
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No entries yet. Stay tuned!</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow hover:shadow-orange-500/20 transition"
              >
                {item.titleImageUrl && (
                  <Image
                    src={item.titleImageUrl}
                    alt={item.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    priority
                  />
                )}
                <h2 className="text-xl font-semibold text-orange-400 mb-2">{item.title}</h2>
                <p className="text-gray-300 mb-2 line-clamp-3">{item.description}</p>
                <div className="text-sm text-gray-400 mb-1">
                  {new Date(item.date).toLocaleDateString()}
                </div>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.link && (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline text-sm block mb-3"
                  >
                    Reference
                  </Link>
                )}
                <button
                  onClick={() => openModal(item)}
                  className="text-sm text-orange-400 underline hover:text-orange-300 transition"
                >
                  Show Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* === Modal Popup === */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 text-white rounded-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh] shadow-lg relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-orange-400 mb-2">{selected.title}</h2>
              <p className="text-gray-300 mb-4">{selected.description}</p>

              {selected.imageUrl && (
                <Image
                  src={selected.imageUrl}
                  alt="Supporting"
                  width={800}
                  height={450}
                  className="w-full rounded-lg mb-4 border border-white/10"
                />
              )}

              {selected.notes && (
                <div className="mb-6">
                  <h3 className="text-orange-500 font-semibold mb-2">📘 What I Learned</h3>
                  <PortableText value={selected.notes} />
                </div>
              )}

              {selected.how && (
                <div>
                  <h3 className="text-orange-500 font-semibold mb-2">🔧 How I Learned It</h3>
                  <PortableText value={selected.how} />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
