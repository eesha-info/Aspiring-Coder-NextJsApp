import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", overflow: "hidden", border: "2px solid var(--db-primary)" }}>
          <img src="/brand.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <h2 className={styles.logo} style={{ margin: 0 }}>ZarooratKart</h2>
      </Link>

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