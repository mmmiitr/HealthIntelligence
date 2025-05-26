// Healthcare data utilities and mock data generators
export interface FinancialMetrics {
  totalRevenue: string;
  operatingCosts: string;
  netProfit: string;
  costPerPatient: string;
}

export interface PerformanceMetrics {
  patientSatisfaction: string;
  averageWaitTime: string;
  staffUtilization: string;
  bedOccupancy: string;
}

export const generateFinancialProjections = (baseRevenue: number, months: number) => {
  const projections = [];
  const growthRate = 0.02; // 2% monthly growth
  
  for (let i = 1; i <= months; i++) {
    const revenue = baseRevenue * Math.pow(1 + growthRate, i);
    const costs = revenue * 0.73; // Improving cost efficiency
    
    projections.push({
      month: i,
      revenue: revenue,
      costs: costs,
      profit: revenue - costs,
      costPerPatient: costs / (4800 + i * 100)
    });
  }
  
  return projections;
};

export const calculateGrowthRate = (current: number, previous: number): string => {
  if (!previous || previous === 0) return "0.0";
  const growth = ((current - previous) / previous) * 100;
  return growth.toFixed(1);
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toFixed(0)}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getInsightIcon = (type: string): string => {
  switch (type) {
    case "revenue":
      return "trending-up";
    case "patient":
      return "users";
    case "capacity":
      return "alert-triangle";
    default:
      return "info";
  }
};

export const getInsightColor = (impact: string): string => {
  switch (impact) {
    case "positive":
      return "text-green-600";
    case "warning":
      return "text-orange-600";
    case "negative":
      return "text-red-600";
    default:
      return "text-blue-600";
  }
};
