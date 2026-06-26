import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { companiesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/companies")({
  head: () => ({ meta: [{ title: "Companies — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(companiesQuery),
  component: CompaniesPage,
});

function CompaniesPage() {
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const loc = useLocalized();
  const t = useT();
  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("companies.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("companies.lead")}</p>
        <ul className="mt-10 space-y-4">
          {(companies ?? []).map((c) => {
            const role = loc(c, "role");
            const description = loc(c, "description");
            return (
              <li key={c.id} className="glass flex gap-5 rounded-2xl p-6">
                {c.logo_url && <img src={c.logo_url} alt={c.name} className="size-14 rounded-lg object-cover" />}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {c.start_year}{c.is_current ? t("companies.present") : c.end_year ? `–${c.end_year}` : ""}
                    </p>
                  </div>
                  {role && <p className="text-sm text-primary">{role}</p>}
                  {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
                  {c.website_url && (
                    <a href={c.website_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline">
                      {t("companies.visit")}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
          {(companies ?? []).length === 0 && <p className="text-muted-foreground">{t("companies.empty")}</p>}
        </ul>
      </section>
    </PublicLayout>
  );
}
