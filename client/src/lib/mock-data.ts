// Mock data for diabetes care management dashboard

export const revenueData = [
  { month: 'Jul 2024', revenue: 850000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Aug 2024', revenue: 920000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Sep 2024', revenue: 880000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Oct 2024', revenue: 950000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Nov 2024', revenue: 1000000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Dec 2024', revenue: 1050000, predictedRevenue: null, lowerCI: null, upperCI: null },
  { month: 'Jan 2025', revenue: null, predictedRevenue: 1120000, lowerCI: 1070000, upperCI: 1170000 },
  { month: 'Feb 2025', revenue: null, predictedRevenue: 1150000, lowerCI: 1100000, upperCI: 1200000 },
  { month: 'Mar 2025', revenue: null, predictedRevenue: 1180000, lowerCI: 1130000, upperCI: 1230000 },
  { month: 'Apr 2025', revenue: null, predictedRevenue: 1210000, lowerCI: 1160000, upperCI: 1260000 },
];

export const hba1cData = [
  { month: 'Jul 2024', avgHbA1c: 7.8, predictedHbA1c: null },
  { month: 'Aug 2024', avgHbA1c: 7.6, predictedHbA1c: null },
  { month: 'Sep 2024', avgHbA1c: 7.4, predictedHbA1c: null },
  { month: 'Oct 2024', avgHbA1c: 7.2, predictedHbA1c: null },
  { month: 'Nov 2024', avgHbA1c: 7.0, predictedHbA1c: null },
  { month: 'Dec 2024', avgHbA1c: 6.9, predictedHbA1c: null },
  { month: 'Jan 2025', avgHbA1c: null, predictedHbA1c: 6.8 },
  { month: 'Feb 2025', avgHbA1c: null, predictedHbA1c: 6.7 },
  { month: 'Mar 2025', avgHbA1c: null, predictedHbA1c: 6.6 },
  { month: 'Apr 2025', avgHbA1c: null, predictedHbA1c: 6.5 },
];

export const visitsData = [
  { month: 'Jul 2024', patientId: 'P001', visitCount: 2, predictedVisitCount: null },
  { month: 'Aug 2024', patientId: 'P002', visitCount: 1, predictedVisitCount: null },
  { month: 'Sep 2024', patientId: 'P003', visitCount: 3, predictedVisitCount: null },
  { month: 'Oct 2024', patientId: 'P004', visitCount: 2, predictedVisitCount: null },
  { month: 'Nov 2024', patientId: 'P005', visitCount: 4, predictedVisitCount: null },
  { month: 'Dec 2024', patientId: 'P006', visitCount: 2, predictedVisitCount: null },
  { month: 'Jan 2025', patientId: 'P007', visitCount: null, predictedVisitCount: 3 },
  { month: 'Feb 2025', patientId: 'P008', visitCount: null, predictedVisitCount: 2 },
  { month: 'Mar 2025', patientId: 'P009', visitCount: null, predictedVisitCount: 3 },
  { month: 'Apr 2025', patientId: 'P010', visitCount: null, predictedVisitCount: 2 },
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

// Additional considerations for future data integration
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
    category: 'Outcome Metrics',
    items: [
      'Emergency department visits',
      'Hospitalization rates',
      'Quality of life scores',
      'Patient satisfaction ratings'
    ]
  }
];