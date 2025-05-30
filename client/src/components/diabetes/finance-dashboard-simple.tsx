import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from "recharts";
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
              <LineChart data={(() => {
                const getChartData = () => {
                  if (viewMode === "monthly") {
                    return showForecast ? [
                      { month: 'Feb', revenue: 1120000 },
                      { month: 'Mar', revenue: 1150000 },
                      { month: 'Apr', revenue: 1180000 },
                      { month: 'May', revenue: 1200000 },
                      { month: 'Jun', revenue: 1280000 },
                      { month: 'Jul', revenue: 1320000 },
                      { month: 'Aug', revenue: 1360000 }
                    ] : [
                      { month: 'Jan', revenue: 1080000 },
                      { month: 'Feb', revenue: 1120000 },
                      { month: 'Mar', revenue: 1150000 },
                      { month: 'Apr', revenue: 1180000 },
                      { month: 'May', revenue: 1200000 }
                    ];
                  } else if (viewMode === "quarterly") {
                    return showForecast ? [
                      { month: 'Q4 2024', revenue: 3400000 },
                      { month: 'Q1 2025', revenue: 3530000 },
                      { month: 'Q2 2025', revenue: 3660000 },
                      { month: 'Q3 2025', revenue: 3900000 },
                      { month: 'Q4 2025', revenue: 4080000 }
                    ] : [
                      { month: 'Q2 2024', revenue: 3200000 },
                      { month: 'Q3 2024', revenue: 3350000 },
                      { month: 'Q4 2024', revenue: 3400000 },
                      { month: 'Q1 2025', revenue: 3530000 },
                      { month: 'Q2 2025', revenue: 3660000 }
                    ];
                  } else {
                    return showForecast ? [
                      { month: '2022', revenue: 13200000 },
                      { month: '2023', revenue: 13850000 },
                      { month: '2024', revenue: 14400000 },
                      { month: '2025', revenue: 15600000 },
                      { month: '2026', revenue: 16320000 }
                    ] : [
                      { month: '2020', revenue: 11800000 },
                      { month: '2021', revenue: 12500000 },
                      { month: '2022', revenue: 13200000 },
                      { month: '2023', revenue: 13850000 },
                      { month: '2024', revenue: 14400000 }
                    ];
                  }
                };
                return getChartData();
              })()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                  strokeDasharray={showForecast ? "0 0 5 5" : "0"}
                />
                {showForecast && (
                  <ReferenceLine 
                    x={viewMode === "monthly" ? "May" : viewMode === "quarterly" ? "Q2 2025" : "2024"} 
                    stroke="#666" 
                    strokeDasharray="2 2" 
                  />
                )}
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

      {/* Revenue & Cost Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Revenue Section */}
        <div>
          <h3 className={styles.heading.h3}>Revenue</h3>
          <div className="space-y-6">
            {/* Average Revenue per Patient in Panel */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Average Revenue per Patient in Panel</div>
                <div className="text-3xl font-bold text-blue-700">$2,400</div>
                <div className="text-xs text-gray-500 mt-1">May 2025</div>
              </CardContent>
            </Card>
            {/* Payer Mix Distribution Pie Chart */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Payer Mix Distribution</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Medicare', value: 420, color: '#1976d2' },
                        { name: 'Medicaid', value: 180, color: '#4caf50' },
                        { name: 'Commercial', value: 290, color: '#ff9800' },
                        { name: 'Cash Pay', value: 85, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`}
                    >
                      {['#1976d2', '#4caf50', '#ff9800', '#f44336'].map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}K`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Revenue Source Split Pie Chart */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Revenue Source Split</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'In Person Visits', value: 320, color: '#1976d2' },
                        { name: 'CCM', value: 120, color: '#4caf50' },
                        { name: 'DSMT', value: 60, color: '#ff9800' },
                        { name: 'Telemedicine', value: 80, color: '#f44336' },
                        { name: 'Labs', value: 40, color: '#9c27b0' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`}
                    >
                      {['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'].map((color, index) => (
                        <Cell key={`cell2-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}K`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Cost Section */}
        <div>
          <h3 className={styles.heading.h3}>Cost</h3>
          <div className="space-y-6">
            {/* Average Cost per Patient in Panel */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Average Cost per Patient in Panel</div>
                <div className="text-3xl font-bold text-red-700">$1,100</div>
                <div className="text-xs text-gray-500 mt-1">May 2025</div>
              </CardContent>
            </Card>
            {/* Cost per Visit */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Cost per Visit</div>
                <div className="text-3xl font-bold text-red-700">$95</div>
                <div className="text-xs text-gray-500 mt-1">May 2025</div>
              </CardContent>
            </Card>
            {/* Labor Cost Pie Chart */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Labor Cost by Role</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Physician', value: 400, color: '#1976d2' },
                        { name: 'Nurse', value: 220, color: '#4caf50' },
                        { name: 'Technician', value: 120, color: '#ff9800' },
                        { name: 'Care Manager', value: 180, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`}
                    >
                      {['#1976d2', '#4caf50', '#ff9800', '#f44336'].map((color, index) => (
                        <Cell key={`cell3-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}K`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}