import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { revenueData, revenueByInsuranceData, revenueSourcesData } from "@/lib/mock-data";
import StandardMetricCard from "@/components/common/StandardMetricCard";

interface FinanceDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function FinanceDashboard({ timeFilter, viewMode, showForecast }: FinanceDashboardProps) {
  const keyMetrics = [
    {
      title: "Total Revenue",
      currentValue: "$1.84M",
      forecastValue: "$2.1M", 
      currentLabel: "MAY PROGRESS",
      forecastLabel: "JUN FORECAST",
      type: "revenue" as const,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Operating Costs",
      currentValue: "$1.37M",
      forecastValue: "$1.45M",
      currentLabel: "MAY PROGRESS", 
      forecastLabel: "JUN FORECAST",
      type: "cost" as const,
      icon: <TrendingDown className="h-5 w-5" />
    },
    {
      title: "Net Profit",
      currentValue: "$470K",
      forecastValue: "$650K",
      currentLabel: "MAY PROGRESS",
      forecastLabel: "JUN FORECAST", 
      type: "profit" as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Cost per Patient",
      currentValue: "$285",
      forecastValue: "$275",
      currentLabel: "MAY PROGRESS",
      forecastLabel: "JUN FORECAST",
      type: "neutral" as const,
      icon: <DollarSign className="h-5 w-5" />
    }
  ];

  const COLORS = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Overview</h2>
        <p className="text-gray-600">
          {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Financial Performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => (
          <StandardMetricCard
            key={metric.title}
            title={metric.title}
            currentValue={metric.currentValue}
            forecastValue={metric.forecastValue}
            currentLabel={metric.currentLabel}
            forecastLabel={metric.forecastLabel}
            showForecast={showForecast}
            type={metric.type}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Revenue Trends Chart */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue Trends</h3>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={3} />
                <Line type="monotone" dataKey="costs" stroke="#f44336" strokeWidth={3} />
                <Line type="monotone" dataKey="profit" stroke="#4caf50" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Insurance */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue by Insurance</h3>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueSourcesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}K`}
                >
                  {revenueSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}