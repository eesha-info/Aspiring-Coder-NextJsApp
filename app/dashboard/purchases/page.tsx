"use client";

import React from "react";
import { purchaseOrders, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function PurchasesPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Purchases & Procurement</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track stock orders and arrivals from your suppliers</p>
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
          + New Purchase Order
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase" }}>Total Procurement</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)", marginTop: "0.25rem" }}>
            {formatCurrency(purchaseOrders.reduce((s, p) => s + p.amount, 0))}
          </p>
        </div>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase" }}>Pending Orders</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b", marginTop: "0.25rem" }}>
            {purchaseOrders.filter(p => p.status === "Ordered").length}
          </p>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((p) => (
              <tr key={p.id}>
                <td><span style={{ fontWeight: 700 }}>#PO-{p.id}</span></td>
                <td><span style={{ fontWeight: 600 }}>{p.supplierName}</span></td>
                <td>{p.date}</td>
                <td style={{ fontSize: "0.85rem", maxWidth: "250px" }}>{p.items}</td>
                <td><span style={{ fontWeight: 700 }}>{formatCurrency(p.amount)}</span></td>
                <td>
                  <span className={`badge ${p.status === "Received" ? "badge-active" : p.status === "Ordered" ? "badge-pending" : "badge-inactive"}`}>
                    {p.status}
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
                    View
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
