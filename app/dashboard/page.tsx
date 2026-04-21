"use client";

import React from "react";
import UserTable from "../components/dashboard/UserTable";
import "../styles/dashboard.css";

export default function DashboardOverview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--dashboard-text-main)]">
          Good afternoon, <span className="gradient-text">MD Eesha</span> 👋
        </h1>
        <p className="text-[var(--dashboard-text-muted)] mt-1">Here&apos;s what&apos;s happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="👥"
          title="Total Users"
          value="1,284"
          trend="+12.5%"
          trendUp={true}
          accentFrom="#6366f1"
          accentTo="#8b5cf6"
          progress={78}
        />
        <StatsCard
          icon="🚀"
          title="Active Projects"
          value="42"
          trend="+3.2%"
          trendUp={true}
          accentFrom="#06b6d4"
          accentTo="#3b82f6"
          progress={62}
        />
        <StatsCard
          icon="📊"
          title="Course Completion"
          value="86%"
          trend="-2.4%"
          trendUp={false}
          accentFrom="#f59e0b"
          accentTo="#ef4444"
          progress={86}
        />
        <StatsCard
          icon="📝"
          title="Upcoming Exams"
          value="8"
          trend="New"
          trendUp={true}
          accentFrom="#10b981"
          accentTo="#059669"
          progress={40}
        />
      </div>

      {/* User Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--dashboard-text-main)]">User Management</h2>
          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95">
            + Add New User
          </button>
        </div>
        
        {/* User Table Component */}
        <UserTable />
      </div>
    </div>
  );
}

function StatsCard({
  icon,
  title,
  value,
  trend,
  trendUp,
  accentFrom,
  accentTo,
  progress,
}: {
  icon: string;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  accentFrom: string;
  accentTo: string;
  progress: number;
}) {
  return (
    <div className="stats-card group" style={{ "--accent-from": accentFrom, "--accent-to": accentTo } as React.CSSProperties}>
      {/* Gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 blur-3xl transition-all duration-700"
        style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[var(--dashboard-text-muted)] tracking-wider uppercase">
            {title}
          </span>
          <span className="text-4xl font-extrabold text-[var(--dashboard-text-main)] tracking-tight">
            {value}
          </span>
        </div>

        {/* Icon bubble */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
        >
          {icon}
        </div>
      </div>

      {/* Bottom section: progress + trend */}
      <div className="flex items-center justify-between mt-5 relative z-10">
        {/* Mini progress bar */}
        <div className="flex-1 mr-4">
          <div className="w-full h-1.5 rounded-full bg-[var(--dashboard-border)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
              }}
            />
          </div>
        </div>

        {/* Trend badge */}
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
            trendUp
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </span>
      </div>
    </div>
  );
}
