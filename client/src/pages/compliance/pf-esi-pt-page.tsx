import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FileText, Download, Upload, IndianRupee, Users, Building2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PfEsiPtPage() {
  const complianceStats = [
    { title: "Total PF Contribution", value: "₹12,45,000", change: "+8.2%", icon: <IndianRupee className="h-5 w-5" /> },
    { title: "ESI Contribution", value: "₹3,45,000", change: "+5.4%", icon: <Building2 className="h-5 w-5" /> },
    { title: "PT Collected", value: "₹89,500", change: "+2.1%", icon: <Calculator className="h-5 w-5" /> },
    { title: "Eligible Employees", value: "156", change: "+12", icon: <Users className="h-5 w-5" /> },
  ];

  const pfData = [
    { employee: "John Doe", basicSalary: 50000, employeeContrib: 6000, employerContrib: 6000, total: 12000 },
    { employee: "Jane Smith", basicSalary: 45000, employeeContrib: 5400, employerContrib: 5400, total: 10800 },
    { employee: "Mike Johnson", basicSalary: 55000, employeeContrib: 6600, employerContrib: 6600, total: 13200 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-page-title">PF / ESI / PT Management</h1>
            <p className="text-slate-500 mt-1">Manage statutory compliance and contributions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" data-testid="button-upload-challan">
              <Upload className="h-4 w-4" />
              Upload Challan
            </Button>
            <Button className="gap-2" data-testid="button-generate-report">
              <Download className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card data-testid={`card-stat-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
                      {stat.icon}
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </Badge>
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
            <CardTitle>Statutory Contributions</CardTitle>
            <CardDescription>Monthly PF, ESI, and Professional Tax details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pf">
              <TabsList>
                <TabsTrigger value="pf" data-testid="tab-pf">Provident Fund</TabsTrigger>
                <TabsTrigger value="esi" data-testid="tab-esi">ESI</TabsTrigger>
                <TabsTrigger value="pt" data-testid="tab-pt">Professional Tax</TabsTrigger>
              </TabsList>
              <TabsContent value="pf" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Employee</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Basic Salary</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Employee (12%)</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Employer (12%)</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pfData.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50" data-testid={`row-pf-${index}`}>
                          <td className="py-3 px-4 font-medium">{row.employee}</td>
                          <td className="py-3 px-4">₹{row.basicSalary.toLocaleString()}</td>
                          <td className="py-3 px-4">₹{row.employeeContrib.toLocaleString()}</td>
                          <td className="py-3 px-4">₹{row.employerContrib.toLocaleString()}</td>
                          <td className="py-3 px-4 font-medium text-teal-600">₹{row.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="esi" className="mt-4">
                <div className="text-center py-8 text-slate-500">
                  ESI contribution details will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="pt" className="mt-4">
                <div className="text-center py-8 text-slate-500">
                  Professional Tax details will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
