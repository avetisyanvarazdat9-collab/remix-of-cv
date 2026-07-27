import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.education-CmGwbaif.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Education",
	description: "Translatable fields show HY / EN / RU tabs.",
	table: "education",
	orderBy: { column: "display_order" },
	displayColumns: [
		"institution",
		"degree",
		"field",
		"start_year",
		"end_year"
	],
	fields: [
		{
			name: "institution",
			label: "Institution",
			type: "i18n"
		},
		{
			name: "degree",
			label: "Degree",
			type: "i18n"
		},
		{
			name: "field",
			label: "Field",
			type: "i18n"
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
			name: "description",
			label: "Description",
			type: "i18n-textarea"
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
