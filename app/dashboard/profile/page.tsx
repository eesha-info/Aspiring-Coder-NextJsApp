"use client";

import React from "react";
import Link from "next/link";
import { currentUser, formatCurrency, bills, orders } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function ProfilePage() {
  const userInitials = currentUser.name.split(" ").map(n => n[0]).join("");
  
  // Simulated stats
  const activityStats = [
    { label: "Orders Handled", value: "148", color: "#4f46e5" },
    { label: "New Customers", value: "12", color: "#16a34a" },
    { label: "Bills Generated", value: bills.length, color: "#f59e0b" },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>User Profile</h1>
        <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Manage your personal information and account settings</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "2rem", alignItems: "start" }}>
        {/* Left Column: Avatar & Main Info */}
        <div className="glass-card" style={{ padding: "2.5rem", textAlign: "center" }}>
          <div style={{
            width: "100px", height: "100px", borderRadius: "2rem",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "2.25rem", fontWeight: 800, margin: "0 auto 1.5rem",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)"
          }}>
            {userInitials}
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>{currentUser.name}</h2>
          <div style={{
            display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "999px",
            background: "var(--db-primary-bg)", color: "var(--db-primary)",
            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.5rem"
          }}>
            {currentUser.role}
          </div>
          
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--db-text-muted)" }}>📧</div>
              <div style={{ fontSize: "0.9rem" }}>{currentUser.email}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--db-text-muted)" }}>📱</div>
              <div style={{ fontSize: "0.9rem" }}>{currentUser.phone}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--db-text-muted)" }}>📅</div>
              <div style={{ fontSize: "0.9rem" }}>Joined {new Date(currentUser.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--db-border)" }}>
            <Link 
              href="/"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", padding: "0.875rem", borderRadius: "0.75rem",
                background: "#ef4444", color: "white", textDecoration: "none",
                fontWeight: 700, fontSize: "0.9rem", transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out From ZarooratKart
            </Link>
          </div>
        </div>

        {/* Right Column: Details & Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {activityStats.map(stat => (
              <div key={stat.label} className="glass-card" style={{ padding: "1.25rem", borderLeft: `4px solid ${stat.color}` }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{stat.label}</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 800 }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Settings Section */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem" }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", marginBottom: "0.5rem" }}>FIRST NAME</label>
                <input readOnly value="MD" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-bg)" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", marginBottom: "0.5rem" }}>LAST NAME</label>
                <input readOnly value="Eesha" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-bg)" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--db-text-muted)", marginBottom: "0.5rem" }}>HOME ADDRESS</label>
                <input readOnly value="Sector 5, Salt Lake City, Kolkata, WB" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--db-border)", background: "var(--db-bg)" }} />
              </div>
            </div>
            
            <button style={{ 
              marginTop: "2rem", padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
              background: "var(--db-primary)", color: "white", border: "none",
              fontWeight: 700, fontSize: "0.85rem", cursor: "not-allowed", opacity: 0.8
            }}>
              Update Details
            </button>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>System Preferences</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid var(--db-border)" }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email Notifications</p>
                <p style={{ fontSize: "0.75rem", color: "var(--db-text-muted)" }}>Receive daily sales summaries via email</p>
              </div>
              <div style={{ width: "40px", height: "20px", background: "var(--db-primary)", borderRadius: "10px", position: "relative" }}>
                <div style={{ position: "absolute", right: "2px", top: "2px", width: "16px", height: "16px", background: "white", borderRadius: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
