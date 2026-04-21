"use client";

import React, { useState } from "react";
import { bills, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function BillingPage() {
  const [filter, setFilter] = useState("All");

  const filtered = bills.filter(b => filter === "All" || b.status === filter);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid": return "badge-active";
      case "Unpaid": return "badge-pending";
      case "Overdue": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Invoices & Billing</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Manage customer invoices and track payment statuses</p>
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
          + Generate Invoice
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--db-card-bg)", padding: "0.25rem", borderRadius: "0.75rem", width: "fit-content", border: "1px solid var(--db-border)" }}>
        {["All", "Paid", "Unpaid", "Overdue"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: filter === status ? "var(--db-primary)" : "transparent",
              color: filter === status ? "white" : "var(--db-text-muted)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Billing Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td><span style={{ fontWeight: 700 }}>#INV-{b.id}</span></td>
                <td><span style={{ fontWeight: 600 }}>{b.customerName}</span></td>
                <td>{b.date}</td>
                <td>{b.dueDate}</td>
                <td><span style={{ fontWeight: 700 }}>{formatCurrency(b.amount)}</span></td>
                <td>
                  <span className={`badge ${getStatusClass(b.status)}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <button style={{
                    padding: "0.35rem 0.875rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--db-border)",
                    background: "transparent",
                    color: "var(--db-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}>
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
