import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as profileQuery, i as coursesQuery } from "./queries-BL4k_rC0.mjs";
import { c as truncateDescription, i as buildPageHead, s as localizedField } from "./seo-BFIIP3tD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._slug-TG7tf9iM.js
var $$splitErrorComponentImporter = () => import("./courses._slug-Vi85fS2y.mjs");
var $$splitNotFoundComponentImporter = () => import("./courses._slug-CjB_Wjgf.mjs");
var $$splitComponentImporter = () => import("./courses._slug-BUyk6Cq8.mjs");
var Route = createFileRoute("/courses/$slug")({
	loader: async ({ context, params }) => {
		const [courses] = await Promise.all([context.queryClient.ensureQueryData(coursesQuery), context.queryClient.ensureQueryData(profileQuery)]);
		return { course: (courses ?? []).find((c) => c.slug === params.slug) ?? null };
	},
	head: ({ loaderData, params }) => {
		const course = loaderData?.course;
		if (!course) return buildPageHead({
			title: "Course — Dr. Varazdat Avetisyan",
			path: `/courses/${params.slug}`
		});
		const title = localizedField(course, "title") || course.title;
		const description = truncateDescription(localizedField(course, "description") || title);
		return buildPageHead({
			title: `${title} — Dr. Varazdat Avetisyan`,
			description,
			path: `/courses/${course.slug}`,
			ogImage: course.image_url
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
