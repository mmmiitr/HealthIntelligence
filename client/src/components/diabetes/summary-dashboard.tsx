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
import { TYPOGRAPHY, COLORS, SPACING, LAYOUT, SHADOWS, getGridClasses, getSectionClasses } from "@/lib/design-system";
import StandardMetricCard from "@/components/common/StandardMetricCard";

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
        <div className={getGridClasses(4)}>
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