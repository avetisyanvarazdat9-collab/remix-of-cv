import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mail,
  Linkedin,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Briefcase,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactDialog } from "@/components/ContactDialog";
import {
  profileQuery,
  coursesQuery,
  companiesQuery,
  homeContentQuery,
} from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "AI / ML Researcher & Educator" }] }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(coursesQuery);
    context.queryClient.ensureQueryData(companiesQuery);
    context.queryClient.ensureQueryData(homeContentQuery);
  },
  component: Home,
});

type Stat = { label: string; value: string };
const STAT_KEYS = [
  "home.stats.years",
  "home.stats.courses",
  "home.stats.students",
  "home.stats.companies",
] as const;
const STAT_VALUE_DEFAULTS = ["15+", "30+", "500+", "3"];

function useQuickStats(t: (k: string) => string): Stat[] {
  const [values, setValues] = useState<string[]>(STAT_VALUE_DEFAULTS);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("admin:quickStats");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 4) {
          // Back-compat: accept either array of strings or array of {label,value}.
          const vs = parsed.map((p: any) => (typeof p === "string" ? p : p?.value ?? ""));
          setValues(vs);
        }
      }
    } catch { /* ignore */ }
  }, []);
  return STAT_KEYS.map((k, i) => ({ label: t(k), value: values[i] ?? "" }));
}

function useCounter(target: string) {
  const [n, setN] = useState(0);
  const match = target.match(/(\d+)/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? target.slice(match.index! + match[1].length) : target;
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
  return num ? `${n}${suffix}` : target;
}

function StatCard({ stat }: { stat: Stat }) {
  const display = useCounter(stat.value);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="font-display text-4xl font-bold text-primary sm:text-5xl">{display}</div>
      <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

const PARTNER_GROUPS = [
  { key: "home.partners.universities", match: /universit|college|school/i },
  { key: "home.partners.training", match: /train|academ|bootcamp|institute/i },
  { key: "home.partners.companies", match: /compan|startup|inc|ltd|llc|cto|cofounder|founder|ceo/i },
  { key: "home.partners.organizations", match: /org|foundation|ngo|society|association/i },
];

function Home() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const { data: content } = useSuspenseQuery(homeContentQuery);
  const loc = useLocalized();
  const t = useT();
  const stats = useQuickStats(t);

  const featuredCourses = (courses ?? []).filter((c) => c.is_visible).slice(0, 3);

  const visiblePartners = (companies ?? []).filter((c) => c.is_visible);
  const groups = PARTNER_GROUPS.map((g, gi) => ({
    ...g,
    items: visiblePartners.filter((p) => {
      const text = `${p.role ?? ""} ${p.description ?? ""}`;
      const matchedEarlier = PARTNER_GROUPS.slice(0, gi).some((e) => e.match.test(text));
      return !matchedEarlier && g.match.test(text);
    }),
  }));
  const unmatched = visiblePartners.filter(
    (p) => !PARTNER_GROUPS.some((g) => g.match.test(`${p.role ?? ""} ${p.description ?? ""}`)),
  );
  const companiesGroup = groups.find((g) => g.key === "home.partners.companies");
  if (companiesGroup) companiesGroup.items = [...companiesGroup.items, ...unmatched];

  const email = profile?.email ?? "";
  const mailto = email ? `mailto:${email}` : "/contact";
  // Resolve admin-editable button URLs; empty falls back to the contact mailto.
  const resolveHref = (url?: string | null) => (url && url.trim() !== "" ? url : mailto);

  return (
    <PublicLayout>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%), radial-gradient(50% 50% at 0% 100%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {loc(content, "hero_badge")}
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {loc(profile, "name") || profile?.name || "Your Name"}
            </h1>
            <p className="mt-4 text-xl text-primary">{loc(profile, "title")}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {loc(profile, "bio") || loc(profile, "tagline")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content?.hero_btn1_label && (
                <a
                  href={resolveHref(content.hero_btn1_url)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-transform hover:-translate-y-0.5"
                >
                  {loc(content, "hero_btn1_label")} <ArrowRight className="size-4" />
                </a>
              )}
              {content?.hero_btn2_label && (
                <a
                  href={resolveHref(content.hero_btn2_url)}
                  className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10"
                >
                  {loc(content, "hero_btn2_label")}
                </a>
              )}
              {content?.hero_btn3_label && (
                <a
                  href={resolveHref(content.hero_btn3_url)}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Mail className="size-4" /> {loc(content, "hero_btn3_label")}
                </a>
              )}
            </div>
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--primary) 50%, transparent), transparent 70%)",
                }}
              />
              <div
                className="relative rounded-full p-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 50%, var(--accent)))",
                }}
              >
                <div className="size-64 overflow-hidden rounded-full bg-card sm:size-80">
                  {profile?.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={loc(profile, "name") || profile.name || "Profile photo"}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                      {t("home.photoPlaceholder")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW */}
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {loc(content, "about_label")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              {loc(content, "about_heading") || loc(profile, "tagline")}
            </h2>
            <p className="mt-5 line-clamp-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {loc(profile, "bio")}
            </p>
            <a
              href={resolveHref(content?.about_btn_url)}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              {loc(content, "about_btn_label")} <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: GraduationCap, key: "home.role.phd" },
              { icon: BookOpen, key: "home.role.professor" },
              { icon: BrainCircuit, key: "home.role.researcher" },
              { icon: Briefcase, key: "home.role.cto" },
            ].map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <Icon className="size-8 text-primary" />
                <p className="mt-4 font-display text-lg font-semibold text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <section className="bg-background pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED COURSES */}
      {featuredCourses.length > 0 && (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {loc(content, "courses_label")}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {loc(content, "courses_heading")}
                </h2>
              </div>
              <Link to="/courses" className="text-sm text-primary hover:underline">
                {t("common.viewAllArrow")}
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((c) => (
                <article
                  key={c.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  {c.image_url ? (
                    <img src={c.image_url} alt={loc(c, "title")} className="h-44 w-full object-cover" />
                  ) : (
                    <div
                      className="h-44 w-full"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))",
                      }}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">{loc(c, "title")}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(c, "description")}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[loc(c, "level"), loc(c, "duration")].filter(Boolean).map((t) => (
                        <span
                          key={t as string}
                          className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-5">
                      {c.link_url ? (
                        <a
                          href={c.link_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          {t("common.learnMore")} <ArrowRight className="size-4" />
                        </a>
                      ) : (
                        <Link
                          to="/courses"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          {t("common.learnMore")} <ArrowRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. PARTNER ORGANIZATIONS */}
      {visiblePartners.length > 0 && (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {loc(content, "partners_heading")}
            </h2>
            <div className="mt-10 space-y-10">
              {groups.map((g) =>
                g.items.length > 0 ? (
                  <div key={g.key}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {t(g.key)}
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {g.items.map((p) => (
                        <a
                          key={p.id}
                          href={p.website_url ?? "#"}
                          target={p.website_url ? "_blank" : undefined}
                          rel="noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                        >
                          {p.logo_url && (
                            <img
                              src={p.logo_url}
                              alt=""
                              className="size-10 rounded-md bg-background object-contain p-1"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                            {p.role && (
                              <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. CONTACT CTA */}
      <section
        className="relative overflow-hidden bg-background py-24"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            {loc(content, "cta_heading")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {loc(content, "cta_text")}
          </p>
          <ContactDialog>
            <button
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-5px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            >
              <Mail className="size-4" /> {loc(content, "cta_btn_label")}
            </button>
          </ContactDialog>
        </div>
      </section>
    </PublicLayout>
  );
}
