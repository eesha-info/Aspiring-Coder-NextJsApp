"use client";

import React from "react";
import { sales, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function SalesPage() {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Sales History</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track your store's completed transactions and revenue</p>
        </div>
        <div className="glass-card" style={{ padding: "0.75rem 1.5rem", textAlign: "right" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase" }}>Total Revenue</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#16a34a" }}>{formatCurrency(totalRevenue)}</p>
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
            {sales.map((sale) => (
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
                    gap: "0.5rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    background: "rgba(99, 102, 241, 0.1)",
                    color: "var(--db-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}>
                    {sale.paymentMethod}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
