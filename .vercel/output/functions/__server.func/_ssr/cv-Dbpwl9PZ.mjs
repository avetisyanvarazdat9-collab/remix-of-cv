import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as educationQuery, c as internationalExperienceQuery, d as profileQuery, g as talksQuery, h as statisticsQuery, i as coursesQuery, m as socialLinksQuery, n as certificationsQuery, p as skillsQuery, u as professionalExperienceQuery, v as videoCoursesQuery } from "./queries-BL4k_rC0.mjs";
import { r as socialLinkUrls } from "./SocialLinks-CqGACBRm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv-Dbpwl9PZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-6 break-inside-avoid",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 border-b-2 border-slate-800 pb-1 text-[13pt] font-bold uppercase tracking-wide text-slate-900",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10.5pt] leading-snug text-slate-800",
			children
		})]
	});
}
function CVPage() {
	const { data: profile } = useSuspenseQuery(profileQuery);
	const { data: skills } = useSuspenseQuery(skillsQuery);
	const { data: education } = useSuspenseQuery(educationQuery);
	const { data: certifications } = useSuspenseQuery(certificationsQuery);
	const { data: professionalExperience } = useSuspenseQuery(professionalExperienceQuery);
	const { data: courses } = useSuspenseQuery(coursesQuery);
	const { data: videoCourses } = useSuspenseQuery(videoCoursesQuery);
	const { data: talks } = useSuspenseQuery(talksQuery);
	const { data: statistics } = useSuspenseQuery(statisticsQuery);
	const { data: intl } = useSuspenseQuery(internationalExperienceQuery({}));
	const { data: socialLinks } = useSuspenseQuery(socialLinksQuery);
	const loc = useLocalized();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (new URL(window.location.href).searchParams.get("print") !== "0") {
			const t = setTimeout(() => window.print(), 600);
			return () => clearTimeout(t);
		}
	}, []);
	const name = loc(profile, "name") || profile?.name || "";
	const title = loc(profile, "title") || profile?.title || "";
	const bio = loc(profile, "bio") || profile?.bio || "";
	const contactBits = [
		loc(profile, "location") || profile?.location || "",
		profile?.website_url,
		...socialLinkUrls(socialLinks ?? [])
	].filter(Boolean);
	const skillsByCat = (skills ?? []).reduce((acc, s) => {
		const cat = loc(s, "category") || s.category;
		(acc[cat] ||= []).push(s);
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cv-root min-h-screen bg-slate-100 text-slate-900 print:bg-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[8.5in] items-center justify-between px-6 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-600",
						children: "Printable CV — use your browser's dialog to save as PDF."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.back(),
							className: "rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50",
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.print(),
							className: "rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800",
							children: "Print / Save as PDF"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto my-6 max-w-[8.5in] bg-white p-10 shadow-lg print:my-0 print:max-w-none print:p-[0.5in] print:shadow-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-6 border-b-2 border-slate-900 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-[24pt] font-bold leading-tight text-slate-900",
								children: name
							}),
							title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[13pt] text-slate-700",
								children: title
							}),
							contactBits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[9.5pt] text-slate-600",
								children: contactBits.join("  ·  ")
							})
						]
					}),
					bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Profile",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line",
							children: bio
						})
					}),
					statistics && statistics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Key Metrics",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-3",
							children: statistics.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-slate-300 p-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14pt] font-bold text-slate-900",
									children: loc(s, "value") || s.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9pt] text-slate-600",
									children: loc(s, "label") || s.label
								})]
							}, s.id))
						})
					}),
					professionalExperience && professionalExperience.filter((e) => e.is_visible !== false).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Professional Experience",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: professionalExperience.filter((e) => e.is_visible !== false).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "break-inside-avoid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: loc(e, "job_title") || e.job_title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[9.5pt] text-slate-600",
											children: [e.start_year, e.is_current ? " — Present" : e.end_year ? `–${e.end_year}` : ""]
										})]
									}),
									(loc(e, "organization") || e.organization) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "italic text-slate-700",
										children: loc(e, "organization") || e.organization
									}),
									(loc(e, "location") || e.location || loc(e, "employment_type") || e.employment_type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9.5pt] text-slate-600",
										children: [loc(e, "location") || e.location, loc(e, "employment_type") || e.employment_type].filter(Boolean).join(" · ")
									}),
									(loc(e, "description") || e.description) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 whitespace-pre-line text-slate-700",
										children: loc(e, "description") || e.description
									})
								]
							}, e.id))
						})
					}),
					education && education.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Education",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: education.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "break-inside-avoid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold",
										children: [loc(e, "degree") || e.degree, loc(e, "field") || e.field ? ` · ${loc(e, "field") || e.field}` : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9.5pt] text-slate-600",
										children: [e.start_year, e.end_year ? `–${e.end_year}` : " — Present"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-700",
									children: loc(e, "institution") || e.institution
								})]
							}, e.id))
						})
					}),
					Object.keys(skillsByCat).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Skills & Expertise",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: Object.entries(skillsByCat).map(([cat, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-slate-900",
								children: [cat, ": "]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-700",
								children: items.map((s) => loc(s, "name") || s.name).join(", ")
							})] }, cat))
						})
					}),
					certifications && certifications.filter((c) => c.is_visible).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Certifications",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5",
							children: certifications.filter((c) => c.is_visible).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "break-inside-avoid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: loc(c, "name") || c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9.5pt] text-slate-600",
										children: [c.issue_date ?? "", c.expiry_date ? ` — ${c.expiry_date}` : ""]
									})]
								}), (loc(c, "issuer") || c.issuer) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "italic text-slate-700",
									children: loc(c, "issuer") || c.issuer
								})]
							}, c.id))
						})
					}),
					courses && courses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Courses Taught",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "list-disc space-y-0.5 pl-5",
							children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: loc(c, "title") || c.title
							}), (loc(c, "summary") || c.summary) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-700",
								children: [" — ", loc(c, "summary") || c.summary]
							})] }, c.id))
						})
					}),
					videoCourses && videoCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Video Courses",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "list-disc space-y-0.5 pl-5",
							children: videoCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: loc(c, "title") || c.title }, c.id))
						})
					}),
					talks && talks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Talks & Events",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5",
							children: talks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "break-inside-avoid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: loc(t, "title") || t.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9.5pt] text-slate-600",
										children: t.event_date ? new Date(t.event_date).getFullYear() : ""
									})]
								}), (loc(t, "venue") || t.venue || t.location) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "italic text-slate-700",
									children: [loc(t, "venue") || t.venue, t.location].filter(Boolean).join(" · ")
								})]
							}, t.id))
						})
					}),
					intl && intl.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "International Experience",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5",
							children: intl.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "break-inside-avoid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: e.i18n?.title?.en || e.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9.5pt] text-slate-600",
										children: e.event_date ? new Date(e.event_date).getFullYear() : ""
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "italic text-slate-700",
									children: [e.organization, e.location].filter(Boolean).join(" · ")
								})]
							}, e.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @media print {
          @page { size: A4; margin: 0.5in; }
          html, body { background: white !important; }
          .cv-root { background: white !important; }
        }
      ` })
		]
	});
}
//#endregion
export { CVPage as component };
