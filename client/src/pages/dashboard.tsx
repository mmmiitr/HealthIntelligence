import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Shield, Stethoscope, User, DollarSign, Settings, BarChart3, Database, Brain } from "lucide-react";
import { getCurrentTimestamp } from "@/lib/utils";
import SummaryDashboard from "@/components/diabetes/summary-dashboard";
import FinanceDashboard from "@/components/diabetes/finance-dashboard";
import OperationDashboard from "@/components/diabetes/operation-dashboard";
import ClinicianDashboard from "@/components/diabetes/clinician-dashboard";
import MockDataDashboard from "@/components/diabetes/mock-data-dashboard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const [timeFilter, setTimeFilter] = useState("1year");
  const [viewMode, setViewMode] = useState("monthly");
  const [showForecast, setShowForecast] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTimestamp());

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
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const tabsToInclude = ['summary', 'finance', 'operation', 'clinician'];
      const currentTab = activeTab;
      
      for (let i = 0; i < tabsToInclude.length; i++) {
        const tabId = tabsToInclude[i];
        
        // Switch to the tab to render its content
        setActiveTab(tabId);
        
        // Wait for the tab to render
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const activeElement = document.getElementById('dashboard-content');
        if (!activeElement) {
          console.error('Dashboard content not found');
          continue;
        }

        // Capture the tab content
        const canvas = await html2canvas(activeElement, { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: activeElement.scrollWidth,
          height: activeElement.scrollHeight
        });
        
        const imgData = canvas.toDataURL("image/png");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate aspect ratio to fit content properly
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
        
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        
        // Center the image on the page
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        
        // Add new page for subsequent tabs
        if (i > 0) pdf.addPage();
        
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      }
      
      // Restore original tab
      setActiveTab(currentTab);
      
      pdf.save(`diabetes-dashboard-complete-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Heart className="text-primary text-2xl" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Diabetes Care Dashboard</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="global-forecast-toggle" className="text-sm font-medium text-gray-700">
                  Forecast
                </label>
                <Switch
                  id="global-forecast-toggle"
                  checked={showForecast}
                  onCheckedChange={setShowForecast}
                />
              </div>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="View Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                onClick={handleDownloadPDF}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                <span>Download Report (PDF)</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div id="dashboard-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <Card className="mb-6 bg-white">
          <CardContent className="p-6">
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`flex-1 justify-start space-x-2 ${
                      activeTab === tab.id
                        ? "bg-white shadow-sm text-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs opacity-70">{tab.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Active Tab Content */}
        <div>
          {renderActiveTab()}
        </div>

        {/* Global Footer with Badges and Timestamp */}
        <div className="mt-8 py-4 border-t border-gray-200 bg-gray-50 rounded-lg">
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
