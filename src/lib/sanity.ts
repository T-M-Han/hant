// lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'w9fhrrqx', // Double-check this matches your sanity.config.ts
  dataset: 'production', // Must match your dataset name
  apiVersion: '2023-01-01', // Use current date if needed
  useCdn: process.env.NODE_ENV === 'production', // CDN only in production
  token: process.env.SANITY_API_TOKEN, // Only needed for private datasets
})