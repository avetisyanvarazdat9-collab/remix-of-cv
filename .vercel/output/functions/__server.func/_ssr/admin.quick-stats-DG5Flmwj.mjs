import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.quick-stats-DG5Flmwj.js
var import_jsx_runtime = require_jsx_runtime();
function QuickStatsEditor() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
		title: "Quick stats",
		description: "Metric badges shown across the public site. Translatable labels show HY / EN / RU tabs.",
		table: "statistics",
		orderBy: { column: "display_order" },
		displayColumns: [
			"label",
			"value",
			"display_order",
			"is_visible"
		],
		fields: [
			{
				name: "label",
				label: "Label",
				type: "i18n",
				required: true
			},
			{
				name: "value",
				label: "Value",
				type: "text",
				required: true
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
		]
	});
}
//#endregion
export { QuickStatsEditor as component };
