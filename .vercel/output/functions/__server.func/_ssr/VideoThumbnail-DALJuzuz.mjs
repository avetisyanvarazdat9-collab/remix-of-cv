import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Play } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as resolveVideoThumbnail } from "./video-thumbnail-B7-KWSzR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VideoThumbnail-DALJuzuz.js
var import_jsx_runtime = require_jsx_runtime();
function VideoThumbnail({ video, title, fallbackLabel = "Video", className, roundedClassName = "rounded-lg" }) {
	const src = resolveVideoThumbnail(video);
	const hasImage = !!src;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group/thumb relative aspect-video w-full overflow-hidden bg-muted", roundedClassName, className),
		children: [
			hasImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: title,
				loading: "lazy",
				decoding: "async",
				className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.03]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 via-muted to-accent/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-14 items-center justify-center rounded-full border border-primary/20 bg-background/80 text-primary/70 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-6 fill-current" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: fallbackLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: cn("pointer-events-none absolute inset-0 transition-colors duration-300", hasImage ? "bg-foreground/0 group-hover/thumb:bg-foreground/20" : "bg-foreground/5 group-hover/thumb:bg-foreground/10")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-5 fill-current" })
				})
			})
		]
	});
}
//#endregion
export { VideoThumbnail as t };
