import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as redirect, _ as Link, c as HeadContent, d as createRouter, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, p as Outlet, s as Scripts, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$51 } from "../_._lovable.oauth.consent-9vTX7Na6.mjs";
import { n as LanguageProvider } from "./i18n-CteB24FQ.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-8VUd3M7h.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { _ as testimonialsQuery, a as educationQuery, c as internationalExperienceQuery, d as profileQuery, f as projectsQuery, g as talksQuery, h as statisticsQuery, i as coursesQuery, m as socialLinksQuery, n as certificationsQuery, o as fourDimensionsQuery, p as skillsQuery, r as companiesQuery, s as homeContentQuery, t as blogQuery, u as professionalExperienceQuery, v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { t as useAuth } from "./useAuth-BdAl8A3P.mjs";
import { n as clearTheme, r as deriveTheme, t as applyTheme } from "./theme-derive-bF79nilG.mjs";
import { M as Lock, l as TriangleAlert, n as X } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as buildPersonJsonLd, i as buildPageHead, n as absoluteUrl, o as escapeXml, r as buildGlobalHead, t as STATIC_SITEMAP_PATHS } from "./seo-BFIIP3tD.mjs";
import { t as Route$52 } from "./auth-fhpPBlAs.mjs";
import { t as Route$53 } from "./blog._slug-p6ZXOQ54.mjs";
import { a as createTanStackListToolsHandler, c as enumType, d as stringType, i as createTanStackInvokeToolHandler, l as numberType, n as defineMcp, o as createTanStackMcpHandler, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as Route$54 } from "./courses._slug-TG7tf9iM.mjs";
import { t as Route$55 } from "./projects._slug-BzbRaQeQ.mjs";
import { t as Route$56 } from "./video-courses._slug-2TNymY4S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BPayexUY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-es_MVLWl.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
/**
* Records a client-side runtime error into the server logs so it shows up in
* Worker / dev-server logs alongside SSR errors. Keep this lightweight — no
* DB writes — so a logging failure can never cascade into a second error.
*/
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
}).handler(createSsrRpc("f6cad80bede60409474d12c15407f69c2f3479539a39e4bfe68cfe1445845a93"));
/**
* Browser-side runtime error tracker.
*
* Captures uncaught errors and unhandled promise rejections, stamps them with
* an ISO timestamp + stack, logs to the browser console, keeps a small
* in-memory ring buffer (window.__errorLog) for debugging, and forwards each
* entry to the server so it lands in the Worker / dev-server logs too.
*
* Idempotent: install() can be called from multiple components; listeners are
* only attached once per browser session.
*/
var MAX_BUFFERED = 50;
var installed = false;
function getBuffer() {
	const w = window;
	if (!w.__errorLog) w.__errorLog = [];
	return w.__errorLog;
}
function toEntry(source, err) {
	const e = err instanceof Error ? err : new Error(typeof err === "string" ? err : JSON.stringify(err ?? "unknown"));
	return {
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		source,
		message: e.message || "(no message)",
		stack: e.stack,
		url: typeof window !== "undefined" ? window.location.href : void 0
	};
}
function trackError(source, err) {
	if (typeof window === "undefined") return;
	const entry = toEntry(source, err);
	const buf = getBuffer();
	buf.push(entry);
	if (buf.length > MAX_BUFFERED) buf.shift();
	console.error(`[${entry.timestamp}] (${entry.source}) ${entry.message}`, err);
	logClientError({ data: {
		message: entry.message,
		stack: entry.stack ?? "",
		source: entry.source,
		url: entry.url ?? "",
		timestamp: entry.timestamp,
		userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
	} }).catch(() => {});
}
function installClientErrorTracker() {
	if (typeof window === "undefined" || installed) return;
	installed = true;
	window.addEventListener("error", (event) => {
		trackError("window.error", event.error ?? event.message);
	});
	window.addEventListener("unhandledrejection", (event) => {
		trackError("unhandledrejection", event.reason);
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/**
* Global hidden admin trigger.
* Press Ctrl+Shift+A (or Cmd+Shift+A on macOS) anywhere on the site to open a
* full-screen dark overlay with the sign-in modal. Username + password only.
* No registration. Default credentials: admin / admin123 (changeable from
* /admin/settings). Passwords are hashed (bcrypt) by Supabase Auth.
*/
function HiddenAdminLogin() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { user, isAdmin, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
				e.preventDefault();
				if (!loading && user && isAdmin) {
					navigate({ to: "/admin" });
					return;
				}
				setOpen((v) => !v);
			}
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		user,
		isAdmin,
		loading,
		navigate
	]);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const username = String(fd.get("username") ?? "").trim().toLowerCase();
		const password = String(fd.get("password") ?? "");
		setBusy(true);
		try {
			const email = username.includes("@") ? username : `${username}@admin.local`;
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			toast.success("Signed in");
			setOpen(false);
			navigate({ to: "/admin" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Invalid username or password");
		} finally {
			setBusy(false);
		}
	}
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl px-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Admin sign in",
		onClick: (e) => {
			if (e.target === e.currentTarget) setOpen(false);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-2xl border border-border/60 bg-card/90 p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setOpen(false);
						navigate({ to: "/" });
					},
					"aria-label": "Close",
					className: "absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-lg bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold",
						children: "Restricted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Admin access only"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "username",
							type: "text",
							required: true,
							autoFocus: true,
							autoComplete: "username",
							className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "password",
							type: "password",
							required: true,
							minLength: 6,
							autoComplete: "current-password",
							className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: busy ? "Signing in…" : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-[11px] text-muted-foreground",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border border-border bg-background/60 px-1.5 py-0.5",
							children: "Esc"
						}),
						" to close"
					]
				})
			]
		})
	});
}
var STORAGE_KEY = "lovable.theme.v1";
async function load() {
	const root = document.documentElement;
	if (root.classList.contains("dark")) {
		clearTheme(root);
		return;
	}
	const { data } = await supabase.from("site_settings").select("primary_color, background_color, text_color").eq("id", true).maybeSingle();
	if (!data) return;
	const input = {
		primary: data.primary_color,
		background: data.background_color,
		text: data.text_color
	};
	applyTheme(root, input);
	try {
		const vars = deriveTheme(input);
		const isLight = root.style.colorScheme === "light" ? true : false;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			vars,
			colorScheme: isLight ? "light" : "dark"
		}));
	} catch {}
}
function ThemeApplier() {
	(0, import_react.useEffect)(() => {
		load();
		const channel = supabase.channel("site_settings_theme").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "site_settings"
		}, () => load()).subscribe();
		const onLight = () => load();
		window.addEventListener("lovable:theme-light", onLight);
		return () => {
			supabase.removeChannel(channel);
			window.removeEventListener("lovable:theme-light", onLight);
		};
	}, []);
	return null;
}
/**
* Verifies that the Supabase environment variables required by the browser
* client are present. Renders a friendly full-screen message instead of
* letting the app crash with an opaque error when they are missing (e.g. on
* a fresh Vercel deployment without env vars configured).
*/
function SupabaseEnvCheck({ children }) {
	const missing = [];
	missing.push("VITE_SUPABASE_URL");
	missing.push("VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY)");
	if (missing.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-lg bg-destructive/15 text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-bold text-foreground",
						children: "Backend not configured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Supabase environment variables are missing"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "This deployment is missing the environment variables required to connect to the database and authentication service. Add them in your hosting provider (e.g. Vercel → Project → Settings → Environment Variables) and redeploy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: missing.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-border bg-muted/40 px-3 py-2 font-mono text-xs text-foreground",
						children: name
					}, name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: [
						"Both values are safe to expose to the browser (protected by row-level security). Never add ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "SUPABASE_SERVICE_ROLE_KEY" }),
						" ",
						"as a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "VITE_" }),
						" variable."
					]
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
		trackError("react.errorBoundary", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$50 = createRootRouteWithContext()({
	head: () => ({
		...buildGlobalHead(),
		links: [{
			rel: "stylesheet",
			href: styles_default
		}],
		scripts: [{ src: "https://cdn.botpress.cloud/webchat/v3.6/inject.js" }, {
			src: "https://files.bpcontent.cloud/2026/06/27/04/20260627042438-7JVHPAOZ.js",
			defer: true
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
var THEME_PREHYDRATE = `(function(){try{var r=document.documentElement;var m=localStorage.getItem('lovable.darkMode.v1');if(m==='dark'){r.classList.add('dark');r.style.colorScheme='dark';}else{if(m==='light'){r.classList.remove('dark');r.style.colorScheme='light';}var s=localStorage.getItem('lovable.theme.v1');if(s){var d=JSON.parse(s);if(d&&d.vars){for(var k in d.vars){r.style.setProperty(k,d.vars[k]);}if(d.colorScheme){r.style.colorScheme=d.colorScheme;}}}}}catch(e){}})();`;
var FONT_RESOURCE_PRELUDE = `(function(){try{function fix(n){if(!n||String(n.tagName).toLowerCase()!=='link')return n;var h=n.getAttribute('href')||'';if(h.indexOf('fonts.googleapis.com/css2?family=inter:')!==-1){n.setAttribute('href',h.replace('family=inter:','family=Inter:'));}return n;}var ap=HTMLHeadElement.prototype.appendChild;HTMLHeadElement.prototype.appendChild=function(n){return ap.call(this,fix(n));};var ib=HTMLHeadElement.prototype.insertBefore;HTMLHeadElement.prototype.insertBefore=function(n,r){return ib.call(this,fix(n),r);};}catch(e){}})();`;
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: FONT_RESOURCE_PRELUDE } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_PREHYDRATE } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$50.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		installClientErrorTracker();
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [queryClient, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LanguageProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SupabaseEnvCheck, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeApplier, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiddenAdminLogin, {})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { richColors: true })] })
	});
}
var $$splitComponentImporter$43 = () => import("./video-courses-CzST4JRu.mjs");
var Route$49 = createFileRoute("/video-courses")({
	head: () => buildPageHead({
		title: "Video Courses — Dr. Varazdat Avetisyan",
		description: "On-demand video lessons on AI, machine learning, and data science from Dr. Varazdat Avetisyan.",
		path: "/video-courses"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(videoCoursesQuery),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./transform-DQNJcjAK.mjs");
var Route$48 = createFileRoute("/transform")({
	head: () => buildPageHead({
		title: "Transform — AI Consulting & Corporate Training | Dr. Varazdat Avetisyan",
		description: "AI consulting, corporate training, and digital transformation services for organizations adopting Generative AI, Machine Learning, and Data Science.",
		path: "/transform",
		keywords: "AI Consultant Armenia, AI adoption, Digital transformation, Corporate AI training, Generative AI consulting"
	}),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./timeline-DhyYArWE.mjs");
var Route$47 = createFileRoute("/timeline")({
	head: () => buildPageHead({
		title: "International Experience Timeline — Dr. Varazdat Avetisyan",
		description: "Trainings, workshops, conferences, and academic exchanges across the globe — a chronological timeline of international engagements.",
		path: "/timeline"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(internationalExperienceQuery());
	},
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./talks-BeKELoBu.mjs");
var Route$46 = createFileRoute("/talks")({
	head: () => buildPageHead({
		title: "Talks & Events — Dr. Varazdat Avetisyan",
		description: "Speaking engagements, conferences, workshops, and public events featuring Dr. Varazdat Avetisyan.",
		path: "/talks"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(talksQuery),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
function getServerClient() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
function formatLastmod(value) {
	if (!value) return void 0;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return void 0;
	return date.toISOString().slice(0, 10);
}
function urlEntry(entry) {
	const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
	return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`;
}
async function buildSitemapXml() {
	const entries = STATIC_SITEMAP_PATHS.map((path) => ({ loc: absoluteUrl(path) }));
	try {
		const supabase = getServerClient();
		const [blog, courses, projects, videos] = await Promise.all([
			supabase.from("blog_posts").select("slug, updated_at, published_at").eq("is_published", true),
			supabase.from("courses").select("slug, updated_at").eq("is_visible", true),
			supabase.from("projects").select("slug, updated_at").eq("is_visible", true),
			supabase.from("video_courses").select("slug, updated_at").eq("is_visible", true)
		]);
		for (const row of blog.data ?? []) {
			if (!row.slug) continue;
			entries.push({
				loc: absoluteUrl(`/blog/${row.slug}`),
				lastmod: formatLastmod(row.updated_at ?? row.published_at)
			});
		}
		for (const row of courses.data ?? []) {
			if (!row.slug) continue;
			entries.push({
				loc: absoluteUrl(`/courses/${row.slug}`),
				lastmod: formatLastmod(row.updated_at)
			});
		}
		for (const row of projects.data ?? []) {
			if (!row.slug) continue;
			entries.push({
				loc: absoluteUrl(`/projects/${row.slug}`),
				lastmod: formatLastmod(row.updated_at)
			});
		}
		for (const row of videos.data ?? []) {
			if (!row.slug) continue;
			entries.push({
				loc: absoluteUrl(`/video-courses/${row.slug}`),
				lastmod: formatLastmod(row.updated_at)
			});
		}
	} catch {}
	const unique = /* @__PURE__ */ new Map();
	for (const entry of entries) unique.set(entry.loc, entry);
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...unique.values()].map(urlEntry).join("\n")}
</urlset>`;
}
function buildRobotsTxt() {
	return `User-agent: *
Allow: /

Disallow: /admin
Disallow: /auth
Disallow: /auth-status
Disallow: /mcp
Disallow: /.well-known/
Disallow: /.mcp/
Disallow: /.lovable/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
var Route$45 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = await buildSitemapXml();
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var Route$44 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => new Response(buildRobotsTxt(), { headers: {
	"Content-Type": "text/plain; charset=utf-8",
	"Cache-Control": "public, max-age=3600"
} }) } } });
var $$splitComponentImporter$39 = () => import("./projects-D-hPunu8.mjs");
var Route$43 = createFileRoute("/projects")({
	head: () => buildPageHead({
		title: "Projects — Dr. Varazdat Avetisyan",
		description: "Research and engineering projects in artificial intelligence, machine learning, and data science by Dr. Varazdat Avetisyan.",
		path: "/projects"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./privacy-B1x_y993.mjs");
var Route$42 = createFileRoute("/privacy")({
	head: () => buildPageHead({
		title: "Privacy Policy — Dr. Varazdat Avetisyan",
		description: "Privacy policy for avetisyan.vercel.app — what data we collect and how we use it.",
		path: "/privacy"
	}),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
function isNewKey(v) {
	return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_");
}
function supabaseForToken(token) {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_PUBLISHABLE_KEY;
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: {
			headers: { Authorization: `Bearer ${token}` },
			fetch: (input, init) => {
				const headers = new Headers(init?.headers);
				if (isNewKey(key) && headers.get("Authorization") === `Bearer ${key}`) headers.set("Authorization", `Bearer ${token}`);
				headers.set("apikey", key);
				return fetch(input, {
					...init,
					headers
				});
			}
		}
	});
}
var list_blog_posts_default = defineTool({
	name: "list_blog_posts",
	title: "List blog posts",
	description: "List published blog posts on Dr. Varazdat Avetisyan's site.",
	inputSchema: { limit: numberType().int().min(1).max(50).optional().describe("Max posts to return (default 20).") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ limit }, ctx) => {
		if (!ctx.isAuthenticated()) return {
			content: [{
				type: "text",
				text: "Not authenticated"
			}],
			isError: true
		};
		const { data, error } = await supabaseForToken(ctx.getToken()).from("blog_posts").select("id, slug, title, excerpt, published_at, is_published").order("published_at", { ascending: false }).limit(limit ?? 20);
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { posts: data }
		};
	}
});
var get_blog_post_default = defineTool({
	name: "get_blog_post",
	title: "Get blog post",
	description: "Fetch a single blog post by slug, including full content.",
	inputSchema: { slug: stringType().min(1).describe("Blog post slug.") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ slug }, ctx) => {
		if (!ctx.isAuthenticated()) return {
			content: [{
				type: "text",
				text: "Not authenticated"
			}],
			isError: true
		};
		const { data, error } = await supabaseForToken(ctx.getToken()).from("blog_posts").select("*").eq("slug", slug).maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		if (!data) return {
			content: [{
				type: "text",
				text: `No blog post with slug "${slug}"`
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { post: data }
		};
	}
});
var list_projects_default = defineTool({
	name: "list_projects",
	title: "List projects",
	description: "List portfolio projects.",
	inputSchema: { limit: numberType().int().min(1).max(50).optional().describe("Max projects to return (default 20).") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ limit }, ctx) => {
		if (!ctx.isAuthenticated()) return {
			content: [{
				type: "text",
				text: "Not authenticated"
			}],
			isError: true
		};
		const { data, error } = await supabaseForToken(ctx.getToken()).from("projects").select("*").limit(limit ?? 20);
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { projects: data }
		};
	}
});
var list_courses_default = defineTool({
	name: "list_courses",
	title: "List courses",
	description: "List courses (written and video).",
	inputSchema: { kind: enumType([
		"written",
		"video",
		"all"
	]).optional().describe("Filter by course type (default all).") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ kind }, ctx) => {
		if (!ctx.isAuthenticated()) return {
			content: [{
				type: "text",
				text: "Not authenticated"
			}],
			isError: true
		};
		const sb = supabaseForToken(ctx.getToken());
		const k = kind ?? "all";
		const results = {};
		if (k === "written" || k === "all") {
			const { data, error } = await sb.from("courses").select("*");
			if (error) return {
				content: [{
					type: "text",
					text: error.message
				}],
				isError: true
			};
			results.courses = data;
		}
		if (k === "video" || k === "all") {
			const { data, error } = await sb.from("video_courses").select("*");
			if (error) return {
				content: [{
					type: "text",
					text: error.message
				}],
				isError: true
			};
			results.video_courses = data;
		}
		return {
			content: [{
				type: "text",
				text: JSON.stringify(results)
			}],
			structuredContent: results
		};
	}
});
var send_contact_message_default = defineTool({
	name: "send_contact_message",
	title: "Send contact message",
	description: "Send a contact message to Dr. Varazdat Avetisyan on behalf of the signed-in user.",
	inputSchema: {
		name: stringType().min(1).describe("Sender's name."),
		email: stringType().email().describe("Sender's email address."),
		subject: stringType().min(1).describe("Message subject."),
		message: stringType().min(1).describe("Message body.")
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: false,
		idempotentHint: false,
		openWorldHint: false
	},
	handler: async ({ name, email, subject, message }, ctx) => {
		if (!ctx.isAuthenticated()) return {
			content: [{
				type: "text",
				text: "Not authenticated"
			}],
			isError: true
		};
		const { data, error } = await supabaseForToken(ctx.getToken()).from("messages").insert({
			name,
			email,
			subject,
			body: message
		}).select().maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: `Message sent (id: ${data?.id ?? "?"})`
			}],
			structuredContent: { message: data }
		};
	}
});
var mcp_default = defineMcp({
	name: "varazdat-mcp",
	title: "Varazdat Avetisyan MCP",
	version: "0.1.0",
	instructions: "Tools for Dr. Varazdat Avetisyan's personal brand site. Read blog posts, projects, and courses, and send contact messages as the signed-in user.",
	auth: auth.oauth.issuer({
		issuer: `https://.supabase.co/auth/v1`,
		acceptedAudiences: "authenticated"
	}),
	tools: [
		list_blog_posts_default,
		get_blog_post_default,
		list_projects_default,
		list_courses_default,
		send_contact_message_default
	]
});
var Route$41 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$37 = () => import("./learn-BBsOq2DZ.mjs");
var Route$40 = createFileRoute("/learn")({
	head: () => buildPageHead({
		title: "Learn — AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan",
		description: "Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan.",
		path: "/learn",
		keywords: "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(coursesQuery);
		context.queryClient.ensureQueryData(videoCoursesQuery);
		context.queryClient.ensureQueryData(blogQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./impact-cecdqQ6H.mjs");
var Route$39 = createFileRoute("/impact")({
	head: () => buildPageHead({
		title: "Impact — Achievements, Talks & Recognition | Dr. Varazdat Avetisyan",
		description: "Measurable impact of Dr. Varazdat Avetisyan's work in AI education, research, and industry — students trained, workshops delivered, partnerships built.",
		path: "/impact",
		keywords: "Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(statisticsQuery);
		context.queryClient.ensureQueryData(testimonialsQuery);
		context.queryClient.ensureQueryData(companiesQuery);
		context.queryClient.ensureQueryData(talksQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./cv-Dbpwl9PZ.mjs");
var Route$38 = createFileRoute("/cv")({
	head: () => buildPageHead({
		title: "CV — Dr. Varazdat Avetisyan",
		description: "Curriculum vitae of Dr. Varazdat Avetisyan — professional experience, education, skills, certifications, and publications.",
		path: "/cv"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(profileQuery);
		context.queryClient.ensureQueryData(skillsQuery);
		context.queryClient.ensureQueryData(educationQuery);
		context.queryClient.ensureQueryData(certificationsQuery);
		context.queryClient.ensureQueryData(professionalExperienceQuery);
		context.queryClient.ensureQueryData(coursesQuery);
		context.queryClient.ensureQueryData(videoCoursesQuery);
		context.queryClient.ensureQueryData(talksQuery);
		context.queryClient.ensureQueryData(statisticsQuery);
		context.queryClient.ensureQueryData(internationalExperienceQuery({}));
		context.queryClient.ensureQueryData(socialLinksQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./courses-CzSUV_bm.mjs");
var Route$37 = createFileRoute("/courses")({
	head: () => buildPageHead({
		title: "Courses — Dr. Varazdat Avetisyan",
		description: "Structured in-person courses on AI, generative AI, machine learning, and data science taught by Dr. Varazdat Avetisyan.",
		path: "/courses"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./contact-BKURd8cG.mjs");
var Route$36 = createFileRoute("/contact")({
	head: () => buildPageHead({
		title: "Contact — Dr. Varazdat Avetisyan",
		description: "Get in touch with Dr. Varazdat Avetisyan for speaking, consulting, courses, research collaboration, and partnership inquiries.",
		path: "/contact"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(profileQuery);
		context.queryClient.ensureQueryData(socialLinksQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./companies-D9zzkPvU.mjs");
var Route$35 = createFileRoute("/companies")({
	head: () => buildPageHead({
		title: "Partners — Dr. Varazdat Avetisyan",
		description: "Companies, universities, and organizations that collaborate with Dr. Varazdat Avetisyan.",
		path: "/companies"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(companiesQuery),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./collaborate-D7SDdGuH.mjs");
var Route$34 = createFileRoute("/collaborate")({
	head: () => buildPageHead({
		title: "Collaborate — Research, Talks & Partnerships | Dr. Varazdat Avetisyan",
		description: "Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan.",
		path: "/collaborate",
		keywords: "AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(projectsQuery);
		context.queryClient.ensureQueryData(talksQuery);
		context.queryClient.ensureQueryData(companiesQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./blog-DN86C-XJ.mjs");
var Route$33 = createFileRoute("/blog")({
	head: () => buildPageHead({
		title: "Blog — Dr. Varazdat Avetisyan",
		description: "Articles and insights on artificial intelligence, machine learning, generative AI, and data science by Dr. Varazdat Avetisyan.",
		path: "/blog"
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData(blogQuery),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./auth-status-BWzIHUHY.mjs");
var Route$32 = createFileRoute("/auth-status")({
	head: () => buildPageHead({
		title: "Auth status — Admin diagnostics",
		description: "Internal authentication diagnostics for administrators.",
		path: "/auth-status",
		robots: "noindex, nofollow"
	}),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./about-C6FySLEc.mjs");
var Route$31 = createFileRoute("/about")({
	head: () => buildPageHead({
		title: "About — Dr. Varazdat Avetisyan",
		description: "Learn about Dr. Varazdat Avetisyan — background, education, skills, certifications, and professional experience in AI and data science.",
		path: "/about"
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(profileQuery);
		context.queryClient.ensureQueryData(skillsQuery);
		context.queryClient.ensureQueryData(educationQuery);
		context.queryClient.ensureQueryData(certificationsQuery);
		context.queryClient.ensureQueryData(professionalExperienceQuery);
		context.queryClient.ensureQueryData(internationalExperienceQuery());
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./route-Di7iQBCH.mjs");
var Route$30 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./routes-BUmMLH00.mjs");
var Route$29 = createFileRoute("/")({
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(profileQuery),
			context.queryClient.ensureQueryData(coursesQuery),
			context.queryClient.ensureQueryData(companiesQuery),
			context.queryClient.ensureQueryData(homeContentQuery),
			context.queryClient.ensureQueryData(testimonialsQuery),
			context.queryClient.ensureQueryData(statisticsQuery),
			context.queryClient.ensureQueryData(internationalExperienceQuery()),
			context.queryClient.ensureQueryData(fourDimensionsQuery),
			context.queryClient.ensureQueryData(socialLinksQuery)
		]);
		return {
			profile: await context.queryClient.ensureQueryData(profileQuery),
			socialUrls: (await context.queryClient.ensureQueryData(socialLinksQuery) ?? []).map((l) => l.url).filter(Boolean)
		};
	},
	head: ({ loaderData }) => {
		const data = loaderData;
		const profile = data?.profile;
		const socialUrls = data?.socialUrls;
		return buildPageHead({
			title: "Dr. Varazdat Avetisyan — AI Educator, Researcher & Technologist",
			description: "Dr. Varazdat Avetisyan — AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies.",
			path: "/",
			keywords: "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia",
			jsonLd: buildPersonJsonLd(profile, socialUrls)
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin-bXda1omm.mjs");
var Route$28 = createFileRoute("/_authenticated/admin")({
	head: () => buildPageHead({
		title: "Admin",
		description: "Administration area.",
		path: "/admin",
		robots: "noindex, nofollow"
	}),
	beforeLoad: async () => {
		const { data: userData } = await supabase.auth.getUser();
		if (!userData.user?.id) throw redirect({ to: "/auth" });
	},
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var Route$27 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$26 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$24 = () => import("./admin.video-courses-bVzQfOb3.mjs");
var Route$25 = createFileRoute("/_authenticated/admin/video-courses")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./admin.theme-BkqNoAVH.mjs");
var Route$24 = createFileRoute("/_authenticated/admin/theme")({
	head: () => ({ meta: [{ title: "Theme — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.talks-events-xaW9NdlO.mjs");
var Route$23 = createFileRoute("/_authenticated/admin/talks-events")({
	head: () => ({ meta: [{ title: "Talks & Events — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.talks-BdmR_xi6.mjs");
var Route$22 = createFileRoute("/_authenticated/admin/talks")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./admin.social-links-CWtF9X8w.mjs");
var Route$21 = createFileRoute("/_authenticated/admin/social-links")({
	head: () => ({ meta: [{ title: "Social Links — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.skills-C1EqmS1X.mjs");
var Route$20 = createFileRoute("/_authenticated/admin/skills")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./admin.settings-C7GlZ-JN.mjs");
var Route$19 = createFileRoute("/_authenticated/admin/settings")({
	head: () => ({ meta: [{ title: "Settings — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.quick-stats-DG5Flmwj.mjs");
var Route$18 = createFileRoute("/_authenticated/admin/quick-stats")({
	head: () => ({ meta: [{ title: "Quick stats — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.projects-DNniKoVk.mjs");
var Route$17 = createFileRoute("/_authenticated/admin/projects")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./admin.profile-swSD4XeW.mjs");
var Route$16 = createFileRoute("/_authenticated/admin/profile")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./admin.professional-experience-BSC7ETdF.mjs");
var Route$15 = createFileRoute("/_authenticated/admin/professional-experience")({
	head: () => ({ meta: [{ title: "Professional Experience — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.professional-development-B0U5XTLh.mjs");
var Route$14 = createFileRoute("/_authenticated/admin/professional-development")({
	head: () => ({ meta: [{ title: "Professional Development — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.partners-C8JvQFP1.mjs");
var Route$13 = createFileRoute("/_authenticated/admin/partners")({
	head: () => ({ meta: [{ title: "Partners — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.navigation-cyp6ZDMn.mjs");
var Route$12 = createFileRoute("/_authenticated/admin/navigation")({
	head: () => ({ meta: [{ title: "Navigation — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.messages-uAa5zMTc.mjs");
var Route$11 = createFileRoute("/_authenticated/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.international-experience-Dxm45PhD.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/international-experience")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.home-Beadj0R5.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/home")({
	head: () => ({ meta: [{ title: "Homepage — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.four-dimensions-Bng3Mqn9.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/four-dimensions")({
	head: () => ({ meta: [{ title: "Four Dimensions of Impact — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.error-logs-D6V82F1M.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/error-logs")({
	head: () => ({ meta: [{ title: "Error logs — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.education-CmGwbaif.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/education")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.courses-C7NY4esi.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/courses")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.companies-CQ4vhUyo.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/companies")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.certifications-NYdbHGMi.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/certifications")({
	head: () => ({ meta: [{ title: "Certifications — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.blog-CC5QrrX8.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/blog")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.about-D2dxfF9t.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/about")({
	head: () => ({ meta: [{ title: "About — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/.mcp/invoke-tool/$tool")({ server: { handlers: { ANY: createTanStackInvokeToolHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var VideoCoursesRoute = Route$49.update({
	id: "/video-courses",
	path: "/video-courses",
	getParentRoute: () => Route$50
});
var TransformRoute = Route$48.update({
	id: "/transform",
	path: "/transform",
	getParentRoute: () => Route$50
});
var TimelineRoute = Route$47.update({
	id: "/timeline",
	path: "/timeline",
	getParentRoute: () => Route$50
});
var TalksRoute = Route$46.update({
	id: "/talks",
	path: "/talks",
	getParentRoute: () => Route$50
});
var SitemapDotxmlRoute = Route$45.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$50
});
var RobotsDottxtRoute = Route$44.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$50
});
var ProjectsRoute = Route$43.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$50
});
var PrivacyRoute = Route$42.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$50
});
var McpRoute = Route$41.update({
	id: "/mcp",
	path: "/mcp",
	getParentRoute: () => Route$50
});
var LearnRoute = Route$40.update({
	id: "/learn",
	path: "/learn",
	getParentRoute: () => Route$50
});
var ImpactRoute = Route$39.update({
	id: "/impact",
	path: "/impact",
	getParentRoute: () => Route$50
});
var CvRoute = Route$38.update({
	id: "/cv",
	path: "/cv",
	getParentRoute: () => Route$50
});
var CoursesRoute = Route$37.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$50
});
var ContactRoute = Route$36.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$50
});
var CompaniesRoute = Route$35.update({
	id: "/companies",
	path: "/companies",
	getParentRoute: () => Route$50
});
var CollaborateRoute = Route$34.update({
	id: "/collaborate",
	path: "/collaborate",
	getParentRoute: () => Route$50
});
var BlogRoute = Route$33.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$50
});
var AuthStatusRoute = Route$32.update({
	id: "/auth-status",
	path: "/auth-status",
	getParentRoute: () => Route$50
});
var AuthRoute = Route$52.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$50
});
var AboutRoute = Route$31.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$50
});
var AuthenticatedRouteRoute = Route$30.update({
	id: "/_authenticated",
	getParentRoute: () => Route$50
});
var IndexRoute = Route$29.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$50
});
var VideoCoursesSlugRoute = Route$56.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => VideoCoursesRoute
});
var ProjectsSlugRoute = Route$55.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ProjectsRoute
});
var CoursesSlugRoute = Route$54.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => CoursesRoute
});
var BlogSlugRoute = Route$53.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var AuthenticatedAdminRoute = Route$28.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$27.update({
	id: "/.well-known/oauth-protected-resource",
	path: "/.well-known/oauth-protected-resource",
	getParentRoute: () => Route$50
});
var Char91DotmcpChar93ListToolsRoute = Route$26.update({
	id: "/.mcp/list-tools",
	path: "/.mcp/list-tools",
	getParentRoute: () => Route$50
});
var AuthenticatedAdminVideoCoursesRoute = Route$25.update({
	id: "/video-courses",
	path: "/video-courses",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminThemeRoute = Route$24.update({
	id: "/theme",
	path: "/theme",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminTalksEventsRoute = Route$23.update({
	id: "/talks-events",
	path: "/talks-events",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminTalksRoute = Route$22.update({
	id: "/talks",
	path: "/talks",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSocialLinksRoute = Route$21.update({
	id: "/social-links",
	path: "/social-links",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSkillsRoute = Route$20.update({
	id: "/skills",
	path: "/skills",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSettingsRoute = Route$19.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminQuickStatsRoute = Route$18.update({
	id: "/quick-stats",
	path: "/quick-stats",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProjectsRoute = Route$17.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProfileRoute = Route$16.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProfessionalExperienceRoute = Route$15.update({
	id: "/professional-experience",
	path: "/professional-experience",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProfessionalDevelopmentRoute = Route$14.update({
	id: "/professional-development",
	path: "/professional-development",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminPartnersRoute = Route$13.update({
	id: "/partners",
	path: "/partners",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminNavigationRoute = Route$12.update({
	id: "/navigation",
	path: "/navigation",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminMessagesRoute = Route$11.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminInternationalExperienceRoute = Route$10.update({
	id: "/international-experience",
	path: "/international-experience",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminHomeRoute = Route$9.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminFourDimensionsRoute = Route$8.update({
	id: "/four-dimensions",
	path: "/four-dimensions",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminErrorLogsRoute = Route$7.update({
	id: "/error-logs",
	path: "/error-logs",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminEducationRoute = Route$6.update({
	id: "/education",
	path: "/education",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCoursesRoute = Route$5.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCompaniesRoute = Route$4.update({
	id: "/companies",
	path: "/companies",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCertificationsRoute = Route$3.update({
	id: "/certifications",
	path: "/certifications",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminBlogRoute = Route$2.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminAboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => AuthenticatedAdminRoute
});
var Char91DotmcpChar93InvokeToolToolRoute = Route.update({
	id: "/.mcp/invoke-tool/$tool",
	path: "/.mcp/invoke-tool/$tool",
	getParentRoute: () => Route$50
});
var DotlovableOauthConsentRoute = Route$51.update({
	id: "/.lovable/oauth/consent",
	path: "/.lovable/oauth/consent",
	getParentRoute: () => Route$50
});
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminAboutRoute,
	AuthenticatedAdminBlogRoute,
	AuthenticatedAdminCertificationsRoute,
	AuthenticatedAdminCompaniesRoute,
	AuthenticatedAdminCoursesRoute,
	AuthenticatedAdminEducationRoute,
	AuthenticatedAdminErrorLogsRoute,
	AuthenticatedAdminFourDimensionsRoute,
	AuthenticatedAdminHomeRoute,
	AuthenticatedAdminInternationalExperienceRoute,
	AuthenticatedAdminMessagesRoute,
	AuthenticatedAdminNavigationRoute,
	AuthenticatedAdminPartnersRoute,
	AuthenticatedAdminProfessionalDevelopmentRoute,
	AuthenticatedAdminProfessionalExperienceRoute,
	AuthenticatedAdminProfileRoute,
	AuthenticatedAdminProjectsRoute,
	AuthenticatedAdminQuickStatsRoute,
	AuthenticatedAdminSettingsRoute,
	AuthenticatedAdminSkillsRoute,
	AuthenticatedAdminSocialLinksRoute,
	AuthenticatedAdminTalksRoute,
	AuthenticatedAdminTalksEventsRoute,
	AuthenticatedAdminThemeRoute,
	AuthenticatedAdminVideoCoursesRoute
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren) };
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var BlogRouteChildren = { BlogSlugRoute };
var BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
var CoursesRouteChildren = { CoursesSlugRoute };
var CoursesRouteWithChildren = CoursesRoute._addFileChildren(CoursesRouteChildren);
var ProjectsRouteChildren = { ProjectsSlugRoute };
var ProjectsRouteWithChildren = ProjectsRoute._addFileChildren(ProjectsRouteChildren);
var VideoCoursesRouteChildren = { VideoCoursesSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AboutRoute,
	AuthRoute,
	AuthStatusRoute,
	BlogRoute: BlogRouteWithChildren,
	CollaborateRoute,
	CompaniesRoute,
	ContactRoute,
	CoursesRoute: CoursesRouteWithChildren,
	CvRoute,
	ImpactRoute,
	LearnRoute,
	McpRoute,
	PrivacyRoute,
	ProjectsRoute: ProjectsRouteWithChildren,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	TalksRoute,
	TimelineRoute,
	TransformRoute,
	VideoCoursesRoute: VideoCoursesRoute._addFileChildren(VideoCoursesRouteChildren),
	Char91DotmcpChar93ListToolsRoute,
	Char91DotwellKnownChar93OauthProtectedResourceRoute,
	DotlovableOauthConsentRoute,
	Char91DotmcpChar93InvokeToolToolRoute
};
var routeTree = Route$50._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
