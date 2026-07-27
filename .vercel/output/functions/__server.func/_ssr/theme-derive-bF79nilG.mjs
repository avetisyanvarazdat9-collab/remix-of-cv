//#region node_modules/.nitro/vite/services/ssr/assets/theme-derive-bF79nilG.js
function hexToRgb(hex) {
	const h = hex.replace("#", "").trim();
	const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
	const n = parseInt(full.slice(0, 6), 16);
	return {
		r: n >> 16 & 255,
		g: n >> 8 & 255,
		b: n & 255
	};
}
function rgbToHex({ r, g, b }) {
	const to = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
	return `#${to(r)}${to(g)}${to(b)}`;
}
function mix(a, b, t) {
	return {
		r: a.r + (b.r - a.r) * t,
		g: a.g + (b.g - a.g) * t,
		b: a.b + (b.b - a.b) * t
	};
}
function luminance({ r, g, b }) {
	const f = (c) => {
		const s = c / 255;
		return s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
	};
	return .2126 * f(r) + .7152 * f(g) + .0722 * f(b);
}
function rgba(hex, alpha) {
	const { r, g, b } = hexToRgb(hex);
	return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
}
function deriveTheme(theme) {
	const bg = hexToRgb(theme.background);
	const fg = hexToRgb(theme.text);
	const primary = hexToRgb(theme.primary);
	const isLight = luminance(bg) > .5;
	const WHITE = {
		r: 255,
		g: 255,
		b: 255
	};
	const BLACK = {
		r: 0,
		g: 0,
		b: 0
	};
	const tint = isLight ? BLACK : WHITE;
	const card = mix(bg, tint, isLight ? .02 : .05);
	const popover = mix(bg, tint, isLight ? .03 : .07);
	const muted = mix(bg, tint, isLight ? .05 : .1);
	const secondary = mix(bg, tint, isLight ? .07 : .13);
	const accent = mix(bg, primary, isLight ? .12 : .18);
	const sidebar = mix(bg, tint, isLight ? .03 : .04);
	const sidebarAccent = mix(bg, tint, isLight ? .06 : .09);
	const mutedFg = mix(fg, bg, .45);
	const primaryFg = luminance(primary) > .55 ? BLACK : WHITE;
	const border = isLight ? rgba("#000000", .1) : rgba("#ffffff", .12);
	const inputBorder = isLight ? rgba("#000000", .14) : rgba("#ffffff", .16);
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
		"--sidebar-ring": theme.primary
	};
}
function applyTheme(root, theme) {
	const vars = deriveTheme(theme);
	for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
	const isLight = luminance(hexToRgb(theme.background)) > .5;
	root.style.colorScheme = isLight ? "light" : "dark";
}
function clearTheme(root) {
	const vars = deriveTheme({
		primary: "#000000",
		background: "#ffffff",
		text: "#000000"
	});
	for (const k of Object.keys(vars)) root.style.removeProperty(k);
	root.style.removeProperty("colorScheme");
}
//#endregion
export { clearTheme as n, deriveTheme as r, applyTheme as t };
