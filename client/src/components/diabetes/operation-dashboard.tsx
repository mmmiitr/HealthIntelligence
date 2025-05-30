import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, UserCheck, Heart, Clock, Calendar as CalendarIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { getCurrentTimestamp } from "@/lib/utils";
import { MetricCard } from "@/components/ui/metric-card";

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

      {/* Patient Wait Time (first section, styled like Patient Metrics) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Wait Time</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Average wait time for new appointments</span>
                <span className="text-2xl font-extrabold text-gray-900">7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Time to Third next available appointment</span>
                <span className="text-2xl font-extrabold text-gray-900">12 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Metrics (now immediately after Patient Wait Time) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">No-show rate</span>
                <span className="text-2xl font-extrabold text-red-600">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">% of telemedicine visits</span>
                <span className="text-2xl font-extrabold text-blue-600">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">% of patients with assigned PCP/endocrinologist</span>
                <span className="text-2xl font-extrabold text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Time per visit (new vs. follow-up)</span>
                <span className="text-2xl font-extrabold text-gray-900">40 min / 25 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization of providers ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Utilization of providers ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Care managers</span>
                <span className="text-2xl font-extrabold text-blue-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Physicians</span>
                <span className="text-2xl font-extrabold text-blue-600">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workforce Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Workforce Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number of Care Managers</span>
                <span className="text-2xl font-extrabold text-green-600">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number of Physicians with active panel</span>
                <span className="text-2xl font-extrabold text-blue-600">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workload Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Workload Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Panel size per provider</span>
                <span className="text-2xl font-extrabold text-gray-900">Care Manager: 120</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600"></span>
                <span className="text-2xl font-extrabold text-gray-900">Physician: 180</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Overtime hours for provider</span>
                <span className="text-2xl font-extrabold text-gray-900">Care Manager: 6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600"></span>
                <span className="text-2xl font-extrabold text-gray-900">Physician: 8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CCM ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">CCM ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Average care manager time per patient</span>
                <span className="text-2xl font-extrabold text-blue-600">35 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number discharged in month</span>
                <span className="text-2xl font-extrabold text-gray-900">14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number enrolled in month</span>
                <span className="text-2xl font-extrabold text-green-600">22</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Trends (all 11 trends, in required order, after all metrics, consistent style) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Wait time for new appointment</span><span className="text-2xl font-extrabold text-blue-600">7 days</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Time to third next available appointment</span><span className="text-2xl font-extrabold text_green-600">12 days</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">No show rate</span><span className="text-2xl font-extrabold text-red-600">12%</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">% of telemedicine visits</span><span className="text-2xl font-extrabold text-blue-600">30%</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">% of patients with assigned PCP/endocrinologist</span><span className="text-2xl font-extrabold text-green-600">92%</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Time per visit (new vs. follow-up)</span><span className="text-2xl font-extrabold text-gray-900">40 min / 25 min</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Care manager utilization</span><span className="text-2xl font-extrabold text-blue-600">85%</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Physician utilization</span><span className="text-2xl font-extrabold text-blue-600">90%</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Number of Care Managers</span><span className="text-2xl font-extrabold text-green-600">6</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Number of Physicians with active panel</span><span className="text-2xl font-extrabold text-blue-600">8</span></CardContent></Card>
          <Card className="bg-white border border-gray-200 shadow-none rounded-xl"><CardContent className="p-8 flex flex-col items-end"><span className="text-base text-gray-600 self-start mb-2">Average care manager time per patient</span><span className="text-2xl font-extrabold text-blue-600">35 min</span></CardContent></Card>
        </div>
      </div>
    </div>
  );
}