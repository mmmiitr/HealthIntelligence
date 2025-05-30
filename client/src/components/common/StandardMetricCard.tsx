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
  
  return (
    <div className={`${cardStyles.container} ${cardStyles.border} border-l-4 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className={cardStyles.title}>{title}</h3>
        {icon && <div className="text-gray-400 opacity-60">{icon}</div>}
      </div>
      
      <div className="space-y-4">
        {/* Current Value Row */}
        <div className="space-y-1">
          <div className={cardStyles.value}>{currentValue}</div>
          <div className={`${cardStyles.subtitle} uppercase tracking-wide`}>{currentLabel}</div>
        </div>
        
        {/* Forecast Value Row */}
        {showForecast && forecastValue && forecastLabel && (
          <div className="pt-3 border-t border-gray-100 space-y-1">
            <div className={TYPOGRAPHY.metricSmall}>{forecastValue}</div>
            <div className={`${cardStyles.subtitle} uppercase tracking-wide`}>{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}