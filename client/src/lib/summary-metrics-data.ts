// Summary dashboard metrics and chart data (modularized)

export const summaryKeyMetrics = [
  {
    title: "Avg Revenue/Patient/Month",
    currentValue: "$120",
    forecastValue: "$128",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'revenue',
    icon: 'DollarSign',
  },
  {
    title: "% Under CCM",
    currentValue: "30%",
    forecastValue: "32%",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'neutral',
    icon: 'UserCheck',
  },
  {
    title: "% Telemedicine Visits",
    currentValue: "30%",
    forecastValue: "35%",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'neutral',
    icon: 'Monitor',
  },
  {
    title: "Avg Cost/Patient/Month",
    currentValue: "$85",
    forecastValue: "$87",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'cost',
    icon: 'Heart',
  },
];

export const summaryTrendsData = {
  monthly: {
    inControlHba1c: [
      { period: 'Jan 2025', value: 65, isForecast: false },
      { period: 'Feb 2025', value: 67, isForecast: false },
      { period: 'Mar 2025', value: 69, isForecast: false },
      { period: 'Apr 2025', value: 68, isForecast: false },
      { period: 'May 2025', value: 70, isForecast: false },
      { period: 'Jun 2025', value: 72, isForecast: true, lowerBand: 69, upperBand: 75 },
      { period: 'Jul 2025', value: 74, isForecast: true, lowerBand: 71, upperBand: 77 },
    ],
    underCCM: [
      { period: 'Jan 2025', value: 25, isForecast: false },
      { period: 'Feb 2025', value: 27, isForecast: false },
      { period: 'Mar 2025', value: 28, isForecast: false },
      { period: 'Apr 2025', value: 29, isForecast: false },
      { period: 'May 2025', value: 30, isForecast: false },
      { period: 'Jun 2025', value: 32, isForecast: true, lowerBand: 30, upperBand: 34 },
      { period: 'Jul 2025', value: 34, isForecast: true, lowerBand: 32, upperBand: 36 },
    ],
    edVisit: [
      { period: 'Jan 2025', value: 9.2, isForecast: false },
      { period: 'Feb 2025', value: 8.8, isForecast: false },
      { period: 'Mar 2025', value: 8.5, isForecast: false },
      { period: 'Apr 2025', value: 8.1, isForecast: false },
      { period: 'May 2025', value: 8.0, isForecast: false },
      { period: 'Jun 2025', value: 7.5, isForecast: true, lowerBand: 7.0, upperBand: 8.0 },
      { period: 'Jul 2025', value: 7.2, isForecast: true, lowerBand: 6.8, upperBand: 7.6 },
    ],
  },
  quarterly: {
    inControlHba1c: [
      { period: 'Q1 2024', value: 62, isForecast: false },
      { period: 'Q2 2024', value: 65, isForecast: false },
      { period: 'Q3 2024', value: 68, isForecast: false },
      { period: 'Q4 2024', value: 67, isForecast: false },
      { period: 'Q1 2025', value: 69, isForecast: false },
      { period: 'Q2 2025', value: 71, isForecast: true, lowerBand: 68, upperBand: 74 },
      { period: 'Q3 2025', value: 73, isForecast: true, lowerBand: 70, upperBand: 76 },
    ],
    underCCM: [
      { period: 'Q1 2024', value: 22, isForecast: false },
      { period: 'Q2 2024', value: 24, isForecast: false },
      { period: 'Q3 2024', value: 26, isForecast: false },
      { period: 'Q4 2024', value: 28, isForecast: false },
      { period: 'Q1 2025', value: 29, isForecast: false },
      { period: 'Q2 2025', value: 31, isForecast: true, lowerBand: 29, upperBand: 33 },
      { period: 'Q3 2025', value: 33, isForecast: true, lowerBand: 31, upperBand: 35 },
    ],
    edVisit: [
      { period: 'Q1 2024', value: 10.1, isForecast: false },
      { period: 'Q2 2024', value: 9.8, isForecast: false },
      { period: 'Q3 2024', value: 9.2, isForecast: false },
      { period: 'Q4 2024', value: 8.8, isForecast: false },
      { period: 'Q1 2025', value: 8.3, isForecast: false },
      { period: 'Q2 2025', value: 7.8, isForecast: true, lowerBand: 7.2, upperBand: 8.4 },
      { period: 'Q3 2025', value: 7.4, isForecast: true, lowerBand: 6.8, upperBand: 8.0 },
    ],
  },
  yearly: {
    inControlHba1c: [
      { period: '2021', value: 58, isForecast: false },
      { period: '2022', value: 61, isForecast: false },
      { period: '2023', value: 64, isForecast: false },
      { period: '2024', value: 67, isForecast: false },
      { period: '2025', value: 70, isForecast: true, lowerBand: 67, upperBand: 73 },
      { period: '2026', value: 72, isForecast: true, lowerBand: 69, upperBand: 75 },
    ],
    underCCM: [
      { period: '2021', value: 18, isForecast: false },
      { period: '2022', value: 21, isForecast: false },
      { period: '2023', value: 24, isForecast: false },
      { period: '2024', value: 27, isForecast: false },
      { period: '2025', value: 30, isForecast: true, lowerBand: 28, upperBand: 32 },
      { period: '2026', value: 33, isForecast: true, lowerBand: 31, upperBand: 35 },
    ],
    edVisit: [
      { period: '2021', value: 11.2, isForecast: false },
      { period: '2022', value: 10.5, isForecast: false },
      { period: '2023', value: 9.8, isForecast: false },
      { period: '2024', value: 8.9, isForecast: false },
      { period: '2025', value: 8.2, isForecast: true, lowerBand: 7.6, upperBand: 8.8 },
      { period: '2026', value: 7.5, isForecast: true, lowerBand: 6.9, upperBand: 8.1 },
    ],
  },
};

export const getSummaryTrends = (viewMode: string) => {
  return summaryTrendsData[viewMode as keyof typeof summaryTrendsData] || summaryTrendsData.monthly;
};
