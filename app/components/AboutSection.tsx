import styles from "@/app/page.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <h2>Quality You Can Trust</h2>
        <p>
          At ZarooratKart, we believe in bringing the freshest produce and 
          highest quality daily essentials directly to your doorstep. Our 
          commitment to excellence ensures that every item in your cart is 
          hand-picked and quality-checked.
        </p>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCard}>
             <span className={styles.aboutIcon}>🚜</span>
             <h3>Locally Sourced</h3>
             <p>Supporting local farmers to bring you the freshest produce every morning.</p>
          </div>
          <div className={styles.aboutCard}>
             <span className={styles.aboutIcon}>🧼</span>
             <h3>Hygiene First</h3>
             <p>Our warehouses and delivery partners follow strict safety protocols.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
