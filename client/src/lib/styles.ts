// Professional Design System - DRY and reusable
export const styles = {
  // Layout sections with optimized spacing
  section: "mb-6",
  sectionTight: "mb-4", 
  grid: {
    cols2: "grid grid-cols-1 md:grid-cols-2 gap-4",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", 
    cols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  },
  
  // Professional Typography
  heading: {
    h1: "text-3xl font-bold text-gray-900 tracking-tight mb-3",
    h2: "text-2xl font-bold text-gray-900 mb-2 tracking-tight",
    h3: "text-xl font-bold text-gray-900 mb-4 tracking-tight",
    subtitle: "text-base text-gray-600 leading-relaxed",
    sectionTitle: "text-xl font-bold text-gray-900 mb-1",
    sectionSubtitle: "text-sm text-gray-600 mb-4"
  },
  
  // Professional Cards with proper spacing
  card: {
    base: "bg-white rounded-xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl",
    metric: "bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300",
    chart: "bg-white rounded-xl shadow-lg border border-gray-200 p-6",
    title: "text-xl font-bold text-gray-900 mb-2",
    value: "text-4xl font-bold tracking-tight",
    forecast: "text-2xl font-bold tracking-tight", 
    label: "text-xs font-bold text-gray-500 uppercase tracking-widest"
  },
  
  // Enhanced Metric styling with stronger visual identity
  metric: {
    profit: {
      border: "border-l-4 border-l-green-500",
      text: "text-green-700",
      bg: "bg-green-50"
    },
    revenue: {
      border: "border-l-4 border-l-blue-500", 
      text: "text-blue-700",
      bg: "bg-blue-50"
    },
    cost: {
      border: "border-l-4 border-l-red-500",
      text: "text-red-700",
      bg: "bg-red-50"
    },
    neutral: {
      border: "border-l-4 border-l-gray-400",
      text: "text-gray-900",
      bg: "bg-gray-50"
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