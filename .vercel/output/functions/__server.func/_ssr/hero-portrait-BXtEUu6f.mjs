import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { V as GraduationCap, ct as Briefcase, lt as BrainCircuit } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-portrait-BXtEUu6f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RevealOnScroll({ children, className, delay = 0, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .1,
			rootMargin: "0px 0px -48px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("reveal-on-scroll", visible && "reveal-visible", className),
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
var FOCUS_MARKER = "Professional Focus";
var AFTER_FOCUS_MARKER = "Academic & Industry Impact";
function splitTags(description) {
	if (!description.includes(",")) return [];
	return description.split(/,|\band\b/i).map((part) => part.trim().replace(/\.$/, "")).filter(Boolean);
}
function parsePillarLine(line) {
	const colonIdx = line.indexOf(":");
	if (colonIdx <= 0) return null;
	const title = line.slice(0, colonIdx).trim();
	const description = line.slice(colonIdx + 1).trim();
	if (!title || !description) return null;
	return {
		title,
		description,
		tags: splitTags(description)
	};
}
function parseProfessionalFocusFromBio(bio) {
	const focusIdx = bio.indexOf(FOCUS_MARKER);
	if (focusIdx === -1) return null;
	const beforeFocus = bio.slice(0, focusIdx).trim();
	let rest = bio.slice(focusIdx + 18).trim();
	let afterFocus = "";
	const afterIdx = rest.indexOf(AFTER_FOCUS_MARKER);
	if (afterIdx !== -1) {
		afterFocus = rest.slice(afterIdx).trim();
		rest = rest.slice(0, afterIdx).trim();
	}
	const pillars = rest.split("\n").map((line) => line.trim()).filter(Boolean).map(parsePillarLine).filter((pillar) => pillar !== null);
	if (pillars.length === 0) return null;
	return {
		beforeFocus,
		pillars,
		afterFocus
	};
}
var ICONS = {
	"Artificial Intelligence": BrainCircuit,
	Education: GraduationCap,
	Consulting: Briefcase
};
function pillarIcon(title) {
	return ICONS[title] ?? BrainCircuit;
}
function ProfessionalFocusBento({ pillars }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "professional-focus-bento",
		className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: pillars.map((pillar) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "group glass flex h-full flex-col rounded-2xl p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "icon-badge size-11 shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillarIcon(pillar.title), { className: "size-5 transition-transform duration-300 group-hover:-translate-y-0.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-xl font-semibold tracking-tight text-foreground",
						children: pillar.title
					}),
					pillar.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: pillar.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground",
							children: tag
						}, tag))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: pillar.description
					})
				]
			}, pillar.title);
		})
	});
}
function ProfileBioContent({ bio, paragraphClassName }) {
	const parsed = parseProfessionalFocusFromBio(bio);
	const paragraphClass = paragraphClassName ?? "whitespace-pre-line leading-relaxed text-muted-foreground";
	if (!parsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: paragraphClass,
		children: bio
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			parsed.beforeFocus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: paragraphClass,
				children: parsed.beforeFocus
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-eyebrow",
					children: "Professional Focus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfessionalFocusBento, { pillars: parsed.pillars })]
			}),
			parsed.afterFocus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: paragraphClass,
				children: parsed.afterFocus
			})
		]
	});
}
//#endregion
export { RevealOnScroll as n, ProfileBioContent as t };
