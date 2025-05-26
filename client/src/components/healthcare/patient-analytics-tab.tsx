import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, UserCheck, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PatientAnalyticsTabProps {
  filter: string;
}

export default function PatientAnalyticsTab({ filter }: PatientAnalyticsTabProps) {
  const { data: patientData } = useQuery({
    queryKey: ["/api/patient-data", filter],
  });

  const { data: ageDistribution } = useQuery({
    queryKey: ["/api/age-distribution", filter],
  });

  // Prepare OPD visits data
  const opdVisitsData = patientData?.slice(-12).map((item: any) => ({
    month: item.month,
    newPatients: item.newPatients,
    existingPatients: item.existingPatients,
  })) || [];

  // Prepare age distribution data
  const ageData = ageDistribution?.map((item: any) => ({
    name: item.ageGroup,
    value: parseFloat(item.percentage),
    count: item.count,
  })) || [];

  const COLORS = ['#0066CC', '#00A86B', '#FF6B35', '#F59E0B', '#8B5CF6'];

  // Get current month data for metrics
  const currentData = patientData?.[patientData.length - 1];
  const previousData = patientData?.[patientData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* OPD Visits Trend */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">OPD Visits Trend</CardTitle>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-gray-600">New Patients</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                  <span className="text-gray-600">Existing Patients</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={opdVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newPatients"
                  stroke="#0066CC"
                  strokeWidth={2}
                  name="New Patients"
                  dot={{ fill: "#0066CC" }}
                />
                <Line
                  type="monotone"
                  dataKey="existingPatients"
                  stroke="#00A86B"
                  strokeWidth={2}
                  name="Existing Patients"
                  dot={{ fill: "#00A86B" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Group Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Age Group Distribution</CardTitle>
              <Badge className="bg-gray-100 text-gray-700">{currentMonth} Data</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ageData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${value}% (${props.payload.count} patients)`, ""
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Patient Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.totalPatients?.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">
                ↗ +{calculateGrowth(currentData?.totalPatients, previousData?.totalPatients)}%
              </span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.newPatients?.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserPlus className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">
                ↗ +{calculateGrowth(currentData?.newPatients, previousData?.newPatients)}%
              </span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Return Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.existingPatients?.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCheck className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">
                ↗ +{calculateGrowth(currentData?.existingPatients, previousData?.existingPatients)}%
              </span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Retention</p>
                <p className="text-2xl font-bold text-gray-900">{currentData?.retention}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">
                ↗ +{calculateGrowth(parseFloat(currentData?.retention), parseFloat(previousData?.retention))}%
              </span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
