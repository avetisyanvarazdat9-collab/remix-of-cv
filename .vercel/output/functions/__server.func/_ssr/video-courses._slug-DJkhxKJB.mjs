import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as notFound, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as resolveVideoThumbnail } from "./video-thumbnail-B7-KWSzR.mjs";
import { t as VideoThumbnail } from "./VideoThumbnail-DALJuzuz.mjs";
import { t as Route } from "./video-courses._slug-2TNymY4S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-courses._slug-DJkhxKJB.js
var import_jsx_runtime = require_jsx_runtime();
function getYouTubeEmbed(url) {
	if (!url) return null;
	try {
		const u = new URL(url);
		if (u.hostname === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
		if (u.hostname.includes("youtube.com")) {
			const v = u.searchParams.get("v");
			if (v) return `https://www.youtube.com/embed/${v}`;
			if (u.pathname.startsWith("/embed/")) return url;
		}
	} catch {}
	return null;
}
function VideoCourseDetail() {
	const { slug } = Route.useParams();
	const { data: videos } = useSuspenseQuery(videoCoursesQuery);
	const loc = useLocalized();
	const t = useT();
	const video = (videos ?? []).find((v) => v.slug === slug);
	if (!video) throw notFound();
	const title = loc(video, "title");
	const description = loc(video, "description");
	const platform = loc(video, "platform");
	const duration = loc(video, "duration");
	const embed = getYouTubeEmbed(video.youtube_url) ?? getYouTubeEmbed(video.video_url);
	const related = (videos ?? []).filter((v) => v.slug !== slug).filter((v) => {
		const a = video.topics ?? [];
		const b = v.topics ?? [];
		return a.length === 0 || b.some((t) => a.includes(t));
	}).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-4xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/video-courses",
				className: "text-sm text-primary",
				children: "← Back to Video Courses"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-bold sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2 text-sm text-primary",
				children: [platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: platform }), duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration })] })]
			}),
			embed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: embed,
					title,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowFullScreen: true,
					className: "h-full w-full"
				})
			}) : resolveVideoThumbnail(video) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveVideoThumbnail(video),
				alt: title,
				className: "mt-8 aspect-video w-full rounded-2xl border border-border object-cover"
			}) : null,
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground",
				children: description
			}),
			video.topics && video.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.topics")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: video.topics.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground",
						children: tp
					}, tp))
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.related")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3",
					children: related.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/video-courses/$slug",
						params: { slug: v.slug },
						className: "glass overflow-hidden rounded-xl hover:border-primary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumbnail, {
							video: v,
							title: loc(v, "title"),
							roundedClassName: "rounded-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 font-display text-sm font-semibold",
							children: loc(v, "title")
						})]
					}, v.id))
				})]
			})
		]
	}) });
}
//#endregion
export { VideoCourseDetail as component };
