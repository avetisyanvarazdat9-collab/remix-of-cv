import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { r as companiesQuery } from "./queries-BL4k_rC0.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/companies-D9zzkPvU.js
var import_jsx_runtime = require_jsx_runtime();
function CompaniesPage() {
	const { data: companies } = useSuspenseQuery(companiesQuery);
	const loc = useLocalized();
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-4xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: t("companies.heading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: t("companies.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-10 space-y-4",
				children: [(companies ?? []).map((c) => {
					const role = loc(c, "role");
					const description = loc(c, "description");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass flex gap-5 rounded-2xl p-6",
						children: [c.logo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.logo_url,
							alt: c.name ?? "",
							className: "size-14 rounded-lg object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-semibold",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [c.start_year, c.is_current ? t("companies.present") : c.end_year ? `–${c.end_year}` : ""]
									})]
								}),
								role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary",
									children: role
								}),
								description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: description
								}),
								c.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: c.website_url,
									target: "_blank",
									rel: "noreferrer",
									className: "mt-2 inline-block text-sm text-primary hover:underline",
									children: t("companies.visit")
								})
							]
						})]
					}, c.id);
				}), (companies ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("companies.empty")
				})]
			})
		]
	}) });
}
//#endregion
export { CompaniesPage as component };
