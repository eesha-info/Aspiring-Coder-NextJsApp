import styles from "@/app/page.module.css";

export default function LearningPaths() {
  return (
    <section className={styles.paths}>
      <h2>Explore Learning Paths</h2>

      <div className={styles.pathGrid}>
        <div className={styles.pathCard}>Frontend Development</div>
        <div className={styles.pathCard}>Backend Development</div>
        <div className={styles.pathCard}>Full Stack Development</div>
        <div className={styles.pathCard}>Data Structures & Algorithms</div>
      </div>
    </section>
  );
}