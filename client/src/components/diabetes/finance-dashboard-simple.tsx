import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { revenueData, revenueByInsuranceData, revenueSourcesData } from "@/lib/mock-data";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles, chartColors, pieColors } from "@/lib/styles";

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={styles.section}>
        <h2 className={styles.heading.h2}>Financial Overview</h2>
        <p className={styles.heading.subtitle}>
          {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Financial Performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className={styles.grid.cols4}>
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
      <div className={styles.section}>
        <h3 className={styles.heading.h3}>Revenue Trends</h3>
        <Card className={styles.card.base}>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke={chartColors.primary} strokeWidth={3} />
                <Line type="monotone" dataKey="costs" stroke={chartColors.danger} strokeWidth={3} />
                <Line type="monotone" dataKey="profit" stroke={chartColors.success} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Insurance */}
      <div className={styles.section}>
        <h3 className={styles.heading.h3}>Revenue by Insurance</h3>
        <Card className={styles.card.base}>
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
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
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