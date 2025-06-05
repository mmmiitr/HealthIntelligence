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
      case 'profit': return 'border-l-blue-500';
      case 'revenue': return 'border-l-blue-500'; 
      case 'cost': return 'border-l-blue-500';
      default: return 'border-l-blue-500';
    }
  };

  const getTextColor = () => {
    switch(type) {
      case 'profit': return 'text-blue-600';
      case 'revenue': return 'text-blue-600';
      case 'cost': return 'text-blue-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className={cn(
        "relative bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col justify-between overflow-hidden",
        "hover:shadow-lg transition-shadow duration-200", 
        className
    )}>
      
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          
          <p className="text-gray-700 text-base font-medium pr-8 leading-tight">{title}</p>
          
          
        </div>
        
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      
      
      <div className={showForecast && forecastValue ? "flex justify-between items-end" : "flex flex-col space-y-1"}> 
        <div className="space-y-1"> 
          
          <div className={`text-blue-600 text-4xl font-bold`}>{currentValue}</div>
          
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{currentLabel}</div>
        </div>
        
        {showForecast && forecastValue && forecastLabel && (
          <div className="text-right space-y-1"> 
            
            <div className={`text-blue-500 text-2xl font-bold`}>
              {forecastValue}
            </div>
            
            <div className="text-gray-400 text-xs uppercase">{forecastLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}
