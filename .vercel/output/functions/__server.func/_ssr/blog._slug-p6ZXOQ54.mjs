import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as blogQuery } from "./queries-BL4k_rC0.mjs";
import { c as truncateDescription, i as buildPageHead, s as localizedField } from "./seo-BFIIP3tD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-p6ZXOQ54.js
var $$splitErrorComponentImporter = () => import("./blog._slug-BLNtU4k3.mjs");
var $$splitNotFoundComponentImporter = () => import("./blog._slug-CBG_ouQL.mjs");
var $$splitComponentImporter = () => import("./blog._slug-Lqo1QaVC.mjs");
var Route = createFileRoute("/blog/$slug")({
	loader: async ({ context, params }) => {
		return { post: (await context.queryClient.ensureQueryData(blogQuery) ?? []).find((p) => p.slug === params.slug && p.is_published) ?? null };
	},
	head: ({ loaderData, params }) => {
		const post = loaderData?.post;
		if (!post) return buildPageHead({
			title: "Article — Dr. Varazdat Avetisyan",
			path: `/blog/${params.slug}`
		});
		const title = localizedField(post, "title") || post.title;
		const description = truncateDescription(localizedField(post, "excerpt") || localizedField(post, "content") || title);
		return buildPageHead({
			title: `${title} — Dr. Varazdat Avetisyan`,
			description,
			path: `/blog/${post.slug}`,
			ogType: "article",
			ogImage: post.cover_image_url
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
