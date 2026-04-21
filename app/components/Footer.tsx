import styles from "@/app/page.module.css";

export default function Footer() {
  console.log("Footer components is rendering....")
  return (
    <footer className={styles.footer}>
      <p>© 2026 TheAspiringCoder. All rights reserved.</p>
    </footer>
  );
}