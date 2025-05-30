import { getCurrentTimestamp } from './utils';

// Dashboard view mode types
export type ViewMode = 'monthly' | 'quarterly' | 'yearly';

// Common label structure
export interface ViewLabels {
  current: string;
  forecast: string;
}

// Dynamic labels generator
export const getViewLabels = (viewMode: ViewMode): ViewLabels => {
  switch (viewMode) {
    case "monthly":
      return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    case "quarterly":
      return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
    case "yearly":
      return { current: "2025 PROGRESS", forecast: "2026 FORECAST" };
    default:
      return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
  }
};

// Time period formatters
export const getTimePeriodLabel = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case "monthly":
      return "May 2025";
    case "quarterly":
      return "Q2 2025";
    case "yearly":
      return "2025";
    default:
      return "May 2025";
  }
};

export const getComparisonPeriod = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case "monthly":
      return "Apr";
    case "quarterly":
      return "Q1";
    case "yearly":
      return "2024";
    default:
      return "Apr";
  }
};

// Common dashboard header props
export interface DashboardHeaderProps {
  title: string;
  description: string;
  badges?: Array<{
    text: string;
    icon: React.ComponentType<any>;
    className: string;
  }>;
  actions?: React.ReactNode;
}

// Generate dashboard header content
export const generateDashboardHeader = ({
  title,
  description,
  badges = [],
  actions
}: DashboardHeaderProps) => ({
  title,
  description,
  timestamp: getCurrentTimestamp(),
  badges,
  actions
});

// Chart color schemes
export const CHART_COLORS = {
  primary: '#1976d2',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#ef5350',
  info: '#64b5f6',
  purple: '#9c27b0'
};

export const PAYER_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.purple,
  CHART_COLORS.danger
];

// Common chart configurations
export const getChartConfig = () => ({
  strokeDasharray: "3 3",
  strokeWidth: 3,
  dotRadius: 4,
  referenceLine: {
    stroke: "#666",
    strokeDasharray: "2 2",
    label: "Today"
  }
});

// Metric card border colors and consistent color scheme
export const METRIC_COLORS = {
  profit: { 
    value: '#4caf50', // green for profit/positive metrics
    border: 'border-green-500',
    background: 'bg-green-50',
    text: 'text-green-700'
  },
  revenue: { 
    value: '#1976d2', // blue for revenue
    border: 'border-blue-500',
    background: 'bg-blue-50',
    text: 'text-blue-700'
  },
  cost: { 
    value: '#ef5350', // red for costs/expenses
    border: 'border-red-500',
    background: 'bg-red-50',
    text: 'text-red-700'
  },
  neutral: { 
    value: '#64b5f6', // light blue for neutral metrics
    border: 'border-blue-300',
    background: 'bg-blue-25',
    text: 'text-blue-600'
  },
  clinical: { 
    value: '#9c27b0', // purple for clinical metrics
    border: 'border-purple-500',
    background: 'bg-purple-50',
    text: 'text-purple-700'
  }
};

export const BORDER_COLORS = {
  green: 'border-green-500',
  blue: 'border-blue-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  red: 'border-red-500'
};