"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getOrderById, formatCurrency, getPurchases } from "@/app/data/mockData";
import "../../../styles/dashboard.css";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const order = getOrderById(orderId);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [status, setStatus] = useState(order?.status);

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Order Not Found</h2>
        <Link href="/dashboard/orders" style={{ color: "var(--db-primary)" }}>Back to Orders</Link>
      </div>
    );
  }

  // Reuse getPurchases to simulate items in the order
  const orderItems = getPurchases(order.customerId).slice(0, order.totalItems);

  const handleCompleteOrder = () => {
    setCompleteLoading(true);
    // Simulate process
    setTimeout(() => {
      setStatus("Completed");
      setCompleteLoading(false);
      // In a real app, this would trigger an API call to move to sales
    }, 1200);
  };

  const getStatusClass = (s: string) => {
    switch (s) {
      case "Completed": return "badge-active";
      case "Pending":
      case "Processing": return "badge-pending";
      case "Cancelled": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/dashboard/orders" style={{ color: "var(--db-primary)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
          ← Back to Orders
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Order #{order.id}</h1>
            <span className={`badge ${getStatusClass(status || "Pending")}`}>{status}</span>
          </div>
          <p style={{ color: "var(--db-text-muted)", marginTop: "0.25rem" }}>Placed on {order.date} by <strong>{order.customerName}</strong></p>
        </div>

        {status !== "Completed" && status !== "Cancelled" && (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => setStatus("Cancelled")}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "0.625rem",
                border: "1px solid var(--db-border)",
                background: "transparent",
                color: "var(--db-text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Cancel Order
            </button>
            <button
              onClick={handleCompleteOrder}
              disabled={completeLoading}
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
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              {completeLoading ? "Processing..." : "Complete & Create Sale"}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Items Table */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>Order Items</h3>
          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, idx) => (
                  <tr key={idx}>
                    <td><span style={{ fontWeight: 600 }}>{item.items.split("(")[0]}</span></td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.amount / item.quantity)}</td>
                    <td><span style={{ fontWeight: 600 }}>{formatCurrency(item.amount)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>Summary</h3>
            <div style={{ spaceY: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--db-text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                <span>Subtotal</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--db-text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div style={{ height: "1px", background: "var(--db-border)", margin: "1rem 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.125rem", fontWeight: 800, color: "var(--db-text)" }}>
                <span>Total</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.75rem" }}>Shipping Info</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--db-text-main)", fontWeight: 600 }}>Home Delivery</p>
            <p style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)", marginTop: "0.25rem" }}>Contact: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
