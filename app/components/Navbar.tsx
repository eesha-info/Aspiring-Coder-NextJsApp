import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.miniLogo}>
         <img src="/brand.png" alt="Logo" />
         <span>ZarooratKart</span>
      </Link>
      <div className={styles.menuLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="#categories" className={styles.navLink}>Shop</Link>
        <Link href="#about" className={styles.navLink}>About</Link>
        <Link href="#contact" className={styles.navLink}>Contact</Link>
      </div>
      <Link href="/auth/login" className={styles.loginBtn}>
        Login
      </Link>
    </nav>
  );
}