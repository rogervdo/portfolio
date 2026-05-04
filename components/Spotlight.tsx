"use client";

import { useEffect, useState } from "react";

/** Soft blue radial highlight that follows the pointer (Brittany-style ambient glow). */
export function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] opacity-75 transition-opacity duration-300 motion-reduce:opacity-60"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(var(--color-spotlight-rgb), 0.15), transparent 80%)`,
      }}
      aria-hidden
    />
  );
}
