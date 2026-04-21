import styles from "@/app/page.module.css";

export default function Features() {
  return (
    <section className={styles.features}>
      <h2>What You’ll Get</h2>

      <div className={styles.featureGrid}>
        <div className={styles.card}>
          <h3>💻 Real Coding Practice</h3>
          <p>Hands-on coding challenges to build real skills.</p>
        </div>

        <div className={styles.card}>
          <h3>📚 Structured Learning</h3>
          <p>Step-by-step roadmap from beginner to expert.</p>
        </div>

        <div className={styles.card}>
          <h3>🚀 Projects</h3>
          <p>Build real-world apps to strengthen your portfolio.</p>
        </div>
      </div>
    </section>
  );
}