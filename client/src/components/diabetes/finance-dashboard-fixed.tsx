import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { revenueData, revenueByInsuranceData, revenueSourcesData } from "@/lib/mock-data";
import { TYPOGRAPHY, COLORS, SPACING, LAYOUT, SHADOWS, getGridClasses, getSectionClasses } from "@/lib/design-system";
import StandardMetricCard from "@/components/common/StandardMetricCard";

interface FinanceDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function FinanceDashboard({ timeFilter, viewMode, showForecast }: FinanceDashboardProps) {
  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch(viewMode) {
      case "monthly":
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
      case "quarterly":
        return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
      case "yearly":
        return { current: "2025 PROGRESS", forecast: "2026 FORECAST" };
      default:
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    }
  };

  const labels = getViewLabels();

  // Financial Overview metrics using standardized design system
  const financialOverviewMetrics = [
    {
      title: "Total Profit",
      currentValue: "$842.6K",
      forecastValue: showForecast ? "$895.2K" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'profit' as const,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Total Revenue", 
      currentValue: "$1.2M",
      forecastValue: showForecast ? "$1.28M" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'revenue' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Total Expenses",
      currentValue: "$357.4K", 
      forecastValue: showForecast ? "$384.8K" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'cost' as const,
      icon: <TrendingDown className="h-5 w-5" />
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      {/* Financial Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financialOverviewMetrics.map((metric) => (
            <Card key={metric.label} className={`bg-white shadow-sm rounded-lg border-l-4 ${metric.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {metric.icon}
                  <span className="font-medium text-gray-700 text-sm ml-2">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  <div className={`${metric.bgColor} rounded-lg p-3`}>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className={`text-2xl font-bold ${metric.textColor}`}>
                      {metric.value}
                    </p>
                  </div>
                  
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.percentChange} vs current
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
          Revenue Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Average Revenue per Patient */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Average Revenue Per Patient</h6>
            <Card className="bg-white shadow-sm rounded-lg border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">Average Revenue per patient in panel</span>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className="text-2xl font-bold text-blue-700">$2,400</p>
                  </div>
                  
                  {showForecast && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">$2,600</p>
                      <p className="text-xs text-gray-600 mt-1">+8.5% vs current</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payer Mix Distribution */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Mix Distribution</h6>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByInsuranceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueByInsuranceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trends Over Time</h3>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                  {showForecast && <Line type="monotone" dataKey="forecast" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}