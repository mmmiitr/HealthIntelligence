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
          {/* Profit Card */}
          <Card className="bg-white shadow-md border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={20} />
                </div>
              </div>
              
              <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current (May 2025)</p>
                  <p className="text-2xl font-bold text-green-600">$842.6K</p>
                  <p className="text-xs text-green-600">+15.3% vs Apr</p>
                </div>
                {showForecast && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Forecast (Jun 2025)</p>
                    <p className="text-2xl font-bold text-green-700">$865.2K</p>
                    <p className="text-xs text-green-600">+2.7% vs May</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card */}
          <Card className="bg-white shadow-md border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={20} />
                </div>
              </div>
              
              <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current (May 2025)</p>
                  <p className="text-2xl font-bold text-blue-600">$1.52M</p>
                  <p className="text-xs text-blue-600">+6.2% vs Apr</p>
                </div>
                {showForecast && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Forecast (Jun 2025)</p>
                    <p className="text-2xl font-bold text-blue-700">$1.58M</p>
                    <p className="text-xs text-blue-600">+3.9% vs May</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost Card */}
          <Card className="bg-white shadow-md border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="text-red-600" size={20} />
                </div>
              </div>
              
              <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current (May 2025)</p>
                  <p className="text-2xl font-bold text-red-600">$681.3K</p>
                  <p className="text-xs text-red-600">+3.1% vs Apr</p>
                </div>
                {showForecast && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Forecast (Jun 2025)</p>
                    <p className="text-2xl font-bold text-red-700">$715.0K</p>
                    <p className="text-xs text-red-600">+4.9% vs May</p>
                  </div>
                )}
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

          {/* Payer Mix Distribution */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Mix Distribution</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Medicare', value: 45, color: '#1976d2' },
                        { name: 'Medicaid', value: 25, color: '#4caf50' },
                        { name: 'Commercial', value: 22, color: '#ff9800' },
                        { name: 'Self-Pay', value: 8, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      <Cell fill="#1976d2" />
                      <Cell fill="#4caf50" />
                      <Cell fill="#ff9800" />
                      <Cell fill="#f44336" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Source Split */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Source Split</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'In-Person Visits', value: 620000, color: '#1976d2' },
                        { name: 'CCM', value: 180000, color: '#4caf50' },
                        { name: 'DSMT', value: 145000, color: '#64b5f6' },
                        { name: 'Telemedicine', value: 95000, color: '#ef5350' },
                        { name: 'Labs', value: 85000, color: '#ff9800' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${(value/1000).toFixed(0)}K`}
                    >
                      <Cell fill="#1976d2" />
                      <Cell fill="#4caf50" />
                      <Cell fill="#64b5f6" />
                      <Cell fill="#ef5350" />
                      <Cell fill="#ff9800" />
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Payer Revenue Trends */}
          <div className="mb-6 col-span-1 lg:col-span-2">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Payer Revenue Trends</h6>
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Payer Revenue Trends</CardTitle>
                <p className="text-sm text-gray-600">Revenue trends by insurance payer over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={showForecast ? [
                    ...payerRevenueTrends,
                    { month: 'Jun 2025', medicare: 5050, medicaid: 2080, commercial: 3450, selfPay: 1070,
                      medicareUpper: 5300, medicareLower: 4800 },
                    { month: 'Jul 2025', medicare: 5150, medicaid: 2120, commercial: 3520, selfPay: 1090,
                      medicareUpper: 5420, medicareLower: 4880 },
                    { month: 'Aug 2025', medicare: 5250, medicaid: 2160, commercial: 3590, selfPay: 1110,
                      medicareUpper: 5540, medicareLower: 4960 },
                    { month: 'Sep 2025', medicare: 5350, medicaid: 2200, commercial: 3660, selfPay: 1130,
                      medicareUpper: 5660, medicareLower: 5040 },
                    { month: 'Oct 2025', medicare: 5450, medicaid: 2240, commercial: 3730, selfPay: 1150,
                      medicareUpper: 5780, medicareLower: 5120 }
                  ] : payerRevenueTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip 
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{`Month: ${label}`}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {`${entry.name}: $${entry.value?.toLocaleString()}`}
                                </p>
                              ))}
                              {showForecast && data.medicareUpper && (
                                <>
                                  <p className="text-xs text-gray-500 mt-2">95% CI for Medicare:</p>
                                  <p className="text-xs text-gray-600">${data.medicareLower?.toLocaleString()} - ${data.medicareUpper?.toLocaleString()}</p>
                                </>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    
                    <Line type="monotone" dataKey="medicare" stroke="#1976d2" strokeWidth={2} name="Medicare" />
                    <Line type="monotone" dataKey="medicaid" stroke="#4caf50" strokeWidth={2} name="Medicaid" />
                    <Line type="monotone" dataKey="commercial" stroke="#ff9800" strokeWidth={2} name="Commercial" />
                    <Line type="monotone" dataKey="selfPay" stroke="#f44336" strokeWidth={2} name="Self-Pay" />
                    
                    {/* Confidence interval for Medicare (primary payer) */}
                    {showForecast && (
                      <>
                        <Line type="monotone" dataKey="medicareUpper" stroke="#64b5f6" strokeWidth={1} strokeDasharray="3 3" dot={false} name="95% CI" connectNulls={false} />
                        <Line type="monotone" dataKey="medicareLower" stroke="#64b5f6" strokeWidth={1} strokeDasharray="3 3" dot={false} name="" connectNulls={false} />
                      </>
                    )}
                    
                    {/* Reference line to separate historical vs predicted */}
                    {showForecast && <ReferenceLine x="May 2025" stroke="#666" strokeDasharray="2 2" label="Current" />}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Predictions with Confidence Intervals */}
          {showForecast && (
            <div className="mb-6 col-span-1 lg:col-span-2">
              <h6 className="text-lg font-medium text-gray-800 mb-3">Revenue Predictions</h6>
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
                      
                      {/* Main revenue line */}
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#1976d2" 
                        strokeWidth={3}
                        dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                        name="Revenue"
                      />
                      
                      {/* Confidence interval bounds */}
                      <Line 
                        type="monotone" 
                        dataKey="upperBound" 
                        stroke="#90caf9" 
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                        name="95% CI"
                        connectNulls={false}
                      />
                      
                      <Line 
                        type="monotone" 
                        dataKey="lowerBound" 
                        stroke="#90caf9" 
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                        name=""
                        connectNulls={false}
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
                <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-2`}>
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-xl font-bold text-red-700">$2,380</p>
                    <p className="text-xs text-red-600">+3.2%</p>
                  </div>
                  {showForecast && (
                    <div>
                      <p className="text-xs text-gray-500">Forecast</p>
                      <p className="text-xl font-bold text-red-800">$2,456</p>
                      <p className="text-xs text-red-600">+3.2%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost per Visit */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Cost per Visit</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-sm text-red-600 font-medium">Cost per visit</p>
                <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-2`}>
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-xl font-bold text-red-700">$120</p>
                    <p className="text-xs text-red-600">-2.1%</p>
                  </div>
                  {showForecast && (
                    <div>
                      <p className="text-xs text-gray-500">Forecast</p>
                      <p className="text-xl font-bold text-red-800">$118</p>
                      <p className="text-xs text-green-600">-1.7%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labor Cost */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Labor Cost</h6>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-red-600 font-medium">Labor Cost</p>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center cursor-help">
                      <Calculator className="text-red-600" size={20} />
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap z-10">
                      Physician: 40%, Nurse: 30%, Technician: 20%, Care Manager: 10%
                    </div>
                  </div>
                </div>
                <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-xl font-bold text-red-700">$800K</p>
                    <p className="text-xs text-red-600">+5.2%</p>
                  </div>
                  {showForecast && (
                    <div>
                      <p className="text-xs text-gray-500">Forecast</p>
                      <p className="text-xl font-bold text-red-800">$832K</p>
                      <p className="text-xs text-red-600">+4.0%</p>
                    </div>
                  )}
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
                <div className={`grid ${showForecast ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-2`}>
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-xl font-bold text-red-700">$390K</p>
                    <p className="text-xs text-red-600">(lab tests, supplies)</p>
                  </div>
                  {showForecast && (
                    <div>
                      <p className="text-xs text-gray-500">Forecast</p>
                      <p className="text-xl font-bold text-red-800">$402K</p>
                      <p className="text-xs text-red-600">+3.1%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labor Cost Distribution */}
          <div className="mb-6">
            <h6 className="text-lg font-medium text-gray-800 mb-3">Labor Cost Distribution</h6>
            <Card>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Physician', value: 320000, percentage: 40, color: '#dc2626' },
                        { name: 'Nurse', value: 240000, percentage: 30, color: '#f59e0b' },
                        { name: 'Technician', value: 160000, percentage: 20, color: '#ef4444' },
                        { name: 'Care Manager', value: 80000, percentage: 10, color: '#fca5a5' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      <Cell fill="#dc2626" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#fca5a5" />
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </div>
  );
}