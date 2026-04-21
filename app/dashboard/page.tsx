"use client";

import React from "react";
import "../styles/dashboard.css";

export default function DashboardOverview() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>
          Welcome back, <span className="gradient-text">MD Eesha</span> 👋
        </h1>
        <p style={{ color: "var(--db-text-muted)", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          Here&apos;s your store overview for today.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
        <StatsCard icon="💰" title="Today's Sales" value="₹48,520" trend="+18.2%" trendUp={true} accentFrom="#4f46e5" accentTo="#7c3aed" progress={72} />
        <StatsCard icon="📦" title="Inventory Items" value="1,847" trend="+32" trendUp={true} accentFrom="#06b6d4" accentTo="#3b82f6" progress={85} />
        <StatsCard icon="🛒" title="Pending Orders" value="24" trend="-3" trendUp={false} accentFrom="#f59e0b" accentTo="#ef4444" progress={30} />
        <StatsCard icon="⚠️" title="Low Stock Items" value="12" trend="Urgent" trendUp={false} accentFrom="#ef4444" accentTo="#dc2626" progress={15} />
      </div>

      {/* Quick Summary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {/* Recent Transactions */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--db-text)", marginBottom: "1.25rem" }}>Recent Transactions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <TransactionRow name="Sunita Devi" type="Payment" amount="₹10,000" isCredit={true} time="2 hours ago" />
            <TransactionRow name="Rajesh Kumar" type="Purchase" amount="₹3,200" isCredit={false} time="4 hours ago" />
            <TransactionRow name="Ravi Verma" type="Payment" amount="₹8,000" isCredit={true} time="5 hours ago" />
            <TransactionRow name="Amit Patel" type="Purchase" amount="₹1,800" isCredit={false} time="Yesterday" />
            <TransactionRow name="Kavita Joshi" type="Payment" amount="₹3,500" isCredit={true} time="Yesterday" />
          </div>
        </div>

        {/* Top Outstanding */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--db-text)", marginBottom: "1.25rem" }}>Top Outstanding Balances</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <OutstandingRow name="Sunita Devi" amount="₹12,400" orders={67} />
            <OutstandingRow name="Rajesh Kumar" amount="₹8,500" orders={45} />
            <OutstandingRow name="Kavita Joshi" amount="₹5,600" orders={22} />
            <OutstandingRow name="Amit Patel" amount="₹4,200" orders={8} />
            <OutstandingRow name="Vikram Singh" amount="₹3,800" orders={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub Components ---- */

function StatsCard({ icon, title, value, trend, trendUp, accentFrom, accentTo, progress }: {
  icon: string; title: string; value: string; trend: string; trendUp: boolean;
  accentFrom: string; accentTo: string; progress: number;
}) {
  return (
    <div className="stats-card" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`, borderRadius: "1rem 1rem 0 0" }} />
      <div style={{ position: "absolute", right: "-20px", top: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${accentFrom}15, transparent 70%)`, filter: "blur(20px)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</span>
          <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--db-text)", letterSpacing: "-0.02em" }}>{value}</span>
        </div>
        <div style={{ width: "44px", height: "44px", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", boxShadow: `0 4px 12px ${accentFrom}40` }}>
          {icon}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
        <div style={{ flex: 1, marginRight: "1rem" }}>
          <div style={{ width: "100%", height: "5px", borderRadius: "9999px", background: "var(--db-border)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "9999px", width: `${progress}%`, background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`, transition: "width 1s ease" }} />
          </div>
        </div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.625rem", borderRadius: "0.5rem", background: trendUp ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: trendUp ? "#16a34a" : "#ef4444" }}>
          {trendUp ? "↑" : "↓"} {trend}
        </span>
      </div>
    </div>
  );
}

function TransactionRow({ name, type, amount, isCredit, time }: {
  name: string; type: string; amount: string; isCredit: boolean; time: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: "1px solid var(--db-border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "0.625rem",
          background: isCredit ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.875rem",
        }}>
          {isCredit ? "↓" : "↑"}
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--db-text)" }}>{name}</p>
          <p style={{ fontSize: "0.7rem", color: "var(--db-text-muted)" }}>{type} · {time}</p>
        </div>
      </div>
      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: isCredit ? "#16a34a" : "#ef4444" }}>
        {isCredit ? "+" : "-"}{amount}
      </span>
    </div>
  );
}

function OutstandingRow({ name, amount, orders }: { name: string; amount: string; orders: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: "1px solid var(--db-border)" }}>
      <div>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--db-text)" }}>{name}</p>
        <p style={{ fontSize: "0.7rem", color: "var(--db-text-muted)" }}>{orders} orders</p>
      </div>
      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ef4444" }}>{amount}</span>
    </div>
  );
}
