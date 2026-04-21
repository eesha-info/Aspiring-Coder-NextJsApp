import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>{"</> TheAspiringCoder"}</h2>

      <div className={styles.navLinks}>
        <Link href="/auth/login" className={styles.link}>
          Login
        </Link>
        <Link href="/auth/signup" className={styles.signupBtn}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
}