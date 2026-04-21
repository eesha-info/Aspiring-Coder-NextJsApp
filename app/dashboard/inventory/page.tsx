"use client";

import React, { useState } from "react";
import { inventory as initialInventory, formatCurrency, InventoryItem } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplenishOpen, setIsReplenishOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [replenishAmount, setReplenishAmount] = useState(0);

  // Form State for New Product
  const [formData, setFormData] = useState({
    name: "",
    category: "Grains" as InventoryItem["category"],
    stock: 0,
    unit: "kg",
    price: 0
  });

  const categories = ["All", "Dairy", "Grains", "Produce", "Snacks", "Beverages", "Household"];

  const filtered = inventoryList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const getStatus = (stock: number): InventoryItem["status"] => {
    if (stock <= 0) return "Out of Stock";
    if (stock < 20) return "Low Stock";
    return "In Stock";
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "In Stock": return "badge-active";
      case "Low Stock": return "badge-pending";
      case "Out of Stock": return "badge-inactive";
      default: return "";
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newProduct: InventoryItem = {
      id: inventoryList.length + 1,
      name: formData.name,
      category: formData.category,
      stock: formData.stock,
      unit: formData.unit,
      price: formData.price,
      status: getStatus(formData.stock)
    };

    setInventoryList([newProduct, ...inventoryList]);
    setIsModalOpen(false);
    setFormData({ name: "", category: "Grains", stock: 0, unit: "kg", price: 0 });
  };

  const handleQuickReplenish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || replenishAmount <= 0) return;

    const updatedList = inventoryList.map(item => {
      if (item.id === selectedItem.id) {
        const newStock = item.stock + replenishAmount;
        return { ...item, stock: newStock, status: getStatus(newStock) };
      }
      return item;
    });

    setInventoryList(updatedList);
    setIsReplenishOpen(false);
    setReplenishAmount(0);
    setSelectedItem(null);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Inventory</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track and manage your store products</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
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
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button 
                      onClick={() => { setSelectedItem(item); setIsReplenishOpen(true); }}
                      style={{
                        padding: "0.35rem 0.875rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--db-primary)",
                        background: "var(--db-primary-bg)",
                        color: "var(--db-primary)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}>
                      Stock In
                    </button>
                    <button style={{
                      padding: "0.35rem 0.875rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--db-border)",
                      background: "transparent",
                      color: "var(--db-text-muted)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "2rem", maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "none", color: "var(--db-text-muted)", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
            </div>
            <form onSubmit={handleAddProduct}>
              {/* Product fields... (rest of the form remains same) */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Product Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} style={inputStyle}>
                  {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Initial Stock</label>
                  <input required type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={cancelBtnStyle}>Cancel</button>
                <button type="submit" style={primaryBtnStyle}>Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Replenish Modal */}
      {isReplenishOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "2rem", maxWidth: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Stock In</h2>
              <button onClick={() => setIsReplenishOpen(false)} style={{ background: "transparent", border: "none", color: "var(--db-text-muted)", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--db-text-muted)", marginBottom: "1.5rem" }}>
              Replenishing stock for: <strong style={{ color: "var(--db-text)" }}>{selectedItem.name}</strong>
            </p>
            <form onSubmit={handleQuickReplenish}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>QUANTITY TO ADD ({selectedItem.unit})</label>
                <input
                  required
                  autoFocus
                  type="number"
                  placeholder="Enter amount..."
                  value={replenishAmount || ""}
                  onChange={(e) => setReplenishAmount(Number(e.target.value))}
                  style={{ ...inputStyle, fontSize: "1.25rem", textAlign: "center", fontWeight: 700 }}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsReplenishOpen(false)} style={cancelBtnStyle}>Cancel</button>
                <button type="submit" style={primaryBtnStyle}>Update Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" as any };
const inputStyle = { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)", outline: "none" };
const primaryBtnStyle = { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--db-primary)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" };
const cancelBtnStyle = { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "transparent", color: "var(--db-text)", fontWeight: 600, cursor: "pointer" };
