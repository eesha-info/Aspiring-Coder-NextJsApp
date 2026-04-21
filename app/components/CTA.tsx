import Link from "next/link";
import styles from "@/app/page.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <h2>Start Your Coding Journey Today 🚀</h2>

      <Link href="/auth/signup" className={styles.primaryBtn}>
        Join Now
      </Link>
    </section>
  );
}