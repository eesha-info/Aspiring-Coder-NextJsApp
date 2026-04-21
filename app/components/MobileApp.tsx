import styles from "@/app/page.module.css";

export default function MobileApp() {
  return (
    <section className={styles.appSection}>
      <div className={styles.appContent}>
        <h2>Shop on the Go!</h2>
        <p>
          Download the ZarooratKart mobile app for a faster and smoother 
          shopping experience. Get exclusive app-only deals and real-time 
          order tracking.
        </p>
        <div className={styles.appButtons}>
          <button className={styles.appBtn}>Google Play</button>
          <button className={styles.appBtn}>App Store</button>
        </div>
      </div>
      <div className={styles.appImage}>
         <div className={styles.phoneMock}>📲</div>
      </div>
    </section>
  );
}
