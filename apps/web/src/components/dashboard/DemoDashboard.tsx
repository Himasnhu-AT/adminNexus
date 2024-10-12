"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import ProjectCards from "./projectCard";
import LogsDisplay from "./logDisplay";
import FeedbackDisplay from "./feedbackDisplay";
import StatsDisplay from "./statsDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";

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

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState("logging");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
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

  const handleDeleteFeedback = (id: number) => {
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const handleArchiveFeedback = (id: number) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, status: "archived" } : item,
      ),
    );
  };

  const sortLogs = (logs: any[]) => {
    return [...logs].sort((a, b) => {
      if (a[logSort.field] < b[logSort.field])
        return logSort.direction === "asc" ? 1 : -1;
      if (a[logSort.field] > b[logSort.field])
        return logSort.direction === "asc" ? -1 : 1;
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === "logging" && (
            <>
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
              <ProjectCards
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                newProjectName={newProjectName}
                setNewProjectName={setNewProjectName}
                handleAddProject={handleAddProject}
              />
              <LogsDisplay
                selectedProject={selectedProject}
                projects={projects}
                mockLogs={mockLogs}
                logSort={logSort}
                setLogSort={setLogSort}
                sortLogs={sortLogs}
              />
            </>
          )}
          {activeTab === "feedback" && (
            <FeedbackDisplay
              feedback={feedback}
              feedbackSort={feedbackSort}
              setFeedbackSort={setFeedbackSort}
              sortedFeedback={sortedFeedback}
              handleArchiveFeedback={handleArchiveFeedback}
              handleDeleteFeedback={handleDeleteFeedback}
            />
          )}
          {activeTab === "stats" && (
            <StatsDisplay mockChartData={mockChartData} />
          )}
        </main>
      </div>
    </div>
  );
}
