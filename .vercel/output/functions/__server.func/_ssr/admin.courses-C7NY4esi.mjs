import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.courses-C7NY4esi.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Courses",
	description: "Translatable fields show HY / EN / RU tabs.",
	table: "courses",
	orderBy: { column: "display_order" },
	displayColumns: [
		"title",
		"slug",
		"delivery_type",
		"status",
		"level",
		"duration",
		"is_visible"
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
			placeholder: "auto-generated-from-title"
		},
		{
			name: "description",
			label: "Description",
			type: "i18n-textarea"
		},
		{
			name: "level",
			label: "Level",
			type: "i18n"
		},
		{
			name: "duration",
			label: "Duration",
			type: "i18n"
		},
		{
			name: "delivery_type",
			label: "Delivery format",
			type: "select",
			options: [{
				value: "online",
				label: "Online"
			}, {
				value: "offline",
				label: "Offline"
			}]
		},
		{
			name: "status",
			label: "Course status",
			type: "select",
			options: [{
				value: "ongoing",
				label: "Ongoing"
			}, {
				value: "completed",
				label: "Completed"
			}]
		},
		{
			name: "link_url",
			label: "Link URL",
			type: "url"
		},
		{
			name: "image_url",
			label: "Image URL",
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
	]
});
//#endregion
export { SplitComponent as component };
