// Design System for Healthcare Dashboard
// Consistent styling, typography, colors, and spacing

export const TYPOGRAPHY = {
  // Headers
  h1: "text-3xl font-bold text-gray-900 leading-tight",
  h2: "text-2xl font-bold text-gray-900 leading-tight", 
  h3: "text-xl font-semibold text-gray-900 leading-tight",
  h4: "text-lg font-semibold text-gray-900 leading-tight",
  h5: "text-base font-semibold text-gray-900 leading-tight",
  
  // Body text
  body: "text-sm text-gray-700 leading-relaxed",
  bodyLarge: "text-base text-gray-700 leading-relaxed",
  bodySmall: "text-xs text-gray-600 leading-relaxed",
  
  // Labels and captions
  label: "text-sm font-medium text-gray-600",
  caption: "text-xs text-gray-500",
  overline: "text-xs font-medium text-gray-500 uppercase tracking-wide",
  
  // Values and metrics
  metricLarge: "text-3xl font-bold text-gray-900",
  metricMedium: "text-2xl font-bold text-gray-900",
  metricSmall: "text-lg font-semibold text-gray-900",
  
  // Emphasis
  emphasis: "font-semibold text-gray-900",
  muted: "text-gray-500",
};

export const COLORS = {
  // Primary healthcare colors
  primary: {
    blue: "#1976d2",
    green: "#4caf50", 
    lightBlue: "#64b5f6",
    lightGreen: "#81c784",
  },
  
  // Semantic colors
  revenue: "#1976d2",    // Blue
  profit: "#4caf50",     // Green  
  cost: "#f44336",       // Red
  neutral: "#757575",    // Gray
  
  // Border colors
  border: {
    revenue: "border-blue-500",
    profit: "border-green-500", 
    cost: "border-red-500",
    neutral: "border-gray-400",
    primary: "border-blue-500",
  },
  
  // Background colors
  background: {
    white: "#ffffff",
    light: "#f8fafc",
    muted: "#f1f5f9",
  },
  
  // Text colors
  text: {
    primary: "#111827",
    secondary: "#374151", 
    muted: "#6b7280",
    light: "#9ca3af",
  }
};

export const SPACING = {
  // Card padding
  card: "p-6",
  cardSmall: "p-4",
  cardLarge: "p-8",
  
  // Margins and gaps
  section: "mb-8",
  subsection: "mb-6", 
  item: "mb-4",
  small: "mb-2",
  
  // Grid gaps
  gridGap: "gap-6",
  gridGapSmall: "gap-4",
  gridGapLarge: "gap-8",
};

export const LAYOUT = {
  // Container widths
  container: "max-w-7xl mx-auto",
  content: "px-4 sm:px-6 lg:px-8",
  
  // Grid layouts
  grid2: "grid grid-cols-1 md:grid-cols-2",
  grid3: "grid grid-cols-1 md:grid-cols-3", 
  grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  
  // Flexbox layouts
  flexBetween: "flex justify-between items-center",
  flexStart: "flex justify-start items-center",
  flexEnd: "flex justify-end items-center",
  flexCenter: "flex justify-center items-center",
  flexCol: "flex flex-col",
};

export const SHADOWS = {
  card: "shadow-sm border border-gray-200",
  cardHover: "shadow-md border border-gray-300",
  none: "shadow-none",
};

export const CHARTS = {
  // Chart colors for consistency
  colors: [
    "#1976d2", // Blue
    "#4caf50", // Green
    "#ff9800", // Orange
    "#f44336", // Red
    "#9c27b0", // Purple
    "#00bcd4", // Cyan
  ],
  
  // Chart dimensions
  height: {
    small: 200,
    medium: 300,
    large: 400,
  }
};

// Helper functions for consistent styling
export const getMetricCardClasses = (type: 'revenue' | 'profit' | 'cost' | 'neutral' = 'neutral') => ({
  container: `bg-white rounded-lg ${SHADOWS.card} ${SPACING.card}`,
  border: COLORS.border[type],
  title: TYPOGRAPHY.label,
  value: TYPOGRAPHY.metricMedium,
  subtitle: TYPOGRAPHY.caption,
});

export const getSectionClasses = () => ({
  container: SPACING.section,
  title: TYPOGRAPHY.h3,
  subtitle: TYPOGRAPHY.body,
});

export const getGridClasses = (columns: 2 | 3 | 4 = 4) => {
  const gridClass = columns === 2 ? LAYOUT.grid2 : 
                   columns === 3 ? LAYOUT.grid3 : 
                   LAYOUT.grid4;
  return `${gridClass} ${SPACING.gridGap}`;
};