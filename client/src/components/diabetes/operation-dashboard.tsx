import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardContainer, DashboardSection } from "@/components/common/DashboardLayout";
import { Users, Bed, UserCheck, Heart, Clock, Calendar as CalendarIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine } from "recharts";
import { getCurrentTimestamp } from "@/lib/utils";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles } from "@/lib/styles";

interface OperationDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function OperationDashboard({ timeFilter, viewMode, showForecast }: OperationDashboardProps) {
  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch (viewMode) {
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
    <DashboardContainer>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Operations Dashboard</h2>
        <p className="text-gray-600">Operational efficiency and resource management</p>
      </div>

      {/* Patient Wait Time */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Wait Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showForecast && (
            <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
              <CardContent className="p-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base text-gray-600">Average wait for new appointments</span>
                    <span className="text-2xl font-extrabold text-gray-900">7 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base text-gray-600">Time to third next available appointment</span>
                    <span className="text-2xl font-extrabold text-gray-900">12 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardSection>
      

      {/* Patient Metrics */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Changed from md:grid-cols-4 to md:grid-cols-3 */}
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
              title: "% of patients with assigned PCP/endocrinologist",
              currentValue: "92%",
              forecastValue: undefined, // Real-time metric, no forecast
              currentLabel: "CURRENT STATUS",
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
      </DashboardSection>


      {/* Appointment Metrics */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </DashboardSection>

      {/* Utilization of Providers */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Utilization of Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Care managers",
              currentValue: "85%",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Physicians",
              currentValue: "90%",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
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
      </DashboardSection>

      {/* Workforce Metrics */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Workforce Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Number of Care Managers",
              currentValue: "6",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Number of Physicians with active panel",
              currentValue: "8",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
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
      </DashboardSection>

      {/* Workload Metrics */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Workload Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Panel size per provider (Care Manager)",
              currentValue: "120",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Panel size per provider (Physician)",
              currentValue: "180",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Overtime hours for provider (Care Manager)",
              currentValue: "6",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Clock className="h-4 w-4" />
            },
            {
              title: "Overtime hours for provider (Physician)",
              currentValue: "8",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Clock className="h-4 w-4" />
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
      </DashboardSection>

      {/* CCM Metrics */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">CCM Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Average care manager time per patient",
              currentValue: "35 min",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Clock className="h-4 w-4" />
            },
            {
              title: "Number discharged in month",
              currentValue: "14",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Number enrolled in month",
              currentValue: "22",
              forecastValue: undefined,
              currentLabel: "CURRENT STATUS",
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
      </DashboardSection>
    </DashboardContainer>
  );
}