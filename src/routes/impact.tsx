import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Quote, Award, TrendingUp } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { statisticsQuery, testimonialsQuery, companiesQuery, talksQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/impact")({
  head: () =>
    buildPageHead({
      title: "Impact — Achievements, Talks & Recognition | Dr. Varazdat Avetisyan",
      description:
        "Measurable impact of Dr. Varazdat Avetisyan's work in AI education, research, and industry — students trained, workshops delivered, partnerships built.",
      path: "/impact",
      keywords: "Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia",
    }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(statisticsQuery);
    context.queryClient.ensureQueryData(testimonialsQuery);
    context.queryClient.ensureQueryData(companiesQuery);
    context.queryClient.ensureQueryData(talksQuery);
  },
  component: ImpactHub,
});

function ImpactHub() {
  const { data: stats } = useSuspenseQuery(statisticsQuery);
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const { data: talks } = useSuspenseQuery(talksQuery);
  const loc = useLocalized();

  const partners = (companies ?? []).filter((c: any) => c.is_visible);
  const featuredTalks = (talks ?? []).slice(0, 6);

  return (
    <PublicLayout>
      <HubHero
        eyebrow="Impact"
        heading="Measurable outcomes, real people"
        subheading="A decade of teaching, building, and speaking — turned into numbers, stories, and lasting partnerships."
        primaryTo="/contact"
        primaryLabel="See How I Can Help"
      />

      <HubSection eyebrow="By the numbers" heading="Impact in action">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(stats ?? []).map((s: any) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                {(loc(s, "value") as string) || s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {(loc(s, "label") as string) || s.label}
              </div>
            </div>
          ))}
        </div>
      </HubSection>

      {(testimonials?.length ?? 0) > 0 && (
        <HubSection eyebrow="Voices" heading="What people say">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(testimonials ?? []).map((tm: any) => (
              <figure key={tm.id} className="rounded-2xl border border-border bg-card p-6">
                <Quote className="size-6 text-primary/60" />
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
        </HubSection>
      )}

      {featuredTalks.length > 0 && (
        <HubSection eyebrow="Recognition" heading="Talks, keynotes & media" viewAllTo="/talks">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTalks.map((t: any) => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-6">
                <TrendingUp className="size-5 text-primary" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{loc(t, "title")}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[t.event_name, t.location].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </HubSection>
      )}

      {partners.length > 0 && (
        <HubSection eyebrow="Partners" heading="Trusted by universities and organizations" viewAllTo="/companies">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p: any) => (
              <a key={p.id} href={p.website_url ?? "#"} target={p.website_url ? "_blank" : undefined} rel="noreferrer"
                 className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/40">
                {p.logo_url ? (
                  <img src={p.logo_url} alt={p.name} className="h-10 w-auto object-contain" />
                ) : (
                  <Award className="size-8 text-primary" />
                )}
                <p className="line-clamp-1 text-xs text-muted-foreground">{p.name}</p>
              </a>
            ))}
          </div>
        </HubSection>
      )}

      <HubCTA
        heading="Bring this impact to your team"
        text="Whether you're an organization, university, or team — let's see what's possible."
        primaryTo="/contact"
        primaryLabel="Start a Conversation"
        icon={Award}
      />
    </PublicLayout>
  );
}
