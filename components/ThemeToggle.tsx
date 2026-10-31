"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const EVENT = "themechange";
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

// What's actually on screen: the pinned choice, else whatever the system says.
function resolvedTheme(): Theme {
  return storedTheme() ?? (darkQuery().matches ? "dark" : "light");
}

function subscribe(onChange: () => void) {
  const media = darkQuery();
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onChange);
  };
}

function applyTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage blocked: the choice still applies for this visit
  }
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(EVENT));
}

// Follows the system until clicked, then flips between light and dark.
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, resolvedTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      onClick={() => applyTheme(next)}
      className="grid size-[1.6em] place-items-center rounded-full transition-colors hover:bg-foreground/5 hover:text-foreground active:scale-90"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme && <Icon key={theme} className="size-[1em] animate-[fade-in_400ms_ease-out]" strokeWidth={1.75} />}
    </button>
  );
}
