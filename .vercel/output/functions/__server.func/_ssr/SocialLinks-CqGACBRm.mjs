import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as getSocialPlatform } from "./social-platforms-CL0BN1QU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SocialLinks-CqGACBRm.js
var import_jsx_runtime = require_jsx_runtime();
function SocialPlatformIcon({ platform, className }) {
	const config = getSocialPlatform(platform);
	if (!config) return null;
	const Icon = config.icon;
	const wrapperClass = className ? "flex size-4 items-center justify-center" : "flex size-5 items-center justify-center";
	if (Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: wrapperClass,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: className ?? "size-[18px] shrink-0",
			strokeWidth: 1.75
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${wrapperClass} ${className ? "text-[10px]" : "text-[11px]"} font-semibold leading-none`,
		children: config.glyph
	});
}
function SocialLinksIconRow({ links, className }) {
	const visible = links.filter((l) => l.url?.trim());
	if (visible.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `inline-flex items-center justify-center gap-3.5 ${className ?? ""}`,
		children: visible.map((link) => {
			const config = getSocialPlatform(link.platform);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: link.url,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": config?.label ?? link.platform,
				className: "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/90 text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialPlatformIcon, { platform: link.platform })
			}, link.id);
		})
	});
}
function SocialLinksContactList({ links }) {
	const visible = links.filter((l) => l.url?.trim());
	if (visible.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: visible.map((link) => {
		const config = getSocialPlatform(link.platform);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-4 shrink-0 items-center justify-center text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialPlatformIcon, {
					platform: link.platform,
					className: "size-4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: link.url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "hover:underline",
				children: config?.label ?? link.platform
			})]
		}, link.id);
	}) });
}
function socialLinkUrls(links) {
	return links.map((l) => l.url?.trim()).filter((u) => !!u && /^https?:\/\//i.test(u));
}
//#endregion
export { SocialLinksIconRow as n, socialLinkUrls as r, SocialLinksContactList as t };
