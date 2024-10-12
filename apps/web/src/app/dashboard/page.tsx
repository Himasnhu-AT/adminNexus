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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Archive,
  BarChart2,
  Database,
  Home,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
const mockProjects = [
  { id: 1, name: "Web App", totalLogs: 1250, errorRate: "2.3%" },
  { id: 2, name: "Mobile App", totalLogs: 980, errorRate: "1.8%" },
  { id: 3, name: "API Server", totalLogs: 2100, errorRate: "0.5%" },
  { id: 4, name: "Database", totalLogs: 560, errorRate: "0.2%" },
];

const mockLogs = {
  1: [
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
  ],
  2: [
    {
      id: 4,
      message: "App crashed on startup",
      severity: "error",
      timestamp: "2023-05-10T15:15:00Z",
    },
    {
      id: 5,
      message: "Push notification sent",
      severity: "info",
      timestamp: "2023-05-10T15:30:00Z",
    },
  ],
  3: [
    {
      id: 6,
      message: "API rate limit exceeded",
      severity: "warning",
      timestamp: "2023-05-10T15:45:00Z",
    },
    {
      id: 7,
      message: "New API key generated",
      severity: "info",
      timestamp: "2023-05-10T16:00:00Z",
    },
  ],
  4: [
    {
      id: 8,
      message: "Database backup completed",
      severity: "success",
      timestamp: "2023-05-10T16:15:00Z",
    },
    {
      id: 9,
      message: "Query optimization applied",
      severity: "info",
      timestamp: "2023-05-10T16:30:00Z",
    },
  ],
};

const mockFeedback = [
  {
    id: 1,
    type: "bug",
    title: "App crashes on startup",
    status: "open",
    timestamp: "2023-05-10T14:30:00Z",
  },
  {
    id: 2,
    type: "feature",
    title: "Add dark mode",
    status: "in_progress",
    timestamp: "2023-05-10T15:45:00Z",
  },
  {
    id: 3,
    type: "bug",
    title: "Cannot upload profile picture",
    status: "closed",
    timestamp: "2023-05-10T16:20:00Z",
  },
  {
    id: 4,
    type: "feedback",
    title: "Great user experience!",
    status: "acknowledged",
    timestamp: "2023-05-10T17:10:00Z",
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(mockProjects);
  const [newProjectName, setNewProjectName] = useState("");
  const [feedback, setFeedback] = useState(mockFeedback);
  const [logSort, setLogSort] = useState({
    field: "timestamp",
    direction: "desc",
  });
  const [feedbackSort, setFeedbackSort] = useState({
    field: "timestamp",
    direction: "desc",
  });

  const totalLogs = projects.reduce(
    (sum, project) => sum + project.totalLogs,
    0,
  );
  const averageErrorRate = (
    projects.reduce((sum, project) => sum + parseFloat(project.errorRate), 0) /
    projects.length
  ).toFixed(2);

  const handleAddProject = () => {
    if (newProjectName) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        totalLogs: 0,
        errorRate: "0%",
      };
      setProjects([...projects, newProject]);
      setNewProjectName("");
    }
  };

  const handleDeleteFeedback = (id) => {
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const handleArchiveFeedback = (id) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, status: "archived" } : item,
      ),
    );
  };

  const sortLogs = (logs) => {
    return [...logs].sort((a, b) => {
      if (a[logSort.field] < b[logSort.field])
        return logSort.direction === "asc" ? -1 : 1;
      if (a[logSort.field] > b[logSort.field])
        return logSort.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (a[feedbackSort.field] < b[feedbackSort.field])
      return feedbackSort.direction === "asc" ? -1 : 1;
    if (a[feedbackSort.field] > b[feedbackSort.field])
      return feedbackSort.direction === "asc" ? 1 : -1;
    return 0;
  });

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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Logging</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Project</DialogTitle>
                      <DialogDescription>
                        Enter the name of the new project you want to add.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newProjectName}
                          onChange={(e) => setNewProjectName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddProject}>Add Project</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Logging Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Logs
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalLogs.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Error Rate
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {averageErrorRate}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all duration-200 ${selectedProject === project.id ? "ring-2 ring-blue-500" : "hover:shadow-lg"}`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Total Logs: {project.totalLogs}
                      </p>
                      <p className="text-sm text-gray-500">
                        Error Rate: {project.errorRate}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Logs Display */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {selectedProject
                        ? `Logs for ${projects.find((p) => p.id === selectedProject).name}`
                        : "Select a project to view logs"}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            setLogSort({
                              field: "timestamp",
                              direction: "desc",
                            })
                          }
                        >
                          Newest First
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setLogSort({ field: "timestamp", direction: "asc" })
                          }
                        >
                          Oldest First
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setLogSort({ field: "severity", direction: "desc" })
                          }
                        >
                          Severity (High to Low)
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setLogSort({ field: "severity", direction: "asc" })
                          }
                        >
                          Severity (Low to High)
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    View and manage your application logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {selectedProject ? (
                      sortLogs(mockLogs[selectedProject]).map((log) => (
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
                      ))
                    ) : (
                      <p className="text-center text-gray-500 mt-4">
                        Select a project to view its logs
                      </p>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Feedback and Bug Tracking
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        setFeedbackSort({
                          field: "timestamp",
                          direction: "desc",
                        })
                      }
                    >
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFeedbackSort({
                          field: "timestamp",
                          direction: "asc",
                        })
                      }
                    >
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFeedbackSort({ field: "type", direction: "asc" })
                      }
                    >
                      Type
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFeedbackSort({ field: "status", direction: "asc" })
                      }
                    >
                      Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>
                    Manage user feedback and bug reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {sortedFeedback.map((item) => (
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
                                    : item.status === "archived"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-800 mb-2">{item.title}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleArchiveFeedback(item.id)}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteFeedback(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
