import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Table, TrendingUp, Users, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";
import { revenueData, hba1cData, visitsData, populationMetricsData, financialMetricsData, providerWorkloadData, predictionsData, getFilteredData, additionalDataConsiderations, serviceUtilizationData, patientEngagementData } from "@/lib/mock-data";

interface MockDataDashboardProps {
  timeFilter: string;
}

export default function MockDataDashboard({ timeFilter }: MockDataDashboardProps) {
  const [activeDataset, setActiveDataset] = useState("revenue");
  const [localTimeFilter, setLocalTimeFilter] = useState(timeFilter);

  // Get filtered data based on time selection
  const filteredRevenueData = getFilteredData(revenueData, localTimeFilter);
  const filteredHba1cData = getFilteredData(hba1cData, localTimeFilter);
  const filteredVisitsData = getFilteredData(visitsData, localTimeFilter);

  const datasets = [
    { id: "revenue", label: "Revenue Data", icon: DollarSign, data: filteredRevenueData },
    { id: "hba1c", label: "HbA1c Data", icon: TrendingUp, data: filteredHba1cData },
    { id: "visits", label: "Visit Data", icon: Users, data: filteredVisitsData },
    { id: "population", label: "Population Metrics", icon: Users, data: getFilteredData(populationMetricsData, localTimeFilter) },
    { id: "financial", label: "Financial Metrics", icon: DollarSign, data: getFilteredData(financialMetricsData, localTimeFilter) },
    { id: "workload", label: "Provider Workload", icon: Users, data: getFilteredData(providerWorkloadData, localTimeFilter) },
    { id: "predictions", label: "Predictions", icon: TrendingUp, data: getFilteredData(predictionsData, localTimeFilter) },
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
              name === 'avgHbA1c' ? 'Historical HbA1c' : 'Predicted HbA1c'
            ]} />
            <Legend />
            {/* Historical Data - Solid Line */}
            <Line
              type="monotone"
              dataKey="avgHbA1c"
              stroke="#1976d2"
              strokeWidth={3}
              name="Historical HbA1c"
              dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
            {/* Predicted Data - Dashed Line */}
            <Line
              type="monotone"
              dataKey="predictedHbA1c"
              stroke="#64b5f6"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Predicted HbA1c"
              dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
            {/* Reference Line at Current Date */}
            <ReferenceLine x="May 2025" stroke="#dc2626" strokeWidth={2} label="Today" />
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
                    {row[header] !== null && row[header] !== undefined ? (
                      typeof row[header] === 'object' && row[header] !== null ? 
                        JSON.stringify(row[header]) :
                      typeof row[header] === 'number' && (header.includes('revenue') || header.includes('reimbursement') || header.includes('cost')) ? 
                        `$${row[header]?.toLocaleString()}` : 
                        row[header]
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
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
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mock Data Dashboard</h2>
            <p className="text-gray-600 mt-1">Technical team view of datasets and AI/ML model outputs</p>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm text-gray-600">Time Period:</label>
            <Select value={localTimeFilter} onValueChange={setLocalTimeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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

      {/* Raw Data Display Only - No Visualizations */}

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
            {additionalDataConsiderations.map((category, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                index === 0 ? 'bg-blue-50' : 
                index === 1 ? 'bg-green-50' : 
                index === 2 ? 'bg-purple-50' : 'bg-orange-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  index === 0 ? 'text-blue-900' : 
                  index === 1 ? 'text-green-900' : 
                  index === 2 ? 'text-purple-900' : 'text-orange-900'
                }`}>{category.category}</h4>
                <ul className={`text-sm space-y-1 ${
                  index === 0 ? 'text-blue-800' : 
                  index === 1 ? 'text-green-800' : 
                  index === 2 ? 'text-purple-800' : 'text-orange-800'
                }`}>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 italic">
              💡 Note: Consider adding: seasonal trends, demographic segments, telemedicine utilization patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}