import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import heroPortrait from "@/assets/hero-portrait.jpg";
import {
  profileQuery,
  skillsQuery,
  educationQuery,
  certificationsQuery,
  professionalExperienceQuery,
  internationalExperienceQuery,
} from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildPageHead({
      title: "About — Dr. Varazdat Avetisyan",
      description:
        "Learn about Dr. Varazdat Avetisyan — background, education, skills, certifications, and professional experience in AI and data science.",
      path: "/about",
    }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(skillsQuery);
    context.queryClient.ensureQueryData(educationQuery);
    context.queryClient.ensureQueryData(certificationsQuery);
    context.queryClient.ensureQueryData(professionalExperienceQuery);
    context.queryClient.ensureQueryData(internationalExperienceQuery());
  },
  component: AboutPage,
});

function formatDevelopmentYear(eventDate: string | null | undefined) {
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

  const professionalDevelopment = [...(developmentRows ?? [])].sort((a, b) => {
    if (!a.event_date && !b.event_date) return 0;
    if (!a.event_date) return 1;
    if (!b.event_date) return -1;
    return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
  });

  const grouped = (skills ?? []).reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = loc(s, "category") || s.category;
    (acc[cat] ||= []).push(s);
    return acc;
  }, {});

  return (
    <PublicLayout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-4xl font-bold transition-colors duration-300 hover:text-primary/90 sm:text-5xl">
            {t("about.heading")}
          </h1>
          <Link
            to="/cv"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download CV
          </Link>
        </RevealOnScroll>
        {loc(profile, "tagline") && (
          <RevealOnScroll delay={80}>
            <p className="mt-3 text-lg font-medium text-foreground/90 transition-opacity duration-300 hover:opacity-100">
              {loc(profile, "tagline")}
            </p>
          </RevealOnScroll>
        )}
        <div className="mt-10 flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,20rem)] md:items-start md:gap-12 lg:gap-14">
          <RevealOnScroll delay={120} className="w-full">
            <p className="w-full whitespace-pre-line text-lg leading-relaxed text-muted-foreground transition-opacity duration-300 hover:text-muted-foreground/95">
              {loc(profile, "bio")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={180} className="about-intro-image w-full shrink-0">
            <figure className="group mx-auto w-full max-w-xs overflow-hidden rounded-2xl sm:max-w-sm md:mx-0 md:max-w-[19rem] lg:max-w-[21rem]">
              <img
                src={profile?.photo_url || heroPortrait}
                alt=""
                width={1024}
                height={1536}
                loading="lazy"
                decoding="async"
                className="aspect-[2/3] w-full rounded-2xl border border-border object-cover object-[center_12%] shadow-[var(--shadow-card)] transition-all duration-500 ease-out will-change-transform group-hover:scale-[1.03] group-hover:shadow-[0_20px_48px_-16px_color-mix(in_oklab,var(--foreground)_18%,transparent)]"
              />
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="mt-12 grid gap-8 md:grid-cols-2 items-start">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">{t("about.skills")}</h2>
            <div className="mt-4 space-y-5">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <p className="text-xs uppercase tracking-wider text-primary">{cat}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <li
                        key={s.id}
                        className="rounded-full border border-border bg-card/60 px-3 py-1 text-sm"
                      >
                        {loc(s, "name")}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">{t("about.education")}</h2>
            <ul className="mt-4 space-y-4">
              {(education ?? []).map((e) => {
                const degree = loc(e, "degree") || e.degree;
                const field = loc(e, "field") || e.field;
                const institution = loc(e, "institution") || e.institution;
                return (
                  <li key={e.id} className="border-l-2 border-primary/40 pl-4">
                    <p className="font-medium">{degree}{field ? ` · ${field}` : ""}</p>
                    <p className="text-sm text-muted-foreground">{institution}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.start_year}{e.end_year ? `–${e.end_year}` : ` — ${t("about.present")}`}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {(certifications ?? []).filter((c) => c.is_visible).length > 0 && (
          <div className="mt-8 glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Certifications</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {(certifications ?? [])
                .filter((c) => c.is_visible)
                .map((c) => {
                  const name = loc(c, "name") || c.name;
                  const issuer = loc(c, "issuer") || c.issuer;
                  const description = loc(c, "description") || c.description;
                  return (
                    <li key={c.id} className="border-l-2 border-primary/40 pl-4">
                      {c.credential_url ? (
                        <a
                          href={c.credential_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:text-primary"
                        >
                          {name}
                        </a>
                      ) : (
                        <p className="font-medium">{name}</p>
                      )}
                      {issuer && <p className="text-sm text-muted-foreground">{issuer}</p>}
                      {(c.issue_date || c.expiry_date) && (
                        <p className="text-xs text-muted-foreground">
                          {c.issue_date ?? ""}
                          {c.expiry_date ? ` — ${c.expiry_date}` : ""}
                        </p>
                      )}
                      {description && (
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {(professionalExperience ?? []).filter((e) => e.is_visible !== false).length > 0 && (
          <div className="mt-8 glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">Professional Experience</h2>
            <CareerTimeline
              items={(professionalExperience ?? []).filter((e) => e.is_visible !== false)}
              loc={loc}
            />
          </div>
        )}

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="font-display text-xl font-semibold">Professional Development</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            International trainings, workshops, and exchange programs.
          </p>
          <ol className="mt-5 relative border-l border-primary/30 pl-6 space-y-5">
            {professionalDevelopment.map((entry) => {
              const title = (loc(entry, "title") as string) || entry.title || "";
              const year = formatDevelopmentYear(entry.event_date);
              const organization = entry.organization || "";
              const location = entry.location || "";
              const description = (loc(entry, "description") as string) || entry.description || "";
              const meta = [organization, location].filter(Boolean).join(" · ");
              return (
                <li key={entry.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    {entry.url ? (
                      <a href={entry.url} target="_blank" rel="noreferrer" className="font-medium hover:text-primary">
                        {title}
                      </a>
                    ) : (
                      <p className="font-medium">{title}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{year}</p>
                  </div>
                  {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
                  {description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

    </PublicLayout>
  );
}
