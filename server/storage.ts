import { 
  users, adminMetrics, resourceUtilization, clinicalMetrics, a1cTrends, 
  riskDistribution, highRiskPatients, patientProfile, personalA1CHistory, educationalTips,
  type User, type InsertUser, type AdminMetrics, type ResourceUtilization,
  type ClinicalMetrics, type A1cTrends, type RiskDistribution, type HighRiskPatients,
  type PatientProfile, type PersonalA1CHistory, type EducationalTips
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin Dashboard Methods
  getAdminMetrics(timeFilter?: string): Promise<AdminMetrics[]>;
  getResourceUtilization(timeFilter?: string): Promise<ResourceUtilization[]>;
  
  // Clinician Dashboard Methods
  getClinicalMetrics(timeFilter?: string): Promise<ClinicalMetrics[]>;
  getA1cTrends(timeFilter?: string): Promise<A1cTrends[]>;
  getRiskDistribution(timeFilter?: string): Promise<RiskDistribution[]>;
  getHighRiskPatients(): Promise<HighRiskPatients[]>;
  
  // Patient Dashboard Methods
  getPatientProfile(): Promise<PatientProfile | undefined>;
  getPersonalA1CHistory(timeFilter?: string): Promise<PersonalA1CHistory[]>;
  getEducationalTips(): Promise<EducationalTips[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminMetricsList: AdminMetrics[] = [];
  private resourceUtilizationList: ResourceUtilization[] = [];
  private clinicalMetricsList: ClinicalMetrics[] = [];
  private a1cTrendsList: A1cTrends[] = [];
  private riskDistributionList: RiskDistribution[] = [];
  private highRiskPatientsList: HighRiskPatients[] = [];
  private patientProfileData: PatientProfile | null = null;
  private personalA1CHistoryList: PersonalA1CHistory[] = [];
  private educationalTipsList: EducationalTips[] = [];
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.initializeDiabetesData();
  }

  private initializeDiabetesData() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Admin Metrics - Revenue and cost data for diabetes care
    this.adminMetricsList = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      const baseRevenue = 850000 + (Math.random() * 150000); // Diabetes care revenue
      const costPerPatient = 420 + (Math.random() * 80);
      const bedOccupancy = 72 + (Math.random() * 15);
      
      this.adminMetricsList.push({
        id: this.adminMetricsList.length + 1,
        month: months[monthIndex],
        year,
        totalRevenue: Math.round(baseRevenue).toString(),
        costPerPatient: Math.round(costPerPatient).toString(),
        bedOccupancy: (Math.round(bedOccupancy * 10) / 10).toString(),
        isPredicted: false
      });
    }

    // Predicted admin metrics (next 6 months)
    for (let i = 1; i <= 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentMonth + i > 11 ? currentYear + 1 : currentYear;
      const growth = 1 + (i * 0.025); // 2.5% growth for diabetes care
      const baseRevenue = 950000 * growth;
      const costPerPatient = 485 + (i * 5); // Slightly increasing costs
      const bedOccupancy = 75 + (i * 0.5);
      
      this.adminMetricsList.push({
        id: this.adminMetricsList.length + 1,
        month: months[monthIndex],
        year,
        totalRevenue: Math.round(baseRevenue).toString(),
        costPerPatient: Math.round(costPerPatient).toString(),
        bedOccupancy: (Math.round(bedOccupancy * 10) / 10).toString(),
        isPredicted: true
      });
    }

    // Resource Utilization by Department
    const departments = ["Endocrinology", "Cardiology", "Nephrology", "Ophthalmology", "Podiatry"];
    this.resourceUtilizationList = departments.map((dept, index) => ({
      id: index + 1,
      department: dept,
      utilization: Math.round(65 + Math.random() * 25).toString(),
      month: months[currentMonth],
      year: currentYear
    }));

    // Clinical Metrics
    this.clinicalMetricsList = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      
      this.clinicalMetricsList.push({
        id: this.clinicalMetricsList.length + 1,
        month: months[monthIndex],
        year,
        averageA1C: (7.2 + (Math.random() * 0.8)).toFixed(2),
        adherenceRate: (78 + Math.random() * 12).toFixed(1),
        complicationRate: (12 + Math.random() * 6).toFixed(1)
      });
    }

    // A1C Trends
    this.a1cTrendsList = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      
      this.a1cTrendsList.push({
        id: this.a1cTrendsList.length + 1,
        month: months[monthIndex],
        year,
        averageA1C: (7.1 + (Math.random() * 0.9)).toFixed(2),
        patientCount: 850 + Math.floor(Math.random() * 200)
      });
    }

    // Risk Distribution
    this.riskDistributionList = [
      { id: 1, riskLevel: "Low", percentage: "45.0", count: 382, month: months[currentMonth], year: currentYear },
      { id: 2, riskLevel: "Medium", percentage: "35.0", count: 297, month: months[currentMonth], year: currentYear },
      { id: 3, riskLevel: "High", percentage: "20.0", count: 170, month: months[currentMonth], year: currentYear }
    ];

    // High Risk Patients
    this.highRiskPatientsList = [
      { id: 1, patientName: "Maria Rodriguez", a1c: "9.2", lastVisit: "2025-01-15", riskFactors: "Poor adherence, hypertension" },
      { id: 2, patientName: "James Wilson", a1c: "8.8", lastVisit: "2025-01-20", riskFactors: "Cardiovascular disease, obesity" },
      { id: 3, patientName: "Sarah Chen", a1c: "9.5", lastVisit: "2025-01-12", riskFactors: "Kidney complications, smoking" },
      { id: 4, patientName: "Michael Brown", a1c: "8.9", lastVisit: "2025-01-18", riskFactors: "Eye complications, poor diet" },
      { id: 5, patientName: "Linda Davis", a1c: "9.1", lastVisit: "2025-01-22", riskFactors: "Neuropathy, medication non-compliance" }
    ];

    // Patient Profile (John Doe)
    this.patientProfileData = {
      id: 1,
      patientName: "John Doe",
      currentA1C: "7.8",
      nextAppointment: "March 15, 2025",
      medicationAdherence: "82.5"
    } as PatientProfile;

    // Personal A1C History for John Doe
    this.personalA1CHistoryList = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      
      this.personalA1CHistoryList.push({
        id: this.personalA1CHistoryList.length + 1,
        month: months[monthIndex],
        year,
        a1c: (7.2 + (Math.random() * 1.2)).toFixed(1),
        patientId: 1
      });
    }

    // Educational Tips
    this.educationalTipsList = [
      {
        id: 1,
        category: "diet",
        title: "Carbohydrate Counting",
        description: "Monitor your carb intake and maintain consistent portions at each meal to help stabilize blood sugar levels.",
        isActive: true
      },
      {
        id: 2,
        category: "exercise",
        title: "Regular Physical Activity",
        description: "Aim for 150 minutes of moderate aerobic activity per week. Even a 10-minute walk after meals can help lower blood sugar.",
        isActive: true
      },
      {
        id: 3,
        category: "medication",
        title: "Medication Timing",
        description: "Take your diabetes medications at the same time each day. Use phone alarms or pill organizers to maintain consistency.",
        isActive: true
      },
      {
        id: 4,
        category: "diet",
        title: "Portion Control",
        description: "Use the plate method: fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with whole grains.",
        isActive: true
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

  // Admin Dashboard Methods
  async getAdminMetrics(timeFilter?: string): Promise<AdminMetrics[]> {
    if (timeFilter) {
      // Filter based on time period
      const monthsToShow = timeFilter === "3months" ? 3 : timeFilter === "6months" ? 6 : 12;
      return this.adminMetricsList.slice(-monthsToShow);
    }
    return this.adminMetricsList;
  }

  async getResourceUtilization(timeFilter?: string): Promise<ResourceUtilization[]> {
    return this.resourceUtilizationList;
  }

  // Clinician Dashboard Methods
  async getClinicalMetrics(timeFilter?: string): Promise<ClinicalMetrics[]> {
    if (timeFilter) {
      const monthsToShow = timeFilter === "3months" ? 3 : timeFilter === "6months" ? 6 : 12;
      return this.clinicalMetricsList.slice(-monthsToShow);
    }
    return this.clinicalMetricsList;
  }

  async getA1cTrends(timeFilter?: string): Promise<A1cTrends[]> {
    if (timeFilter) {
      const monthsToShow = timeFilter === "3months" ? 3 : timeFilter === "6months" ? 6 : 12;
      return this.a1cTrendsList.slice(-monthsToShow);
    }
    return this.a1cTrendsList;
  }

  async getRiskDistribution(timeFilter?: string): Promise<RiskDistribution[]> {
    return this.riskDistributionList;
  }

  async getHighRiskPatients(): Promise<HighRiskPatients[]> {
    return this.highRiskPatientsList;
  }

  // Patient Dashboard Methods
  async getPatientProfile(): Promise<PatientProfile | undefined> {
    return this.patientProfileData || undefined;
  }

  async getPersonalA1CHistory(timeFilter?: string): Promise<PersonalA1CHistory[]> {
    if (timeFilter) {
      const monthsToShow = timeFilter === "3months" ? 3 : timeFilter === "6months" ? 6 : 12;
      return this.personalA1CHistoryList.slice(-monthsToShow);
    }
    return this.personalA1CHistoryList;
  }

  async getEducationalTips(): Promise<EducationalTips[]> {
    return this.educationalTipsList.filter(tip => tip.isActive);
  }
}

export const storage = new MemStorage();
