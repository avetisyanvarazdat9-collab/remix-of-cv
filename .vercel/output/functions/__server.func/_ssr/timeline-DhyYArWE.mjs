import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { c as internationalExperienceQuery } from "./queries-BL4k_rC0.mjs";
import { gt as ArrowLeft, q as Earth } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timeline-DhyYArWE.js
var import_jsx_runtime = require_jsx_runtime();
function TimelinePage() {
	const { data: intlRows } = useSuspenseQuery(internationalExperienceQuery());
	const loc = useLocalized();
	const timelineEntries = [...intlRows ?? []].sort((a, b) => {
		const ad = a.event_date ? new Date(a.event_date).getTime() : 0;
		return (b.event_date ? new Date(b.event_date).getTime() : 0) - ad;
	});
	const countryCount = new Set((intlRows ?? []).map((r) => r.country_code).filter(Boolean)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-8 border-b border-border pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
						children: "International Experience"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl",
						children: "Trainings, talks & workshops"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: "A chronological record of international engagements — most recent first."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-3.5" }), countryCount > 0 ? `${countryCount} countries` : "Global reach"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
							children: [timelineEntries.length, "+ engagements"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: timelineEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-16 text-center text-sm text-muted-foreground",
					children: "No entries yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "relative space-y-8 border-l border-border pl-6 sm:pl-8",
					children: timelineEntries.map((r) => {
						const year = r.event_date ? new Date(r.event_date).toLocaleDateString(void 0, {
							year: "numeric",
							month: "short"
						}) : "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute -left-[29px] top-1.5 flex size-3 items-center justify-center sm:-left-[37px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-3 rounded-full border-2 border-background bg-primary" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
									children: [year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold uppercase tracking-[0.15em] text-primary",
										children: year
									}), r.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
										children: r.category
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-lg font-semibold text-foreground",
									children: loc(r, "title") || r.title
								}),
								(r.organization || r.location) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-muted-foreground",
									children: [r.organization, r.location].filter(Boolean).join(" · ")
								}),
								r.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: loc(r, "description") || r.description
								})
							]
						}, r.id);
					})
				})
			})
		]
	}) });
}
//#endregion
export { TimelinePage as component };
