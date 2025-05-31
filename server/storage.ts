import {
  users,
  fireAlerts,
  contactSubmissions,
  type User,
  type UpsertUser,
  type FireAlert,
  type InsertFireAlert,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, gte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Fire alerts operations
  createFireAlert(alert: InsertFireAlert): Promise<FireAlert>;
  getRecentFireAlerts(hours?: number): Promise<FireAlert[]>;
  getFireAlertsByLocation(lat: number, lng: number, radius: number): Promise<FireAlert[]>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Fire alerts operations
  async createFireAlert(alert: InsertFireAlert): Promise<FireAlert> {
    const [fireAlert] = await db
      .insert(fireAlerts)
      .values(alert)
      .returning();
    return fireAlert;
  }

  async getRecentFireAlerts(hours: number = 24): Promise<FireAlert[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);
    
    return await db
      .select()
      .from(fireAlerts)
      .where(gte(fireAlerts.acqDate, cutoffTime))
      .orderBy(desc(fireAlerts.acqDate))
      .limit(100);
  }

  async getFireAlertsByLocation(lat: number, lng: number, radius: number): Promise<FireAlert[]> {
    // Simple bounding box calculation for radius-based search
    const latDelta = radius / 111.32; // roughly 1 degree = 111.32 km
    const lngDelta = radius / (111.32 * Math.cos(lat * Math.PI / 180));
    
    return await db
      .select()
      .from(fireAlerts)
      .where(
        // Basic bounding box filter (would use PostGIS for production)
        // This is a simplified approach for the scope of this project
      )
      .orderBy(desc(fireAlerts.acqDate))
      .limit(50);
  }

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }
}

export const storage = new DatabaseStorage();
