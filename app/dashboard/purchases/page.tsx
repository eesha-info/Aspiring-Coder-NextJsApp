"use client";

import React, { useState, useMemo } from "react";
import { purchaseOrders as initialPurchases, formatCurrency, PurchaseOrder, suppliers } from "@/app/data/mockData";
import "../../styles/dashboard.css";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(initialPurchases);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseOrder | null>(null);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);
  const [receiving, setReceiving] = useState(false);

  // New Purchase Order Form State
  const [newPO, setNewPO] = useState({
    supplierId: suppliers[0]?.id || 0,
    items: [{ name: "", quantity: 1, price: 0 }] as OrderItem[]
  });

  const orderTotal = useMemo(() => {
    return newPO.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }, [newPO.items]);

  const handleAddItem = () => {
    setNewPO({
      ...newPO,
      items: [...newPO.items, { name: "", quantity: 1, price: 0 }]
    });
  };

  const handleRemoveItem = (index: number) => {
    if (newPO.items.length <= 1) return;
    const items = [...newPO.items];
    items.splice(index, 1);
    setNewPO({ ...newPO, items });
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const items = [...newPO.items];
    items[index] = { ...items[index], [field]: value };
    setNewPO({ ...newPO, items });
  };

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier = suppliers.find(s => s.id === Number(newPO.supplierId));
    if (!supplier) return;

    const itemsSummary = newPO.items
      .map(item => `${item.name} (${item.quantity})`)
      .join(", ");

    const newOrder: PurchaseOrder = {
      id: purchases.length + 801, // Simple ID gen
      supplierId: supplier.id,
      supplierName: supplier.name,
      date: new Date().toISOString().split('T')[0],
      items: itemsSummary,
      amount: orderTotal,
      status: "Ordered"
    };

    setPurchases([newOrder, ...purchases]);
    setIsNewPOOpen(false);
    setNewPO({ supplierId: suppliers[0]?.id || 0, items: [{ name: "", quantity: 1, price: 0 }] });
  };

  const handleReceive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPurchase) return;

    setReceiving(true);
    
    // Simulate API call and stock sync
    setTimeout(() => {
      const updated = purchases.map(p => 
        p.id === selectedPurchase.id ? { ...p, status: "Received" as const } : p
      );
      setPurchases(updated);
      setIsReceiveOpen(false);
      setReceiving(false);
      setSelectedPurchase(null);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Purchases & Procurement</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Track stock orders and arrivals from your suppliers</p>
        </div>
        <button 
          onClick={() => setIsNewPOOpen(true)}
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
          + New Purchase Order
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase" }}>Total Procurement</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)", marginTop: "0.25rem" }}>
            {formatCurrency(purchases.reduce((s, p) => s + p.amount, 0))}
          </p>
        </div>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase" }}>Pending Orders</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b", marginTop: "0.25rem" }}>
            {purchases.filter(p => p.status === "Ordered").length}
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
            {purchases.map((p) => (
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
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {p.status === "Ordered" && (
                      <button 
                        onClick={() => { setSelectedPurchase(p); setIsReceiveOpen(true); }}
                        style={{
                          padding: "0.35rem 0.875rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          background: "var(--db-primary)",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}>
                        Receive
                      </button>
                    )}
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
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Purchase Order Modal */}
      {isNewPOOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "2rem", maxWidth: "800px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Create New Purchase Order</h2>
              <button onClick={() => setIsNewPOOpen(false)} style={{ background: "transparent", border: "none", color: "var(--db-text-muted)", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
            </div>

            <form onSubmit={handleCreatePO}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>SELECT SUPPLIER</label>
                <select 
                  required
                  value={newPO.supplierId}
                  onChange={(e) => setNewPO({ ...newPO, supplierId: Number(e.target.value) })}
                  style={inputStyle}>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.category})</option>)}
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>ORDER ITEMS</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {newPO.items.map((item, index) => (
                    <div key={index} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 40px", gap: "0.75rem", alignItems: "center" }}>
                      <input 
                        required
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        style={inputStyle} 
                      />
                      <input 
                        required
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                        style={inputStyle} 
                      />
                      <input 
                        required
                        type="number"
                        placeholder="Unit Price"
                        value={item.price || ""}
                        onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                        style={inputStyle} 
                      />
                      <button 
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        style={{ 
                          background: "transparent", border: "none", color: "#ef4444", 
                          fontSize: "1.25rem", cursor: "pointer", display: "flex", 
                          alignItems: "center", justifyContent: "center" 
                        }}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={handleAddItem}
                  style={{ 
                    marginTop: "1rem", background: "transparent", border: "1px dashed var(--db-border)", 
                    padding: "0.5rem", borderRadius: "0.5rem", width: "100%", color: "var(--db-primary)", 
                    fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" 
                  }}>
                  + Add Another Item
                </button>
              </div>

              <div style={{ 
                marginTop: "2rem", paddingTop: "1.5rem", borderTop: "2px solid var(--db-border)", 
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)" }}>ORDER TOTAL</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)" }}>{formatCurrency(orderTotal)}</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="button" onClick={() => setIsNewPOOpen(false)} style={cancelBtnStyle}>Cancel</button>
                  <button type="submit" style={primaryBtnStyle}>Draft Purchase Order</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {isReceiveOpen && selectedPurchase && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "2rem", maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Confirm Receipt</h2>
              <button 
                onClick={() => setIsReceiveOpen(false)}
                disabled={receiving}
                style={{ background: "transparent", border: "none", color: "var(--db-text-muted)", cursor: "pointer", fontSize: "1.5rem" }}>
                ×
              </button>
            </div>

            <div className="glass-card" style={{ padding: "1.25rem", marginBottom: "1.5rem", background: "var(--db-primary-bg)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--db-primary)", textTransform: "uppercase" }}>ORDER DETAILS</p>
              <h3 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{selectedPurchase.supplierName}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)" }}>{selectedPurchase.items}</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Total Value:</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 800 }}>{formatCurrency(selectedPurchase.amount)}</span>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)", lineHeight: "1.6" }}>
                By confirming, you verify that the physical stock has been received and matches the order quantity. 
                <strong style={{ color: "var(--db-text)" }}> This will automatically update your inventory levels.</strong>
              </p>
            </div>

            <form onSubmit={handleReceive}>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  disabled={receiving}
                  onClick={() => setIsReceiveOpen(false)} 
                  style={cancelBtnStyle}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={receiving}
                  style={primaryBtnStyle}>
                  {receiving ? "Processing..." : "Confirm & Receive Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "0.7rem", fontWeight: 700, color: "var(--db-text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" as any, letterSpacing: "0.04em" };
const inputStyle = { width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)", outline: "none" };
const primaryBtnStyle = { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--db-primary)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" };
const cancelBtnStyle = { padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "transparent", color: "var(--db-text)", fontWeight: 600, cursor: "pointer" };
