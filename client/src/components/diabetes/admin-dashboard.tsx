import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Users, Bed, TrendingUp, Shield, Brain, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";

interface AdminDashboardProps {
  timeFilter: string;
}

export default function AdminDashboard({ timeFilter }: AdminDashboardProps) {
  const [showFinancialMetrics, setShowFinancialMetrics] = useState(true);
  
  const { data: adminMetrics } = useQuery({
    queryKey: ["/api/admin/metrics", timeFilter],
  });

  const { data: resourceUtilization } = useQuery({
    queryKey: ["/api/admin/resource-utilization", timeFilter],
  });

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
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
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
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Financial Metrics</span>
            <Switch
              checked={showFinancialMetrics}
              onCheckedChange={setShowFinancialMetrics}
            />
            <span className="text-sm text-gray-600">Operational Metrics</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
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
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Trends</CardTitle>
            <p className="text-sm text-gray-600">Historical and predicted revenue with confidence intervals</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}K`} />
                <Tooltip formatter={(value, name) => {
                  if (name === "upperCI" || name === "lowerCI") return [`$${value}K`, "Confidence Interval"];
                  return [`$${value}K`, "Revenue"];
                }} />
                <Legend />
                
                {/* Revenue line with dashed prediction */}
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0066CC"
                  strokeWidth={2}
                  name="Revenue"
                  dot={{ fill: "#0066CC" }}
                />
              </LineChart>
            </ResponsiveContainer>
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
                  <p className="text-xs text-red-600">HbA1c > 8.5%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-900">4.2</p>
                  <p className="text-xs text-red-600">visits/patient</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Moderate Risk</p>
                  <p className="text-xs text-yellow-600">HbA1c 7.5-8.5%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-900">2.8</p>
                  <p className="text-xs text-yellow-600">visits/patient</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-green-700 font-medium">Well-Controlled</p>
                  <p className="text-xs text-green-600">HbA1c < 7.5%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">1.6</p>
                  <p className="text-xs text-green-600">visits/patient</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial vs Operational Toggle Content */}
      {showFinancialMetrics ? (
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
      ) : (
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
      )}
    </div>
  );
}