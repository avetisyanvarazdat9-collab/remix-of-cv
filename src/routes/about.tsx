import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
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
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("about.heading")}</h1>
          <Link
            to="/cv"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download CV
          </Link>
        </div>
        {loc(profile, "tagline") && (
          <p className="mt-3 text-lg font-medium text-foreground/90">{loc(profile, "tagline")}</p>
        )}
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
          {loc(profile, "bio")}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
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
            <ol className="relative mt-8">
              <div
                aria-hidden
                className="absolute bottom-6 left-[11px] top-2 w-px bg-gradient-to-b from-primary/50 via-border to-primary/20 sm:left-[15px]"
              />
              {(professionalExperience ?? [])
                .filter((e) => e.is_visible !== false)
                .map((e, index) => {
                  const jobTitle = loc(e, "job_title") || e.job_title;
                  const organization = loc(e, "organization") || e.organization;
                  const location = loc(e, "location") || e.location;
                  const employmentType = loc(e, "employment_type") || e.employment_type;
                  const description = loc(e, "description") || e.description;
                  const period = `${e.start_year}${e.is_current ? " — Present" : e.end_year ? `–${e.end_year}` : ""}`;
                  return (
                    <li key={e.id} className="relative pb-8 last:pb-0">
                      <span className="absolute left-0 top-6 z-10 flex size-[22px] items-center justify-center sm:top-7">
                        <span className="size-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]" />
                      </span>
                      <RevealOnScroll delay={index * 60} className="pl-10 sm:pl-12">
                        <article className="premium-card p-5 sm:p-6">
                          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                            <h3 className="font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                              {jobTitle}
                            </h3>
                            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                              {period}
                            </p>
                          </div>
                          {organization && (
                            <p className="mt-2 text-sm font-medium text-primary">{organization}</p>
                          )}
                          {(location || employmentType) && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {[location, employmentType].filter(Boolean).join(" · ")}
                            </p>
                          )}
                          {description && (
                            <p className="mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-muted-foreground">
                              {description}
                            </p>
                          )}
                        </article>
                      </RevealOnScroll>
                    </li>
                  );
                })}
            </ol>
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
              const location = entry.location || entry.organization || "";
              return (
                <li key={entry.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{year}</p>
                  </div>
                  {location && <p className="text-sm text-muted-foreground">{location}</p>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

    </PublicLayout>
  );
}
