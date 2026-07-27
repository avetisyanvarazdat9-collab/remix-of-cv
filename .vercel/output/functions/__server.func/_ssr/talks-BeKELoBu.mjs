import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { g as talksQuery } from "./queries-BL4k_rC0.mjs";
import { k as MapPin, ot as Calendar } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { t as formatDate } from "./format-date-ClbaH__N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talks-BeKELoBu.js
var import_jsx_runtime = require_jsx_runtime();
function TalksPage() {
	const { data: talks } = useSuspenseQuery(talksQuery);
	const loc = useLocalized();
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold sm:text-5xl",
			children: t("talks.heading")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-10 space-y-6",
			children: [(talks ?? []).map((tk) => {
				const title = loc(tk, "title");
				const eventName = loc(tk, "event_name");
				const location = loc(tk, "location");
				const description = loc(tk, "description");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: title
						}),
						eventName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-primary",
							children: eventName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground",
							children: [tk.event_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), formatDate(tk.event_date)]
							}), location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), location]
							})]
						}),
						description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-3",
							children: [tk.slides_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: tk.slides_url,
								target: "_blank",
								rel: "noreferrer",
								className: "text-sm text-primary hover:underline",
								children: t("talks.slides")
							}), tk.video_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: tk.video_url,
								target: "_blank",
								rel: "noreferrer",
								className: "text-sm text-primary hover:underline",
								children: t("talks.video")
							})]
						})
					]
				}, tk.id);
			}), (talks ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: t("talks.empty")
			})]
		})]
	}) });
}
//#endregion
export { TalksPage as component };
