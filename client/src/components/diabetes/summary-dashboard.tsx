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

  // Data-driven metric configs for Key Metrics (for flex-based cards)
  const keyMetrics = [
    {
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      label: "Avg Revenue/Patient/Month",
      value: <span className="text-2xl font-extrabold text-blue-600">$120</span>,
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      label: "% Under CCM",
      value: <span className="text-2xl font-extrabold text-blue-700">30%</span>,
    },
    {
      icon: <Monitor className="h-5 w-5 text-purple-600" />,
      label: "% Telemedicine Visits",
      value: <span className="text-2xl font-extrabold text-purple-700">30%</span>,
    },
    {
      icon: <DollarSign className="h-5 w-5 text-red-600" />,
      label: "Avg Cost/Patient/Month",
      value: <span className="text-2xl font-extrabold text-red-700">$85</span>,
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
            <Card key={metric.label} className="bg-white shadow-none rounded-xl">
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <div className="flex items-center mb-2">
                  {metric.icon}
                  <span className={`font-semibold ml-2 ${metric.label === "Avg Revenue/Patient/Month" ? "text-blue-600" : "text-gray-900"}`}>{metric.label}</span>
                </div>
                <div>{metric.value}</div>
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