import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT } from "./i18n-CteB24FQ.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-BR4NV2XQ.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectNotFound() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: t("projects.notFound")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/projects",
			className: "mt-4 inline-block text-primary",
			children: t("projects.backList")
		})]
	}) });
}
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectNotFound, {});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
