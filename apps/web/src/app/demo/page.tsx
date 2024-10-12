"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import LogsDisplay from "@/components/dashboard/logDisplay";
import FeedbackDisplay from "@/components/dashboard/feedbackDisplay";
import StatsDisplay from "@/components/dashboard/statsDisplay";

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
        </main>
      </div>
    </div>
  );
}
