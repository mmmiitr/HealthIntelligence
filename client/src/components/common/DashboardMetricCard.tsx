import { Card, CardContent } from "@/components/ui/card";

interface DashboardMetricCardProps {
  label: string;
  currentValue: string;
  forecastValue?: string;
  percentChange?: string;
  currentLabel: string;
  forecastLabel: string;
  showForecast: boolean;
  type?: "profit" | "revenue" | "cost" | "default";
  icon?: React.ReactNode;
}

export default function DashboardMetricCard({
  label,
  currentValue,
  forecastValue,
  percentChange,
  currentLabel,
  forecastLabel,
  showForecast,
  type = "default",
  icon
}: DashboardMetricCardProps) {
  const getColorClasses = () => {
    switch (type) {
      case "profit":
        return {
          border: "border-green-500",
          bg: "bg-green-50",
          text: "text-green-700"
        };
      case "revenue":
        return {
          border: "border-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-700"
        };
      case "cost":
        return {
          border: "border-red-500",
          bg: "bg-red-50",
          text: "text-red-700"
        };
      default:
        return {
          border: "border-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-700"
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Card className={`bg-white shadow-sm rounded-lg border-l-4 ${colors.border}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          {icon}
          <span className="font-medium text-gray-700 text-sm ml-2">{label}</span>
        </div>
        
        <div className="space-y-3">
          {/* Current Value */}
          <div className={`${colors.bg} rounded-lg p-3`}>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              {currentLabel}
            </p>
            <p className={`text-2xl font-bold ${colors.text}`}>
              {currentValue}
            </p>
          </div>
          
          {/* Forecast Value */}
          {showForecast && forecastValue && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                {forecastLabel}
              </p>
              <p className="text-lg font-bold text-gray-900">{forecastValue}</p>
              {percentChange && (
                <p className="text-xs text-gray-600 mt-1">
                  {percentChange} vs current
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}