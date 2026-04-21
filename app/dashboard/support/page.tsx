"use client";

import React, { useState } from "react";
import "../../styles/dashboard.css";

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    { q: "How do I add a new product?", a: "Go to the Inventory page and click the '+ Add Product' button in the top right corner." },
    { q: "Can I export my sales reports?", a: "Yes, you can generate and download PDF reports from the Reports module." },
    { q: "How do I update customer balances?", a: "You can view customer details from the Customers page and manage their transactions directly." },
    { q: "Is ZarooratKart mobile friendly?", a: "Absolutely! The dashboard is fully responsive and works on all devices." },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--db-text)" }}>Support Center</h1>
        <p style={{ color: "var(--db-text-muted)", fontSize: "0.9rem" }}>We're here to help you manage your store efficiently</p>
      </div>

      {/* Support Channels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
        <SupportCard 
          icon="📧" 
          title="Email Support" 
          detail="support@zarooratkart.com" 
          desc="Response time: < 2 Hours"
        />
        <SupportCard 
          icon="📱" 
          title="Phone Support" 
          detail="+91 800 123 4567" 
          desc="Mon-Sat, 9AM to 8PM"
        />
        <SupportCard 
          icon="💬" 
          title="Live Chat" 
          detail="Chat with Experts" 
          desc="Available 24/7 for Enterprise"
        />
        <SupportCard 
          icon="📍" 
          title="Office Address" 
          detail="Maheshua, Madhepura" 
          desc="Ward No - 14, Bihar - 852128"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2.5rem" }}>
        {/* Contact Form */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Send us a message</h2>
          
          {submitted ? (
            <div style={{ padding: "2rem", textAlign: "center", background: "var(--db-primary-bg)", borderRadius: "1rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "var(--db-primary)", fontWeight: 700 }}>Message Sent!</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)", marginTop: "0.5rem" }}>Our support team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>YOUR NAME</label>
                  <input 
                    required 
                    className="support-input" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <input 
                    required 
                    type="email" 
                    className="support-input" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>SUBJECT</label>
                <input 
                  required 
                  className="support-input" 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>MESSAGE</label>
                <textarea 
                  required 
                  rows={4} 
                  className="support-input" 
                  style={{ resize: "none" }}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button className="support-btn">Submit Ticket</button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--db-primary)" }}>{faq.q}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--db-text-secondary)", lineHeight: "1.5" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .support-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.625rem;
          border: 1px solid var(--db-border);
          background: var(--db-bg);
          color: var(--db-text);
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .support-input:focus {
          border-color: var(--db-primary);
        }
        .support-btn {
          width: 100%;
          padding: 0.875rem;
          border-radius: 0.75rem;
          background: var(--db-primary);
          color: white;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "var(--db-text-muted)",
  marginBottom: "0.5rem",
  letterSpacing: "0.04em"
};

function SupportCard({ icon, title, detail, desc }: { icon: string; title: string; detail: string; desc: string }) {
  return (
    <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "0.25rem" }}>{title}</h3>
      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--db-primary)", marginBottom: "0.5rem" }}>{detail}</p>
      <p style={{ fontSize: "0.75rem", color: "var(--db-text-muted)" }}>{desc}</p>
    </div>
  );
}
