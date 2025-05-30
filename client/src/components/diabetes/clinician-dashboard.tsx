import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ClinicianDashboardProps {
  timeFilter: string;
  viewMode: string;
  showForecast: boolean;
}

export default function ClinicianDashboard({ timeFilter, viewMode, showForecast }: ClinicianDashboardProps) {
  // Dynamic labels based on view mode
  const getViewLabels = () => {
    switch(viewMode) {
      case "monthly":
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
      case "quarterly":
        return { current: "Q2 PROGRESS", forecast: "Q3 FORECAST" };
      case "yearly":
        return { current: "2024 PROGRESS", forecast: "2025 FORECAST" };
      default:
        return { current: "MAY PROGRESS", forecast: "JUN FORECAST" };
    }
  };

  const labels = getViewLabels();
  const { data: clinicalMetrics } = useQuery({
    queryKey: ["/api/clinician/metrics", timeFilter],
  });

  const { data: a1cTrends } = useQuery({
    queryKey: ["/api/clinician/a1c-trends", timeFilter],
  });

  const { data: riskDistribution } = useQuery({
    queryKey: ["/api/clinician/risk-distribution", timeFilter],
  });

  const { data: highRiskPatients } = useQuery({
    queryKey: ["/api/clinician/high-risk-patients"],
  });

  // Get current clinical metrics
  const currentMetrics = Array.isArray(clinicalMetrics) && clinicalMetrics.length > 0 ? clinicalMetrics[clinicalMetrics.length - 1] : null;
  const averageA1C = currentMetrics?.averageA1C || "0.0";
  const adherenceRate = currentMetrics?.adherenceRate || "0";
  const complicationRate = currentMetrics?.complicationRate || "0";

  // Prepare A1C trend chart data
  const a1cChartData = Array.isArray(a1cTrends) ? a1cTrends.map((item: any) => ({
    month: item.month,
    a1c: isNaN(parseFloat(item.averageA1C)) ? 0 : parseFloat(item.averageA1C),
    patientCount: item.patientCount || 0,
  })) : [];

  // Prepare risk distribution chart data
  const riskChartData = Array.isArray(riskDistribution) ? riskDistribution.map((item: any) => ({
    name: `${item.riskLevel} Risk`,
    value: isNaN(parseFloat(item.percentage)) ? 0 : parseFloat(item.percentage),
    count: item.count || 0,
  })) : [];

  const COLORS = ['#00A86B', '#F59E0B', '#EF4444'];



  return (
    <div>
      {/* 1. % of patients with controlled HbA1c (<7%) (Prediction) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">% of patients with controlled HbA1c (&lt;7%) <span className="text-xs text-gray-500">(Prediction)</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "CCM", value: "68%", futureValue: showForecast ? "70%" : undefined, percentChange: showForecast ? "+2%" : undefined },
            { label: "Non CCM", value: "62%", futureValue: showForecast ? "64%" : undefined, percentChange: showForecast ? "+2%" : undefined }
          ].map((metric) => (
            <Card key={metric.label} className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className="text-2xl font-bold text-purple-700">{metric.value}</p>
                  </div>
                  
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">{metric.percentChange} vs current</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. % of patients with recent HbA1c test (last 6 months) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">% of patients with recent HbA1c test (last 6 months)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "CCM", value: "91%", futureValue: showForecast ? "92%" : undefined, percentChange: showForecast ? "+1%" : undefined },
            { label: "Non CCM", value: "85%", futureValue: showForecast ? "86%" : undefined, percentChange: showForecast ? "+1%" : undefined }
          ].map((metric) => (
            <Card key={metric.label} className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {labels.current}
                    </p>
                    <p className="text-2xl font-bold text-purple-700">{metric.value}</p>
                  </div>
                  
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                        {labels.forecast}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">{metric.percentChange} vs current</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. % of patients with hypertension control (<140/90) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">% of patients with hypertension control (&lt;140/90)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "CCM", value: "77%", futureValue: showForecast ? "80%" : undefined, percentChange: showForecast ? "+3%" : undefined },
            { label: "Non CCM", value: "70%", futureValue: showForecast ? "72%" : undefined, percentChange: showForecast ? "+2%" : undefined }
          ].map((metric) => (
            <Card key={metric.label} className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                    <p className="text-2xl font-bold text-purple-700">{metric.value}</p>
                  </div>
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">{metric.percentChange} vs current</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. % of patients with >2 co-morbidities */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">% of patients with &gt;2 co-morbidities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "CCM", value: "34%", futureValue: showForecast ? "36%" : undefined, percentChange: showForecast ? "+2%" : undefined },
            { label: "Non CCM", value: "28%", futureValue: showForecast ? "29%" : undefined, percentChange: showForecast ? "+1%" : undefined }
          ].map((metric) => (
            <Card key={metric.label} className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                    <p className="text-2xl font-bold text-purple-700">{metric.value}</p>
                  </div>
                  {showForecast && metric.futureValue && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                      <p className="text-lg font-bold text-gray-900">{metric.futureValue}</p>
                      <p className="text-xs text-gray-600 mt-1">{metric.percentChange} vs current</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. % enrolled in DSME */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">% enrolled in DSME (Diabetes Self-Management Education)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <span className="font-medium text-gray-700 text-sm">All Patients</span>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                  <p className="text-2xl font-bold text-purple-700">41%</p>
                </div>
                {showForecast && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.forecast}</p>
                    <p className="text-lg font-bold text-gray-900">43%</p>
                    <p className="text-xs text-gray-600 mt-1">+2% vs current</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 6. 30-Day ED Visit or Hospitalization (Prediction) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">30-Day ED Visit or Hospitalization <span className="text-xs text-gray-500">(Prediction)</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm rounded-lg border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <span className="font-medium text-gray-700 text-sm">All Patients</span>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{labels.current}</p>
                  <p className="text-2xl font-bold text-purple-700">8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 7. Top 5 patients with highest ED visits past quarter */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 patients with highest ED visits (past quarter)</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900"># ED Visits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4 text-right">4</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4 text-right">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4 text-right">3</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4 text-right">2</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4 text-right">2</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* 8. Top 5 patients with most inpatient LOS (length of stay) past quarter */}
      <div className="mb-8">
        <h3 className="dashboard-section-title">Top 5 patients with most inpatient LOS (length of stay) (past quarter)</h3>
        <Card className="bg-white border border-gray-200 shadow-none rounded-xl">
          <CardContent className="p-8">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">LOS (days)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Jane Smith</td><td className="py-3 px-4 text-right">12</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Mark Jones</td><td className="py-3 px-4 text-right">10</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Emily Davis</td><td className="py-3 px-4 text-right">9</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Robert Johnson</td><td className="py-3 px-4 text-right">8</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="py-3 px-4">Maria Garcia</td><td className="py-3 px-4 text-right">7</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}