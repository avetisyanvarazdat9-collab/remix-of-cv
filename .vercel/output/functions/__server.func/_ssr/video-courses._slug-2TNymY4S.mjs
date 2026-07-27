import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { c as truncateDescription, i as buildPageHead, s as localizedField } from "./seo-BFIIP3tD.mjs";
import { t as resolveVideoThumbnail } from "./video-thumbnail-B7-KWSzR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-courses._slug-2TNymY4S.js
var $$splitErrorComponentImporter = () => import("./video-courses._slug-DY09ye97.mjs");
var $$splitNotFoundComponentImporter = () => import("./video-courses._slug-m2IO6tf-.mjs");
var $$splitComponentImporter = () => import("./video-courses._slug-DJkhxKJB.mjs");
var Route = createFileRoute("/video-courses/$slug")({
	loader: async ({ context, params }) => {
		return { video: (await context.queryClient.ensureQueryData(videoCoursesQuery) ?? []).find((v) => v.slug === params.slug) ?? null };
	},
	head: ({ loaderData, params }) => {
		const video = loaderData?.video;
		if (!video) return buildPageHead({
			title: "Video Course — Dr. Varazdat Avetisyan",
			path: `/video-courses/${params.slug}`
		});
		const title = localizedField(video, "title") || video.title;
		const description = truncateDescription(localizedField(video, "description") || title);
		return buildPageHead({
			title: `${title} — Dr. Varazdat Avetisyan`,
			description,
			path: `/video-courses/${video.slug}`,
			ogImage: resolveVideoThumbnail(video) ?? void 0
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
