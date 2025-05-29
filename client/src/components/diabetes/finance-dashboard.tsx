import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Shield, Brain, AlertTriangle, Calculator, Building, Users, Heart, Stethoscope, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart } from "recharts";
import { revenueData, revenueByInsuranceData, payerRevenueTrends, revenueSourcesData, predictionsData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";

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

  return (
    <div className="p-6">
      {/* Financial Overview - Keep as is (perfect) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profit Card - Green */}
          <Card className="bg-white shadow-lg border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit</p>
                  <p className="text-3xl font-bold text-green-600">$842,591</p>
                  <p className="text-sm text-green-600 mt-1">+15.3%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card - Blue */}
          <Card className="bg-white shadow-lg border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">$1,523,891</p>
                  <p className="text-sm text-blue-600 mt-1">+6.2%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Card - Red */}
          <Card className="bg-white shadow-lg border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost</p>
                  <p className="text-3xl font-bold text-red-600">$681,300</p>
                  <p className="text-sm text-red-600 mt-1">+3.1%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="text-red-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
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
                <p className="text-2xl font-bold text-blue-700">$2,400</p>
                <p className="text-xs text-blue-600">+8.5%</p>
              </CardContent>
            </Card>
          </div>

          {/* Payer Mix Distribution */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Mix Distribution</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Medicare', value: 45, fill: '#1976d2' },
                        { name: 'Medicaid', value: 25, fill: '#2196f3' },
                        { name: 'Commercial', value: 20, fill: '#64b5f6' },
                        { name: 'Self-Pay', value: 10, fill: '#bbdefb' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill="#1976d2" />
                      <Cell fill="#2196f3" />
                      <Cell fill="#64b5f6" />
                      <Cell fill="#bbdefb" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
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

          {/* Revenue Sources Over Time */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Sources Over Time</h6>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Sources Over Time (Mock Data)</CardTitle>
                <p className="text-sm text-gray-600">Data Range: Jan 2024 - May 2025</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueSourcesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`$${value}`, name]}
                      labelFormatter={(label) => `Month: ${label}`}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value}`}
                                </p>
                              ))}
                              <p className="text-xs text-gray-500 mt-2">Mock data as of May 2025</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="inPersonVisits" stroke="#1976d2" name="In-Person Visits" strokeWidth={2} />
                    <Line type="monotone" dataKey="ccm" stroke="#4caf50" name="CCM" strokeWidth={2} />
                    <Line type="monotone" dataKey="dsmt" stroke="#64b5f6" name="DSMT" strokeWidth={2} />
                    <Line type="monotone" dataKey="telemedicine" stroke="#ef5350" name="Telemedicine" strokeWidth={2} />
                    <Line type="monotone" dataKey="labs" stroke="#ff9800" name="Labs" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cost Analysis Section (Row 3) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-red-600" />
          Cost Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Average Cost per Patient */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Average Cost Per Patient</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Average cost per patient in panel</p>
                <p className="text-2xl font-bold text-red-700">$2,380</p>
                <p className="text-xs text-red-600">+3.2%</p>
              </CardContent>
            </Card>
          </div>

          {/* Cost per Visit */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Cost per Visit</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Cost per visit</p>
                <p className="text-2xl font-bold text-red-700">$120</p>
                <p className="text-xs text-red-600">-2.1%</p>
              </CardContent>
            </Card>
          </div>

          {/* Labor Cost */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Labor Cost</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Labor Cost</p>
                    <p className="text-2xl font-bold text-red-700">$800K</p>
                    <p className="text-xs text-red-600">+5.2%</p>
                  </div>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center cursor-help">
                      <Calculator className="text-red-600" size={20} />
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap z-10">
                      Physician: 40%, Nurse: 30%, Technician: 20%, Care Manager: 10%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Costs */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Other Costs</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Other Costs</p>
                <p className="text-2xl font-bold text-red-700">$390K</p>
                <p className="text-xs text-red-600">(e.g., lab tests, supplies)</p>
              </CardContent>
            </Card>
          </div>

          {/* Cost Trends Over Time */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Cost Trends Over Time</h6>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Analysis Trends (Mock Data)</CardTitle>
                <p className="text-sm text-gray-600">Data Range: Jan 2024 - May 2025</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan 2024', laborCost: 180000, otherCosts: 85000, totalCost: 265000 },
                    { month: 'Feb 2024', laborCost: 185000, otherCosts: 87000, totalCost: 272000 },
                    { month: 'Mar 2024', laborCost: 190000, otherCosts: 89000, totalCost: 279000 },
                    { month: 'Apr 2024', laborCost: 195000, otherCosts: 91000, totalCost: 286000 },
                    { month: 'May 2024', laborCost: 200000, otherCosts: 93000, totalCost: 293000 },
                    { month: 'Jun 2024', laborCost: 205000, otherCosts: 95000, totalCost: 300000 },
                    { month: 'Jul 2024', laborCost: 210000, otherCosts: 97000, totalCost: 307000 },
                    { month: 'Aug 2024', laborCost: 215000, otherCosts: 99000, totalCost: 314000 },
                    { month: 'Sep 2024', laborCost: 220000, otherCosts: 101000, totalCost: 321000 },
                    { month: 'Oct 2024', laborCost: 225000, otherCosts: 103000, totalCost: 328000 },
                    { month: 'Nov 2024', laborCost: 230000, otherCosts: 105000, totalCost: 335000 },
                    { month: 'Dec 2024', laborCost: 235000, otherCosts: 107000, totalCost: 342000 },
                    { month: 'Jan 2025', laborCost: 240000, otherCosts: 109000, totalCost: 349000 },
                    { month: 'Feb 2025', laborCost: 245000, otherCosts: 111000, totalCost: 356000 },
                    { month: 'Mar 2025', laborCost: 250000, otherCosts: 113000, totalCost: 363000 },
                    { month: 'Apr 2025', laborCost: 255000, otherCosts: 115000, totalCost: 370000 },
                    { month: 'May 2025', laborCost: 260000, otherCosts: 117000, totalCost: 377000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`$${value}`, name]}
                      labelFormatter={(label) => `Month: ${label}`}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value}`}
                                </p>
                              ))}
                              <p className="text-xs text-gray-500 mt-2">Mock data as of May 2025</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="totalCost" stroke="#dc2626" name="Total Cost" strokeWidth={3} />
                    <Line type="monotone" dataKey="laborCost" stroke="#f59e0b" name="Labor Cost" strokeWidth={2} />
                    <Line type="monotone" dataKey="otherCosts" stroke="#ef4444" name="Other Costs" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payer Revenue Trends */}
      <div className="mb-8">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Payer Revenue Trends</CardTitle>
            <p className="text-sm text-gray-600">Revenue trends by insurance payer over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={payerRevenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                <Legend />
                <Line type="monotone" dataKey="medicare" stroke="#1976d2" strokeWidth={2} name="Medicare" />
                <Line type="monotone" dataKey="medicaid" stroke="#4caf50" strokeWidth={2} name="Medicaid" />
                <Line type="monotone" dataKey="commercial" stroke="#ff9800" strokeWidth={2} name="Commercial" />
                <Line type="monotone" dataKey="selfPay" stroke="#f44336" strokeWidth={2} name="Self-Pay" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Predictions with Confidence Intervals */}
      <div className="mb-8">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Predictions with 95% Confidence Interval</CardTitle>
            <p className="text-sm text-gray-600">Historical data (Jan-May) and future predictions (Jun-Dec 2025)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={predictionsData}>
                <defs>
                  <linearGradient id="confidenceInterval" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64b5f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#64b5f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
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
                
                {/* Shaded confidence interval area for future predictions */}
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stackId="1"
                  stroke="none"
                  fill="url(#confidenceInterval)"
                  fillOpacity={0.3}
                  name="95% Confidence Interval"
                />
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stackId="1"
                  stroke="none"
                  fill="white"
                  name=""
                />
                
                {/* Main revenue line */}
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1976d2" 
                  strokeWidth={3}
                  dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
                
                {/* Reference line to separate historical vs predicted */}
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Shaded area represents 95% confidence interval for future predictions. Historical data shows actual revenue.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}