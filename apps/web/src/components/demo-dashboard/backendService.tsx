"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";

interface UptimeDataType {
  projects: Project[];
}

interface Project {
  name: string;
  services: UptimeService[];
}

interface UptimeService {
  name: string;
  importance: string;
  data: UptimeServiceData[];
}

interface UptimeServiceData {
  timestamp: number;
  status: string;
}

// Initial data structure
const initialData: UptimeDataType = {
  projects: [
    {
      name: "Project A",
      services: [
        {
          name: "Website",
          importance: "critical",
          data: [
            { timestamp: Date.now() - 3600000, status: "active" },
            { timestamp: Date.now() - 7200000, status: "active" },
            { timestamp: Date.now() - 10800000, status: "inactive" },
          ],
        },
        {
          name: "API",
          importance: "important",
          data: [
            { timestamp: Date.now() - 3600000, status: "active" },
            { timestamp: Date.now() - 7200000, status: "active" },
            { timestamp: Date.now() - 10800000, status: "active" },
          ],
        },
      ],
    },
    {
      name: "Project B",
      services: [
        {
          name: "Database",
          importance: "critical",
          data: [
            { timestamp: Date.now() - 3600000, status: "active" },
            { timestamp: Date.now() - 7200000, status: "inactive" },
            { timestamp: Date.now() - 10800000, status: "active" },
          ],
        },
        {
          name: "Auth Service",
          importance: "important",
          data: [
            { timestamp: Date.now() - 3600000, status: "active" },
            { timestamp: Date.now() - 7200000, status: "active" },
            { timestamp: Date.now() - 10800000, status: "active" },
          ],
        },
      ],
    },
    {
      name: "Project C",
      services: [
        {
          name: "Logging Service",
          importance: "normal",
          data: [
            { timestamp: Date.now() - 3600000, status: "active" },
            { timestamp: Date.now() - 7200000, status: "active" },
            { timestamp: Date.now() - 10800000, status: "active" },
          ],
        },
      ],
    },
  ],
};

export default function ServiceDashboard() {
  const [data, setData] = React.useState(initialData);
  const [selectedProject, setSelectedProject] = React.useState(
    data.projects[0],
  );
  const [selectedService, setSelectedService] =
    React.useState<UptimeService | null>(null);
  const [isAddingService, setIsAddingService] = React.useState(false);

  const addService = (
    projectName: string,
    serviceName: FormDataEntryValue | null,
    importance: FormDataEntryValue | null,
  ) => {
    const updatedData = { ...data };
    const project = updatedData.projects.find((p) => p.name === projectName);
    if (project) {
      console.log("Service Name: ", serviceName);
      console.log("Importance level: ", importance);
      // project.services.push({
      //   name: serviceName,
      //   importance,
      //   data: [{ timestamp: Date.now(), status: "active" }],
      // });
      setData(updatedData);
      setSelectedProject(project);
    }
    setIsAddingService(false);
  };

  const getServiceStatus = (service: UptimeService) => {
    const latestStatus = service.data[0]?.status;
    return latestStatus === "active" ? "Up" : "Down";
  };

  const getServiceUptime = (service: UptimeService) => {
    const last24Hours = service.data.filter(
      (d: { timestamp: number }) => d.timestamp > Date.now() - 86400000,
    );
    const activeCount = last24Hours.filter(
      (d: { status: string }) => d.status === "active",
    ).length;
    return ((activeCount / last24Hours.length) * 100).toFixed(1);
  };

  const getServiceColor = (service: UptimeService) => {
    const uptime = parseFloat(getServiceUptime(service));
    if (service.importance === "critical") {
      if (uptime >= 99.9) return "bg-green-500";
      if (uptime >= 99) return "bg-yellow-500";
      return "bg-red-500";
    }
    if (service.importance === "important") {
      if (uptime >= 99) return "bg-green-500";
      if (uptime >= 95) return "bg-yellow-500";
      return "bg-red-500";
    }
    if (uptime >= 95) return "bg-green-500";
    if (uptime >= 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex h-screen flex-col">
      {/* <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => console.log('setTheme("light")')}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('setTheme("dark")')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log('setTheme("system")')}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-muted/40 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-4 font-semibold">Projects</h3>
            {data.projects.map((project) => (
              <Card
                key={project.name}
                className={`mb-4 cursor-pointer ${selectedProject.name === project.name ? "border-primary" : ""}`}
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{project.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {project.services.length} services
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {selectedProject.name} Services
            </h2>
            <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new service you want to monitor.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    addService(
                      selectedProject.name,
                      formData.get("name"),
                      formData.get("importance"),
                    );
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="importance" className="text-right">
                        Importance
                      </Label>
                      <select
                        id="importance"
                        name="importance"
                        className="col-span-3 p-2 border rounded"
                      >
                        <option value="critical">Critical</option>
                        <option value="important">Important</option>
                        <option value="normal">Normal</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Service</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedProject.services.map((service) => (
              <Card
                key={service.name}
                className="cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline">{service.importance}</Badge>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      getServiceStatus(service) === "Up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {getServiceStatus(service)}
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${getServiceColor(service)}`}
                      style={{ width: `${getServiceUptime(service)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {getServiceUptime(service)}% uptime in last 24h
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Last checked:{" "}
                    {new Date(service.data[0].timestamp).toLocaleString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
      {selectedService && (
        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{selectedService.name} Analytics</DialogTitle>
              <DialogDescription>
                View detailed analytics for {selectedService.name}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="24h" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="24h">Last 24 Hours</TabsTrigger>
                <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
                <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
              </TabsList>
              {["24h", "7d", "30d"].map((period) => (
                <TabsContent key={period} value={period} className="mt-4">
                  <div className="h-[200px] w-full bg-muted">
                    {/* Placeholder for chart */}
                    <div className="flex h-full items-center justify-center">
                      Chart for {period} would go here
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Current Status</h4>
                      <p>{getServiceStatus(selectedService)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Uptime (24h)</h4>
                      <p>{getServiceUptime(selectedService)}%</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Importance</h4>
                      <p className="capitalize">{selectedService.importance}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <DialogFooter>
              <Button onClick={() => setSelectedService(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
