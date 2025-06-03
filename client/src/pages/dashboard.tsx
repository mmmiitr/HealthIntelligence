import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Shield, Stethoscope, User, DollarSign, Settings, BarChart3, Database, Brain } from "lucide-react";
import { getCurrentTimestamp } from "@/lib/utils";
import SummaryDashboard from "@/components/diabetes/summary-dashboard";
import FinanceDashboard from "@/components/diabetes/finance-dashboard-simple";
import OperationDashboard from "@/components/diabetes/operation-dashboard";
import ClinicianDashboard from "@/components/diabetes/clinician-dashboard";
import MockDataDashboard from "@/components/diabetes/mock-data-dashboard";
import { exportMultipleTabsToPDF } from "@/lib/pdf-utils";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const [timeFilter, setTimeFilter] = useState("1year");
  const [viewMode, setViewMode] = useState("monthly");
  const [showForecast, setShowForecast] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTimestamp());
  const [isExporting, setIsExporting] = useState(false);

  const summaryRef = useRef(null);
  const financeRef = useRef(null);
  const operationRef = useRef(null);
  const clinicianRef = useRef(null);
  const technicalRef = useRef(null);

  // Update timestamp every 30 seconds to show fresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimestamp());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "summary", label: "Summary", icon: BarChart3, description: "" },
    { id: "finance", label: "Finance", icon: DollarSign, description: "" },
    { id: "operation", label: "Operations", icon: Settings, description: "" },
    { id: "clinician", label: "Clinical", icon: Stethoscope, description: "" },
    { id: "mockdata", label: "Technical", icon: Database, description: "" },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
      case "finance":
        return <FinanceDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
      case "operation":
        return <OperationDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
      case "clinician":
        return <ClinicianDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
      case "mockdata":
        return <MockDataDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
      default:
        return <SummaryDashboard timeFilter={timeFilter} viewMode={viewMode} showForecast={showForecast} />;
    }
  };

  // PDF download handler for all tabs (except technical)
  const handleDownloadPDF = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      const tabsToExport = [
        { id: 'summary', label: 'Summary', captureScale: 1.5, waitTime: 1500 },
        { id: 'finance', label: 'Finance', captureScale: 1.5, waitTime: 1500 },
        { id: 'operation', label: 'Operations', captureScale: 2.0, waitTime: 2000 },
        { id: 'clinician', label: 'Clinical', captureScale: 2.0, waitTime: 2000 }
      ];

      await exportMultipleTabsToPDF(
        tabsToExport,
        setActiveTab,
        activeTab,
        `diabetes-dashboard-complete-${new Date().toISOString().split('T')[0]}.pdf`
      );
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* First Row: Title and Controls */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Diabetes Care Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg">
                <label htmlFor="global-forecast-toggle" className="text-sm font-semibold text-gray-700">
                  Forecast
                </label>
                <Switch
                  id="global-forecast-toggle"
                  checked={showForecast}
                  onCheckedChange={setShowForecast}
                  className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 border-2 border-gray-300"
                />
              </div>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-36 h-10 text-sm font-medium bg-white border-2 border-gray-400 hover:border-blue-500 focus:border-blue-600 shadow-lg text-gray-900">
                  <SelectValue placeholder="View Mode" className="text-gray-900 font-medium" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-white border-2 border-gray-400 shadow-2xl rounded-md min-w-[144px]">
                  <SelectItem value="monthly" className="text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-900 cursor-pointer px-3 py-2">
                    Monthly
                  </SelectItem>
                  <SelectItem value="quarterly" className="text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-900 cursor-pointer px-3 py-2">
                    Quarterly
                  </SelectItem>
                  <SelectItem value="yearly" className="text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-900 cursor-pointer px-3 py-2">
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold flex items-center space-x-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDownloadPDF}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m15.84 7.66-4.84 4.84v-4.84h2v-2h-2.5c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-2.5h-2v2h-4.84l4.84-4.84z"></path>
                    </svg>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                    <span>Download Report (PDF)</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Second Row: Navigation Tabs */}
          <div className="flex justify-center py-3 border-t border-gray-100">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    size="sm"
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`justify-center space-x-2 py-3 px-6 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-600 shadow-md text-white hover:bg-blue-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold text-sm">{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div id="dashboard-content" className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="w-full">
            {renderActiveTab()}
          </div>
        </div>
      </div>

      {/* Global Footer with Badges and Timestamp */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
        <div className="py-4 border-t border-gray-200 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 flex items-center text-xs px-3 py-1">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center text-xs px-3 py-1">
                <Brain className="h-3 w-3 mr-1" />
                AI-Enhanced Analytics
              </Badge>
            </div>
            <p className="text-sm text-gray-500">Last Updated: {currentTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
