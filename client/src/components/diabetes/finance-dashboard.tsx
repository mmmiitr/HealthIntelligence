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
      icon: (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
      )
    }
  ];

  const costMetrics = [

    {
      title: "Operating Cost",
      currentValue: "$1.2M",
      forecastValue: "$1.2M", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Avg Cost/Patient/Month",
      currentValue: "$140",
      forecastValue: "$120", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Cost Per Visit",
      currentValue: "$90",
      forecastValue: "$75", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Labor Cost",
      currentValue: "$920K",
      forecastValue: "$900K", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Other Cost",
      currentValue: "$280K",
      forecastValue: "$275K", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
  ];
  const revenueMetrics = [
    {
      title: "Total Revenue",
      currentValue: "$1.84M",
      forecastValue: "$1.90M", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Avg Revenue/Patient/Month",
      currentValue: "$180",
      forecastValue: "$200", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Revenue Per Visit",
      currentValue: "$100",
      forecastValue: "$110", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },

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

        {/*
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
        </div> */}
      </div>

      {/* Cost Overview Section */}
      <div className="space-y-6">
        <div className={styles.section}>
          <h2 className={styles.heading.h2}>Cost Overview</h2>
          <p className={styles.heading.subtitle}>
            Operating Expenses and Cost Analysis
          </p>
        </div>

        {/* Additional Cost Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {costMetrics.slice(0, 3).map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={metric.forecastLabel}
              showForecast={showForecast}
              type={metric.type}
            />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {costMetrics.slice(3).map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={metric.forecastLabel}
              showForecast={showForecast}
              type={metric.type}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Cost Trends Chart */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={(() => {
                  const getCostData = () => {
                    if (viewMode === "monthly") {
                      return showForecast ? [
                        { month: 'Jan', cost: 920000 },
                        { month: 'Feb', cost: 890000 },
                        { month: 'Mar', cost: 910000 },
                        { month: 'Apr', cost: 880000 },
                        { month: 'May', cost: 920000 },
                        { month: 'Jun', cost: 880000, upperBound: 980000, lowerBound: 780000 },
                        { month: 'Jul', cost: 875000, upperBound: 975000, lowerBound: 775000 },
                        { month: 'Aug', cost: 870000, upperBound: 970000, lowerBound: 770000 },
                        { month: 'Sep', cost: 865000, upperBound: 965000, lowerBound: 765000 }
                      ] : [
                        { month: 'Jan', cost: 920000 },
                        { month: 'Feb', cost: 890000 },
                        { month: 'Mar', cost: 910000 },
                        { month: 'Apr', cost: 880000 },
                        { month: 'May', cost: 920000 }
                      ];
                    } else if (viewMode === "quarterly") {
                      return showForecast ? [
                        { month: 'Q4 2024', cost: 2600000 },
                        { month: 'Q1 2025', cost: 2550000 },
                        { month: 'Q2 2025', cost: 2500000 },
                        { month: 'Q3 2025', cost: 2450000, upperBound: 2650000, lowerBound: 2250000 },
                        { month: 'Q4 2025', cost: 2400000, upperBound: 2600000, lowerBound: 2200000 }
                      ] : [
                        { month: 'Q2 2024', cost: 2700000 },
                        { month: 'Q3 2024', cost: 2650000 },
                        { month: 'Q4 2024', cost: 2600000 },
                        { month: 'Q1 2025', cost: 2550000 },
                        { month: 'Q2 2025', cost: 2500000 }
                      ];
                    } else {
                      return showForecast ? [
                        { month: '2022', cost: 9500000 },
                        { month: '2023', cost: 9300000 },
                        { month: '2024', cost: 9200000 },
                        { month: '2025', cost: 9100000, upperBound: 10100000, lowerBound: 8100000 },
                        { month: '2026', cost: 9000000, upperBound: 10000000, lowerBound: 8000000 }
                      ] : [
                        { month: '2020', cost: 9800000 },
                        { month: '2021', cost: 9700000 },
                        { month: '2022', cost: 9500000 },
                        { month: '2023', cost: 9300000 },
                        { month: '2024', cost: 9200000 }
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
                    formatter={(value: any, name: string, props: any) => {
                      if (name === 'upperBound') { // Change 'cost' to 'Operating Cost' for display
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Upper Bound'];
                      } else if (name === 'cost') {
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Operating Cost'];
                      } else if (name === 'lowerBound') {
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Lower Bound'];
                      }
                      return [`$${(value / 1000000).toFixed(2)}M`, name];
                    }}
                    labelFormatter={(label: string) => `Month: ${label}`}
                  />
                  <Legend
                    verticalAlign="top"
                    height={34}
                    iconType="line"
                    wrapperStyle={{ marginLeft: 20, fontSize: '14px' }}
                    payload={[{ value: 'Operating Cost', type: 'line', color: '#1976d2' }]} // Only show 'Operating Cost' in legend
                  />

                  {showForecast && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="upperBound"
                        stroke="#1976d2"
                        strokeWidth={2}
                        strokeDasharray="3,3"
                        strokeOpacity={1}
                        dot={false}
                        name="upperBound" // Changed name to 'upperBound' for formatter to pick up
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="#1976d2"
                        strokeWidth={2}
                        strokeDasharray="3,3"
                        strokeOpacity={1}
                        dot={false}
                        name="lowerBound" // Changed name to 'lowerBound' for formatter to pick up
                        connectNulls={false}
                      />
                      <ReferenceLine
                        x={viewMode === "monthly" ? "May" : viewMode === "quarterly" ? "Q2 2025" : "2024"}
                        stroke="#666"
                        strokeDasharray="2 2"
                      />
                    </>
                  )}
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#1976d2"
                    strokeWidth={3}
                    name="Operating Cost"
                    connectNulls={false}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      // Check if showForecast is true and if the data point has upperBound/lowerBound (indicating it's a forecast point)
                      const isForecastPoint = showForecast && (payload.upperBound !== undefined || payload.lowerBound !== undefined);
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4}
                          fill={isForecastPoint ? '#ff9800' : '#1976d2'}
                          stroke={isForecastPoint ? '#ff9800' : '#1976d2'}
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>


          {/* Labor Cost by Role */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Labor Cost By Role</h3>
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
                    labelLine={false}

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
      </div>

      {/* Revenue Overview Section */}
      <div className="space-y-6">
        <div className={styles.section}>
          <h2 className={styles.heading.h2}>Revenue Overview</h2>
          <p className={styles.heading.subtitle}>
            Revenue Trends and Source Analysis
          </p>
        </div>
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Average Revenue Per Patient In Panel</div>
              <div className="text-3xl font-bold text-blue-700">$2,400</div>
              <div className="text-xs text-gray-500 mt-1">May 2025</div>
            </CardContent>
          </Card>
          
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {revenueMetrics.slice(0, 3).map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={metric.forecastLabel}
              showForecast={showForecast}
              type={metric.type}
            />
          ))}
        </div>

        <div>
          {/* Revenue from top 5 CPT codes card with similar styling */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue From Top 5 CPT Codes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CPT Code
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">99214</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Office visit, established patient (25 min, moderate)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$130,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">83036</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Hemoglobin A1c test (HbA1c – diabetes control check)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$13,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">81001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Urinalysis, automated with microscopy</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$10,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">99490</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Chronic Care Management (20+ min/month)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$25,200</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">82962</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Glucose, blood by glucose monitoring device</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$4,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"> {/* This grid is specifically for the two charts */}
          
          {/* Revenue Trends Chart */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={(() => {
                    const getChartData = () => {
                      if (viewMode === 'monthly') {
                        return showForecast
                          ? [
                            { month: 'Jan', revenue: 950000 },
                            { month: 'Feb', revenue: 900000 },
                            { month: 'Mar', revenue: 930000 },
                            { month: 'Apr', revenue: 910000 },
                            { month: 'May', revenue: 940000 },
                            { month: 'Jun', revenue: 900000, upperBound: 1000000, lowerBound: 800000 },
                            { month: 'Jul', revenue: 890000, upperBound: 992000, lowerBound: 792000 },
                            { month: 'Aug', revenue: 888000, upperBound: 988000, lowerBound: 790000 },
                            { month: 'Sep', revenue: 885000, upperBound: 985000, lowerBound: 785000 },
                          ]
                          : [
                            { month: 'Jan', revenue: 950000 },
                            { month: 'Feb', revenue: 900000 },
                            { month: 'Mar', revenue: 930000 },
                            { month: 'Apr', revenue: 910000 },
                            { month: 'May', revenue: 940000 },
                          ];
                      } else if (viewMode === 'quarterly') {
                        return showForecast
                          ? [
                            { month: 'Q4 2024', revenue: 2700000 },
                            { month: 'Q1 2025', revenue: 2650000 },
                            { month: 'Q2 2025', revenue: 2600000 },
                            { month: 'Q3 2025', revenue: 2550000, upperBound: 2750000, lowerBound: 2350000 },
                            { month: 'Q4 2025', revenue: 2500000, upperBound: 2700000, lowerBound: 2300000 },
                          ]
                          : [
                            { month: 'Q2 2024', revenue: 2800000 },
                            { month: 'Q3 2024', revenue: 2750000 },
                            { month: 'Q4 2024', revenue: 2700000 },
                            { month: 'Q1 2025', revenue: 2650000 },
                            { month: 'Q2 2025', revenue: 2600000 },
                          ];
                      } else {
                        return showForecast
                          ? [
                            { month: '2022', revenue: 9800000 },
                            { month: '2023', revenue: 9600000 },
                            { month: '2024', revenue: 9400000 },
                            { month: '2025', revenue: 9300000, upperBound: 10300000, lowerBound: 8300000 },
                            { month: '2026', revenue: 9200000, upperBound: 10200000, lowerBound: 8200000 },
                          ]
                          : [
                            { month: '2020', revenue: 10000000 },
                            { month: '2021', revenue: 9900000 },
                            { month: '2022', revenue: 9800000 },
                            { month: '2023', revenue: 9600000 },
                            { month: '2024', revenue: 9400000 },
                          ];
                      }
                    };
                    return getChartData();
                  })()}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickFormatter={(value) => value.split(' ')[0]} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: any, name: string, props: any) => {
                      if (name === 'Revenue') {
                        // For the actual revenue line
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Revenue'];
                      } else if (name === 'upperBound') {
                        // For the upper bound line
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Upper Bound'];
                      } else if (name === 'lowerBound') {
                        // For the lower bound line
                        return [`$${(value / 1000000).toFixed(2)}M`, 'Lower Bound'];
                      }
                      return [`$${(value / 1000000).toFixed(2)}M`, name]; // Default for other lines if any
                    }}
                    labelFormatter={(label: string) => `Month: ${label}`}
                  />
                  <Legend
                    verticalAlign="top"
                    height={34}
                    iconType="line"
                    wrapperStyle={{ marginLeft: 20, fontSize: '14px' }}
                    payload={[{ value: 'Revenue', type: 'line', color: '#1976d2' }]} // Only show 'Revenue' in legend
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1976d2"
                    strokeWidth={3}
                    name="Revenue"
                    connectNulls={false}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      // Check if showForecast is true and if the data point has upperBound/lowerBound (indicating it's a forecast point)
                      const isForecastPoint =
                        showForecast && (payload.upperBound !== undefined || payload.lowerBound !== undefined);
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4}
                          fill={isForecastPoint ? '#ff9800' : '#1976d2'}
                          stroke={isForecastPoint ? '#ff9800' : '#1976d2'}
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                  {showForecast && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="upperBound"
                        stroke="#1976d2"
                        strokeWidth={2}
                        strokeDasharray="3,3"
                        strokeOpacity={1}
                        dot={false}
                        name="upperBound" // Changed name to 'upperBound' for formatter to pick up
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="#1976d2"
                        strokeWidth={2}
                        strokeDasharray="3,3"
                        strokeOpacity={1}
                        dot={false}
                        name="lowerBound" // Changed name to 'lowerBound' for formatter to pick up
                        connectNulls={false}
                      />
                      <ReferenceLine x={viewMode === 'monthly' ? 'May' : viewMode === 'quarterly' ? 'Q2 2025' : '2024'} stroke="#666" strokeDasharray="2 2" />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Revenue Source Split</div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={(() => {
                    const fullHistoricalData = [
                      { month: 'Jan', 'In Person Consultation': 170, CCM: 100, DSMT: 55, Telemedicine: 70, Labs: 35 },
                      { month: 'Feb', 'In Person Consultation': 160, CCM: 110, DSMT: 58, Telemedicine: 75, Labs: 38 },
                      { month: 'Mar', 'In Person Consultation': 150, CCM: 125, DSMT: 60, Telemedicine: 80, Labs: 40 },
                      { month: 'Apr', 'In Person Consultation': 140, CCM: 130, DSMT: 65, Telemedicine: 90, Labs: 42 },
                      { month: 'May', 'In Person Consultation': 130, CCM: 135, DSMT: 62, Telemedicine: 100, Labs: 45 },
                      { month: 'Jun', 'In Person Consultation': 125, CCM: 140, DSMT: 68, Telemedicine: 95, Labs: 48 },
                      { month: 'Jul', 'In Person Consultation': 135, CCM: 130, DSMT: 70, Telemedicine: 110, Labs: 46 },
                      { month: 'Aug', 'In Person Consultation': 145, CCM: 120, DSMT: 72, Telemedicine: 120, Labs: 44 },
                      { month: 'Sep', 'In Person Consultation': 150, CCM: 115, DSMT: 75, Telemedicine: 125, Labs: 47 },
                    ];

                    const forecastOnlyData = [
                      { month: 'Jun', 'In Person Consultation': 125, CCM: 140, DSMT: 68, Telemedicine: 95, Labs: 48, isForecast: true, upperBound_InPerson: 130, lowerBound_InPerson: 118, upperBound_CCM: 145, lowerBound_CCM: 135, upperBound_DSMT: 72, lowerBound_DSMT: 64, upperBound_Telemedicine: 100, lowerBound_Telemedicine: 90, upperBound_Labs: 50, lowerBound_Labs: 46 },
                      { month: 'Jul', 'In Person Consultation': 135, CCM: 130, DSMT: 70, Telemedicine: 110, Labs: 46, isForecast: true, upperBound_InPerson: 140, lowerBound_InPerson: 128, upperBound_CCM: 135, lowerBound_CCM: 125, upperBound_DSMT: 75, lowerBound_DSMT: 66, upperBound_Telemedicine: 115, lowerBound_Telemedicine: 105, upperBound_Labs: 48, lowerBound_Labs: 44 },
                      { month: 'Aug', 'In Person Consultation': 145, CCM: 120, DSMT: 72, Telemedicine: 120, Labs: 44, isForecast: true, upperBound_InPerson: 150, lowerBound_InPerson: 138, upperBound_CCM: 125, lowerBound_CCM: 115, upperBound_DSMT: 77, lowerBound_DSMT: 68, upperBound_Telemedicine: 125, lowerBound_Telemedicine: 115, upperBound_Labs: 46, lowerBound_Labs: 42 },
                      { month: 'Sep', 'In Person Consultation': 150, CCM: 115, DSMT: 75, Telemedicine: 125, Labs: 47, isForecast: true, upperBound_InPerson: 155, lowerBound_InPerson: 142, upperBound_CCM: 120, lowerBound_CCM: 110, upperBound_DSMT: 80, lowerBound_DSMT: 70, upperBound_Telemedicine: 130, lowerBound_Telemedicine: 120, upperBound_Labs: 49, lowerBound_Labs: 43 },
                    ];

                    const dataWhenToggleOff = fullHistoricalData.slice(0, 5);
                    const dataWhenToggleOnWithForecast = [...dataWhenToggleOff, ...forecastOnlyData];

                    return showForecast ? dataWhenToggleOnWithForecast : dataWhenToggleOff;
                  })()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}K`} />
                  <Tooltip formatter={(value: any) => [`$${value}K`, '']} />

                  {/* Custom Legend to control visible items */}
                  <Legend
                    verticalAlign="top"
                    height={34}
                    iconType="line"
                    wrapperStyle={{ marginLeft: 25, fontSize: '14px' }}
                    payload={[
                      { value: 'In Person Consultation', type: 'line', color: '#1976d2' },
                      { value: 'CCM', type: 'line', color: '#4caf50' },
                      { value: 'DSMT', type: 'line', color: '#ff9800' },
                      { value: 'Telemedicine', type: 'line', color: '#f44336' },
                      { value: 'Labs', type: 'line', color: '#9c27b0' },
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="In Person Consultation"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isForecastPoint = showForecast && payload.isForecast;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isForecastPoint ? 3 : 4}
                          fill={isForecastPoint ? '#1976d2' : '#1976d2'}
                          stroke={isForecastPoint ? '#1976d2' : '#1976d2'}
                          strokeWidth={isForecastPoint ? 1 : 2}
                          strokeDasharray={isForecastPoint ? '3 3' : '0 0'}
                        />
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="CCM"
                    stroke="#4caf50"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isForecastPoint = showForecast && payload.isForecast;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isForecastPoint ? 3 : 4}
                          fill={isForecastPoint ? '#4caf50' : '#4caf50'}
                          stroke={isForecastPoint ? '#4caf50' : '#4caf50'}
                          strokeWidth={isForecastPoint ? 1 : 2}
                          strokeDasharray={isForecastPoint ? '3 3' : '0 0'}
                        />
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="DSMT"
                    stroke="#ff9800"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isForecastPoint = showForecast && payload.isForecast;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isForecastPoint ? 3 : 4}
                          fill={isForecastPoint ? '#ff9800' : '#ff9800'}
                          stroke={isForecastPoint ? '#ff9800' : '#ff9800'}
                          strokeWidth={isForecastPoint ? 1 : 2}
                          strokeDasharray={isForecastPoint ? '3 3' : '0 0'}
                        />
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Telemedicine"
                    stroke="#f44336"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isForecastPoint = showForecast && payload.isForecast;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isForecastPoint ? 3 : 4}
                          fill={isForecastPoint ? '#f44336' : '#f44336'}
                          stroke={isForecastPoint ? '#f44336' : '#f44336'}
                          strokeWidth={isForecastPoint ? 1 : 2}
                          strokeDasharray={isForecastPoint ? '3 3' : '0 0'}
                        />
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Labs"
                    stroke="#9c27b0"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      const isForecastPoint = showForecast && payload.isForecast;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isForecastPoint ? 3 : 4}
                          fill={isForecastPoint ? '#9c27b0' : '#9c27b0'}
                          stroke={isForecastPoint ? '#9c27b0' : '#9c27b0'}
                          strokeWidth={isForecastPoint ? 1 : 2}
                          strokeDasharray={isForecastPoint ? '3 3' : '0 0'}
                        />
                      );
                    }}
                  />

                  {showForecast && (
                    <>
                      <ReferenceLine x="May" stroke="#666" strokeDasharray="2 2" />

                      <Line type="monotone" dataKey="upperBound_InPerson" stroke="#1976d2" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                      <Line type="monotone" dataKey="lowerBound_InPerson" stroke="#1976d2" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />

                      <Line type="monotone" dataKey="upperBound_CCM" stroke="#4caf50" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                      <Line type="monotone" dataKey="lowerBound_CCM" stroke="#4caf50" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />

                      <Line type="monotone" dataKey="upperBound_DSMT" stroke="#ff9800" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                      <Line type="monotone" dataKey="lowerBound_DSMT" stroke="#ff9800" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />

                      <Line type="monotone" dataKey="upperBound_Telemedicine" stroke="#f44336" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                      <Line type="monotone" dataKey="lowerBound_Telemedicine" stroke="#f44336" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />

                      <Line type="monotone" dataKey="upperBound_Labs" stroke="#9c27b0" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                      <Line type="monotone" dataKey="lowerBound_Labs" stroke="#9c27b0" strokeWidth={2} strokeDasharray="3 3" strokeOpacity={0.7} dot={false} />
                    </>
                  )}
                </LineChart>
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
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}K`}
                      labelLine={false}

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
                        { name: 'In Person Consultation', value: 320, color: '#1976d2' },
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
                      labelLine={false}

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
        </div>
      </div>


    </div>
  );
}