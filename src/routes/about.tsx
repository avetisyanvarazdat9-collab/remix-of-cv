import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  profileQuery,
  skillsQuery,
  educationQuery,
  certificationsQuery,
  companiesQuery,
} from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

const TRAININGS: { year: string; title: string; location: string }[] = [
  { year: "2013", title: "EU Tempus HEN-GEAR training", location: "Bologna, Italy" },
  { year: "2014", title: "EU Tempus Veritas workshop", location: "Heidelberg, Germany" },
  { year: "2015", title: "EU Tempus Ararat workshop", location: "Graz, Austria" },
  { year: "2015", title: "EU Tempus HEN-GEAR workshop", location: "Las Palmas, Spain" },
  { year: "2015", title: "EU Tempus Veritas trainings & workshops", location: "KTH (Sweden), Girona (Spain), Bath Spa (UK), Heidelberg (Germany)" },
  { year: "2017", title: "Lectures & experience exchange — Angel Kanchev University of Ruse", location: "Ruse, Bulgaria" },
  { year: "2017", title: "Training — Technical University of Sofia", location: "Sofia, Bulgaria" },
  { year: "2017", title: "Training — Polytechnic University of Turin", location: "Turin, Italy" },
  { year: "—", title: "Various national & international conferences, seminars, and forums", location: "" },
];

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Varazdat Avetisyan" }] }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(skillsQuery);
    context.queryClient.ensureQueryData(educationQuery);
    context.queryClient.ensureQueryData(certificationsQuery);
    context.queryClient.ensureQueryData(companiesQuery);
  },
  component: AboutPage,
});

function AboutPage() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: skills } = useSuspenseQuery(skillsQuery);
  const { data: education } = useSuspenseQuery(educationQuery);
  const { data: certifications } = useSuspenseQuery(certificationsQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const loc = useLocalized();
  const t = useT();

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

        {(companies ?? []).filter((c) => c.is_visible !== false).length > 0 && (
          <div className="mt-8 glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Professional Experience</h2>
            <ol className="mt-5 relative border-l border-primary/30 pl-6 space-y-5">
              {(companies ?? [])
                .filter((c) => c.is_visible !== false)
                .sort((a, b) => (b.start_year ?? 0) - (a.start_year ?? 0))
                .map((c) => {
                  const role = loc(c, "role") || c.role;
                  return (
                    <li key={c.id} className="relative">
                      <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.start_year}{c.is_current ? " — Present" : c.end_year ? `–${c.end_year}` : ""}
                        </p>
                      </div>
                      {role && <p className="text-sm text-primary">{role}</p>}
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
            {TRAININGS.map((tr, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{tr.title}</p>
                  <p className="text-xs text-muted-foreground">{tr.year}</p>
                </div>
                {tr.location && <p className="text-sm text-muted-foreground">{tr.location}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

    </PublicLayout>
  );
}
