import styles from "@/app/page.module.css";

export default function Features() {
  return (
    <section className={styles.features}>
      <h2>What You’ll Get</h2>

      <div className={styles.featureGrid}>
        <div className={styles.card}>
          <h3>🍎 Fresh Produce</h3>
          <p>Real-time tracking of fresh vegetables and fruits.</p>
        </div>

        <div className={styles.card}>
          <h3>📦 Smart Inventory</h3>
          <p>Automated alerts for low stock on daily essentials.</p>
        </div>

        <div className={styles.card}>
          <h3>📊 Analytics</h3>
          <p>Detailed sales reports for better management.</p>
        </div>
      </div>
    </section>
  );
}