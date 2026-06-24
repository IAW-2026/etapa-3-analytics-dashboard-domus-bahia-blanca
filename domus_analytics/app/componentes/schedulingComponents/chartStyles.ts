import type { CSSProperties } from "react";

export const chartColors = {
  primary: "hsl(var(--primary))",
  primarySoft: "hsl(var(--primary) / 0.68)",
  primaryMuted: "hsl(var(--primary) / 0.42)",
  accent: "hsl(var(--primary) / 0.24)",
  grid: "hsl(var(--primary) / 0.14)",
  text: "var(--text-secondary)",
};

export const cardClassName =
  "rounded-2xl border border-border/60 bg-card p-6 shadow-soft";

export const chartThemeStyle = {
  "--primary": "143 18% 30%",
} as CSSProperties;
