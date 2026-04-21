"use client";

import React, { useState } from "react";
import { notifications as initialNotifications } from "@/app/data/mockData";
import "../../styles/dashboard.css";

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);

  const markAllRead = () => {
    // In a real app, this would update a 'read' status in the DB
    alert("All notifications marked as read!");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return "🛒";
      case 'stock': return "⚠️";
      case 'payment': return "💰";
      case 'user': return "👤";
      case 'report': return "📊";
      default: return "🔔";
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>All Notifications</h1>
          <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>Keep track of all activity in your ZarooratKart dashboard</p>
        </div>
        <button 
          onClick={markAllRead}
          style={{
            padding: "0.625rem 1.25rem",
            borderRadius: "0.75rem",
            background: "var(--db-primary-bg)",
            color: "var(--db-primary)",
            border: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.2s"
          }}>
          Mark all as read
        </button>
      </div>

      <div className="glass-card" style={{ padding: "0.5rem" }}>
        {notifs.map((notif, index) => (
          <div 
            key={notif.id} 
            style={{ 
              display: "flex", 
              gap: "1.25rem", 
              padding: "1.5rem", 
              borderBottom: index === notifs.length - 1 ? "none" : "1px solid var(--db-border)",
              transition: "background 0.2s",
              cursor: "pointer",
              borderRadius: index === 0 ? "0.75rem 0.75rem 0 0" : (index === notifs.length - 1 ? "0 0 0.75rem 0.75rem" : "0")
            }}
            className="notification-list-item"
          >
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "12px", 
              background: "var(--db-primary-bg)", 
              color: "var(--db-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0
            }}>
              {getIcon(notif.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>{notif.title}</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--db-text-muted)" }}>{notif.time}</span>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--db-text-secondary)", lineHeight: "1.5" }}>{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .notification-list-item:hover {
          background: var(--db-item-hover);
        }
      `}</style>
    </div>
  );
}
