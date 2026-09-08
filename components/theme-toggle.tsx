"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // the inline script in the layout already applied a theme; read it back
  useEffect(() => {
    const applied = document.documentElement.dataset.theme;
    setTheme(applied === "light" ? "light" : "dark");
  }, []);

  // follow the OS as long as the visitor hasn't made an explicit choice
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");

    const onChange = () => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next = systemTheme();
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="intro__theme"
      onClick={toggle}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={theme === "dark" ? "라이트 모드" : "다크 모드"}
    >
      <span aria-hidden>{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
