import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as testimonialsQuery, c as internationalExperienceQuery, d as profileQuery, h as statisticsQuery, i as coursesQuery, m as socialLinksQuery, o as fourDimensionsQuery, r as companiesQuery, s as homeContentQuery } from "./queries-BL4k_rC0.mjs";
import { A as Mail, B as Handshake, D as MessageSquare, I as Layers, V as GraduationCap, X as Cpu, Y as Database, _ as Rocket, ct as Briefcase, ft as BookOpen, ht as ArrowRight, i as WandSparkles, lt as BrainCircuit, mt as Award, p as Sparkles, pt as BookOpenCheck, q as Earth, ut as Bot, y as Quote } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as RevealOnScroll, t as ProfileBioContent } from "./hero-portrait-BXtEUu6f.mjs";
import { n as SocialLinksIconRow } from "./SocialLinks-CqGACBRm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BUmMLH00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROMAN = [
	"",
	"I",
	"II",
	"III",
	"IV"
];
function parseBullets(value) {
	if (Array.isArray(value)) return value.map(String).filter(Boolean);
	return [];
}
function toPillar(row) {
	const bullets = parseBullets(row.bullet_points);
	const lead = row.description?.trim() || bullets[0] || "";
	const listBullets = row.description?.trim() ? bullets : bullets.slice(1);
	return {
		dimensionNumber: row.dimension_number,
		title: row.title,
		lead,
		bullets: listBullets,
		to: row.cta_button_url?.trim() || null,
		ctaLabel: row.cta_button_text?.trim() || "Learn More",
		isTimeline: row.show_timeline_footer,
		image: row.image_url?.trim() || "/assets/hero-portrait-D2JZ72pI.jpg",
		imageAlt: row.image_alt?.trim() || row.title,
		dimensionLabel: row.subtitle?.trim() || `Dimension ${ROMAN[row.dimension_number] ?? row.dimension_number}`,
		badgeText: row.badge_text,
		engagementText: row.engagement_text,
		timelineButtonText: row.timeline_button_text,
		timelineButtonUrl: row.timeline_button_url
	};
}
function PillarBullets({ bullets }) {
	if (bullets.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground",
		children: bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
		}, b))
	});
}
function PillarLink({ to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary transition-colors hover:text-primary/80",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" })]
	});
}
function formatBadgeText(template, countryCount) {
	if (template?.trim()) return template.replace(/\{count\}/g, String(countryCount));
	return countryCount > 0 ? `${countryCount} countries` : "Global reach";
}
function formatEngagementText(template, engagementCount) {
	if (template?.trim()) return template.replace(/\{count\}/g, String(engagementCount));
	return `${engagementCount}+ engagements`;
}
function TimelineFooter({ pillar, countryCount, engagementCount }) {
	const buttonText = pillar.timelineButtonText?.trim() || "View Timeline";
	const buttonUrl = pillar.timelineButtonUrl?.trim() || "/timeline";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-3.5" }), formatBadgeText(pillar.badgeText, countryCount)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground",
				children: formatEngagementText(pillar.engagementText, engagementCount)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: buttonUrl,
				className: "hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground",
				children: [
					buttonText,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				]
			})
		]
	});
}
function imageObjectPosition(dimensionNumber) {
	return dimensionNumber === 1 ? "object-[center_12%]" : "object-center";
}
function DimensionCard({ pillar, countryCount, engagementCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] shrink-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: pillar.image,
				alt: pillar.imageAlt,
				loading: "lazy",
				decoding: "async",
				className: `h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageObjectPosition(pillar.dimensionNumber)}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-primary",
					children: pillar.dimensionLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]",
					children: pillar.title
				}),
				pillar.lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-foreground/85",
					children: pillar.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillarBullets, { bullets: pillar.bullets }),
				pillar.isTimeline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineFooter, {
					pillar,
					countryCount,
					engagementCount
				}) : pillar.to && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillarLink, {
					to: pillar.to,
					label: pillar.ctaLabel
				})
			]
		})]
	});
}
function FourDimensionsSection({ dimensions, countryCount, engagementCount }) {
	const pillars = dimensions.slice().sort((a, b) => a.display_order - b.display_order || a.dimension_number - b.dimension_number).map(toPillar);
	if (pillars.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-background py-24 sm:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ambient-orb right-0 top-0 size-[420px] translate-x-1/4 bg-primary/8",
				style: { animationDelay: "-4s" }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "Four Dimensions of Impact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-heading mt-3 text-3xl sm:text-4xl",
						children: "Four worlds. One practitioner."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Academic depth, industry execution, real teaching, and international perspective — combined in one person."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7",
				children: pillars.map((pillar, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
					delay: index * 80,
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DimensionCard, {
						pillar,
						countryCount,
						engagementCount
					})
				}, pillar.dimensionLabel + pillar.title))
			})]
		})]
	});
}
function parseNumericStat(value) {
	const match = value.replace(/,/g, "").match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
	if (!match) return null;
	const [, prefix, numStr, suffix] = match;
	const target = Number(numStr);
	if (!Number.isFinite(target)) return null;
	return {
		target,
		prefix,
		suffix,
		useGrouping: value.includes(",")
	};
}
function formatCount(n, useGrouping) {
	const rounded = Math.round(n);
	return useGrouping ? rounded.toLocaleString("en-US") : String(rounded);
}
function formatStat({ target, prefix, suffix, useGrouping }) {
	return `${prefix}${formatCount(target, useGrouping)}${suffix}`;
}
var DURATION_MS = 1800;
function useCountUp(value) {
	const ref = (0, import_react.useRef)(null);
	const parsed = (0, import_react.useMemo)(() => parseNumericStat(value), [value]);
	const finalDisplay = parsed ? formatStat(parsed) : value;
	const [display, setDisplay] = (0, import_react.useState)(() => parsed ? `${parsed.prefix}0${parsed.suffix}` : value);
	(0, import_react.useEffect)(() => {
		if (!parsed) return;
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		let started = false;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting || started) return;
			started = true;
			observer.disconnect();
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				setDisplay(finalDisplay);
				return;
			}
			const start = performance.now();
			const tick = (now) => {
				const progress = Math.min(1, (now - start) / DURATION_MS);
				const eased = 1 - Math.pow(1 - progress, 3);
				const current = Math.round(parsed.target * eased);
				setDisplay(`${parsed.prefix}${formatCount(current, parsed.useGrouping)}${parsed.suffix}`);
				if (progress < 1) raf = requestAnimationFrame(tick);
				else setDisplay(finalDisplay);
			};
			raf = requestAnimationFrame(tick);
		}, {
			threshold: .2,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(el);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [parsed, finalDisplay]);
	return {
		ref,
		display: parsed ? display : value
	};
}
function StatBlock({ value, label }) {
	const { ref, display } = useCountUp(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "premium-card group relative overflow-hidden p-7 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl",
				children: display
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2.5 text-sm font-medium text-muted-foreground",
				children: label
			})
		]
	});
}
var EXPERTISE = [
	{
		icon: BrainCircuit,
		label: "Artificial Intelligence",
		to: "/courses"
	},
	{
		icon: Sparkles,
		label: "Generative AI",
		to: "/courses"
	},
	{
		icon: Database,
		label: "Data Science",
		to: "/courses"
	},
	{
		icon: Cpu,
		label: "Machine Learning",
		to: "/courses"
	},
	{
		icon: Layers,
		label: "Deep Learning",
		to: "/courses"
	},
	{
		icon: WandSparkles,
		label: "Prompt Engineering",
		to: "/courses"
	},
	{
		icon: Bot,
		label: "AI Agents",
		to: "/projects"
	},
	{
		icon: BookOpen,
		label: "Computer Science Education",
		to: "/collaborate"
	},
	{
		icon: Rocket,
		label: "Educational Innovation",
		to: "/learn"
	},
	{
		icon: MessageSquare,
		label: "Digital Transformation",
		to: "/transform"
	}
];
var JOURNEYS = [
	{
		icon: BookOpenCheck,
		eyebrow: "Learn",
		title: "Develop AI & Technology Skills",
		text: "Courses, videos, and articles for AI beginners through practitioners.",
		cta: "Explore Learning →",
		to: "/learn"
	},
	{
		icon: Rocket,
		eyebrow: "Transform",
		title: "Transform Your Organization",
		text: "Consulting, corporate training, AI adoption, and digital transformation.",
		cta: "Transform With Me →",
		to: "/transform"
	},
	{
		icon: Handshake,
		eyebrow: "Collaborate",
		title: "Research & Partnerships",
		text: "Publications, speaking engagements, academic and industry collaborations.",
		cta: "Let's Collaborate →",
		to: "/collaborate"
	},
	{
		icon: Award,
		eyebrow: "Impact",
		title: "See the Measurable Impact",
		text: "Awards, talks, media appearances, achievements, and partnerships.",
		cta: "See the Impact →",
		to: "/impact"
	}
];
function Home() {
	const { data: profile } = useSuspenseQuery(profileQuery);
	const { data: courses } = useSuspenseQuery(coursesQuery);
	const { data: companies } = useSuspenseQuery(companiesQuery);
	const { data: content } = useSuspenseQuery(homeContentQuery);
	const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
	const { data: statsRows } = useSuspenseQuery(statisticsQuery);
	const { data: intlRows } = useSuspenseQuery(internationalExperienceQuery());
	const { data: fourDimensions } = useSuspenseQuery(fourDimensionsQuery);
	const { data: socialLinks } = useSuspenseQuery(socialLinksQuery);
	const loc = useLocalized();
	const profileName = loc(profile, "name") || profile?.name || "Varazdat Avetisyan";
	const heroBadge = loc(content, "hero_badge") || "";
	const stats = (statsRows ?? []).map((s) => ({
		label: loc(s, "label") || s.label,
		value: loc(s, "value") || s.value
	}));
	const shownStats = stats.length > 0 ? stats : [
		{
			value: "10+",
			label: "Years of Experience"
		},
		{
			value: "5,000+",
			label: "Students Trained"
		},
		{
			value: "100+",
			label: "Workshops Delivered"
		},
		{
			value: "20+",
			label: "AI Courses Developed"
		}
	];
	const visiblePartners = (companies ?? []).filter((c) => c.is_visible);
	const featuredCourses = (courses ?? []).filter((c) => c.is_visible).slice(0, 6);
	const timelineEntries = [...intlRows ?? []].sort((a, b) => {
		const ad = a.event_date ? new Date(a.event_date).getTime() : 0;
		return (b.event_date ? new Date(b.event_date).getTime() : 0) - ad;
	});
	const countryCount = new Set((intlRows ?? []).map((r) => r.country_code).filter(Boolean)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-background text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-image pointer-events-none absolute right-0 top-0 h-[55%] w-full opacity-90 sm:opacity-100 md:bottom-0 md:top-auto md:h-full md:w-[58%] lg:w-[52%]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile?.photo_url || "/assets/hero-portrait-D2JZ72pI.jpg",
						alt: "",
						width: 1024,
						height: 1536,
						loading: "eager",
						decoding: "async",
						fetchPriority: "high",
						referrerPolicy: "no-referrer",
						className: "object-[center_12%] md:object-[center_8%]",
						style: {
							transform: "scale(1.12)",
							transformOrigin: "center top",
							WebkitMaskImage: "radial-gradient(ellipse 82% 88% at 62% 45%, #000 55%, rgba(0,0,0,0.9) 72%, rgba(0,0,0,0.5) 86%, transparent 98%)",
							maskImage: "radial-gradient(ellipse 82% 88% at 62% 45%, #000 55%, rgba(0,0,0,0.9) 72%, rgba(0,0,0,0.5) 86%, transparent 98%)",
							filter: "saturate(1.02) contrast(1.02)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute inset-0 md:block hidden",
						style: { background: "linear-gradient(90deg, var(--background) 0%, color-mix(in oklab, var(--background) 85%, transparent) 14%, color-mix(in oklab, var(--background) 30%, transparent) 34%, transparent 55%), linear-gradient(180deg, transparent 65%, color-mix(in oklab, var(--background) 60%, transparent) 88%, var(--background) 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute inset-0 md:hidden",
						style: { background: "linear-gradient(180deg, color-mix(in oklab, var(--background) 55%, transparent) 0%, color-mix(in oklab, var(--background) 90%, transparent) 55%, var(--background) 100%)" }
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-6 sm:py-28 lg:py-36",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "animate-fade-in-up text-sm font-medium tracking-wide text-muted-foreground",
							style: { animationDelay: "20ms" },
							children: [profileName, "."]
						}),
						heroBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "animate-fade-in-up mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary sm:text-xs",
							style: { animationDelay: "60ms" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
							}), heroBadge]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "animate-fade-in-up mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl",
							style: {
								animationDelay: "120ms",
								animationDuration: "600ms"
							},
							children: "Bridging Research, Education, and Industry Through Intelligent Technologies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "animate-fade-in-up mt-4 text-base font-medium text-foreground/85 sm:mt-5 sm:text-lg",
							style: {
								animationDelay: "220ms",
								animationDuration: "600ms"
							},
							children: "Educator | Researcher | Technologist | Entrepreneur | Innovator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "animate-fade-in-up mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg",
							style: {
								animationDelay: "300ms",
								animationDuration: "600ms"
							},
							children: "A place for personalized AI solutions — courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-in-up mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center",
							style: {
								animationDelay: "380ms",
								animationDuration: "600ms"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/learn",
									className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto sm:min-w-[11.5rem]",
									children: ["Explore Courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/transform",
									className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border/80 bg-background/70 px-6 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 sm:w-auto sm:min-w-[11.5rem]",
									children: "Request a Consultation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), " Contact Me"]
								})
							]
						}),
						(socialLinks ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								animationDelay: "460ms",
								animationDuration: "600ms"
							},
							className: "animate-fade-in-up mt-8 flex w-full justify-center sm:justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLinksIconRow, { links: socialLinks ?? [] })
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-divider section-surface py-24 sm:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:items-center lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
					className: "lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "Meet Dr. Varazdat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-heading mt-3 text-3xl sm:text-4xl",
							children: "The person behind the expertise"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBioContent, {
								bio: loc(profile, "bio") || profile?.bio || "",
								paragraphClassName: "whitespace-pre-line text-base leading-[1.75] text-muted-foreground"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "hover-lift mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
							children: ["Learn More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover:translate-x-0.5" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
					className: "lg:col-span-2",
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "premium-card glass p-8 sm:p-9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "In brief"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-4 text-sm text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "icon-badge mt-0.5 size-8 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
									}), "PhD in Computer Engineering"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "icon-badge mt-0.5 size-8 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" })
									}), "CTO & Co-Founder, Luseen Mobile"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "icon-badge mt-0.5 size-8 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" })
									}), "Professor at UFAR, NPUA, GSU"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "icon-badge mt-0.5 size-8 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-4" })
									}), "International speaker & trainer"]
								})
							]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FourDimensionsSection, {
			dimensions: fourDimensions ?? [],
			countryCount,
			engagementCount: timelineEntries.length
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-divider section-surface py-24 sm:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "Areas of expertise"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-heading mt-3 text-3xl sm:text-4xl",
						children: "Where I can help"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5",
					children: EXPERTISE.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
						delay: i * 50,
						className: "h-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: e.to,
							className: "premium-card group flex h-full flex-col items-start gap-3.5 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "icon-badge size-10 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e.icon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium leading-snug break-words text-foreground",
								children: e.label
							})]
						})
					}, e.label))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-background py-24 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ambient-orb left-0 bottom-0 size-[360px] -translate-x-1/4 bg-accent/10",
					style: { animationDelay: "-8s" }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "Impact in action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-heading mt-3 text-3xl sm:text-4xl",
						children: "A decade of measurable results"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: shownStats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
							value: s.value,
							label: s.label
						})
					}, s.label))
				})]
			})]
		}),
		visiblePartners.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-divider bg-background py-24 sm:py-28 lg:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border/60 bg-[var(--surface-muted)] p-8 shadow-[var(--shadow-card)] sm:p-12 lg:p-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-eyebrow",
								children: "Trusted by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-heading mt-3 text-3xl sm:text-4xl",
								children: "Universities, Companies & Training Centers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: "Organizations that I have worked with, taught at, collaborated with, or conducted research for."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: visiblePartners.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
							delay: i * 60,
							className: "h-full min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: p.website_url || void 0,
								target: p.website_url ? "_blank" : void 0,
								rel: p.website_url ? "noopener noreferrer" : void 0,
								className: "premium-card group flex h-full flex-col items-center p-8 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-16 w-full items-center justify-center",
										children: p.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.logo_url,
											alt: "",
											className: "max-h-12 w-auto object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "icon-badge size-12 text-lg font-bold",
											children: p.name?.slice(0, 1)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-base font-semibold tracking-tight text-foreground",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2.5 inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary",
										children: p.category || "Partner"
									})
								]
							})
						}, p.id))
					})]
				}) })
			})
		}),
		(testimonials?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-surface pb-24 pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: (testimonials ?? []).slice(0, 3).map((tm, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
						delay: i * 80,
						className: "h-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "premium-card flex h-full flex-col p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-5 text-primary/50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
									className: "mt-4 flex-1 text-sm leading-[1.75] text-foreground",
									children: loc(tm, "quote") || tm.quote
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-6 flex items-center gap-3 border-t border-border/60 pt-5",
									children: [tm.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: tm.avatar_url,
										alt: "",
										className: "size-10 rounded-full object-cover ring-2 ring-primary/10"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "icon-badge size-10 text-sm font-semibold",
										children: tm.author_name?.slice(0, 1)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold text-foreground",
											children: tm.author_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: [tm.role, tm.organization].filter(Boolean).join(" · ")
										})]
									})]
								})
							]
						})
					}, tm.id))
				})
			})
		}),
		featuredCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-divider bg-background pb-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
					className: "mb-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "Featured courses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-heading mt-3 text-3xl sm:text-4xl",
						children: "Popular programs"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn",
						className: "group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80",
						children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover:translate-x-0.5" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: featuredCourses.slice(0, 3).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
						delay: i * 80,
						className: "h-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "premium-card group flex h-full flex-col overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden",
								children: [c.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image_url,
									alt: loc(c, "title"),
									className: "h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-44 w-full",
									style: { background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base font-semibold tracking-tight text-foreground",
										children: loc(c, "title")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground",
										children: loc(c, "description")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn",
										className: "group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary transition-colors hover:text-primary/80",
										children: ["Learn more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" })]
									})
								]
							})]
						})
					}, c.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-background py-28 sm:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-0 opacity-50",
					style: { background: "radial-gradient(55% 50% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 72%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 overflow-hidden",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ambient-orb right-1/4 top-1/3 size-[320px] bg-accent/12",
						style: { animationDelay: "-12s" }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RevealOnScroll, {
						className: "mx-auto max-w-2xl text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "Choose your journey"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-heading mt-3 text-4xl sm:text-5xl",
							children: "Where would you like to go next?"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
						children: JOURNEYS.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealOnScroll, {
							delay: i * 70,
							className: "h-full min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: j.to,
								className: "premium-card group flex h-full flex-col p-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "icon-badge size-11 group-hover:bg-primary group-hover:text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(j.icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-eyebrow mt-6",
										children: j.eyebrow
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground",
										children: j.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground",
										children: j.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80",
										children: [j.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-200 group-hover:translate-x-0.5" })]
									})
								]
							})
						}, j.eyebrow))
					})]
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
