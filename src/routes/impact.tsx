import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Quote, Award, TrendingUp } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { statisticsQuery, testimonialsQuery, companiesQuery, talksQuery, professionalExperienceQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const IMPACT_PAGE = "impact";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/impact")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(statisticsQuery),
      context.queryClient.ensureQueryData(testimonialsQuery),
      context.queryClient.ensureQueryData(companiesQuery),
      context.queryClient.ensureQueryData(talksQuery),
      context.queryClient.ensureQueryData(professionalExperienceQuery),
      context.queryClient.ensureQueryData(pageContentQuery(IMPACT_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(IMPACT_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Impact Achievements, Talks & Recognition | Dr. Varazdat Avetisyan",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Measurable impact of Dr. Varazdat Avetisyan's work in AI education, research, and industry: students trained, workshops delivered, partnerships built.",
      ),
      path: "/impact",
      keywords: pageContentLookup(
        pageContent,
        "seo.keywords",
        "Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia",
      ),
    });
  },
  component: ImpactHub,
});

function ImpactHub() {
  const { data: stats } = useSuspenseQuery(statisticsQuery);
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const { data: talks } = useSuspenseQuery(talksQuery);
  const { data: professionalExperience } = useSuspenseQuery(professionalExperienceQuery);
  const loc = useLocalized();
  const { pc } = usePageContent(IMPACT_PAGE);

  const partners = (companies ?? []).filter((c: any) => c.is_visible);
  const featuredTalks = (talks ?? []).slice(0, 6);
  const timelineEntries = (professionalExperience ?? []).filter((e: any) => e.is_visible !== false);

  return (
    <PublicLayout>
      <HubHero
        eyebrow={pc("hero.eyebrow", "Impact")}
        heading={pc("hero.heading", "Measurable outcomes, real people")}
        subheading={pc(
          "hero.subheading",
          "A decade of teaching, building, and speaking turned into numbers, stories, and lasting partnerships.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("hero.cta", "See How I Can Help")}
      />

      <HubSection
        eyebrow={pc("stats.eyebrow", "By the numbers")}
        heading={pc("stats.heading", "Impact in action")}
      >
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

      {timelineEntries.length > 0 && (
        <HubSection
          eyebrow={pc("career.eyebrow", "Career Timeline")}
          heading={pc("career.heading", "How the journey unfolded")}
        >
          <CareerTimeline items={timelineEntries} loc={loc} />
        </HubSection>
      )}

      {(testimonials?.length ?? 0) > 0 && (
        <HubSection
          eyebrow={pc("testimonials.eyebrow", "Voices")}
          heading={pc("testimonials.heading", "What people say")}
        >
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
        <HubSection
          eyebrow={pc("talks.eyebrow", "Recognition")}
          heading={pc("talks.heading", "Talks, keynotes & media")}
          viewAllTo="/talks"
          viewAllLabel={pc("talks.view_all", "View all →")}
        >
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
        <HubSection
          eyebrow={pc("partners.eyebrow", "Partners")}
          heading={pc("partners.heading", "Trusted by universities and organizations")}
          viewAllTo="/companies"
          viewAllLabel={pc("partners.view_all", "View all →")}
        >
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
        heading={pc("cta.heading", "Bring this impact to your team")}
        text={pc(
          "cta.body",
          "Whether you're an organization, university, or team, let's see what's possible.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("cta.button", "Start a Conversation")}
        icon={Award}
      />
    </PublicLayout>
  );
}
