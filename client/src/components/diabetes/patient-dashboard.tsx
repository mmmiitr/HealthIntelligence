import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, Pill, BookOpen, Target, Apple, Dumbbell, TrendingUp, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { johnDoeHbA1cTrend } from "@/lib/mock-data";

interface PatientDashboardProps {
  timeFilter: string;
  viewMode: string;
}

export default function PatientDashboard({ timeFilter, viewMode }: PatientDashboardProps) {
  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch(viewMode) {
      case "monthly":
        return { current: "MAY CURRENT", forecast: "JUN TARGET" };
      case "quarterly":
        return { current: "Q2 CURRENT", forecast: "Q3 TARGET" };
      case "yearly":
        return { current: "2024 CURRENT", forecast: "2025 TARGET" };
      default:
        return { current: "MAY CURRENT", forecast: "JUN TARGET" };
    }
  };

  const labels = getViewLabels();
  const { data: patientProfile } = useQuery({
    queryKey: ["/api/patient/profile"],
  });

  const { data: a1cHistory } = useQuery({
    queryKey: ["/api/patient/a1c-history", timeFilter],
  });

  const { data: educationalTips } = useQuery({
    queryKey: ["/api/patient/educational-tips"],
  });

  // Prepare A1C history chart data
  const a1cChartData = Array.isArray(a1cHistory) ? a1cHistory.map((item: any) => ({
    month: item.month,
    a1c: isNaN(parseFloat(item.a1c)) ? 0 : parseFloat(item.a1c),
    target: 7.0, // Target A1C level
  })) : [];

  const currentA1C = (patientProfile as any)?.currentA1C || "0.0";
  const nextAppointment = (patientProfile as any)?.nextAppointment || "Not scheduled";
  const medicationAdherence = (patientProfile as any)?.medicationAdherence || "0";

  // Group educational tips by category
  const tipsByCategory = Array.isArray(educationalTips) ? educationalTips.reduce((acc: any, tip: any) => {
    if (!acc[tip.category]) acc[tip.category] = [];
    acc[tip.category].push(tip);
    return acc;
  }, {}) : {};

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "diet": return Apple;
      case "exercise": return Dumbbell;
      case "medication": return Pill;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "diet": return "bg-green-50 border-green-200";
      case "exercise": return "bg-blue-50 border-blue-200";
      case "medication": return "bg-purple-50 border-purple-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Patient Dashboard</h2>
            <h5 className="text-lg font-medium text-gray-700 mt-2">Patient Overview - John Doe</h5>
            <p className="text-gray-600 mt-1">Personal diabetes management</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm text-gray-500">Last Updated: May 28, 2025, 05:52 PM IST</p>
          </div>
        </div>
      </div>

      {/* Personal Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-md border-l-4 border-blue-500" style={{height: '140px'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-sm font-medium text-gray-600">Personal A1C Level</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">MAY CURRENT</p>
                <p className="text-lg font-bold text-gray-900">{currentA1C}%</p>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">JUN TARGET</p>
                <p className="text-lg font-bold text-green-600">&lt;7.0%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-green-500" style={{height: '140px'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm font-medium text-gray-600">Next Appointment</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">MAY SCHEDULED</p>
                <p className="text-sm font-bold text-gray-900">{nextAppointment}</p>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">JUN PROVIDER</p>
                <p className="text-sm font-bold text-green-600">Dr. Johnson</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-purple-500" style={{height: '140px'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Pill className="h-5 w-5 text-purple-600 mr-2" />
                <p className="text-sm font-medium text-gray-600">Medication Adherence</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">MAY CURRENT</p>
                <p className="text-lg font-bold text-gray-900">{medicationAdherence}%</p>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <p className="text-xs font-medium text-gray-500">JUN TARGET</p>
                <p className="text-lg font-bold text-purple-600">95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* A1C History Chart */}
      <Card className="bg-white mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            Personal A1C History
          </CardTitle>
          <p className="text-sm text-gray-600">Your A1C levels over time compared to target goal (7.0%)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={a1cChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[6, 10]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value, name) => [
                `${value}%`,
                name === "a1c" ? "Your A1C" : "Target A1C"
              ]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#00A86B"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target A1C (7.0%)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="a1c"
                stroke="#0066CC"
                strokeWidth={3}
                name="Your A1C"
                dot={{ fill: "#0066CC", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* HbA1c Trend with John Doe's Data */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            John Doe's HbA1c Trend
          </CardTitle>
          <p className="text-sm text-gray-600">Extended trend data: Jan 2025 - Oct 2025</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={johnDoeHbA1cTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[5.5, 7]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value) => [`${value}%`, "HbA1c"]} 
                labelFormatter={(label) => `${label} - Extended View`}
              />
              <Legend />
              <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Today" />
              <Line
                type="monotone"
                dataKey="hba1c"
                stroke="#1976d2"
                strokeWidth={3}
                name="HbA1c (%)"
                dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Care Plan */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="mr-2 h-5 w-5 text-green-600" />
            John Doe's Current Care Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Pill className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Current Medications</p>
                <p className="text-gray-700">Metformin 500mg daily</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Next Appointment</p>
                <p className="text-gray-700">June 5, 2025 at 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-purple-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Current HbA1c Goal</p>
                <p className="text-gray-700">Target: &lt;7.0%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Tips */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Educational Tips
          </CardTitle>
          <p className="text-sm text-gray-600">Personalized recommendations for better diabetes management</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(tipsByCategory).map(([category, tips]: [string, any]) => {
              const Icon = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);
              
              return (
                <div key={category} className={`p-4 rounded-lg border ${colorClass}`}>
                  <div className="flex items-center mb-3">
                    <Icon className="h-5 w-5 text-gray-700 mr-2" />
                    <h4 className="font-semibold text-gray-900 capitalize">{category} Tips</h4>
                  </div>
                  <div className="space-y-3">
                    {tips.map((tip: any) => (
                      <div key={tip.id} className="bg-white p-3 rounded border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-1">{tip.title}</h5>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          <p className="text-sm text-gray-600">Common tasks and resources</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Log Blood Sugar</h4>
              <p className="text-xs text-gray-600 mt-1">Record today's readings</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors">
              <Pill className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Medication Reminder</h4>
              <p className="text-xs text-gray-600 mt-1">Set up alerts</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center cursor-pointer hover:bg-purple-100 transition-colors">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Schedule Appointment</h4>
              <p className="text-xs text-gray-600 mt-1">Book next visit</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center cursor-pointer hover:bg-orange-100 transition-colors">
              <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Learning Resources</h4>
              <p className="text-xs text-gray-600 mt-1">Educational materials</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Section */}
      <Card className="bg-blue-50 shadow-lg border-l-4 border-blue-500 mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Next Steps</CardTitle>
          <p className="text-sm text-gray-600">Recommended actions to improve your diabetes management</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-800">
                <span className="font-medium">Increase CCM Enrollment:</span> Current 75%, Target 85% to improve outcomes.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-800">
                <span className="font-medium">Reduce No-Show Appointments:</span> Current 12%, Target &lt;10% with reminders.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}