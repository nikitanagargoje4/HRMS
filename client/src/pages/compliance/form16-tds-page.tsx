import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Search, Calendar, IndianRupee, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Form16TdsPage() {
  const [selectedYear, setSelectedYear] = useState("2023-24");
  const [searchQuery, setSearchQuery] = useState("");

  const tdsStats = [
    { title: "Total TDS Deducted", value: "₹45,67,000", status: "success", icon: <IndianRupee className="h-5 w-5" /> },
    { title: "Form 16 Generated", value: "142", status: "success", icon: <FileText className="h-5 w-5" /> },
    { title: "Pending Generation", value: "14", status: "warning", icon: <Clock className="h-5 w-5" /> },
    { title: "Filed with Dept", value: "128", status: "success", icon: <CheckCircle className="h-5 w-5" /> },
  ];

  const employeeTds = [
    { employee: "John Doe", pan: "ABCDE1234F", totalIncome: 1200000, tdsDeducted: 120000, form16: "Generated" },
    { employee: "Jane Smith", pan: "FGHIJ5678K", totalIncome: 980000, tdsDeducted: 85000, form16: "Generated" },
    { employee: "Mike Johnson", pan: "LMNOP9012Q", totalIncome: 1500000, tdsDeducted: 180000, form16: "Pending" },
    { employee: "Sarah Wilson", pan: "RSTUV3456W", totalIncome: 850000, tdsDeducted: 65000, form16: "Generated" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generated": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
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
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-page-title">Form 16 & TDS Management</h1>
            <p className="text-slate-500 mt-1">Manage TDS deductions and Form 16 generation</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32" data-testid="select-year">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2" data-testid="button-generate-all">
              <FileText className="h-4 w-4" />
              Generate All Form 16
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tdsStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card data-testid={`card-stat-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Employee TDS Details</CardTitle>
                <CardDescription>TDS deductions and Form 16 status for FY {selectedYear}</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">PAN</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Total Income</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">TDS Deducted</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Form 16</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeTds.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50" data-testid={`row-tds-${index}`}>
                      <td className="py-3 px-4 font-medium">{row.employee}</td>
                      <td className="py-3 px-4 font-mono text-sm">{row.pan}</td>
                      <td className="py-3 px-4">₹{row.totalIncome.toLocaleString()}</td>
                      <td className="py-3 px-4">₹{row.tdsDeducted.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(row.form16)}>{row.form16}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {row.form16 === "Generated" ? (
                            <Button size="sm" variant="outline" className="gap-1" data-testid={`button-download-${index}`}>
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                          ) : (
                            <Button size="sm" className="gap-1" data-testid={`button-generate-${index}`}>
                              <FileText className="h-3 w-3" />
                              Generate
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
