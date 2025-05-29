import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Bed, TrendingUp, Shield, Brain, Calendar, Heart, Clock, UserCheck, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, AreaChart, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { populationMetricsData, financialMetricsData, providerWorkloadData, predictionsData, revenueData, patientFlowData, revenueByInsuranceData, serviceUtilizationData } from "@/lib/mock-data";

interface AdminDashboardProps {
  timeFilter: string;
}

export default function AdminDashboard({ timeFilter }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("finance");
  
  const { data: adminMetrics } = useQuery({
    queryKey: ["/api/admin/metrics", timeFilter],
  });

  const { data: resourceUtilization } = useQuery({
    queryKey: ["/api/admin/resource-utilization", timeFilter],
  });

  // Get latest data for new metrics
  const latestPopulationData = populationMetricsData[populationMetricsData.length - 1];
  const latestFinancialData = financialMetricsData[financialMetricsData.length - 1];
  const latestWorkloadData = providerWorkloadData[providerWorkloadData.length - 1];
  
  // Calculate total profit
  const currentTotalRevenue = 1050000; // From existing revenue data
  const totalCosts = 940000;
  const totalProfit = currentTotalRevenue - totalCosts;

  // Payer mix data for pie chart
  const payerMixData = [
    { name: 'Medicare', value: 40, color: '#1976d2' },
    { name: 'Medicaid', value: 20, color: '#4caf50' },
    { name: 'Private', value: 30, color: '#ff9800' },
    { name: 'Other', value: 10, color: '#9c27b0' }
  ];

  // Prepare revenue trend data with predictions
  const revenueTrendData = Array.isArray(adminMetrics) ? adminMetrics.map((item: any, index: number) => {
    const revenue = isNaN(parseFloat(item.totalRevenue)) ? 0 : parseFloat(item.totalRevenue) / 1000;
    return {
      month: item.month,
      revenue: revenue,
      isPredicted: item.isPredicted,
      // Add confidence intervals for predicted data
      lowerCI: item.isPredicted ? revenue * 0.95 : null,
      upperCI: item.isPredicted ? revenue * 1.05 : null,
    };
  }) : [];

  // Get current metrics for cards
  const currentMetrics = Array.isArray(adminMetrics) && adminMetrics.length > 0 ? adminMetrics[adminMetrics.length - 1] : null;
  const totalRevenue = currentMetrics ? 
    (isNaN(parseFloat(currentMetrics.totalRevenue)) ? 0 : parseFloat(currentMetrics.totalRevenue) / 1000000).toFixed(1) : "0.0";
  const costPerPatient = currentMetrics?.costPerPatient || "0";
  const bedOccupancy = currentMetrics?.bedOccupancy || "0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">Hospital administration overview for diabetes care management</p>
            <div className="flex items-center mt-2 space-x-4">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA-Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <Brain className="h-3 w-3 mr-1" />
                AI/ML Enhanced
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm text-gray-500">Last Updated: May 28, 2025, 04:27 PM IST</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Banner */}
      <Card className="bg-blue-50 border-blue-200 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">${totalProfit.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Profit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">{latestPopulationData?.inControlHbA1c}%</p>
              <p className="text-sm text-gray-600">In-Control HbA1c</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">{latestPopulationData?.ccmEnrolled}%</p>
              <p className="text-sm text-gray-600">CCM Enrollment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-700">{latestPopulationData?.readmissionRate}%</p>
              <p className="text-sm text-gray-600">30-Day Readmission</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profitability Overview */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Profitability Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-l-4 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600" title="Reflects revenue minus costs for diabetic patients">Total Profit</p>
                    <p className="text-2xl font-bold text-green-900">${totalProfit.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Revenue - Costs</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-900">${currentTotalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600" title="Supports Chronic Care Management (CCM), the most common program for chronic care. Other programs can be supported.">% Enrolled in CCM</p>
                    <p className="text-2xl font-bold text-purple-900">{latestPopulationData?.ccmEnrolled}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Population Metrics */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Population Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Card className="bg-white border-l-4 border-blue-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600"># Chronic Patients</p>
                <p className="text-xl font-bold text-blue-900">{latestPopulationData?.chronicPatients}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-l-4 border-green-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600"># New Patients</p>
                <p className="text-xl font-bold text-green-900">{latestPopulationData?.newPatients}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600" title="Patients with HbA1c less than 7%">% HbA1c (&lt;7%)</p>
                <p className="text-xl font-bold text-green-900">{latestPopulationData?.inControlHbA1c}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-red-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600" title="High readmission rates may indicate care gaps">30-Day Readmission</p>
                <p className="text-xl font-bold text-red-900">{latestPopulationData?.readmissionRate}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-red-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600" title="Missed appointments impact care continuity">% No-Show Appts</p>
                <p className="text-xl font-bold text-orange-900">{latestPopulationData?.noShowRate}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-blue-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600">Avg Visits/Month</p>
                <p className="text-xl font-bold text-blue-900">{latestPopulationData?.avgVisits}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600" title="Virtual care adoption rate">% Telemedicine</p>
                <p className="text-xl font-bold text-green-900">{latestPopulationData?.telemedicineVisits}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-red-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600" title="Patients requiring intensive monitoring">% High-Risk</p>
                <p className="text-xl font-bold text-red-900">{latestPopulationData?.highRisk}%</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-purple-500">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-gray-600">CCM Revenue/Patient</p>
                <p className="text-xl font-bold text-purple-900">${latestPopulationData?.ccmRevenue}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" title="Monthly reimbursement from insurance">Reimbursement/Patient/Month</p>
                      <p className="text-2xl font-bold text-green-900">${latestFinancialData?.reimbursement}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" title="Projected monthly cost per patient">Cost/Patient/Month</p>
                      <p className="text-2xl font-bold text-blue-900">${latestFinancialData?.cost}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" title="Actual monthly cost per patient">Actual Cost/Patient/Month</p>
                      <p className="text-2xl font-bold text-orange-900">${latestFinancialData?.actualCost}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-purple-500">
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-4" title="Insurance distribution for diabetic patients">Payer Mix</p>
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie
                          data={payerMixData}
                          cx="50%"
                          cy="50%"
                          innerRadius={20}
                          outerRadius={40}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {payerMixData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
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
          </CardContent>
        </Card>

      {/* Provider Workload */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Provider Workload</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Panel Size per Provider</p>
                  <p className="text-2xl font-bold text-blue-900">{latestWorkloadData?.panelSize} patients</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Time to Next Appt</p>
                  <p className="text-2xl font-bold text-green-900">{latestWorkloadData?.nextApptDays} days</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">3rd Next Available Appt</p>
                  <p className="text-2xl font-bold text-purple-900">{latestWorkloadData?.thirdNextApptDays} days</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CCM Program Notice */}
      <div className="mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              <strong>Care Management:</strong> Supports Chronic Care Management (CCM) for diabetes. Other care programs can be supported on request.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Original Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue}M</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +12.5%</span>
              <span className="text-gray-500 ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Per Patient</p>
                <p className="text-2xl font-bold text-gray-900">${costPerPatient}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↓ -2.1%</span>
              <span className="text-gray-500 ml-2">cost optimization</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bed Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">{bedOccupancy}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Bed className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +3.2%</span>
              <span className="text-gray-500 ml-2">capacity utilization</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends with Predictions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Trends & Predictions</CardTitle>
            <p className="text-sm text-gray-600">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value, name) => [
                  `$${value}`,
                  name === "revenue" ? "Historical Revenue" : "Predicted Revenue"
                ]} />
                <Legend />
                
                {/* Historical Revenue - Solid Line */}
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Historical Revenue"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                
                {/* Predicted Revenue - Dashed Line */}
                <Line
                  type="monotone"
                  dataKey="predictedRevenue"
                  stroke="#64b5f6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Predicted Revenue"
                  dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                
                {/* Reference Line at Current Date */}
                <ReferenceLine x="May 2025" stroke="#dc2626" strokeWidth={2} label="Today" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Historical data (solid line) shows actual revenue. Predicted data (dashed line) shows AI/ML revenue forecasts.
            </p>
          </CardContent>
        </Card>

        {/* Resource Utilization by Department */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Resource Utilization by Department</CardTitle>
            <p className="text-sm text-gray-600">Current utilization rates across diabetes care departments</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(resourceUtilization) ? resourceUtilization.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{item.department}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(parseFloat(item.utilization) || 0, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.utilization}%</span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">Loading utilization data...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI/ML Prediction Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-8">
        {/* Predicted Patient-Level Revenue */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-600" />
              AI Revenue Predictions
              <Badge className="ml-2 bg-blue-100 text-blue-800">Next Quarter</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Patient-level revenue forecasting using machine learning</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-blue-700 font-medium">High-Value Patients</p>
                  <p className="text-xs text-blue-600">Top 20% revenue contributors</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-900">$2.4M</p>
                  <p className="text-xs text-blue-600">±$240K</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-green-700 font-medium">Standard Care Patients</p>
                  <p className="text-xs text-green-600">Regular diabetes management</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">$1.8M</p>
                  <p className="text-xs text-green-600">±$180K</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-orange-700 font-medium">New Patients</p>
                  <p className="text-xs text-orange-600">Recent diagnoses</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-900">$960K</p>
                  <p className="text-xs text-orange-600">±$150K</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predicted Visit Counts */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-green-600" />
              Visit Count Predictions
              <Badge className="ml-2 bg-green-100 text-green-800">Next Month</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Patient visit forecasting with Zero-Inflated Poisson model</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm text-red-700 font-medium">High-Risk Patients</p>
                  <p className="text-xs text-red-600">HbA1c above 8.5%</p>
                </div>
                <div className="text-right" title="Predicted average visits per patient for the next quarter based on Zero-Inflated Poisson model">
                  <p className="text-lg font-bold text-red-900">3</p>
                  <p className="text-xs text-red-600">visits/patient</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Moderate Risk</p>
                  <p className="text-xs text-yellow-600">HbA1c 7.5-8.5%</p>
                </div>
                <div className="text-right" title="Predicted average visits per patient for the next quarter based on Zero-Inflated Poisson model">
                  <p className="text-lg font-bold text-yellow-900">2</p>
                  <p className="text-xs text-yellow-600">visits/patient</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-green-700 font-medium">Well-Controlled</p>
                  <p className="text-xs text-green-600">HbA1c below 7.5%</p>
                </div>
                <div className="text-right" title="Predicted average visits per patient for the next quarter based on Zero-Inflated Poisson model">
                  <p className="text-lg font-bold text-green-900">1</p>
                  <p className="text-xs text-green-600">visits/patient</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Finance and Operation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="operation">Operation</TabsTrigger>
        </TabsList>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Financial Overview</h2>
          </div>
          
          {/* Action Item Card */}
          <Card className="bg-red-50 border-l-4 border-red-500 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">Action Item: Reduce 30-Day Readmission Rate</h3>
                    <p className="text-red-700">Current: 8%</p>
                  </div>
                </div>
                <div className="text-sm text-red-600" title="High readmission rates may indicate care gaps">
                  ⓘ High readmission rates may indicate care gaps
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Impact Analysis */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                Financial Impact Analysis
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Cost-outcome relationship for diabetes care</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Cost Reduction</h4>
                  <p className="text-2xl font-bold text-green-700">18%</p>
                  <p className="text-sm text-green-600">Lower HbA1c reduces hospitalization costs by $2,400/patient/year</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Revenue Optimization</h4>
                  <p className="text-2xl font-bold text-blue-700">$1.2M</p>
                  <p className="text-sm text-blue-600">Preventive care programs increase annual revenue</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">ROI</h4>
                  <p className="text-2xl font-bold text-purple-700">3.4x</p>
                  <p className="text-sm text-purple-600">Return on diabetes management investment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operation Tab */}
        <TabsContent value="operation" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Operational Insights</h2>
          </div>

          {/* Operational Performance Metrics */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Bed className="mr-2 h-5 w-5 text-blue-600" />
                Operational Performance Metrics
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Efficiency and capacity utilization</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Average Wait Time</h4>
                  <p className="text-2xl font-bold text-blue-700">12 min</p>
                  <p className="text-sm text-blue-600">15% improvement from last quarter</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Staff Utilization</h4>
                  <p className="text-2xl font-bold text-orange-700">87%</p>
                  <p className="text-sm text-orange-600">Optimal range: 80-90%</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Patient Satisfaction</h4>
                  <p className="text-2xl font-bold text-green-700">4.6/5</p>
                  <p className="text-sm text-green-600">Above national average of 4.2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Utilization Trends */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Service Utilization Trends</CardTitle>
              <p className="text-sm text-gray-600">Service Utilization Trends (Mock Data)</p>
              <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} uses`, name]} 
                           labelFormatter={() => "Mock data simulating trends as of May 2025."} />
                  <Legend />
                  <Bar dataKey="labTests" fill="#1976d2" name="Lab Tests" />
                  <Bar dataKey="consultations" fill="#4caf50" name="Consultations" />
                  <Bar dataKey="telemedicine" fill="#64b5f6" name="Telemedicine" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Hidden Trends in Patient Flow */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Hidden Trends in Patient Flow</CardTitle>
            <p className="text-sm text-gray-600">Seasonal Trends in Patient Visits (Mock Data)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} visits`, 'Patient Visits']} 
                         labelFormatter={() => "Mock data simulating trends as of May 2025."} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Patient Visits"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Predicted Revenue by Insurance Type and Demographics */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predicted Revenue by Insurance Type and Demographics</CardTitle>
            <p className="text-sm text-gray-600">Revenue Forecast by Insurance and Age Group (Accuracy: 5-10%)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByInsuranceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value, name) => [`$${value}`, name]} 
                         labelFormatter={() => "Mock data simulating trends as of May 2025."} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="medicare_18_40"
                  stroke="#1976d2"
                  strokeWidth={2}
                  name="Medicare 18-40"
                  dot={{ fill: "#1976d2", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="medicare_41_65"
                  stroke="#64b5f6"
                  strokeWidth={2}
                  name="Medicare 41-65"
                  dot={{ fill: "#64b5f6", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="private_18_40"
                  stroke="#4caf50"
                  strokeWidth={2}
                  name="Private 18-40"
                  dot={{ fill: "#4caf50", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="private_41_65"
                  stroke="#81c784"
                  strokeWidth={2}
                  name="Private 41-65"
                  dot={{ fill: "#81c784", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}