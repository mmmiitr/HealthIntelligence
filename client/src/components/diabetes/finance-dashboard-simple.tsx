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
              <LineChart data={revenueData.slice(0, 8)} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: any) => [`$${(value/1000000).toFixed(2)}M`, '']}
                  labelFormatter={(label: string) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1976d2" 
                  strokeWidth={3}
                  name="Revenue"
                  connectNulls={false}
                />
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
              <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <Pie
                  data={[
                    { name: 'Medicare', value: 420, color: '#1976d2' },
                    { name: 'Medicaid', value: 180, color: '#4caf50' },
                    { name: 'Commercial', value: 290, color: '#ff9800' },
                    { name: 'Cash Pay', value: 85, color: '#f44336' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}K`}
                >
                  {[
                    { name: 'Medicare', value: 420, color: '#1976d2' },
                    { name: 'Medicaid', value: 180, color: '#4caf50' },
                    { name: 'Commercial', value: 290, color: '#ff9800' },
                    { name: 'Cash Pay', value: 85, color: '#f44336' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}K`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}