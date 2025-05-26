import { 
  users, departments, financialData, patientData, revenueBySpecialty, 
  ageDistribution, insights,
  type User, type InsertUser, type Department, type FinancialData, 
  type PatientData, type RevenueBySpecialty, type AgeDistribution, type Insight 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDepartments(): Promise<Department[]>;
  getFinancialData(filter?: string): Promise<FinancialData[]>;
  getPatientData(filter?: string): Promise<PatientData[]>;
  getRevenueBySpecialty(filter?: string): Promise<RevenueBySpecialty[]>;
  getAgeDistribution(filter?: string): Promise<AgeDistribution[]>;
  getInsights(filter?: string): Promise<Insight[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private departments: Department[];
  private financialDataList: FinancialData[];
  private patientDataList: PatientData[];
  private revenueBySpecialtyList: RevenueBySpecialty[];
  private ageDistributionList: AgeDistribution[];
  private insightsList: Insight[];
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.initializeHealthcareData();
  }

  private initializeHealthcareData() {
    // Initialize departments
    this.departments = [
      { id: 1, name: "Cardiology", revenue: "450000.00", cost: "320000.00", patientCount: 1250, satisfaction: "94.2" },
      { id: 2, name: "Orthopedics", revenue: "380000.00", cost: "280000.00", patientCount: 980, satisfaction: "91.8" },
      { id: 3, name: "Neurology", revenue: "320000.00", cost: "240000.00", patientCount: 720, satisfaction: "93.5" },
      { id: 4, name: "Pediatrics", revenue: "280000.00", cost: "200000.00", patientCount: 1580, satisfaction: "96.1" },
      { id: 5, name: "Emergency", revenue: "350000.00", cost: "290000.00", patientCount: 2100, satisfaction: "89.4" },
      { id: 6, name: "Dermatology", revenue: "220000.00", cost: "160000.00", patientCount: 850, satisfaction: "92.7" }
    ];

    // Initialize financial data (historical and predicted)
    this.financialDataList = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Historical data (previous 12 months)
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      const baseRevenue = 2000000 + (Math.random() * 400000);
      const baseCost = baseRevenue * 0.75;
      
      this.financialDataList.push({
        id: this.financialDataList.length + 1,
        month: months[monthIndex],
        year,
        totalRevenue: baseRevenue.toFixed(2),
        operatingCosts: baseCost.toFixed(2),
        netProfit: (baseRevenue - baseCost).toFixed(2),
        costPerPatient: (baseCost / 4800).toFixed(2),
        isPredicted: false
      });
    }

    // Current month
    this.financialDataList.push({
      id: this.financialDataList.length + 1,
      month: months[currentMonth],
      year: currentYear,
      totalRevenue: "2400000.00",
      operatingCosts: "1800000.00",
      netProfit: "600000.00",
      costPerPatient: "485.00",
      isPredicted: false
    });

    // Predicted data (next 6 months)
    for (let i = 1; i <= 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentMonth + i > 11 ? currentYear + 1 : currentYear;
      const growth = 1 + (i * 0.02); // 2% growth per month
      const baseRevenue = 2400000 * growth;
      const baseCost = baseRevenue * 0.73; // Improving efficiency
      
      this.financialDataList.push({
        id: this.financialDataList.length + 1,
        month: months[monthIndex],
        year,
        totalRevenue: baseRevenue.toFixed(2),
        operatingCosts: baseCost.toFixed(2),
        netProfit: (baseRevenue - baseCost).toFixed(2),
        costPerPatient: (baseCost / (4800 + i * 100)).toFixed(2),
        isPredicted: true
      });
    }

    // Initialize patient data
    this.patientDataList = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      const totalPatients = 4500 + Math.floor(Math.random() * 600);
      const newPatients = Math.floor(totalPatients * 0.25);
      
      this.patientDataList.push({
        id: this.patientDataList.length + 1,
        month: months[monthIndex],
        year,
        totalPatients,
        newPatients,
        existingPatients: totalPatients - newPatients,
        retention: (72 + Math.random() * 8).toFixed(1),
        isPredicted: false
      });
    }

    // Current month patient data
    this.patientDataList.push({
      id: this.patientDataList.length + 1,
      month: months[currentMonth],
      year: currentYear,
      totalPatients: 4847,
      newPatients: 1234,
      existingPatients: 3613,
      retention: "74.5",
      isPredicted: false
    });

    // Revenue by specialty data
    this.revenueBySpecialtyList = [];
    const specialties = ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Emergency", "Dermatology"];
    const revenueData = [450, 380, 320, 280, 350, 220];
    const growthData = [15, 8, 12, 22, 15, 18];

    specialties.forEach((specialty, index) => {
      this.revenueBySpecialtyList.push({
        id: index + 1,
        specialty,
        revenue: (revenueData[index] * 1000).toFixed(2),
        growth: growthData[index].toFixed(1),
        month: months[currentMonth],
        year: currentYear
      });
    });

    // Age distribution data
    this.ageDistributionList = [
      { id: 1, ageGroup: "0-18 years", percentage: "18.0", count: 872, month: months[currentMonth], year: currentYear },
      { id: 2, ageGroup: "19-35 years", percentage: "28.0", count: 1357, month: months[currentMonth], year: currentYear },
      { id: 3, ageGroup: "36-50 years", percentage: "24.0", count: 1163, month: months[currentMonth], year: currentYear },
      { id: 4, ageGroup: "51-65 years", percentage: "20.0", count: 969, month: months[currentMonth], year: currentYear },
      { id: 5, ageGroup: "65+ years", percentage: "10.0", count: 485, month: months[currentMonth], year: currentYear }
    ];

    // AI insights
    this.insightsList = [
      {
        id: 1,
        type: "revenue",
        title: "Revenue Optimization",
        description: "Cardiology department shows 15% growth potential. Consider increasing appointment slots during peak hours (10 AM - 2 PM).",
        impact: "positive",
        createdAt: new Date()
      },
      {
        id: 2,
        type: "patient",
        title: "Patient Retention",
        description: "92% patient satisfaction in Pediatrics. Implement similar care protocols in other departments.",
        impact: "positive",
        createdAt: new Date()
      },
      {
        id: 3,
        type: "capacity",
        title: "Capacity Alert",
        description: "Emergency department reaching 85% capacity. Consider staff reallocation for next 3 months.",
        impact: "warning",
        createdAt: new Date()
      }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDepartments(): Promise<Department[]> {
    return this.departments;
  }

  async getFinancialData(filter?: string): Promise<FinancialData[]> {
    // In a real implementation, filter would affect the data
    return this.financialDataList;
  }

  async getPatientData(filter?: string): Promise<PatientData[]> {
    return this.patientDataList;
  }

  async getRevenueBySpecialty(filter?: string): Promise<RevenueBySpecialty[]> {
    return this.revenueBySpecialtyList;
  }

  async getAgeDistribution(filter?: string): Promise<AgeDistribution[]> {
    return this.ageDistributionList;
  }

  async getInsights(filter?: string): Promise<Insight[]> {
    return this.insightsList;
  }
}

export const storage = new MemStorage();
