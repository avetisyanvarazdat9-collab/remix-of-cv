import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects-DNniKoVk.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Projects",
	description: "Showcase work, research, and side projects. Translatable fields have HY / EN / RU tabs.",
	table: "projects",
	orderBy: { column: "display_order" },
	displayColumns: [
		"title",
		"slug",
		"featured",
		"is_visible",
		"display_order"
	],
	fields: [
		{
			name: "title",
			label: "Title",
			type: "i18n",
			required: true
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			required: true,
			placeholder: "url-safe-id"
		},
		{
			name: "summary",
			label: "Summary",
			type: "i18n"
		},
		{
			name: "description",
			label: "Description",
			type: "i18n-textarea"
		},
		{
			name: "image_url",
			label: "Cover image",
			type: "image"
		},
		{
			name: "link_url",
			label: "Link URL",
			type: "url"
		},
		{
			name: "repo_url",
			label: "Repo URL",
			type: "url"
		},
		{
			name: "tech_stack",
			label: "Tech stack (comma separated)",
			type: "tags"
		},
		{
			name: "display_order",
			label: "Display order",
			type: "number"
		},
		{
			name: "featured",
			label: "Featured on home",
			type: "boolean"
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
