import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Shield, Brain, AlertTriangle, Calculator, Building, Users, Heart, Stethoscope, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart } from "recharts";
import { revenueData, revenueByInsuranceData, payerRevenueTrends, revenueSourcesData, predictionsData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";
import { MetricCard } from "@/components/ui/metric-card";

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
        return { current: "CURRENT", forecast: "FORECAST" };
    }
  };

  const labels = getViewLabels();

  // Data-driven metric configs for Financial Overview with consistent styling
  const financialOverviewMetrics = [
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      label: "Profit",
      currentValue: "$842.6K",
      forecastValue: showForecast ? "$895.2K" : null,
      type: "profit",
      change: showForecast ? "↑ 6.2%" : null
    },
    {
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      label: "Revenue", 
      currentValue: "$1.2M",
      forecastValue: showForecast ? "$1.28M" : null,
      type: "revenue",
      change: showForecast ? "↑ 6.7%" : null
    },
    {
      icon: <Calculator className="h-5 w-5 text-red-600" />,
      label: "Expenses",
      currentValue: "$357.4K",
      forecastValue: showForecast ? "$384.8K" : null,
      type: "cost",
      change: showForecast ? "↑ 7.7%" : null
    },
  ];

  return (
    <div className="p-6">
      {/* Financial Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financialOverviewMetrics.map((metric) => (
            <Card key={metric.label} className={`bg-white shadow-none rounded-xl border-l-4 ${
              metric.type === "profit" ? "border-green-500" : 
              metric.type === "revenue" ? "border-blue-500" : 
              "border-red-500"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {metric.icon}
                  <span className="font-medium ml-2 text-gray-700 text-sm">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  {/* Current Value */}
                  <div className={`bg-${metric.type === "profit" ? "green" : metric.type === "revenue" ? "blue" : "red"}-50 rounded-lg p-3`}>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className={`text-2xl font-bold ${
                      metric.type === "profit" ? "text-green-700" : 
                      metric.type === "revenue" ? "text-blue-700" : 
                      "text-red-700"
                    }`}>
                      {metric.currentValue}
                    </p>
                  </div>
                  
                  {/* Forecast Value */}
                  {showForecast && metric.forecastValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.forecastValue}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.change} vs current
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Analysis Section (Row 2) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
          Revenue Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Average Revenue per Patient */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Average Revenue Per Patient</h6>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-600 font-medium">Average Revenue per patient in panel</p>
                <p className="text-2xl font-extrabold text-blue-700">$2,400</p>
                <p className="text-xs text-blue-600">+8.5%</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue for Top 5 CPT Codes */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue for Top 5 CPT Codes</h6>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b font-semibold">
                    <span>CPT Code</span>
                    <span>Revenue</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99214</span>
                    <span className="text-blue-600 font-semibold">$256,300</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99232</span>
                    <span className="text-blue-600 font-semibold">$189,400</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99396</span>
                    <span className="text-blue-600 font-semibold">$145,200</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">99490</span>
                    <span className="text-blue-600 font-semibold">$125,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payer Mix Distribution */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Mix Distribution</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Medicare', value: 45, color: '#1976d2' },
                        { name: 'Medicaid', value: 25, color: '#4caf50' },
                        { name: 'Commercial', value: 22, color: '#ff9800' },
                        { name: 'Self-Pay', value: 8, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      <Cell fill="#1976d2" />
                      <Cell fill="#4caf50" />
                      <Cell fill="#ff9800" />
                      <Cell fill="#f44336" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Source Split */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Source Split</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'In-Person Visits', value: 620000, color: '#1976d2' },
                        { name: 'CCM', value: 180000, color: '#4caf50' },
                        { name: 'DSMT', value: 145000, color: '#64b5f6' },
                        { name: 'Telemedicine', value: 95000, color: '#ef5350' },
                        { name: 'Labs', value: 85000, color: '#ff9800' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${(value/1000).toFixed(0)}K`}
                    >
                      <Cell fill="#1976d2" />
                      <Cell fill="#4caf50" />
                      <Cell fill="#64b5f6" />
                      <Cell fill="#ef5350" />
                      <Cell fill="#ff9800" />
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Payer Revenue Trends */}
          <div className="mb-6 col-span-1 lg:col-span-2">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Revenue Trends</h6>
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Payer Revenue Trends</CardTitle>
                <p className="text-sm text-gray-600">Revenue trends by insurance payer over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={showForecast ? [
                    ...payerRevenueTrends,
                    { month: 'Jun 2025', medicare: 5050, medicaid: 2080, commercial: 3450, selfPay: 1070,
                      medicareUpper: 5300, medicareLower: 4800 },
                    { month: 'Jul 2025', medicare: 5150, medicaid: 2120, commercial: 3520, selfPay: 1090,
                      medicareUpper: 5420, medicareLower: 4880 },
                    { month: 'Aug 2025', medicare: 5250, medicaid: 2160, commercial: 3590, selfPay: 1110,
                      medicareUpper: 5540, medicareLower: 4960 },
                    { month: 'Sep 2025', medicare: 5350, medicaid: 2200, commercial: 3660, selfPay: 1130,
                      medicareUpper: 5660, medicareLower: 5040 },
                    { month: 'Oct 2025', medicare: 5450, medicaid: 2240, commercial: 3730, selfPay: 1150,
                      medicareUpper: 5780, medicareLower: 5120 }
                  ] : payerRevenueTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip 
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value?.toLocaleString()}`}
                                </p>
                              ))}
                              {showForecast && data.medicareUpper && (
                                <>
                                  <p className="text-xs text-gray-500 mt-2">95% CI for Medicare:</p>
                                  <p className="text-xs text-gray-600">${data.medicareLower?.toLocaleString()} - ${data.medicareUpper?.toLocaleString()}</p>
                                </>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    
                    <Line type="monotone" dataKey="medicare" stroke="#1976d2" strokeWidth={2} name="Medicare" />
                    <Line type="monotone" dataKey="medicaid" stroke="#4caf50" strokeWidth={2} name="Medicaid" />
                    <Line type="monotone" dataKey="commercial" stroke="#ff9800" strokeWidth={2} name="Commercial" />
                    <Line type="monotone" dataKey="selfPay" stroke="#f44336" strokeWidth={2} name="Self-Pay" />
                    
                    {/* Confidence interval for Medicare (primary payer) */}
                    {showForecast && (
                      <>
                        <Line type="monotone" dataKey="medicareUpper" stroke="#64b5f6" strokeWidth={1} strokeDasharray="3 3" dot={false} name="95% CI" connectNulls={false} />
                        <Line type="monotone" dataKey="medicareLower" stroke="#64b5f6" strokeWidth={1} strokeDasharray="3 3" dot={false} name="" connectNulls={false} />
                      </>
                    )}
                    
                    {/* Reference line to separate historical vs predicted */}
                    {showForecast && <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Predictions with Confidence Intervals */}
          {showForecast && (
            <div className="mb-6 col-span-1 lg:col-span-2">
              <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Predictions</h6>
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Revenue Predictions with 95% Confidence Interval</CardTitle>
                  <p className="text-sm text-gray-600">Historical data (Jan-May) and future predictions (Jun-Dec 2025)</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={predictionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month"
                        tick={{ fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (value) return [`$${value.toLocaleString()}`, name];
                          return [null, name];
                        }}
                        labelFormatter={(label) => `Month: ${label}`}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded shadow">
                                <p className="font-medium">{`Month: ${label}`}</p>
                                <p style={{ color: '#1976d2' }}>
                                  {`Revenue: $${data.revenue?.toLocaleString() || 'N/A'}`}
                                </p>
                                {data.upperBound && data.lowerBound && (
                                  <>
                                    <p style={{ color: '#64b5f6' }}>
                                      {`Upper CI: $${data.upperBound.toLocaleString()}`}
                                    </p>
                                    <p style={{ color: '#64b5f6' }}>
                                      {`Lower CI: $${data.lowerBound.toLocaleString()}`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">95% Confidence Interval</p>
                                  </>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                  {data.isHistorical ? 'Historical Data' : 'Predicted Data'}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      
                      {/* Main revenue line */}
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#1976d2" 
                        strokeWidth={3}
                        dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                        name="Revenue"
                      />
                      
                      {/* Confidence interval bounds */}
                      <Line 
                        type="monotone"
                        dataKey="upperBound"
                        stroke="#64b5f6"
                        strokeWidth={2}
                        dot={false}
                        name="Upper Bound"
                      />
                      <Line 
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="#64b5f6"
                        strokeWidth={2}
                        dot={false}
                        name="Lower Bound"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
