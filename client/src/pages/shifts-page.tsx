import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Users, Settings, Sun, Moon, Sunrise } from "lucide-react";
import { motion } from "framer-motion";

export default function ShiftsPage() {
  const shifts = [
    { name: "Morning Shift", time: "6:00 AM - 2:00 PM", employees: 45, icon: <Sunrise className="h-5 w-5" />, color: "bg-amber-50 text-amber-600" },
    { name: "Day Shift", time: "9:00 AM - 6:00 PM", employees: 120, icon: <Sun className="h-5 w-5" />, color: "bg-yellow-50 text-yellow-600" },
    { name: "Evening Shift", time: "2:00 PM - 10:00 PM", employees: 38, icon: <Moon className="h-5 w-5" />, color: "bg-purple-50 text-purple-600" },
    { name: "Night Shift", time: "10:00 PM - 6:00 AM", employees: 22, icon: <Moon className="h-5 w-5" />, color: "bg-indigo-50 text-indigo-600" },
  ];

  const shiftSchedule = [
    { employee: "John Doe", department: "Engineering", shift: "Day Shift", startDate: "2024-01-01", endDate: "2024-03-31" },
    { employee: "Jane Smith", department: "Marketing", shift: "Morning Shift", startDate: "2024-01-15", endDate: "2024-04-15" },
    { employee: "Mike Johnson", department: "Sales", shift: "Evening Shift", startDate: "2024-02-01", endDate: "2024-05-01" },
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
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-page-title">Shift Management</h1>
            <p className="text-slate-500 mt-1">Configure and manage employee shifts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" data-testid="button-shift-settings">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button className="gap-2" data-testid="button-add-shift">
              <Plus className="h-4 w-4" />
              Add Shift
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shifts.map((shift, index) => (
            <motion.div
              key={shift.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-elevate cursor-pointer" data-testid={`card-shift-${shift.name.toLowerCase().replace(' ', '-')}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${shift.color}`}>
                      {shift.icon}
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {shift.employees}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{shift.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {shift.time}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              Shift Assignments
            </CardTitle>
            <CardDescription>Current employee shift schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Shift</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Start Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">End Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftSchedule.map((schedule, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50" data-testid={`row-schedule-${index}`}>
                      <td className="py-3 px-4 font-medium">{schedule.employee}</td>
                      <td className="py-3 px-4 text-slate-600">{schedule.department}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{schedule.shift}</Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{schedule.startDate}</td>
                      <td className="py-3 px-4 text-slate-600">{schedule.endDate}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" data-testid={`button-edit-schedule-${index}`}>Edit</Button>
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
