import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as educationQuery, c as internationalExperienceQuery, d as profileQuery, n as certificationsQuery, p as skillsQuery, u as professionalExperienceQuery } from "./queries-BL4k_rC0.mjs";
import { J as Download } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as RevealOnScroll, t as ProfileBioContent } from "./hero-portrait-BXtEUu6f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-C6FySLEc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatPeriod(entry) {
	const start = entry.start_year ?? "";
	if (entry.is_current) return `${start} — Present`;
	if (entry.end_year) return `${start}–${entry.end_year}`;
	return String(start);
}
function CareerTimeline({ items, loc }) {
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "relative mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute bottom-4 left-[11px] top-3 w-px bg-gradient-to-b from-primary/50 via-border/80 to-primary/15 sm:left-[15px]"
		}), items.map((entry, index) => {
			const jobTitle = loc(entry, "job_title") || entry.job_title;
			const organization = loc(entry, "organization") || entry.organization;
			const location = loc(entry, "location") || entry.location;
			const employmentType = loc(entry, "employment_type") || entry.employment_type;
			const description = loc(entry, "description") || entry.description;
			const period = formatPeriod(entry);
			const isActive = activeId === entry.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group/item relative pb-10 last:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: `absolute left-0 top-7 z-10 flex size-[22px] items-center justify-center transition-transform duration-300 sm:top-8 ${isActive ? "scale-110" : "group-hover/item:scale-105"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-3 rounded-full bg-primary transition-all duration-300 ring-4 ring-background ${isActive ? "shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_25%,transparent)]" : "shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)] group-hover/item:shadow-[0_0_0_2px_color-mix(in_oklab,var(--primary)_20%,transparent)]"}` })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
					delay: index * 60,
					className: "pl-10 sm:pl-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						tabIndex: 0,
						onMouseEnter: () => setActiveId(entry.id),
						onMouseLeave: () => setActiveId((current) => current === entry.id ? null : current),
						onFocus: () => setActiveId(entry.id),
						onBlur: () => setActiveId((current) => current === entry.id ? null : current),
						onClick: () => setActiveId((current) => current === entry.id ? null : entry.id),
						className: `premium-card cursor-default p-5 transition-all duration-300 ease-out sm:p-6 ${isActive ? "-translate-y-0.5 border-primary/35 shadow-[var(--shadow-card-hover)]" : "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-x-4 gap-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-semibold leading-snug text-foreground sm:text-lg",
									children: jobTitle
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: period.replace(/\s/g, ""),
									className: `shrink-0 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${isActive ? "text-primary" : "text-primary/80"}`,
									children: period
								})]
							}),
							organization && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium text-primary",
								children: organization
							}),
							(location || employmentType) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [location, employmentType].filter(Boolean).join(" · ")
							}),
							description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-muted-foreground",
								children: description
							})
						]
					})
				})]
			}, entry.id);
		})]
	});
}
function formatDevelopmentYear(eventDate) {
	if (!eventDate) return "—";
	const year = new Date(eventDate).getFullYear();
	return Number.isFinite(year) ? String(year) : "—";
}
function AboutPage() {
	const { data: profile } = useSuspenseQuery(profileQuery);
	const { data: skills } = useSuspenseQuery(skillsQuery);
	const { data: education } = useSuspenseQuery(educationQuery);
	const { data: certifications } = useSuspenseQuery(certificationsQuery);
	const { data: professionalExperience } = useSuspenseQuery(professionalExperienceQuery);
	const { data: developmentRows } = useSuspenseQuery(internationalExperienceQuery());
	const loc = useLocalized();
	const t = useT();
	const professionalDevelopment = [...developmentRows ?? []].sort((a, b) => {
		if (!a.event_date && !b.event_date) return 0;
		if (!a.event_date) return 1;
		if (!b.event_date) return -1;
		return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
	});
	const grouped = (skills ?? []).reduce((acc, s) => {
		const cat = loc(s, "category") || s.category;
		(acc[cat] ||= []).push(s);
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold transition-colors duration-300 hover:text-primary/90 sm:text-5xl",
					children: t("about.heading")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cv",
					target: "_blank",
					rel: "noopener",
					className: "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" }), "Download CV"]
				})]
			}),
			loc(profile, "tagline") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
				delay: 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg font-medium text-foreground/90 transition-opacity duration-300 hover:opacity-100",
					children: loc(profile, "tagline")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,20rem)] md:items-start md:gap-12 lg:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
					delay: 120,
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBioContent, {
						bio: loc(profile, "bio") || profile?.bio || "",
						paragraphClassName: "w-full whitespace-pre-line text-lg leading-relaxed text-muted-foreground"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
					delay: 180,
					className: "about-intro-image w-full shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "group mx-auto w-full max-w-xs overflow-hidden rounded-2xl sm:max-w-sm md:mx-0 md:max-w-[19rem] lg:max-w-[21rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile?.photo_url || "/assets/hero-portrait-D2JZ72pI.jpg",
							alt: "",
							width: 1024,
							height: 1536,
							loading: "lazy",
							decoding: "async",
							className: "aspect-[2/3] w-full rounded-2xl border border-border object-cover object-[center_12%] shadow-[var(--shadow-card)] transition-all duration-500 ease-out will-change-transform group-hover:scale-[1.03] group-hover:shadow-[0_20px_48px_-16px_color-mix(in_oklab,var(--foreground)_18%,transparent)]"
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 glass rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("about.skills")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-5",
					children: Object.entries(grouped).map(([cat, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-primary",
						children: cat
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-wrap gap-2",
						children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-border bg-card/60 px-3 py-1 text-sm",
							children: loc(s, "name")
						}, s.id))
					})] }, cat))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 glass rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t("about.education")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: (education ?? []).map((e) => {
						const degree = loc(e, "degree") || e.degree;
						const field = loc(e, "field") || e.field;
						const institution = loc(e, "institution") || e.institution;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-l-2 border-primary/40 pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium",
									children: [degree, field ? ` · ${field}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: institution
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [e.start_year, e.end_year ? `–${e.end_year}` : ` — ${t("about.present")}`]
								})
							]
						}, e.id);
					})
				})]
			}),
			(certifications ?? []).filter((c) => c.is_visible).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-8 w-full max-w-4xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Certifications"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: (certifications ?? []).filter((c) => c.is_visible).map((c) => {
							const name = loc(c, "name") || c.name;
							const issuer = loc(c, "issuer") || c.issuer;
							const description = loc(c, "description") || c.description;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-l-2 border-primary/40 pl-4",
								children: [
									c.credential_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: c.credential_url,
										target: "_blank",
										rel: "noreferrer",
										className: "font-medium hover:text-primary",
										children: name
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: name
									}),
									issuer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: issuer
									}),
									(c.issue_date || c.expiry_date) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [c.issue_date ?? "", c.expiry_date ? ` — ${c.expiry_date}` : ""]
									}),
									description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: description
									})
								]
							}, c.id);
						})
					})]
				})
			}),
			(professionalExperience ?? []).filter((e) => e.is_visible !== false).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-8 w-full max-w-4xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Professional Experience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerTimeline, {
						items: (professionalExperience ?? []).filter((e) => e.is_visible !== false),
						loc
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Professional Development"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "International trainings, workshops, and exchange programs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-5 relative border-l border-primary/30 pl-6 space-y-5",
						children: professionalDevelopment.map((entry) => {
							const title = loc(entry, "title") || entry.title || "";
							const year = formatDevelopmentYear(entry.event_date);
							const organization = entry.organization || "";
							const location = entry.location || "";
							const description = loc(entry, "description") || entry.description || "";
							const meta = [organization, location].filter(Boolean).join(" · ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [entry.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: entry.url,
											target: "_blank",
											rel: "noreferrer",
											className: "font-medium hover:text-primary",
											children: title
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: year
										})]
									}),
									meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: meta
									}),
									description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-muted-foreground",
										children: description
									})
								]
							}, entry.id);
						})
					})
				]
			})
		]
	}) });
}
//#endregion
export { AboutPage as component };
