import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.skills-C1EqmS1X.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Skills",
	description: "Translatable fields show HY / EN / RU tabs.",
	table: "skills",
	orderBy: { column: "display_order" },
	displayColumns: [
		"category",
		"name",
		"level",
		"is_visible"
	],
	fields: [
		{
			name: "category",
			label: "Category",
			type: "i18n",
			required: true
		},
		{
			name: "name",
			label: "Name",
			type: "i18n",
			required: true
		},
		{
			name: "level",
			label: "Level (1-5)",
			type: "number"
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
