/**
 * Fonction de répuction et d'enrégistrement automatique du thème 
 */

import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);

    injectThemeVariables(theme);
  }, [theme]);

  return { theme, setTheme };
}

function injectThemeVariables(theme: string) {
  const root = document.documentElement;

  if (theme === "light") {
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--text", "#111111");
    root.style.setProperty("--card", "#f3f3f3");
    root.style.setProperty("--border", "#d4d4d4");
  }

  if (theme === "dark") {
    root.style.setProperty("--bg", "#111111");
    root.style.setProperty("--text", "#f9f9f9");
    root.style.setProperty("--card", "#1f1f1f");
    root.style.setProperty("--border", "#333333");
  }
}
