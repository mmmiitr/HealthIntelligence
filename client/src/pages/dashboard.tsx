import { useState } from "react";
import DashboardHeader from "@/components/healthcare/dashboard-header";
import TabNavigation from "@/components/healthcare/tab-navigation";
import SpecialInsightsTab from "@/components/healthcare/special-insights-tab";
import FinancialOverviewTab from "@/components/healthcare/financial-overview-tab";
import RevenueAnalyticsTab from "@/components/healthcare/revenue-analytics-tab";
import PatientAnalyticsTab from "@/components/healthcare/patient-analytics-tab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("insights");
  const [globalFilter, setGlobalFilter] = useState("all");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "insights":
        return <SpecialInsightsTab filter={globalFilter} />;
      case "financial":
        return <FinancialOverviewTab filter={globalFilter} />;
      case "revenue":
        return <RevenueAnalyticsTab filter={globalFilter} />;
      case "patients":
        return <PatientAnalyticsTab filter={globalFilter} />;
      default:
        return <SpecialInsightsTab filter={globalFilter} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}
