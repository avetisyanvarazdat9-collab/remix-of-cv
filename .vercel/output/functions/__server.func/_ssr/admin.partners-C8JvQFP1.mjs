import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.partners-C8JvQFP1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "current",
		label: "Current",
		filter: (r) => r.is_current === true,
		defaults: { is_current: true }
	},
	{
		id: "past",
		label: "Past",
		filter: (r) => r.is_current === false,
		defaults: { is_current: false }
	},
	{
		id: "all",
		label: "All",
		filter: () => true,
		defaults: {}
	}
];
var fields = [
	{
		name: "name",
		label: "Name (brand)",
		type: "text",
		required: true
	},
	{
		name: "role",
		label: "Role / partnership",
		type: "i18n"
	},
	{
		name: "description",
		label: "Description",
		type: "i18n-textarea"
	},
	{
		name: "logo_url",
		label: "Logo URL",
		type: "url"
	},
	{
		name: "website_url",
		label: "Website URL",
		type: "url"
	},
	{
		name: "start_year",
		label: "Start year",
		type: "number"
	},
	{
		name: "end_year",
		label: "End year",
		type: "number"
	},
	{
		name: "is_current",
		label: "Current partner",
		type: "boolean"
	},
	{
		name: "display_order",
		label: "Display order",
		type: "number"
	},
	{
		name: "is_visible",
		label: "Visible",
		type: "boolean"
	}
];
function PartnersPage() {
	const [tab, setTab] = (0, import_react.useState)("current");
	const active = TABS.find((t) => t.id === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Partners"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Companies and partnerships, grouped by status."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 inline-flex rounded-md border border-border bg-card/40 p-1",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(t.id),
				className: `rounded-md px-4 py-1.5 text-sm transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
				title: "Partners",
				table: "companies",
				orderBy: { column: "display_order" },
				displayColumns: [
					"name",
					"role",
					"start_year",
					"end_year",
					"is_current"
				],
				fields,
				filter: active.filter,
				defaults: active.defaults,
				hideHeader: true
			}, active.id)
		})
	] });
}
//#endregion
export { PartnersPage as component };
