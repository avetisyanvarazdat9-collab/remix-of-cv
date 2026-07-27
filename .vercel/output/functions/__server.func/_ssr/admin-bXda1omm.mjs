import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as useMatches, l as useRouterState, p as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useAuth } from "./useAuth-BdAl8A3P.mjs";
import { E as MicVocal, F as LayoutDashboard, I as Layers, L as Inbox, O as Menu, R as House, V as GraduationCap, W as FileText, _t as Activity, a as Video, at as ChartColumn, ct as Briefcase, dt as BookText, ft as BookOpen, h as Settings, j as LogOut, l as TriangleAlert, m as Share2, mt as Award, q as Earth, r as Wrench, s as User, st as Building2, w as Palette, z as History } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-bXda1omm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/home",
		label: "Homepage",
		icon: House
	},
	{
		to: "/admin/four-dimensions",
		label: "Four Dimensions",
		icon: Layers
	},
	{
		to: "/admin/profile",
		label: "Profile",
		icon: User
	},
	{
		to: "/admin/social-links",
		label: "Social links",
		icon: Share2
	},
	{
		to: "/admin/about",
		label: "About",
		icon: BookText
	},
	{
		to: "/admin/quick-stats",
		label: "Quick stats",
		icon: ChartColumn
	},
	{
		to: "/admin/projects",
		label: "Projects",
		icon: Briefcase
	},
	{
		to: "/admin/blog",
		label: "Blog posts",
		icon: FileText
	},
	{
		to: "/admin/courses",
		label: "Courses",
		icon: BookOpen
	},
	{
		to: "/admin/video-courses",
		label: "Video courses",
		icon: Video
	},
	{
		to: "/admin/talks-events",
		label: "Talks & events",
		icon: MicVocal
	},
	{
		to: "/admin/international-experience",
		label: "International",
		icon: Earth
	},
	{
		to: "/admin/partners",
		label: "Partners",
		icon: Building2
	},
	{
		to: "/admin/skills",
		label: "Skills",
		icon: Wrench
	},
	{
		to: "/admin/education",
		label: "Education",
		icon: GraduationCap
	},
	{
		to: "/admin/professional-experience",
		label: "Professional Experience",
		icon: History
	},
	{
		to: "/admin/certifications",
		label: "Certifications",
		icon: Award
	},
	{
		to: "/admin/messages",
		label: "Messages",
		icon: Inbox
	},
	{
		to: "/admin/error-logs",
		label: "Error logs",
		icon: TriangleAlert
	},
	{
		to: "/admin/navigation",
		label: "Navigation",
		icon: Menu
	},
	{
		to: "/admin/theme",
		label: "Theme",
		icon: Palette
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminShell({ children }) {
	const { isAdmin, user, loading } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (!loading && user && !isAdmin) {}
	}, [
		loading,
		user,
		isAdmin
	]);
	async function signOut() {
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center text-muted-foreground",
		children: "Loading…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-2xl p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: "Not authorized"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your account doesn't have admin access. Only the first registered account becomes admin."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-md border border-border px-3 py-1.5 text-sm",
						children: "Home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: signOut,
						className: "rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground",
						children: "Sign out"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-60 shrink-0 border-r border-border/60 bg-sidebar p-4 md:flex md:flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-6 font-display font-semibold",
					children: [
						"Varazdat",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "."
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "admin"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-0.5",
					children: items.map(({ to, label, icon: Icon, exact }) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							className: `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${(exact ? pathname === to : pathname.startsWith(to)) ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
								" ",
								label
							]
						}, to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth-status",
						className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }), " Auth status"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: signOut,
						className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border/60 px-4 py-3 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display font-semibold",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: signOut,
						className: "text-sm text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden border-b border-border/60 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 px-3 py-2 whitespace-nowrap",
						children: items.map(({ to, label, exact }) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: `rounded-md px-3 py-1.5 text-xs ${(exact ? pathname === to : pathname.startsWith(to)) ? "bg-sidebar-accent text-foreground" : "text-muted-foreground"}`,
								children: label
							}, to);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "p-4 sm:p-8",
					children
				})
			]
		})]
	});
}
var REQUIRED_TABLES = [
	"profile",
	"navigation_menu",
	"home_content",
	"site_settings",
	"courses",
	"video_courses",
	"blog_posts",
	"projects",
	"companies",
	"skills",
	"education",
	"certifications",
	"talks",
	"statistics",
	"user_roles"
];
var SINGLETON_TABLES = [
	"profile",
	"home_content",
	"site_settings"
];
async function checkCmsHealth() {
	const issues = [];
	const probes = await Promise.all(REQUIRED_TABLES.map(async (t) => {
		const { count, error } = await supabase.from(t).select("*", {
			count: "exact",
			head: true
		});
		return {
			t,
			count: count ?? 0,
			error
		};
	}));
	for (const p of probes) {
		if (p.error) {
			issues.push({
				key: `table:${p.t}`,
				label: `Missing table: ${p.t}`,
				severity: "missing"
			});
			continue;
		}
		if (SINGLETON_TABLES.includes(p.t) && p.count === 0) issues.push({
			key: `empty:${p.t}`,
			label: `Empty singleton: ${p.t}`,
			severity: "empty"
		});
		if (p.t === "navigation_menu" && p.count === 0) issues.push({
			key: "empty:navigation_menu",
			label: "No navigation items",
			severity: "empty"
		});
	}
	try {
		const { error } = await supabase.storage.from("portfolio-assets").list("", { limit: 1 });
		if (error) issues.push({
			key: "bucket:portfolio-assets",
			label: "Missing storage bucket: portfolio-assets",
			severity: "missing"
		});
	} catch {
		issues.push({
			key: "bucket:portfolio-assets",
			label: "Missing storage bucket: portfolio-assets",
			severity: "missing"
		});
	}
	return {
		healthy: issues.length === 0,
		issues
	};
}
async function runInitCms() {
	const { data, error } = await supabase.functions.invoke("init-cms", { body: {} });
	if (error) {
		const detail = error?.context?.body ?? error.message;
		return {
			ok: false,
			error: typeof detail === "string" ? detail : JSON.stringify(detail)
		};
	}
	const payload = data;
	if (!payload?.ok) return {
		ok: false,
		error: payload?.error ?? "Unknown error",
		steps: payload?.steps
	};
	return {
		ok: true,
		steps: payload?.steps
	};
}
function InitializeCms({ onReady }) {
	const [health, setHealth] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	async function refresh() {
		setError(null);
		const h = await checkCmsHealth();
		setHealth(h);
		if (h.healthy) onReady();
	}
	async function initialize() {
		setRunning(true);
		setError(null);
		setLog("Running init-cms…");
		const res = await runInitCms();
		if (!res.ok) {
			setError(res.error ?? "Initialization failed");
			setLog((l) => l + "\n" + JSON.stringify(res.steps ?? {}, null, 2));
			setRunning(false);
			return;
		}
		setLog("Initialization complete. Re-checking…\n" + JSON.stringify(res.steps, null, 2));
		await new Promise((r) => setTimeout(r, 1500));
		const h = await checkCmsHealth();
		setHealth(h);
		setRunning(false);
		if (h.healthy) window.location.reload();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Initialize CMS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Your database is not fully set up. Click below to create the missing tables, indexes, triggers, RLS policies, storage bucket, and default content. This is safe to run multiple times."
				}),
				health && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-border bg-muted/40 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: health.healthy ? "✓ All checks passed" : `${health.issues.length} issue${health.issues.length === 1 ? "" : "s"} detected`
					}), !health.healthy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-40 space-y-1 overflow-auto text-sm text-muted-foreground",
						children: health.issues.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", i.label] }, i.key))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: initialize,
					disabled: running,
					className: "mt-6 w-full rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
					children: running ? "Initializing…" : "Initialize CMS"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
					children: error
				}),
				log && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 max-h-48 overflow-auto rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground",
					children: log
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: refresh,
					className: "mt-4 text-sm text-muted-foreground hover:text-foreground",
					children: "Re-check status"
				})
			]
		})
	});
}
function Layout() {
	if (useMatches().some((m) => m.routeId !== "/_authenticated/admin" && m.routeId.startsWith("/_authenticated/admin"))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
}
var tables = [
	"projects",
	"blog_posts",
	"courses",
	"video_courses",
	"talks",
	"companies",
	"skills",
	"education",
	"messages"
];
var STAT_DEFAULTS = [
	{
		label: "Years of experience",
		value: "15+"
	},
	{
		label: "Courses taught",
		value: "30+"
	},
	{
		label: "Students mentored",
		value: "500+"
	},
	{
		label: "Companies founded",
		value: "3"
	}
];
function Dashboard() {
	const [counts, setCounts] = (0, import_react.useState)({});
	const [stats, setStats] = (0, import_react.useState)(STAT_DEFAULTS);
	const [needsInit, setNeedsInit] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		checkCmsHealth().then((h) => {
			if (!cancelled) setNeedsInit(!h.healthy);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (needsInit !== false) return;
		Promise.all(tables.map(async (t) => {
			const { count } = await supabase.from(t).select("*", {
				count: "exact",
				head: true
			});
			return [t, count ?? 0];
		})).then((rows) => setCounts(Object.fromEntries(rows)));
		try {
			const raw = window.localStorage.getItem("admin:quickStats");
			if (raw) {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed) && parsed.length === 4) setStats(parsed);
			}
		} catch {}
	}, []);
	if (needsInit === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-muted-foreground",
		children: "Checking CMS status…"
	});
	if (needsInit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitializeCms, { onReady: () => setNeedsInit(false) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Dashboard"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Welcome back. Manage every section of your CV site."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-bold text-primary",
					children: s.value
				})]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-xl font-semibold",
			children: "Content counts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: tables.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/admin/${t === "blog_posts" ? "blog" : t === "video_courses" ? "video-courses" : t === "talks" ? "talks-events" : t === "companies" ? "partners" : t}`,
				className: "glass rounded-xl p-5 hover:border-primary/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: t.replace("_", " ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-bold",
					children: counts[t] ?? "…"
				})]
			}, t))
		})
	] });
}
//#endregion
export { Layout as component };
