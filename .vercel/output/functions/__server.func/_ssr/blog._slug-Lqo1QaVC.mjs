import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as notFound, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as blogQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as formatDate } from "./format-date-ClbaH__N.mjs";
import { t as Route } from "./blog._slug-p6ZXOQ54.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-Lqo1QaVC.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPost() {
	const { slug } = Route.useParams();
	const { data: posts } = useSuspenseQuery(blogQuery);
	const post = (posts ?? []).find((p) => p.slug === slug && p.is_published);
	const loc = useLocalized();
	const t = useT();
	if (!post) throw notFound();
	const title = loc(post, "title");
	const content = loc(post, "content");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/blog",
				className: "text-sm text-primary",
				children: t("blog.back")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: post.published_at && formatDate(post.published_at)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl",
				children: title
			}),
			post.cover_image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.cover_image_url,
				alt: title,
				className: "mt-8 w-full rounded-2xl border border-border"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-invert prose-headings:font-display mt-8 max-w-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: content ?? "" })
			})
		]
	}) });
}
//#endregion
export { BlogPost as component };
