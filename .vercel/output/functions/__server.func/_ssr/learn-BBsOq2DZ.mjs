import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as coursesQuery, t as blogQuery, v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { W as FileText, ft as BookOpen, ht as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as HubHero, r as HubSection, t as HubCTA } from "./HubLayout-CvS6LDbe.mjs";
import { t as VideoThumbnail } from "./VideoThumbnail-DALJuzuz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-BBsOq2DZ.js
var import_jsx_runtime = require_jsx_runtime();
function LearnHub() {
	const { data: courses } = useSuspenseQuery(coursesQuery);
	const { data: videos } = useSuspenseQuery(videoCoursesQuery);
	const { data: posts } = useSuspenseQuery(blogQuery);
	const loc = useLocalized();
	const t = useT();
	const featuredCourses = (courses ?? []).filter((c) => c.is_visible).slice(0, 6);
	const featuredVideos = (videos ?? []).filter((v) => v.is_visible).slice(0, 4);
	const featuredPosts = (posts ?? []).filter((p) => p.is_published !== false).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubHero, {
			eyebrow: "Learn",
			heading: "Build real AI and data skills",
			subheading: "Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner.",
			primaryTo: "/courses",
			primaryLabel: "Browse Courses",
			secondaryTo: "/video-courses",
			secondaryLabel: "Watch Videos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Courses",
			heading: "Instructor-led programs",
			viewAllTo: "/courses",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: featuredCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40",
					children: [c.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image_url,
						alt: loc(c, "title"),
						className: "h-40 w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-40 w-full",
						style: { background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold text-foreground",
								children: loc(c, "title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
								children: loc(c, "description")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/courses",
								className: "mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline",
								children: ["Learn more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					})]
				}, c.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Video Library",
			heading: "Watch and learn at your pace",
			viewAllTo: "/video-courses",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
				children: featuredVideos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: v.video_url || "#",
					target: "_blank",
					rel: "noreferrer",
					className: "group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumbnail, {
						video: v,
						title: loc(v, "title"),
						fallbackLabel: t("video.thumbnailLabel"),
						roundedClassName: "rounded-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm font-medium text-foreground",
							children: loc(v, "title")
						}), v.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: loc(v, "platform")
						})]
					})]
				}, v.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Articles",
			heading: "Insights from the frontier of AI",
			viewAllTo: "/blog",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: featuredPosts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: p.slug },
					className: "group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-base font-semibold text-foreground group-hover:text-primary",
							children: loc(p, "title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
							children: loc(p, "excerpt") || loc(p, "summary")
						})
					]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubCTA, {
			heading: "Ready to enroll in a course?",
			text: "Reach out to discuss which program best matches your goals, team, or organization.",
			primaryTo: "/contact",
			primaryLabel: "Get Course Details",
			icon: BookOpen
		})
	] });
}
//#endregion
export { LearnHub as component };
