"use client";

import React, { useState, useMemo } from "react";
import { bills as initialBills, formatCurrency, customers, Bill } from "@/app/data/mockData";
import "../../styles/dashboard.css";

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function BillingPage() {
  const [filter, setFilter] = useState("All");
  const [billsList, setBillsList] = useState<Bill[]>(initialBills);
  
  // Modal states
  const [showGenModal, setShowGenModal] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState<Bill | null>(null);

  // Form states
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: Date.now(), name: "", quantity: 1, price: 0 }
  ]);

  const filtered = billsList.filter(b => filter === "All" || b.status === filter);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid": return "badge-active";
      case "Unpaid": return "badge-pending";
      case "Overdue": return "badge-inactive";
      default: return "";
    }
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleAddRow = () => {
    setInvoiceItems([...invoiceItems, { id: Date.now(), name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveRow = (id: number) => {
    setInvoiceItems(invoiceItems.filter(i => i.id !== id));
  };

  const handleItemChange = (id: number, field: keyof InvoiceItem, value: any) => {
    setInvoiceItems(invoiceItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleGenerateInvoice = () => {
    if (!selectedCustomer || !dueDate) {
      alert("Please select a customer and due date");
      return;
    }

    const newBill: Bill = {
      id: 2000 + billsList.length + 1,
      customerName: selectedCustomer,
      date: new Date().toISOString().split('T')[0],
      dueDate: dueDate,
      amount: calculateTotal(),
      status: "Unpaid"
    };

    setBillsList([newBill, ...billsList]);
    setShowGenModal(false);
    
    // Reset form
    setSelectedCustomer("");
    setDueDate("");
    setInvoiceItems([{ id: Date.now(), name: "", quantity: 1, price: 0 }]);
  };

  const handlePrintRequest = (bill: Bill) => {
    setActiveInvoice(bill);
    setShowPrintPreview(true);
    // Use a short delay to ensure React has rendered the hidden print-only content
    setTimeout(() => {
      window.print();
      // After the print dialog is closed (or printing is done), 
      // we can hide the component again if we want, 
      // though 'display: none' already handles visibility.
      setShowPrintPreview(false);
    }, 500);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Invoices & Billing</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Manage customer invoices and track payment statuses</p>
        </div>
        <button 
          onClick={() => setShowGenModal(true)}
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
          + Generate Invoice
        </button>
      </div>

      {/* Tabs */}
      <div className="no-print" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--db-card-bg)", padding: "0.25rem", borderRadius: "0.75rem", width: "fit-content", border: "1px solid var(--db-border)" }}>
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
      <div className="glass-card user-table-container no-print">
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
                  <button 
                    onClick={() => handlePrintRequest(b)}
                    style={{
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

      {/* Generate Invoice Modal */}
      {showGenModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Generate New Invoice</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--db-text-muted)" }}>Select Customer</label>
                <select 
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)" }}>
                  <option value="">Choose a customer...</option>
                  {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--db-text-muted)" }}>Due Date</label>
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)" }} />
              </div>
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Invoice Items</h3>
            {invoiceItems.map((item, idx) => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
                <div style={{ flex: 2 }}>
                  <input 
                    placeholder="Item Name" 
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    placeholder="Qty" 
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)" }} />
                </div>
                <div style={{ flex: 1.5 }}>
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, "price", Number(e.target.value))}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-card-bg)", color: "var(--db-text)" }} />
                </div>
                <button 
                  onClick={() => handleRemoveRow(item.id)}
                  style={{ padding: "0.75rem", color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>
                  ×
                </button>
              </div>
            ))}

            <button 
              onClick={handleAddRow}
              style={{ color: "var(--db-primary)", fontWeight: 700, background: "transparent", border: "none", cursor: "pointer", marginBottom: "2rem" }}>
              + Add Item
            </button>

            <div style={{ borderTop: "1px solid var(--db-border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>Total: {formatCurrency(calculateTotal())}</div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => setShowGenModal(false)}
                  style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "transparent", color: "var(--db-text)", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateInvoice}
                  style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "var(--db-primary)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>
                  Generate & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview Component (Hidden on screen, shown in print) */}
      {showPrintPreview && activeInvoice && (
        <div className="print-only">
          <div className="invoice-document">
            <div className="invoice-header">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", border: "3px solid #4f46e5" }}>
                    <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h1 style={{ color: "#4f46e5", fontSize: "2.5rem", margin: 0 }}>ZarooratKart</h1>
                </div>
                <p>Maheshua Ward No - 14, Madhepura Bihar - 852128</p>
                <p>GSTIN: 22AAAAA0000A1Z5</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>INVOICE</h2>
                <p><strong>#INV-{activeInvoice.id}</strong></p>
                <p>Date: {activeInvoice.date}</p>
              </div>
            </div>

            <div style={{ marginBottom: "3rem" }}>
              <p style={{ color: "#666", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Bill To:</p>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{activeInvoice.customerName}</h3>
              <p>Customer ID: #CUST-{initialBills.findIndex(b => b.customerName === activeInvoice.customerName) + 101}</p>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Mocking items for the print-only view since existing bills don't have item breakdown */}
                <tr>
                  <td>Grocery Supplies - Monthly Subscription</td>
                  <td>1</td>
                  <td>{formatCurrency(activeInvoice.amount)}</td>
                  <td style={{ textAlign: "right" }}>{formatCurrency(activeInvoice.amount)}</td>
                </tr>
              </tbody>
            </table>

            <div className="invoice-total-section">
              <table className="invoice-total-table">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td style={{ textAlign: "right" }}>{formatCurrency(activeInvoice.amount)}</td>
                  </tr>
                  <tr>
                    <td>Tax (0%)</td>
                    <td style={{ textAlign: "right" }}>₹0.00</td>
                  </tr>
                  <tr style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                    <td style={{ paddingTop: "1rem" }}>Total</td>
                    <td style={{ textAlign: "right", paddingTop: "1rem", color: "#4f46e5" }}>{formatCurrency(activeInvoice.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "3rem" }}>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Payment Status: <strong>{activeInvoice.status}</strong></p>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Due Date: {activeInvoice.dueDate}</p>
            </div>

            <div className="invoice-footer">
              <p>Thank you for your business!</p>
              <p>This is a computer generated invoice and does not require a signature.</p>
            </div>
            
            <button 
              className="no-print" 
              onClick={() => setShowPrintPreview(false)}
              style={{ position: "fixed", top: "20px", right: "20px", padding: "1rem 2rem", background: "black", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700 }}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
