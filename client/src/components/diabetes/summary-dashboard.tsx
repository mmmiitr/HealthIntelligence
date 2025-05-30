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


    </div>
  );
}