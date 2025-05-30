import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles } from "@/lib/styles";
import { Activity, Heart, Users, TrendingUp, AlertTriangle } from "lucide-react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Clinical Overview</h2>
        <p className="text-gray-600">
          {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Clinical Performance Metrics
        </p>
      </div>

      {/* 1. % of patients with controlled HbA1c (<7%) (Prediction) */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">% of patients with controlled HbA1c (&lt;7%) (Prediction)</h3>
          <p className="text-gray-600">Clinical outcomes by care management status</p>
        </div>
        <div className={styles.grid.cols2}>
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

      {/* 2. % of patients with recent HbA1c test (last 6 months) */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">% of patients with recent HbA1c test (last 6 months)</h3>
          <p className="text-gray-600">Testing compliance tracking by care management status</p>
        </div>
        <div className={styles.grid.cols2}>
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

      {/* 3. % of patients with hypertension control (<140/90) */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className={styles.heading.sectionTitle}>% of patients with hypertension control (&lt;140/90)</h3>
          <p className={styles.heading.sectionSubtitle}>Blood pressure management by care status</p>
        </div>
        <div className={styles.grid.cols2}>
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

      {/* 4. % of patients with >2 co-morbidities */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className={styles.heading.sectionTitle}>% of patients with &gt;2 co-morbidities</h3>
          <p className={styles.heading.sectionSubtitle}>Complex care management tracking</p>
        </div>
        <div className={styles.grid.cols2}>
          {[
            { 
              title: "CCM", 
              currentValue: "34%", 
              forecastValue: showForecast ? "36%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
              type: 'cost' as const,
              icon: <Activity className="h-4 w-4" />
            },
            { 
              title: "Non CCM", 
              currentValue: "28%", 
              forecastValue: showForecast ? "29%" : undefined,
              currentLabel: labels.current,
              forecastLabel: showForecast ? labels.forecast : undefined,
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

      {/* 5. % enrolled in DSME */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">% enrolled in DSME (Diabetes Self-Management Education)</h3>
          <p className="text-gray-600">All patients diabetes education enrollment tracking</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <StandardMetricCard
            title="All Patients"
            currentValue="41%"
            forecastValue={showForecast ? "43%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
            icon={<Users className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* 6. 30-Day ED Visit or Hospitalization (Prediction) */}
      <div className={styles.section}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">30-Day ED Visit or Hospitalization</h3>
          <p className="text-gray-600">Emergency department and hospitalization tracking (Prediction)</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <StandardMetricCard
            title="All Patients"
            currentValue="8%"
            forecastValue={showForecast ? "7.5%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* 7. Top 5 patients with highest ED visits past quarter */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 patients with highest ED visits (past quarter)</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900"># ED Visits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4 text-right">4</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4 text-right">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4 text-right">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4 text-right">2</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4 text-right">2</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* 8. Top 5 patients with most inpatient LOS (length of stay) past quarter */}
      <div className="mb-8">
        <h3 className="dashboard-section-title">Top 5 patients with most inpatient LOS (length of stay) (past quarter)</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">LOS (days)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4 text-right">12</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4 text-right">10</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4 text-right">9</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4 text-right">8</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4 text-right">7</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}