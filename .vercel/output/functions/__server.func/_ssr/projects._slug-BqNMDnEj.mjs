import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as notFound, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { f as projectsQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as Route } from "./projects._slug-BzbRaQeQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-BqNMDnEj.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetail() {
	const { slug } = Route.useParams();
	const { data: projects } = useSuspenseQuery(projectsQuery);
	const project = (projects ?? []).find((p) => p.slug === slug);
	const loc = useLocalized();
	const t = useT();
	if (!project) throw notFound();
	const title = loc(project, "title");
	const summary = loc(project, "summary");
	const description = loc(project, "description");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/projects",
				className: "text-sm text-primary",
				children: t("projects.back")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-bold sm:text-5xl",
				children: title
			}),
			summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg text-muted-foreground",
				children: summary
			}),
			project.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: project.image_url,
				alt: title,
				className: "mt-8 w-full rounded-2xl border border-border"
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [project.link_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: project.link_url,
					target: "_blank",
					rel: "noreferrer",
					className: "rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground",
					children: t("projects.visit")
				}), project.repo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: project.repo_url,
					target: "_blank",
					rel: "noreferrer",
					className: "rounded-md border border-border px-4 py-2 text-sm",
					children: t("projects.source")
				})]
			})
		]
	}) });
}
//#endregion
export { ProjectDetail as component };
