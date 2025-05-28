import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Shield, Brain, AlertTriangle, Calculator, Building, Users, Heart, Stethoscope, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { revenueData, revenueByInsuranceData, payerRevenueTrends } from "@/lib/mock-data";
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

      {/* Profitability Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Profitability Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Profit</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-green-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Row 1: Progress bar with percentage */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">94% complete</p>
                </div>
                
                {/* Row 2: Current values with forecast comparison */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">$425K / $450K</p>
                      <p className="text-xs text-gray-600">Current</p>
                    </div>
                    {showForecast && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">$465K</p>
                        <p className="text-xs text-blue-600">+9.4% forecast</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">↑ +8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Row 1: Progress bar with percentage */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">65% complete</p>
                </div>
                
                {/* Row 2: Current values with forecast comparison */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">$1.2M / $1.85M</p>
                      <p className="text-xs text-gray-600">Current</p>
                    </div>
                    {showForecast && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">$1.95M</p>
                        <p className="text-xs text-blue-600">+5.4% forecast</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Care Management Alignment</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +2.1%</span>
                    <span className="text-gray-500 text-sm">vs {viewMode === "monthly" ? "Apr" : viewMode === "quarterly" ? "Q1" : "2024"}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="text-purple-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Row 1: Progress bar with percentage */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">99% complete</p>
                </div>
                
                {/* Row 2: Current values with forecast comparison */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">94% / 95%</p>
                      <p className="text-xs text-gray-600">Current</p>
                    </div>
                    {showForecast && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">96%</p>
                        <p className="text-xs text-blue-600">+1.1% forecast</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Revenue per Patient</p>
                    <p className="text-2xl font-bold text-blue-600">$341</p>
                    <p className="text-xs text-gray-500 mt-1">Per panel patient</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="text-blue-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue from CCM</p>
                    <p className="text-2xl font-bold text-green-600">$125K</p>
                    <p className="text-xs text-gray-500 mt-1">29% of total revenue</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="text-green-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue from Telemedicine</p>
                    <p className="text-2xl font-bold text-purple-600">$85K</p>
                    <p className="text-xs text-gray-500 mt-1">20% of total revenue</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Building className="text-purple-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue from In-Person</p>
                    <p className="text-2xl font-bold text-orange-600">$215K</p>
                    <p className="text-xs text-gray-500 mt-1">51% of total revenue</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="text-orange-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payer Mix Chart */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Payer Mix Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Medicare', value: 45, color: '#1976d2' },
                        { name: 'Medicaid', value: 25, color: '#4caf50' },
                        { name: 'Commercial', value: 20, color: '#ff9800' },
                        { name: 'Self-Pay', value: 7, color: '#9c27b0' },
                        { name: 'Other', value: 3, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {[
                        { name: 'Medicare', value: 45, color: '#1976d2' },
                        { name: 'Medicaid', value: 25, color: '#4caf50' },
                        { name: 'Commercial', value: 20, color: '#ff9800' },
                        { name: 'Self-Pay', value: 7, color: '#9c27b0' },
                        { name: 'Other', value: 3, color: '#f44336' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PAYER_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">Payer Mix for Diabetic Patients (Total: 1,247 patients)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Source Split Chart */}
        <Card className="bg-white shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Source Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'In-Person Visits', value: 51, color: '#ff9800' },
                      { name: 'CCM', value: 29, color: '#4caf50' },
                      { name: 'Telemedicine', value: 20, color: '#9c27b0' }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {[
                      { name: 'In-Person Visits', value: 51, color: '#ff9800' },
                      { name: 'CCM', value: 29, color: '#4caf50' },
                      { name: 'Telemedicine', value: 20, color: '#9c27b0' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ff9800', '#4caf50', '#9c27b0'][index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-2">Revenue distribution by service type ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</p>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 CPT Codes Revenue Table */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Top 5 CPT Codes Revenue</CardTitle>
            <p className="text-sm text-gray-600">{viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">CPT Code</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">99213 - Office Visit (Established)</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$125,450</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">99490 - CCM Services</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$89,320</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">99214 - Office Visit (Complex)</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$76,890</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">95251 - CGM Setup</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$42,150</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900">99401 - DSMT Group</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$31,280</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-l-4 border-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Cost per Patient</p>
                    <p className="text-2xl font-bold text-red-600">$184</p>
                    <p className="text-xs text-gray-500 mt-1">Per panel patient</p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Calculator className="text-red-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cost per Visit</p>
                    <p className="text-2xl font-bold text-orange-600">$145</p>
                    <p className="text-xs text-gray-500 mt-1">Average per encounter</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Building className="text-orange-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Labor Cost</p>
                    <p className="text-2xl font-bold text-purple-600">$165K</p>
                    <p className="text-xs text-gray-500 mt-1">72% of total cost</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="text-purple-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-gray-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Other Costs</p>
                    <p className="text-2xl font-bold text-gray-600">$65K</p>
                    <p className="text-xs text-gray-500 mt-1">Labs, supplies, etc.</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Wrench className="text-gray-600 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labor Cost Breakdown */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Labor Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Physician', value: 45, amount: '$74K' },
                        { name: 'Nurse', value: 28, amount: '$46K' },
                        { name: 'Care Manager', value: 18, amount: '$30K' },
                        { name: 'Technician', value: 9, amount: '$15K' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value, amount }) => `${name}: ${value}%`}
                    >
                      {[
                        { name: 'Physician', value: 45 },
                        { name: 'Nurse', value: 28 },
                        { name: 'Care Manager', value: 18 },
                        { name: 'Technician', value: 9 }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#1976d2', '#4caf50', '#ff9800', '#9c27b0'][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.amount})`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">Total labor cost: $165K ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payer Revenue Trends */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Payer Revenue Trends ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Payer Revenue Trends Over Time</CardTitle>
            <p className="text-sm text-gray-600">Payer Revenue Trends Over Time (Mock Data)</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={payerRevenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value/1000)}K`} />
                <Tooltip formatter={(value, name) => [`$${value?.toLocaleString()}`, name]} 
                         labelFormatter={() => "Mock data as of May 2025."} />
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
            <p className="text-sm text-gray-600">AI-driven revenue forecasting extending through 2026</p>
            <p className="text-xs text-gray-500">Future Data Range: Jun 2025 - Dec 2026</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: "Jun 2025", predicted: 465, lower: 440, upper: 490 },
                { month: "Jul 2025", predicted: 475, lower: 445, upper: 505 },
                { month: "Aug 2025", predicted: 485, lower: 450, upper: 520 },
                { month: "Sep 2025", predicted: 495, lower: 455, upper: 535 },
                { month: "Oct 2025", predicted: 505, lower: 460, upper: 550 },
                { month: "Nov 2025", predicted: 515, lower: 465, upper: 565 },
                { month: "Dec 2025", predicted: 525, lower: 470, upper: 580 },
                { month: "Jan 2026", predicted: 535, lower: 475, upper: 595 },
                { month: "Feb 2026", predicted: 545, lower: 480, upper: 610 },
                { month: "Mar 2026", predicted: 555, lower: 485, upper: 625 },
                { month: "Apr 2026", predicted: 565, lower: 490, upper: 640 },
                { month: "May 2026", predicted: 575, lower: 495, upper: 655 },
                { month: "Jun 2026", predicted: 585, lower: 500, upper: 670 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}K`} />
                <Tooltip formatter={(value, name) => [`$${value}K`, name]} 
                         labelFormatter={() => "Revenue prediction with confidence bands"} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                {/* Confidence Interval Area */}
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="#e3f2fd"
                  strokeWidth={0}
                  fill="#e3f2fd"
                  fillOpacity={0.3}
                  name="95% Upper Bound"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#e3f2fd"
                  strokeWidth={0}
                  fill="#e3f2fd"
                  fillOpacity={0.3}
                  name="95% Lower Bound"
                  dot={false}
                />
                {/* Main Prediction Line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#1976d2"
                  strokeWidth={4}
                  name="Predicted Revenue"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Shaded area represents 95% confidence interval. Prediction accuracy: 92%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}