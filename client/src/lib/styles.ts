// Clean Design System - DRY and reusable
export const styles = {
  // Layout
  section: "mb-8",
  grid: {
    cols2: "grid grid-cols-1 md:grid-cols-2 gap-6",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", 
    cols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  },
  
  // Typography
  heading: {
    h1: "text-4xl font-bold text-gray-900 tracking-tight",
    h2: "text-3xl font-bold text-gray-900 mb-2",
    h3: "text-2xl font-bold text-gray-900 mb-4",
    subtitle: "text-gray-600"
  },
  
  // Cards
  card: {
    base: "bg-white rounded-lg shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl",
    metric: "bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300",
    title: "text-lg font-bold text-gray-900",
    value: "text-3xl font-bold",
    label: "text-xs font-bold text-gray-500 uppercase tracking-widest"
  },
  
  // Metric colors and borders
  metric: {
    profit: {
      border: "border-l-4 border-l-green-500",
      text: "text-green-700"
    },
    revenue: {
      border: "border-l-4 border-l-blue-500", 
      text: "text-blue-700"
    },
    cost: {
      border: "border-l-4 border-l-red-500",
      text: "text-red-700"
    },
    neutral: {
      border: "border-l-4 border-l-gray-400",
      text: "text-gray-900"
    }
  }
};

// Chart colors
export const chartColors = {
  primary: '#1976d2',
  success: '#4caf50', 
  warning: '#ff9800',
  danger: '#f44336',
  purple: '#9c27b0'
};

export const pieColors = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'];