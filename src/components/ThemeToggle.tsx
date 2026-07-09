import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { clearTheme } from "@/lib/theme-derive";

const STORAGE_KEY = "lovable.darkMode.v1";

function getInitial(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function apply(mode: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
  if (mode === "dark") {
    clearTheme(root);
  } else {
    window.dispatchEvent(new CustomEvent("lovable:theme-light"));
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(getInitial());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const isDark = mode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`group relative inline-flex size-9 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-background/60 text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-accent/30 hover:text-primary active:scale-95 ${className}`}
      suppressHydrationWarning
    >
      <Sun
        className={`absolute size-4 transition-all duration-500 ${
          mounted && isDark
            ? "-translate-y-6 rotate-90 opacity-0"
            : "translate-y-0 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute size-4 transition-all duration-500 ${
          mounted && isDark
            ? "translate-y-0 rotate-0 opacity-100"
            : "translate-y-6 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
