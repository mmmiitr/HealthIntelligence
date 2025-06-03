import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardContainer, DashboardSection } from "@/components/common/DashboardLayout";
import { Activity, Heart, TrendingUp, Users, AlertTriangle } from "lucide-react";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line } from "recharts";

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

      {/* Clinical Metrics (2-col grid) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CCM - Prediction (Red) */}
          <StandardMetricCard 
            title="% Controlled HbA1c (<7%) - CCM"
            currentValue="68%"
            forecastValue={showForecast ? "70%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"
            icon={<Activity className="h-4 w-4 text-red-500" />} 
            badge="Prediction"
          />
          {/* Non CCM - Prediction (Red) */}
          <StandardMetricCard 
            title="% Controlled HbA1c (<7%) - Non CCM"
            currentValue="62%"
            forecastValue={showForecast ? "64%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"
            icon={<Heart className="h-4 w-4 text-red-500" />} 
            badge="Prediction"
          />
          {/* CCM - Recent HbA1c Test (Green) */}
          <StandardMetricCard 
            title="% Recent HbA1c Test (6mo) - CCM"
            currentValue="85%"
            forecastValue={showForecast ? "87%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"
            icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
          />
          {/* Non CCM - Recent HbA1c Test (Blue) */}
          <StandardMetricCard 
            title="% Recent HbA1c Test (6mo) - Non CCM"
            currentValue="80%"
            forecastValue={showForecast ? "82%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
            icon={<Users className="h-4 w-4 text-blue-500" />} 
          />
          {/* CCM - Hypertension Control (Green) */}
          <StandardMetricCard 
            title="% Hypertension Control (<140/90) - CCM"
            currentValue="72%"
            forecastValue={showForecast ? "74%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"
            icon={<Heart className="h-4 w-4 text-green-500" />} 
          />
          {/* Non CCM - Hypertension Control (Blue) */}
          <StandardMetricCard 
            title="% Hypertension Control (<140/90) - Non CCM"
            currentValue="68%"
            forecastValue={showForecast ? "70%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
            icon={<Users className="h-4 w-4 text-blue-500" />} 
          />
          {/* CCM - >2 Co-morbidities (Green) */}
          <StandardMetricCard 
            title="% >2 Co-morbidities - CCM"
            currentValue="55%"
            forecastValue={showForecast ? "57%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"
            icon={<Activity className="h-4 w-4 text-green-500" />} 
          />
          {/* Non CCM - >2 Co-morbidities (Blue) */}
          <StandardMetricCard 
            title="% >2 Co-morbidities - Non CCM"
            currentValue="50%"
            forecastValue={showForecast ? "52%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
            icon={<Users className="h-4 w-4 text-blue-500" />} 
          />
          {/* Enrolled in DSME (Green) */}
          <StandardMetricCard 
            title="% Enrolled in DSME"
            currentValue="40%"
            forecastValue={showForecast ? "42%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"
            icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
          />
          {/* 30-Day ED Visit or Hospitalization (Prediction, Red) */}
          <StandardMetricCard 
            title="30-Day ED Visit or Hospitalization (Prediction)"
            currentValue="8%"
            forecastValue={showForecast ? "7%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"
            icon={<AlertTriangle className="h-4 w-4 text-red-500" />} 
            badge="Prediction"
          />
        </div>
      </DashboardSection>

      {/* Top 5 Patients Sections */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Patients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Highest ED Visits (Past Quarter)</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Patient A</li>
                <li>Patient B</li>
                <li>Patient C</li>
                <li>Patient D</li>
                <li>Patient E</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Most Inpatient LOS (Past Quarter)</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Patient F</li>
                <li>Patient G</li>
                <li>Patient H</li>
                <li>Patient I</li>
                <li>Patient J</li>
              </ul>
            </CardContent>
          </Card>
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

      {/* Prediction Chart with Confidence Interval */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">30-Day ED Visit or Hospitalization Prediction</h3>
        <Card>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={(() => {
                const baseData = [
                  { month: 'Jan', value: 8, ci: [7, 9], isForecast: false },
                  { month: 'Feb', value: 8.5, ci: [7.5, 9.5], isForecast: false },
                  { month: 'Mar', value: 9, ci: [8, 10], isForecast: false },
                  { month: 'Apr', value: 10, ci: [9, 11], isForecast: false },
                  { month: 'May', value: 11, ci: [10, 12], isForecast: false },
                ];
                const forecastData = [
                  { month: 'Jun', value: 12, ci: [11, 13], isForecast: true },
                  { month: 'Jul', value: 11.5, ci: [10.5, 12.5], isForecast: true },
                  { month: 'Aug', value: 11, ci: [10, 12], isForecast: true },
                  { month: 'Sep', value: 10.5, ci: [9.5, 11.5], isForecast: true },
                ];
                return showForecast ? [...baseData, ...forecastData] : baseData;
              })()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[6, 14]} />
                <Tooltip formatter={(value, name) => {
                  if (name === 'value') return [`${value}%`, 'ED Visit Rate'];
                  if (name === 'ci' && Array.isArray(value)) return [`${value[0]}% - ${value[1]}%`, '95% Confidence Interval'];
                  return [value, name];
                }} />
                {/* Confidence Band */}
                <Area
                  type="monotone"
                  dataKey="ci"
                  stroke="none"
                  fill="#1976d2"
                  fillOpacity={0.2}
                  connectNulls={false}
                />
                {/* Main trend line */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={3}
                  connectNulls={false}
                  dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardContainer>
  );
}