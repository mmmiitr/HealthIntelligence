import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, TrendingUp, Shield, Brain, Calendar, Heart, Clock, UserCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { populationMetricsData, providerWorkloadData, patientFlowData, resourceAllocationData, serviceUtilizationData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";

interface OperationDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function OperationDashboard({ timeFilter, viewMode, showForecast }: OperationDashboardProps) {
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

  const { data: resourceUtilization } = useQuery({
    queryKey: ["/api/admin/resource-utilization", timeFilter],
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Operation Dashboard</h2>
            <p className="text-gray-600 mt-1">Operational efficiency and resource management</p>
          </div>
        </div>
      </div>

      {/* Population Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Population Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600"># of Chronic Patients</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">↑ +5.1%</span>
                    <span className="text-gray-500 text-sm">vs {viewMode === "monthly" ? "Apr" : viewMode === "quarterly" ? "Q1" : "2024"}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.current}</p>
                  <p className="text-xl font-bold text-gray-900">1,247 / 1,290</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '97%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">97% complete</p>
                </div>
                
                {showForecast && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.forecast}</p>
                    <p className="text-xl font-bold text-gray-900">1,315</p>
                    <p className="text-xs text-gray-600 mt-1">+1.9% growth projected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Readmission Rate</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-red-600 font-medium text-sm">↑ +0.8%</span>
                    <span className="text-gray-500 text-sm">vs {viewMode === "monthly" ? "Apr" : viewMode === "quarterly" ? "Q1" : "2024"}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Bed className="text-red-600" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.current}</p>
                  <p className="text-xl font-bold text-gray-900">8% / 5%</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Exceeds target - needs attention</p>
                </div>
                
                {showForecast && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.forecast}</p>
                    <p className="text-xl font-bold text-gray-900">6.5%</p>
                    <p className="text-xs text-gray-600 mt-1">-18.8% improvement projected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Care Coordination</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +2.1%</span>
                    <span className="text-gray-500 text-sm">vs {viewMode === "monthly" ? "Apr" : viewMode === "quarterly" ? "Q1" : "2024"}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="text-green-600" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                  <p className="text-lg font-bold text-gray-900 text-center">94% / 95%</p>
                </div>
                
                {showForecast && (
                  <div className="bg-blue-50 rounded-lg p-2.5">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                    <p className="text-lg font-bold text-gray-900">96%</p>
                    <p className="text-xs text-gray-600 mt-1">+1.1% improvement projected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">Above national avg</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="text-purple-600" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.current}</p>
                  <p className="text-xl font-bold text-gray-900">4.6 / 4.5</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Exceeds target</p>
                </div>
                
                {showForecast && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{labels.forecast}</p>
                    <p className="text-xl font-bold text-gray-900">4.8</p>
                    <p className="text-xs text-gray-600 mt-1">+4.3% improvement projected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Provider Workload */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Provider Workload ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Panel Size</p>
                  <p className="text-2xl font-bold text-gray-900">189</p>
                  <p className="text-xs text-gray-500 mt-1">patients per provider</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Time to Next Appointment</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500 mt-1">days average wait</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white" style={{borderLeft: '4px solid #ef5350'}} title="Average wait time for diabetic patients in May 2025 (Target: 10 minutes).">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Patient Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-xs text-gray-500 mt-1">minutes</p>
                  <p className="text-xs text-blue-600 mt-1">Target: 10 minutes</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600 font-medium">Potential bottleneck</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patient Flow Trends */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Flow Trends ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Hidden Trends in Patient Flow</CardTitle>
            <p className="text-sm text-gray-600">AI-detected patterns in patient visit frequencies</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name]} 
                         labelFormatter={() => "Patient flow analysis with ML detection"} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="inflow"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Patient Inflow"
                  dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="outflow"
                  stroke="#ef5350"
                  strokeWidth={3}
                  name="Patient Outflow"
                  dot={{ fill: "#ef5350", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Net Flow"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Allocation */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Resource Allocation ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Resource Allocation</CardTitle>
            <p className="text-sm text-gray-600">Staff allocation optimization for diabetes care</p>
            <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceAllocationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name]} 
                         labelFormatter={() => "Resource allocation analysis"} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Bar
                  dataKey="needed"
                  fill="#ef5350"
                  name="Needed"
                />
                <Bar
                  dataKey="available"
                  fill="#4caf50"
                  name="Available"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Utilization */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Utilization ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
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
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Bar dataKey="labTests" fill="#1976d2" name="Lab Tests" />
                <Bar dataKey="consultations" fill="#4caf50" name="Consultations" />
                <Bar dataKey="telemedicine" fill="#64b5f6" name="Telemedicine" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}