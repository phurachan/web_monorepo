import { MongoClient, Db, Collection, ObjectId } from 'mongodb'

let client: MongoClient
let db: Db

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digital-agency'

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  try {
    client = new MongoClient(MONGO_URI)
    await client.connect()
    db = client.db()

    console.log('Connected to MongoDB successfully')
    return db
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (client) {
    await client.close()
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.')
  }
  return db
}

export function getCollection<T = any>(name: string): Collection<T> {
  return getDatabase().collection<T>(name)
}

export { ObjectId }

// Collection names as constants
export const COLLECTIONS = {
  USERS: 'users',
  HOME_CONTENT: 'homeContent',
  SERVICES: 'services',
  ABOUT_CONTENT: 'aboutContent',
  SERVICES_CONTENT: 'servicesContent',
  TEAM_CONTENT: 'teamContent',
  TEAM_MEMBERS: 'teamMembers',
  CONTACT_CONTENT: 'contactContent',
  FAQ: 'faq',
  SITE_SETTINGS: 'siteSettings'
} as const

// Type definitions based on the original Prisma schema
export interface User {
  _id?: ObjectId
  email: string
  password: string
  role: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

export interface HomeContent {
  _id?: ObjectId
  heroTitle: string // JSON string
  heroSubtitle: string // JSON string
  ctaText: string // JSON string
  ctaButtonText: string // JSON string
  featureTitle: string // JSON string
  featureDescription: string // JSON string
  aboutTitle: string // JSON string
  aboutDescription: string // JSON string
  peopleTitle: string // JSON string
  peopleDescription: string // JSON string
  heroImage?: string
  featureImage?: string
  aboutImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  _id?: ObjectId
  title: string // JSON string
  description: string // JSON string
  features: string // JSON string array
  icon: string
  image?: string
  color: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface AboutContent {
  _id?: ObjectId
  missionTitle: string // JSON string
  missionText: string // JSON string
  visionTitle: string // JSON string
  visionText: string // JSON string
  valuesTitle: string // JSON string
  valuesText: string // JSON string
  historyTitle: string // JSON string
  historyText: string // JSON string
  missionImage?: string
  heroImage?: string
  happyClientsCount: string // JSON string
  happyClientsLabel: string // JSON string
  experienceCount: string // JSON string
  experienceLabel: string // JSON string
  visionItems: string // JSON string
  valuesItems: string // JSON string
  journeyItems: string // JSON string
  createdAt: Date
  updatedAt: Date
}

export interface ServicesContent {
  _id?: ObjectId
  heroTitle: string // JSON string
  heroSubtitle: string // JSON string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface TeamContent {
  _id?: ObjectId
  heroTitle: string // JSON string
  heroSubtitle: string // JSON string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  _id?: ObjectId
  name: string
  position: string
  description: string
  image?: string
  email?: string
  linkedin?: string
  twitter?: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ContactContent {
  _id?: ObjectId
  title: string // JSON string
  subtitle: string // JSON string
  address: string // JSON string
  phone: string
  email: string
  businessHours: string // JSON string
  mapEmbedUrl?: string
  bannerImage?: string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  _id?: ObjectId
  question: string
  answer: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface SiteSettings {
  _id?: ObjectId
  siteName: string
  siteTagline: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  socialLinks: string // JSON string
  metaDescription?: string
  keywords?: string
  contactEmail?: string
  contactPhone?: string
  createdAt: Date
  updatedAt: Date
}