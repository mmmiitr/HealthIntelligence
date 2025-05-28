import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Bed, TrendingUp, Shield, Brain, Calendar, Heart, Clock, UserCheck, AlertTriangle } from "lucide-react";

interface SummaryDashboardProps {
  timeFilter: string;
}

export default function SummaryDashboard({ timeFilter }: SummaryDashboardProps) {
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
            <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue (Q2 2025)</p>
                  <p className="text-2xl font-bold text-gray-900">$1.8M</p>
                  <p className="text-xs text-gray-500 mt-1">Realized: $1.2M / Est: $1.85M | Q3: $1.95M proj.</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">↑ +8.2%</span>
                <span className="text-gray-500 ml-2">vs Q1 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients (Q2 2025)</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-xs text-gray-500 mt-1">Current: 1,247 / Est: 1,290 | Q3: 1,310 proj.</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-blue-600 font-medium">↑ +5.1%</span>
                <span className="text-gray-500 ml-2">vs Q1 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg A1C Level (Q2 2025)</p>
                  <p className="text-2xl font-bold text-gray-900">7.2%</p>
                  <p className="text-xs text-gray-500 mt-1">Current: 7.2% / Est: 7.1% | Q3: 6.9% proj.</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">↓ -0.3%</span>
                <span className="text-gray-500 ml-2">vs Q1 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Care Coordination (Q2 2025)</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-gray-500 mt-1">Current: 94% / Est: 95% | Q3: 96% proj.</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCheck className="text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">↑ +2.1%</span>
                <span className="text-gray-500 ml-2">vs Q1 2025</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Item */}
      <div className="mb-8">
        <Card className="bg-red-50 border-l-4 border-red-500 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-lg font-semibold text-red-900">Action Item</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 font-medium">Reduce 30-Day Readmission Rate (Current: 8%)</p>
            <p className="text-sm text-red-600 mt-1" title="High readmission rates may indicate care gaps">
              High readmission rates may indicate care gaps. Target: &lt;6% within next quarter.
            </p>
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