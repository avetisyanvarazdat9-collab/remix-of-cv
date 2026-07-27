import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.professional-experience-BSC7ETdF.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Professional Experience",
	description: "Job history shown on the About page and CV. Translatable fields use HY / EN / RU tabs. Use Display order to control listing order.",
	table: "professional_experience",
	orderBy: { column: "display_order" },
	displayColumns: [
		"job_title",
		"organization",
		"location",
		"employment_type",
		"start_year",
		"end_year",
		"is_current"
	],
	fields: [
		{
			name: "job_title",
			label: "Job title",
			type: "i18n",
			required: true
		},
		{
			name: "organization",
			label: "Organization / company",
			type: "i18n",
			required: true
		},
		{
			name: "location",
			label: "Location",
			type: "i18n"
		},
		{
			name: "employment_type",
			label: "Employment type (optional)",
			type: "i18n",
			placeholder: "Full-time"
		},
		{
			name: "description",
			label: "Description",
			type: "i18n-textarea"
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
			label: "Present (current role)",
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
