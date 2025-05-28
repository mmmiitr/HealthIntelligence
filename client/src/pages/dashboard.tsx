import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Shield, Stethoscope, User, DollarSign, Settings, BarChart3, Database, Brain } from "lucide-react";
import { getCurrentTimestamp } from "@/lib/utils";
import SummaryDashboard from "@/components/diabetes/summary-dashboard";
import FinanceDashboard from "@/components/diabetes/finance-dashboard";
import OperationDashboard from "@/components/diabetes/operation-dashboard";
import ClinicianDashboard from "@/components/diabetes/clinician-dashboard";
import PatientDashboard from "@/components/diabetes/patient-dashboard";
import MockDataDashboard from "@/components/diabetes/mock-data-dashboard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const [timeFilter, setTimeFilter] = useState("1year");
  const [viewMode, setViewMode] = useState("monthly");

  const tabs = [
    { id: "summary", label: "Summary", icon: BarChart3, description: "Executive Overview" },
    { id: "finance", label: "Finance", icon: DollarSign, description: "Financial Performance" },
    { id: "operation", label: "Operation", icon: Settings, description: "Operational Efficiency" },
    { id: "clinician", label: "Clinician", icon: Stethoscope, description: "Healthcare Provider" },
    { id: "patient", label: "Patient", icon: User, description: "Individual Patient (John Doe)" },
    { id: "mockdata", label: "Mock Data", icon: Database, description: "Technical Team Data View" },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      case "finance":
        return <FinanceDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      case "operation":
        return <OperationDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      case "clinician":
        return <ClinicianDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      case "patient":
        return <PatientDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      case "mockdata":
        return <MockDataDashboard timeFilter={timeFilter} viewMode={viewMode} />;
      default:
        return <SummaryDashboard timeFilter={timeFilter} viewMode={viewMode} />;
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
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-900">Diabetes Care Dashboard</h1>
                    <Badge className="bg-green-100 text-green-800 flex items-center text-xs px-2 py-1">
                      <Shield className="h-2.5 w-2.5 mr-1" />
                      HIPAA Compliant
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 flex items-center text-xs px-2 py-1">
                      <Brain className="h-2.5 w-2.5 mr-1" />
                      AI-Enhanced Analytics
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
      </div>
    </div>
  );
}
