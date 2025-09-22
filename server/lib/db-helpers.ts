import { ObjectId } from 'mongodb'
import {
  connectToDatabase,
  getCollection,
  COLLECTIONS,
  User,
  HomeContent,
  Service,
  AboutContent,
  ServicesContent,
  TeamContent,
  TeamMember,
  ContactContent,
  FAQ,
  SiteSettings
} from './mongodb'

// Generic CRUD operations
export class DatabaseHelper<T = any> {
  private collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  private async getCollection() {
    await connectToDatabase()
    return getCollection<T>(this.collectionName)
  }

  async findById(id: string | ObjectId): Promise<T | null> {
    const collection = await this.getCollection()
    const objectId = typeof id === 'string' ? new ObjectId(id) : id
    return await collection.findOne({ _id: objectId } as any)
  }

  async findOne(filter: any): Promise<T | null> {
    const collection = await this.getCollection()
    return await collection.findOne(filter)
  }

  async findMany(filter: any = {}, options: any = {}): Promise<T[]> {
    const collection = await this.getCollection()
    return await collection.find(filter, options).toArray()
  }

  async create(data: Omit<T, '_id'>): Promise<T> {
    const collection = await this.getCollection()
    const now = new Date()
    const documentToInsert = {
      ...data,
      createdAt: now,
      updatedAt: now
    }

    const result = await collection.insertOne(documentToInsert as any)
    return { ...documentToInsert, _id: result.insertedId } as T
  }

  async updateById(id: string | ObjectId, data: Partial<T>): Promise<T | null> {
    const collection = await this.getCollection()
    const objectId = typeof id === 'string' ? new ObjectId(id) : id
    const now = new Date()

    const result = await collection.findOneAndUpdate(
      { _id: objectId } as any,
      {
        $set: {
          ...data,
          updatedAt: now
        }
      },
      { returnDocument: 'after' }
    )

    return result || null
  }

  async deleteById(id: string | ObjectId): Promise<boolean> {
    const collection = await this.getCollection()
    const objectId = typeof id === 'string' ? new ObjectId(id) : id
    const result = await collection.deleteOne({ _id: objectId } as any)
    return result.deletedCount > 0
  }

  async count(filter: any = {}): Promise<number> {
    const collection = await this.getCollection()
    return await collection.countDocuments(filter)
  }

  async exists(filter: any): Promise<boolean> {
    const collection = await this.getCollection()
    const count = await collection.countDocuments(filter, { limit: 1 })
    return count > 0
  }
}

// Specific database helpers for each collection
export const UserHelper = new DatabaseHelper<User>(COLLECTIONS.USERS)
export const HomeContentHelper = new DatabaseHelper<HomeContent>(COLLECTIONS.HOME_CONTENT)
export const ServiceHelper = new DatabaseHelper<Service>(COLLECTIONS.SERVICES)
export const AboutContentHelper = new DatabaseHelper<AboutContent>(COLLECTIONS.ABOUT_CONTENT)
export const ServicesContentHelper = new DatabaseHelper<ServicesContent>(COLLECTIONS.SERVICES_CONTENT)
export const TeamContentHelper = new DatabaseHelper<TeamContent>(COLLECTIONS.TEAM_CONTENT)
export const TeamMemberHelper = new DatabaseHelper<TeamMember>(COLLECTIONS.TEAM_MEMBERS)
export const ContactContentHelper = new DatabaseHelper<ContactContent>(COLLECTIONS.CONTACT_CONTENT)
export const FAQHelper = new DatabaseHelper<FAQ>(COLLECTIONS.FAQ)
export const SiteSettingsHelper = new DatabaseHelper<SiteSettings>(COLLECTIONS.SITE_SETTINGS)

// Specialized methods for specific collections
export class UserService {
  static async findByEmail(email: string): Promise<User | null> {
    return await UserHelper.findOne({ email })
  }

  static async createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await UserHelper.create(userData)
  }

  static async userExists(): Promise<boolean> {
    return await UserHelper.exists({})
  }
}

export class ServiceService {
  static async getActiveServices(): Promise<Service[]> {
    return await ServiceHelper.findMany(
      { isActive: true },
      { sort: { order: 1, createdAt: 1 } }
    )
  }

  static async getAllServices(): Promise<Service[]> {
    return await ServiceHelper.findMany({}, { sort: { order: 1, createdAt: 1 } })
  }

  static async updateServiceOrder(serviceId: string, order: number): Promise<Service | null> {
    return await ServiceHelper.updateById(serviceId, { order })
  }
}

export class TeamMemberService {
  static async getActiveMembers(): Promise<TeamMember[]> {
    return await TeamMemberHelper.findMany(
      { isActive: true },
      { sort: { order: 1, createdAt: 1 } }
    )
  }

  static async getAllMembers(): Promise<TeamMember[]> {
    return await TeamMemberHelper.findMany({}, { sort: { order: 1, createdAt: 1 } })
  }

  static async updateMemberOrder(memberId: string, order: number): Promise<TeamMember | null> {
    return await TeamMemberHelper.updateById(memberId, { order })
  }
}

export class ContentService {
  static async getHomeContent(): Promise<HomeContent | null> {
    const content = await HomeContentHelper.findMany({}, { limit: 1 })
    return content[0] || null
  }

  static async getAboutContent(): Promise<AboutContent | null> {
    const content = await AboutContentHelper.findMany({}, { limit: 1 })
    return content[0] || null
  }

  static async getServicesContent(): Promise<ServicesContent | null> {
    const content = await ServicesContentHelper.findMany({}, { limit: 1 })
    return content[0] || null
  }

  static async getTeamContent(): Promise<TeamContent | null> {
    const content = await TeamContentHelper.findMany({}, { limit: 1 })
    return content[0] || null
  }

  static async getContactContent(): Promise<ContactContent | null> {
    const content = await ContactContentHelper.findMany({}, { limit: 1 })
    return content[0] || null
  }

  static async getSiteSettings(): Promise<SiteSettings | null> {
    const settings = await SiteSettingsHelper.findMany({}, { limit: 1 })
    return settings[0] || null
  }
}