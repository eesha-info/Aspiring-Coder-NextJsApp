import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1>
        Every Expert Was Once an <br />
        <span>Aspiring Coder</span>
      </h1>

      <p>
        Learn. Build. Grow. Start your journey with real-world coding,
        structured learning, and hands-on projects.
      </p>

      <div className={styles.buttons}>
        <Link href="/auth/signup" className={styles.primaryBtn}>
          Get Started 🚀
        </Link>
        <Link href="/auth/login" className={styles.secondaryBtn}>
          Already a User
        </Link>
      </div>
    </div>
  );
}