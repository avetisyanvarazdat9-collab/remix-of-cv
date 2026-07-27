import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useAuth } from "./useAuth-BdAl8A3P.mjs";
import { $ as CircleCheck, N as LoaderCircle, Q as CircleX, Z as ClipboardCopy, it as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-status-BWzIHUHY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthStatusPage() {
	const { user, isAdmin, loading, session } = useAuth();
	const [reachOk, setReachOk] = (0, import_react.useState)(null);
	const [reachError, setReachError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReachOk(false);
	}, ["", ""]);
	const envRows = [{
		label: "VITE_SUPABASE_URL",
		ok: false,
		value: "missing"
	}, {
		label: "VITE_SUPABASE_PUBLISHABLE_KEY (or ANON_KEY)",
		ok: false,
		value: "missing"
	}];
	const authRows = loading ? [{
		label: "Session",
		ok: false,
		value: "loading…"
	}] : user ? [
		{
			label: "Signed in",
			ok: true,
			value: user.email ?? user.id
		},
		{
			label: "User ID",
			ok: true,
			value: user.id
		},
		{
			label: "Admin role",
			ok: isAdmin,
			value: isAdmin ? "yes" : "no",
			hint: isAdmin ? void 0 : "Add a row in user_roles with role='admin' for this user id."
		},
		{
			label: "Access token",
			ok: !!session?.access_token,
			value: session?.access_token ? `${session.access_token.slice(0, 8)}…${session.access_token.slice(-4)}` : "none"
		}
	] : [{
		label: "Signed in",
		ok: false,
		value: "no",
		hint: "Go to /auth and sign in with your admin credentials."
	}];
	const buildReport = () => {
		const lines = [];
		lines.push("Auth Status Report");
		lines.push("==================");
		lines.push("");
		lines.push("Environment variables:");
		for (const row of envRows) lines.push(`  ${row.label}: ${row.value}`);
		lines.push("");
		lines.push("Backend reachability:");
		if (reachOk === null) lines.push("  Connectivity: checking…");
		else if (reachOk) lines.push("  Connectivity: OK (query succeeded)");
		else lines.push(`  Connectivity: failed — ${reachError ?? "unknown error"}`);
		lines.push("");
		lines.push("Session:");
		for (const row of authRows) {
			lines.push(`  ${row.label}: ${row.value}`);
			if (row.hint) lines.push(`    Hint: ${row.hint}`);
		}
		lines.push("");
		lines.push("Generated: " + (/* @__PURE__ */ new Date()).toISOString());
		return lines.join("\n");
	};
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(buildReport());
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold text-foreground",
						children: "Auth status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Diagnostics for Supabase connectivity and current session."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleCopy,
								className: "inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent transition-colors",
								title: "Copy full report to clipboard",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "size-4 text-muted-foreground" }), copied ? "Copied!" : "Copy report"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent",
								children: "Sign in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90",
								children: "Admin"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Environment variables",
					rows: envRows
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Backend reachability",
					rows: [reachOk === null ? {
						label: "Connectivity",
						ok: false,
						value: "checking…"
					} : reachOk ? {
						label: "Connectivity",
						ok: true,
						value: "OK (query succeeded)"
					} : {
						label: "Connectivity",
						ok: false,
						value: reachError ?? "failed",
						hint: "Check that VITE_SUPABASE_URL points to the right project and the key matches."
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Session",
					rows: authRows
				}),
				user && !isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground",
					children: [
						"You're signed in but your account is not an admin. Insert a row into",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "user_roles"
						}),
						" with",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "role='admin'"
						}),
						" for user id",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: user.id
						}),
						"."
					]
				})
			]
		})
	});
}
function Section({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-foreground",
							children: row.label
						}),
						row.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 truncate font-mono text-xs text-muted-foreground",
							children: row.value
						}),
						row.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: row.hint
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { state: row.value === "checking…" || row.value === "loading…" ? "pending" : row.ok ? "ok" : "bad" })]
			}, row.label))
		})]
	});
}
function StatusIcon({ state }) {
	if (state === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-0.5 size-5 shrink-0 animate-spin text-muted-foreground" });
	if (state === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-5 shrink-0 text-emerald-500" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 size-5 shrink-0 text-destructive" });
}
//#endregion
export { AuthStatusPage as component };
