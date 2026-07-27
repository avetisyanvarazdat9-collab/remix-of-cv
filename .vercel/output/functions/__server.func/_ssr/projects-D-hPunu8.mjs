import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link, f as useMatches, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { f as projectsQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-D-hPunu8.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsLayout() {
	if (useMatches().some((m) => m.routeId === "/projects/$slug")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsIndex, {});
}
function ProjectsIndex() {
	const { data: projects } = useSuspenseQuery(projectsQuery);
	const loc = useLocalized();
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: t("projects.heading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: t("projects.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: (projects ?? []).map((p) => {
					const title = loc(p, "title");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$slug",
						params: { slug: p.slug },
						className: "glass rounded-2xl p-6 hover:border-primary/40",
						children: [
							p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: title,
								className: "mb-4 aspect-video w-full rounded-lg object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground line-clamp-3",
								children: loc(p, "summary")
							}),
							p.tech_stack && p.tech_stack.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-1.5",
								children: p.tech_stack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground",
									children: t
								}, t))
							})
						]
					}, p.id);
				})
			})
		]
	}) });
}
//#endregion
export { ProjectsLayout as component };
