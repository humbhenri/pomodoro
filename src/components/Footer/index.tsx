import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href="#">Entenda como funciona a técnica Pomodoro</RouterLink>
      <RouterLink href="/about-pomodoro">
        Pomodoro &copy; {new Date().getFullYear()}
      </RouterLink>
    </footer>
  );
}
