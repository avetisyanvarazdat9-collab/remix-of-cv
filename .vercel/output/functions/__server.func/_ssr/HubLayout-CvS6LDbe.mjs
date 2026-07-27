import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { ht as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HubLayout-CvS6LDbe.js
var import_jsx_runtime = require_jsx_runtime();
function HubHero({ eyebrow, heading, subheading, primaryTo, primaryLabel, secondaryTo, secondaryLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0 opacity-60",
			style: { background: "radial-gradient(60% 60% at 80% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl",
					children: heading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground",
					children: subheading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: primaryTo,
						className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
						children: [
							primaryLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					}), secondaryTo && secondaryLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: secondaryTo,
						className: "inline-flex items-center gap-2 rounded-md border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10",
						children: secondaryLabel
					})]
				})
			]
		})]
	});
}
function HubSection({ eyebrow, heading, viewAllTo, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
					children: eyebrow
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl",
					children: heading
				})] }), viewAllTo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: viewAllTo,
					className: "text-sm text-primary hover:underline",
					children: "View all →"
				})]
			}), children]
		})
	});
}
function HubCTA({ heading, text, primaryTo, primaryLabel, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-background py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0 opacity-50",
			style: { background: "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-3xl px-4 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-bold text-foreground sm:text-5xl",
					children: heading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-muted-foreground",
					children: text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: primaryTo,
					className: "mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
						" ",
						primaryLabel
					]
				})
			]
		})]
	});
}
//#endregion
export { HubHero as n, HubSection as r, HubCTA as t };
