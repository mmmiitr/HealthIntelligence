import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  patientCount: integer("patient_count").notNull(),
  satisfaction: decimal("satisfaction", { precision: 5, scale: 2 }).notNull(),
});

export const financialData = pgTable("financial_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 }).notNull(),
  operatingCosts: decimal("operating_costs", { precision: 10, scale: 2 }).notNull(),
  netProfit: decimal("net_profit", { precision: 10, scale: 2 }).notNull(),
  costPerPatient: decimal("cost_per_patient", { precision: 8, scale: 2 }).notNull(),
  isPredicted: boolean("is_predicted").default(false),
});

export const patientData = pgTable("patient_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  totalPatients: integer("total_patients").notNull(),
  newPatients: integer("new_patients").notNull(),
  existingPatients: integer("existing_patients").notNull(),
  retention: decimal("retention", { precision: 5, 2 }).notNull(),
  isPredicted: boolean("is_predicted").default(false),
});

export const revenueBySpecialty = pgTable("revenue_by_specialty", {
  id: serial("id").primaryKey(),
  specialty: text("specialty").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).notNull(),
  growth: decimal("growth", { precision: 5, scale: 2 }).notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

export const ageDistribution = pgTable("age_distribution", {
  id: serial("id").primaryKey(),
  ageGroup: text("age_group").notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  count: integer("count").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'revenue', 'patient', 'capacity'
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(), // 'positive', 'neutral', 'warning'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
});

export const insertFinancialDataSchema = createInsertSchema(financialData).omit({
  id: true,
});

export const insertPatientDataSchema = createInsertSchema(patientData).omit({
  id: true,
});

export const insertRevenueBySpecialtySchema = createInsertSchema(revenueBySpecialty).omit({
  id: true,
});

export const insertAgeDistributionSchema = createInsertSchema(ageDistribution).omit({
  id: true,
});

export const insertInsightSchema = createInsertSchema(insights).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type FinancialData = typeof financialData.$inferSelect;
export type PatientData = typeof patientData.$inferSelect;
export type RevenueBySpecialty = typeof revenueBySpecialty.$inferSelect;
export type AgeDistribution = typeof ageDistribution.$inferSelect;
export type Insight = typeof insights.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type InsertFinancialData = z.infer<typeof insertFinancialDataSchema>;
export type InsertPatientData = z.infer<typeof insertPatientDataSchema>;
export type InsertRevenueBySpecialty = z.infer<typeof insertRevenueBySpecialtySchema>;
export type InsertAgeDistribution = z.infer<typeof insertAgeDistributionSchema>;
export type InsertInsight = z.infer<typeof insertInsightSchema>;
