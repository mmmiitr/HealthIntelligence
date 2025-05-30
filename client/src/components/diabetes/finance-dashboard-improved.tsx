import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { revenueData, revenueByInsuranceData, revenueSourcesData } from "@/lib/mock-data";
// Removed design-system import during cleanup

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

  // Financial Overview metrics with improved styling
  const financialOverviewMetrics = [
    {
      label: "Total Profit",
      value: "$842.6K",
      futureValue: showForecast ? "$895.2K" : undefined,
      percentChange: showForecast ? "+6.2%" : undefined,
      borderColor: "border-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      icon: <DollarSign className="h-5 w-5 text-green-600" />
    },
    {
      label: "Total Revenue", 
      value: "$1.2M",
      futureValue: showForecast ? "$1.28M" : undefined,
      percentChange: showForecast ? "+6.7%" : undefined,
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />
    },
    {
      label: "Total Expenses",
      value: "$357.4K", 
      futureValue: showForecast ? "$384.8K" : undefined,
      percentChange: showForecast ? "+7.7%" : undefined,
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      icon: <TrendingDown className="h-5 w-5 text-red-600" />
    },
  ];

  const chartColors = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'];

  // Create proper insurance breakdown data
  const insuranceBreakdownData = [
    { name: 'Medicare', value: 450000, percentage: '45%' },
    { name: 'Commercial', value: 350000, percentage: '35%' },
    { name: 'Medicaid', value: 150000, percentage: '15%' },
    { name: 'Self-Pay', value: 50000, percentage: '5%' }
  ];

  return (
    <div>
      {/* Financial Overview */}
      <div className={getSectionClasses().container}>
        <h3 className={`${TYPOGRAPHY.h3} mb-6`}>
          Financial Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className={getGridClasses(3)}>
          {financialOverviewMetrics.map((metric) => (
            <Card key={metric.label} className={`bg-white rounded-lg shadow-sm border-l-4 ${metric.borderColor}`}>
              <CardContent className={SPACING.card}>
                <div className="flex items-center mb-4">
                  {metric.icon}
                  <span className={`${TYPOGRAPHY.label} ml-3`}>{metric.label}</span>
                </div>
                
                <div className="space-y-4">
                  <div className={`${metric.bgColor} rounded-lg p-4`}>
                    <p className={`${TYPOGRAPHY.overline} mb-2`}>
                      {labels.current}
                    </p>
                    <p className={`${TYPOGRAPHY.metricLarge} ${metric.textColor}`}>
                      {metric.value}
                    </p>
                  </div>
                  
                  {metric.futureValue && showForecast && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className={`${TYPOGRAPHY.overline} mb-2`}>
                        {labels.forecast}
                      </p>
                      <p className={`${TYPOGRAPHY.metricMedium} text-gray-900`}>{metric.futureValue}</p>
                      <p className={`${TYPOGRAPHY.caption} mt-1 text-green-600 font-semibold`}>
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
      <div className={getSectionClasses().container}>
        <h3 className={`${TYPOGRAPHY.h3} mb-6 flex items-center`}>
          <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
          Revenue Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Average Revenue per Patient */}
          <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Average Revenue Per Patient</h4>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="space-y-3">
                  <div>
                    <p className={TYPOGRAPHY.overline}>{labels.current}</p>
                    <p className={`${TYPOGRAPHY.metricLarge} text-blue-700`}>$120</p>
                  </div>
                  {showForecast && (
                    <div className="pt-3 border-t border-blue-200">
                      <p className={TYPOGRAPHY.overline}>{labels.forecast}</p>
                      <p className={`${TYPOGRAPHY.metricMedium} text-blue-700`}>$128</p>
                      <p className={`${TYPOGRAPHY.caption} text-green-600 font-semibold`}>+6.7% improvement</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trends Chart */}
          <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends Over Time</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                    tickFormatter={(value) => `$${(value/1000)}K`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14, color: '#374151' }} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#1976d2" 
                    strokeWidth={3}
                    dot={{ fill: '#1976d2', r: 4 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue by Insurance */}
      <div className={getSectionClasses().container}>
        <h3 className={`${TYPOGRAPHY.h3} mb-6`}>Revenue by Insurance Type</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pie Chart */}
          <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insuranceBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.percentage}`}
                  >
                    {insuranceBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any) => [`$${value.toLocaleString()}`, name]}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14, color: '#374151' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insurance Breakdown */}
          <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Insurance Breakdown</h4>
              <div className="space-y-4">
                {insuranceBreakdownData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${item.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.percentage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}