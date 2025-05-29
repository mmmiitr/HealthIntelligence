import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, AlertTriangle, Users, Brain, Calendar, Shield, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, ReferenceLine, BarChart, Bar } from "recharts";
import { hba1cData, hba1cProgressionData, visitFrequencyData, resourceAllocationData, patientEngagementData } from "@/lib/mock-data";

interface ClinicianDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function ClinicianDashboard({ timeFilter, viewMode, showForecast }: ClinicianDashboardProps) {
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
      {/* Key Clinical Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Clinical Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">% Controlled HbA1c (&lt;7%) <span className="text-xs text-blue-600">(Prediction)</span></span>
                <span className="text-2xl font-bold text-blue-900">68%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">% Recent HbA1c Test (6mo)</span>
                <span className="text-2xl font-bold text-green-900">91%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">% Hypertension Control (&lt;140/90)</span>
                <span className="text-2xl font-bold text-green-900">77%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">% &gt;2 Co-morbidities</span>
                <span className="text-2xl font-bold text-orange-900">34%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">% Enrolled in DSME</span>
                <span className="text-2xl font-bold text-purple-900">41%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">30-Day ED Visit or Hospitalization <span className="text-xs text-blue-600">(Prediction)</span></span>
                <span className="text-2xl font-bold text-red-900">8%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top 5 Patients with Highest ED Visits */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Patients: ED Visits (Past Quarter)</h3>
        <Card className="bg-white">
          <CardContent className="p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900"># ED Visits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4">4</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4">2</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4">2</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Patients with Most Inpatient LOS */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Patients: Inpatient LOS (Past Quarter)</h3>
        <Card className="bg-white">
          <CardContent className="p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">LOS (days)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4">12</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4">10</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4">9</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4">8</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4">7</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}