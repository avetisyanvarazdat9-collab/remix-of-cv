import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as notFound, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { d as profileQuery, i as coursesQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as Route } from "./courses._slug-TG7tf9iM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._slug-BUyk6Cq8.js
var import_jsx_runtime = require_jsx_runtime();
function CourseDetail() {
	const { slug } = Route.useParams();
	const { data: courses } = useSuspenseQuery(coursesQuery);
	const { data: profile } = useSuspenseQuery(profileQuery);
	const loc = useLocalized();
	const t = useT();
	const course = (courses ?? []).find((c) => c.slug === slug);
	if (!course) throw notFound();
	const title = loc(course, "title");
	const description = loc(course, "description");
	const level = loc(course, "level");
	const duration = loc(course, "duration");
	const instructorName = profile ? loc(profile, "name") : "";
	const instructorTitle = profile ? loc(profile, "title") : "";
	const mailto = `mailto:?subject=${encodeURIComponent(`Enrollment inquiry: ${title}`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/courses",
				className: "text-sm text-primary",
				children: "← Back to Courses"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-bold sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2 text-sm text-primary",
				children: [level && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: level }), duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration })] })]
			}),
			course.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: course.image_url,
				alt: title,
				className: "mt-8 aspect-video w-full rounded-2xl border border-border object-cover"
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground",
				children: description
			}),
			course.topics && course.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.topics")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: course.topics.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground",
						children: tp
					}, tp))
				})]
			}),
			course.learning_outcomes && course.learning_outcomes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.outcomes")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-5 text-muted-foreground",
					children: course.learning_outcomes.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
				})]
			}),
			course.prerequisites && course.prerequisites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.prerequisites")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-5 text-muted-foreground",
					children: course.prerequisites.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
				})]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 glass rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("courses.instructor")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4",
					children: [profile.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.photo_url,
						alt: instructorName,
						className: "size-14 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: instructorName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: instructorTitle
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [course.link_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: course.link_url,
					target: "_blank",
					rel: "noreferrer",
					className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: t("courses.enroll")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: mailto,
					className: "rounded-md border border-border px-4 py-2 text-sm",
					children: t("courses.contact")
				})]
			})
		]
	}) });
}
//#endregion
export { CourseDetail as component };
