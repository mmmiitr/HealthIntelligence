import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Admin Dashboard Tables
export const adminMetrics = pgTable("admin_metrics", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 }).notNull(),
  costPerPatient: decimal("cost_per_patient", { precision: 8, scale: 2 }).notNull(),
  bedOccupancy: decimal("bed_occupancy", { precision: 5, scale: 2 }).notNull(),
  isPredicted: boolean("is_predicted").default(false),
});

export const resourceUtilization = pgTable("resource_utilization", {
  id: serial("id").primaryKey(),
  department: text("department").notNull(),
  utilization: decimal("utilization", { precision: 5, scale: 2 }).notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

// Clinician Dashboard Tables
export const clinicalMetrics = pgTable("clinical_metrics", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  averageA1C: decimal("average_a1c", { precision: 4, scale: 2 }).notNull(),
  adherenceRate: decimal("adherence_rate", { precision: 5, scale: 2 }).notNull(),
  complicationRate: decimal("complication_rate", { precision: 5, scale: 2 }).notNull(),
});

export const a1cTrends = pgTable("a1c_trends", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  averageA1C: decimal("average_a1c", { precision: 4, scale: 2 }).notNull(),
  patientCount: integer("patient_count").notNull(),
});

export const riskDistribution = pgTable("risk_distribution", {
  id: serial("id").primaryKey(),
  riskLevel: text("risk_level").notNull(), // 'low', 'medium', 'high'
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  count: integer("count").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

export const highRiskPatients = pgTable("high_risk_patients", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  a1c: decimal("a1c", { precision: 4, scale: 2 }).notNull(),
  lastVisit: text("last_visit").notNull(),
  riskFactors: text("risk_factors").notNull(),
});

// Patient Dashboard Tables
export const patientProfile = pgTable("patient_profile", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  currentA1C: decimal("current_a1c", { precision: 4, scale: 2 }).notNull(),
  nextAppointment: text("next_appointment").notNull(),
  medicationAdherence: decimal("medication_adherence", { precision: 5, scale: 2 }).notNull(),
});

export const personalA1CHistory = pgTable("personal_a1c_history", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  a1c: decimal("a1c", { precision: 4, scale: 2 }).notNull(),
  patientId: integer("patient_id").notNull(),
});

export const educationalTips = pgTable("educational_tips", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'diet', 'exercise', 'medication'
  title: text("title").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Insert schemas for diabetes-focused tables
export const insertAdminMetricsSchema = createInsertSchema(adminMetrics).omit({
  id: true,
});

export const insertResourceUtilizationSchema = createInsertSchema(resourceUtilization).omit({
  id: true,
});

export const insertClinicalMetricsSchema = createInsertSchema(clinicalMetrics).omit({
  id: true,
});

export const insertA1cTrendsSchema = createInsertSchema(a1cTrends).omit({
  id: true,
});

export const insertRiskDistributionSchema = createInsertSchema(riskDistribution).omit({
  id: true,
});

export const insertHighRiskPatientsSchema = createInsertSchema(highRiskPatients).omit({
  id: true,
});

export const insertPatientProfileSchema = createInsertSchema(patientProfile).omit({
  id: true,
});

export const insertPersonalA1CHistorySchema = createInsertSchema(personalA1CHistory).omit({
  id: true,
});

export const insertEducationalTipsSchema = createInsertSchema(educationalTips).omit({
  id: true,
});

// Type definitions for diabetes-focused dashboard
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Admin Dashboard Types
export type AdminMetrics = typeof adminMetrics.$inferSelect;
export type ResourceUtilization = typeof resourceUtilization.$inferSelect;
export type InsertAdminMetrics = z.infer<typeof insertAdminMetricsSchema>;
export type InsertResourceUtilization = z.infer<typeof insertResourceUtilizationSchema>;

// Clinician Dashboard Types
export type ClinicalMetrics = typeof clinicalMetrics.$inferSelect;
export type A1cTrends = typeof a1cTrends.$inferSelect;
export type RiskDistribution = typeof riskDistribution.$inferSelect;
export type HighRiskPatients = typeof highRiskPatients.$inferSelect;
export type InsertClinicalMetrics = z.infer<typeof insertClinicalMetricsSchema>;
export type InsertA1cTrends = z.infer<typeof insertA1cTrendsSchema>;
export type InsertRiskDistribution = z.infer<typeof insertRiskDistributionSchema>;
export type InsertHighRiskPatients = z.infer<typeof insertHighRiskPatientsSchema>;

// Patient Dashboard Types
export type PatientProfile = typeof patientProfile.$inferSelect;
export type PersonalA1CHistory = typeof personalA1CHistory.$inferSelect;
export type EducationalTips = typeof educationalTips.$inferSelect;
export type InsertPatientProfile = z.infer<typeof insertPatientProfileSchema>;
export type InsertPersonalA1CHistory = z.infer<typeof insertPersonalA1CHistorySchema>;
export type InsertEducationalTips = z.infer<typeof insertEducationalTipsSchema>;
