import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.talks-BdmR_xi6.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Talks & events",
	description: "Translatable fields show HY / EN / RU tabs.",
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
	fields: [
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
	]
});
//#endregion
export { SplitComponent as component };
