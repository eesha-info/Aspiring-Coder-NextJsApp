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

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <>
      {/* ✅ Top Left Brand Home */}
      <div className="top-header">
        <Link href="/" className="brand-home">
          {"</>"} TheAspiringCoder
        </Link>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <h1 className="brand">TheAspiringCoder</h1>
          <p className="tagline">
            Every Expert Was Once an Aspiring Coder.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
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