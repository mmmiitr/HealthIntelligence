import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Table, TrendingUp, Users, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface MockDataDashboardProps {
  timeFilter: string;
}

export default function MockDataDashboard({ timeFilter }: MockDataDashboardProps) {
  const [activeDataset, setActiveDataset] = useState("revenue");

  // Mock datasets based on your requirements
  const revenueData = [
    { month: 'Jan', revenue: 850000, predictedRevenue: 920000, lowerCI: 890000, upperCI: 950000 },
    { month: 'Feb', revenue: 920000, predictedRevenue: 980000, lowerCI: 950000, upperCI: 1010000 },
    { month: 'Mar', revenue: 880000, predictedRevenue: 950000, lowerCI: 920000, upperCI: 980000 },
    { month: 'Apr', revenue: 950000, predictedRevenue: 1020000, lowerCI: 990000, upperCI: 1050000 },
    { month: 'May', revenue: 1000000, predictedRevenue: 1080000, lowerCI: 1050000, upperCI: 1110000 },
    { month: 'Jun', revenue: null, predictedRevenue: 1150000, lowerCI: 1120000, upperCI: 1180000 },
  ];

  const hba1cData = [
    { month: 'Jan', avgHbA1c: 7.8, predictedHbA1c: 7.5 },
    { month: 'Feb', avgHbA1c: 7.6, predictedHbA1c: 7.3 },
    { month: 'Mar', avgHbA1c: 7.4, predictedHbA1c: 7.1 },
    { month: 'Apr', avgHbA1c: 7.2, predictedHbA1c: 6.9 },
    { month: 'May', avgHbA1c: 7.0, predictedHbA1c: 6.8 },
    { month: 'Jun', avgHbA1c: null, predictedHbA1c: 6.7 },
  ];

  const visitsData = [
    { month: 'Jan', patientId: 'P001', visitCount: 2, predictedVisitCount: 3 },
    { month: 'Feb', patientId: 'P001', visitCount: 1, predictedVisitCount: 2 },
    { month: 'Mar', patientId: 'P001', visitCount: 3, predictedVisitCount: 3 },
    { month: 'Apr', patientId: 'P001', visitCount: 2, predictedVisitCount: 2 },
    { month: 'May', patientId: 'P001', visitCount: 4, predictedVisitCount: 3 },
    { month: 'Jun', patientId: 'P001', visitCount: null, predictedVisitCount: 3 },
  ];

  const datasets = [
    { id: "revenue", label: "Revenue Data", icon: DollarSign, data: revenueData },
    { id: "hba1c", label: "HbA1c Data", icon: TrendingUp, data: hba1cData },
    { id: "visits", label: "Visit Data", icon: Users, data: visitsData },
  ];

  const renderChart = () => {
    const currentDataset = datasets.find(d => d.id === activeDataset);
    if (!currentDataset) return null;

    if (activeDataset === "revenue") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={currentDataset.data}>
            <defs>
              <linearGradient id="confidenceArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value/1000)}K`} />
            <Tooltip formatter={(value, name) => [
              name === 'revenue' ? `$${value?.toLocaleString()}` : `$${value?.toLocaleString()}`,
              name === 'revenue' ? 'Actual Revenue' : 
              name === 'predictedRevenue' ? 'Predicted Revenue' : 'Confidence Interval'
            ]} />
            <Legend />
            
            <Area
              type="monotone"
              dataKey="upperCI"
              stroke="none"
              fill="url(#confidenceArea)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="lowerCI"
              stroke="none"
              fill="white"
            />
            
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1976d2"
              strokeWidth={3}
              name="Actual Revenue"
              dot={{ fill: "#1976d2" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predictedRevenue"
              stroke="#4caf50"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Revenue"
              dot={{ fill: "#4caf50" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (activeDataset === "hba1c") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentDataset.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[6, 8]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value, name) => [
              `${value}%`,
              name === 'avgHbA1c' ? 'Average HbA1c' : 'Predicted HbA1c'
            ]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgHbA1c"
              stroke="#1976d2"
              strokeWidth={3}
              name="Average HbA1c"
              dot={{ fill: "#1976d2" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predictedHbA1c"
              stroke="#4caf50"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted HbA1c"
              dot={{ fill: "#4caf50" }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (activeDataset === "visits") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentDataset.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              value,
              name === 'visitCount' ? 'Actual Visits' : 'Predicted Visits'
            ]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="visitCount"
              stroke="#1976d2"
              strokeWidth={3}
              name="Actual Visits"
              dot={{ fill: "#1976d2" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predictedVisitCount"
              stroke="#4caf50"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Visits (Zero-Inflated Poisson)"
              dot={{ fill: "#4caf50" }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderTable = () => {
    const currentDataset = datasets.find(d => d.id === activeDataset);
    if (!currentDataset) return null;

    const headers = Object.keys(currentDataset.data[0]);

    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map(header => (
                <th key={header} className="text-left py-3 px-4 font-semibold text-gray-900 capitalize">
                  {header.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentDataset.data.map((row: any, index: number) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                {headers.map(header => (
                  <td key={header} className="py-3 px-4 text-gray-900">
                    {row[header] !== null ? (
                      typeof row[header] === 'number' && header.includes('revenue') ? 
                        `$${row[header]?.toLocaleString()}` : 
                        row[header]
                    ) : (
                      <span className="text-gray-400 italic">Predicted</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mock Data Dashboard</h2>
        <p className="text-gray-600 mt-1">Technical team view of datasets and AI/ML model outputs</p>
      </div>

      {/* Dataset Selection */}
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Database className="mr-2 h-5 w-5 text-primary" />
            Available Datasets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {datasets.map(dataset => {
              const Icon = dataset.icon;
              return (
                <button
                  key={dataset.id}
                  onClick={() => setActiveDataset(dataset.id)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                    activeDataset === dataset.id
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {dataset.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart Visualization */}
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            {datasets.find(d => d.id === activeDataset)?.label} Visualization
            <Badge className="ml-2 bg-green-100 text-green-800">AI/ML Predictions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Table className="mr-2 h-5 w-5 text-primary" />
            {datasets.find(d => d.id === activeDataset)?.label} Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderTable()}
        </CardContent>
      </Card>

      {/* Additional Data Considerations */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Additional Data to Consider</CardTitle>
          <p className="text-sm text-gray-600">Datasets that could enhance model accuracy and insights</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Clinical Data</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Comorbidities (hypertension, cardiovascular disease)</li>
                <li>• Medication adherence rates</li>
                <li>• Laboratory values (lipid panels, kidney function)</li>
                <li>• Vital signs trends</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Operational Data</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Payer mix (insurance types, coverage levels)</li>
                <li>• Regional trends and demographics</li>
                <li>• Seasonal patterns in care utilization</li>
                <li>• Provider performance metrics</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Social Determinants</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Socioeconomic status indicators</li>
                <li>• Geographic access to care</li>
                <li>• Food security and nutrition data</li>
                <li>• Technology access for remote monitoring</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Outcome Metrics</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Emergency department visits</li>
                <li>• Hospitalization rates</li>
                <li>• Quality of life scores</li>
                <li>• Patient satisfaction ratings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}