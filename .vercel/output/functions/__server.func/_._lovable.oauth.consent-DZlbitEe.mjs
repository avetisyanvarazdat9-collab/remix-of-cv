import { o as __toESM } from "./_runtime.mjs";
import { T as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { n as oauthApi, t as Route } from "./_._lovable.oauth.consent-9vTX7Na6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-DZlbitEe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Consent() {
	const details = Route.useLoaderData();
	const { authorization_id } = Route.useSearch();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function decide(approve) {
		setBusy(true);
		setError(null);
		const api = oauthApi();
		const { data, error } = approve ? await api.approveAuthorization(authorization_id) : await api.denyAuthorization(authorization_id);
		if (error) {
			setBusy(false);
			setError(error.message ?? "Authorization failed");
			return;
		}
		const target = data?.redirect_url ?? data?.redirect_to;
		if (!target) {
			setBusy(false);
			setError("No redirect returned by the authorization server.");
			return;
		}
		window.location.href = target;
	}
	const clientName = details?.client?.name ?? details?.client?.client_name ?? "an app";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-2xl font-bold",
				children: ["Connect ", clientName]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"This will let ",
					clientName,
					" use this site's MCP tools as you. It does not bypass this app's permissions or backend policies."
				]
			})] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					onClick: () => decide(true),
					className: "flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
					children: busy ? "Working…" : "Approve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					onClick: () => decide(false),
					className: "flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium disabled:opacity-60",
					children: "Deny"
				})]
			})
		]
	});
}
//#endregion
export { Consent as component };
