"use client";

import React, { useState } from "react";
import { suppliers } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Suppliers</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Manage your vendor relationships and procurement sources</p>
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
          + Add Supplier
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search suppliers by name or contact person..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--db-border)",
            background: "var(--db-card-bg)",
            color: "var(--db-text)",
            outline: "none"
          }}
        />
      </div>

      {/* Suppliers Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Phone / Email</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <span style={{ fontWeight: 700 }}>{s.name}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{s.contactPerson}</span>
                </td>
                <td>
                  <div style={{ fontSize: "0.85rem" }}>
                    <p style={{ color: "var(--db-text)" }}>{s.phone}</p>
                    <p style={{ color: "var(--db-text-muted)" }}>{s.email}</p>
                  </div>
                </td>
                <td><span style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)" }}>{s.category}</span></td>
                <td>
                  <span className={`badge ${s.status === "Active" ? "badge-active" : "badge-inactive"}`}>
                    {s.status}
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
                    Details
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
