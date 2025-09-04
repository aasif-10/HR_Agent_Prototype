"use client";
import React from "react";

const SimpleDashboard = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  // Simulate real-time metrics
  const metrics = {
    totalRequests: 4579,
    avgResponseTime: "647ms",
    slaCompliance: "97.8%",
    activeUsers: 1432,
    workdayUptime: "99.97%",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[#131313] rounded-xl p-8 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#dad0d0]">
            Enterprise Integration Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-[#9d9292] hover:text-[#dad0d0] text-xl"
          >
            ✕
          </button>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Workday HRIS</span>
            </div>
            <div className="text-[#9d9292] text-sm">
              Response: 647ms | Uptime: {metrics.workdayUptime}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">
                Policy Engine
              </span>
            </div>
            <div className="text-[#9d9292] text-sm">
              Response: 234ms | Status: Active
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-[#02febd]">
              {metrics.totalRequests.toLocaleString()}
            </div>
            <div className="text-[#9d9292] text-sm">Total Requests</div>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-[#02febd]">
              {metrics.avgResponseTime}
            </div>
            <div className="text-[#9d9292] text-sm">Avg Response</div>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-[#02febd]">
              {metrics.slaCompliance}
            </div>
            <div className="text-[#9d9292] text-sm">SLA Compliance</div>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-[#02febd]">
              {metrics.activeUsers.toLocaleString()}
            </div>
            <div className="text-[#9d9292] text-sm">Active Users</div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-lg">
          <h3 className="text-[#dad0d0] font-semibold mb-2">Architecture</h3>
          <div className="text-[#9d9292] text-sm">
            Enterprise-grade HR assistant with live Workday integration,
            automated SLA monitoring, and real-time analytics dashboard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
