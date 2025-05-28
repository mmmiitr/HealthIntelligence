// Mock data for diabetes care management dashboard

export const revenueData = [
  { month: 'Jan 2025', revenue: 850000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Feb 2025', revenue: 920000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Mar 2025', revenue: 880000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Apr 2025', revenue: 950000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'May 2025', revenue: 1000000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Jun 2025', revenue: null, predictedRevenue: 1120000, lowerCI: 1070000, upperCI: 1170000 },
  { month: 'Jul 2025', revenue: null, predictedRevenue: 1150000, lowerCI: 1100000, upperCI: 1200000 },
  { month: 'Aug 2025', revenue: null, predictedRevenue: 1180000, lowerCI: 1130000, upperCI: 1230000 },
  { month: 'Sep 2025', revenue: null, predictedRevenue: 1210000, lowerCI: 1160000, upperCI: 1260000 },
  { month: 'Oct 2025', revenue: null, predictedRevenue: 1240000, lowerCI: 1190000, upperCI: 1290000 },
];

export const hba1cData = [
  { month: 'Jan 2025', avgHbA1c: 7.8, predictedHbA1c: null },
  { month: 'Feb 2025', avgHbA1c: 7.6, predictedHbA1c: null },
  { month: 'Mar 2025', avgHbA1c: 7.4, predictedHbA1c: null },
  { month: 'Apr 2025', avgHbA1c: 7.2, predictedHbA1c: null },
  { month: 'May 2025', avgHbA1c: 7.0, predictedHbA1c: null },
  { month: 'Jun 2025', avgHbA1c: null, predictedHbA1c: 6.8 },
  { month: 'Jul 2025', avgHbA1c: null, predictedHbA1c: 6.7 },
  { month: 'Aug 2025', avgHbA1c: null, predictedHbA1c: 6.6 },
  { month: 'Sep 2025', avgHbA1c: null, predictedHbA1c: 6.5 },
  { month: 'Oct 2025', avgHbA1c: null, predictedHbA1c: 6.4 },
];

export const visitsData = [
  { month: 'Jan 2025', patientId: 'P001', visitCount: 2, predictedVisitCount: null },
  { month: 'Feb 2025', patientId: 'P002', visitCount: 1, predictedVisitCount: null },
  { month: 'Mar 2025', patientId: 'P003', visitCount: 3, predictedVisitCount: null },
  { month: 'Apr 2025', patientId: 'P004', visitCount: 2, predictedVisitCount: null },
  { month: 'May 2025', patientId: 'P005', visitCount: 4, predictedVisitCount: null },
  { month: 'Jun 2025', patientId: 'P006', visitCount: null, predictedVisitCount: 3 },
  { month: 'Jul 2025', patientId: 'P007', visitCount: null, predictedVisitCount: 2 },
  { month: 'Aug 2025', patientId: 'P008', visitCount: null, predictedVisitCount: 3 },
  { month: 'Sep 2025', patientId: 'P009', visitCount: null, predictedVisitCount: 2 },
  { month: 'Oct 2025', patientId: 'P010', visitCount: null, predictedVisitCount: 3 },
];

// New datasets for profitability and care management features
export const populationMetricsData = [
  { month: 'Jan 2025', chronicPatients: 500, newPatients: 50, inControlHbA1c: 65, readmissionRate: 8, noShowRate: 12, avgVisits: 2, telemedicineVisits: 30, highRisk: 20, ccmEnrolled: 75, ccmRevenue: 150 },
  { month: 'Feb 2025', chronicPatients: 520, newPatients: 45, inControlHbA1c: 67, readmissionRate: 7, noShowRate: 11, avgVisits: 2.1, telemedicineVisits: 32, highRisk: 19, ccmEnrolled: 78, ccmRevenue: 155 },
  { month: 'Mar 2025', chronicPatients: 535, newPatients: 48, inControlHbA1c: 68, readmissionRate: 6, noShowRate: 10, avgVisits: 2.2, telemedicineVisits: 35, highRisk: 18, ccmEnrolled: 80, ccmRevenue: 160 },
  { month: 'Apr 2025', chronicPatients: 550, newPatients: 52, inControlHbA1c: 70, readmissionRate: 6, noShowRate: 9, avgVisits: 2.3, telemedicineVisits: 38, highRisk: 17, ccmEnrolled: 82, ccmRevenue: 165 },
  { month: 'May 2025', chronicPatients: 565, newPatients: 55, inControlHbA1c: 72, readmissionRate: 5, noShowRate: 8, avgVisits: 2.4, telemedicineVisits: 40, highRisk: 16, ccmEnrolled: 85, ccmRevenue: 170 },
  { month: 'Jun 2025', chronicPatients: 580, newPatients: 58, inControlHbA1c: 74, readmissionRate: 5, noShowRate: 7, avgVisits: 2.5, telemedicineVisits: 42, highRisk: 15, ccmEnrolled: 87, ccmRevenue: 175 },
  { month: 'Jul 2025', chronicPatients: 595, newPatients: 60, inControlHbA1c: 75, readmissionRate: 4, noShowRate: 7, avgVisits: 2.6, telemedicineVisits: 45, highRisk: 14, ccmEnrolled: 90, ccmRevenue: 180 },
  { month: 'Aug 2025', chronicPatients: 610, newPatients: 62, inControlHbA1c: 76, readmissionRate: 4, noShowRate: 6, avgVisits: 2.7, telemedicineVisits: 47, highRisk: 13, ccmEnrolled: 92, ccmRevenue: 185 },
  { month: 'Sep 2025', chronicPatients: 625, newPatients: 65, inControlHbA1c: 78, readmissionRate: 3, noShowRate: 6, avgVisits: 2.8, telemedicineVisits: 50, highRisk: 12, ccmEnrolled: 95, ccmRevenue: 190 },
  { month: 'Oct 2025', chronicPatients: 640, newPatients: 68, inControlHbA1c: 80, readmissionRate: 3, noShowRate: 5, avgVisits: 2.9, telemedicineVisits: 52, highRisk: 11, ccmEnrolled: 97, ccmRevenue: 195 }
];

export const financialMetricsData = [
  { month: 'Jan 2025', reimbursement: 200, cost: 120, actualCost: 130, payerMix: { medicare: 40, medicaid: 20, private: 30, other: 10 } },
  { month: 'Feb 2025', reimbursement: 205, cost: 122, actualCost: 128, payerMix: { medicare: 42, medicaid: 18, private: 32, other: 8 } },
  { month: 'Mar 2025', reimbursement: 210, cost: 125, actualCost: 135, payerMix: { medicare: 45, medicaid: 17, private: 30, other: 8 } },
  { month: 'Apr 2025', reimbursement: 215, cost: 128, actualCost: 140, payerMix: { medicare: 43, medicaid: 19, private: 28, other: 10 } },
  { month: 'May 2025', reimbursement: 220, cost: 130, actualCost: 138, payerMix: { medicare: 41, medicaid: 21, private: 31, other: 7 } },
  { month: 'Jun 2025', reimbursement: 225, cost: 132, actualCost: 142, payerMix: { medicare: 44, medicaid: 20, private: 29, other: 7 } },
  { month: 'Jul 2025', reimbursement: 230, cost: 135, actualCost: 145, payerMix: { medicare: 46, medicaid: 18, private: 27, other: 9 } },
  { month: 'Aug 2025', reimbursement: 235, cost: 138, actualCost: 148, payerMix: { medicare: 48, medicaid: 16, private: 28, other: 8 } },
  { month: 'Sep 2025', reimbursement: 240, cost: 140, actualCost: 150, payerMix: { medicare: 47, medicaid: 17, private: 30, other: 6 } },
  { month: 'Oct 2025', reimbursement: 245, cost: 142, actualCost: 152, payerMix: { medicare: 45, medicaid: 19, private: 31, other: 5 } }
];

export const providerWorkloadData = [
  { month: 'Jan 2025', panelSize: 150, nextApptDays: 3, thirdNextApptDays: 7 },
  { month: 'Feb 2025', panelSize: 152, nextApptDays: 2.8, thirdNextApptDays: 6.5 },
  { month: 'Mar 2025', panelSize: 155, nextApptDays: 2.5, thirdNextApptDays: 6 },
  { month: 'Apr 2025', panelSize: 158, nextApptDays: 2.2, thirdNextApptDays: 5.5 },
  { month: 'May 2025', panelSize: 160, nextApptDays: 2, thirdNextApptDays: 5 },
  { month: 'Jun 2025', panelSize: 162, nextApptDays: 1.8, thirdNextApptDays: 4.5 },
  { month: 'Jul 2025', panelSize: 165, nextApptDays: 1.5, thirdNextApptDays: 4 },
  { month: 'Aug 2025', panelSize: 168, nextApptDays: 1.3, thirdNextApptDays: 3.5 },
  { month: 'Sep 2025', panelSize: 170, nextApptDays: 1.2, thirdNextApptDays: 3 },
  { month: 'Oct 2025', panelSize: 172, nextApptDays: 1, thirdNextApptDays: 2.5 }
];

export const predictionsData = [
  { month: 'Jan 2025', predictedHbA1c: 7.0, predictedVisits: 3, predictedRevenueMedicare: 5000, predictedRevenuePrivate: 3000 },
  { month: 'Feb 2025', predictedHbA1c: 6.9, predictedVisits: 3.1, predictedRevenueMedicare: 5200, predictedRevenuePrivate: 3100 },
  { month: 'Mar 2025', predictedHbA1c: 6.8, predictedVisits: 3.2, predictedRevenueMedicare: 5400, predictedRevenuePrivate: 3200 },
  { month: 'Apr 2025', predictedHbA1c: 6.7, predictedVisits: 3.3, predictedRevenueMedicare: 5600, predictedRevenuePrivate: 3300 },
  { month: 'May 2025', predictedHbA1c: 6.6, predictedVisits: 3.4, predictedRevenueMedicare: 5800, predictedRevenuePrivate: 3400 },
  { month: 'Jun 2025', predictedHbA1c: 6.5, predictedVisits: 3.5, predictedRevenueMedicare: 6000, predictedRevenuePrivate: 3500 },
  { month: 'Jul 2025', predictedHbA1c: 6.4, predictedVisits: 3.6, predictedRevenueMedicare: 6200, predictedRevenuePrivate: 3600 },
  { month: 'Aug 2025', predictedHbA1c: 6.3, predictedVisits: 3.7, predictedRevenueMedicare: 6400, predictedRevenuePrivate: 3700 },
  { month: 'Sep 2025', predictedHbA1c: 6.2, predictedVisits: 3.8, predictedRevenueMedicare: 6600, predictedRevenuePrivate: 3800 },
  { month: 'Oct 2025', predictedHbA1c: 6.1, predictedVisits: 3.9, predictedRevenueMedicare: 6800, predictedRevenuePrivate: 3900 }
];

export const getFilteredData = (data: any[], timeFilter: string) => {
  const now = new Date();
  let filterMonths = 12;
  
  switch (timeFilter) {
    case '3months':
      filterMonths = 3;
      break;
    case '6months':
      filterMonths = 6;
      break;
    case '1year':
    default:
      filterMonths = 12;
      break;
  }
  
  return data.slice(-filterMonths);
};

// Additional considerations for future data integration (ADA 2024 Standards of Care)
export const additionalDataConsiderations = [
  {
    category: 'Clinical Data',
    items: [
      'Comorbidities (hypertension, cardiovascular disease)',
      'Medication adherence rates',
      'Laboratory values (lipid panels, kidney function)',
      'Vital signs trends'
    ]
  },
  {
    category: 'Operational Data',
    items: [
      'Payer mix (insurance types, coverage levels)',
      'Regional trends and demographics',
      'Seasonal patterns in care utilization',
      'Provider performance metrics'
    ]
  },
  {
    category: 'Social Determinants',
    items: [
      'Socioeconomic status indicators',
      'Geographic access to care',
      'Food security and nutrition data',
      'Technology access for remote monitoring'
    ]
  },
  {
    category: 'ADA 2024 Updates',
    items: [
      'Bone health risk factors (Section 4)',
      'Smoking and cannabis use status (Section 5)',
      'Medication-induced prediabetes risk (Section 2)',
      'CGM hypoglycemia prevention data (Section 6)'
    ]
  }
];