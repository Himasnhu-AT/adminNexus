import { Button } from "@/components/ui/button";
import {
  Database,
  AlertCircle,
  MessageSquare,
  BarChart2,
  Activity,
  // Settings,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  return (
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
        <Button
          variant="ghost"
          className={`w-full justify-start pl-4 ${activeTab === "serviceDashboard" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("serviceDashboard")}
        >
          <Activity className="mr-2 h-4 w-4" />
          Service Uptime
        </Button>
        {/* <Button
          variant="ghost"
          className={`w-full justify-start pl-4 ${activeTab === "serviceDashboard" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("serviceDashboard")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Setting
        </Button> */}
      </nav>
    </div>
  );
}
