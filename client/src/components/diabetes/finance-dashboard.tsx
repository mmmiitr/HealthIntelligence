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
        return { current: "2024 PROGRESS", forecast: "2025 FORECAST" };
      default:
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    }
  };

  const labels = getViewLabels();
  const { data: adminMetrics } = useQuery({
    queryKey: ["/api/admin/metrics", timeFilter],
  });

  const PAYER_COLORS = ['#1976d2', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Finance Dashboard</h2>
            <p className="text-gray-600 mt-1">Financial performance and revenue management</p>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
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

      {/* Side-by-Side Revenue & Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Revenue Analysis Column */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Revenue Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
          </h3>
          
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

          {/* CPT Code Revenue Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Top 5 CPT Code Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">99214</span>
                  <span className="text-blue-600 font-semibold">$425,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">99213</span>
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

        {/* Cost Analysis Column */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-red-600" />
            Cost Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
          </h3>
          
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
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="medicare"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Medicare"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="medicaid"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Medicaid"
                  dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="private"
                  stroke="#64b5f6"
                  strokeWidth={3}
                  name="Private"
                  dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="other"
                  stroke="#ef5350"
                  strokeWidth={3}
                  name="Other"
                  dot={{ fill: "#ef5350", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Split Trend Line */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Source Trends</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Split Trends Over Time</CardTitle>
            <p className="text-sm text-gray-600">Monthly revenue breakdown by service type</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Dec 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: "Jan 2025", inPerson: 195, ccm: 115, telemedicine: 75, dsmt: 25, labs: 15 },
                { month: "Feb 2025", inPerson: 205, ccm: 118, telemedicine: 78, dsmt: 28, labs: 16 },
                { month: "Mar 2025", inPerson: 210, ccm: 120, telemedicine: 80, dsmt: 30, labs: 18 },
                { month: "Apr 2025", inPerson: 212, ccm: 122, telemedicine: 82, dsmt: 28, labs: 19 },
                { month: "May 2025", inPerson: 215, ccm: 125, telemedicine: 85, dsmt: 32, labs: 20 },
                { month: "Jun 2025", inPerson: 218, ccm: 128, telemedicine: 88, dsmt: 35, labs: 22 },
                { month: "Jul 2025", inPerson: 220, ccm: 130, telemedicine: 90, dsmt: 38, labs: 24 },
                { month: "Aug 2025", inPerson: 225, ccm: 135, telemedicine: 95, dsmt: 40, labs: 25 },
                { month: "Sep 2025", inPerson: 228, ccm: 138, telemedicine: 98, dsmt: 42, labs: 27 },
                { month: "Oct 2025", inPerson: 230, ccm: 140, telemedicine: 100, dsmt: 45, labs: 28 },
                { month: "Nov 2025", inPerson: 235, ccm: 145, telemedicine: 105, dsmt: 48, labs: 30 },
                { month: "Dec 2025", inPerson: 240, ccm: 150, telemedicine: 110, dsmt: 50, labs: 32 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}K`} />
                <Tooltip formatter={(value, name) => [`$${value}K`, name]} 
                         labelFormatter={() => "Revenue trends by service type"} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="inPerson"
                  stroke="#ff9800"
                  strokeWidth={3}
                  name="In-Person Visits"
                  dot={{ fill: "#ff9800", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="ccm"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="CCM"
                  dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="telemedicine"
                  stroke="#9c27b0"
                  strokeWidth={3}
                  name="Telemedicine"
                  dot={{ fill: "#9c27b0", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="dsmt"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="DSMT"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="labs"
                  stroke="#f44336"
                  strokeWidth={3}
                  name="Labs"
                  dot={{ fill: "#f44336", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Predictions with Confidence Intervals */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Predictions</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predicted Revenue with 95% Confidence Interval</CardTitle>
            <p className="text-sm text-gray-600">Historical data (Jan-May) and future predictions (Jun-Dec 2025)</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Dec 2025</p>
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