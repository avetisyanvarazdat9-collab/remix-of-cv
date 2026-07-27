import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { f as projectsQuery, g as talksQuery, r as companiesQuery } from "./queries-BL4k_rC0.mjs";
import { B as Handshake, E as MicVocal, ct as Briefcase } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as HubHero, r as HubSection, t as HubCTA } from "./HubLayout-CvS6LDbe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collaborate-D7SDdGuH.js
var import_jsx_runtime = require_jsx_runtime();
function CollaborateHub() {
	const { data: projects } = useSuspenseQuery(projectsQuery);
	const { data: talks } = useSuspenseQuery(talksQuery);
	const { data: companies } = useSuspenseQuery(companiesQuery);
	const loc = useLocalized();
	const featuredProjects = (projects ?? []).filter((p) => p.is_visible).slice(0, 6);
	const featuredTalks = (talks ?? []).slice(0, 4);
	const partners = (companies ?? []).filter((c) => c.is_visible).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubHero, {
			eyebrow: "Collaborate",
			heading: "Research, speaking, and partnerships",
			subheading: "From joint research and grant proposals to keynote talks and cross-institutional programs — let's build something together.",
			primaryTo: "/contact",
			primaryLabel: "Propose a Collaboration",
			secondaryTo: "/talks",
			secondaryLabel: "See Talks & Events"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Projects",
			heading: "Selected research & applied work",
			viewAllTo: "/projects",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: featuredProjects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: p.slug },
					className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40",
					children: [p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url,
						alt: loc(p, "title"),
						className: "h-40 w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 w-full bg-gradient-to-br from-primary/20 to-accent/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-base font-semibold text-foreground",
								children: loc(p, "title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
								children: loc(p, "description")
							})
						]
					})]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Speaking",
			heading: "Recent talks & events",
			viewAllTo: "/talks",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: featuredTalks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicVocal, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-lg font-semibold text-foreground",
							children: loc(t, "title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [[t.event_name, t.location].filter(Boolean).join(" · "), t.event_date && ` · ${new Date(t.event_date).toLocaleDateString(void 0, {
								year: "numeric",
								month: "short"
							})}`]
						}),
						loc(t, "description") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
							children: loc(t, "description")
						})
					]
				}, t.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Partners",
			heading: "Institutions I collaborate with",
			viewAllTo: "/companies",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: partners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: p.website_url ?? "#",
					target: p.website_url ? "_blank" : void 0,
					rel: "noreferrer",
					className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40",
					children: [p.logo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.logo_url,
						alt: "",
						className: "size-10 rounded-md bg-background object-contain p-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium text-foreground",
							children: p.name
						}), p.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: p.role
						})]
					})]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubCTA, {
			heading: "Have an idea worth exploring together?",
			text: "Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome.",
			primaryTo: "/contact",
			primaryLabel: "Get in Touch",
			icon: Handshake
		})
	] });
}
//#endregion
export { CollaborateHub as component };
