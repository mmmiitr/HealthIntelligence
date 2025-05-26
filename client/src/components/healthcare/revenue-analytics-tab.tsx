import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Sprout, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

interface RevenueAnalyticsTabProps {
  filter: string;
}

export default function RevenueAnalyticsTab({ filter }: RevenueAnalyticsTabProps) {
  const { data: financialData } = useQuery({
    queryKey: ["/api/financial-data", filter],
  });

  const { data: revenueBySpecialty } = useQuery({
    queryKey: ["/api/revenue-by-specialty", filter],
  });

  // Prepare revenue trend data with predictions
  const revenueTrendData = financialData?.map((item: any, index: number) => ({
    month: item.month,
    historical: !item.isPredicted ? parseFloat(item.totalRevenue) / 1000 : null,
    predicted: item.isPredicted ? parseFloat(item.totalRevenue) / 1000 : null,
    type: item.isPredicted ? "predicted" : "historical"
  })) || [];

  // Add connecting point between historical and predicted
  if (revenueTrendData.length > 0) {
    const lastHistorical = revenueTrendData.find((item: any) => !item.predicted && item.historical);
    const firstPredicted = revenueTrendData.find((item: any) => item.predicted);
    if (lastHistorical && firstPredicted) {
      const connectingIndex = revenueTrendData.findIndex((item: any) => item.predicted);
      if (connectingIndex > 0) {
        revenueTrendData[connectingIndex].historical = lastHistorical.historical;
      }
    }
  }

  // Prepare specialty revenue data
  const specialtyData = revenueBySpecialty?.map((item: any) => ({
    specialty: item.specialty,
    revenue: parseFloat(item.revenue) / 1000,
    growth: parseFloat(item.growth)
  })) || [];

  const topPerformers = specialtyData.slice(0, 3);
  const growthOpportunities = [...specialtyData].sort((a: any, b: any) => b.growth - a.growth).slice(0, 3);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend with Predictions */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue Trend with Predictions</CardTitle>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-gray-600">Historical</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Predicted</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}K`} />
                <Tooltip formatter={(value, name) => [`$${value}K`, name === "historical" ? "Historical" : "Predicted"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="historical"
                  stroke="#0066CC"
                  strokeWidth={2}
                  name="Historical Revenue"
                  connectNulls={false}
                  dot={{ fill: "#0066CC" }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#00A86B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted Revenue"
                  connectNulls={false}
                  dot={{ fill: "#00A86B" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Specialty */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Specialty</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={specialtyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${value}K`} />
                <YAxis dataKey="specialty" type="category" width={80} />
                <Tooltip formatter={(value) => [`$${value}K`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#0066CC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-semibold text-gray-900">Top Performing Departments</CardTitle>
              <Trophy className="text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((dept: any, index: number) => (
                <div key={dept.specialty} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{dept.specialty}</span>
                  <span className="text-sm font-semibold text-green-600">${dept.revenue}K</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-semibold text-gray-900">Growth Opportunities</CardTitle>
              <Sprout className="text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {growthOpportunities.map((dept: any) => (
                <div key={dept.specialty} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{dept.specialty}</span>
                  <span className="text-sm font-semibold text-blue-600">+{dept.growth}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-semibold text-gray-900">Future Projections</CardTitle>
              <BarChart3 className="text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Next Month</span>
                <span className="text-sm font-semibold text-primary">$2.6M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Next Quarter</span>
                <span className="text-sm font-semibold text-primary">$8.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Next 6 Months</span>
                <span className="text-sm font-semibold text-primary">$16.8M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
