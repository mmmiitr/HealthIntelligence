import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Table, TrendingUp, Users, DollarSign, Code, Shield, Key, Server, BookOpen, GitBranch, Copy, ExternalLink } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";
import { revenueData, hba1cData, visitsData, populationMetricsData, financialMetricsData, providerWorkloadData, predictionsData, getFilteredData, additionalDataConsiderations, serviceUtilizationData, patientEngagementData } from "@/lib/mock-data";
import { API_ENDPOINTS, DATABASE_SCHEMAS, AUTH_DOCUMENTATION, INTEGRATION_GUIDE } from "@/lib/technical-docs";
import { getCurrentTimestamp } from "@/lib/utils";

interface MockDataDashboardProps {
  timeFilter: string;
  viewMode: string;
}

export default function MockDataDashboard({ timeFilter, viewMode }: MockDataDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [selectedSchema, setSelectedSchema] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    window.alert("Copied to clipboard!");
  };

  const sections = [
    { id: 'overview', label: 'Project Overview', icon: BookOpen },
    { id: 'api-docs', label: 'API Documentation', icon: Server },
    { id: 'database', label: 'Database Schema', icon: Database },
    { id: 'auth', label: 'Authentication', icon: Shield },
    { id: 'integration', label: 'Integration Guide', icon: GitBranch },
    { id: 'data-models', label: 'Data Models', icon: Code }
  ];

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
            <h2 className="text-2xl font-bold text-gray-900">Technical Documentation</h2>
            <p className="text-gray-600 mt-1">Comprehensive API documentation and system architecture for development teams</p>
            <div className="flex items-center mt-2 space-x-4">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <Code className="h-3 w-3 mr-1" />
                Living Documentation
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 flex items-center">
                <GitBranch className="h-3 w-3 mr-1" />
                Version 2.1.0
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-sm text-gray-500">{getCurrentTimestamp()}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card className="bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              Healthcare Dashboard - Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Project Description</h4>
                <p className="text-gray-700">
                  A comprehensive React-based healthcare analytics platform designed for chronic care management of diabetic patients. 
                  The system provides role-based dashboards for administrators, clinicians, patients, and technical teams with 
                  real-time data visualization and AI-powered predictive analytics.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">Tech Stack</h5>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• React 18 + TypeScript</li>
                    <li>• Express.js Backend</li>
                    <li>• PostgreSQL Database</li>
                    <li>• Tailwind CSS + Shadcn/ui</li>
                    <li>• Recharts for visualizations</li>
                    <li>• JWT Authentication</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-900 mb-2">Key Features</h5>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Multi-role dashboard system</li>
                    <li>• Real-time diabetes monitoring</li>
                    <li>• AI/ML predictive analytics</li>
                    <li>• HIPAA-compliant data handling</li>
                    <li>• Interactive appointment scheduling</li>
                    <li>• Revenue and financial tracking</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h5 className="font-semibold text-amber-900 mb-2">🚀 Current Version: 2.1.0</h5>
                <p className="text-amber-800 text-sm">
                  Latest updates include dynamic view mode switching, enhanced patient care plan interactivity, 
                  and comprehensive payer revenue trend analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'api-docs' && (
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Server className="mr-2 h-5 w-5 text-green-600" />
                API Endpoints Documentation
              </CardTitle>
              <p className="text-sm text-gray-600">RESTful API endpoints for healthcare data management</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {API_ENDPOINTS.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{endpoint.endpoint}</code>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(endpoint.endpoint)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{endpoint.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-gray-600">{endpoint.authentication}</span>
                      </div>
                      
                      {endpoint.parameters && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium text-gray-700">Parameters</summary>
                          <div className="mt-2 ml-4 space-y-1">
                            {endpoint.parameters.map((param, i) => (
                              <div key={i} className="text-xs text-gray-600">
                                <code className="bg-gray-100 px-1 rounded">{param.name}</code> 
                                ({param.type}) {param.required && <span className="text-red-600">*</span>} - {param.description}
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                      
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-medium text-gray-700">Response Example</summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{JSON.stringify(endpoint.response.example, null, 2)}
                        </pre>
                      </details>
                      
                      {endpoint.notes && (
                        <p className="text-xs text-blue-600 mt-2">💡 {endpoint.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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