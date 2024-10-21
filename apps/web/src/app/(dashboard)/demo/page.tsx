"use client";

import { useState } from "react";
import Sidebar from "@/components/demo-dashboard/sidebar";
import Header from "@/components/demo-dashboard/header";
import LogsDisplay from "@/components/demo-dashboard/logDisplay";
import FeedbackDisplay from "@/components/demo-dashboard/feedbackDisplay";
import StatsDisplay from "@/components/demo-dashboard/statsDisplay";
import ServiceDashboard from "@/components/demo-dashboard/backendService";

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState("logging");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === "logging" && <LogsDisplay />}
          {activeTab === "feedback" && <FeedbackDisplay />}
          {activeTab === "stats" && <StatsDisplay />}
          {activeTab === "serviceDashboard" && <ServiceDashboard />}
        </main>
      </div>
    </div>
  );
}
