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
    { month: 'Jan', value: 65, range: [65, 65] },
    { month: 'Feb', value: 67, range: [67, 67] },
    { month: 'Mar', value: 69, range: [69, 69] },
    { month: 'Apr', value: 68, range: [68, 68] },
    { month: 'May', value: 70, range: [70, 70] },
    { month: 'Jun', value: 72, range: [69, 75] },
    { month: 'Jul', value: 74, range: [71, 77] },
  ],
  underCCM: [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 27 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 29 },
    { month: 'May', value: 30 },
    { month: 'Jun', value: 32 },
    { month: 'Jul', value: 34 },
  ],
  edVisit: [
    { month: 'Jan', value: 9.2 },
    { month: 'Feb', value: 8.8 },
    { month: 'Mar', value: 8.5 },
    { month: 'Apr', value: 8.1 },
    { month: 'May', value: 8.0 },
    { month: 'Jun', value: 7.5 },
    { month: 'Jul', value: 7.2 },
  ],
};
