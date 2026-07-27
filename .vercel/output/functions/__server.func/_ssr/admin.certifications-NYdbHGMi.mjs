import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.certifications-NYdbHGMi.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Certifications",
	description: "Professional certifications. Translatable fields show HY / EN / RU tabs.",
	table: "certifications",
	orderBy: { column: "display_order" },
	displayColumns: [
		"name",
		"issuer",
		"issue_date",
		"expiry_date",
		"is_visible"
	],
	fields: [
		{
			name: "name",
			label: "Name",
			type: "i18n"
		},
		{
			name: "issuer",
			label: "Issuer",
			type: "i18n"
		},
		{
			name: "issue_date",
			label: "Issue date",
			type: "text",
			placeholder: "YYYY-MM-DD"
		},
		{
			name: "expiry_date",
			label: "Expiry date",
			type: "text",
			placeholder: "YYYY-MM-DD"
		},
		{
			name: "credential_id",
			label: "Credential ID",
			type: "text"
		},
		{
			name: "credential_url",
			label: "Credential URL",
			type: "text"
		},
		{
			name: "image_url",
			label: "Image URL",
			type: "text"
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
