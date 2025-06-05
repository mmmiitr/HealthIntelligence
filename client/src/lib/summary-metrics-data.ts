// Summary dashboard metrics and chart data (modularized)
import { TrendingUp, TrendingDown } from 'lucide-react';


export const summaryKeyMetrics = [
  {
    title: "Avg Revenue/Patient/Month",
    currentValue: "$180",
    forecastValue: "$200",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'revenue',
    icon: '',
  },
  {
    title: "Avg Cost/Patient/Month",
    currentValue: "$140",
    forecastValue: "$120",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'cost',
    icon: TrendingDown,
  },
  {
    title: "Active Panel Size",
    currentValue: "1500",
    forecastValue: "1800",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'cost',
    icon: TrendingUp,
  },
  {
    title: "% Enrolled In CCM",
    currentValue: "30%",
    forecastValue: "32%",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'cost',
    icon: '',

  },
  {
    title: "% Telemedicine Visits",
    currentValue: "30%",
    forecastValue: "35%",
    currentLabel: "MAY PROGRESS",
    forecastLabel: "JUN FORECAST",
    type: 'neutral',
    icon: '',
  },
  
  
];

export const summaryTrendsData = {
  monthly: {
    inControlHba1c: [
      { period: 'Jan ', value: 65, isForecast: false },
      { period: 'Feb ', value: 67, isForecast: false },
      { period: 'Mar ', value: 69, isForecast: false },
      { period: 'Apr ', value: 68, isForecast: false },
      { period: 'May ', value: 70, isForecast: false },
      { period: 'Jun ', value: 72, isForecast: true, lowerBand: 69, upperBand: 75 },
      { period: 'Jul ', value: 74, isForecast: true, lowerBand: 71, upperBand: 77 },
      { period: 'Aug ', value: 75, isForecast: true, lowerBand: 72, upperBand: 78 },
      { period: 'Sep ', value: 76, isForecast: true, lowerBand: 73, upperBand: 79 },
    ],
    underCCM: [
      { period: 'Jan ', value: 25, isForecast: false },
      { period: 'Feb ', value: 27, isForecast: false },
      { period: 'Mar ', value: 28, isForecast: false },
      { period: 'Apr ', value: 29, isForecast: false },
      { period: 'May ', value: 30, isForecast: false },
      { period: 'Jun ', value: 32, isForecast: true, lowerBand: 30, upperBand: 34 },
      { period: 'Jul ', value: 34, isForecast: true, lowerBand: 32, upperBand: 36 },
      { period: 'Aug ', value: 36, isForecast: true, lowerBand: 34, upperBand: 38 },
      { period: 'Sep ', value: 38, isForecast: true, lowerBand: 36, upperBand: 40 },
    ],
    edVisit: [
      { period: 'Jan ', value: 9.2, isForecast: false },
      { period: 'Feb ', value: 8.8, isForecast: false },
      { period: 'Mar ', value: 8.5, isForecast: false },
      { period: 'Apr ', value: 8.1, isForecast: false },
      { period: 'May ', value: 8.0, isForecast: false },
      { period: 'Jun ', value: 7.5, isForecast: true, lowerBand: 7.0, upperBand: 8.0 },
      { period: 'Jul ', value: 7.2, isForecast: true, lowerBand: 6.8, upperBand: 7.6 },
      { period: 'Aug ', value: 6.9, isForecast: true, lowerBand: 6.5, upperBand: 7.3 },
      { period: 'Sep ', value: 6.6, isForecast: true, lowerBand: 6.2, upperBand: 7.0 },
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
      { period: 'Q4 2025', value: 74, isForecast: true, lowerBand: 71, upperBand: 77 },
      { period: 'Q1 2026', value: 75, isForecast: true, lowerBand: 72, upperBand: 78 },
    ],
    underCCM: [
      { period: 'Q1 2024', value: 22, isForecast: false },
      { period: 'Q2 2024', value: 24, isForecast: false },
      { period: 'Q3 2024', value: 26, isForecast: false },
      { period: 'Q4 2024', value: 28, isForecast: false },
      { period: 'Q1 2025', value: 29, isForecast: false },
      { period: 'Q2 2025', value: 31, isForecast: true, lowerBand: 29, upperBand: 33 },
      { period: 'Q3 2025', value: 33, isForecast: true, lowerBand: 31, upperBand: 35 },
      { period: 'Q4 2025', value: 35, isForecast: true, lowerBand: 33, upperBand: 37 },
      { period: 'Q1 2026', value: 37, isForecast: true, lowerBand: 35, upperBand: 39 },
    ],
    edVisit: [
      { period: 'Q1 2024', value: 10.1, isForecast: false },
      { period: 'Q2 2024', value: 9.8, isForecast: false },
      { period: 'Q3 2024', value: 9.2, isForecast: false },
      { period: 'Q4 2024', value: 8.8, isForecast: false },
      { period: 'Q1 2025', value: 8.3, isForecast: false },
      { period: 'Q2 2025', value: 7.8, isForecast: true, lowerBand: 7.2, upperBand: 8.4 },
      { period: 'Q3 2025', value: 7.4, isForecast: true, lowerBand: 6.8, upperBand: 8.0 },
      { period: 'Q4 2025', value: 7.0, isForecast: true, lowerBand: 6.4, upperBand: 7.6 },
      { period: 'Q1 2026', value: 6.6, isForecast: true, lowerBand: 6.0, upperBand: 7.2 },
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
      { period: '2027', value: 74, isForecast: true, lowerBand: 71, upperBand: 77 },
      { period: '2028', value: 75, isForecast: true, lowerBand: 72, upperBand: 78 },
    ],
    underCCM: [
      { period: '2021', value: 18, isForecast: false },
      { period: '2022', value: 21, isForecast: false },
      { period: '2023', value: 24, isForecast: false },
      { period: '2024', value: 27, isForecast: false },
      { period: '2025', value: 30, isForecast: true, lowerBand: 28, upperBand: 32 },
      { period: '2026', value: 33, isForecast: true, lowerBand: 31, upperBand: 35 },
      { period: '2027', value: 36, isForecast: true, lowerBand: 34, upperBand: 38 },
      { period: '2028', value: 39, isForecast: true, lowerBand: 37, upperBand: 41 },
    ],
    edVisit: [
      { period: '2021', value: 11.2, isForecast: false },
      { period: '2022', value: 10.5, isForecast: false },
      { period: '2023', value: 9.8, isForecast: false },
      { period: '2024', value: 8.9, isForecast: false },
      { period: '2025', value: 8.2, isForecast: true, lowerBand: 7.6, upperBand: 8.8 },
      { period: '2026', value: 7.5, isForecast: true, lowerBand: 6.9, upperBand: 8.1 },
      { period: '2027', value: 6.8, isForecast: true, lowerBand: 6.2, upperBand: 7.4 },
      { period: '2028', value: 6.1, isForecast: true, lowerBand: 5.5, upperBand: 6.7 },
    ],
  },
};

export const getSummaryTrends = (viewMode: string) => {
  return summaryTrendsData[viewMode as keyof typeof summaryTrendsData] || summaryTrendsData.monthly;
};
