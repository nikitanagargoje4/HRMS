import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, FileBarChart, Scale, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ComplianceReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("January 2024");

  const reports = [
    { name: "PF Monthly Return", type: "ECR", dueDate: "15th of next month", status: "Submitted", lastGenerated: "Jan 10, 2024" },
    { name: "ESI Monthly Return", type: "ESI Challan", dueDate: "15th of next month", status: "Pending", lastGenerated: "Dec 12, 2023" },
    { name: "Professional Tax", type: "PT Challan", dueDate: "End of month", status: "Submitted", lastGenerated: "Jan 5, 2024" },
    { name: "TDS Quarterly Return", type: "24Q", dueDate: "15th of quarter end", status: "Upcoming", lastGenerated: "Oct 15, 2023" },
    { name: "Form 16", type: "Annual", dueDate: "June 15", status: "Not Due", lastGenerated: "Jun 10, 2023" },
    { name: "Labour Welfare Fund", type: "LWF", dueDate: "Bi-annual", status: "Submitted", lastGenerated: "Dec 31, 2023" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Upcoming": return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Upcoming": return "bg-blue-100 text-blue-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-page-title">Statutory Compliance Reports</h1>
            <p className="text-slate-500 mt-1">Generate and manage statutory compliance reports</p>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40" data-testid="select-month">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January 2024">January 2024</SelectItem>
              <SelectItem value="December 2023">December 2023</SelectItem>
              <SelectItem value="November 2023">November 2023</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">4</p>
                  <p className="text-sm text-green-600">Reports Submitted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700">1</p>
                  <p className="text-sm text-yellow-600">Pending Submission</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">1</p>
                  <p className="text-sm text-blue-600">Upcoming Due</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-teal-600" />
              Compliance Reports
            </CardTitle>
            <CardDescription>All statutory reports and their submission status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  data-testid={`row-report-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white border">
                      <FileBarChart className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{report.name}</p>
                      <p className="text-sm text-slate-500">Type: {report.type} • Due: {report.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(report.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(report.status)}
                          {report.status}
                        </span>
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">Last: {report.lastGenerated}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1" data-testid={`button-generate-${index}`}>
                        <FileText className="h-3 w-3" />
                        Generate
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1" data-testid={`button-download-${index}`}>
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
