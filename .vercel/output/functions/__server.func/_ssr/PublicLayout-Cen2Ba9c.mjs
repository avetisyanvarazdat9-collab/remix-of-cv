import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, r as useLang, t as LANGS } from "./i18n-CteB24FQ.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as navigationMenuQuery } from "./queries-BL4k_rC0.mjs";
import { t as SITE_BRAND_NAME } from "./brand-DvNO_CtP.mjs";
import { t as useAuth } from "./useAuth-BdAl8A3P.mjs";
import { n as clearTheme } from "./theme-derive-bF79nilG.mjs";
import { H as Globe, O as Menu, T as Moon, f as Sun, n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PublicLayout-Cen2Ba9c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useSiteLogo() {
	const [logoUrl, setLogoUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			const { data } = await supabase.from("site_settings").select("logo_url").eq("id", true).maybeSingle();
			if (active) setLogoUrl(data?.logo_url ?? null);
		};
		load();
		const channel = supabase.channel("site_settings_logo").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "site_settings"
		}, () => load()).subscribe();
		return () => {
			active = false;
			supabase.removeChannel(channel);
		};
	}, []);
	return logoUrl;
}
function LanguageSwitcher({ className = "" }) {
	const { lang, setLang } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-1 text-xs text-muted-foreground hover:text-foreground ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
				className: "size-3.5",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Language"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: lang,
				onChange: (e) => setLang(e.target.value),
				className: "cursor-pointer bg-transparent pr-1 text-xs font-medium text-foreground outline-none",
				"aria-label": "Select language",
				children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: l.code,
					className: "bg-background text-foreground",
					children: [
						l.label,
						" · ",
						l.native
					]
				}, l.code))
			})
		]
	});
}
var STORAGE_KEY = "lovable.darkMode.v1";
function getInitial() {
	if (typeof document === "undefined") return "light";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function apply(mode) {
	const root = document.documentElement;
	root.classList.toggle("dark", mode === "dark");
	root.style.colorScheme = mode;
	if (mode === "dark") clearTheme(root);
	else window.dispatchEvent(new CustomEvent("lovable:theme-light"));
}
function ThemeToggle({ className = "" }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		setMode(getInitial());
		setMounted(true);
	}, []);
	const toggle = () => {
		const next = mode === "dark" ? "light" : "dark";
		setMode(next);
		apply(next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {}
	};
	const isDark = mode === "dark";
	const label = isDark ? "Switch to light mode" : "Switch to dark mode";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": label,
		title: label,
		className: `group relative inline-flex size-9 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-background/60 text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-accent/30 hover:text-primary active:scale-95 ${className}`,
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: `absolute size-4 transition-all duration-500 ${mounted && isDark ? "-translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: `absolute size-4 transition-all duration-500 ${mounted && isDark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 -rotate-90 opacity-0"}` })]
	});
}
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { isAdmin } = useAuth();
	const logoUrl = useSiteLogo();
	const t = useT();
	const { lang } = useLang();
	const { data: navItems = [] } = useQuery(navigationMenuQuery);
	const visible = navItems.filter((n) => n.is_visible);
	const labelFor = (item) => item[`label_${lang}`] || item.label_en || item.label || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/50 bg-background/75 shadow-[0_1px_0_0_color-mix(in_oklab,var(--border)_40%,transparent)] backdrop-blur-xl backdrop-saturate-150",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex min-w-0 shrink items-center font-display text-base font-semibold tracking-tight transition-opacity hover:opacity-80",
					"aria-label": "Home",
					children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: "Site logo",
						className: "h-10 max-h-10 w-auto max-w-[11rem] object-contain sm:max-w-[12rem]"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: SITE_BRAND_NAME })
				}),
				(visible.length > 0 || isAdmin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: [
						visible.map((item) => {
							if (item.path === "/contact") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.path,
								className: "hover-lift-sm ml-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:brightness-110",
								children: labelFor(item)
							}, item.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.path,
								className: "nav-link rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground",
								activeProps: { className: "nav-link rounded-md px-3 py-1.5 text-sm text-foreground bg-accent/60" },
								activeOptions: { exact: item.path === "/" },
								children: labelFor(item)
							}, item.id);
						}),
						isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							className: "hover-lift-sm ml-2 rounded-md border border-primary/40 px-3 py-1.5 text-sm text-primary hover:bg-primary/10",
							children: t("nav.admin")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, { className: "ml-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { className: "ml-1" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2 lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Toggle menu",
							onClick: () => setOpen((v) => !v),
							className: "rounded-md p-2 transition-transform duration-200 hover:bg-accent active:scale-90",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-in-up border-t border-border/60 bg-background/95 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto grid max-w-7xl gap-1 p-4",
				children: [visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.path,
					onClick: () => setOpen(false),
					className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
					activeProps: { className: "rounded-md px-3 py-2 text-sm text-foreground bg-accent" },
					activeOptions: { exact: item.path === "/" },
					children: labelFor(item)
				}, item.id)), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					onClick: () => setOpen(false),
					className: "rounded-md border border-primary/40 px-3 py-2 text-sm text-primary",
					children: t("nav.admin")
				})]
			})
		})]
	});
}
function SiteFooter() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "section-divider mt-8 bg-[var(--surface-muted)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium tracking-tight",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					SITE_BRAND_NAME,
					" · All rights reserved."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "transition-colors duration-200 hover:text-foreground",
						children: t("footer.contact")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "transition-colors duration-200 hover:text-foreground",
						children: "Privacy Policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})
				]
			})]
		})
	});
}
var TABLE_QUERY_KEYS = {
	blog_posts: "blog_posts",
	projects: "projects",
	courses: "courses",
	video_courses: "video_courses",
	companies: "companies",
	talks: "talks",
	profile: "profile",
	skills: "skills",
	education: "education",
	professional_experience: "professional_experience",
	four_dimensions: "four_dimensions",
	social_links: "social_links",
	home_content: "home_content",
	navigation_menu: "navigation_menu",
	testimonials: "testimonials",
	statistics: "statistics",
	international_experience: "international_experience"
};
var TABLES = Object.keys(TABLE_QUERY_KEYS);
/**
* Subscribe once to realtime INSERT/UPDATE/DELETE on every public CMS table
* and invalidate the matching TanStack Query so the UI reflects admin edits
* without a refresh. Debounced per-key to coalesce bursts.
*/
function useRealtimeCms() {
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		const pending = /* @__PURE__ */ new Map();
		const scheduleInvalidate = (key) => {
			const existing = pending.get(key);
			if (existing) clearTimeout(existing);
			pending.set(key, setTimeout(() => {
				pending.delete(key);
				queryClient.invalidateQueries({ queryKey: [key] });
			}, 150));
		};
		const channel = supabase.channel("public:cms-realtime");
		for (const table of TABLES) channel.on("postgres_changes", {
			event: "*",
			schema: "public",
			table
		}, () => scheduleInvalidate(TABLE_QUERY_KEYS[table]));
		channel.subscribe();
		return () => {
			for (const t of pending.values()) clearTimeout(t);
			pending.clear();
			supabase.removeChannel(channel);
		};
	}, [queryClient]);
}
function PublicLayout({ children }) {
	useRealtimeCms();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full min-w-0 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none fixed inset-0 z-0 overflow-hidden isolate",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid absolute inset-0 opacity-30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient-orb absolute -left-40 top-20 size-[480px] bg-primary/6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ambient-orb absolute -right-32 bottom-40 size-[400px] bg-accent/8",
					style: { animationDelay: "-9s" }
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex min-h-screen w-full min-w-0 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})]
	});
}
//#endregion
export { PublicLayout as t };
