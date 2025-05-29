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
            <Button 
              onClick={handleDownloadReport}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Report (CSV)</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Refactored Total Revenue Card */}
          <Card className="bg-white border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-900">Total Revenue</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-green-900">$1.2M</div>
                  <div className="text-xs text-green-600">↑ +8.2%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">$1.95M</div>
                    <div className="text-xs text-blue-600">+5.4% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">65% complete</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored Active Panel Size Card */}
          <Card className="bg-white border-l-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">Active Panel Size</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-blue-900">1,247</div>
                  <div className="text-xs text-blue-600">↑ +5.1%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">1,310</div>
                    <div className="text-xs text-blue-600">+1.6% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{width: '97%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">97% complete</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored % In-Control HbA1c Card */}
          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">% In-Control HbA1c</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-purple-900">72%</div>
                  <div className="text-xs text-green-600">↑ +4.2%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">75%</div>
                    <div className="text-xs text-blue-600">+3% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-purple-500 h-1 rounded-full" style={{width: '72%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">in control</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored % Under CCM Card */}
          <Card className="bg-white border-l-4 border-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <UserCheck className="h-5 w-5 text-orange-600 mr-2" />
                <span className="font-semibold text-gray-900">% Under CCM</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-orange-900">94%</div>
                  <div className="text-xs text-green-600">↑ +2.1%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">96%</div>
                    <div className="text-xs text-blue-600">+1.1% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-orange-500 h-1 rounded-full" style={{width: '99%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">99% complete</div>
              </div>
            </CardContent>
          </Card>
          {/* Refactored Telemedicine Patients Card */}
          <Card className="bg-white border-l-4 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Monitor className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">Telemedicine Patients</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="text-xl font-bold text-purple-900">847</div>
                  <div className="text-xs text-purple-600">↑ +15.3%</div>
                </div>
                {showForecast && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Forecast</div>
                    <div className="text-xl font-bold text-blue-600">895</div>
                    <div className="text-xs text-blue-600">+5.7% forecast</div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-1 mb-1">
                  <div className="bg-purple-500 h-1 rounded-full" style={{width: '68%'}}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">68% of panel</div>
              </div>
            </CardContent>
          </Card>
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