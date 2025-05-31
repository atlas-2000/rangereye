import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { nasaFirmsService } from "./nasaFirms";
import { insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Fire alerts API routes
  app.get('/api/fire-alerts', async (req, res) => {
    try {
      const hours = parseInt(req.query.hours as string) || 24;
      const alerts = await storage.getRecentFireAlerts(hours);
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching fire alerts:", error);
      res.status(500).json({ message: "Failed to fetch fire alerts" });
    }
  });

  // Live NASA FIRMS data endpoint
  app.get('/api/live-fires', async (req, res) => {
    try {
      const liveData = await nasaFirmsService.fetchActiveFiresGlobal();
      res.json(liveData);
    } catch (error) {
      console.error("Error fetching live NASA FIRMS data:", error);
      res.status(500).json({ message: "Failed to fetch live fire data" });
    }
  });

  app.get('/api/fire-alerts/location', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }

      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const searchRadius = parseFloat(radius as string) || 50; // Default 50km radius

      const alerts = await storage.getFireAlertsByLocation(latitude, longitude, searchRadius);
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching fire alerts by location:", error);
      res.status(500).json({ message: "Failed to fetch fire alerts by location" });
    }
  });

  // NASA FIRMS sync route (protected)
  app.post('/api/fire-alerts/sync', isAuthenticated, async (req, res) => {
    try {
      const syncedCount = await nasaFirmsService.syncFireAlertsToDatabase();
      res.json({ 
        message: "Fire alerts synced successfully", 
        syncedCount 
      });
    } catch (error) {
      console.error("Error syncing fire alerts:", error);
      res.status(500).json({ message: "Failed to sync fire alerts" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  // Protected content routes
  app.get('/api/protected/reports', isAuthenticated, async (req, res) => {
    res.json({
      reports: [
        {
          id: 1,
          title: "Q4 2024 Detection Performance Analysis",
          description: "Comprehensive analysis of fire detection accuracy and response times",
          downloadUrl: "/api/protected/download/performance-q4-2024.pdf",
          createdAt: "2024-10-15"
        },
        {
          id: 2,
          title: "System Architecture Technical Specifications",
          description: "Detailed technical documentation of drone hardware and AI systems",
          downloadUrl: "/api/protected/download/tech-specs-v2.1.pdf",
          createdAt: "2024-09-20"
        }
      ]
    });
  });

  app.get('/api/protected/videos', isAuthenticated, async (req, res) => {
    res.json({
      videos: [
        {
          id: 1,
          title: "Live Fire Detection Demonstration",
          description: "Real-time wildfire detection in Northern California",
          videoUrl: "/api/protected/stream/demo-detection.mp4",
          thumbnail: "/api/protected/thumbnails/demo-1.jpg",
          duration: "04:32"
        },
        {
          id: 2,
          title: "Drone Deployment Field Test",
          description: "Full system deployment and emergency response coordination",
          videoUrl: "/api/protected/stream/field-test.mp4", 
          thumbnail: "/api/protected/thumbnails/field-test.jpg",
          duration: "12:45"
        }
      ]
    });
  });

  app.get('/api/protected/analytics', isAuthenticated, async (req, res) => {
    res.json({
      realTimeData: {
        activeAlerts: await storage.getRecentFireAlerts(1), // Last hour
        systemStatus: {
          dronesActive: 4,
          totalDrones: 5,
          coverageArea: 847,
          detectionRate: 98.7,
          averageResponseTime: 4.2
        },
        environmentalData: {
          windSpeed: 23.4,
          windDirection: "NW",
          humidity: 34,
          temperature: 28.5
        }
      }
    });
  });

  // System statistics (public)
  app.get('/api/stats', async (req, res) => {
    try {
      const recentAlerts = await storage.getRecentFireAlerts(24);
      const stats = {
        activeDrones: 4,
        areaMonitored: 847,
        firesDetected: recentAlerts.length,
        responseTime: 4.2,
        activeAlerts: recentAlerts.filter(alert => alert.confidence && alert.confidence > 75).length
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
