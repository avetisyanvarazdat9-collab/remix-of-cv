import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.companies-CQ4vhUyo.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Companies",
	description: "Translatable fields show HY / EN / RU tabs.",
	table: "companies",
	orderBy: { column: "display_order" },
	displayColumns: [
		"name",
		"role",
		"start_year",
		"end_year",
		"is_current"
	],
	fields: [
		{
			name: "name",
			label: "Name (brand)",
			type: "text"
		},
		{
			name: "category",
			label: "Category badge (e.g. University, Industry)",
			type: "text"
		},
		{
			name: "role",
			label: "Role",
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
			label: "Current",
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
	]
});
//#endregion
export { SplitComponent as component };
