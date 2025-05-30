import { ReactNode } from "react";

interface StandardMetricCardProps {
  title: string;
  currentValue: string;
  forecastValue?: string;
  currentLabel: string;
  forecastLabel?: string;
  showForecast?: boolean;
  borderColor: string;
  icon?: ReactNode;
  className?: string;
}

export default function StandardMetricCard({
  title,
  currentValue,
  forecastValue,
  currentLabel,
  forecastLabel,
  showForecast = false,
  borderColor,
  icon,
  className = ""
}: StandardMetricCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${borderColor} p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="space-y-3">
        {/* Current Value Row */}
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-2xl font-bold text-gray-900">{currentValue}</div>
            <div className="text-xs text-gray-500">{currentLabel}</div>
          </div>
        </div>
        
        {/* Forecast Value Row */}
        {showForecast && forecastValue && forecastLabel && (
          <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
            <div>
              <div className="text-lg font-semibold text-gray-700">{forecastValue}</div>
              <div className="text-xs text-gray-500">{forecastLabel}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}