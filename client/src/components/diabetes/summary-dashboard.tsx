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
      <div className={SPACING.section}>
        <div className={LAYOUT.flexBetween}>
          <div>
            <h2 className={TYPOGRAPHY.h2}>Executive Summary</h2>
            <p className={`${TYPOGRAPHY.sectionSubtitle} mt-3`}>Comprehensive diabetes care management overview</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={SPACING.section}>
        <div className={SPACING.cardHeader}>
          <h3 className={TYPOGRAPHY.sectionTitle}>Key Performance Indicators</h3>
          <p className={TYPOGRAPHY.sectionSubtitle}>
            {viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"} Performance Metrics
          </p>
        </div>
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
      <div className={SPACING.section}>
        <div className={SPACING.cardHeader}>
          <h3 className={TYPOGRAPHY.sectionTitle}>Critical Alerts</h3>
          <p className={TYPOGRAPHY.sectionSubtitle}>
            Immediate attention required for these performance indicators
          </p>
        </div>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 border-red-700 shadow-xl rounded-xl">
          <CardContent className={SPACING.card}>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`${TYPOGRAPHY.bodyLarge} text-white font-bold leading-relaxed`}>
                    30-Day ED Visit or Hospitalization Rate
                  </p>
                  <p className={`${TYPOGRAPHY.body} text-red-100 mt-1`}>
                    Current: 8% | Target: 5% | Action required to reduce readmissions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`${TYPOGRAPHY.bodyLarge} text-white font-bold leading-relaxed`}>
                    No-Show Appointment Rate
                  </p>
                  <p className={`${TYPOGRAPHY.body} text-red-100 mt-1`}>
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