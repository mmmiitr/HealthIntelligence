import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${className}`}>
      {children}
    </div>
  );
}

export function DashboardSection({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {children}
    </div>
  );
}

export function DashboardContainer({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`space-y-8 p-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartContainer({ title, children, className = "" }: ChartContainerProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}