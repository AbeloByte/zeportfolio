"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex items-center w-14 h-7 rounded-full border border-white/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor"
      style={{ background: isDark ? "#1a1a1a" : "#e5e5e5" }}
    >
      {/* Track label icons */}
      <span className="absolute left-1.5 text-[11px] select-none">🌙</span>
      <span className="absolute right-1.5 text-[11px] select-none">☀️</span>

      {/* Thumb */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center text-xs
          ${isDark
            ? "translate-x-0.5 bg-bgColor border border-white/20"
            : "translate-x-7 bg-white border border-black/10"
          }`}
      />
    </button>
  );
}
