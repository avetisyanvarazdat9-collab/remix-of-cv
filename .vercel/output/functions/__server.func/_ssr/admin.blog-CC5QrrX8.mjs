import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.blog-CC5QrrX8.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
	title: "Blog posts",
	description: "Write articles in Markdown. Translatable fields show HY / EN / RU tabs.",
	table: "blog_posts",
	orderBy: {
		column: "published_at",
		ascending: false
	},
	displayColumns: [
		"title",
		"slug",
		"is_published",
		"published_at"
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
			required: true
		},
		{
			name: "excerpt",
			label: "Excerpt",
			type: "i18n"
		},
		{
			name: "content",
			label: "Content (Markdown)",
			type: "i18n-textarea"
		},
		{
			name: "cover_image_url",
			label: "Cover image",
			type: "image"
		},
		{
			name: "tags",
			label: "Tags (comma separated)",
			type: "tags"
		},
		{
			name: "published_at",
			label: "Published at (YYYY-MM-DD)",
			type: "date"
		},
		{
			name: "is_published",
			label: "Published",
			type: "boolean"
		}
	]
});
//#endregion
export { SplitComponent as component };
