"use client";

import React, { useState } from "react";
import { inventory, formatCurrency } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Dairy", "Grains", "Produce", "Snacks", "Beverages", "Household"];

  const filtered = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "In Stock": return "badge-active";
      case "Low Stock": return "badge-pending";
      case "Out of Stock": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Inventory</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track and manage your store products</p>
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
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.625rem 1rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--db-border)",
            background: "var(--db-card-bg)",
            color: "var(--db-text)",
            width: "300px",
            outline: "none"
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.625rem 1rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--db-border)",
            background: "var(--db-card-bg)",
            color: "var(--db-text)",
            outline: "none"
          }}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Inventory Table */}
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                </td>
                <td>
                  <span style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)" }}>{item.category}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{item.stock} {item.unit}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(item.price)}</span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span>
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
                    Update
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
