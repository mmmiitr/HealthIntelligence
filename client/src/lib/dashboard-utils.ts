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

// Metric card border colors
export const BORDER_COLORS = {
  green: 'border-green-500',
  blue: 'border-blue-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  red: 'border-red-500'
};