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
import { MetricCard } from "@/components/ui/metric-card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SummaryDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function SummaryDashboard({ timeFilter, viewMode, showForecast }: SummaryDashboardProps) {
  
  const handleDownloadReport = () => {
    window.alert("Downloading CSV: Key Metrics (Profitability, HbA1c, CCM Enrollment, Readmission Rate)");
  };

  // PDF Export Handler
  const handleExportPDF = async () => {
    const input = document.getElementById("summary-dashboard-root");
    if (!input) return;
    const canvas = await html2canvas(input, { backgroundColor: '#fff', scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("SummaryDashboard.pdf");
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
      label: "Avg Revenue/Patient/Month",
      value: "$120",
      futureValue: showForecast ? "$128" : undefined,
      percentChange: showForecast ? "+6.7%" : undefined,
      borderColor: "border-blue-500"
    },
    {
      label: "% Under CCM",
      value: "30%",
      futureValue: showForecast ? "32%" : undefined,
      percentChange: showForecast ? "+2%" : undefined,
      borderColor: "border-blue-500"
    },
    {
      label: "% Telemedicine Visits",
      value: "30%",
      futureValue: showForecast ? "35%" : undefined,
      percentChange: showForecast ? "+5%" : undefined,
      borderColor: "border-blue-500"
    },
    {
      label: "Avg Cost/Patient/Month",
      value: "$85",
      futureValue: showForecast ? "$87" : undefined,
      percentChange: showForecast ? "+2.4%" : undefined,
      borderColor: "border-blue-500"
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
          {keyMetrics.map((metric) => (
            <Card key={metric.label} className="bg-white shadow-sm rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  {/* Current Value */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {metric.value}
                    </p>
                  </div>
                  
                  {/* Forecast Value */}
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.percentChange} vs current
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

      <div className="flex justify-end mb-4">
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-sm text-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}