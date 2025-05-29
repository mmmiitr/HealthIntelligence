import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for Docker
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      service: 'diabetes-care-dashboard'
    });
  });
  // Admin Dashboard Routes
  app.get("/api/admin/metrics", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getAdminMetrics(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin metrics" });
    }
  });

  app.get("/api/admin/resource-utilization", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getResourceUtilization(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource utilization data" });
    }
  });

  // Clinician Dashboard Routes
  app.get("/api/clinician/metrics", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getClinicalMetrics(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clinical metrics" });
    }
  });

  app.get("/api/clinician/a1c-trends", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getA1cTrends(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch A1C trends" });
    }
  });

  app.get("/api/clinician/risk-distribution", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getRiskDistribution(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk distribution" });
    }
  });

  app.get("/api/clinician/high-risk-patients", async (req, res) => {
    try {
      const data = await storage.getHighRiskPatients();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch high-risk patients" });
    }
  });

  // Patient Dashboard Routes
  app.get("/api/patient/profile", async (req, res) => {
    try {
      const data = await storage.getPatientProfile();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patient profile" });
    }
  });

  app.get("/api/patient/a1c-history", async (req, res) => {
    try {
      const timeFilter = req.query.timeFilter as string;
      const data = await storage.getPersonalA1CHistory(timeFilter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch A1C history" });
    }
  });

  app.get("/api/patient/educational-tips", async (req, res) => {
    try {
      const data = await storage.getEducationalTips();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch educational tips" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
