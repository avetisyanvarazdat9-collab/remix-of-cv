import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { profileQuery, skillsQuery, educationQuery, certificationsQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Varazdat Avetisyan" }] }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(skillsQuery);
    context.queryClient.ensureQueryData(educationQuery);
    context.queryClient.ensureQueryData(certificationsQuery);
  },
  component: AboutPage,
});

function AboutPage() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: skills } = useSuspenseQuery(skillsQuery);
  const { data: education } = useSuspenseQuery(educationQuery);
  const { data: certifications } = useSuspenseQuery(certificationsQuery);
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
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("about.heading")}</h1>
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
      </section>
    </PublicLayout>
  );
}
