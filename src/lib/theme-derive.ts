// Derive a full shadcn-style CSS variable palette from 3 user-chosen hex colors
// (primary, background, text). All outputs are hex / rgba strings so we can drop
// them straight into CSS custom properties via element.style.setProperty.

export type ThemeInput = {
  primary: string;
  background: string;
  text: string;
};

type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }: RGB): string {
  const to = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}

function luminance({ r, g, b }: RGB): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
}

export function deriveTheme(theme: ThemeInput): Record<string, string> {
  const bg = hexToRgb(theme.background);
  const fg = hexToRgb(theme.text);
  const primary = hexToRgb(theme.primary);
  const isLight = luminance(bg) > 0.5;

  const WHITE: RGB = { r: 255, g: 255, b: 255 };
  const BLACK: RGB = { r: 0, g: 0, b: 0 };
  const tint = isLight ? BLACK : WHITE;

  const card = mix(bg, tint, isLight ? 0.02 : 0.05);
  const popover = mix(bg, tint, isLight ? 0.03 : 0.07);
  const muted = mix(bg, tint, isLight ? 0.05 : 0.1);
  const secondary = mix(bg, tint, isLight ? 0.07 : 0.13);
  const accent = mix(bg, primary, isLight ? 0.12 : 0.18);
  const sidebar = mix(bg, tint, isLight ? 0.03 : 0.04);
  const sidebarAccent = mix(bg, tint, isLight ? 0.06 : 0.09);

  const mutedFg = mix(fg, bg, 0.45);
  const primaryFg = luminance(primary) > 0.55 ? BLACK : WHITE;

  const border = isLight ? rgba("#000000", 0.1) : rgba("#ffffff", 0.12);
  const inputBorder = isLight ? rgba("#000000", 0.14) : rgba("#ffffff", 0.16);

  return {
    "--background": theme.background,
    "--foreground": rgbToHex(fg),
    "--card": rgbToHex(card),
    "--card-foreground": rgbToHex(fg),
    "--popover": rgbToHex(popover),
    "--popover-foreground": rgbToHex(fg),
    "--primary": theme.primary,
    "--primary-foreground": rgbToHex(primaryFg),
    "--secondary": rgbToHex(secondary),
    "--secondary-foreground": rgbToHex(fg),
    "--muted": rgbToHex(muted),
    "--muted-foreground": rgbToHex(mutedFg),
    "--accent": rgbToHex(accent),
    "--accent-foreground": rgbToHex(fg),
    "--border": border,
    "--input": inputBorder,
    "--ring": theme.primary,
    "--sidebar": rgbToHex(sidebar),
    "--sidebar-foreground": rgbToHex(fg),
    "--sidebar-primary": theme.primary,
    "--sidebar-primary-foreground": rgbToHex(primaryFg),
    "--sidebar-accent": rgbToHex(sidebarAccent),
    "--sidebar-accent-foreground": rgbToHex(fg),
    "--sidebar-border": border,
    "--sidebar-ring": theme.primary,
  };
}

export function applyTheme(root: HTMLElement, theme: ThemeInput) {
  const vars = deriveTheme(theme);
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
  // Help built-in form controls and scrollbars match.
  const isLight = luminance(hexToRgb(theme.background)) > 0.5;
  root.style.colorScheme = isLight ? "light" : "dark";
}

export function clearTheme(root: HTMLElement) {
  const vars = deriveTheme({ primary: "#000000", background: "#ffffff", text: "#000000" });
  for (const k of Object.keys(vars)) {
    root.style.removeProperty(k);
  }
  root.style.removeProperty("colorScheme");
}
