import styles from "@/app/page.module.css";

export default function Stats() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statBox}>
        <h3>10k+</h3>
        <p>Happy Customers</p>
      </div>
      <div className={styles.statBox}>
        <h3>5k+</h3>
        <p>Daily Deliveries</p>
      </div>
      <div className={styles.statBox}>
        <h3>50+</h3>
        <p>Areas Covered</p>
      </div>
      <div className={styles.statBox}>
        <h3>1000+</h3>
        <p>Available Products</p>
      </div>
    </section>
  );
}
