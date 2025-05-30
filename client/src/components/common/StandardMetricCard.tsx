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
      default: return 'border-l-gray-400';
    }
  };

  const getTextColor = () => {
    switch(type) {
      case 'profit': return 'text-green-700';
      case 'revenue': return 'text-blue-700';
      case 'cost': return 'text-red-700';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${getBorderClass()} border-l-4 p-8 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        {icon && <div className="text-gray-400 p-3 bg-gray-50 rounded-xl">{icon}</div>}
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className={`text-4xl font-bold tracking-tight ${getTextColor()}`}>{currentValue}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{currentLabel}</div>
        </div>
        
        {showForecast && forecastValue && forecastLabel && (
          <div className="pt-4 border-t-2 border-gray-100 space-y-3">
            <div className={`text-2xl font-bold tracking-tight ${getTextColor()}`}>
              {forecastValue}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}