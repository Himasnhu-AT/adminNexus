import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ProjectCards from "./projectCard";
import { Log, Project } from "@/types/logging";

const mockProjects: Project[] = [
  { id: 1, name: "Web App", totalLogs: 1250, errorRate: "2.3%" },
  { id: 2, name: "Mobile App", totalLogs: 980, errorRate: "1.8%" },
  { id: 3, name: "API Server", totalLogs: 2100, errorRate: "0.5%" },
  { id: 4, name: "Database", totalLogs: 560, errorRate: "0.2%" },
];

const mockLogs: { [key: number]: Log[] } = {
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

export default function LogsDisplay() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  const [newProjectName, setNewProjectName] = useState("");

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

  interface LogSort {
    field: string;
    direction: "asc" | "desc";
  }
  const [logSort, setLogSort] = useState<LogSort>({
    field: "timestamp",
    direction: "desc",
  });

  const severityOrder: { [key: string]: number } = {
    fatal: 5,
    error: 4,
    warning: 3,
    success: 2,
    info: 1,
    debug: 0,
    log: -1,
  };

  const sortLogs = (logs: Log[]) => {
    return [...logs].sort((a, b) => {
      const field = logSort.field as keyof Log;
      if (field === "severity") {
        const severityA = severityOrder[a.severity];
        const severityB = severityOrder[b.severity];
        if (severityA < severityB) return logSort.direction === "asc" ? -1 : 1;
        if (severityA > severityB) return logSort.direction === "asc" ? 1 : -1;
        return 0;
      } else {
        if (a[field] < b[field]) return logSort.direction === "asc" ? -1 : 1;
        if (a[field] > b[field]) return logSort.direction === "asc" ? 1 : -1;
        return 0;
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
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
            <div className="text-2xl font-bold">{averageErrorRate}%</div>
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {selectedProject
                ? `Logs for ${projects.find((p) => p.id === selectedProject)?.name}`
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
    </>
  );
}
