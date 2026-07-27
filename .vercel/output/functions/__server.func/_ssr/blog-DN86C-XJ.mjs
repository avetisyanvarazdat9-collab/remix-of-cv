import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link, f as useMatches, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as blogQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as formatDate } from "./format-date-ClbaH__N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DN86C-XJ.js
var import_jsx_runtime = require_jsx_runtime();
function BlogLayout() {
	if (useMatches().some((m) => m.routeId === "/blog/$slug")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogIndex, {});
}
function BlogIndex() {
	const { data: posts } = useSuspenseQuery(blogQuery);
	const loc = useLocalized();
	const t = useT();
	const published = (posts ?? []).filter((p) => p.is_published);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold sm:text-5xl",
			children: t("blog.heading")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-10 space-y-4",
			children: [published.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog/$slug",
				params: { slug: p.slug },
				className: "glass block rounded-2xl p-6 hover:border-primary/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: p.published_at && formatDate(p.published_at)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl font-semibold",
						children: loc(p, "title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: loc(p, "excerpt")
					})
				]
			}) }, p.id)), published.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: t("blog.empty")
			})]
		})]
	}) });
}
//#endregion
export { BlogLayout as component };
