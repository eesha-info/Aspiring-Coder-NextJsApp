"use client";

import React, { useState } from "react";
import Link from "next/link";
import { customers, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filtered.slice(startIndex, startIndex + itemsPerPage);

  const totalOutstanding = customers.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const activeCount = customers.filter(c => c.status === "Active").length;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active": return "badge-active";
      case "Pending": return "badge-pending";
      case "Inactive": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)" }}>Customers</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.85rem", marginTop: "0.125rem" }}>Manage your customer accounts and outstanding balances</p>
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
          + Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <SummaryCard label="Total Customers" value={customers.length.toString()} color="#4f46e5" />
        <SummaryCard label="Active" value={activeCount.toString()} color="#16a34a" />
        <SummaryCard label="Total Outstanding" value={formatCurrency(totalOutstanding)} color="#ef4444" />
        <SummaryCard label="Avg. Spend" value={formatCurrency(Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length))} color="#f59e0b" />
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{
            width: "100%",
            maxWidth: "360px",
            padding: "0.625rem 1rem",
            borderRadius: "0.625rem",
            border: "1px solid var(--db-border)",
            background: "var(--db-card-bg)",
            fontSize: "0.85rem",
            color: "var(--db-text)",
            outline: "none",
          }}
        />
      </div>

      {/* Customer Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Outstanding</th>
              <th>Recent Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "0.625rem",
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                    }}>
                      {customer.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{customer.name}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--db-text-muted)" }}>{customer.phone}</p>
                    </div>
                  </div>
                </td>
                <td><span style={{ fontWeight: 600 }}>{customer.totalOrders}</span></td>
                <td><span style={{ fontWeight: 600, color: "#16a34a" }}>{formatCurrency(customer.totalSpent)}</span></td>
                <td>
                  <span style={{
                    fontWeight: 700,
                    color: customer.outstandingBalance > 0 ? "#ef4444" : "#16a34a",
                  }}>
                    {customer.outstandingBalance > 0 ? formatCurrency(customer.outstandingBalance) : "Clear ✓"}
                  </span>
                </td>
                <td>
                  <div>
                    <p style={{ fontWeight: 600, color: "#16a34a", fontSize: "0.85rem" }}>
                      {customer.recentPayment > 0 ? formatCurrency(customer.recentPayment) : "-"}
                    </p>
                    <p style={{ fontSize: "0.65rem", color: "var(--db-text-muted)" }}>{customer.recentPaymentDate}</p>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(customer.status)}`}>{customer.status}</span>
                </td>
                <td>
                  <Link href={`/dashboard/customers/${customer.id}`} style={{
                    padding: "0.35rem 0.875rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--db-border)",
                    background: "transparent",
                    color: "var(--db-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                  }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0.25rem 0" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--db-text-muted)" }}>
          Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filtered.length)}</strong> of <strong>{filtered.length}</strong> customers
        </p>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="pagination-btn">Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}>{i + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
      <div style={{ width: "8px", height: "40px", borderRadius: "4px", background: color, flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--db-text)", marginTop: "0.125rem" }}>{value}</p>
      </div>
    </div>
  );
}
