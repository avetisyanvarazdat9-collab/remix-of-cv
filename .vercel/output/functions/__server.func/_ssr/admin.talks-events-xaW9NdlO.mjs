import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.talks-events-xaW9NdlO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var TABS = [
	{
		id: "upcoming",
		label: "Upcoming",
		filter: (r) => !!r.event_date && r.event_date >= today()
	},
	{
		id: "past",
		label: "Past",
		filter: (r) => !!r.event_date && r.event_date < today()
	},
	{
		id: "undated",
		label: "Undated",
		filter: (r) => !r.event_date
	},
	{
		id: "all",
		label: "All",
		filter: () => true
	}
];
var fields = [
	{
		name: "title",
		label: "Title",
		type: "i18n",
		required: true
	},
	{
		name: "event_name",
		label: "Event name",
		type: "i18n"
	},
	{
		name: "event_date",
		label: "Date",
		type: "date"
	},
	{
		name: "location",
		label: "Location",
		type: "i18n"
	},
	{
		name: "description",
		label: "Description",
		type: "i18n-textarea"
	},
	{
		name: "slides_url",
		label: "Slides URL",
		type: "url"
	},
	{
		name: "video_url",
		label: "Video URL",
		type: "url"
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
function TalksEventsPage() {
	const [tab, setTab] = (0, import_react.useState)("upcoming");
	const active = TABS.find((t) => t.id === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Talks & Events"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Conference talks, lectures, workshops and panel appearances."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 inline-flex flex-wrap rounded-md border border-border bg-card/40 p-1",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(t.id),
				className: `rounded-md px-4 py-1.5 text-sm transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
				title: "Talks",
				table: "talks",
				orderBy: {
					column: "event_date",
					ascending: false
				},
				displayColumns: [
					"title",
					"event_name",
					"event_date",
					"location"
				],
				fields,
				filter: active.filter,
				hideHeader: true
			}, active.id)
		})
	] });
}
//#endregion
export { TalksEventsPage as component };
