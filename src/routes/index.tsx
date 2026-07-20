import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Mail,
  Linkedin,
  GraduationCap,
  Briefcase,
  Users2,
  Globe2,
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
import heroPortrait from "@/assets/hero-portrait.jpg";

import {
  profileQuery,
  coursesQuery,
  companiesQuery,
  homeContentQuery,
  testimonialsQuery,
  statisticsQuery,
  internationalExperienceQuery,
} from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { useCountUp } from "@/hooks/useCountUp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Varazdat Avetisyan — AI Educator, Researcher & Technologist" },
      {
        name: "description",
        content:
          "Dr. Varazdat Avetisyan — AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies. AI Training Armenia, Generative AI, Machine Learning.",
      },
      {
        name: "keywords",
        content:
          "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia, AI Speaker Armenia, Computer Science Professor Armenia",
      },
      { property: "og:title", content: "Dr. Varazdat Avetisyan — AI Educator, Researcher & Technologist" },
      {
        property: "og:description",
        content: "Dr. Varazdat Avetisyan — AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies. AI Training Armenia, Generative AI, Machine Learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Varazdat Avetisyan",
          jobTitle: "AI Educator, Data Scientist, CTO, University Professor",
          nationality: "Armenian",
          worksFor: { "@type": "Organization", name: "Luseen Mobile" },
          knowsAbout: [
            "Artificial Intelligence",
            "Generative AI",
            "Machine Learning",
            "Deep Learning",
            "Data Science",
            "Prompt Engineering",
            "AI Agents",
            "Computer Science Education",
          ],
          address: { "@type": "PostalAddress", addressCountry: "AM" },
        }),
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(coursesQuery);
    context.queryClient.ensureQueryData(companiesQuery);
    context.queryClient.ensureQueryData(homeContentQuery);
    context.queryClient.ensureQueryData(testimonialsQuery);
    context.queryClient.ensureQueryData(statisticsQuery);
    context.queryClient.ensureQueryData(internationalExperienceQuery());
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

// -- Constants for cards ----------------------------------------------------
const PILLARS = [
  {
    icon: GraduationCap,
    title: "Academic Leadership",
    bullets: ["PhD in Computer Engineering", "University Professor", "AI & Computer Science Educator", "Research & Curriculum Development", "International Academic Collaborations"],
    to: "/collaborate",
  },
  {
    icon: Briefcase,
    title: "Industry Leadership",
    bullets: ["CTO & Co-Founder, Luseen Mobile", "AI Consultant", "Technology Strategy", "Software Engineering", "Digital Transformation"],
    to: "/transform",
  },
  {
    icon: Users2,
    title: "Education & Training",
    bullets: ["AI Course Development", "University Teaching", "Corporate Training", "Workshops & Professional Development", "Student Mentorship"],
    to: "/learn",
  },
  {
    icon: Globe2,
    title: "International Experience",
    bullets: ["Trainings & workshops across Europe", "Academic exchange programs", "Conference speaking", "Cross-institutional research", "Global professional network"],
    to: null as string | null,
    isTimeline: true,
  },

];

const EXPERTISE = [
  { icon: BrainCircuit, label: "Artificial Intelligence", to: "/courses" },
  { icon: Sparkles, label: "Generative AI", to: "/courses" },
  { icon: Database, label: "Data Science", to: "/courses" },
  { icon: Cpu, label: "Machine Learning", to: "/courses" },
  { icon: Layers, label: "Deep Learning", to: "/courses" },
  { icon: Wand2, label: "Prompt Engineering", to: "/courses" },
  { icon: Bot, label: "AI Agents", to: "/projects" },
  { icon: BookOpen, label: "Computer Science Education", to: "/collaborate" },
  { icon: Rocket, label: "Educational Innovation", to: "/learn" },
  { icon: MessageSquare, label: "Digital Transformation", to: "/transform" },
];

const JOURNEYS = [
  { icon: BookOpenCheck, eyebrow: "Learn", title: "Develop AI & Technology Skills", text: "Courses, videos, and articles for AI beginners through practitioners.", cta: "Explore Learning →", to: "/learn" },
  { icon: Rocket, eyebrow: "Transform", title: "Transform Your Organization", text: "Consulting, corporate training, AI adoption, and digital transformation.", cta: "Transform With Me →", to: "/transform" },
  { icon: Handshake, eyebrow: "Collaborate", title: "Research & Partnerships", text: "Publications, speaking engagements, academic and industry collaborations.", cta: "Let's Collaborate →", to: "/collaborate" },
  { icon: Award, eyebrow: "Impact", title: "See the Measurable Impact", text: "Awards, talks, media appearances, achievements, and partnerships.", cta: "See the Impact →", to: "/impact" },
];

function Home() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const { data: content } = useSuspenseQuery(homeContentQuery);
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const { data: statsRows } = useSuspenseQuery(statisticsQuery);
  const { data: intlRows } = useSuspenseQuery(internationalExperienceQuery());
  const loc = useLocalized();
  

  const stats = (statsRows ?? []).map((s: any) => ({
    label: (loc(s, "label") as string) || s.label,
    value: (loc(s, "value") as string) || s.value,
  }));
  const fallbackStats = [
    { value: "10+", label: "Years of Experience" },
    { value: "5,000+", label: "Students Trained" },
    { value: "100+", label: "Workshops Delivered" },
    { value: "20+", label: "AI Courses Developed" },
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
            alt=""
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
              Dr. Varazdat Avetisyan.
            </p>
            <span
              className="animate-fade-in-up mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary sm:text-xs"
              style={{ animationDelay: "60ms" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              PhD · AI Educator · CTO · Professor
            </span>
            <h1
              className="animate-fade-in-up mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms", animationDuration: "600ms" }}
            >
              Bridging Research, Education, and Industry Through Intelligent Technologies
            </h1>
            <p
              className="animate-fade-in-up mt-4 text-base font-medium text-foreground/85 sm:mt-5 sm:text-lg"
              style={{ animationDelay: "220ms", animationDuration: "600ms" }}
            >
              Educator · Researcher · Technologist · Entrepreneur · Innovator
            </p>
            <p
              className="animate-fade-in-up mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "300ms", animationDuration: "600ms" }}
            >
              A place for personalized AI solutions — courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond.
            </p>
            <div
              className="animate-fade-in-up mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "380ms", animationDuration: "600ms" }}
            >
              <Link
                to="/learn"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
              >
                Explore Courses <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/transform"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 sm:w-auto"
              >
                Request a Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
              >
                <Mail className="size-4" /> Contact Me
              </Link>
            </div>
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="animate-fade-in-up mt-6 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                style={{ animationDelay: "460ms", animationDuration: "600ms" }}
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
          </div>
        </div>
      </section>


      {/* ================ SECTION 2 · MEET DR. VARAZDAT ================ */}
      <section className="section-divider section-surface py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:items-center lg:gap-16">
          <RevealOnScroll className="lg:col-span-3">
            <p className="section-eyebrow">Meet Dr. Varazdat</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              The person behind the expertise
            </h2>
            <p className="mt-6 line-clamp-6 whitespace-pre-line text-base leading-[1.75] text-muted-foreground">
              {(loc(profile, "bio") as string) ||
                "Dr. Varazdat Avetisyan is an AI Educator, Data Scientist, Computer Science Professor, and CTO with over 10 years of experience across artificial intelligence, machine learning, software engineering, and higher education."}
            </p>
            <Link
              to="/about"
              className="hover-lift mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
            >
              Learn More <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-2" delay={120}>
            <div className="premium-card glass p-8 sm:p-9">
              <p className="section-eyebrow">In brief</p>
              <ul className="mt-5 space-y-4 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="icon-badge mt-0.5 size-8 shrink-0"><GraduationCap className="size-4" /></span>
                  PhD in Computer Engineering
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-badge mt-0.5 size-8 shrink-0"><Briefcase className="size-4" /></span>
                  CTO & Co-Founder, Luseen Mobile
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-badge mt-0.5 size-8 shrink-0"><BookOpen className="size-4" /></span>
                  Professor at UFAR, NPUA, GSU
                </li>
                <li className="flex items-start gap-3">
                  <span className="icon-badge mt-0.5 size-8 shrink-0"><Globe2 className="size-4" /></span>
                  International speaker & trainer
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================ SECTION 3 · WHAT SETS HIM APART ================ */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="ambient-orb right-0 top-0 size-[420px] translate-x-1/4 bg-primary/8"
            style={{ animationDelay: "-4s" }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">What sets him apart</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              Four worlds. One practitioner.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Academic depth, industry execution, real teaching, and international perspective — combined in one person.
            </p>
          </RevealOnScroll>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 80} className="h-full min-w-0">
                <div className="premium-card group flex h-full flex-col p-7">
                  <div className="flex items-center gap-3.5">
                    <div className="icon-badge size-11 group-hover:bg-primary group-hover:text-primary-foreground">
                      <p.icon className="size-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {(p as any).isTimeline ? (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                        <Globe2 className="size-3.5" />
                        {countryCount > 0 ? `${countryCount} countries` : "Global reach"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {timelineEntries.length}+ engagements
                      </span>
                      <Link
                        to="/timeline"
                        className="hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        View Timeline <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  ) : (
                    p.to && (
                      <Link
                        to={p.to as any}
                        className="group/link mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Learn More
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                      </Link>
                    )
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 4 · AREAS OF EXPERTISE ================ */}
      <section className="section-divider section-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Areas of expertise</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              Where I can help
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

      {/* ================ SECTION 5 · TRUST & CREDIBILITY ================ */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="ambient-orb left-0 bottom-0 size-[360px] -translate-x-1/4 bg-accent/10"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Impact in action</p>
            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
              A decade of measurable results
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

      {/* ================ SECTION 6 · TRUSTED BY ================ */}
      {visiblePartners.length > 0 && (
        <section className="section-divider bg-background py-24 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <RevealOnScroll>
              <div className="rounded-3xl border border-border/60 bg-[var(--surface-muted)] p-8 shadow-[var(--shadow-card)] sm:p-12 lg:p-16">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="section-eyebrow">Trusted by</p>
                  <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                    Universities, Companies & Training Centers
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Organizations that I have worked with, taught at, collaborated with, or conducted research for.
                  </p>
                </div>
                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePartners.map((p: any, i: number) => (
                    <RevealOnScroll key={p.id} delay={i * 60} className="h-full min-w-0">
                      <a
                        href={p.website_url || undefined}
                        target={p.website_url ? "_blank" : undefined}
                        rel={p.website_url ? "noopener noreferrer" : undefined}
                        className="premium-card group flex h-full flex-col items-center p-8 text-center"
                      >
                        <div className="flex h-16 w-full items-center justify-center">
                          {p.logo_url ? (
                            <img
                              src={p.logo_url}
                              alt=""
                              className="max-h-12 w-auto object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="icon-badge size-12 text-lg font-bold">
                              {p.name?.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">{p.name}</h3>
                        <span className="mt-2.5 inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {p.category || "Partner"}
                        </span>
                      </a>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Optional testimonials strip (keeps admin's testimonial data in front of visitors) */}
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

      {/* Featured courses — quick preview so home isn't just navigation */}
      {featuredCourses.length > 0 && (
        <section className="section-divider bg-background pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <RevealOnScroll className="mb-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <div>
                <p className="section-eyebrow">Featured courses</p>
                <h2 className="section-heading mt-3 text-3xl sm:text-4xl">
                  Popular programs
                </h2>
              </div>
              <Link to="/learn" className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                View all
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
                        Learn more
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

      {/* ================ SECTION 6 · CHOOSE YOUR JOURNEY ================ */}
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
            <p className="section-eyebrow">Choose your journey</p>
            <h2 className="section-heading mt-3 text-4xl sm:text-5xl">
              Where would you like to go next?
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
    </PublicLayout>

  );
}
