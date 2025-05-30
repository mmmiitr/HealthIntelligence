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
    <div className={`${SHADOWS.card} rounded-xl ${cardStyles.border} border-l-4 ${SPACING.card} ${className} hover:${SHADOWS.cardHover} transition-all duration-300`}>
      <div className="flex items-start justify-between mb-6">
        <h3 className={TYPOGRAPHY.cardTitle}>{title}</h3>
        {icon && <div className="text-gray-400 opacity-70 p-2 bg-gray-50 rounded-lg">{icon}</div>}
      </div>
      
      <div className={SPACING.metricSpacing}>
        {/* Current Value Row */}
        <div className="space-y-2">
          <div className={TYPOGRAPHY.metricMedium}>{currentValue}</div>
          <div className={TYPOGRAPHY.overline}>{currentLabel}</div>
        </div>
        
        {/* Forecast Value Row */}
        {showForecast && forecastValue && forecastLabel && (
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className={TYPOGRAPHY.metricSmall} style={{ color: type === 'profit' ? '#4caf50' : type === 'revenue' ? '#1976d2' : type === 'cost' ? '#f44336' : '#6b7280' }}>
              {forecastValue}
            </div>
            <div className={TYPOGRAPHY.overline}>{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}