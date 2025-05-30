import { ReactNode } from "react";
import { styles } from "@/lib/styles";
import { cn } from "@/lib/utils";

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
  const metricStyle = styles.metric[type];
  
  const getBorderClass = () => {
    switch(type) {
      case 'profit': return 'border-l-green-500';
      case 'revenue': return 'border-l-blue-500'; 
      case 'cost': return 'border-l-red-500';
      default: return 'border-l-blue-500'; // Simplified - all use blue by default
    }
  };

  const getTextColor = () => {
    switch(type) {
      case 'profit': return 'text-green-600';
      case 'revenue': return 'text-blue-600';
      case 'cost': return 'text-red-600';
      default: return 'text-blue-600'; // Simplified - default to blue
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${getBorderClass()} border-l-4 p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {/* Show a badge for prediction metrics */}
          {title.toLowerCase().includes('prediction') && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase">Prediction</span>
          )}
        </div>
        {icon && <div className="text-gray-400 p-2 bg-gray-50 rounded-lg">{icon}</div>}
      </div>
      
      <div className={showForecast && forecastValue ? "flex justify-between items-end" : "space-y-2"}>
        <div className="space-y-1">
          <div className={`text-3xl font-bold ${getTextColor()}`}>{currentValue}</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{currentLabel}</div>
        </div>
        
        {showForecast && forecastValue && forecastLabel && (
          <div className="text-right space-y-1">
            <div className={`text-xl font-semibold ${getTextColor()}`}>
              {forecastValue}
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}