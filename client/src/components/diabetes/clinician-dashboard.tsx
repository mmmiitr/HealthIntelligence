import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, AlertTriangle, Users, Brain, Calendar, Shield, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";

interface ClinicianDashboardProps {
  timeFilter: string;
}

export default function ClinicianDashboard({ timeFilter }: ClinicianDashboardProps) {
  const { data: clinicalMetrics } = useQuery({
    queryKey: ["/api/clinician/metrics", timeFilter],
  });

  const { data: a1cTrends } = useQuery({
    queryKey: ["/api/clinician/a1c-trends", timeFilter],
  });

  const { data: riskDistribution } = useQuery({
    queryKey: ["/api/clinician/risk-distribution", timeFilter],
  });

  const { data: highRiskPatients } = useQuery({
    queryKey: ["/api/clinician/high-risk-patients"],
  });

  // Get current clinical metrics
  const currentMetrics = Array.isArray(clinicalMetrics) && clinicalMetrics.length > 0 ? clinicalMetrics[clinicalMetrics.length - 1] : null;
  const averageA1C = currentMetrics?.averageA1C || "0.0";
  const adherenceRate = currentMetrics?.adherenceRate || "0";
  const complicationRate = currentMetrics?.complicationRate || "0";

  // Prepare A1C trend chart data
  const a1cChartData = Array.isArray(a1cTrends) ? a1cTrends.map((item: any) => ({
    month: item.month,
    a1c: isNaN(parseFloat(item.averageA1C)) ? 0 : parseFloat(item.averageA1C),
    patientCount: item.patientCount || 0,
  })) : [];

  // Prepare risk distribution chart data
  const riskChartData = Array.isArray(riskDistribution) ? riskDistribution.map((item: any) => ({
    name: `${item.riskLevel} Risk`,
    value: isNaN(parseFloat(item.percentage)) ? 0 : parseFloat(item.percentage),
    count: item.count || 0,
  })) : [];

  const COLORS = ['#00A86B', '#F59E0B', '#EF4444'];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clinician Dashboard</h2>
            <p className="text-gray-600 mt-1">Healthcare provider overview for diabetic patient management</p>
            <div className="flex items-center mt-2 space-x-4">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Data Encrypted
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <Brain className="h-3 w-3 mr-1" />
                AI-Enhanced Predictions
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600" title="Key indicator of blood sugar control over 2-3 months">Average A1C</p>
                <p className="text-2xl font-bold text-gray-900">{averageA1C}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↓ -0.3%</span>
              <span className="text-gray-500 ml-2">improving control</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Adherence Rate</p>
                <p className="text-2xl font-bold text-gray-900">{adherenceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +5.2%</span>
              <span className="text-gray-500 ml-2">better compliance</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Adherence Rate</p>
                <p className="text-2xl font-bold text-gray-900">84%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↑ +5.2%</span>
              <span className="text-gray-500 ml-2">medication compliance</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Complication Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↓ -1.8%</span>
              <span className="text-gray-500 ml-2">fewer complications</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI/ML Prediction Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Predicted HbA1c Improvements */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-600" />
              AI HbA1c Predictions
              <Badge className="ml-2 bg-blue-100 text-blue-800">Next Quarter</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Predicted HbA1c improvements using machine learning</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-green-700 font-medium">Well-Controlled Patients</p>
                  <p className="text-xs text-green-600">Current HbA1c below 7%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">6.8%</p>
                  <p className="text-xs text-green-600">±0.2% predicted</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Moderate Control</p>
                  <p className="text-xs text-yellow-600">Current HbA1c 7-8%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-900">7.2%</p>
                  <p className="text-xs text-yellow-600">±0.3% predicted</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm text-red-700 font-medium">Poor Control</p>
                  <p className="text-xs text-red-600">Current HbA1c above 8%</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-900">8.1%</p>
                  <p className="text-xs text-red-600">±0.4% predicted</p>
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
              Visit Predictions
              <Badge className="ml-2 bg-green-100 text-green-800">Next Month</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Patient visit forecasting with clinical insights</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Routine Follow-ups</p>
                  <p className="text-xs text-blue-600">Scheduled quarterly visits</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-900">285</p>
                  <p className="text-xs text-blue-600">expected visits</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-orange-700 font-medium">Urgent Care Needs</p>
                  <p className="text-xs text-orange-600">Unscheduled appointments</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-900">42</p>
                  <p className="text-xs text-orange-600">predicted visits</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Specialist Referrals</p>
                  <p className="text-xs text-purple-600">Endocrinology referrals</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-900">18</p>
                  <p className="text-xs text-purple-600">expected referrals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* A1C Trends */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">A1C Trends Across Patient Population</CardTitle>
            <p className="text-sm text-gray-600">Average A1C levels over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={a1cChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[6, 9]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value, name) => [
                  name === "a1c" ? `${value}%` : value,
                  name === "a1c" ? "Average A1C" : "Patient Count"
                ]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="a1c"
                  stroke="#0066CC"
                  strokeWidth={3}
                  name="Average A1C"
                  dot={{ fill: "#0066CC", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Risk Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Patient Risk Distribution</CardTitle>
            <p className="text-sm text-gray-600">Current risk stratification of diabetic patients</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskChartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${value}% (${props.payload.count} patients)`, ""
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* High-Risk Patients Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-red-600" />
            High-Risk Patients
          </CardTitle>
          <p className="text-sm text-gray-600">Patients requiring immediate attention and intervention</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">A1C Level</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Visit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Factors</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(highRiskPatients) ? highRiskPatients.map((patient: any) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{patient.patientName}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${
                        parseFloat(patient.a1c) > 9 ? "bg-red-100 text-red-800" : 
                        parseFloat(patient.a1c) > 8 ? "bg-orange-100 text-orange-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {patient.a1c}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{patient.lastVisit}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{patient.riskFactors}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Insights */}
      <Card className="bg-white mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Clinical Insights</CardTitle>
          <p className="text-sm text-gray-600">Key observations and recommendations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">Medication Adherence</h4>
              <p className="text-blue-800 text-sm">
                Patient adherence improved by 5.2% this month. Consider implementing medication reminder systems for high-risk patients.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">A1C Control</h4>
              <p className="text-green-800 text-sm">
                Average A1C decreased by 0.3%. Continue current treatment protocols and lifestyle intervention programs.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">Risk Stratification</h4>
              <p className="text-orange-800 text-sm">
                20% of patients are in high-risk category. Focus on intensive case management and frequent monitoring.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">Complication Prevention</h4>
              <p className="text-purple-800 text-sm">
                Complication rates reduced by 1.8%. Maintain current screening schedules and patient education programs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}