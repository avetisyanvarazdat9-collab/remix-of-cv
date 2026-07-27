import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as MessageSquare, _ as Rocket, lt as BrainCircuit, o as Users, p as Sparkles, st as Building2 } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as HubHero, r as HubSection, t as HubCTA } from "./HubLayout-CvS6LDbe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transform-DQNJcjAK.js
var import_jsx_runtime = require_jsx_runtime();
var SERVICES = [
	{
		icon: BrainCircuit,
		title: "AI Strategy Consulting",
		text: "Assess your data landscape, identify high-impact AI use cases, and design a phased roadmap grounded in what's technically feasible."
	},
	{
		icon: Users,
		title: "Corporate Training",
		text: "Custom workshops for executives, product teams, and engineers on Generative AI, Prompt Engineering, and AI Agents."
	},
	{
		icon: Building2,
		title: "Digital Transformation",
		text: "Guide your organization through AI-first product changes, org design, and hiring for data-driven capabilities."
	},
	{
		icon: Rocket,
		title: "AI Product Design",
		text: "Co-design RAG systems, AI agents, and educational assistants — from prototype to production."
	},
	{
		icon: Sparkles,
		title: "AI Adoption Programs",
		text: "Structured 8–12 week programs to embed AI literacy across your teams, with measurable outcomes."
	},
	{
		icon: MessageSquare,
		title: "Executive Briefings",
		text: "Private sessions for leadership on what Generative AI, Agentic AI, and Foundation Models mean for your business."
	}
];
function TransformHub() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubHero, {
			eyebrow: "Transform",
			heading: "AI that changes how your organization works",
			subheading: "Consulting, corporate training, and AI adoption programs for leaders who want more than a demo — they want measurable transformation.",
			primaryTo: "/contact",
			primaryLabel: "Request a Consultation",
			secondaryTo: "/companies",
			secondaryLabel: "See Past Clients"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSection, {
			eyebrow: "Services",
			heading: "Ways I can help your team",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-8 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-semibold text-foreground",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: s.text
						})
					]
				}, s.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
							children: "Engagement model"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold text-foreground",
							children: "How we work together"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-8 grid gap-6 md:grid-cols-4",
							children: [
								{
									n: "01",
									t: "Discovery",
									d: "30-min consultation to understand goals, constraints, and success criteria."
								},
								{
									n: "02",
									t: "Proposal",
									d: "Scoped proposal with milestones, deliverables, and pricing — usually within a week."
								},
								{
									n: "03",
									t: "Delivery",
									d: "Weekly working sessions, hands-on artifacts, and clear progress tracking."
								},
								{
									n: "04",
									t: "Handoff",
									d: "Documentation, training, and ongoing support so your team can run with it."
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-4xl font-bold text-primary/40",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-base font-semibold text-foreground",
									children: s.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: s.d
								})
							] }, s.n))
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubCTA, {
			heading: "Let's talk about your AI roadmap",
			text: "Tell me about your team and what you're trying to build. I'll follow up within two business days.",
			primaryTo: "/contact",
			primaryLabel: "Request a Consultation",
			icon: MessageSquare
		})
	] });
}
//#endregion
export { TransformHub as component };
