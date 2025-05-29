import { Badge } from "@/components/ui/badge";
import { Shield, Brain } from "lucide-react";
import { getCurrentTimestamp } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  description: string;
  badges?: Array<{
    text: string;
    icon: React.ComponentType<any>;
    className: string;
  }>;
  actions?: React.ReactNode;
}

export default function DashboardHeader({ 
  title, 
  description, 
  badges = [],
  actions 
}: DashboardHeaderProps) {
  const defaultBadges = [
    {
      text: "HIPAA Compliant",
      icon: Shield,
      className: "bg-green-100 text-green-800"
    },
    {
      text: "AI-Enhanced Analytics", 
      icon: Brain,
      className: "bg-blue-100 text-blue-800"
    }
  ];

  const allBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
          <div className="flex items-center mt-2 space-x-4">
            {allBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <Badge key={index} className={`${badge.className} flex items-center`}>
                  <Icon className="h-3 w-3 mr-1" />
                  {badge.text}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {actions}
          <p className="text-sm text-gray-500">{getCurrentTimestamp()}</p>
        </div>
      </div>
    </div>
  );
}