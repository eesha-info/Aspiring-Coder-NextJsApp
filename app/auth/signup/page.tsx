"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../../styles/auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };


  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid!";
    if (!formData.password.trim()) newErrors.password = "Password is required!";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters!";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup Data:", formData);
      // Proceed with signup logic
    }
  };

  return (
    <>
      {/* ✅ Top Left Brand Home */}
      <div className="top-header">
        <Link href="/" className="brand-home" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", overflow: "hidden", border: "1.5px solid var(--db-primary)" }}>
            <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          ZarooratKart
        </Link>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", overflow: "hidden", border: "4px solid #fff", marginBottom: "0.75rem" }}>
              <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h1 className="brand">ZarooratKart</h1>
          </div>

          <p className="tagline">
            Join the premium store management experience.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={errors.name ? "error-input" : ""}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={errors.email ? "error-input" : ""}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                className={errors.password ? "error-input" : ""}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <button type="submit" className="auth-btn">
              Sign Up
            </button>
          </form>

          <p className="footer-text">
            Already have an account?{" "}
            <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;