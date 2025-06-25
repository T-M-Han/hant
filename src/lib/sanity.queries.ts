import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'w9fhrrqx',
  dataset: 'production',
  apiVersion: '2023-06-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

type SanityImageSource = string | { asset: { _ref: string } }

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  liveDemo?: string
  imageUrl: string
}

export async function getFeaturedProjects(): Promise<Project[]> {
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
