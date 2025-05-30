import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, UserCheck, Heart, Clock, Calendar as CalendarIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { getCurrentTimestamp } from "@/lib/utils";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles } from "@/lib/styles";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
      <div className={styles.section}>
        <h2 className={styles.heading.h2}>Operation Dashboard</h2>
        <p className={styles.heading.subtitle}>Operational efficiency and resource management</p>
      </div>

      {/* Patient Wait Time (first section, styled like Patient Metrics) */}
      <div className="mb-8">
        <h3 className="dashboard-section-title">Patient Wait Time</h3>
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

      {/* Patient Metrics */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className={styles.heading.sectionTitle}>Patient Metrics</h3>
          <p className={styles.heading.sectionSubtitle}>
            {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Performance Metrics
          </p>
        </div>
        <div className={styles.grid.cols4}>
          {[
            { 
              title: "No-show rate", 
              currentValue: "12%", 
              forecastValue: showForecast ? "11%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'cost' as const,
              icon: <Clock className="h-4 w-4" />
            },
            { 
              title: "% of telemedicine visits", 
              currentValue: "30%", 
              forecastValue: showForecast ? "35%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'neutral' as const,
              icon: <UserCheck className="h-4 w-4" />
            },
            { 
              title: "Current bed utilization", 
              currentValue: "87%", 
              forecastValue: undefined, // Real-time metric, no forecast
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Bed className="h-4 w-4" />
            },
            { 
              title: "Staff on duty today", 
              currentValue: "24", 
              forecastValue: undefined, // Real-time operational metric
              currentLabel: "TODAY",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            }
          ].map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={metric.forecastLabel}
              showForecast={showForecast}
              type={metric.type}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>

      {/* Appointment Metrics */}
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

      {/* Utilization of providers */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Utilization of providers ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-blue-500 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Care managers</span>
                <span className="text-2xl font-extrabold text-gray-900">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Physicians</span>
                <span className="text-2xl font-extrabold text-gray-900">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workforce Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="dashboard-section-title">Workforce Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-blue-500 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number of Care Managers</span>
                <span className="text-2xl font-extrabold text-gray-900">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number of Physicians with active panel</span>
                <span className="text-2xl font-extrabold text-gray-900">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workload Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"}) */}
      <div className="mb-8">
        <h3 className="dashboard-section-title">Workload Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-blue-500 shadow-none rounded-xl">
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
        <h3 className="dashboard-section-title">CCM ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <Card className="bg-white border border-blue-500 shadow-none rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Average care manager time per patient</span>
                <span className="text-2xl font-extrabold text-gray-900">35 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number discharged in month</span>
                <span className="text-2xl font-extrabold text-gray-900">14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">Number enrolled in month</span>
                <span className="text-2xl font-extrabold text-gray-900">22</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Trends */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Wait time for new appointment", value: "7 days" },
            { title: "Time to third next available appointment", value: "12 days" },
            { title: "No show rate", value: "12%" },
            { title: "% of telemedicine visits", value: "30%" },
            { title: "% of patients with assigned PCP/endocrinologist", value: "92%" },
            { title: "Time per visit (new vs. follow-up)", value: "40 min / 25 min" },
            { title: "Care manager utilization", value: "85%" },
            { title: "Physician utilization", value: "90%" },
            { title: "Number of Care Managers", value: "6" },
            { title: "Number of Physicians with active panel", value: "8" },
            { title: "Average care manager time per patient", value: "35 min" }
          ].map((metric) => (
            <Card key={metric.title} className="bg-white shadow-sm rounded-lg border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.title}</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-700">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}