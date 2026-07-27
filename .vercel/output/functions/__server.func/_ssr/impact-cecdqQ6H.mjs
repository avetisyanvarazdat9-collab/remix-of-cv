import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as testimonialsQuery, g as talksQuery, h as statisticsQuery, r as companiesQuery } from "./queries-BL4k_rC0.mjs";
import { mt as Award, u as TrendingUp, y as Quote } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as HubHero, r as HubSection, t as HubCTA } from "./HubLayout-CvS6LDbe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impact-cecdqQ6H.js
var import_jsx_runtime = require_jsx_runtime();
function ImpactHub() {
	const { data: stats } = useSuspenseQuery(statisticsQuery);
	const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
	const { data: companies } = useSuspenseQuery(companiesQuery);
	const { data: talks } = useSuspenseQuery(talksQuery);
	const loc = useLocalized();
	const partners = (companies ?? []).filter((c) => c.is_visible);
	const featuredTalks = (talks ?? []).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubHero, {
			eyebrow: "Impact",
			heading: "Measurable outcomes, real people",
			subheading: "A decade of teaching, building, and speaking — turned into numbers, stories, and lasting partnerships.",
			primaryTo: "/contact",
			primaryLabel: "See How I Can Help"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "By the numbers",
			heading: "Impact in action",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: (stats ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-4xl font-bold text-primary sm:text-5xl",
						children: loc(s, "value") || s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-sm text-muted-foreground",
						children: loc(s, "label") || s.label
					})]
				}, s.id))
			})
		}),
		(testimonials?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Voices",
			heading: "What people say",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: (testimonials ?? []).map((tm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-6 text-primary/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-4 text-sm leading-relaxed text-foreground",
							children: loc(tm, "quote") || tm.quote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-5 flex items-center gap-3",
							children: [tm.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tm.avatar_url,
								alt: "",
								className: "size-10 rounded-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary",
								children: tm.author_name?.slice(0, 1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold text-foreground",
									children: tm.author_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [tm.role, tm.organization].filter(Boolean).join(" · ")
								})]
							})]
						})
					]
				}, tm.id))
			})
		}),
		featuredTalks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Recognition",
			heading: "Talks, keynotes & media",
			viewAllTo: "/talks",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: featuredTalks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-base font-semibold text-foreground",
							children: loc(t, "title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [t.event_name, t.location].filter(Boolean).join(" · ")
						})
					]
				}, t.id))
			})
		}),
		partners.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Partners",
			heading: "Trusted by universities and organizations",
			viewAllTo: "/companies",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
				children: partners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: p.website_url ?? "#",
					target: p.website_url ? "_blank" : void 0,
					rel: "noreferrer",
					className: "flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/40",
					children: [p.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.logo_url,
						alt: p.name,
						className: "h-10 w-auto object-contain"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-1 text-xs text-muted-foreground",
						children: p.name
					})]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubCTA, {
			heading: "Bring this impact to your team",
			text: "Whether you're an organization, university, or team — let's see what's possible.",
			primaryTo: "/contact",
			primaryLabel: "Start a Conversation",
			icon: Award
		})
	] });
}
//#endregion
export { ImpactHub as component };
