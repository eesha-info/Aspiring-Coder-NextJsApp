"use client";

import React, { useState } from "react";
import Link from "next/link";
import { orders, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function OrdersPage() {
  const [filter, setFilter] = useState("All");

  const filtered = orders.filter(order => filter === "All" || order.status === filter);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed": return "badge-active";
      case "Pending": return "badge-pending";
      case "Processing": return "badge-pending";
      case "Cancelled": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Customer Orders</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Manage incoming orders and track their progress</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--db-card-bg)", padding: "0.25rem", borderRadius: "0.75rem", width: "fit-content", border: "1px solid var(--db-border)" }}>
        {["All", "Pending", "Processing", "Completed"].map(status => (
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

      {/* Orders Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td><span style={{ fontWeight: 700 }}>#{order.id}</span></td>
                <td><span style={{ fontWeight: 600 }}>{order.customerName}</span></td>
                <td><span style={{ fontSize: "0.85rem" }}>{order.date}</span></td>
                <td><span>{order.totalItems} Items</span></td>
                <td><span style={{ fontWeight: 700 }}>{formatCurrency(order.totalAmount)}</span></td>
                <td><span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                <td>
                  <Link href={`/dashboard/orders/${order.id}`} style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--db-border)",
                    background: "transparent",
                    color: "var(--db-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-block"
                  }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
