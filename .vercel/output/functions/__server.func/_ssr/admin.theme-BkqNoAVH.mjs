import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as applyTheme } from "./theme-derive-bF79nilG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.theme-BkqNoAVH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULTS = {
	primary_color: "#7c5cff",
	background_color: "#0f172a",
	text_color: "#f1f5f9"
};
var PRESETS = [
	{
		name: "Midnight Violet",
		tag: "Dark",
		colors: {
			primary_color: "#7c5cff",
			background_color: "#0f172a",
			text_color: "#f1f5f9"
		}
	},
	{
		name: "Obsidian Gold",
		tag: "Dark",
		colors: {
			primary_color: "#f5c451",
			background_color: "#0a0a0a",
			text_color: "#f4f4f5"
		}
	},
	{
		name: "Deep Forest",
		tag: "Dark",
		colors: {
			primary_color: "#34d399",
			background_color: "#0a1410",
			text_color: "#ecfdf5"
		}
	},
	{
		name: "Crimson Noir",
		tag: "Dark",
		colors: {
			primary_color: "#fb7185",
			background_color: "#170b10",
			text_color: "#fff1f2"
		}
	},
	{
		name: "Cyber Cyan",
		tag: "Tech",
		colors: {
			primary_color: "#22d3ee",
			background_color: "#0b1220",
			text_color: "#e2e8f0"
		}
	},
	{
		name: "Electric Indigo",
		tag: "Tech",
		colors: {
			primary_color: "#6366f1",
			background_color: "#0c0a1f",
			text_color: "#e0e7ff"
		}
	},
	{
		name: "Neon Lime",
		tag: "Tech",
		colors: {
			primary_color: "#a3e635",
			background_color: "#0a0f0a",
			text_color: "#f7fee7"
		}
	},
	{
		name: "Soft Minimalist",
		tag: "Light",
		colors: {
			primary_color: "#111827",
			background_color: "#fafaf9",
			text_color: "#1c1917"
		}
	},
	{
		name: "Clean Slate",
		tag: "Light",
		colors: {
			primary_color: "#475569",
			background_color: "#f8fafc",
			text_color: "#0f172a"
		}
	},
	{
		name: "Gentle Teal",
		tag: "Light",
		colors: {
			primary_color: "#0d9488",
			background_color: "#f0fdfa",
			text_color: "#134e4a"
		}
	},
	{
		name: "Sky Pastel",
		tag: "Light",
		colors: {
			primary_color: "#3b82f6",
			background_color: "#f0f9ff",
			text_color: "#0c4a6e"
		}
	},
	{
		name: "Warm Sand",
		tag: "Light",
		colors: {
			primary_color: "#c2410c",
			background_color: "#fffaf0",
			text_color: "#431407"
		}
	}
];
var TAG_STYLES = {
	Dark: "bg-slate-500/15 text-slate-300",
	Light: "bg-amber-400/15 text-amber-500",
	Tech: "bg-cyan-500/15 text-cyan-400"
};
function ThemeEditor() {
	const [colors, setColors] = (0, import_react.useState)(DEFAULTS);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.from("site_settings").select("primary_color, background_color, text_color").eq("id", true).maybeSingle().then(({ data, error }) => {
			if (error) toast.error(error.message);
			if (data) setColors(data);
			setLoading(false);
		});
	}, []);
	function patch(key, value) {
		setColors((c) => ({
			...c,
			[key]: value
		}));
	}
	function applyPreview(c) {
		applyTheme(document.documentElement, {
			primary: c.primary_color,
			background: c.background_color,
			text: c.text_color
		});
	}
	(0, import_react.useEffect)(() => {
		applyPreview(colors);
	}, [colors]);
	async function save() {
		setSaving(true);
		const { error } = await supabase.from("site_settings").upsert({
			id: true,
			...colors
		}, { onConflict: "id" });
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Theme saved — applied site-wide");
	}
	function reset() {
		setColors(DEFAULTS);
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Theme"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Pick colors or a preset. Changes preview live and apply site-wide on save."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Custom colors"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-3",
						children: [
							{
								key: "primary_color",
								label: "Primary",
								hint: "Buttons, links, accents"
							},
							{
								key: "background_color",
								label: "Background",
								hint: "Page background"
							},
							{
								key: "text_color",
								label: "Text",
								hint: "Foreground text"
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
									children: f.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-md border border-input bg-background/60 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: colors[f.key],
										onChange: (e) => patch(f.key, e.target.value),
										className: "size-10 cursor-pointer rounded border-0 bg-transparent p-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: colors[f.key],
										onChange: (e) => patch(f.key, e.target.value),
										className: "flex-1 bg-transparent text-sm outline-none",
										spellCheck: false
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: f.hint
								})
							]
						}, f.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 font-display text-lg font-semibold",
						children: "Presets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setColors(p.colors),
							className: "group flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex h-12 w-16 shrink-0 overflow-hidden rounded-md border border-white/10",
								"aria-hidden": true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										style: { background: p.colors.background_color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										style: { background: p.colors.primary_color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										style: { background: p.colors.text_color }
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-medium text-foreground",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[p.tag]}`,
									children: p.tag
								})]
							})]
						}, p.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: save,
							disabled: saving,
							className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: saving ? "Saving…" : "Save theme"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: reset,
							className: "rounded-md border border-border px-5 py-2 text-sm",
							children: "Reset defaults"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border p-6",
				style: {
					background: colors.background_color,
					color: colors.text_color
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider opacity-70",
						children: "Preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-2xl font-bold",
						children: "Sample heading"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm opacity-80",
						children: "The quick brown fox jumps over the lazy dog."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-4 rounded-md px-4 py-2 text-sm font-medium text-white",
						style: { background: colors.primary_color },
						children: "Primary button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						onClick: (e) => e.preventDefault(),
						className: "mt-3 block text-sm underline",
						style: { color: colors.primary_color },
						children: "Accent link"
					})
				]
			})]
		})
	] });
}
//#endregion
export { ThemeEditor as component };
