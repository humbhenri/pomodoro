import { Link } from "react-router";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='#'>Entenda como funciona a técnica Pomodoro</a>
      <Link to='/about-pomodoro'>Pomodoro &copy; {new Date().getFullYear()}</Link>
    </footer>
  );
}
