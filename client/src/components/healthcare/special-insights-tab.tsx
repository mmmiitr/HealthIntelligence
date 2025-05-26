import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Gem, Smile, Clock, UserCheck, Bed, TrendingUp, Users, AlertTriangle } from "lucide-react";

interface SpecialInsightsTabProps {
  filter: string;
}

export default function SpecialInsightsTab({ filter }: SpecialInsightsTabProps) {
  const { data: insights } = useQuery({
    queryKey: ["/api/insights", filter],
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/performance-metrics", filter],
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return <TrendingUp className="text-primary mt-1 mr-3" />;
      case "patient":
        return <Users className="text-secondary mt-1 mr-3" />;
      case "capacity":
        return <AlertTriangle className="text-accent mt-1 mr-3" />;
      default:
        return <TrendingUp className="text-primary mt-1 mr-3" />;
    }
  };

  const getInsightBorderColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "border-l-primary bg-blue-50";
      case "warning":
        return "border-l-accent bg-orange-50";
      default:
        return "border-l-secondary bg-green-50";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* AI-Powered Insights */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Bot className="text-primary mr-2" />
                AI-Powered Insights
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights?.map((insight: any) => (
                <div
                  key={insight.id}
                  className={`border-l-4 p-4 rounded-r-lg ${getInsightBorderColor(insight.impact)}`}
                >
                  <div className="flex items-start">
                    {getInsightIcon(insight.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Gem className="text-primary mr-2" />
                Predictive Analytics
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-800">6-Month Forecast</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Patient Volume</span>
                </div>
                <span className="text-sm font-semibold text-green-600">↗ +12% growth expected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Revenue</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">↗ +8% increase projected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Operational Costs</span>
                </div>
                <span className="text-sm font-semibold text-orange-600">↗ +5% inflation impact</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.patientSatisfaction}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Smile className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +2.1%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.averageWaitTime} min</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↓ -3 min</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Staff Utilization</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.staffUtilization}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCheck className="text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-orange-600 font-medium">↗ +5%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bed Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.bedOccupancy}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Bed className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +1.2%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
