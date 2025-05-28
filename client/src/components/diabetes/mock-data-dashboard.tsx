import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Code, Shield, Server, BookOpen, GitBranch, Copy } from "lucide-react";
import { API_ENDPOINTS, DATABASE_SCHEMAS, AUTH_DOCUMENTATION, INTEGRATION_GUIDE } from "@/lib/technical-docs";
import { getCurrentTimestamp } from "@/lib/utils";

interface MockDataDashboardProps {
  timeFilter: string;
  viewMode: string;
}

export default function MockDataDashboard({ timeFilter, viewMode }: MockDataDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');

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
            <p className="text-sm text-gray-500">Last Updated: {getCurrentTimestamp()}</p>
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

      {activeSection === 'database' && (
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Database className="mr-2 h-5 w-5 text-purple-600" />
              Database Schema Documentation
            </CardTitle>
            <p className="text-sm text-gray-600">PostgreSQL database tables and relationships</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {DATABASE_SCHEMAS.map((schema, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{schema.table}</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(schema.table)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Table Name
                    </Button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{schema.description}</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-2 text-left">Field</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Nullable</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schema.fields.map((field, i) => (
                          <tr key={i}>
                            <td className="border border-gray-300 px-3 py-2 font-mono text-blue-600">{field.name}</td>
                            <td className="border border-gray-300 px-3 py-2 font-mono">{field.type}</td>
                            <td className="border border-gray-300 px-3 py-2">{field.nullable ? 'Yes' : 'No'}</td>
                            <td className="border border-gray-300 px-3 py-2">{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {schema.relationships && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">Relationships</h5>
                      <div className="space-y-1">
                        {schema.relationships.map((rel, i) => (
                          <div key={i} className="text-sm text-gray-600">
                            <span className="font-mono bg-gray-100 px-1 rounded">{rel.type}</span> with{' '}
                            <span className="font-mono bg-gray-100 px-1 rounded">{rel.table}</span> - {rel.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'auth' && (
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-amber-600" />
              Authentication & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h4 className="font-semibold text-amber-900 mb-2">🔐 Authentication Method</h4>
                <p className="text-amber-800">{AUTH_DOCUMENTATION.method}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">JWT Token Structure</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{JSON.stringify(AUTH_DOCUMENTATION.tokenStructure, null, 2)}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Role-Based Access Control</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AUTH_DOCUMENTATION.roles.map((role, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-900">{role.name}</h5>
                      <p className="text-blue-800 text-sm mt-1">{role.description}</p>
                      <div className="mt-2">
                        <p className="text-xs text-blue-700 font-medium">Permissions:</p>
                        <ul className="text-xs text-blue-700 mt-1">
                          {role.permissions.map((perm, i) => (
                            <li key={i}>• {perm}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-900 mb-2">🛡️ HIPAA Compliance</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  {AUTH_DOCUMENTATION.hipaaCompliance.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'integration' && (
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <GitBranch className="mr-2 h-5 w-5 text-green-600" />
              Integration Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Getting Started</h4>
                <div className="bg-gray-100 p-3 rounded">
                  <pre className="text-sm">{INTEGRATION_GUIDE.gettingStarted}</pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Environment Setup</h4>
                <div className="space-y-2">
                  {INTEGRATION_GUIDE.environmentSetup.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">{index + 1}</span>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Example Integration</h4>
                <div className="bg-gray-100 p-3 rounded">
                  <pre className="text-xs overflow-x-auto">{INTEGRATION_GUIDE.exampleCode}</pre>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">💡 Best Practices</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  {INTEGRATION_GUIDE.bestPractices.map((practice, index) => (
                    <li key={index}>• {practice}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === 'data-models' && (
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Code className="mr-2 h-5 w-5 text-indigo-600" />
              Data Models & TypeScript Interfaces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">📊 Core Data Models</h4>
                <p className="text-indigo-800 text-sm">
                  TypeScript interfaces and Zod schemas for type-safe data handling across the application.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Patient Profile Interface</h5>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">{`interface PatientProfile {
  id: number;
  patientName: string;
  currentHbA1c: number;
  targetHbA1c: number;
  lastVisitDate: string;
  nextAppointment: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  medicationAdherence: number;
  lifestyle: string;
}`}</pre>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Clinical Metrics Interface</h5>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">{`interface ClinicalMetrics {
  id: number;
  month: string;
  year: number;
  avgHbA1c: number;
  totalPatients: number;
  controlledPatients: number;
  averageGlucose: number;
  medicationAdherence: number;
  timeFilter?: string;
}`}</pre>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Admin Metrics Interface</h5>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">{`interface AdminMetrics {
  id: number;
  month: string;
  year: number;
  totalRevenue: number;
  totalPatients: number;
  operatingCosts: number;
  netProfit: number;
  satisfactionScore: number;
  timeFilter?: string;
}`}</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}