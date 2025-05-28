import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Shield, Brain, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { revenueData, revenueByInsuranceData } from "@/lib/mock-data";

interface FinanceDashboardProps {
  timeFilter: string;
}

export default function FinanceDashboard({ timeFilter }: FinanceDashboardProps) {
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
            <div className="flex items-center mt-2 space-x-4">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <Brain className="h-3 w-3 mr-1" />
                AI-Enhanced Analytics
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm text-gray-500">Last Updated: May 28, 2025, 05:52 PM IST</p>
          </div>
        </div>
      </div>

      {/* Profitability Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Profitability Overview</h3>
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
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                  <p className="text-lg font-bold text-gray-900">$425K / $450K</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">94% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                  <p className="text-lg font-bold text-gray-900">$465K</p>
                  <p className="text-xs text-gray-600 mt-1">+9.4% growth projected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue (Q2 2025)</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">↑ +8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-blue-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.current}</p>
                  <p className="text-xl font-bold text-gray-900">$1.2M / $1.85M</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">65% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.forecast}</p>
                  <p className="text-xl font-bold text-gray-900">$1.95M</p>
                  <p className="text-xs text-gray-600 mt-1">+5.4% growth projected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Care Management Alignment (Q2 2025)</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +2.1%</span>
                    <span className="text-gray-500 text-sm">vs Q1</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="text-purple-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.current}</p>
                  <p className="text-xl font-bold text-gray-900">94% / 95%</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">99% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.forecast}</p>
                  <p className="text-xl font-bold text-gray-900">96%</p>
                  <p className="text-xs text-gray-600 mt-1">+1.1% improvement projected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Metrics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Reimbursement Rate (Q2 2025)</p>
                  <p className="text-2xl font-bold text-blue-600">$285</p>
                  <p className="text-xs text-gray-500 mt-1">Q3 Projected: $295</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Cost per Patient (Q2 2025)</p>
                  <p className="text-2xl font-bold text-orange-600">$230</p>
                  <p className="text-xs text-gray-500 mt-1">Q3 Projected: $225</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Actual Cost (Q2 2025)</p>
                  <p className="text-2xl font-bold text-red-600">$198</p>
                  <p className="text-xs text-gray-500 mt-1">Q3 Projected: $192</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Net Margin (Q2 2025)</p>
                  <p className="text-2xl font-bold text-green-600">18.5%</p>
                  <p className="text-xs text-gray-500 mt-1">Q3 Projected: 21.2%</p>
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
                <p className="text-xs text-gray-500 mt-2">Payer Mix for Diabetic Patients (Total: 500, as of May 2025)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Predictions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Predictions</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predicted Revenue by Insurance Type and Demographics</CardTitle>
            <p className="text-sm text-gray-600">AI-driven revenue forecasting with 92% accuracy</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByInsuranceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value/1000)}K`} />
                <Tooltip formatter={(value, name) => [`$${value?.toLocaleString()}`, name]} 
                         labelFormatter={() => "Predicted revenue trends by payer type"} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="medicare_18_40"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Medicare (18-40)"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="medicare_41_65"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Medicare (41-65)"
                  dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="private_18_40"
                  stroke="#ff9800"
                  strokeWidth={3}
                  name="Private (18-40)"
                  dot={{ fill: "#ff9800", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="private_41_65"
                  stroke="#9c27b0"
                  strokeWidth={3}
                  name="Private (41-65)"
                  dot={{ fill: "#9c27b0", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}