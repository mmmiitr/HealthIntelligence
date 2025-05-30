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
  
  return (
    <div className={cn(styles.card.metric, metricStyle.border, className)}>
      <div className="flex items-start justify-between mb-6">
        <h3 className={styles.card.title}>{title}</h3>
        {icon && <div className="text-gray-400 p-3 bg-gray-50 rounded-xl">{icon}</div>}
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className={cn(styles.card.value, metricStyle.text)}>{currentValue}</div>
          <div className={styles.card.label}>{currentLabel}</div>
        </div>
        
        {showForecast && forecastValue && forecastLabel && (
          <div className="pt-4 border-t-2 border-gray-100 space-y-3">
            <div className={cn(styles.card.forecast, metricStyle.text)}>
              {forecastValue}
            </div>
            <div className={styles.card.label}>{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}