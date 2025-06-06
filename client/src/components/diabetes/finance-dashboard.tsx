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

  const costMetrics = [
    {
      title: "Revenue Per Visit",
      currentValue: "$90",
      forecastValue: "$75", // Added a sample forecast value
      currentLabel: labels.current,
      forecastLabel: labels.forecast,
      type: "cost" as const,

    },
    {
      title: "Cost per Visit",
      currentValue: "$100",
      forecastValue: "$90", // Added a sample forecast value
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

        {/* Additional Cost Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {costMetrics.map((metric) => (
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
                        { month: 'Jan', cost: 1780000 },
                        { month: 'Feb', cost: 1600000 },
                        { month: 'Mar', cost: 1580000 },
                        { month: 'Apr', cost: 1400000 },
                        { month: 'May', cost: 1380000 },
                        { month: 'Jun', cost: 1280000, upperBound: 1330000, lowerBound: 1230000 },
                        { month: 'Jul', cost: 1180000, upperBound: 1230000, lowerBound: 1130000 },
                        { month: 'Aug', cost: 1080000, upperBound: 1130000, lowerBound: 1030000 },
                        { month: 'Sep', cost: 980000, upperBound: 1030000, lowerBound: 930000 }
                      ] : [
                        { month: 'Jan', cost: 1780000 },
                        { month: 'Feb', cost: 1600000 },
                        { month: 'Mar', cost: 1580000 },
                        { month: 'Apr', cost: 1400000 },
                        { month: 'May', cost: 1380000 }
                      ];
                    } else if (viewMode === "quarterly") {
                      return showForecast ? [
                        { month: 'Q4 2024', cost: 3100000 },
                        { month: 'Q1 2025', cost: 2900000 },
                        { month: 'Q2 2025', cost: 2700000 },
                        { month: 'Q3 2025', cost: 2500000, upperBound: 2600000, lowerBound: 2400000 },
                        { month: 'Q4 2025', cost: 2300000, upperBound: 2400000, lowerBound: 2200000 }
                      ] : [
                        { month: 'Q2 2024', cost: 3100000 },
                        { month: 'Q3 2024', cost: 2900000 },
                        { month: 'Q4 2024', cost: 2700000 },
                        { month: 'Q1 2025', cost: 2500000 },
                        { month: 'Q2 2025', cost: 2300000 }
                      ];
                    } else {
                      return showForecast ? [
                        { month: '2022', cost: 11700000 },
                        { month: '2023', cost: 11300000 },
                        { month: '2024', cost: 10900000 },
                        { month: '2025', cost: 10500000, upperBound: 11000000, lowerBound: 10000000 },
                        { month: '2026', cost: 10100000, upperBound: 10600000, lowerBound: 9600000 }
                      ] : [
                        { month: '2020', cost: 11700000 },
                        { month: '2021', cost: 11400000 },
                        { month: '2022', cost: 11100000 },
                        { month: '2023', cost: 10800000 },
                        { month: '2024', cost: 10500000 }
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
                  <Legend 
                    verticalAlign="top" 
                    height={34} 
                    iconType="line" 
                    wrapperStyle={{ marginLeft: 20, fontSize: '12px' }} // Smaller font size for legend
                  />

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
                        { month: 'Jan', revenue: 1100000 },
                        { month: 'Feb', revenue: 1120000 },
                        { month: 'Mar', revenue: 1150000 },
                        { month: 'Apr', revenue: 1180000 },
                        { month: 'May', revenue: 1200000 },
                        { month: 'Jun', revenue: 1280000, upperBound: 1350000, lowerBound: 1210000 },
                        { month: 'Jul', revenue: 1320000, upperBound: 1400000, lowerBound: 1240000 },
                        { month: 'Aug', revenue: 1360000, upperBound: 1450000, lowerBound: 1270000 },
                        { month: 'Sep', revenue: 1380000, upperBound: 1500000, lowerBound: 1300000 }
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
                  <Legend verticalAlign="top" height={34} iconType="line" wrapperStyle={{ marginLeft: 20 , fontSize: '14px'}} />

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


          {/* Revenue Source Split */}
          <Card className={styles.card.base}>
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Revenue Source Split</div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={[

                    { month: 'Jan', 'In Person Visits': 330, 'CCM': 100, 'DSMT': 55, 'Telemedicine': 70, 'Labs': 35 },
                    { month: 'Feb', 'In Person Visits': 320, 'CCM': 105, 'DSMT': 56, 'Telemedicine': 78, 'Labs': 36 },
                    { month: 'Mar', 'In Person Visits': 310, 'CCM': 110, 'DSMT': 57, 'Telemedicine': 85, 'Labs': 37 },
                    { month: 'Apr', 'In Person Visits': 305, 'CCM': 118, 'DSMT': 58, 'Telemedicine': 95, 'Labs': 38 },
                    { month: 'May', 'In Person Visits': 295, 'CCM': 128, 'DSMT': 59, 'Telemedicine': 105, 'Labs': 39 },
                    { month: 'Jun', 'In Person Visits': 285, 'CCM': 138, 'DSMT': 60, 'Telemedicine': 115, 'Labs': 40 },
                    { month: 'Jul', 'In Person Visits': 290, 'CCM': 135, 'DSMT': 61, 'Telemedicine': 112, 'Labs': 41 },
                    { month: 'Aug', 'In Person Visits': 288, 'CCM': 142, 'DSMT': 62, 'Telemedicine': 120, 'Labs': 42 },
                    { month: 'Sep', 'In Person Visits': 295, 'CCM': 148, 'DSMT': 63, 'Telemedicine': 128, 'Labs': 43 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}K`} />
                  <Tooltip formatter={(value: any) => [`$${value}K`, '']} />
                  <Legend verticalAlign="top" height={34} iconType="line" wrapperStyle={{ marginLeft: 25 , fontSize: '14px'}}/>
                  <Line type="monotone" dataKey="In Person Visits" stroke="#1976d2" strokeWidth={2} name="In Person Visits" />
                  <Line type="monotone" dataKey="CCM" stroke="#4caf50" strokeWidth={2} name="CCM" />
                  <Line type="monotone" dataKey="DSMT" stroke="#ff9800" strokeWidth={2} name="DSMT" />
                  <Line type="monotone" dataKey="Telemedicine" stroke="#f44336" strokeWidth={2} name="Telemedicine" />
                  <Line type="monotone" dataKey="Labs" stroke="#9c27b0" strokeWidth={2} name="Labs" />
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