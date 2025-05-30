import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Users, Heart, UserCheck, AlertTriangle, Download, Settings, Shield, Brain, Monitor } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { keyMetricsTrendsData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";
import { useState } from "react";

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

  // Data-driven metric configs for Key Metrics with consistent colors
  const keyMetrics = [
    {
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      label: "Avg Revenue/Patient/Month",
      currentValue: "$120",
      forecastValue: showForecast ? "$128" : null,
      color: "blue", // revenue = blue
      type: "revenue"
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      label: "% Under CCM",
      currentValue: "30%",
      forecastValue: showForecast ? "32%" : null,
      color: "blue", // neutral metric = blue
      type: "neutral"
    },
    {
      icon: <Monitor className="h-5 w-5 text-blue-600" />,
      label: "% Telemedicine Visits",
      currentValue: "30%",
      forecastValue: showForecast ? "35%" : null,
      color: "blue", // neutral metric = blue
      type: "neutral"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-red-600" />,
      label: "Avg Cost/Patient/Month",
      currentValue: "$85",
      forecastValue: showForecast ? "$87" : null,
      color: "red", // cost = red
      type: "cost"
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Summary Dashboard</h2>
            <p className="text-gray-600 mt-1">Executive overview of diabetes care management</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {/* Download button moved to global header */}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {keyMetrics.map((metric, idx) => (
            <Card key={metric.label} className={`bg-white shadow-none rounded-xl border-l-4 ${
              metric.type === "revenue" ? "border-blue-500" : 
              metric.type === "cost" ? "border-red-500" : 
              "border-blue-300"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {metric.icon}
                  <span className="font-medium ml-2 text-gray-700 text-sm">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  {/* Current Value */}
                  <div className={`bg-${metric.type === "revenue" ? "blue" : metric.type === "cost" ? "red" : "blue"}-50 rounded-lg p-3`}>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className={`text-2xl font-bold ${
                      metric.type === "revenue" ? "text-blue-700" : 
                      metric.type === "cost" ? "text-red-700" : 
                      "text-blue-700"
                    }`}>
                      {metric.currentValue}
                    </p>
                  </div>
                  
                  {/* Forecast Value */}
                  {showForecast && metric.forecastValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.forecastValue}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.type === "cost" ? "↑ 2.4%" : "↑ 6.7%"} vs current
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Critical Alerts</h3>
        <Card className="bg-red-500 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-white mt-0.5" />
                <p className="text-white font-medium">30-Day ED Visit or Hospitalization (8%) exceeds target of 5%.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-white mt-0.5" />
                <p className="text-white font-medium">No-Show Appointments (12%) exceeds target of 10%.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}