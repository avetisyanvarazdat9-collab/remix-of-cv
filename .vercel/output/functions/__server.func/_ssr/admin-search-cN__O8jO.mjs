import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Search, n as X } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-search-cN__O8jO.js
var import_jsx_runtime = require_jsx_runtime();
function AdminSearchField({ value, onChange, placeholder = "Search…", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative w-full min-w-0 max-w-md", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "search",
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				"aria-label": "Search",
				className: "w-full rounded-md border border-input bg-background/60 py-2 pl-9 pr-9 text-sm outline-none focus:border-primary"
			}),
			value.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(""),
				"aria-label": "Clear search",
				className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			})
		]
	});
}
function appendValue(parts, value) {
	if (value === null || value === void 0 || value === "") return;
	if (typeof value === "boolean") {
		parts.push(value ? "yes" : "no");
		return;
	}
	if (Array.isArray(value)) {
		parts.push(value.map(String).join(" "));
		return;
	}
	parts.push(String(value));
}
function appendField(parts, row, name) {
	appendValue(parts, row[name]);
	const tri = row.i18n?.[name];
	if (tri && typeof tri === "object") {
		appendValue(parts, tri.hy);
		appendValue(parts, tri.en);
		appendValue(parts, tri.ru);
	}
}
/** Case-insensitive client-side filter for admin list rows. */
function rowMatchesAdminSearch(row, query, fieldNames) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	const parts = [];
	for (const name of fieldNames) appendField(parts, row, name);
	return parts.join(" ").toLowerCase().includes(q);
}
/** Match when any provided string value contains the query. */
function textMatchesAdminSearch(values, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return values.some((v) => (v ?? "").toLowerCase().includes(q));
}
//#endregion
export { rowMatchesAdminSearch as n, textMatchesAdminSearch as r, AdminSearchField as t };
