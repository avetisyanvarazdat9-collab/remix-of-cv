import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as projectsQuery } from "./queries-BL4k_rC0.mjs";
import { c as truncateDescription, i as buildPageHead, s as localizedField } from "./seo-BFIIP3tD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-BzbRaQeQ.js
var $$splitErrorComponentImporter = () => import("./projects._slug-CPmvpp5u.mjs");
var $$splitNotFoundComponentImporter = () => import("./projects._slug-BR4NV2XQ.mjs");
var $$splitComponentImporter = () => import("./projects._slug-BqNMDnEj.mjs");
var Route = createFileRoute("/projects/$slug")({
	loader: async ({ context, params }) => {
		return { project: (await context.queryClient.ensureQueryData(projectsQuery) ?? []).find((p) => p.slug === params.slug) ?? null };
	},
	head: ({ loaderData, params }) => {
		const project = loaderData?.project;
		if (!project) return buildPageHead({
			title: "Project — Dr. Varazdat Avetisyan",
			path: `/projects/${params.slug}`
		});
		const title = localizedField(project, "title") || project.title;
		const description = truncateDescription(localizedField(project, "summary") || localizedField(project, "description") || title);
		return buildPageHead({
			title: `${title} — Dr. Varazdat Avetisyan`,
			description,
			path: `/projects/${project.slug}`,
			ogImage: project.image_url
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
