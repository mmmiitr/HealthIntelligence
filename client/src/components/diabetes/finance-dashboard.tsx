import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { revenueData, revenueByInsuranceData, revenueSourcesData } from "@/lib/mock-data";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles, chartColors, pieColors } from "@/lib/styles";
import { getViewLabels } from "@/lib/utils";

interface FinanceDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function FinanceDashboard({ timeFilter, viewMode, showForecast }: FinanceDashboardProps) {
  // Use shared getViewLabels utility for dynamic labels

  const labels = getViewLabels(viewMode);

  const keyMetrics = [
    {
      title: "Total Revenue",
      currentValue: "$1.84M",
      forecastValue: "$2.1M",
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "revenue" as const,
      // icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Operating Costs",
      currentValue: "$1.2M",
      forecastValue: "$1.2M",
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,
      // icon: <TrendingDown className="h-5 w-5" />
    },
    {
      title: "Net Profit",
      currentValue: "$470K",
      forecastValue: "$650K",
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "profit" as const,
      icon: <TrendingUp className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Financial Overview Section */}
      <div className="space-y-6">
        <div className={styles.section}>
          <h2 className={styles.heading.h2}>Financial Overview</h2>
          <p className={styles.heading.subtitle}>
            {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Financial Performance
          </p>
        </div>

        <div className={styles.grid.cols3}>
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
      </div>

      {/* Cost Overview Section */}
      <div className="space-y-6">
        <div className={styles.section}>
          <h2 className={styles.heading.h2}>Cost Overview</h2>
          <p className={styles.heading.subtitle}>
            Operating Expenses and Cost Analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Trends Chart */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={(() => {
                  const getCostData = () => {
                    if (viewMode === "monthly") {
                      return showForecast ? [
                        { month: 'Feb', cost: 980000 },
                        { month: 'Mar', cost: 1020000 },
                        { month: 'Apr', cost: 1050000 },
                        { month: 'May', cost: 1080000 },
                        { month: 'Jun', cost: 1120000, upperBound: 1180000, lowerBound: 1060000 },
                        { month: 'Jul', cost: 1150000, upperBound: 1210000, lowerBound: 1090000 },
                        { month: 'Aug', cost: 1180000, upperBound: 1240000, lowerBound: 1120000 }
                      ] : [
                        { month: 'Jan', cost: 950000 },
                        { month: 'Feb', cost: 980000 },
                        { month: 'Mar', cost: 1020000 },
                        { month: 'Apr', cost: 1050000 },
                        { month: 'May', cost: 1080000 }
                      ];
                    } else if (viewMode === "quarterly") {
                      return showForecast ? [
                        { month: 'Q4 2024', cost: 3000000 },
                        { month: 'Q1 2025', cost: 3100000 },
                        { month: 'Q2 2025', cost: 3200000 },
                        { month: 'Q3 2025', cost: 3350000, upperBound: 3500000, lowerBound: 3200000 },
                        { month: 'Q4 2025', cost: 3450000, upperBound: 3600000, lowerBound: 3300000 }
                      ] : [
                        { month: 'Q2 2024', cost: 2800000 },
                        { month: 'Q3 2024', cost: 2900000 },
                        { month: 'Q4 2024', cost: 3000000 },
                        { month: 'Q1 2025', cost: 3100000 },
                        { month: 'Q2 2025', cost: 3200000 }
                      ];
                    } else {
                      return showForecast ? [
                        { month: '2022', cost: 11500000 },
                        { month: '2023', cost: 12000000 },
                        { month: '2024', cost: 12400000 },
                        { month: '2025', cost: 13200000, upperBound: 13800000, lowerBound: 12600000 },
                        { month: '2026', cost: 13680000, upperBound: 14300000, lowerBound: 13060000 }
                      ] : [
                        { month: '2020', cost: 10800000 },
                        { month: '2021', cost: 11200000 },
                        { month: '2022', cost: 11500000 },
                        { month: '2023', cost: 12000000 },
                        { month: '2024', cost: 12400000 }
                      ];
                    }
                  };
                  return getCostData();
                })()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                    labelFormatter={(label: string) => `Month: ${label}`}
                  />
                  <Legend verticalAlign="top" height={34} iconType="line" wrapperStyle={{ marginLeft: 20 }} />

                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#1976d2"
                    strokeWidth={3}
                    name="Operating Cost"
                    connectNulls={false}
                  />
                  {showForecast && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="upperBound"
                        stroke="#1976d2"
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        name="Upper Confidence"
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="#1976d2"
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        name="Lower Confidence"
                        connectNulls={false}
                      />
                      <ReferenceLine
                        x={viewMode === "monthly" ? "May" : viewMode === "quarterly" ? "Q2 2025" : "2024"}
                        stroke="#666"
                        strokeDasharray="2 2"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Labor Cost by Role */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Labor Cost by Role</h3>
              <ResponsiveContainer width="100%" height={350}>
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
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value}K`}
                  >
                    {['#1976d2', '#4caf50', '#ff9800', '#f44336'].map((color, index) => (
                      <Cell key={`labor-cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}K`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cost Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Average Cost per Patient */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Average Cost per Patient in Panel</div>
              <div className="text-3xl font-bold text-blue-700">$1,100</div>
              <div className="text-xs text-gray-500 mt-1">May 2025</div>
            </CardContent>
          </Card>

          {/* Cost per Visit */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Cost per Visit</div>
              <div className="text-3xl font-bold text-blue-700">$95</div>
              <div className="text-xs text-gray-500 mt-1">May 2025</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Overview Section */}
      <div className="space-y-6">
        <div className={styles.section}>
          <h2 className={styles.heading.h2}>Revenue Overview</h2>
          <p className={styles.heading.subtitle}>
            Revenue Trends and Source Analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trends Chart */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={(() => {
                  const getChartData = () => {
                    if (viewMode === "monthly") {
                      return showForecast ? [
                        { month: 'Feb', revenue: 1120000 },
                        { month: 'Mar', revenue: 1150000 },
                        { month: 'Apr', revenue: 1180000 },
                        { month: 'May', revenue: 1200000 },
                        { month: 'Jun', revenue: 1280000, upperBound: 1350000, lowerBound: 1210000 },
                        { month: 'Jul', revenue: 1320000, upperBound: 1400000, lowerBound: 1240000 },
                        { month: 'Aug', revenue: 1360000, upperBound: 1450000, lowerBound: 1270000 }
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
                        { month: 'Q3 2025', revenue: 3900000, upperBound: 4100000, lowerBound: 3700000 },
                        { month: 'Q4 2025', revenue: 4080000, upperBound: 4300000, lowerBound: 3860000 }
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
                        { month: '2025', revenue: 15600000, upperBound: 16200000, lowerBound: 15000000 },
                        { month: '2026', revenue: 16320000, upperBound: 17000000, lowerBound: 15640000 }
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
                })()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                    labelFormatter={(label: string) => `Month: ${label}`}
                  />
                  <Legend verticalAlign="top" height={34} iconType="line" wrapperStyle={{ marginLeft: 20 }} />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1976d2"
                    strokeWidth={3}
                    name="Revenue"
                    connectNulls={false}
                  />
                  {showForecast && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="upperBound"
                        stroke="#1976d2"
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        name="Upper Confidence"
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="#1976d2"
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        name="Lower Confidence"
                        connectNulls={false}
                      />
                      <ReferenceLine
                        x={viewMode === "monthly" ? "May" : viewMode === "quarterly" ? "Q2 2025" : "2024"}
                        stroke="#666"
                        strokeDasharray="2 2"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Insurance */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Insurance</h3>
              <ResponsiveContainer width="100%" height={350}>
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

        {/* Additional Revenue Details */}
        <div className="mt-6"> {/* Main container, adding margin top */}
          {/* Row for Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Two columns for medium screens and above */}
            {/* Payer Mix Distribution */}
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
                      outerRadius={70} // No change to outerRadius as per request
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`} // No change to label function as per request
                    >
                      {['#1976d2', '#4caf50', '#ff9800', '#f44336'].map((color, index) => (
                        <Cell key={`payer-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${value}K`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Source Split */}
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
                      outerRadius={70} // No change to outerRadius as per request
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`} // No change to label function as per request
                    >
                      {['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'].map((color, index) => (
                        <Cell key={`source-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${value}K`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Row for Average Revenue per Patient - now a 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"> {/* Changed to md:grid-cols-2 */}
            {/* Average Revenue per Patient */}
            <Card className={styles.card.base}>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">Average Revenue per Patient in Panel</div>
                <div className="text-3xl font-bold text-blue-700">$2,400</div>
                <div className="text-xs text-gray-500 mt-1">May 2025</div>
              </CardContent>
            </Card>
            {/* The second column in this row will be implicitly empty, aligning the card to the left */}
          </div>
        </div>
      </div>


    </div>
  );
}