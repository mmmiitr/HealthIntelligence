import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Healthcare analytics routes
  app.get("/api/departments", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const departments = await storage.getDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  app.get("/api/financial-data", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const data = await storage.getFinancialData(filter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch financial data" });
    }
  });

  app.get("/api/patient-data", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const data = await storage.getPatientData(filter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patient data" });
    }
  });

  app.get("/api/revenue-by-specialty", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const data = await storage.getRevenueBySpecialty(filter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch revenue by specialty data" });
    }
  });

  app.get("/api/age-distribution", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const data = await storage.getAgeDistribution(filter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch age distribution data" });
    }
  });

  app.get("/api/insights", async (req, res) => {
    try {
      const filter = req.query.filter as string;
      const data = await storage.getInsights(filter);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  // Performance metrics endpoint
  app.get("/api/performance-metrics", async (req, res) => {
    try {
      const metrics = {
        patientSatisfaction: "94.2",
        averageWaitTime: "18",
        staffUtilization: "87",
        bedOccupancy: "78"
      };
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // Current financial overview
  app.get("/api/financial-overview", async (req, res) => {
    try {
      const overview = {
        totalRevenue: "2.4M",
        operatingCosts: "1.8M",
        netProfit: "600K",
        costPerPatient: "485"
      };
      res.json(overview);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch financial overview" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
