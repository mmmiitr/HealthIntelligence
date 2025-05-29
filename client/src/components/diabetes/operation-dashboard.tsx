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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Population Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Refactored # of Chronic Patients Card */}
          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900"># of Chronic Patients</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-blue-900">1,247</div>
                  <div className="text-xs text-blue-600">↑ +5.1%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">1,315</div>
                    <div className="text-xs text-blue-600">+1.9% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{width: '97%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">97% complete</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored Readmission Rate Card */}
          <Card className="bg-white border-l-4 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Bed className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-gray-900">Readmission Rate</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-red-900">8%</div>
                  <div className="text-xs text-red-600">↑ +0.8%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">6.5%</div>
                    <div className="text-xs text-blue-600">-18.8% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-red-500 h-1 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="text-xs text-red-600 text-center">Exceeds target</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored Care Coordination Card */}
          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-900">Care Coordination</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-green-900">94%</div>
                  <div className="text-xs text-green-600">↑ +2.1%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">96%</div>
                    <div className="text-xs text-blue-600">+1.1% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{width: '99%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">99% complete</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored Patient Satisfaction Card */}
          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">Patient Satisfaction</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-purple-900">4.6</div>
                  <div className="text-xs text-green-600">Above national avg</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">4.7</div>
                    <div className="text-xs text-blue-600">+2.2% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-purple-500 h-1 rounded-full" style={{width: '95%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">Exceeds target</div>
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