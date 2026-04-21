"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <>
      {/* ✅ Top Left Brand / Home Link */}
      <div className="top-header">
        <Link href="/" className="brand-home">
          {"</>"} TheAspiringCoder
        </Link>
      </div>

      {/* ✅ Login Container */}
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="brand">TheAspiringCoder</h1>

          <p className="tagline">
            Every Expert Was Once an Aspiring Coder.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>

          <p className="footer-text">
            Don’t have an account?{" "}
            <Link href="/auth/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;