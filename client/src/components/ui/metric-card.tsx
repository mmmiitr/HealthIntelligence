import { ReactNode } from "react";

interface MetricCardProps {
  borderColor: string;
  title: string;
  value: ReactNode;
  subtext?: ReactNode;
  futureValue?: ReactNode;
  percentChange?: ReactNode;
  className?: string;
}

export function MetricCard({
  borderColor,
  title,
  value,
  subtext,
  futureValue,
  percentChange,
  className = "",
}: MetricCardProps) {
  return (
    <div className={`bg-white border-l-4 ${borderColor} rounded-xl shadow-sm p-6 flex flex-col items-center ${className}`}>
      <div className="w-full text-sm font-medium text-gray-600 mb-2 text-center">{title}</div>
      {futureValue ? (
        <div className="flex flex-row items-end justify-center gap-4 w-full mb-1">
          <div className="flex flex-col items-center flex-1">
            <div className="text-2xl font-extrabold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="text-2xl font-extrabold text-gray-900">{futureValue}</div>
            <div className="text-xs text-blue-600">Future</div>
          </div>
        </div>
      ) : (
        <div className="text-3xl font-extrabold text-gray-900 mb-1 text-center">{value}</div>
      )}
      {percentChange && (
        <div className="text-xs text-green-600 text-center mb-1">{percentChange}</div>
      )}
      {subtext && (
        <div className="text-xs text-gray-500 text-center">{subtext}</div>
      )}
    </div>
  );
}
