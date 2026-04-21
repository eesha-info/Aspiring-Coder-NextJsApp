import styles from "@/app/page.module.css";

export default function LearningPaths() {
  return (
    <section className={styles.paths}>
      <h2>Shop by Category</h2>

      <div className={styles.pathGrid}>
        <div className={styles.pathCard}>Grains & Pulses</div>
        <div className={styles.pathCard}>Dairy & Eggs</div>
        <div className={styles.pathCard}>Fresh Produce</div>
        <div className={styles.pathCard}>Household Essentials</div>
      </div>
    </section>
  );
}