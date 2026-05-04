"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from "@/lib/theme";

function readTheme(): ThemeId {
  if (typeof document === "undefined") return "teal";
  const raw = document.documentElement.dataset.theme;
  if (raw === "forest" || raw === "teal") return raw;
  return "teal";
}

function applyTheme(themeId: ThemeId) {
  document.documentElement.dataset.theme = themeId;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    /* ignore quota / private mode */
  }
}

export function ThemeMenu() {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>("teal");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(readTheme());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const select = (themeId: ThemeId) => {
    applyTheme(themeId);
    setActive(themeId);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-pop-fabBorder bg-pop-fab text-bright shadow-lg backdrop-blur-sm transition-colors hover:border-pop-fabHiBorder hover:bg-pop-fabHi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none"
        title="Color theme"
      >
        <span className="sr-only">Open color theme menu</span>
        <PaletteIcon className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Color themes"
          className="absolute bottom-full right-0 mb-3 w-[min(calc(100vw-2.5rem),17rem)] rounded-lg border border-pop-border bg-pop p-2 shadow-xl backdrop-blur-md"
        >
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-inkFaint">Theme</p>
          <ul className="space-y-0.5" role="none">
            {THEMES.map((t) => {
              const selected = active === t.id;
              return (
                <li key={t.id} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => select(t.id)}
                    className={cn(
                      "flex w-full flex-col items-start rounded-md px-2.5 py-2 text-left transition-colors",
                      selected
                        ? "bg-pop-row text-inkOnRow"
                        : "text-inkSoft hover:bg-pop-rowHi hover:text-inkOnRow",
                    )}
                  >
                    <span className="text-sm font-semibold">{t.label}</span>
                    <span className="text-xs text-inkFaint">{t.description}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.5 6.375a4.125 4.125 0 117.436 2.463 3.83 3.83 0 00-1.57.077A4.125 4.125 0 0111.175 6H12a3.75 3.75 0 013.563 3.163c.25.114.486.246.707.403a3.75 3.75 0 011.133 4.825A3.75 3.75 0 0117.25 19.5H6.75a3.75 3.75 0 01-2.54-4.45l.03-.063c.211-.453.333-.956.333-1.491 0-1.051-.323-2.027-.875-2.83zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
