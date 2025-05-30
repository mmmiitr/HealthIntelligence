import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  borderColor: string;
  title: string;
  currentLabel: string;
  currentValue: ReactNode;
  currentSub: ReactNode;
  forecastLabel?: string;
  forecastValue?: ReactNode;
  forecastSub?: ReactNode;
  progressBarColor?: string;
  progressBarValue?: number;
  progressText?: string;
  footerText?: string;
  className?: string;
}

export function MetricCard({
  icon,
  borderColor,
  title,
  currentLabel,
  currentValue,
  currentSub,
  forecastLabel,
  forecastValue,
  forecastSub,
  progressBarColor,
  progressBarValue,
  progressText,
  footerText,
  className = "",
}: MetricCardProps) {
  return (
    <div className={`bg-white border-l-4 ${borderColor} rounded-lg shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex items-center mb-2">
          {icon}
          <span className="font-semibold text-gray-900 ml-2">{title}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 items-end">
          <div>
            <div className="text-xs text-gray-500 mb-1">{currentLabel}</div>
            <div className="text-xl font-bold text-gray-900">{currentValue}</div>
            <div className="text-xs text-blue-600">{currentSub}</div>
          </div>
          {forecastLabel && forecastValue && (
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">{forecastLabel}</div>
              <div className="text-xl font-bold text-blue-600">{forecastValue}</div>
              <div className="text-xs text-blue-600">{forecastSub}</div>
            </div>
          )}
        </div>
        {progressBarValue !== undefined && progressBarColor && (
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-1 mb-1">
              <div className={`${progressBarColor} h-1 rounded-full`} style={{width: `${progressBarValue}%`}}></div>
            </div>
            <div className="text-xs text-gray-600 text-center">{progressText}</div>
          </div>
        )}
        {footerText && (
          <div className="mt-2 text-xs text-center text-gray-600">{footerText}</div>
        )}
      </div>
    </div>
  );
}
