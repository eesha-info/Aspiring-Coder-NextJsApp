"use client";

import React from "react";
import { formatCurrency, sales, purchaseOrders } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function ReportsPage() {
  const totalSales = sales.reduce((s, x) => s + x.amount, 0);
  const totalProcurement = purchaseOrders.reduce((s, x) => s + x.amount, 0);
  const profit = totalSales - (totalProcurement * 0.1); // Simulated profit logic

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Business Analytics</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Insightful reports on your store's performance and inventory</p>
        </div>
        <button style={{
          padding: "0.625rem 1.5rem",
          background: "var(--db-primary)",
          color: "white",
          borderRadius: "0.625rem",
          border: "none",
          fontSize: "0.85rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        }}>
          Download PDF Report
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <MetricCard title="Gross Sales" value={formatCurrency(totalSales)} trend="+12.5%" trendUp={true} color="#4f46e5" />
        <MetricCard title="Procurement Cost" value={formatCurrency(totalProcurement)} trend="+5.2%" trendUp={false} color="#f59e0b" />
        <MetricCard title="Net Margin" value={formatCurrency(profit)} trend="+18.3%" trendUp={true} color="#16a34a" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Sales by Category (Simulated) */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>Sales by Category</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CategoryMetric label="Dairy" percentage={45} amount="₹22,000" color="#4f46e5" />
            <CategoryMetric label="Grains" percentage={30} amount="₹15,000" color="#818cf8" />
            <CategoryMetric label="Produce" percentage={15} amount="₹7,500" color="#06b6d4" />
            <CategoryMetric label="Others" percentage={10} amount="₹5,000" color="#94a3b8" />
          </div>
        </div>

        {/* Inventory Turnover (Simulated) */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>Inventory Health</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderRadius: "0.75rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase" }}>Overstock</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#16a34a" }}>12 Items</p>
              </div>
              <div style={{ fontSize: "1.5rem" }}>📦</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderRadius: "0.75rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase" }}>Stockouts</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ef4444" }}>5 Items</p>
              </div>
              <div style={{ fontSize: "1.5rem" }}>⚠️</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, color }: { title: string; value: string; trend: string; trendUp: boolean; color: string }) {
  return (
    <div className="glass-card" style={{ padding: "1.5rem", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: "1.5rem", bottom: "1.5rem", width: "4px", background: color, borderRadius: "0 4px 4px 0" }} />
      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginTop: "0.5rem" }}>
        <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>{value}</p>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: trendUp ? "#16a34a" : "#ef4444" }}>{trendUp ? "↑" : "↓"} {trend}</span>
      </div>
    </div>
  );
}

function CategoryMetric({ label, percentage, amount, color }: { label: string; percentage: number; amount: string; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>
        <span style={{ color: "var(--db-text)" }}>{label}</span>
        <span style={{ color: "var(--db-text-muted)" }}>{amount} ({percentage}%)</span>
      </div>
      <div style={{ height: "8px", background: "var(--db-border)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percentage}%`, background: color, borderRadius: "9999px" }} />
      </div>
    </div>
  );
}
