import React from "react";
import styles from "@/app/page.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      {/* Brand Centerpiece */}
      <div className={styles.mainLogo}>
        <div style={{ background: "white", borderRadius: "50%", padding: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <img src="/brand.png" alt="Logo" style={{ width: "60px", height: "60px" }} />
        </div>
        <h1 className={styles.brandName}>Zaroorat<span>Kart</span></h1>
      </div>
      
      <p className={styles.tagline}>Har Zaroorat, Ek Hi Jagah.</p>

      {/* Feature Grid (4 Icons) */}
      <div className={styles.featureGrid}>
        <div className={styles.featureItem}>
          <div className={styles.iconCircle}>🥦</div>
          <p className={styles.featureTitle}>Fresh Products</p>
          <p className={styles.featureSub}>Best Quality</p>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.iconCircle}>🛵</div>
          <p className={styles.featureTitle}>Fast Delivery</p>
          <p className={styles.featureSub}>On Time</p>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.iconCircle}>📝</div>
          <p className={styles.featureTitle}>Easy Ordering</p>
          <p className={styles.featureSub}>Hassle Free</p>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.iconCircle}>🛡️</div>
          <p className={styles.featureTitle}>Trusted & Safe</p>
          <p className={styles.featureSub}>Always</p>
        </div>
      </div>

      {/* Delivery Bar */}
      <div className={styles.deliveryBar}>
        <div style={{ background: "#2c6e49", borderRadius: "50%", padding: "5px", color: "white", fontSize: "14px" }}>🛒</div>
        <p>Order Online, <span>We Deliver</span> at Your Doorstep!</p>
      </div>

      {/* Category Grid (5 Icons) */}
      <div className={styles.categoryGrid}>
        <div className={styles.categoryItem}>
          <div className={styles.catIcon}>🛒</div>
          <p className={styles.catName}>Grocery</p>
        </div>
        <div className={styles.categoryItem}>
          <div className={styles.catIcon}>🥛</div>
          <p className={styles.catName}>Daily Essentials</p>
        </div>
        <div className={styles.categoryItem}>
          <div className={styles.catIcon}>🍟</div>
          <p className={styles.catName}>Snacks & Beverages</p>
        </div>
        <div className={styles.categoryItem}>
          <div className={styles.catIcon}>🧼</div>
          <p className={styles.catName}>Personal Care</p>
        </div>
        <div className={styles.categoryItem}>
          <div className={styles.catIcon}>🍼</div>
          <p className={styles.catName}>Baby Care</p>
        </div>
      </div>
    </div>
  );
}