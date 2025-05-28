import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, AlertTriangle, Users, Brain, Calendar, Shield, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, ReferenceLine, BarChart, Bar } from "recharts";
import { hba1cData, hba1cProgressionData, visitFrequencyData, resourceAllocationData, patientEngagementData } from "@/lib/mock-data";

interface ClinicianDashboardProps {
  timeFilter: string;
  viewMode: string;
}

export default function ClinicianDashboard({ timeFilter, viewMode }: ClinicianDashboardProps) {
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
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm text-gray-500">Last Updated: May 28, 2025, 05:52 PM IST</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600" title="Average HbA1c measures long-term blood sugar control in diabetic patients. Lower values (<7%) reduce complication risks.">Average A1C</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-green-600 font-medium text-sm">↓ -0.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="text-blue-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                <p className="text-lg font-bold text-gray-900">{averageA1C}% / 7.1%</p>
                <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '98%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Near target</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                <p className="text-lg font-bold text-gray-900">6.9%</p>
                <p className="text-xs text-gray-600 mt-1">-4.2% improvement projected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Adherence Rate</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-green-600 font-medium text-sm">↗ +5.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="text-green-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                <p className="text-lg font-bold text-gray-900">{adherenceRate}% / 85%</p>
                <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{width: '96%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">96% complete</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                <p className="text-lg font-bold text-gray-900">88%</p>
                <p className="text-xs text-gray-600 mt-1">+7.3% improvement projected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white" title="Reflects ADA 2024 Standards of Care updates">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Medication Compliance</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-green-600 font-medium text-sm">↑ +5.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="text-green-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                <p className="text-lg font-bold text-gray-900">84% / 85%</p>
                <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{width: '99%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">99% complete</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                <p className="text-lg font-bold text-gray-900">87%</p>
                <p className="text-xs text-gray-600 mt-1">+3.6% improvement projected</p>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-orange-50 rounded">
              <p className="text-xs text-orange-700" title="2024 update to address cannabis use in diabetes care">
                Ask about tobacco/cannabis use (Section 5)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Complication Rate</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-green-600 font-medium text-sm">↓ -1.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                <p className="text-lg font-bold text-gray-900">3.2% / 4.0%</p>
                <div className="mt-1.5 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{width: '80%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Below target (lower is better)</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                <p className="text-lg font-bold text-gray-900">2.8%</p>
                <p className="text-xs text-gray-600 mt-1">-12.5% improvement projected</p>
              </div>
            </div>
          </CardContent>
        </Card>
          <Card className="bg-white" title="Compares average HbA1c for CCM-enrolled vs. non-enrolled patients (May 2025).">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">CCM Impact on HbA1c</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-medium text-sm">Significant improvement</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="text-green-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">CCM ENROLLED</p>
                  <p className="text-lg font-bold text-gray-900">6.5%</p>
                  <p className="text-xs text-gray-600 mt-1">Average HbA1c</p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">NON-ENROLLED</p>
                  <p className="text-lg font-bold text-gray-900">7.2%</p>
                  <p className="text-xs text-gray-600 mt-1">Average HbA1c</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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

      {/* ADA 2024 New Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white" title="New 2024 recommendation to evaluate fracture risk factors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bone Health Screening</p>
                <p className="text-lg font-bold text-gray-900">78% Screened</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-blue-700">Screen patients for bone health risks (Section 4)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white" title="Updated 2024 guidance to use CGM for prevention">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hypoglycemia Risk</p>
                <p className="text-lg font-bold text-gray-900">15% High Risk</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-red-700">Assess hypoglycemia risk using CGM (Section 6)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* High-Risk Patients Table */}
      <Card className="bg-white mb-8" title="Reflects ADA 2024 Standards of Care updates">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            High-Risk Patients Requiring Attention
            <Badge className="ml-2 bg-red-100 text-red-800">Urgent</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Patients with concerning metrics requiring immediate clinical intervention</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Current HbA1c</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Factors</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Visit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Jane Doe</td>
                  <td className="py-3 px-4 text-gray-700">Prediabetes from antipsychotics</td>
                  <td className="py-3 px-4 text-blue-600">Screen per Section 2</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">John Smith</td>
                  <td className="py-3 px-4 text-gray-700">Bone health concerns</td>
                  <td className="py-3 px-4 text-blue-600">Evaluate fracture risk</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Maria Garcia</td>
                  <td className="py-3 px-4 text-gray-700">Cannabis use reported</td>
                  <td className="py-3 px-4 text-blue-600">Tobacco/cannabis counseling</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Robert Johnson</td>
                  <td className="py-3 px-4 text-gray-700">Frequent hypoglycemia</td>
                  <td className="py-3 px-4 text-blue-600">CGM assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* A1C Trends */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">HbA1c Trends & Predictions</CardTitle>
            <p className="text-sm text-gray-600">Data Range: Jan 2025 - Oct 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hba1cData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[6, 8]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value, name) => [
                  `${value}%`,
                  name === "avgHbA1c" ? "Historical HbA1c" : "Predicted HbA1c"
                ]} />
                <Legend />
                {/* Historical Data - Solid Line */}
                <Line
                  type="monotone"
                  dataKey="avgHbA1c"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Historical HbA1c"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                {/* Predicted Data - Dashed Line */}
                <Line
                  type="monotone"
                  dataKey="predictedHbA1c"
                  stroke="#64b5f6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Predicted HbA1c"
                  dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                {/* Reference Line at Current Date */}
                <ReferenceLine x="May 2025" stroke="#dc2626" strokeWidth={2} label="Today" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Historical data (solid line) shows actual HbA1c values. Predicted data (dashed line) shows AI/ML forecasts based on current trends.
            </p>
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

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Predicted HbA1c Progression */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predicted HbA1c Progression</CardTitle>
            <p className="text-sm text-gray-600">Predicted HbA1c Trends (Accuracy: 95%)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hba1cProgressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[5.5, 8.5]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value, name) => [`${value}%`, name]} 
                         labelFormatter={() => "Mock data simulating trends as of May 2025."} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Line
                  type="monotone"
                  dataKey="stable"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Stable"
                  dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="improving"
                  stroke="#1976d2"
                  strokeWidth={3}
                  name="Improving"
                  dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="declining"
                  stroke="#ef5350"
                  strokeWidth={3}
                  name="Declining"
                  dot={{ fill: "#ef5350", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Stable (#4caf50), Improving (#1976d2), Declining (#ef5350)
            </p>
          </CardContent>
        </Card>

        {/* Predicted Visit Frequency */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predicted Visit Frequency</CardTitle>
            <p className="text-sm text-gray-600">Predicted Visits per Patient (Accuracy: 95%)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} visits`, 'Visits per Patient']} 
                         labelFormatter={() => "Mock data simulating trends as of May 2025."} />
                <Legend />
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
                <Bar
                  dataKey="visits"
                  fill="#1976d2"
                  name="Visits per Patient"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Allocation Chart */}
      <Card className="bg-white shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Resource Allocation</CardTitle>
          <p className="text-sm text-gray-600">Staff Hours for Proactive Allocation</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceAllocationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value} hours`, name]} 
                       labelFormatter={() => "Mock data simulating trends as of May 2025."} />
              <Legend />
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

      {/* Patient Engagement */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Patient Engagement</CardTitle>
          <p className="text-sm text-gray-600">Patient Engagement Trends (Mock Data)</p>
          <p className="text-xs text-gray-500">Data Range: Jan 2025 - Oct 2025</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value, name) => [`${value}%`, name]} 
                       labelFormatter={() => "Mock data simulating trends as of May 2025."} />
              <Legend />
              <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
              <Line
                type="monotone"
                dataKey="adherence"
                stroke="#1976d2"
                strokeWidth={3}
                name="Appointment Adherence"
                dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="telemedicineUsage"
                stroke="#4caf50"
                strokeWidth={3}
                name="Telemedicine Usage"
                dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}