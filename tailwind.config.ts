import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page)",
        accent: {
          DEFAULT: "var(--color-accent)",
          muted: "var(--color-accent-muted)",
          ink: "var(--color-accent-ink)",
        },
        chip: "var(--color-chip-bg)",
        panel: "var(--color-panel)",
        media: "var(--color-media)",
        borderSubtle: "var(--color-border-subtle)",
        dividerInset: "var(--color-divider-inset)",
        pop: {
          DEFAULT: "var(--color-pop-bg)",
          border: "var(--color-pop-border)",
          fab: "var(--color-pop-fab-bg)",
          fabBorder: "var(--color-pop-fab-border)",
          fabHi: "var(--color-pop-fab-hover-bg)",
          fabHiBorder: "var(--color-pop-fab-hover-border)",
          row: "var(--color-pop-row-selected)",
          rowHi: "var(--color-pop-row-hover)",
        },
        navLine: {
          DEFAULT: "var(--color-nav-line)",
          active: "var(--color-nav-line-active)",
        },
        bright: "var(--color-text-bright)",
        inkSoft: "var(--color-text-soft)",
        inkMuted: "var(--color-text-muted)",
        inkFaint: "var(--color-text-faint)",
        inkOnRow: "var(--color-text-on-row)",
      },
      outlineColor: {
        focus: "var(--color-focus-ring)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
