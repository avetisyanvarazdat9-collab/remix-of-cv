import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as LANGS } from "./i18n-CteB24FQ.mjs";
import { G as Eye, K as EyeOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PreviewPanel-BRlKFamg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Resolve a field for the chosen language with the same fallback chain as `localized()`. */
function resolve(values, name, lang) {
	const v = values[name];
	if (v && typeof v === "object" && ("hy" in v || "en" in v || "ru" in v)) {
		const tri = v;
		return (tri[lang] ?? tri.en ?? tri.hy ?? tri.ru ?? "").toString();
	}
	return v == null ? "" : String(v);
}
/**
* Live preview of unsaved form values rendered in HY/EN/RU.
* `i18nValues` is an optional separate bag for forms (home/profile) that store
* translatable fields outside the main `values` object.
*/
function PreviewPanel({ fields, values, i18nValues, title = "Preview" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [lang, setLang] = (0, import_react.useState)("en");
	const merged = {
		...values,
		...i18nValues ?? {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-background/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((o) => !o),
				className: "inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary",
				children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), open ? `Hide ${title.toLowerCase()}` : `Show ${title.toLowerCase()}`]
			}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLang(l.code),
					className: `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${lang === l.code ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-accent"}`,
					title: l.native,
					children: l.label
				}, l.code))
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 border-t border-border/60 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: [
					"How visitors will see this in ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: LANGS.find((l) => l.code === lang)?.native
					}),
					" — unsaved."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid gap-3 sm:grid-cols-2",
				children: fields.map((f) => {
					const v = resolve(merged, f.name, lang);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: f.type === "i18n-textarea" || f.type === "textarea" ? "sm:col-span-2" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] uppercase tracking-wider text-muted-foreground",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: `mt-1 whitespace-pre-wrap break-words text-sm ${v ? "text-foreground" : "italic text-muted-foreground"}`,
							children: v || "— empty —"
						})]
					}, f.name);
				})
			})]
		})]
	});
}
//#endregion
export { PreviewPanel as t };
