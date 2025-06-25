// lib/sanity.queries.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'w9fhrrqx', 
  dataset: 'production',
  apiVersion: '2023-06-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

export async function getFeaturedProjects() {
  const query = `*[_type == "project" && featured == true] | order(_createdAt desc) {
    title,
    description,
    tags,
    github,
    liveDemo,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query)
}
