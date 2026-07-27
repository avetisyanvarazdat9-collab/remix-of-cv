import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-client-error.functions-2fM66MgP.js
/**
* Records a client-side runtime error into the server logs so it shows up in
* Worker / dev-server logs alongside SSR errors. Keep this lightweight — no
* DB writes — so a logging failure can never cascade into a second error.
*/
var logClientError_createServerFn_handler = createServerRpc({
	id: "f6cad80bede60409474d12c15407f69c2f3479539a39e4bfe68cfe1445845a93",
	name: "logClientError",
	filename: "src/lib/log-client-error.functions.ts"
}, (opts) => logClientError.__executeServer(opts));
var logClientError = createServerFn({ method: "POST" }).inputValidator((data) => {
	const d = data ?? {};
	const str = (v, max) => typeof v === "string" && v.length > 0 ? v.slice(0, max) : "";
	return {
		message: str(d.message, 2e3) || "(no message)",
		stack: str(d.stack, 8e3),
		source: str(d.source, 100) || "unknown",
		url: str(d.url, 500),
		timestamp: str(d.timestamp, 64) || (/* @__PURE__ */ new Date()).toISOString(),
		userAgent: str(d.userAgent, 300)
	};
}).handler(logClientError_createServerFn_handler, async ({ data }) => {
	console.error(`[client-error ${data.timestamp}] (${data.source}) ${data.message}` + (data.url ? `\n  url: ${data.url}` : "") + (data.userAgent ? `\n  ua: ${data.userAgent}` : "") + (data.stack ? `\n${data.stack}` : ""));
	try {
		const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
		const src = data.source;
		const isClient = src.startsWith("react") || src.startsWith("window") || src === "unhandledrejection" || src === "manual";
		await supabaseAdmin.from("error_logs").insert({
			source: isClient ? "client" : "server",
			kind: src,
			severity: "error",
			message: data.message,
			stack: data.stack || null,
			url: data.url || null,
			route: data.url ? new URL(data.url, "http://x").pathname : null,
			user_agent: data.userAgent || null,
			occurred_at: data.timestamp
		});
	} catch (e) {
		console.error("[client-error] failed to persist:", e);
	}
	return { ok: true };
});
//#endregion
export { logClientError_createServerFn_handler };
