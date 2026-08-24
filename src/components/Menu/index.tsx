import {
  HistoryIcon,
  HouseIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type Theme = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storageTheme = (localStorage.getItem("theme") as Theme) || "dark";
    return storageTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (event: React.MouseEvent) => {
    event.preventDefault();
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Home"
        title="Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history"
        aria-label="Histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleThemeChange}
      >
        {theme == "dark" ? <SunIcon /> : <MoonIcon />}
      </a>
    </nav>
  );
}
