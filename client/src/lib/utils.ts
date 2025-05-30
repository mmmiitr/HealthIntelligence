import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentTimestamp(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
    timeZoneName: 'short'
  };
  
  return `Last Updated: ${now.toLocaleDateString('en-US', options)}`;
}

// Consolidated utilities
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toFixed(0)}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const calculateGrowthRate = (current: number, previous: number): string => {
  if (!previous || previous === 0) return "0.0";
  const growth = ((current - previous) / previous) * 100;
  return growth.toFixed(1);
};

export type ViewMode = 'monthly' | 'quarterly' | 'yearly';

export const getTimePeriodLabel = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case "monthly": return "May 2025";
    case "quarterly": return "Q2 2025"; 
    case "yearly": return "2025";
    default: return "May 2025";
  }
};

export const getViewLabels = (viewMode: ViewMode) => {
  switch (viewMode) {
    case "monthly": return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    case "quarterly": return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
    case "yearly": return { current: "2025 PROGRESS", forecast: "2026 FORECAST" };
    default: return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
  }
};
