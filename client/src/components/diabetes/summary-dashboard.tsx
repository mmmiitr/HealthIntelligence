import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Users, Bed, TrendingUp, Shield, Brain, Calendar, Heart, Clock, UserCheck, AlertTriangle, Download, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { keyMetricsTrendsData } from "@/lib/mock-data";

interface SummaryDashboardProps {
  timeFilter: string;
}

export default function SummaryDashboard({ timeFilter }: SummaryDashboardProps) {
  const handleDownloadReport = () => {
    window.alert("Downloading CSV: Key Metrics (Profitability, HbA1c, CCM Enrollment, Readmission Rate)");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Summary Dashboard</h2>
            <p className="text-gray-600 mt-1">Executive overview of diabetes care management</p>
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
            <Button 
              onClick={handleDownloadReport}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Report (CSV)</span>
            </Button>
            <p className="text-sm text-gray-500">Last Updated: May 28, 2025, 05:52 PM IST</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics (Q2 2025)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-green-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q2 PROGRESS</p>
                  <p className="text-lg font-bold text-gray-900">$1.2M / $1.85M</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">65% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q3 FORECAST</p>
                  <p className="text-lg font-bold text-gray-900">$1.95M</p>
                  <p className="text-xs text-gray-600 mt-1">+5.4% growth projected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">↑ +5.1%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q2 PROGRESS</p>
                  <p className="text-lg font-bold text-gray-900">1,247 / 1,290</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '97%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">97% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q3 FORECAST</p>
                  <p className="text-lg font-bold text-gray-900">1,310</p>
                  <p className="text-xs text-gray-600 mt-1">+1.6% growth projected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg A1C Level</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↓ -0.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="text-purple-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q2 PROGRESS</p>
                  <p className="text-lg font-bold text-gray-900">7.2% / 7.1%</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Near target (lower is better)</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Q3 FORECAST</p>
                  <p className="text-lg font-bold text-gray-900">6.9%</p>
                  <p className="text-xs text-gray-600 mt-1">-4.2% improvement projected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Care Coordination</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">↑ +2.1%</span>
                    <span className="text-gray-500 text-sm">vs Q1</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCheck className="text-orange-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Q2 PROGRESS</p>
                  <p className="text-xl font-bold text-gray-900">94% / 95%</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">99% complete</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Q3 FORECAST</p>
                  <p className="text-xl font-bold text-gray-900">96%</p>
                  <p className="text-xs text-gray-600 mt-1">+1.1% improvement projected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Critical Alerts</h3>
        <Card className="bg-red-500 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-white mt-0.5" />
                <p className="text-white font-medium">30-Day Readmission Rate (8%) exceeds target of 5%.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-white mt-0.5" />
                <p className="text-white font-medium">No-Show Appointments (12%) exceeds target of 10%.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Trends Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics Trends</h3>
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Key Metrics Trends Over Time (Mock Data)</CardTitle>
            <p className="text-sm text-gray-600">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={keyMetricsTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`, 
                    name === "inControlHbA1c" ? "% In-Control HbA1c" : "30-Day Readmission Rate"
                  ]} 
                  labelFormatter={() => "Mock data simulating trends as of May 2025."}
                />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="inControlHbA1c"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="% In-Control HbA1c"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="readmissionRate"
                  stroke="#ef5350"
                  strokeWidth={3}
                  name="30-Day Readmission Rate"
                  dot={{ fill: "#ef5350", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
        <Card className="bg-blue-50 shadow-lg border-l-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recommended Actions</CardTitle>
            <p className="text-sm text-gray-600">Strategic initiatives to improve diabetes care outcomes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-800">
                  <span className="font-medium">Increase CCM Enrollment:</span> Current 75%, Target 85% to improve outcomes.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-800">
                  <span className="font-medium">Reduce No-Show Appointments:</span> Current 12%, Target &lt;10% with reminders.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}