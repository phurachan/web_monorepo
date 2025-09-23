import { MongoClient, ObjectId } from 'mongodb';

let client;
let db;
const MONGO_URI = process.env.AGENCY_MONGO_URI || "mongodb://localhost:27017/digital-agency";
async function connectToDatabase() {
  if (db) {
    return db;
  }
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB successfully");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
function getDatabase() {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return db;
}
function getCollection(name) {
  return getDatabase().collection(name);
}
const COLLECTIONS = {
  USERS: "users",
  HOME_CONTENT: "homeContent",
  SERVICES: "services",
  ABOUT_CONTENT: "aboutContent",
  SERVICES_CONTENT: "servicesContent",
  TEAM_CONTENT: "teamContent",
  TEAM_MEMBERS: "teamMembers",
  CONTACT_CONTENT: "contactContent",
  FAQ: "faq",
  SITE_SETTINGS: "siteSettings"
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class DatabaseHelper {
  constructor(collectionName) {
    __publicField(this, "collectionName");
    this.collectionName = collectionName;
  }
  async getCollection() {
    await connectToDatabase();
    return getCollection(this.collectionName);
  }
  async findById(id) {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }
  async findOne(filter) {
    const collection = await this.getCollection();
    return await collection.findOne(filter);
  }
  async findMany(filter = {}, options = {}) {
    const collection = await this.getCollection();
    return await collection.find(filter, options).toArray();
  }
  async create(data) {
    const collection = await this.getCollection();
    const now = /* @__PURE__ */ new Date();
    const documentToInsert = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    const result = await collection.insertOne(documentToInsert);
    return { ...documentToInsert, _id: result.insertedId };
  }
  async updateById(id, data) {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    const now = /* @__PURE__ */ new Date();
    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          ...data,
          updatedAt: now
        }
      },
      { returnDocument: "after" }
    );
    return result || null;
  }
  async deleteById(id) {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }
  async count(filter = {}) {
    const collection = await this.getCollection();
    return await collection.countDocuments(filter);
  }
  async exists(filter) {
    const collection = await this.getCollection();
    const count = await collection.countDocuments(filter, { limit: 1 });
    return count > 0;
  }
}
const UserHelper = new DatabaseHelper(COLLECTIONS.USERS);
const HomeContentHelper = new DatabaseHelper(COLLECTIONS.HOME_CONTENT);
const ServiceHelper = new DatabaseHelper(COLLECTIONS.SERVICES);
const AboutContentHelper = new DatabaseHelper(COLLECTIONS.ABOUT_CONTENT);
const ServicesContentHelper = new DatabaseHelper(COLLECTIONS.SERVICES_CONTENT);
const TeamContentHelper = new DatabaseHelper(COLLECTIONS.TEAM_CONTENT);
const TeamMemberHelper = new DatabaseHelper(COLLECTIONS.TEAM_MEMBERS);
const ContactContentHelper = new DatabaseHelper(COLLECTIONS.CONTACT_CONTENT);
const FAQHelper = new DatabaseHelper(COLLECTIONS.FAQ);
const SiteSettingsHelper = new DatabaseHelper(COLLECTIONS.SITE_SETTINGS);
class UserService {
  static async findByEmail(email) {
    return await UserHelper.findOne({ email });
  }
  static async createUser(userData) {
    return await UserHelper.create(userData);
  }
  static async userExists() {
    return await UserHelper.exists({});
  }
}
class ServiceService {
  static async getActiveServices() {
    return await ServiceHelper.findMany(
      { isActive: true },
      { sort: { order: 1, createdAt: 1 } }
    );
  }
  static async getAllServices() {
    return await ServiceHelper.findMany({}, { sort: { order: 1, createdAt: 1 } });
  }
  static async updateServiceOrder(serviceId, order) {
    return await ServiceHelper.updateById(serviceId, { order });
  }
}
class TeamMemberService {
  static async getActiveMembers() {
    return await TeamMemberHelper.findMany(
      { isActive: true },
      { sort: { order: 1, createdAt: 1 } }
    );
  }
  static async getAllMembers() {
    return await TeamMemberHelper.findMany({}, { sort: { order: 1, createdAt: 1 } });
  }
  static async updateMemberOrder(memberId, order) {
    return await TeamMemberHelper.updateById(memberId, { order });
  }
}
class ContentService {
  static async getHomeContent() {
    const content = await HomeContentHelper.findMany({}, { limit: 1 });
    return content[0] || null;
  }
  static async getAboutContent() {
    const content = await AboutContentHelper.findMany({}, { limit: 1 });
    return content[0] || null;
  }
  static async getServicesContent() {
    const content = await ServicesContentHelper.findMany({}, { limit: 1 });
    return content[0] || null;
  }
  static async getTeamContent() {
    const content = await TeamContentHelper.findMany({}, { limit: 1 });
    return content[0] || null;
  }
  static async getContactContent() {
    const content = await ContactContentHelper.findMany({}, { limit: 1 });
    return content[0] || null;
  }
  static async getSiteSettings() {
    const settings = await SiteSettingsHelper.findMany({}, { limit: 1 });
    return settings[0] || null;
  }
}

export { AboutContentHelper as A, ContactContentHelper as C, FAQHelper as F, HomeContentHelper as H, ServiceHelper as S, TeamContentHelper as T, UserService as U, UserHelper as a, SiteSettingsHelper as b, ContentService as c, ServicesContentHelper as d, ServiceService as e, TeamMemberService as f, TeamMemberHelper as g };
//# sourceMappingURL=db-helpers.mjs.map
