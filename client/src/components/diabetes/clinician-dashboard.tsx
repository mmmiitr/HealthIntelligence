import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardContainer, DashboardSection } from "@/components/common/DashboardLayout";
import { Activity, Heart, TrendingUp, Users, AlertTriangle } from "lucide-react";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, Legend, Label } from "recharts";
import { summaryTrendsData } from "@/lib/summary-metrics-data";

interface ClinicianDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function ClinicianDashboard({ timeFilter, viewMode, showForecast }: ClinicianDashboardProps) {
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

  // Prepare A1C trend chart data and prediction data
  const a1cChartData = Array.isArray(a1cTrends) ? a1cTrends.map((item: any) => ({
    month: item.month,
    a1c: isNaN(parseFloat(item.averageA1C)) ? 0 : parseFloat(item.averageA1C),
    patientCount: item.patientCount || 0,
  })) : [];





  const predictionChartData = Array.isArray(summaryTrendsData.monthly.edVisit) ? (() => {

    const monthOrder = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'Jul ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec '];
    const historicalMonths = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May '];


    const baseProcessedData = summaryTrendsData.monthly.edVisit

      .filter(item => monthOrder.indexOf(item.period) <= monthOrder.indexOf('Sep '))
      .map((item: any) => {

        return {
          period: item.period, // Use 'period' as the X-axis key
          value: item.value,
          upperBand: item.upperBand,
          lowerBand: item.lowerBand,
          isForecast: item.isForecast,
        };
      });

    let finalChartData = [];

    if (showForecast) {

      finalChartData = baseProcessedData;
    } else {

      finalChartData = baseProcessedData.filter(item => historicalMonths.includes(item.period));
    }


    finalChartData.sort((a, b) => monthOrder.indexOf(a.period) - monthOrder.indexOf(b.period));

    return finalChartData;
  })() : [];



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
        <p className="text-gray-600">Clinical Performance And Patient Outcomes</p>
      </div>

      {/* Clinical Metrics (2-col grid) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CCM - Prediction (Red) */}
          <StandardMetricCard
            title="% Controlled HbA1c (<7%) - CCM"
            currentValue="78%"
            forecastValue={showForecast ? "80%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"
          //icon={<Activity className="h-4 w-4 text-red-500" />} 
          />
          {/* Non CCM - Prediction (Red) */}
          <StandardMetricCard
            title="% Controlled HbA1c (<7%) - Non CCM"
            currentValue="45%"
            forecastValue={showForecast ? "43%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"

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
          //icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
          />
          {/* Non CCM - Recent HbA1c Test (Blue) */}
          <StandardMetricCard
            title="% Recent HbA1c Test (6mo) - Non CCM"
            currentValue="60%"
            forecastValue={showForecast ? "59%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
          //icon={<Users className="h-4 w-4 text-blue-500" />} 
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
          //icon={<Users className="h-4 w-4 text-blue-500" />} 
          />
          {/* CCM - >2 Co-morbidities (Green) */}
          <StandardMetricCard
            title="% >2 Co-Morbidities - CCM"
            currentValue="90%"
            forecastValue={showForecast ? "95%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"
          //icon={<Activity className="h-4 w-4 text-green-500" />} 
          />
          {/* Non CCM - >2 Co-morbidities (Blue) */}
          <StandardMetricCard
            title="% >2 Co-Morbidities - Non CCM"
            currentValue="50%"
            forecastValue={showForecast ? "55%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="neutral"
          //icon={<Users className="h-4 w-4 text-blue-500" />} 
          />
          {/* Enrolled in DSME (Green) */}
          <StandardMetricCard
            title="% Enrolled In DSME"
            currentValue="40%"
            forecastValue={showForecast ? "42%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="profit"

          />
          {/* 30-Day ED Visit or Hospitalization (Prediction, Red) */}
          <StandardMetricCard
            title="30-Day ED Visit or Hospitalization"
            currentValue="8%"
            forecastValue={showForecast ? "7%" : undefined}
            currentLabel={labels.current}
            forecastLabel={showForecast ? labels.forecast : undefined}
            showForecast={showForecast}
            type="cost"

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
                <li>Emily Johnson</li>
                <li>Michael Smith</li>
                <li>Ava Thompson</li>
                <li>Daniel Lee</li>
                <li>Sophia Patel</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Highest Inpatient LOS (Past Quarter)</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>James Anderson</li>
                <li>Isabella Garcia</li>
                <li>William Nguyen</li>
                <li>Olivia Martinez</li>
                <li>Ethan Robinson</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>

      {/* Risk/Readmission (2-col grid) */}
      {/* <DashboardSection>
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
              icon: null
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
      </DashboardSection> */}

      {/* Key Trends (charts/tables) */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ...charts/tables here... */}
        </div>
      </DashboardSection>

      {/* Prediction Chart with Confidence Interval */}
      <DashboardSection>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">30-Day ED Visit or Hospitalization</h3>
        <Card>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[6, 10]} >
                  <Label value="ED Visit Rate" angle={-90} position="insideLeft" offset={20} fontSize={12} />
                </YAxis>
                <Tooltip formatter={(value, name) => {
                  if (name === 'value') return [`${value}%`, 'ED Visit Rate'];
                  if (name === 'upperBand') return [`${value}%`, 'Upper Confidence'];
                  if (name === 'lowerBand') return [`${value}%`, 'Lower Confidence'];
                  return [value, name];
                }} />

                <Legend
                  verticalAlign="top"
                  align="right"
                  layout="horizontal"
                  iconType="line"
                  wrapperStyle={{
                    paddingBottom: 10,
                    paddingRight: 20,
                    fontSize: 12,
                    color: '#374151', // Tailwind's gray-700
                    fontWeight: '500',
                    lineHeight: '20px'
                  }}
                  formatter={(value) => {
                    if (value === 'value') return 'ED Visit Rate';
                    if (value === 'upperBand') return 'Upper Confidence';
                    if (value === 'lowerBand') return 'Lower Confidence';
                    return value;
                  }}
                />
                {/* Main trend line */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={3}
                  connectNulls={false}
                  dot={(props) => {
                    const { payload } = props;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill={payload?.isForecast ? '#ff9800' : '#1976d2'}
                        stroke={payload?.isForecast ? '#ff9800' : '#1976d2'}
                        strokeWidth={2}
                      />
                    );
                  }}
                />

                {/* Upper and Lower confidence interval lines, only for forecast */}
                {showForecast && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="upperBand"
                      stroke="#1976d2"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      strokeOpacity={1}
                      connectNulls={false}
                      dot={false}

                    />
                    <Line
                      type="monotone"
                      dataKey="lowerBand"
                      stroke="#1976d2"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      strokeOpacity={1}
                      connectNulls={false}
                      dot={false}

                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardContainer>
  );
}