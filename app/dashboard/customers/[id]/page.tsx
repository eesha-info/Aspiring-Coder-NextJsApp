"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { customers, getTransactions, getPurchases, formatCurrency } from "@/app/data/mockData";
import "../../../styles/dashboard.css";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = Number(params.id);
  const customer = customers.find(c => c.id === customerId);
  const [activeTab, setActiveTab] = useState<"purchases" | "transactions">("purchases");

  if (!customer) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--db-text)" }}>Customer Not Found</h2>
        <Link href="/dashboard/customers" style={{ color: "var(--db-primary)", marginTop: "1rem", display: "inline-block" }}>← Back to Customers</Link>
      </div>
    );
  }

  const transactions = getTransactions(customerId);
  const purchases = getPurchases(customerId);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active": return "badge-active";
      case "Pending": return "badge-pending";
      case "Inactive": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/dashboard/customers" style={{ color: "var(--db-primary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
          ← Back to Customers
        </Link>
      </div>

      {/* Customer Header Card */}
      <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
        {/* Accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          {/* Left — Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "1rem",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "1.25rem", fontWeight: 700,
              boxShadow: "0 8px 24px rgba(79, 70, 229, 0.3)",
            }}>
              {customer.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--db-text)" }}>{customer.name}</h1>
              <p style={{ fontSize: "0.85rem", color: "var(--db-text-muted)", marginTop: "0.125rem" }}>{customer.email} · {customer.phone}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--db-text-muted)" }}>{customer.address}</p>
              <div style={{ marginTop: "0.5rem" }}>
                <span className={`badge ${getStatusClass(customer.status)}`}>{customer.status}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--db-text-muted)", marginLeft: "0.75rem" }}>Member since {customer.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Right — Quick Actions */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "transparent", color: "var(--db-text)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
              Edit
            </button>
            <button style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "none", background: "var(--db-primary)", color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)" }}>
              Record Payment
            </button>
          </div>
        </div>
      </div>

      {/* Stat Boxes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <StatBox label="Total Orders" value={customer.totalOrders.toString()} icon="🛒" color="#4f46e5" />
        <StatBox label="Total Spent" value={formatCurrency(customer.totalSpent)} icon="💰" color="#16a34a" />
        <StatBox label="Outstanding" value={customer.outstandingBalance > 0 ? formatCurrency(customer.outstandingBalance) : "₹0 ✓"} icon="⚠️" color={customer.outstandingBalance > 0 ? "#ef4444" : "#16a34a"} />
        <StatBox label="Last Payment" value={customer.recentPayment > 0 ? formatCurrency(customer.recentPayment) : "—"} subtext={customer.recentPaymentDate} icon="💳" color="#f59e0b" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem", background: "var(--db-card-bg)", borderRadius: "0.75rem", padding: "0.25rem", border: "1px solid var(--db-border)", width: "fit-content" }}>
        <TabButton label="Recent Purchases" active={activeTab === "purchases"} onClick={() => setActiveTab("purchases")} />
        <TabButton label="Transactions" active={activeTab === "transactions"} onClick={() => setActiveTab("transactions")} />
      </div>

      {/* Tab Content */}
      {activeTab === "purchases" ? (
        <div className="glass-card user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Items</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontSize: "0.85rem" }}>{p.date}</td>
                  <td style={{ fontSize: "0.85rem", maxWidth: "280px" }}>{p.items}</td>
                  <td><span style={{ fontWeight: 600 }}>{p.quantity}</span></td>
                  <td><span style={{ fontWeight: 700 }}>{formatCurrency(p.amount)}</span></td>
                  <td>
                    <span className={`badge ${p.status === "Delivered" ? "badge-active" : p.status === "Pending" ? "badge-pending" : "badge-inactive"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-card user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontSize: "0.85rem" }}>{t.date}</td>
                  <td>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "0.375rem",
                      padding: "0.2rem 0.625rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600,
                      background: t.type === "Payment" ? "rgba(34,197,94,0.1)" : t.type === "Refund" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)",
                      color: t.type === "Payment" ? "#16a34a" : t.type === "Refund" ? "#3b82f6" : "#ef4444",
                    }}>
                      {t.type === "Payment" ? "↓" : t.type === "Refund" ? "↩" : "↑"} {t.type}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>{t.description}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: t.type === "Payment" ? "#16a34a" : t.type === "Refund" ? "#3b82f6" : "#ef4444" }}>
                      {t.type === "Payment" || t.type === "Refund" ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td><span style={{ fontWeight: 600 }}>{formatCurrency(t.balance)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---- Sub Components ---- */

function StatBox({ label, value, icon, color, subtext }: {
  label: string; value: string; icon: string; color: string; subtext?: string;
}) {
  return (
    <div className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "0.75rem",
        background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.25rem", flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ fontSize: "1.25rem", fontWeight: 800, color, marginTop: "0.125rem" }}>{value}</p>
        {subtext && <p style={{ fontSize: "0.65rem", color: "var(--db-text-muted)" }}>{subtext}</p>}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1.25rem",
        borderRadius: "0.5rem",
        border: "none",
        background: active ? "var(--db-primary)" : "transparent",
        color: active ? "white" : "var(--db-text-muted)",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}
