import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
        content: "Bridging research, education, and industry through intelligent technologies.",
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

// -- Counters ---------------------------------------------------------------
function useCounter(target: string) {
  const [n, setN] = useState(0);
  const match = target.match(/(\d+)/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? target.slice(match.index! + match[1].length) : target;
  const prefix = match ? target.slice(0, match.index!) : "";
  useEffect(() => {
    if (!num) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(num * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [num]);
  return num ? `${prefix}${n}${suffix}` : target;
}

function StatBlock({ value, label }: { value: string; label: string }) {
  const display = useCounter(value);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="font-display text-4xl font-bold text-primary sm:text-5xl">{display}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
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
  const [timelineOpen, setTimelineOpen] = useState(false);

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
      <section
        className="relative overflow-hidden bg-no-repeat"
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        {/* Portrait image anchored off-screen right on desktop */}
        {profile?.photo_url && (
          <img
            src={profile.photo_url}
            alt=""
            className="absolute top-0 right-0 h-full w-auto max-w-none md:-right-[260px] lg:-right-[320px]"
            aria-hidden
          />
        )}
        {/* Strong dark readability mask — left 55% is solid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.12 0.03 260 / 0.95) 0%, oklch(0.12 0.03 260 / 0.90) 40%, oklch(0.12 0.03 260 / 0.50) 65%, transparent 85%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span
              className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
              style={{ animationDelay: "40ms" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              PhD · AI Educator · CTO · Professor
            </span>
            <h1
              className="animate-fade-in-up mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms", animationDuration: "600ms" }}
            >
              Bridging Research, Education, and Industry Through Intelligent Technologies
            </h1>
            <p
              className="animate-fade-in-up mt-5 text-lg text-white/90"
              style={{ animationDelay: "220ms", animationDuration: "600ms" }}
            >
              Educator · Researcher · Technologist · Entrepreneur · Innovator
            </p>
            <p
              className="animate-fade-in-up mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
              style={{ animationDelay: "300ms", animationDuration: "600ms" }}
            >
              A place for personalized AI solutions — courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond.
            </p>
            <div
              className="animate-fade-in-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "380ms", animationDuration: "600ms" }}
            >
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-transform hover:-translate-y-0.5"
              >
                Explore Courses <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/transform"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Request a Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                <Mail className="size-4" /> Contact Me
              </Link>
            </div>
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="animate-fade-in-up mt-6 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
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
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Meet Dr. Varazdat</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              The person behind the expertise
            </h2>
            <p className="mt-5 line-clamp-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {(loc(profile, "bio") as string) ||
                "Dr. Varazdat Avetisyan is an AI Educator, Data Scientist, Computer Science Professor, and CTO with over 10 years of experience across artificial intelligence, machine learning, software engineering, and higher education."}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Learn More <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">In brief</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3"><GraduationCap className="mt-0.5 size-4 text-primary" /> PhD in Computer Engineering</li>
                <li className="flex items-start gap-3"><Briefcase className="mt-0.5 size-4 text-primary" /> CTO & Co-Founder, Luseen Mobile</li>
                <li className="flex items-start gap-3"><BookOpen className="mt-0.5 size-4 text-primary" /> Professor at UFAR, NPUA, GSU</li>
                <li className="flex items-start gap-3"><Globe2 className="mt-0.5 size-4 text-primary" /> International speaker & trainer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================ SECTION 3 · WHAT SETS HIM APART ================ */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What sets him apart</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Four worlds. One practitioner.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Academic depth, industry execution, real teaching, and international perspective — combined in one person.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="size-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {(p as any).isTimeline ? (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Globe2 className="size-3.5" />
                      {countryCount > 0 ? `${countryCount} countries` : "Global reach"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {timelineEntries.length}+ engagements
                    </span>
                    <button
                      type="button"
                      onClick={() => setTimelineOpen(true)}
                      className="hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
                    >
                      View Timeline <ArrowRight className="size-4" />
                    </button>
                  </div>
                ) : (
                  p.to && (
                    <Link
                      to={p.to as any}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline"
                    >
                      Learn More <ArrowRight className="size-4" />
                    </Link>
                  )
                )}

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 4 · AREAS OF EXPERTISE ================ */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Areas of expertise</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Where I can help
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {EXPERTISE.map((e) => (
              <Link
                key={e.label}
                to={e.to as any}
                className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <e.icon className="size-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{e.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SECTION 5 · TRUST & CREDIBILITY ================ */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Impact in action</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              A decade of measurable results
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shownStats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          {visiblePartners.length > 0 && (
            <div className="mt-16">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Trusted by universities, training centers, and organizations
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {visiblePartners.slice(0, 12).map((p: any) => (
                  <a
                    key={p.id}
                    href={p.website_url ?? "#"}
                    target={p.website_url ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/40"
                    title={p.name}
                  >
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.name} className="h-10 w-auto object-contain" />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                        {p.name?.slice(0, 2)}
                      </div>
                    )}
                    <p className="line-clamp-1 text-xs text-muted-foreground">{p.name}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Optional testimonials strip (keeps admin's testimonial data in front of visitors) */}
      {(testimonials?.length ?? 0) > 0 && (
        <section className="bg-background pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(testimonials ?? []).slice(0, 3).map((tm: any) => (
                <figure key={tm.id} className="rounded-2xl border border-border bg-card p-6">
                  <Quote className="size-5 text-primary/60" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                    {(loc(tm, "quote") as string) || tm.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {tm.avatar_url ? (
                      <img src={tm.avatar_url} alt="" className="size-10 rounded-full object-cover" />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured courses — quick preview so home isn't just navigation */}
      {featuredCourses.length > 0 && (
        <section className="bg-background pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Featured courses</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  Popular programs
                </h2>
              </div>
              <Link to="/learn" className="text-sm text-primary hover:underline">View all →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.slice(0, 3).map((c: any) => (
                <article
                  key={c.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  {c.image_url ? (
                    <img src={c.image_url} alt={loc(c, "title")} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))" }} />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold text-foreground">{loc(c, "title")}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(c, "description")}</p>
                    <Link to="/learn" className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      Learn more <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================ SECTION 6 · CHOOSE YOUR JOURNEY ================ */}
      <section className="relative overflow-hidden bg-background py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Choose your journey</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Where would you like to go next?
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEYS.map((j) => (
              <Link
                key={j.eyebrow}
                to={j.to as any}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <j.icon className="size-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{j.eyebrow}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{j.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{j.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                  {j.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* International Experience Timeline modal */}
      {timelineOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in"
          role="dialog"
          aria-modal="true"
          aria-label="International experience timeline"
          onClick={() => setTimelineOpen(false)}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--primary)_35%,transparent)] animate-pop-in"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  International Experience
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  Trainings, talks & workshops — most recent first
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTimelineOpen(false)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-6">
              {timelineEntries.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No entries yet.
                </p>
              ) : (
                <ol className="relative space-y-6 border-l border-border pl-6">
                  {timelineEntries.map((r: any) => {
                    const year = r.event_date
                      ? new Date(r.event_date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })
                      : "";
                    return (
                      <li key={r.id} className="relative">
                        <span className="absolute -left-[29px] top-1.5 flex size-3 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                          <span className="relative inline-flex size-3 rounded-full border-2 border-background bg-primary" />
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          {year && (
                            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                              {year}
                            </span>
                          )}
                          {r.category && (
                            <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              {r.category}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-1 font-display text-base font-semibold text-foreground">
                          {(loc(r, "title") as string) || r.title}
                        </h4>
                        {(r.organization || r.location) && (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {[r.organization, r.location].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        {r.description && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {(loc(r, "description") as string) || r.description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </PublicLayout>

  );
}
