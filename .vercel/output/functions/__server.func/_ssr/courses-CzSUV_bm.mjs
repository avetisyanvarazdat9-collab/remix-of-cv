import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as useMatches, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as coursesQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-CzSUV_bm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTER_OPTIONS = [
	{
		id: "all",
		labelKey: "courses.filter.all"
	},
	{
		id: "online",
		labelKey: "courses.filter.online"
	},
	{
		id: "ongoing",
		labelKey: "courses.filter.ongoing"
	},
	{
		id: "completed",
		labelKey: "courses.filter.completed"
	}
];
function courseDeliveryType(course) {
	return course.delivery_type === "online" ? "online" : "offline";
}
function courseStatus(course) {
	return course.status === "completed" ? "completed" : "ongoing";
}
function matchesCourseFilter(course, filter) {
	if (filter === "all") return true;
	if (filter === "online") return courseDeliveryType(course) === "online";
	if (filter === "ongoing") return courseStatus(course) === "ongoing";
	return courseStatus(course) === "completed";
}
function CoursesLayout() {
	if (useMatches().some((m) => m.routeId === "/courses/$slug")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoursesIndex, {});
}
function CoursesIndex() {
	const { data: courses } = useSuspenseQuery(coursesQuery);
	const loc = useLocalized();
	const t = useT();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filteredCourses = (0, import_react.useMemo)(() => (courses ?? []).filter((c) => matchesCourseFilter(c, filter)), [courses, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: t("courses.heading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: t("courses.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 -mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1",
				children: FILTER_OPTIONS.map((option) => {
					const active = filter === option.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(option.id),
						"aria-pressed": active,
						className: `shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${active ? "bg-primary text-primary-foreground shadow-sm" : "border border-border bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground"}`,
						children: t(option.labelKey)
					}, option.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: filteredCourses.map((c) => {
					const title = loc(c, "title");
					const level = loc(c, "level");
					const duration = loc(c, "duration");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-col rounded-2xl p-6 hover:border-primary/40",
						children: [
							c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image_url,
								alt: title,
								className: "mb-4 aspect-video w-full rounded-lg object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-primary",
								children: [level && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: level }), duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-lg font-semibold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
								children: loc(c, "description")
							}),
							c.topics && c.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-1.5",
								children: c.topics.slice(0, 6).map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground",
									children: tp
								}, tp))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto pt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/courses/$slug",
									params: { slug: c.slug },
									className: "inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
									children: t("courses.learnMore")
								})
							})
						]
					}, c.id);
				})
			}),
			(courses ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted-foreground",
				children: t("courses.empty")
			}),
			(courses ?? []).length > 0 && filteredCourses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted-foreground",
				children: t("courses.filter.empty")
			})
		]
	}) });
}
//#endregion
export { CoursesLayout as component };
