import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardContainer, DashboardSection } from "@/components/common/DashboardLayout";
import { Activity, Heart, TrendingUp, Users, AlertTriangle } from "lucide-react";
import StandardMetricCard from "@/components/common/StandardMetricCard";

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
    <DashboardContainer>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Clinical Dashboard</h2>
        <p className="text-gray-600">Clinical performance and patient outcomes</p>
      </div>

      {/* Clinical Metrics (4-col grid) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              title: "CCM", 
              currentValue: "68%", 
              forecastValue: showForecast ? "70%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'profit' as const,
              icon: <Activity className="h-4 w-4" />
            },
            { 
              title: "Non CCM", 
              currentValue: "62%", 
              forecastValue: showForecast ? "64%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'neutral' as const,
              icon: <Heart className="h-4 w-4" />
            },
            { 
              title: "Overall Average", 
              currentValue: "65%", 
              forecastValue: showForecast ? "67%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'revenue' as const,
              icon: <TrendingUp className="h-4 w-4" />
            },
            { 
              title: "Target Goal", 
              currentValue: "75%", 
              forecastValue: undefined,
              currentLabel: "TARGET",
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
              forecastLabel={showForecast ? metric.forecastLabel : undefined}
              showForecast={showForecast}
              type={metric.type}
              icon={metric.icon}
            />
          ))}
        </div>
      </DashboardSection>

      {/* Compliance/Testing (2-col grid) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing & Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              title: "CCM", 
              currentValue: "91%", 
              forecastValue: showForecast ? "92%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'profit' as const,
              icon: <TrendingUp className="h-4 w-4" />
            },
            { 
              title: "Non CCM", 
              currentValue: "85%", 
              forecastValue: showForecast ? "86%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            { 
              title: "Overall Rate", 
              currentValue: "88%", 
              forecastValue: showForecast ? "89%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'revenue' as const,
              icon: <Heart className="h-4 w-4" />
            },
            { 
              title: "Target Rate", 
              currentValue: "95%", 
              forecastValue: undefined,
              currentLabel: "TARGET",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <AlertTriangle className="h-4 w-4" />
            }
          ].map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={showForecast ? metric.forecastLabel : undefined}
              showForecast={showForecast}
              type={metric.type}
              icon={metric.icon}
            />
          ))}
        </div>
      </DashboardSection>

      {/* Risk/Readmission (2-col grid) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk & Readmission</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              title: "CCM", 
              currentValue: "77%", 
              forecastValue: showForecast ? "80%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'profit' as const,
              icon: <Heart className="h-4 w-4" />
            },
            { 
              title: "Non CCM", 
              currentValue: "70%", 
              forecastValue: showForecast ? "72%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'neutral' as const,
              icon: <Users className="h-4 w-4" />
            },
            { 
              title: "Overall Rate", 
              currentValue: "73%", 
              forecastValue: showForecast ? "76%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'revenue' as const,
              icon: <Activity className="h-4 w-4" />
            },
            { 
              title: "Target Rate", 
              currentValue: "85%", 
              forecastValue: undefined,
              currentLabel: "TARGET",
              forecastLabel: undefined,
              type: 'neutral' as const,
              icon: <TrendingUp className="h-4 w-4" />
            }
          ].map((metric) => (
            <StandardMetricCard
              key={metric.title}
              title={metric.title}
              currentValue={metric.currentValue}
              forecastValue={metric.forecastValue}
              currentLabel={metric.currentLabel}
              forecastLabel={showForecast ? metric.forecastLabel : undefined}
              showForecast={showForecast}
              type={metric.type}
              icon={metric.icon}
            />
          ))}
        </div>
      </DashboardSection>

      {/* Key Trends (charts/tables) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ...charts/tables here... */}
        </div>
      </DashboardSection>
    </DashboardContainer>
  );
}