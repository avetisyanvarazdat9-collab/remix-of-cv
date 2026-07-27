import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._slug-Vi85fS2y.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mx-auto max-w-3xl px-4 py-24 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-2xl",
		children: "Failed to load course"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-muted-foreground",
		children: error.message
	})]
}) });
//#endregion
export { SplitErrorComponent as errorComponent };
