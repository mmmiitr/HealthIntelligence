// Simplified Design System
export const CARD_STYLES = {
  base: "bg-white rounded-lg shadow-lg border border-gray-200 p-6 transition-all duration-300",
  hover: "hover:shadow-xl",
  
  // Border colors for different metric types
  borders: {
    profit: "border-l-4 border-l-green-500",
    revenue: "border-l-4 border-l-blue-500", 
    cost: "border-l-4 border-l-red-500",
    neutral: "border-l-4 border-l-gray-400"
  },
  
  // Text colors for values
  textColors: {
    profit: "text-green-700",
    revenue: "text-blue-700",
    cost: "text-red-700", 
    neutral: "text-gray-900"
  }
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
  // Card padding - More generous for professional look
  card: "p-8",
  cardSmall: "p-6",
  cardLarge: "p-10",
  cardContent: "p-6",
  
  // Margins and gaps - Better visual separation
  section: "mb-12",
  subsection: "mb-8", 
  item: "mb-6",
  small: "mb-4",
  tiny: "mb-2",
  
  // Grid gaps - More breathing room
  gridGap: "gap-8",
  gridGapSmall: "gap-6",
  gridGapLarge: "gap-10",
  
  // Internal spacing
  cardHeader: "mb-6",
  cardBody: "space-y-4",
  metricSpacing: "space-y-6",
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
  card: "shadow-lg border border-gray-200 bg-white",
  cardHover: "shadow-xl border border-gray-300 bg-white transform transition-all duration-200",
  cardSubtle: "shadow-sm border border-gray-100 bg-white",
  none: "shadow-none",
  elevated: "shadow-2xl border border-gray-200 bg-white",
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