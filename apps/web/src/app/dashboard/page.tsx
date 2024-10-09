"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  BarChart2,
  // Bug,
  Database,
  // Github,
  Home,
  MessageSquare,
  // Plus,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const mockLogs = [
  {
    id: 1,
    message: "User authentication failed",
    severity: "error",
    timestamp: "2023-05-10T14:30:00Z",
  },
  {
    id: 2,
    message: "New user registered",
    severity: "info",
    timestamp: "2023-05-10T14:45:00Z",
  },
  {
    id: 3,
    message: "Payment processed successfully",
    severity: "success",
    timestamp: "2023-05-10T15:00:00Z",
  },
  {
    id: 4,
    message: "Database connection timeout",
    severity: "warning",
    timestamp: "2023-05-10T15:15:00Z",
  },
];

const mockFeedback = [
  { id: 1, type: "bug", title: "App crashes on startup", status: "open" },
  { id: 2, type: "feature", title: "Add dark mode", status: "in_progress" },
  {
    id: 3,
    type: "bug",
    title: "Cannot upload profile picture",
    status: "closed",
  },
  {
    id: 4,
    type: "feedback",
    title: "Great user experience!",
    status: "acknowledged",
  },
];

const mockChartData = [
  { name: "Jan", users: 4000, activity: 2400 },
  { name: "Feb", users: 3000, activity: 1398 },
  { name: "Mar", users: 2000, activity: 9800 },
  { name: "Apr", users: 2780, activity: 3908 },
  { name: "May", users: 1890, activity: 4800 },
  { name: "Jun", users: 2390, activity: 3800 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("logging");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Database className="h-6 w-6 text-blue-600 mr-2" />
            Admin Nexus
          </h1>
        </div>
        <nav className="mt-4">
          <Button
            variant="ghost"
            className={`w-full justify-start pl-4 ${activeTab === "logging" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("logging")}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Logging
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start pl-4 ${activeTab === "feedback" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start pl-4 ${activeTab === "stats" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Database Stats
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsContent value="logging" className="space-y-4">
              <h2 className="text-2xl font-bold">Logging</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Logs</CardTitle>
                  <CardDescription>
                    View and manage your application logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {mockLogs.map((log) => (
                      <div
                        key={log.id}
                        className="mb-4 p-4 bg-white rounded-lg shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded text-sm font-semibold ${
                              log.severity === "error"
                                ? "bg-red-100 text-red-800"
                                : log.severity === "warning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : log.severity === "success"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {log.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-800">{log.message}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <h2 className="text-2xl font-bold">Feedback and Bug Tracking</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>
                    Manage user feedback and bug reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {mockFeedback.map((item) => (
                      <div
                        key={item.id}
                        className="mb-4 p-4 bg-white rounded-lg shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded text-sm font-semibold ${
                              item.type === "bug"
                                ? "bg-red-100 text-red-800"
                                : item.type === "feature"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item.type.toUpperCase()}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-sm font-semibold ${
                              item.status === "open"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "in_progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.status === "closed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-800">{item.title}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <h2 className="text-2xl font-bold">Database Stats</h2>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth and Activity</CardTitle>
                  <CardDescription>
                    Monitor key metrics of your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="users"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="activity"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
