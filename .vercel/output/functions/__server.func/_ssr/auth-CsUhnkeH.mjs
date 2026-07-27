import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT } from "./i18n-CteB24FQ.mjs";
import { t as useAuth } from "./useAuth-BdAl8A3P.mjs";
import { M as Lock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-fhpPBlAs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CsUhnkeH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const { next } = Route.useSearch();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const t = useT();
	function goNext() {
		if (next && next.startsWith("/") && !next.startsWith("//")) window.location.href = next;
		else navigate({ to: "/admin" });
	}
	(0, import_react.useEffect)(() => {
		if (user && !loading) goNext();
	}, [user, loading]);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const username = String(fd.get("username") ?? "").trim().toLowerCase();
		const password = String(fd.get("password") ?? "");
		if (!username || !password) return;
		setBusy(true);
		try {
			const email = username.includes("@") ? username : `${username}@admin.local`;
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			goNext();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t("auth.invalid"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-hero relative flex min-h-screen items-center justify-center px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid absolute inset-0 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass relative w-full max-w-md rounded-2xl p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-lg bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold",
						children: t("auth.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("auth.restricted")
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
							children: t("auth.username")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "username",
							type: "text",
							required: true,
							autoFocus: true,
							autoComplete: "username",
							defaultValue: "",
							className: "w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
							children: t("auth.password")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "password",
							type: "password",
							required: true,
							minLength: 6,
							autoComplete: "current-password",
							className: "w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy,
							className: "w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: busy ? t("auth.signingIn") : t("auth.signIn")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
						children: t("auth.backHome")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth-status",
						className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
						children: "Auth status"
					})]
				})
			]
		})]
	});
}
//#endregion
export { AuthPage as component };
