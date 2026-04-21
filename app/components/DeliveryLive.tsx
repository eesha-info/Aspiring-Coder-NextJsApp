import styles from "@/app/page.module.css";

export default function DeliveryLive() {
  return (
    <section id="contact" className={styles.deliverySection}>
      <div className={styles.deliveryInfo}>
        <h2>Real-time <br/> Delivery Map</h2>
        <p>
          Experience precise delivery tracking. Our advanced logistics 
          system gives you exact updates on your order's journey from 
          our premium stores to your doorstep.
        </p>
        <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
          <div>
             <h4 style={{ color: "#2c6e49", fontSize: "24px", fontWeight: "800" }}>30m</h4>
             <p style={{ fontSize: "13px", color: "#666", fontWeight: "600" }}>Delivery Time</p>
          </div>
          <div>
             <h4 style={{ color: "#4285F4", fontSize: "24px", fontWeight: "800" }}>Live</h4>
             <p style={{ fontSize: "13px", color: "#666", fontWeight: "600" }}>Tracking Updates</p>
          </div>
        </div>
      </div>

      <div className={styles.mapContainer}>
        {/* Map Overlay for depth */}
        <div className={styles.mapOverlay}></div>

        {/* Google Maps Controls UI */}
        <div className={styles.mapControls}>
          <div className={styles.controlBtn}>+</div>
          <div className={styles.controlBtn}>−</div>
          <div className={styles.controlBtn} style={{ color: "#4285F4" }}>🧭</div>
        </div>

        {/* Navigation Route Path */}
        <svg className={styles.routePath} viewBox="0 0 600 400">
          <path 
            className={styles.pathLine} 
            d="M 100 80 Q 200 50 300 150 T 500 280" 
          />
        </svg>

        {/* Map Pins (Store & Home) */}
        <div className={`${styles.landmark}`} style={{ top: "15%", left: "12%" }}>
          <div className={styles.pinIcon} style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))" }}>📍</div>
          <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", background: "#333", color: "white", padding: "4px 12px", borderRadius: "6px", fontSize: "11px", whiteSpace: "nowrap", fontWeight: "bold", zIndex: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>Zaroorat Store</div>
        </div>
        
        <div className={`${styles.landmark}`} style={{ bottom: "22%", right: "12%" }}>
          <div className={styles.pinIcon} style={{ color: "#EA4335", filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))" }}>📍</div>
          <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", background: "#4285F4", color: "white", padding: "4px 12px", borderRadius: "6px", fontSize: "11px", whiteSpace: "nowrap", fontWeight: "bold", zIndex: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>Your Doorstep</div>
        </div>

        {/* Animated Scooter */}
        <div className={styles.scooter}>🛵</div>
      </div>
    </section>
  );
}
