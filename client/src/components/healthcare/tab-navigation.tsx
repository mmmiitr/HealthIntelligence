import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, DollarSign, Users } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "insights", label: "Special Insights", icon: Lightbulb },
  { id: "financial", label: "Financial Overview", icon: DollarSign },
  { id: "revenue", label: "Revenue Analytics", icon: TrendingUp },
  { id: "patients", label: "Patient Analytics", icon: Users },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-6">
      <nav className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
