import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, User } from "lucide-react";

interface DashboardHeaderProps {
  globalFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function DashboardHeader({ globalFilter, onFilterChange }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Heart className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">HealthCare Analytics</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={globalFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL Facilities</SelectItem>
                <SelectItem value="cardiology">Cardiology Center</SelectItem>
                <SelectItem value="orthopedics">Orthopedics Wing</SelectItem>
                <SelectItem value="pediatrics">Pediatrics Department</SelectItem>
                <SelectItem value="emergency">Emergency Department</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="text-lg" />
              <span>Dr. Sarah Johnson</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
