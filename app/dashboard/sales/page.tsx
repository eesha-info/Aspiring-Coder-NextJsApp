"use client";

import React, { useState, useMemo } from "react";
import { sales, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

type TimeRange = "Today" | "Weekly" | "Monthly" | "Yearly" | "All";

export default function SalesPage() {
  const [range, setRange] = useState<TimeRange>("Today");

  // Helper to check if a date is within the selected range
  const filteredSales = useMemo(() => {
    const now = new Date("2026-04-21"); // Base date for mock data context
    
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      
      if (range === "Today") {
        // Exact same day, month, and year
        return saleDate.getDate() === now.getDate() && 
               saleDate.getMonth() === now.getMonth() && 
               saleDate.getFullYear() === now.getFullYear();
      }
      
      if (range === "Weekly") {
        // Last 7 days
        const diffDays = Math.floor((now.getTime() - saleDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
      }
      
      if (range === "Monthly") {
        // Same month and year
        return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
      }
      
      if (range === "Yearly") {
        // Same year
        return saleDate.getFullYear() === now.getFullYear();
      }
      
      return true; // "All"
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [range]);

  const stats = useMemo(() => {
    const total = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
    const count = filteredSales.length;
    return { total, count };
  }, [filteredSales]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Sales History</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track your store&apos;s completed transactions and revenue</p>
        </div>
        
        {/* Period Selector */}
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          background: "var(--db-card-bg)", 
          padding: "0.375rem", 
          borderRadius: "0.875rem", 
          border: "1px solid var(--db-border)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
          {(["Today", "Weekly", "Monthly", "Yearly", "All"] as TimeRange[]).map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.625rem",
                border: "none",
                background: range === t ? "var(--db-primary)" : "transparent",
                color: range === t ? "white" : "var(--db-text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
            💰
          </div>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Revenue ({range})</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)", marginTop: "0.125rem" }}>{formatCurrency(stats.total)}</p>
          </div>
        </div>
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
            🛒
          </div>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Orders</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)", marginTop: "0.125rem" }}>{stats.count}</p>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td><span style={{ fontWeight: 600 }}>#SALE-{sale.id}</span></td>
                <td><span style={{ color: "var(--db-text-muted)" }}>#{sale.orderId}</span></td>
                <td><span style={{ fontWeight: 600 }}>{sale.customerName}</span></td>
                <td>{sale.date}</td>
                <td><span style={{ fontWeight: 700, color: "#16a34a" }}>{formatCurrency(sale.amount)}</span></td>
                <td>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    background: "var(--db-primary-bg)",
                    color: "var(--db-primary)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase"
                  }}>
                    {sale.paymentMethod}
                  </span>
                </td>
              </tr>
            ))}
            {filteredSales.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "var(--db-text-muted)" }}>
                  No sales found for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
