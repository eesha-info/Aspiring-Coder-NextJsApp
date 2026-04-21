import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1>
        Quality Essentials for Your <br />
        <span>Home Store</span>
      </h1>

      <p>
        Manage your grocery inventory, fresh produce, and daily household supplies
        with the most efficient store management platform.
      </p>

      <div className={styles.buttons}>
        <Link href="/auth/login" className={styles.primaryBtn}>
          Store Login 🏪
        </Link>
      </div>
    </div>
  );
}