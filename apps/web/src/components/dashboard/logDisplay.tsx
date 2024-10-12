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
import { ArrowUpDown } from "lucide-react";

export default function LogsDisplay({
  selectedProject,
  projects,
  mockLogs,
  logSort,
  setLogSort,
  sortLogs,
}) {
  return (
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
        <CardDescription>View and manage your application logs</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {selectedProject ? (
            sortLogs(mockLogs[selectedProject]).map((log) => (
              <div key={log.id} className="mb-4 p-4 bg-white rounded-lg shadow">
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
  );
}
