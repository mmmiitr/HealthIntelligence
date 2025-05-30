import { ReactNode } from "react";
import { TYPOGRAPHY, COLORS, SPACING, SHADOWS, getMetricCardClasses } from "@/lib/design-system";

interface StandardMetricCardProps {
  title: string;
  currentValue: string;
  forecastValue?: string;
  currentLabel: string;
  forecastLabel?: string;
  showForecast?: boolean;
  type?: 'revenue' | 'profit' | 'cost' | 'neutral';
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
  type = 'neutral',
  icon,
  className = ""
}: StandardMetricCardProps) {
  const cardStyles = getMetricCardClasses(type);
  
  const getBorderColor = (type: string) => {
    switch(type) {
      case 'profit': return 'border-l-green-500';
      case 'revenue': return 'border-l-blue-500';
      case 'cost': return 'border-l-red-500';
      default: return 'border-l-gray-400';
    }
  };

  const getValueColor = (type: string) => {
    switch(type) {
      case 'profit': return 'text-green-700';
      case 'revenue': return 'text-blue-700';
      case 'cost': return 'text-red-700';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${getBorderColor(type)} border-l-4 p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {icon && <div className="text-gray-400 p-2 bg-gray-50 rounded-lg">{icon}</div>}
      </div>
      
      <div className="space-y-4">
        {/* Current Value Row */}
        <div className="space-y-2">
          <div className={`text-3xl font-bold ${getValueColor(type)}`}>{currentValue}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{currentLabel}</div>
        </div>
        
        {/* Forecast Value Row */}
        {showForecast && forecastValue && forecastLabel && (
          <div className="pt-3 border-t border-gray-200 space-y-2">
            <div className={`text-xl font-bold ${getValueColor(type)}`}>
              {forecastValue}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}