import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link, f as useMatches, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as VideoThumbnail } from "./VideoThumbnail-DALJuzuz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-courses-CzST4JRu.js
var import_jsx_runtime = require_jsx_runtime();
function VideoCoursesLayout() {
	if (useMatches().some((m) => m.routeId === "/video-courses/$slug")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCoursesIndex, {});
}
function VideoCoursesIndex() {
	const { data: videos } = useSuspenseQuery(videoCoursesQuery);
	const loc = useLocalized();
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: t("video.heading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: t("video.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: [(videos ?? []).map((v) => {
					const title = loc(v, "title");
					const platform = loc(v, "platform");
					const duration = loc(v, "duration");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass group flex flex-col rounded-2xl p-4 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/video-courses/$slug",
								params: { slug: v.slug },
								className: "block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumbnail, {
									video: v,
									title,
									fallbackLabel: t("video.thumbnailLabel")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-2 pt-4 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-primary",
										children: [platform, duration && ` · ${duration}`]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-base font-semibold",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
										children: loc(v, "description")
									}),
									v.topics && v.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-1.5",
										children: v.topics.slice(0, 5).map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground",
											children: tp
										}, tp))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto px-2 pb-2 pt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/video-courses/$slug",
									params: { slug: v.slug },
									className: "inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
									children: t("courses.learnMore")
								})
							})
						]
					}, v.id);
				}), (videos ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("video.empty")
				})]
			})
		]
	}) });
}
//#endregion
export { VideoCoursesLayout as component };
