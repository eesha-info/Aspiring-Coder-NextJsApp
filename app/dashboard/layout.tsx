"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notifications, currentUser } from "@/app/data/mockData";
import "../styles/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`dashboard-root ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${sidebarOpen ? "sidebar-mobile-open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo-icon" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", overflow: "hidden", border: "2px solid var(--db-primary)" }}>
              <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {!collapsed && <span className="sidebar-logo-text">ZarooratKart</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {collapsed ? (
                <polyline points="9 18 15 12 9 6" />
              ) : (
                <polyline points="15 18 9 12 15 6" />
              )}
            </svg>
          </button>
        </div>

        {/* Main Nav */}
        <nav className="sidebar-nav">
          <SidebarItem
            href="/dashboard"
            label="Dashboard"
            collapsed={collapsed}
            active={pathname === "/dashboard"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/inventory"
            label="Inventory"
            collapsed={collapsed}
            active={pathname === "/dashboard/inventory"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/sales"
            label="Sales"
            collapsed={collapsed}
            active={pathname === "/dashboard/sales"}
            hasDropdown
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/orders"
            label="Orders"
            collapsed={collapsed}
            active={pathname.startsWith("/dashboard/orders")}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/purchases"
            label="Purchases"
            collapsed={collapsed}
            active={pathname === "/dashboard/purchases"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/customers"
            label="Customers"
            collapsed={collapsed}
            active={pathname.startsWith("/dashboard/customers")}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/suppliers"
            label="Suppliers"
            collapsed={collapsed}
            active={pathname === "/dashboard/suppliers"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/billing"
            label="Billing"
            collapsed={collapsed}
            active={pathname === "/dashboard/billing"}
            hasDropdown
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/reports"
            label="Reports"
            collapsed={collapsed}
            active={pathname === "/dashboard/reports"}
            hasDropdown
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
          />
        </nav>

        {/* Bottom Nav */}
        <div className="sidebar-bottom">
          <div className="sidebar-bottom-divider" />
          <SidebarItem
            href="/dashboard/support"
            label="Support"
            collapsed={collapsed}
            active={pathname === "/dashboard/support"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
              </svg>
            }
          />
          <SidebarItem
            href="/dashboard/settings"
            label="Settings"
            collapsed={collapsed}
            active={pathname === "/dashboard/settings"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            }
          />

          {/* Theme Toggle */}
          <div className="theme-toggle-wrapper">
            {!collapsed && <span className="theme-toggle-label">Light</span>}
            <button
              className={`theme-toggle ${darkMode ? "theme-toggle-dark" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-knob">
                {darkMode ? "🌙" : "☀️"}
              </span>
            </button>
            {!collapsed && <span className="theme-toggle-label">Dark</span>}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="header-search">
            <svg className="header-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search products, orders, customers..." className="header-search-input" />
          </div>

          <div className="header-actions">
            <div style={{ position: "relative" }} ref={notificationRef}>
              <button 
                className={`header-icon-btn ${notificationsOpen ? "header-icon-btn-active" : ""}`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <div style={{ 
                  position: "absolute", top: "4px", right: "4px", 
                  width: "16px", height: "16px", borderRadius: "50%", 
                  background: "#ef4444", color: "white", fontSize: "10px", 
                  fontWeight: 800, display: "flex", alignItems: "center", 
                  justifyContent: "center", border: "2px solid var(--db-header-bg)",
                  zIndex: 10
                }}>
                  {notifications.length}
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      style={{ background: "transparent", border: "none", color: "var(--db-text-muted)", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700 }}>
                      Mark all as read
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="notification-item">
                        <div className="notification-icon" style={{ background: "var(--db-primary-bg)", color: "var(--db-primary)" }}>
                          {notif.type === 'order' && "🛒"}
                          {notif.type === 'stock' && "⚠️"}
                          {notif.type === 'payment' && "💰"}
                          {notif.type === 'user' && "👤"}
                          {notif.type === 'report' && "📊"}
                        </div>
                        <div className="notification-content">
                          <p className="notification-title">{notif.title}</p>
                          <p className="notification-msg">{notif.message}</p>
                          <p className="notification-time">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "0.75rem", textAlign: "center", borderTop: "1px solid var(--db-border)" }}>
                    <Link 
                      href="/dashboard/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      style={{ background: "transparent", border: "none", color: "var(--db-primary)", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="header-divider" />
            
            <Link href="/dashboard/profile" style={{ textDecoration: "none" }}>
              <div className="header-user">
                <div className="header-user-info">
                  <span className="header-user-name">{currentUser.name}</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--db-text-muted)", textTransform: "uppercase" }}>View Profile</span>
                </div>
                <div className="header-user-avatar">{currentUser.avatar}</div>
              </div>
            </Link>
          </div>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  collapsed,
  active = false,
  hasDropdown = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  hasDropdown?: boolean;
}) {
  return (
    <Link href={href} className={`sidebar-item ${active ? "sidebar-item-active" : ""}`} title={collapsed ? label : undefined}>
      <span className="sidebar-item-icon">{icon}</span>
      {!collapsed && (
        <>
          <span className="sidebar-item-label">{label}</span>
          {hasDropdown && (
            <svg className="sidebar-item-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </>
      )}
    </Link>
  );
}
