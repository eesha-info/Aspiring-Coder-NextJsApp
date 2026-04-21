import Link from "next/link";
import styles from "@/app/page.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <h2>Ready to optimize your store management?</h2>

      <Link href="/auth/login" className={styles.primaryBtn}>
        Login to Dashboard
      </Link>
    </section>
  );
}