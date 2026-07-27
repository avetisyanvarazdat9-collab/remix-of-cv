import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.video-courses-bVzQfOb3.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Video courses",
	description: "Translatable fields show HY / EN / RU tabs.",
	table: "video_courses",
	orderBy: { column: "display_order" },
	displayColumns: [
		"title",
		"slug",
		"platform",
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
			name: "video_url",
			label: "Video URL",
			type: "url"
		},
		{
			name: "youtube_url",
			label: "YouTube URL",
			type: "url"
		},
		{
			name: "thumbnail_url",
			label: "Thumbnail",
			type: "image"
		},
		{
			name: "platform",
			label: "Platform (YouTube, Vimeo…)",
			type: "i18n"
		},
		{
			name: "duration",
			label: "Duration",
			type: "i18n"
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
