import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Users, Heart, UserCheck, AlertTriangle, Download, Settings, Shield, Brain, Monitor } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { keyMetricsTrendsData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";
import { useState } from "react";
import StandardMetricCard from "@/components/common/StandardMetricCard";
import { styles } from "@/lib/styles";

interface SummaryDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function SummaryDashboard({ timeFilter, viewMode, showForecast }: SummaryDashboardProps) {
  
  const handleDownloadReport = () => {
    window.alert("Downloading CSV: Key Metrics (Profitability, HbA1c, CCM Enrollment, Readmission Rate)");
  };



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

  // Data-driven metric configs for Key Metrics with semantic colors
  const keyMetrics = [
    {
      title: "Avg Revenue/Patient/Month",
      currentValue: "$120",
      forecastValue: showForecast ? "$128" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'revenue' as const,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: "% Under CCM",
      currentValue: "30%",
      forecastValue: showForecast ? "32%" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'neutral' as const,
      icon: <UserCheck className="h-4 w-4" />
    },
    {
      title: "% Telemedicine Visits",
      currentValue: "30%",
      forecastValue: showForecast ? "35%" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'neutral' as const,
      icon: <Monitor className="h-4 w-4" />
    },
    {
      title: "Avg Cost/Patient/Month",
      currentValue: "$85",
      forecastValue: showForecast ? "$87" : undefined,
      currentLabel: labels.current,
      forecastLabel: showForecast ? labels.forecast : undefined,
      type: 'cost' as const,
      icon: <Heart className="h-4 w-4" />
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Executive Summary</h2>
            <p className="text-gray-600 text-lg">Comprehensive diabetes care management overview</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Key Performance Indicators</h3>
          <p className="text-gray-600">
            {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Performance Metrics
          </p>
        </div>
        <div className={styles.grid.cols4}>
          {keyMetrics.map((metric) => (
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

      {/* Critical Alerts */}
      <div className="mb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Critical Alerts</h3>
          <p className="text-gray-600">
            Immediate attention required for these performance indicators
          </p>
        </div>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 border-red-700 shadow-xl rounded-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-white font-bold">
                    30-Day ED Visit or Hospitalization Rate
                  </p>
                  <p className="text-red-100 mt-2">
                    Current: 8% | Target: 5% | Action required to reduce readmissions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-white font-bold">
                    No-Show Appointment Rate
                  </p>
                  <p className="text-red-100 mt-2">
                    Current: 12% | Target: 10% | Review scheduling and reminder processes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Key Trends</h3>
          <p className="text-gray-600">Historical performance and predictions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* % In Control HbA1c Chart */}
          <Card className="bg-white rounded-lg shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">% In Control HbA1c (&lt;7%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[
                  { month: 'Jan', value: 65, upperCI: null, lowerCI: null },
                  { month: 'Feb', value: 67, upperCI: null, lowerCI: null },
                  { month: 'Mar', value: 69, upperCI: null, lowerCI: null },
                  { month: 'Apr', value: 68, upperCI: null, lowerCI: null },
                  { month: 'May', value: 70, upperCI: null, lowerCI: null },
                  { month: 'Jun', value: showForecast ? 72 : null, upperCI: showForecast ? 75 : null, lowerCI: showForecast ? 69 : null },
                  { month: 'Jul', value: showForecast ? 74 : null, upperCI: showForecast ? 77 : null, lowerCI: showForecast ? 71 : null }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[60, 80]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'HbA1c Control']} />
                  {showForecast && (
                    <Area
                      type="monotone"
                      dataKey="upperCI"
                      stroke="none"
                      fill="#1976d2"
                      fillOpacity={0.1}
                      connectNulls={false}
                    />
                  )}
                  {showForecast && (
                    <Area
                      type="monotone"
                      dataKey="lowerCI"
                      stroke="none"
                      fill="#ffffff"
                      fillOpacity={1}
                      connectNulls={false}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1976d2" 
                    strokeWidth={3}
                    connectNulls={false}
                    strokeDasharray={showForecast ? "0 0 5 5" : "0"}
                  />
                  {showForecast && <ReferenceLine x="May" stroke="#666" strokeDasharray="2 2" />}
                </AreaChart>
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
                <LineChart data={[
                  { month: 'Jan', value: 25 },
                  { month: 'Feb', value: 27 },
                  { month: 'Mar', value: 28 },
                  { month: 'Apr', value: 29 },
                  { month: 'May', value: 30 },
                  { month: 'Jun', value: showForecast ? 32 : null },
                  { month: 'Jul', value: showForecast ? 34 : null }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[20, 40]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'CCM Enrollment']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4caf50" 
                    strokeWidth={3}
                    connectNulls={false}
                    strokeDasharray={showForecast ? "0 0 5 5" : "0"}
                  />
                  {showForecast && <ReferenceLine x="May" stroke="#666" strokeDasharray="2 2" />}
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
              <LineChart data={[
                { month: 'Jan', value: 9.2 },
                { month: 'Feb', value: 8.8 },
                { month: 'Mar', value: 8.5 },
                { month: 'Apr', value: 8.1 },
                { month: 'May', value: 8.0 },
                { month: 'Jun', value: showForecast ? 7.5 : null },
                { month: 'Jul', value: showForecast ? 7.2 : null }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[6, 10]} />
                <Tooltip formatter={(value) => [`${value}%`, 'ED Visit Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f44336" 
                  strokeWidth={3}
                  connectNulls={false}
                  strokeDasharray={showForecast ? "0 0 5 5" : "0"}
                />
                {showForecast && <ReferenceLine x="May" stroke="#666" strokeDasharray="2 2" />}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}