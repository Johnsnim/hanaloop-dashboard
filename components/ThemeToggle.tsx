"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const s = window.localStorage.getItem("theme");
  if (s === "light" || s === "dark") return s;
  const p =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return p ? "dark" : "light";
}
export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme());
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);
  const isDark = theme === "dark";
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <span className="inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          Light
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.76 4.84l-1.8-1.79L3.17 4.84 4.95 6.62l1.81-1.78zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.05l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zM13 1h-2v3h2V1zm7.03 3.17l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zM20 11v2h3v-2h-3zm-2.76 8.16l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41z" />
          </svg>
          Dark
        </span>
      )}
    </Button>
  );
}
