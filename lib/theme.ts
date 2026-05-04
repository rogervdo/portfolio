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
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
