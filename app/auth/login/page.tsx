"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../styles/auth.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name] || errors.auth) {
      setErrors({
        ...errors,
        [e.target.name]: "",
        auth: "",
      });
    }
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.username.trim()) newErrors.username = "Username is required!";
    if (!formData.password.trim()) newErrors.password = "Password is required!";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.username === "eesha" && formData.password === "eesha@123") {
        router.push("/dashboard");
      } else {
        setErrors({
          ...errors,
          auth: "Invalid username or password!"
        });
      }
    }
  };

  return (
    <>
      {/* ✅ Top Left Brand / Home Link */}
      <div className="top-header">
        <Link href="/" className="brand-home" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", overflow: "hidden", border: "1.5px solid var(--db-primary)" }}>
            <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          ZarooratKart
        </Link>
      </div>

      {/* ✅ Login Container */}
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", overflow: "hidden", border: "4px solid #fff", marginBottom: "0.75rem" }}>
              <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h1 className="brand">Store Login</h1>
            <p style={{ color: "#a3e635", fontSize: "0.9rem", fontWeight: "600", marginTop: "-5px" }}>Store Manager Access</p>
          </div>

          <p className="tagline">
            Manage your ZarooratKart inventory and sales with ease.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter store manager username"
                className={errors.username ? "error-input" : ""}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className={errors.password ? "error-input" : ""}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {errors.auth && (
              <p className="error-message" style={{ textAlign: "center", marginBottom: "1rem", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "6px" }}>
                {errors.auth}
              </p>
            )}

            <button type="submit" className="auth-btn">
              Login to Store
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;