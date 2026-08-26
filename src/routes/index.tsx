import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Download,
  BrainCircuit,
  Sparkles,
  Database,
  Cpu,
  Layers,
  Bot,
  MessageSquare,
  BookOpen,
  Wand2,
  Quote,
  BookOpenCheck,
  Rocket,
  Handshake,
  Award,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FourDimensionsSection } from "@/components/home/FourDimensionsSection";
import { SocialLinksIconRow } from "@/components/social/SocialLinks";
import heroPortrait from "@/assets/hero-portrait.jpg";

import {
  profileQuery,
  coursesQuery,
  companiesQuery,
  aboutHighlightsQuery,
  homeContentQuery,
  testimonialsQuery,
  statisticsQuery,
  internationalExperienceQuery,
  fourDimensionsQuery,
  socialLinksQuery,
  type AboutHighlightInstitution,
} from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";
import { useCountUp } from "@/hooks/useCountUp";
import { buildPageHead, buildPersonJsonLd } from "@/lib/seo";
import { SITE_BRAND_NAME } from "@/lib/brand";
import type { Tables } from "@/integrations/supabase/types";

const HOME_PAGE = "home";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

function parseHighlightInstitutions(value: unknown): AboutHighlightInstitution[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const row = item as Partial<AboutHighlightInstitution>;
    return {
      name: String(row.name ?? ""),
      url: String(row.url ?? ""),
      logo_url: String(row.logo_url ?? ""),
    };
  });
}

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(profileQuery),
      context.queryClient.ensureQueryData(coursesQuery),
      context.queryClient.ensureQueryData(companiesQuery),
      context.queryClient.ensureQueryData(aboutHighlightsQuery),
      context.queryClient.ensureQueryData(homeContentQuery),
      context.queryClient.ensureQueryData(testimonialsQuery),
      context.queryClient.ensureQueryData(statisticsQuery),
      context.queryClient.ensureQueryData(internationalExperienceQuery()),
      context.queryClient.ensureQueryData(fourDimensionsQuery),
      context.queryClient.ensureQueryData(socialLinksQuery),
      context.queryClient.ensureQueryData(pageContentQuery(HOME_PAGE)),
    ]);
    const profile = await context.queryClient.ensureQueryData(profileQuery);
    const socialLinks = await context.queryClient.ensureQueryData(socialLinksQuery);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(HOME_PAGE));
    return {
      profile,
      socialUrls: (socialLinks ?? []).map((l) => l.url).filter(Boolean),
      pageContent,
    };
  },
  head: ({ loaderData }) => {
    const data = loaderData as {
      profile?: Tables<"profile"> | null;
      socialUrls?: string[];
      pageContent?: PageContentRow[];
    } | undefined;
    const profile = data?.profile;
    const socialUrls = data?.socialUrls;
    const pageContent = data?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Dr. Varazdat Avetisyan AI Educator, Researcher & Technologist",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Dr. Varazdat Avetisyan AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies.",
      ),
      path: "/",
      keywords: pageContentLookup(
        pageContent,
        "seo.keywords",
        "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia",
      ),
      jsonLd: buildPersonJsonLd(profile, socialUrls),
    });
  },
  component: Home,
});

function StatBlock({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} className="premium-card group relative overflow-hidden p-7 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">{display}</div>
      <div className="mt-2.5 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

function Home() {
  const { pc } = usePageContent(HOME_PAGE);

  const EXPERTISE = [
    { icon: BrainCircuit, label: pc("expertise.0", "Artificial Intelligence"), to: "/courses" },
    { icon: Sparkles, label: pc("expertise.1", "Generative AI"), to: "/courses" },
    { icon: Database, label: pc("expertise.2", "Data Science"), to: "/courses" },
    { icon: Cpu, label: pc("expertise.3", "Machine Learning"), to: "/courses" },
    { icon: Layers, label: pc("expertise.4", "Deep Learning"), to: "/courses" },
    { icon: Wand2, label: pc("expertise.5", "Prompt Engineering"), to: "/courses" },
    { icon: Bot, label: pc("expertise.6", "AI Agents"), to: "/projects" },
    { icon: BookOpen, label: pc("expertise.7", "Computer Science Education"), to: "/collaborate" },
    { icon: Rocket, label: pc("expertise.8", "Educational Innovation"), to: "/learn" },
    { icon: MessageSquare, label: pc("expertise.9", "Digital Transformation"), to: "/transform" },
  ];

  const JOURNEYS = [
    {
      icon: BookOpenCheck,
      eyebrow: pc("journeys.learn.eyebrow", "Learn"),
      title: pc("journeys.learn.title", "Develop AI & Technology Skills"),
      text: pc("journeys.learn.body", "Courses, videos, and articles for AI beginners through practitioners."),
      cta: pc("journeys.learn.cta", "Explore Learning"),
      to: "/learn",
    },
    {
      icon: Rocket,
      eyebrow: pc("journeys.transform.eyebrow", "Transform"),
      title: pc("journeys.transform.title", "Transform Your Organization"),
      text: pc("journeys.transform.body", "Consulting, corporate training, AI adoption, and digital transformation."),
      cta: pc("journeys.transform.cta", "Transform With Me"),
      to: "/transform",
    },
    {
      icon: Handshake,
      eyebrow: pc("journeys.collaborate.eyebrow", "Collaborate"),
      title: pc("journeys.collaborate.title", "Research & Partnerships"),
      text: pc("journeys.collaborate.body", "Publications, speaking engagements, academic and industry collaborations."),
      cta: pc("journeys.collaborate.cta", "Let's Collaborate"),
      to: "/collaborate",
    },
    {
      icon: Award,
      eyebrow: pc("journeys.impact.eyebrow", "Impact"),
      title: pc("journeys.impact.title", "See the Measurable Impact"),
      text: pc("journeys.impact.body", "Awards, talks, media appearances, achievements, and partnerships."),
      cta: pc("journeys.impact.cta", "See the Impact"),
      to: "/impact",
    },
  ];

  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const { data: aboutHighlights } = useSuspenseQuery(aboutHighlightsQuery);
  const { data: content } = useSuspenseQuery(homeContentQuery);
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const { data: statsRows } = useSuspenseQuery(statisticsQuery);
  const { data: intlRows } = useSuspenseQuery(internationalExperienceQuery());
  const { data: fourDimensions } = useSuspenseQuery(fourDimensionsQuery);
  const { data: socialLinks } = useSuspenseQuery(socialLinksQuery);
  const loc = useLocalized();

  const profileName = (loc(profile, "name") as string) || profile?.name || SITE_BRAND_NAME;
  const heroBadge = ((loc(content, "hero_badge") as string) || "").trim();

  const stats = (statsRows ?? []).map((s: any) => ({
    label: (loc(s, "label") as string) || s.label,
    value: (loc(s, "value") as string) || s.value,
  }));
  const fallbackStats = [
    { value: pc("stats.fallback.0.value", "10+"), label: pc("stats.fallback.0.label", "Years of Experience") },
    { value: pc("stats.fallback.1.value", "5,000+"), label: pc("stats.fallback.1.label", "Students Trained") },
    { value: pc("stats.fallback.2.value", "100+"), label: pc("stats.fallback.2.label", "Workshops Delivered") },
    { value: pc("stats.fallback.3.value", "20+"), label: pc("stats.fallback.3.label", "AI Courses Developed") },
  ];
  const shownStats = stats.length > 0 ? stats : fallbackStats;

  const visiblePartners = (companies ?? []).filter((c: any) => c.is_visible);
  const featuredCourses = (courses ?? []).filter((c: any) => c.is_visible).slice(0, 6);

  const timelineEntries = [...(intlRows ?? [])].sort((a: any, b: any) => {
    const ad = a.event_date ? new Date(a.event_date).getTime() : 0;
    const bd = b.event_date ? new Date(b.event_date).getTime() : 0;
    return bd - ad;
  });
  const countryCount = new Set(
    (intlRows ?? []).map((r: any) => r.country_code).filter(Boolean),
  ).size;



  return (
    <PublicLayout>
      {/* ================ SECTION 1 · HERO (full-bleed background) ================ */}
      <section className="relative overflow-hidden bg-background text-foreground">
        {/* Portrait — locally bundled hero asset (falls back gracefully; admins may override via profile.photo_url) */}
        <div className="hero-image pointer-events-none absolute right-0 top-0 h-[55%] w-full opacity-90 sm:opacity-100 md:bottom-0 md:top-auto md:h-full md:w-[58%] lg:w-[52%]">
          <img
            src={profile?.photo_url || heroPortrait}
            alt={pc("hero.image_alt", "")}
            width={1024}
            height={1536}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="object-[center_12%] md:object-[center_8%]"
            style={{
              transform: "scale(1.12)",
              transformOrigin: "center top",
              WebkitMaskImage:
                "radial-gradient(ellipse 82% 88% at 62% 45%, #000 55%, rgba(0,0,0,0.9) 72%, rgba(0,0,0,0.5) 86%, transparent 98%)",
              maskImage:
                "radial-gradient(ellipse 82% 88% at 62% 45%, #000 55%, rgba(0,0,0,0.9) 72%, rgba(0,0,0,0.5) 86%, transparent 98%)",
              filter: "saturate(1.02) contrast(1.02)",
            }}
          />
          {/* Feathers portrait edges into whatever theme background is active */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:block hidden"
            style={{
              background:
                "linear-gradient(90deg, var(--background) 0%, color-mix(in oklab, var(--background) 85%, transparent) 14%, color-mix(in oklab, var(--background) 30%, transparent) 34%, transparent 55%), linear-gradient(180deg, transparent 65%, color-mix(in oklab, var(--background) 60%, transparent) 88%, var(--background) 100%)",
            }}
          />
          {/* Mobile readability wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--background) 55%, transparent) 0%, color-mix(in oklab, var(--background) 90%, transparent) 55%, var(--background) 100%)",
            }}
          />
        </div>


        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p
              className="animate-fade-in-up text-sm font-medium tracking-wide text-muted-foreground"
              style={{ animationDelay: "20ms" }}
            >
              {profileName}
            </p>
            {heroBadge && (
            <span
              className="animate-fade-in-up mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary sm:text-xs"
              style={{ animationDelay: "60ms" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {heroBadge}
            </span>
            )}
            <h1
              className="animate-fade-in-up mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms", animationDuration: "600ms" }}
            >
              {pc("hero.title", "Bridging Research, Education, and Industry Through Intelligent Technologies")}
            </h1>
            <p
              className="animate-fade-in-up mt-4 text-base font-medium text-foreground/85 sm:mt-5 sm:text-lg"
              style={{ animationDelay: "220ms", animationDuration: "600ms" }}
            >
              {pc("hero.subtitle", "Educator | Researcher | Technologist | Entrepreneur | Innovator")}
            </p>
            <p
              className="animate-fade-in-up mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "300ms", animationDuration: "600ms" }}
            >
              {pc(
                "hero.lead",
                "A place for personalized AI solutions: courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond.",
              )}
            </p>
            <div
              className="animate-fade-in-up mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "380ms", animationDuration: "600ms" }}
            >
              <Link
                to="/learn"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto sm:min-w-[11.5rem]"
              >
                {pc("hero.cta1", "Explore Courses")}
              </Link>
              <Link
                to="/transform"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border/80 bg-background/70 px-6 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 sm:w-auto sm:min-w-[11.5rem]"
              >
                {pc("hero.cta2", "Request a Consultation")}
              </Link>
              <Link
                to="/cv"
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
              >
                <Download className="size-4" /> {pc("hero.cta3", "Contact Me")}
              </Link>
            </div>
            {(socialLinks ?? []).length > 0 && (
              <div
                style={{ animationDelay: "460ms", animationDuration: "600ms" }}
                className="animate-fade-in-up mt-8 flex w-full justify-center sm:justify-start"
              >
                <SocialLinksIconRow links={socialLinks ?? []} />
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ================ SECTION 2 · TRUST & CREDIBILITY ================ */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="ambient-orb left-0 bottom-0 size-[360px] -translate-x-1/4 bg-accent/10"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">{pc("stats.eyebrow", "Impact in action")}</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              {pc("stats.heading", "A decade of measurable results")}
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shownStats.map((s, i) => (
              <RevealOnScroll key={s.label} delay={i * 70}>
                <StatBlock value={s.value} label={s.label} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 3 · MEET DR. VARAZDAT ================ */}
      <section className="section-divider section-surface py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:items-center lg:gap-16">
          <RevealOnScroll className="lg:col-span-3">
            <p className="section-eyebrow">{pc("about.eyebrow", "Meet Dr. Varazdat")}</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              {pc("about.heading", "The person behind the expertise")}
            </h2>
            <p className="mt-6 line-clamp-6 whitespace-pre-line text-base leading-[1.75] text-muted-foreground">
              {loc(profile, "bio")}
            </p>
            <Link
              to="/about"
              className="hover-lift mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
            >
              {pc("about.cta", "Learn More")} <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-2" delay={120}>
            <div className="premium-card glass p-8 sm:p-9">
              <ul className="space-y-4 text-sm text-foreground">
                {(aboutHighlights ?? []).map((highlight) => {
                  const institutions = parseHighlightInstitutions(highlight.institutions).filter(
                    (inst) => inst.name.trim(),
                  );
                  if (institutions.length === 0) return null;
                  return (
                    <li key={highlight.id} className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-semibold leading-snug text-foreground">
                        {institutions.map((inst, index) => (
                          <Fragment key={`${highlight.id}-${index}`}>
                            {index > 0 && (
                              <span className="font-normal text-muted-foreground">&</span>
                            )}
                            <span className="inline-flex items-center gap-1.5">
                              {inst.logo_url ? (
                                <img
                                  src={inst.logo_url}
                                  alt=""
                                  className="h-5 w-5 shrink-0 object-contain"
                                />
                              ) : null}
                              {inst.url.trim() ? (
                                <a
                                  href={inst.url.trim()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary"
                                >
                                  {inst.name}
                                </a>
                              ) : (
                                <span>{inst.name}</span>
                              )}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                      {loc(highlight, "role") ? (
                        <p className="text-xs text-muted-foreground">{loc(highlight, "role")}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================ SECTION 4 · FOUR DIMENSIONS ================ */}
      <FourDimensionsSection
        dimensions={fourDimensions ?? []}
        countryCount={countryCount}
        engagementCount={timelineEntries.length}
      />

      {/* ================ SECTION 5 · AREAS OF EXPERTISE ================ */}
      <section className="section-divider section-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">{pc("expertise.eyebrow", "Areas of expertise")}</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              {pc("expertise.heading", "Where I can help")}
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {EXPERTISE.map((e, i) => (
              <RevealOnScroll key={e.label} delay={i * 50} className="h-full min-w-0">
                <Link
                  to={e.to as any}
                  className="premium-card group flex h-full flex-col items-start gap-3.5 p-5"
                >
                  <div className="icon-badge size-10 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                    <e.icon className="size-4" />
                  </div>
                  <span className="text-sm font-medium leading-snug break-words text-foreground">{e.label}</span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 6 · FEATURED COURSES ================ */}
      {featuredCourses.length > 0 && (
        <section className="section-divider bg-background pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <RevealOnScroll className="mb-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <div>
                <p className="section-eyebrow">{pc("featured_courses.eyebrow", "Featured courses")}</p>
                <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                  {pc("featured_courses.heading", "Popular programs")}
                </h2>
              </div>
              <Link to="/learn" className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                {pc("featured_courses.view_all", "View all")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </RevealOnScroll>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.slice(0, 3).map((c: any, i: number) => (
                <RevealOnScroll key={c.id} delay={i * 80} className="h-full min-w-0">
                  <article className="premium-card group flex h-full flex-col overflow-hidden">
                    <div className="relative overflow-hidden">
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt={loc(c, "title")}
                          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className="h-44 w-full"
                          style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))" }}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-base font-semibold tracking-tight text-foreground">{loc(c, "title")}</h3>
                      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{loc(c, "description")}</p>
                      <Link to="/learn" className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                        {pc("featured_courses.card_cta", "Learn more")}
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================ SECTION 7 · CHOOSE YOUR JOURNEY ================ */}
      <section className="relative overflow-hidden bg-background py-28 sm:py-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 72%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="ambient-orb right-1/4 top-1/3 size-[320px] bg-accent/12"
            style={{ animationDelay: "-12s" }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">{pc("journeys.section.eyebrow", "Choose your journey")}</p>
            <h2 className="section-heading mt-3 text-4xl sm:text-5xl">
              {pc("journeys.section.heading", "Where would you like to go next?")}
            </h2>
          </RevealOnScroll>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEYS.map((j, i) => (
              <RevealOnScroll key={j.eyebrow} delay={i * 70} className="h-full min-w-0">
                <Link
                  to={j.to as any}
                  className="premium-card group flex h-full flex-col p-7"
                >
                  <div className="icon-badge size-11 group-hover:bg-primary group-hover:text-primary-foreground">
                    <j.icon className="size-5" />
                  </div>
                  <p className="section-eyebrow mt-6">{j.eyebrow}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">{j.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{j.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                    {j.cta}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 8 · TRUSTED BY ================ */}
      {visiblePartners.length > 0 && (
        <section className="section-divider bg-background py-24 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <RevealOnScroll>
              <div className="rounded-3xl border border-border/60 bg-[var(--surface-muted)] p-8 shadow-[var(--shadow-card)] sm:p-12 lg:p-16">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="section-eyebrow">{pc("partners.eyebrow", "Trusted by")}</p>
                  <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                    {pc("partners.heading", "Universities, Companies & Training Centers")}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {pc(
                      "partners.lead",
                      "Organizations that I have worked with, taught at, collaborated with, or conducted research for.",
                    )}
                  </p>
                </div>
                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePartners.map((p: any, i: number) => (
                    <RevealOnScroll key={p.id} delay={i * 60} className="h-full min-w-0">
                      <a
                        href={p.website_url || undefined}
                        target={p.website_url ? "_blank" : undefined}
                        rel={p.website_url ? "noopener noreferrer" : undefined}
                        className="flex h-full min-h-[7rem] items-center justify-center rounded-2xl bg-muted p-10"
                      >
                        {p.logo_url ? (
                          <img
                            src={p.logo_url}
                            alt=""
                            className="max-h-16 w-auto object-contain sm:max-h-20"
                          />
                        ) : (
                          <div className="icon-badge size-12 text-lg font-bold">
                            {p.name?.slice(0, 1)}
                          </div>
                        )}
                      </a>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ================ SECTION 9 · TESTIMONIALS ================ */}
      {(testimonials?.length ?? 0) > 0 && (
        <section className="section-surface pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(testimonials ?? []).slice(0, 3).map((tm: any, i: number) => (
                <RevealOnScroll key={tm.id} delay={i * 80} className="h-full min-w-0">
                  <figure className="premium-card flex h-full flex-col p-7">
                    <Quote className="size-5 text-primary/50" />
                    <blockquote className="mt-4 flex-1 text-sm leading-[1.75] text-foreground">
                      {(loc(tm, "quote") as string) || tm.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                      {tm.avatar_url ? (
                        <img src={tm.avatar_url} alt="" className="size-10 rounded-full object-cover ring-2 ring-primary/10" />
                      ) : (
                        <div className="icon-badge size-10 text-sm font-semibold">
                          {tm.author_name?.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{tm.author_name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {[tm.role, tm.organization].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>

  );
}
