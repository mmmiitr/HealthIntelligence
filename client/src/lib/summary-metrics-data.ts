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

export const summaryTrends = {
  inControlHba1c: [
    { month: 'Jan', value: 65, isForecast: false },
    { month: 'Feb', value: 67, isForecast: false },
    { month: 'Mar', value: 69, isForecast: false },
    { month: 'Apr', value: 68, isForecast: false },
    { month: 'May', value: 70, isForecast: false },
    { month: 'Jun', value: 72, isForecast: true, lowerBand: 69, upperBand: 75 },
    { month: 'Jul', value: 74, isForecast: true, lowerBand: 71, upperBand: 77 },
  ],
  underCCM: [
    { month: 'Jan', value: 25, isForecast: false },
    { month: 'Feb', value: 27, isForecast: false },
    { month: 'Mar', value: 28, isForecast: false },
    { month: 'Apr', value: 29, isForecast: false },
    { month: 'May', value: 30, isForecast: false },
    { month: 'Jun', value: 32, isForecast: true, lowerBand: 30, upperBand: 34 },
    { month: 'Jul', value: 34, isForecast: true, lowerBand: 32, upperBand: 36 },
  ],
  edVisit: [
    { month: 'Jan', value: 9.2, isForecast: false },
    { month: 'Feb', value: 8.8, isForecast: false },
    { month: 'Mar', value: 8.5, isForecast: false },
    { month: 'Apr', value: 8.1, isForecast: false },
    { month: 'May', value: 8.0, isForecast: false },
    { month: 'Jun', value: 7.5, isForecast: true, lowerBand: 7.0, upperBand: 8.0 },
    { month: 'Jul', value: 7.2, isForecast: true, lowerBand: 6.8, upperBand: 7.6 },
  ],
};
