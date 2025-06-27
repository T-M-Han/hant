import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'


// === SANITY CLIENT ===
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

type SanityImageSource = string | { asset: { _ref: string } }

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}


// === PROJECTS ===
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

// === JUST LEARNED ===
export interface LearnedItem {
  _id: string
  title: string
  description: string
  date: string
  tags?: string[]
  link?: string
  notes?: PortableTextBlock[]
  how?: PortableTextBlock[]   
  imageUrl?: string
  titleImageUrl?: string
}

export async function getLearnedItems(): Promise<LearnedItem[]> {
  const query = `*[_type == "learned"] | order(date desc) {
    _id,
    title,
    description,
    date,
    tags,
    link,
    notes,
    how,
    "imageUrl": image.asset->url,
    "titleImageUrl": titleImage.asset->url
  }`
  return await client.fetch(query)
}

// === BLOGS ===
export interface BlogPost {
  _id: string
  title: string
  date: string
  content: PortableTextBlock[]
  tags?: string[]
  coverImageUrl?: string
  gallery?: string[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"] | order(date desc) {
    _id,
    title,
    date,
    content,
    tags,
    "coverImageUrl": coverImage.asset->url,
    "gallery": gallery[].asset->url
  }`
  return await client.fetch(query)
}

// === Tech Logo ===
export interface TechLogo {
  _id: string
  name: string
  iconUrl: string
}

export async function getTechLogos(): Promise<TechLogo[]> {
  const query = `*[_type == "techLogo"]{
    _id,
    name,
    "iconUrl": icon.asset->url
  }`
  return await client.fetch(query)
}

// === Hero ===
export interface Profile {
  headline: string
  subheadline: string
  description: string
  profileImageUrl: string
}

export async function getProfile(): Promise<Profile | null> {
  const query = `*[_type == "profile"][0] {
    headline,
    subheadline,
    description,
    "profileImageUrl": profileImage.asset->url
  }`
  return await client.fetch(query)
}

// === Contact ===
export interface ContactInfo {
  email: string
  location: string
  linkedin?: string
  github?: string
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const query = `*[_type == "contact"][0]{
    email,
    location,
    linkedin,
    github
  }`
  return await client.fetch(query)
}