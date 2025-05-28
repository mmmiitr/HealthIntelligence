import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  currentLabel: string;
  currentValue: string;
  currentProgress?: number;
  currentNote?: string;
  forecastLabel: string;
  forecastValue: string;
  forecastNote?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
    color: string;
  };
  comparison?: string;
  height?: string;
}

export default function MetricCard({
  title,
  icon: Icon,
  iconColor,
  borderColor,
  currentLabel,
  currentValue,
  currentProgress,
  currentNote,
  forecastLabel,
  forecastValue,
  forecastNote,
  trend,
  comparison,
  height = '140px'
}: MetricCardProps) {
  const getTrendIcon = (direction: 'up' | 'down') => {
    return direction === 'up' ? '↑' : '↓';
  };

  return (
    <Card className={`bg-white border-l-4 ${borderColor}`} style={{ height }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {trend && (
              <div className="flex items-center space-x-2 mt-1">
                <span className={`${trend.color} font-medium text-sm`}>
                  {getTrendIcon(trend.direction)} {trend.value}
                </span>
                {comparison && (
                  <span className="text-gray-500 text-sm">{comparison}</span>
                )}
              </div>
            )}
          </div>
          <div className={`w-12 h-12 ${iconColor.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center`}>
            <Icon className={iconColor} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              {currentLabel}
            </p>
            <p className="text-lg font-bold text-gray-900">{currentValue}</p>
            {currentProgress && (
              <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
            )}
            {currentNote && (
              <p className="text-xs text-gray-600 mt-1">{currentNote}</p>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-2.5">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              {forecastLabel}
            </p>
            <p className="text-lg font-bold text-gray-900">{forecastValue}</p>
            {forecastNote && (
              <p className="text-xs text-gray-600 mt-1">{forecastNote}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}