import { DashboardContainer, DashboardSection } from "@/components/common/DashboardLayout";
import SectionHeader from "@/components/common/SectionHeader";
import { summaryKeyMetrics, getSummaryTrends } from "@/lib/summary-metrics-data";
import { summarySectionData } from "@/lib/summary-section-data";
import { DollarSign, Users, Heart, UserCheck, AlertTriangle, Monitor, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart ,Label} from "recharts";
import { getCurrentTimestamp } from "@/lib/utils";
import { useState } from "react";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles } from "@/lib/styles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function SummaryDashboard({ timeFilter, viewMode, showForecast }: SummaryDashboardProps) {
  // Icon mapping for modular data
  const iconMap = { DollarSign: <DollarSign className="h-4 w-4" />, UserCheck: <UserCheck className="h-4 w-4" />, Monitor: <Monitor className="h-4 w-4" />, Heart: <Heart className="h-4 w-4" /> };

  // Get data based on view mode
  const summaryTrends = getSummaryTrends(viewMode);

  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch(viewMode) {
      case "monthly":
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
      case "quarterly":
        return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
      case "yearly":
        return { current: "2025 PROGRESS", forecast: "2026 FORECAST" };
      default:
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    }
  };

  const labels = getViewLabels();

  // Use modularized key metrics
  // Fix type for StandardMetricCard: ensure type is correct
  const keyMetrics = summaryKeyMetrics.map(metric => ({
    ...metric,
    icon: iconMap[metric.icon as keyof typeof iconMap],
    type: metric.type as 'revenue' | 'neutral' | 'cost' | 'profit',
    currentLabel: labels.current,
    forecastLabel: showForecast ? labels.forecast : undefined,
    forecastValue: showForecast ? metric.forecastValue : undefined,
  }));

  return (
    <DashboardContainer>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Executive Summary</h2>
          <p className="text-gray-600">
            {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Comprehensive Overview
          </p>
        </div>

      </div>

      {/* Key Metrics */}
      <DashboardSection>
        <SectionHeader
          title="Key Performance Indicators"
          timePeriod={
            viewMode === "monthly"
              ? "May 2025"
              : viewMode === "quarterly"
              ? "Q2 2025"
              : "2025"
          }
        />

        {/* First row: 2 cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {keyMetrics.slice(0, 2).map((metric) => (
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

        {/* Second row: 3 cards */}
        <div className="grid grid-cols-3 gap-4">
          {keyMetrics.slice(2).map((metric) => (
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


      {/* Trends Section */}
      <DashboardSection>
        <SectionHeader title="Key Trends" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* % In Control HbA1c Chart */}
          <Card className="bg-white rounded-lg shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">% In Control HbA1c (&lt;7%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={summaryTrends.inControlHba1c}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }}/>

                  <YAxis tick={{ fontSize: 12 }} domain={[60, 80]}>
                    <Label value="Patient % In Control HbA1c" angle={-90} position="insideLeft" offset={10} fontSize={12} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'value') return [`${value}%`, 'HbA1c Control'];
                      if (name === 'upperBand') return [`${value}%`, 'Upper Confidence'];
                      if (name === 'lowerBand') return [`${value}%`, 'Lower Confidence'];
                      return [value, name];
                    }}
                  />
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
                        if (value === 'value') return 'HbA1c Control';
                        if (value === 'upperBand') return 'Upper Confidence';
                        if (value === 'lowerBand') return 'Lower Confidence';
                        return value;
                      }}
                    />
                  {showForecast && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="upperBand" 
                        stroke="#1976d2" 
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lowerBand" 
                        stroke="#1976d2" 
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        connectNulls={false}
                      />
                    </>
                  )}
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
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* % Under CCM Chart */}
          <Card className="bg-white rounded-lg shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">% Under CCM</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={summaryTrends.underCCM}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }}/>
                    

                  <YAxis tick={{ fontSize: 12 }} domain={[20, 40]} >
                     <Label value="Patient % Under CCM" angle={-90} position="insideLeft" offset={20} fontSize={12} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'value') return [`${value}%`, 'CCM Enrollment'];
                      if (name === 'upperBand') return [`${value}%`, 'Upper Confidence'];
                      if (name === 'lowerBand') return [`${value}%`, 'Lower Confidence'];
                      return [value, name];
                    }}
                  />
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
                        if (value === 'value') return 'CCM Enrollment';
                        if (value === 'upperBand') return 'Upper Confidence';
                        if (value === 'lowerBand') return 'Lower Confidence';
                        return value;
                      }}
                    />
                  {showForecast && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="upperBand" 
                        stroke="#4caf50" 
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lowerBand" 
                        stroke="#4caf50" 
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.5}
                        dot={false}
                        connectNulls={false}
                      />
                    </>
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4caf50" 
                    strokeWidth={3}
                    connectNulls={false}
                    dot={(props) => {
                      const { payload } = props;
                      return (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={4}
                          fill={payload?.isForecast ? '#ff9800' : '#4caf50'}
                          stroke={payload?.isForecast ? '#ff9800' : '#4caf50'}
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 30-Day ED Visit Chart */}
        <Card className="bg-white rounded-lg shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">30-Day ED Visit or Hospitalization</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={summaryTrends.edVisit}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[6, 10]} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'value') return [`${value}%`, 'ED Visit Rate'];
                    if (name === 'upperBand') return [`${value}%`, 'Upper Confidence'];
                    if (name === 'lowerBand') return [`${value}%`, 'Lower Confidence'];
                    return [value, name];
                  }}
                />
                {showForecast && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="upperBand" 
                      stroke="#f44336" 
                      strokeWidth={1}
                      strokeDasharray="3,3"
                      strokeOpacity={0.5}
                      dot={false}
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lowerBand" 
                      stroke="#f44336" 
                      strokeWidth={1}
                      strokeDasharray="3,3"
                      strokeOpacity={0.5}
                      dot={false}
                      connectNulls={false}
                    />
                  </>
                )}
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f44336" 
                  strokeWidth={3}
                  connectNulls={false}
                  dot={(props) => {
                    const { payload } = props;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill={payload?.isForecast ? '#ff9800' : '#f44336'}
                        stroke={payload?.isForecast ? '#ff9800' : '#f44336'}
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardContainer>
  );
}