import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Shield, Brain, AlertTriangle, Calculator, Building, Users, Heart, Stethoscope, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart } from "recharts";
import { revenueData, revenueByInsuranceData, payerRevenueTrends, revenueSourcesData, predictionsData } from "@/lib/mock-data";
import { getCurrentTimestamp } from "@/lib/utils";

interface FinanceDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function FinanceDashboard({ timeFilter, viewMode, showForecast }: FinanceDashboardProps) {
  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch(viewMode) {
      case "monthly":
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
      case "quarterly":
        return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
      case "yearly":
        return { current: "2025 PROGRESS", forecast: "2026 FORECAST" };
      default:
        return { current: "CURRENT", forecast: "FORECAST" };
    }
  };

  const labels = getViewLabels();

  return (
    <div className="p-6">
      {/* Financial Overview - Keep as is (perfect) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profit Card - Green */}
          <Card className="bg-white shadow-lg border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit</p>
                  <p className="text-3xl font-bold text-green-600">$842,591</p>
                  <p className="text-sm text-green-600 mt-1">+15.3%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card - Blue */}
          <Card className="bg-white shadow-lg border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">$1,523,891</p>
                  <p className="text-sm text-blue-600 mt-1">+6.2%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Card - Red */}
          <Card className="bg-white shadow-lg border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost</p>
                  <p className="text-3xl font-bold text-red-600">$681,300</p>
                  <p className="text-sm text-red-600 mt-1">+3.1%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="text-red-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Analysis Section (Row 2) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
          Revenue Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Average Revenue per Patient */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Average Revenue Per Patient</h6>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-600 font-medium">Average Revenue per patient in panel</p>
                <p className="text-2xl font-bold text-blue-700">$2,400</p>
                <p className="text-xs text-blue-600">+8.5%</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue for Top 5 CPT Codes */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue for Top 5 CPT Codes</h6>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b font-semibold">
                    <span>CPT Code</span>
                    <span>Revenue</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99214</span>
                    <span className="text-blue-600 font-semibold">$256,300</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99232</span>
                    <span className="text-blue-600 font-semibold">$189,400</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">99396</span>
                    <span className="text-blue-600 font-semibold">$145,200</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">99490</span>
                    <span className="text-blue-600 font-semibold">$125,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Sources Over Time */}
          <div className="mb-6 col-span-1 lg:col-span-2">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Sources Over Time</h6>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Sources Over Time</CardTitle>
                <p className="text-sm text-gray-600">Data Range: Jan 2024 - May 2025</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    ...revenueSourcesData,
                    ...(showForecast ? [
                      { month: 'Jun 2025', inPersonVisits: 95000, ccm: 25000, dsmt: 18000, telemedicine: 15000, labs: 12000,
                        inPersonVisitsUpper: 105000, inPersonVisitsLower: 85000, ccmUpper: 28000, ccmLower: 22000 },
                      { month: 'Jul 2025', inPersonVisits: 98000, ccm: 26000, dsmt: 19000, telemedicine: 16000, labs: 13000,
                        inPersonVisitsUpper: 108000, inPersonVisitsLower: 88000, ccmUpper: 29000, ccmLower: 23000 },
                      { month: 'Aug 2025', inPersonVisits: 101000, ccm: 27000, dsmt: 20000, telemedicine: 17000, labs: 14000,
                        inPersonVisitsUpper: 111000, inPersonVisitsLower: 91000, ccmUpper: 30000, ccmLower: 24000 },
                      { month: 'Sep 2025', inPersonVisits: 104000, ccm: 28000, dsmt: 21000, telemedicine: 18000, labs: 15000,
                        inPersonVisitsUpper: 114000, inPersonVisitsLower: 94000, ccmUpper: 31000, ccmLower: 25000 },
                      { month: 'Oct 2025', inPersonVisits: 107000, ccm: 29000, dsmt: 22000, telemedicine: 19000, labs: 16000,
                        inPersonVisitsUpper: 117000, inPersonVisitsLower: 97000, ccmUpper: 32000, ccmLower: 26000 }
                    ] : [])
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`$${value}`, name]}
                      labelFormatter={(label) => `Month: ${label}`}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value}`}
                                </p>
                              ))}
                              {showForecast && data.inPersonVisitsUpper && (
                                <>
                                  <p className="text-xs text-gray-500 mt-2">95% Confidence Intervals:</p>
                                  <p className="text-xs text-gray-600">In-Person: ${data.inPersonVisitsLower} - ${data.inPersonVisitsUpper}</p>
                                  <p className="text-xs text-gray-600">CCM: ${data.ccmLower} - ${data.ccmUpper}</p>
                                </>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    
                    {/* Confidence interval lines for predictions */}
                    {showForecast && (
                      <>
                        <Line type="monotone" dataKey="inPersonVisitsUpper" stroke="#bbdefb" strokeWidth={1} strokeDasharray="4 4" dot={false} name="In-Person Upper CI" />
                        <Line type="monotone" dataKey="inPersonVisitsLower" stroke="#bbdefb" strokeWidth={1} strokeDasharray="4 4" dot={false} name="In-Person Lower CI" />
                        <Line type="monotone" dataKey="ccmUpper" stroke="#c8e6c9" strokeWidth={1} strokeDasharray="4 4" dot={false} name="CCM Upper CI" />
                        <Line type="monotone" dataKey="ccmLower" stroke="#c8e6c9" strokeWidth={1} strokeDasharray="4 4" dot={false} name="CCM Lower CI" />
                      </>
                    )}
                    
                    <Line type="monotone" dataKey="inPersonVisits" stroke="#1976d2" name="In-Person Visits" strokeWidth={2} />
                    <Line type="monotone" dataKey="ccm" stroke="#4caf50" name="CCM" strokeWidth={2} />
                    <Line type="monotone" dataKey="dsmt" stroke="#64b5f6" name="DSMT" strokeWidth={2} />
                    <Line type="monotone" dataKey="telemedicine" stroke="#ef5350" name="Telemedicine" strokeWidth={2} />
                    <Line type="monotone" dataKey="labs" stroke="#ff9800" name="Labs" strokeWidth={2} />
                    
                    {/* Reference line to separate historical vs predicted */}
                    {showForecast && <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cost Analysis Section (Row 3) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-red-600" />
          Cost Analysis ({viewMode === "monthly" ? "May 2025" : viewMode === "quarterly" ? "Q2 2025" : "2025"})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Average Cost per Patient */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Average Cost Per Patient</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Average cost per patient in panel</p>
                <p className="text-2xl font-bold text-red-700">$2,380</p>
                <p className="text-xs text-red-600">+3.2%</p>
              </CardContent>
            </Card>
          </div>

          {/* Cost per Visit */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Cost per Visit</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Cost per visit</p>
                <p className="text-2xl font-bold text-red-700">$120</p>
                <p className="text-xs text-red-600">-2.1%</p>
              </CardContent>
            </Card>
          </div>

          {/* Labor Cost */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Labor Cost</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Labor Cost</p>
                    <p className="text-2xl font-bold text-red-700">$800K</p>
                    <p className="text-xs text-red-600">+5.2%</p>
                  </div>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center cursor-help">
                      <Calculator className="text-red-600" size={20} />
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap z-10">
                      Physician: 40%, Nurse: 30%, Technician: 20%, Care Manager: 10%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Costs */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Other Costs</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Other Costs</p>
                <p className="text-2xl font-bold text-red-700">$390K</p>
                <p className="text-xs text-red-600">(e.g., lab tests, supplies)</p>
              </CardContent>
            </Card>
          </div>

          {/* Cost Trends Over Time */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Cost Trends Over Time</h6>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Analysis Trends (Mock Data)</CardTitle>
                <p className="text-sm text-gray-600">Data Range: Jan 2024 - May 2025</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    // Historical data
                    { month: 'Jan 2024', laborCost: 180000, otherCosts: 85000, totalCost: 265000, isHistorical: true },
                    { month: 'Feb 2024', laborCost: 185000, otherCosts: 87000, totalCost: 272000, isHistorical: true },
                    { month: 'Mar 2024', laborCost: 190000, otherCosts: 89000, totalCost: 279000, isHistorical: true },
                    { month: 'Apr 2024', laborCost: 195000, otherCosts: 91000, totalCost: 286000, isHistorical: true },
                    { month: 'May 2024', laborCost: 200000, otherCosts: 93000, totalCost: 293000, isHistorical: true },
                    { month: 'Jun 2024', laborCost: 205000, otherCosts: 95000, totalCost: 300000, isHistorical: true },
                    { month: 'Jul 2024', laborCost: 215000, otherCosts: 99000, totalCost: 314000, isHistorical: true },
                    { month: 'Aug 2024', laborCost: 220000, otherCosts: 101000, totalCost: 321000, isHistorical: true },
                    { month: 'Sep 2024', laborCost: 225000, otherCosts: 103000, totalCost: 328000, isHistorical: true },
                    { month: 'Oct 2024', laborCost: 230000, otherCosts: 105000, totalCost: 335000, isHistorical: true },
                    { month: 'Nov 2024', laborCost: 235000, otherCosts: 107000, totalCost: 342000, isHistorical: true },
                    { month: 'Dec 2024', laborCost: 240000, otherCosts: 109000, totalCost: 349000, isHistorical: true },
                    { month: 'Jan 2025', laborCost: 245000, otherCosts: 111000, totalCost: 356000, isHistorical: true },
                    { month: 'Feb 2025', laborCost: 250000, otherCosts: 113000, totalCost: 363000, isHistorical: true },
                    { month: 'Mar 2025', laborCost: 255000, otherCosts: 115000, totalCost: 370000, isHistorical: true },
                    { month: 'Apr 2025', laborCost: 260000, otherCosts: 117000, totalCost: 377000, isHistorical: true },
                    { month: 'May 2025', laborCost: 265000, otherCosts: 119000, totalCost: 384000, isHistorical: true },
                    // Future predictions with confidence intervals (shown only when forecast toggle is on)
                    ...(showForecast ? [
                      { month: 'Jun 2025', laborCost: 270000, otherCosts: 121000, totalCost: 391000, 
                        laborCostUpper: 280000, laborCostLower: 260000, 
                        totalCostUpper: 405000, totalCostLower: 377000, isHistorical: false },
                      { month: 'Jul 2025', laborCost: 275000, otherCosts: 123000, totalCost: 398000, 
                        laborCostUpper: 287000, laborCostLower: 263000, 
                        totalCostUpper: 415000, totalCostLower: 381000, isHistorical: false },
                      { month: 'Aug 2025', laborCost: 280000, otherCosts: 125000, totalCost: 405000, 
                        laborCostUpper: 294000, laborCostLower: 266000, 
                        totalCostUpper: 425000, totalCostLower: 385000, isHistorical: false },
                      { month: 'Sep 2025', laborCost: 285000, otherCosts: 127000, totalCost: 412000, 
                        laborCostUpper: 301000, laborCostLower: 269000, 
                        totalCostUpper: 435000, totalCostLower: 389000, isHistorical: false },
                      { month: 'Oct 2025', laborCost: 290000, otherCosts: 129000, totalCost: 419000, 
                        laborCostUpper: 308000, laborCostLower: 272000, 
                        totalCostUpper: 445000, totalCostLower: 393000, isHistorical: false },
                      { month: 'Nov 2025', laborCost: 295000, otherCosts: 131000, totalCost: 426000, 
                        laborCostUpper: 315000, laborCostLower: 275000, 
                        totalCostUpper: 455000, totalCostLower: 397000, isHistorical: false },
                      { month: 'Dec 2025', laborCost: 300000, otherCosts: 133000, totalCost: 433000, 
                        laborCostUpper: 322000, laborCostLower: 278000, 
                        totalCostUpper: 465000, totalCostLower: 401000, isHistorical: false }
                    ] : [])
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`$${value}`, name]}
                      labelFormatter={(label) => `Month: ${label}`}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value}`}
                                </p>
                              ))}
                              {showForecast && data.totalCostUpper && data.totalCostLower && (
                                <>
                                  <p className="text-xs text-gray-500 mt-2">95% Confidence Interval:</p>
                                  <p className="text-xs text-gray-600">Total Cost: ${data.totalCostLower} - ${data.totalCostUpper}</p>
                                  <p className="text-xs text-gray-600">Labor Cost: ${data.laborCostLower} - ${data.laborCostUpper}</p>
                                </>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                {data.isHistorical ? 'Historical Data' : 'Predicted Data'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    
                    {/* Confidence interval lines for predictions */}
                    {showForecast && (
                      <>
                        <Line type="monotone" dataKey="totalCostUpper" stroke="#fca5a5" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Cost Upper CI" />
                        <Line type="monotone" dataKey="totalCostLower" stroke="#fca5a5" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Cost Lower CI" />
                        <Line type="monotone" dataKey="laborCostUpper" stroke="#fed7aa" strokeWidth={1} strokeDasharray="3 3" dot={false} name="Labor Cost Upper CI" />
                        <Line type="monotone" dataKey="laborCostLower" stroke="#fed7aa" strokeWidth={1} strokeDasharray="3 3" dot={false} name="Labor Cost Lower CI" />
                      </>
                    )}
                    
                    <Line type="monotone" dataKey="totalCost" stroke="#dc2626" name="Total Cost" strokeWidth={3} />
                    <Line type="monotone" dataKey="laborCost" stroke="#f59e0b" name="Labor Cost" strokeWidth={2} />
                    <Line type="monotone" dataKey="otherCosts" stroke="#ef4444" name="Other Costs" strokeWidth={2} />
                    
                    {/* Reference line to separate historical vs predicted */}
                    {showForecast && <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payer Revenue Trends */}
      <div className="mb-8">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Payer Revenue Trends</CardTitle>
            <p className="text-sm text-gray-600">Revenue trends by insurance payer over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={payerRevenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                <Legend />
                <Line type="monotone" dataKey="medicare" stroke="#1976d2" strokeWidth={2} name="Medicare" />
                <Line type="monotone" dataKey="medicaid" stroke="#4caf50" strokeWidth={2} name="Medicaid" />
                <Line type="monotone" dataKey="commercial" stroke="#ff9800" strokeWidth={2} name="Commercial" />
                <Line type="monotone" dataKey="selfPay" stroke="#f44336" strokeWidth={2} name="Self-Pay" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Predictions with Confidence Intervals */}
      {showForecast && (
        <div className="mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue Predictions with 95% Confidence Interval</CardTitle>
              <p className="text-sm text-gray-600">Historical data (Jan-May) and future predictions (Jun-Dec 2025)</p>
            </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={predictionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (value) return [`$${value.toLocaleString()}`, name];
                    return [null, name];
                  }}
                  labelFormatter={(label) => `Month: ${label}`}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow">
                          <p className="font-medium">{`Month: ${label}`}</p>
                          <p style={{ color: '#1976d2' }}>
                            {`Revenue: $${data.revenue?.toLocaleString() || 'N/A'}`}
                          </p>
                          {data.upperBound && data.lowerBound && (
                            <>
                              <p style={{ color: '#64b5f6' }}>
                                {`Upper CI: $${data.upperBound.toLocaleString()}`}
                              </p>
                              <p style={{ color: '#64b5f6' }}>
                                {`Lower CI: $${data.lowerBound.toLocaleString()}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">95% Confidence Interval</p>
                            </>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {data.isHistorical ? 'Historical Data' : 'Predicted Data'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                
                {/* Upper confidence bound line */}
                <Line 
                  type="monotone" 
                  dataKey="upperBound" 
                  stroke="#90caf9" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Upper 95% CI"
                />
                
                {/* Lower confidence bound line */}
                <Line 
                  type="monotone" 
                  dataKey="lowerBound" 
                  stroke="#90caf9" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Lower 95% CI"
                />
                
                {/* Main revenue line */}
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1976d2" 
                  strokeWidth={3}
                  dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
                
                {/* Reference line to separate historical vs predicted */}
                <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Dashed lines represent 95% confidence interval boundaries for future predictions. Historical data shows actual revenue.
            </p>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
}