import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  borderColor: string;
  title: string;
  value: string;
  subtext?: string;
  height?: string;
  className?: string;
}

export default function MetricCard({
  borderColor,
  title,
  value,
  subtext,
  height = '140px',
  className = "",
}: MetricCardProps) {
  return (
    <Card className={`bg-white border-l-4 ${borderColor} rounded-xl shadow-sm flex flex-col items-center ${className}`} style={{ height }}>
      <CardContent className="flex flex-col items-center justify-center h-full w-full p-6">
        <div className="w-full text-sm font-medium text-gray-600 mb-2 text-center">{title}</div>
        <div className="text-3xl font-extrabold text-gray-900 mb-1 text-center">{value}</div>
        {subtext && (
          <div className="text-xs text-gray-500 text-center">{subtext}</div>
        )}
      </CardContent>
    </Card>
  );
}