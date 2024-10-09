"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart2, Home, Plus, Settings } from "lucide-react";

// Mock data for services and logs
const mockServices = [
  { id: 1, name: "Web App" },
  { id: 2, name: "Mobile App" },
  { id: 3, name: "API Server" },
];

const mockLogs = [
  {
    id: 1,
    service: "Web App",
    message: "404 error on /products page",
    severity: "error",
    timestamp: "2023-05-10T14:30:00Z",
  },
  {
    id: 2,
    service: "Mobile App",
    message: "User authentication failed",
    severity: "warning",
    timestamp: "2023-05-10T15:45:00Z",
  },
  {
    id: 3,
    service: "API Server",
    message: "Database connection timeout",
    severity: "critical",
    timestamp: "2023-05-10T16:20:00Z",
  },
];

export default function LogDashboard() {
  const [selectedService, setSelectedService] = useState(mockServices[0]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");

  const handleAddService = () => {
    // In a real application, you would make an API call to add the service
    console.log("Adding new service:", newServiceName);
    setIsAddingService(false);
    setNewServiceName("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">LogTracker</h1>
          <p className="text-sm text-gray-600">Open Source Logging</p>
        </div>
        <nav className="mt-4">
          {mockServices.map((service) => (
            <button
              key={service.id}
              className={`w-full text-left p-3 hover:bg-gray-100 ${
                selectedService.id === service.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedService(service)}
            >
              {service.name}
            </button>
          ))}
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <button className="w-full text-left p-3 hover:bg-gray-100 text-blue-600">
                <Plus className="inline-block mr-2" size={18} />
                Add New Service
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogContent>
          </Dialog>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedService.name} Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Log display */}
        <main className="flex-1 p-6 bg-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
          <ScrollArea className="h-[calc(100vh-12rem)] rounded-md border">
            <div className="p-4">
              {mockLogs
                .filter((log) => log.service === selectedService.name)
                .map((log) => (
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
                              : "bg-red-200 text-red-900"
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
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
