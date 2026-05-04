export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEMES = [
  {
    id: "teal" as const,
    label: "Default",
    description: "Slate background and mint accents",
  },
  {
    id: "forest" as const,
    label: "Forest",
    description: "Deep green with lime highlights",
  },
  {
    id: "catppuccin" as const,
    label: "Catppuccin",
    description: "Near-crust dark base with pastel yellow accents",
  },
  {
    id: "brown" as const,
    label: "Brown",
    description: "Deeper cocoa with warm golden-yellow accents",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_IDS: ThemeId[] = THEMES.map((t) => t.id);
