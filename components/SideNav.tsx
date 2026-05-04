"use client";

import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#leadership", label: "Leadership" },
] as const;

type SideNavProps = {
  active: string | null;
  className?: string;
};

export function SideNav({ active, className }: SideNavProps) {
  return (
    <nav className={cn("w-max", className)} aria-label="In-page navigation">
      <ul className="space-y-0">
        {ITEMS.map((item) => {
          const id = item.href.slice(1);
          const isActive = active === id;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex items-center gap-4 py-3 focus-visible:text-bright"
              >
                <span
                  className={cn(
                    "block h-px bg-navLine transition-[width,background-color] duration-300 motion-reduce:transition-none",
                    isActive ? "w-16 bg-navLine-active" : "w-8 group-hover:w-16 group-hover:bg-navLine-active group-focus-visible:w-16",
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-bright"
                      : "text-inkFaint group-hover:text-bright group-focus-visible:text-bright",
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
